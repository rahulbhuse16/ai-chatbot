'use client';
import { useState } from 'react';
import { getCodeFromPrompt } from '../lib/vercel-ai';
import ChatInput from '../components/ChatInput';
import LivePreview from '../components/LivePreview';


export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [htmlCode, setHtmlCode] = useState<string>('');

  const handleSubmit = async (prompt: string) => {
    setMessages((prev) => [...prev, prompt]);
    const generatedCode = await getCodeFromPrompt(prompt);
    setHtmlCode(generatedCode);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HTML & CSS Generator Chatbot</h1>
      <div className="flex flex-col space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded">{msg}</div>
        ))}
        <LivePreview code={htmlCode} />
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
