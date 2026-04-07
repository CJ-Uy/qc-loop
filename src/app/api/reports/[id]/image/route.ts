import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { reports } from "@/db/schema";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();
  const { env } = await getCloudflareContext({ async: true });

  const [row] = await db.select().from(reports).where(eq(reports.id, id));
  if (!row?.image_key) return new Response("Not found", { status: 404 });

  const object = await env.QC_BUCKET.get(row.image_key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
