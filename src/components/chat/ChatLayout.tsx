import React, { useState } from 'react';
import { Send } from 'lucide-react';

type ChatLayoutProps = {
  title: string;
  subtitle: string;
  userMessage: string;
  children: React.ReactNode;
  inputPlaceholder?: string;
};

export function ChatLayout({
  title,
  subtitle,
  userMessage,
  children,
  inputPlaceholder = 'Type your response...',
}: ChatLayoutProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background Effect - Exact Concierge GradientEffect */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '470px',
          height: '479px',
          borderRadius: '679px',
          background: 'var(--chat-gradient-bg)',
          backgroundBlendMode: 'hard-light',
          filter: 'blur(213px)',
          opacity: 0.4,
        }}
      />

      {/* Main Container - Exact Concierge styling */}
      <div
        className="relative z-10 min-h-screen"
        style={{ backgroundColor: 'var(--chat-container-bg)' }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-10 border-b"
          style={{
            backgroundColor: 'var(--chat-container-bg)',
            borderColor: 'var(--chat-card-border)',
          }}
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src="/conciergeIcon.png"
                alt="GoodFin AI"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1
                  className="text-sm font-semibold font-primary"
                  style={{ color: '#030303' }}
                >
                  {title}
                </h1>
                <p
                  className="text-xs"
                  style={{ color: '#7F7582' }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <main className="max-w-3xl mx-auto px-4 py-8 pb-32">
          {/* User Message - Exact Concierge ChatBubble styling */}
          <div className="flex justify-end mb-6">
            <div
              className="px-4 py-3 max-w-md"
              style={{
                backgroundColor: 'var(--chat-user-bg)',
                color: 'var(--chat-user-foreground)',
                borderRadius: '16px',
              }}
            >
              <p className="text-sm leading-relaxed font-primary">{userMessage}</p>
            </div>
          </div>

          {/* AI Response */}
          {children}
        </main>

        {/* Input Area - Exact Concierge CustomInputField styling */}
        <div
          className="fixed bottom-0 left-0 right-0 pt-6 pb-4 px-4"
          style={{
            background: `linear-gradient(to top, var(--chat-container-bg) 70%, transparent)`,
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-center gap-3 px-4 py-2"
              style={{
                backgroundColor: 'var(--chat-input-bg)',
                border: `1px solid ${isInputFocused ? 'var(--chat-input-border-focus)' : 'var(--chat-input-border)'}`,
                borderRadius: '16px',
                boxShadow: isInputFocused ? '0 0 0 1px var(--chat-input-border-focus)' : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={inputPlaceholder}
                className="flex-1 bg-transparent text-sm outline-none py-1 font-primary"
                style={{
                  color: 'var(--chat-user-foreground)',
                }}
                aria-label="Chat message input"
              />
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                style={{
                  backgroundColor: inputValue.trim() ? 'var(--chat-send-bg-active)' : 'var(--chat-send-bg)',
                  color: inputValue.trim() ? 'var(--chat-send-color-active)' : 'var(--chat-send-color)',
                  opacity: inputValue.trim() ? 1 : 0.5,
                }}
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
