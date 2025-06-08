import './ChatMessage.css';

type ChatMessageProps = {
  sender: 'user' | 'bot';
  content: string;
};

export default function ChatMessage({ sender, content }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div className={`chat-row ${isUser ? 'chat-row-user' : 'chat-row-bot'}`}>
      <div className={`chat-bubble ${isUser ? 'chat-user' : 'chat-bot'}`}>
        {content}
      </div>
    </div>
  );
}

