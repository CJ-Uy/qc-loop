import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { toReport, type ReportRow } from "@/db";
import type { ReportStatus } from "@/lib/types";


export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });

  const row = await env.DB.prepare(
    "SELECT * FROM reports WHERE id = ?"
  ).bind(id).first<ReportRow>();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toReport(row));
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });

  const row = await env.DB.prepare(
    "SELECT image_key FROM reports WHERE id = ?"
  ).bind(id).first<{ image_key: string | null }>();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await env.DB.prepare("DELETE FROM reports WHERE id = ?").bind(id).run();

  if (row.image_key) {
    await env.QC_BUCKET.delete(row.image_key);
  }

  return new Response(null, { status: 204 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const { status } = await request.json() as { status: ReportStatus };

  await env.DB.prepare(
    "UPDATE reports SET status = ? WHERE id = ?"
  ).bind(status, id).run();

  const row = await env.DB.prepare(
    "SELECT * FROM reports WHERE id = ?"
  ).bind(id).first<ReportRow>();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toReport(row));
}
