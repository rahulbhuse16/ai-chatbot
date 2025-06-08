'use client';

import { useState } from 'react';
import { getCodeFromPrompt } from '../lib/vercel-ai';
import ChatInput from '../components/ChatInput';
import LivePreview from '../components/LivePreview';
import './ChatPage.css';

export default function ChatPage() {
  // Store messages as objects to differentiate user vs AI
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (prompt: string) => {
    setError(null);
    setLoading(true);

    // Add user prompt to messages
    setMessages((prev) => [...prev, { sender: 'user', text: prompt }]);

    try {
      const generatedCode = await getCodeFromPrompt(prompt);

      if (!generatedCode) {
        setError('No code generated.');
        setLoading(false);
        return;
      }

      // Add AI response to messages
      setMessages((prev) => [...prev, { sender: 'ai', text: generatedCode }]);

      setHtmlCode(generatedCode);
    } catch (err) {
      console.error('Error fetching generated code:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">HTML & CSS Generator Chatbot</h1>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {/* For AI, show code block for readability */}
            {msg.sender === 'ai' ? (
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</pre>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Show error if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Show loading state */}
        {loading && <div className="loading-message">Generating code...</div>}

        {/* Live preview of generated HTML */}
        <LivePreview code={htmlCode} />

        {/* Chat input for new prompts */}
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

