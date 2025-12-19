import React from 'react';
import { InputBarV02 } from '../views/Welcome02';

type ChatLayoutProps = {
  userMessage?: string;
  children: React.ReactNode;
  inputPlaceholder?: string;
  showInput?: boolean;
};


export function ChatLayout({
  userMessage,
  children,
  inputPlaceholder = 'Type your response...',
  showInput = true,
}: ChatLayoutProps) {

  return (
    <div className="w-full h-full relative flex flex-col">
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
        className="relative z-10 flex-1 flex flex-col"
        style={{ backgroundColor: 'var(--chat-container-bg)' }}
      >
        {/* Chat Container - Scrollable content area */}
        <main className={`flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-4 py-8 ${showInput ? 'pb-32' : 'pb-8'}`}>
          {/* Single User Message (legacy support) */}
          {userMessage && (
            <div className="flex justify-end mb-6">
              <div
                className="font-primary"
                style={{
                  backgroundColor: '#F0EEF0',
                  color: '#030303',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  maxWidth: '450px',
                  boxShadow: '0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.50) inset',
                }}
              >
                <p className="text-sm leading-relaxed">{userMessage}</p>
              </div>
            </div>
          )}

          {/* Chat Content (AI Response or full conversation) */}
          {children}
        </main>

        {/* Input Area - Using InputBarV02 - Sticky at bottom of component */}
        {showInput && (
          <div className="sticky bottom-0 pt-6 pb-4 px-4 z-10" style={{ backgroundColor: 'var(--chat-container-bg)' }}>
            <div className="max-w-3xl mx-auto">
              <InputBarV02 currentMode="default" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
