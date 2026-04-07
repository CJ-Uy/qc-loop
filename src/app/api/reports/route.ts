import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { toReport, type ReportRow } from "@/db";
import type { Report } from "@/lib/types";

export const runtime = "edge";

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
  const photo       = formData.get("photo") as File | null;

  const id = `report-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  let image_key: string | null = null;

  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop() ?? "jpg";
    image_key = `reports/${id}.${ext}`;
    const buffer = await photo.arrayBuffer();
    await env.QC_BUCKET.put(image_key, buffer, {
      httpMetadata: { contentType: photo.type },
    });
  }

  const timestamp = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO reports (id, category, title, description, barangay, district, timestamp, upvotes, status, image_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'pending', ?)`
  ).bind(id, category, title, description, barangay, district, timestamp, image_key).run();

  const report: Report = {
    id, category, title, description, barangay, district, timestamp,
    upvotes: 0, status: "pending",
    imageUrl: image_key ? `/api/reports/${id}/image` : undefined,
  };

  return NextResponse.json(report, { status: 201 });
}
