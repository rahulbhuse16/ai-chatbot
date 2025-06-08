import { ChatCompletionRequestMessage } from 'openai-edge';
import OpenAI from 'openai';

export const runtime = 'edge';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // use this instead of 'gpt-4'

    stream: true,
    messages: messages as ChatCompletionRequestMessage[],
  });

  // The response body is a ReadableStream you can directly return as response for streaming.
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
