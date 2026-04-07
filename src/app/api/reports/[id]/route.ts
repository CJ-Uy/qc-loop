import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { reports } from "@/db/schema";
import type { Report } from "@/lib/types";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();
  const [row] = await db.select().from(reports).where(eq(reports.id, id));

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const report: Report = {
    id: row.id,
    category: row.category as Report["category"],
    title: row.title,
    description: row.description,
    barangay: row.barangay,
    district: row.district,
    timestamp: row.timestamp,
    upvotes: row.upvotes,
    status: row.status as Report["status"],
    imageUrl: row.image_key ? `/api/reports/${row.id}/image` : undefined,
  };

  return NextResponse.json(report);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();
  const { env } = await getCloudflareContext({ async: true });

  const [row] = await db.select().from(reports).where(eq(reports.id, id));
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.delete(reports).where(eq(reports.id, id));

  if (row.image_key) {
    await env.QC_BUCKET.delete(row.image_key);
  }

  return new Response(null, { status: 204 });
}
