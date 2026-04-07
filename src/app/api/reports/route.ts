import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { toReport, type ReportRow } from "@/db";
import type { Report } from "@/lib/types";

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB.prepare(
    "SELECT * FROM reports ORDER BY timestamp DESC"
  ).all<ReportRow>();
  return NextResponse.json(results.map(toReport));
}

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });

  const formData = await request.formData();
  const category    = formData.get("category") as Report["category"];
  const title       = formData.get("title") as string;
  const description = formData.get("description") as string;
  const barangay    = formData.get("barangay") as string;
  const district    = Number(formData.get("district"));
  const photos      = formData.getAll("photo") as File[];

  const id = `report-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const image_keys: string[] = [];

  for (const photo of photos) {
    if (!photo || photo.size === 0) continue;
    const ext = photo.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const key = `reports/${id}-${image_keys.length}.${ext}`;
    const buffer = await photo.arrayBuffer();
    await env.QC_BUCKET.put(key, buffer, {
      httpMetadata: { contentType: photo.type || "image/jpeg" },
    });
    image_keys.push(key);
  }

  const timestamp = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO reports (id, category, title, description, barangay, district, timestamp, upvotes, status, image_key, image_keys)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'pending', NULL, ?)`
  ).bind(id, category, title, description, barangay, district, timestamp, JSON.stringify(image_keys)).run();

  const report: Report = {
    id, category, title, description, barangay, district, timestamp,
    upvotes: 0, status: "pending",
    imageUrls: image_keys.length > 0
      ? image_keys.map((_, i) => `/api/reports/${id}/images/${i}`)
      : undefined,
  };

  return NextResponse.json(report, { status: 201 });
}
