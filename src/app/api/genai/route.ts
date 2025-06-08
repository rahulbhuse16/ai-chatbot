import { openai } from "@/app/lib/openai";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // use this instead of 'gpt-4'

    messages,
    stream: true,
  });

  // The response.body is a ReadableStream
  // Return it as a streaming response directly
  //@ts-ignore
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
