import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { reports } from "@/db/schema";
import type { Report } from "@/lib/types";

export const runtime = "edge";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();

  await db
    .update(reports)
    .set({ upvotes: sql`${reports.upvotes} + 1` })
    .where(eq(reports.id, id));

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
