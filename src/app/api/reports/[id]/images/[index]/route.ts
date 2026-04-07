import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  const { id, index } = await params;
  const { env } = await getCloudflareContext({ async: true });

  const row = await env.DB.prepare(
    "SELECT image_keys FROM reports WHERE id = ?"
  ).bind(id).first<{ image_keys: string | null }>();

  if (!row) return new Response("Not found", { status: 404 });

  const keys: string[] = JSON.parse(row.image_keys || "[]");
  const key = keys[Number(index)];
  if (!key) return new Response("Not found", { status: 404 });

  const object = await env.QC_BUCKET.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
