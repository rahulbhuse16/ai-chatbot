'use client';
import { useState } from 'react';

export default function ChatInput({ onSubmit }: { onSubmit: (prompt: string) => void }) {
  const [input, setInput] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          onSubmit(input.trim());
          setInput('');
        }
      }}
      className="flex space-x-2 mt-4"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border p-2 rounded"
        placeholder="Describe the landing page you want..."
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Generate
      </button>
    </form>
  );
}
