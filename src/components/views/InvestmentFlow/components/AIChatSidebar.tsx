import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Send, FileText } from 'lucide-react';
import goodfinAvatar from '../../Welcome02/assets/goodfin-ai-avatar.png';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  attachment?: {
    type: 'pdf';
    title: string;
  };
}

interface AIChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
}

// Mock AI responses based on document type
const MOCK_INITIAL_AI_RESPONSE = `I've reviewed the document you shared. Here's a quick summary:

**Key Points:**
• This document outlines the terms and conditions of your investment
• It includes important disclosures about risks and fees
• Your signature indicates you've read and understood these terms

Feel free to ask me anything specific about this document!`;

const MOCK_RESPONSES = [
  "That's a great question! This section explains how your investment will be managed and the responsibilities of each party involved.",
  "The fee structure is outlined in Section 3. Typically, there's a management fee of 2% annually and a performance fee of 20% on profits above a certain threshold.",
  "Your investment is protected through the LLC structure, which limits your liability to the amount you've invested. You won't be personally liable for any debts of the fund.",
  "You can request to withdraw your investment during the quarterly redemption windows, typically with 90 days notice. However, there may be lock-up periods in the first year.",
];

export function AIChatSidebar({
  isOpen,
  onClose,
  documentTitle,
}: AIChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: 'Can you help me understand this document?',
      attachment: {
        type: 'pdf',
        title: documentTitle,
      },
    },
    {
      id: '2',
      role: 'ai',
      content: MOCK_INITIAL_AI_RESPONSE,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimated(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimated(false);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300',
          isAnimated ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50',
          'flex flex-col',
          'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isAnimated ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e4e7]">
          <div className="flex items-center gap-3">
            <img
              src={goodfinAvatar}
              alt="Goodfin AI"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span
                className="text-[14px] leading-[18px] text-[#373338] font-medium"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Chat with document
              </span>
              <span
                className="text-[12px] leading-[16px] text-[#8a7f91]"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                {documentTitle}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f4f3f5] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#685f6a]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-3',
                  message.role === 'user'
                    ? 'bg-[#373338] text-white rounded-br-md'
                    : 'bg-[#f4f3f5] text-[#373338] rounded-bl-md'
                )}
              >
                {/* PDF Attachment Preview */}
                {message.attachment && (
                  <div className="mb-2 p-2 bg-white/10 rounded-lg border border-white/20 flex items-center gap-2">
                    <div className="w-10 h-12 bg-[#dc2626] rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="text-[13px] leading-[16px] font-medium truncate"
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {message.attachment.title}
                      </span>
                      <span
                        className="text-[11px] leading-[14px] opacity-70"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        PDF Document
                      </span>
                    </div>
                  </div>
                )}
                <p
                  className="text-[14px] leading-[20px] whitespace-pre-wrap"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#e6e4e7]">
          <div className="flex items-end gap-2 bg-[#f4f3f5] rounded-2xl px-4 py-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about this document..."
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none text-[14px] leading-[20px] text-[#373338] placeholder:text-[#a9a4ab]"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={cn(
                'p-2 rounded-full transition-colors',
                inputValue.trim()
                  ? 'bg-[#373338] text-white hover:bg-[#4a464b]'
                  : 'bg-[#e6e4e7] text-[#a9a4ab] cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p
            className="text-[11px] leading-[14px] text-[#a9a4ab] text-center mt-2"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            AI responses are for informational purposes only
          </p>
        </div>
      </div>
    </>
  );
}
