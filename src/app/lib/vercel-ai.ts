export const getCodeFromPrompt = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/genai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  // For non-streaming: 
  const data = await response.json();

  // Make sure your backend returns `{ html: string }`
  if (!data.html) throw new Error('No html property in API response');

  return data.html;
};
