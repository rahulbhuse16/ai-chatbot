import { createStreamableUI } from 'ai/rsc';

export const getCodeFromPrompt = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/genai', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  const { html } = await response.json();
  return html;
};
