import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { toReport, type ReportRow } from "@/db";


export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });

  await env.DB.prepare(
    "UPDATE reports SET upvotes = upvotes + 1 WHERE id = ?"
  ).bind(id).run();

  const row = await env.DB.prepare(
    "SELECT * FROM reports WHERE id = ?"
  ).bind(id).first<ReportRow>();

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toReport(row));
}
