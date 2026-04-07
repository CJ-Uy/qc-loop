import { getCloudflareContext } from "@opennextjs/cloudflare";


export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });

  const row = await env.DB.prepare(
    "SELECT image_key FROM reports WHERE id = ?"
  ).bind(id).first<{ image_key: string | null }>();

  if (!row?.image_key) return new Response("Not found", { status: 404 });

  const object = await env.QC_BUCKET.get(row.image_key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
