'use client';
import { useState } from 'react';
import './ChatInput.css';

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
      className="chat-input-form"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="chat-input-field"
        placeholder="Describe the landing page you want..."
      />
      <button type="submit" className="chat-submit-button">
        Generate
      </button>
    </form>
  );
}
