import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { reports } from "@/db/schema";
import type { Report } from "@/lib/types";

export const runtime = "edge";

export async function GET() {
  const db = await getDb();
  const rows = await db.select().from(reports).orderBy(desc(reports.timestamp));

  const result: Report[] = rows.map((r) => ({
    id: r.id,
    category: r.category as Report["category"],
    title: r.title,
    description: r.description,
    barangay: r.barangay,
    district: r.district,
    timestamp: r.timestamp,
    upvotes: r.upvotes,
    status: r.status as Report["status"],
    imageUrl: r.image_key ? `/api/reports/${r.id}/image` : undefined,
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const db = await getDb();
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

  await db.insert(reports).values({
    id,
    category,
    title,
    description,
    barangay,
    district,
    timestamp,
    upvotes: 0,
    status: "pending",
    image_key,
  });

  const report: Report = {
    id,
    category,
    title,
    description,
    barangay,
    district,
    timestamp,
    upvotes: 0,
    status: "pending",
    imageUrl: image_key ? `/api/reports/${id}/image` : undefined,
  };

  return NextResponse.json(report, { status: 201 });
}
