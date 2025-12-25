import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  onStreamComplete?: () => void;
}

export function ChatMessage({
  role,
  content,
  isStreaming = false,
  onStreamComplete,
}: ChatMessageProps) {
  const [displayedText, setDisplayedText] = useState(isStreaming ? '' : content);

  // Streaming animation
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(content);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= content.length) {
        setDisplayedText(content.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onStreamComplete?.();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content, isStreaming, onStreamComplete]);

  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[80%] px-4 py-3 bg-[#373338] text-white rounded-2xl rounded-br-sm"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          <p className="text-[14px] leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5af5] to-[#5a3fd4] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div
        className="flex-1 max-w-[85%] px-4 py-3 bg-white rounded-2xl rounded-tl-sm shadow-sm border border-[#e8e5e8]"
        style={{ fontFamily: 'Soehne, sans-serif' }}
      >
        <p className="text-[14px] leading-relaxed text-[#373338]">
          {displayedText}
          {isStreaming && displayedText.length < content.length && (
            <span className="inline-block w-2 h-4 bg-[#7a5af5] ml-0.5 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}
