// import type { NextRequest } from 'next/server';

// export const runtime = 'edge';

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json();

//     if (!messages || !Array.isArray(messages)) {
//       return new Response('Invalid messages format', { status: 400 });
//     }

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages,
//         stream: true,
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('OpenAI API error:', errorText);
//       return new Response(errorText, { status: response.status });
//     }

//     // Return the streaming response directly to client
//     return new Response(response.body, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache, no-transform',
//         Connection: 'keep-alive',
//       },
//     });
//   } catch (error) {
//     console.error('API handler error:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required and must be a string.' }, { status: 400 });
    }

    const code = parsePromptToHtml(prompt);
    return NextResponse.json({ code });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function parsePromptToHtml(prompt: string): string {
  const lower = prompt.toLowerCase();

  const tag = extractTag(lower) || 'div';
  const styles: string[] = [];

  const cssProps: { [key: string]: string | null } = {
    color: extractColor(lower, 'text') || 'black',
    backgroundColor: extractColor(lower, 'background') || 'white',
    borderRadius: extractValue(lower, 'border radius') || '0px',
    padding: extractValue(lower, 'padding') || '10px',
    fontSize: extractValue(lower, 'font size') || '16px',
    width: extractValue(lower, 'width'),
    height: extractValue(lower, 'height'),
  };

  for (const [key, value] of Object.entries(cssProps)) {
    if (value) styles.push(`${camelToKebab(key)}: ${value}`);
  }

  const styleString = styles.join('; ');
  const content = extractContent(lower) || `Generated ${tag}`;

  return `<${tag} style="${styleString}">${content}</${tag}>`;
}

function extractTag(text: string): string | null {
  const tags = ['button', 'div', 'h1', 'h2', 'p', 'input', 'span', 'label'];
  return tags.find((tag) => text.includes(tag)) || null;
}

function extractColor(text: string, type: 'text' | 'background'): string | null {
  const colors = ['red', 'green', 'blue', 'yellow', 'white', 'black', 'gray', 'orange', 'purple'];
  const pattern = type === 'text' ? /(\w+)\s+text/ : /(\w+)\s+background/;
  const match = text.match(pattern);
  if (match && colors.includes(match[1])) return match[1];
  return null;
}

function extractValue(text: string, property: string): string | null {
  // Matches "border radius 12px", "padding 10px", "font size 14px", "width 100px" etc.
  const regex = new RegExp(`${property}\\s+(\\d+)(px|rem|em|%)?`);
  const match = text.match(regex);
  return match ? `${match[1]}${match[2] || 'px'}` : null;
}

function extractContent(text: string): string | null {
  const labelMatch = text.match(/with label "(.*?)"/);
  if (labelMatch) return labelMatch[1];
  if (text.includes('button')) return 'Click Me';
  if (text.includes('h1')) return 'Heading 1';
  if (text.includes('h2')) return 'Heading 2';
  if (text.includes('p')) return 'Paragraph text';
  return null;
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}

