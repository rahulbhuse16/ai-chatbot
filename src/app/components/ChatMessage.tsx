import { cn } from "../lib/utils";

type ChatMessageProps = {
  sender: 'user' | 'bot';
  content: string;
};

export default function ChatMessage({ sender, content }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div
      className={cn(
        'w-full flex items-start space-x-2 p-3 rounded-md',
        isUser ? 'justify-end bg-blue-100' : 'justify-start bg-gray-100'
      )}
    >
      <div
        className={cn(
          'rounded-md px-4 py-2 text-sm max-w-[80%]',
          isUser ? 'bg-blue-500 text-white' : 'bg-white text-black'
        )}
      >
        {content}
      </div>
    </div>
  );
}
