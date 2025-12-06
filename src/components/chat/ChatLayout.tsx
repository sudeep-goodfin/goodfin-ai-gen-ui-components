import React, { useState } from 'react';
import { Send, Mic, X } from 'lucide-react';

type ChatLayoutProps = {
  userMessage: string;
  children: React.ReactNode;
  inputPlaceholder?: string;
};

// Deep Research Analyst SVG Icon
function DeepResearchIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.09091 1.86601C7.82928 2.00677 6.61769 2.43913 5.55199 3.12891C4.48628 3.81869 3.59568 4.74696 2.95061 5.84031C2.30555 6.93367 1.92372 8.16211 1.83532 9.42849C1.74693 10.6949 1.95439 11.9644 2.44129 13.137C2.92819 14.3097 3.68119 15.3522 4.64074 16.1833C5.60029 17.0144 6.74006 17.611 7.96989 17.9257C9.19973 18.2403 10.4859 18.2646 11.7268 17.9963C12.9675 17.728 14.1289 17.175 15.1191 16.3806L13.1891 14.4233C12.522 14.9031 11.7565 15.2262 10.9479 15.3686C10.1394 15.5109 9.30879 15.4689 8.51861 15.2456C7.72843 15.0222 6.99888 14.6234 6.38434 14.0788C5.76981 13.5341 5.28617 12.8578 4.9695 12.1002C4.65283 11.3426 4.51129 10.5232 4.55546 9.70331C4.59962 8.88337 4.83832 8.08398 5.24675 7.36476C5.65518 6.64554 6.22977 6.02504 6.92145 5.54958C7.61314 5.07412 8.40353 4.75591 9.09091 4.61874V1.86601ZM10.9091 1.86601V4.61874C12.0258 4.80803 13.0559 5.3401 13.8568 6.1409C14.6577 6.94169 15.1897 7.97201 15.3791 9.08873H18.1318C17.9251 7.24432 17.0977 5.52491 15.7853 4.21253C14.4729 2.90016 12.7535 2.07276 10.9091 1.86601ZM18.1318 10.9069C17.9628 12.4378 17.3633 13.8893 16.4028 15.0933L14.4663 13.1296C14.9319 12.4658 15.2439 11.7064 15.3791 10.9069H18.1318ZM0 9.99783C0 4.47510 4.47727 -0.00216797 10 -0.00216797C15.5227 -0.00216797 20 4.47510 20 9.99783C20 15.5206 15.5227 19.9978 10 19.9978C4.47727 19.9978 0 15.5206 0 9.99783ZM10 6.36146C9.03557 6.36146 8.11066 6.74457 7.42870 7.42653C6.74674 8.10849 6.36364 9.03340 6.36364 9.99783C6.36364 10.9623 6.74674 11.8872 7.42870 12.5691C8.11066 13.2511 9.03557 13.6342 10 13.6342C10.9644 13.6342 11.8893 13.2511 12.5713 12.5691C13.2533 11.8872 13.6364 10.9623 13.6364 9.99783C13.6364 9.03340 13.2533 8.10849 12.5713 7.42653C11.8893 6.74457 10.9644 6.36146 10 6.36146Z"
        fill={active ? '#F0EEF0' : '#554D57'}
      />
    </svg>
  );
}

export function ChatLayout({
  userMessage,
  children,
  inputPlaceholder = 'Type your response...',
}: ChatLayoutProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDeepResearchEnabled, setIsDeepResearchEnabled] = useState(false);

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
        {/* Chat Container */}
        <main className="max-w-3xl mx-auto px-4 py-8 pb-32">
          {/* User Message - Exact Concierge TextType styling */}
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

          {/* AI Response */}
          {children}
        </main>

        {/* Input Area - Exact Concierge InputBox styling */}
        <div
          className="fixed bottom-0 left-0 right-0 pt-6 pb-4 px-4"
          style={{
            background: `linear-gradient(to top, var(--chat-container-bg) 70%, transparent)`,
          }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Input Container */}
            <div
              className="w-full flex flex-col gap-2 px-3 py-2"
              style={{
                backgroundColor: 'var(--chat-input-bg)',
                border: '2px solid #FFFFFF',
                borderRadius: '24px',
                boxShadow: '0px 2px 8px 0px rgba(164, 140, 160, 0.20)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              {/* Top Row - Avatar + Input + Action Buttons */}
              <div className="flex items-center gap-2">
                {/* GoodFin Avatar */}
                <img
                  src="/conciergeIcon.png"
                  alt="GoodFin"
                  className="w-9 h-9 rounded-full flex-shrink-0"
                />

                {/* Input Field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder={isDeepResearchEnabled ? 'Type to run a financial deep dive' : inputPlaceholder}
                  className="flex-1 bg-transparent text-sm outline-none py-1 font-primary"
                  style={{
                    color: 'var(--chat-user-foreground)',
                    fontWeight: 500,
                  }}
                  aria-label="Chat message input"
                />

                {/* Action Buttons */}
                {inputValue.trim() ? (
                  <button
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-grey-100"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" style={{ color: '#030303' }} />
                  </button>
                ) : (
                  <button
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-grey-100"
                    aria-label="Voice input"
                  >
                    <Mic className="w-5 h-5" style={{ color: '#030303' }} />
                  </button>
                )}
              </div>

              {/* Bottom Row - Deep Research Toggle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsDeepResearchEnabled(!isDeepResearchEnabled)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: isDeepResearchEnabled ? '#685F6A' : 'transparent',
                    cursor: 'pointer',
                  }}
                  aria-label="Toggle Deep Research Analyst"
                  aria-pressed={isDeepResearchEnabled}
                >
                  <DeepResearchIcon active={isDeepResearchEnabled} />
                  <span
                    className="text-sm font-primary"
                    style={{
                      color: isDeepResearchEnabled ? '#F0EEF0' : '#030303',
                    }}
                  >
                    Deep Research Analyst
                  </span>
                  {isDeepResearchEnabled && (
                    <X
                      className="w-5 h-5 ml-1 cursor-pointer hover:opacity-80"
                      style={{ color: '#9B929E' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDeepResearchEnabled(false);
                      }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Disclaimer Text */}
            <p
              className="text-xs text-center mt-2 font-primary px-4"
              style={{ color: '#7F7582' }}
            >
              Goodfin AI Concierge does not provide tax, financial, investment, or legal advice. It can present inaccurate information. Make sure to validate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
