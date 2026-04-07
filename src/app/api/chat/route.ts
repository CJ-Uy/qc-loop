import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

const SYSTEM_MESSAGE = {
  role: "system" as const,
  content:
    "You are Kaya, a helpful assistant for Quezon City residents. You help with civic issues, city services, flood alerts, waste management, and community concerns in QC. Keep responses concise and friendly.",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const { messages }: { messages: ChatMessage[] } = await request.json();
  const { env } = await getCloudflareContext({ async: true });

  // Cast to any: wrangler type definitions lag behind available models at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (env.AI as any).run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [SYSTEM_MESSAGE, ...messages],
  });

  const response =
    typeof result === "object" && result !== null && "response" in result
      ? (result as { response: string }).response
      : "Sorry, I couldn't generate a response right now.";

  return NextResponse.json({ response });
}
