import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../../lib/utils';

type VariantOption<T extends string> = {
  id: T;
  label: string;
};

type ChatLayoutProps<T extends string> = {
  title: string;
  subtitle: string;
  userMessage: string;
  children: React.ReactNode;
  variants?: VariantOption<T>[];
  activeVariant?: T;
  onVariantChange?: (variant: T) => void;
  inputPlaceholder?: string;
};

export function ChatLayout<T extends string>({
  title,
  subtitle,
  userMessage,
  children,
  variants,
  activeVariant,
  onVariantChange,
  inputPlaceholder = 'Type your response...',
}: ChatLayoutProps<T>) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-muted/50 to-muted">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-chat-ai-gradient-from to-chat-ai-gradient-to rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-foreground">{title}</h1>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            {/* Variant Selector */}
            {variants && variants.length > 0 && onVariantChange && (
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => onVariantChange(variant.id)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded transition-all',
                      activeVariant === variant.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* User Message */}
        <div className="flex justify-end mb-6">
          <div className="bg-chat-user text-chat-user-foreground px-4 py-2.5 rounded-2xl rounded-br-md max-w-md shadow-sm">
            <p className="text-sm">{userMessage}</p>
          </div>
        </div>

        {/* AI Response */}
        {children}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-muted rounded-2xl border border-border px-4 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
              aria-label="Chat message input"
            />
            <button
              className="p-2 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
