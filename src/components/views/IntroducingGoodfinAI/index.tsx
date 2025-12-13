import React, { useState, useCallback } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { GoodfinAIOnboardingModal } from './GoodfinAIOnboardingModal';

export type IntroducingGoodfinAIVariant = 'modal' | 'inline';

export const introducingGoodfinAIVariants = [
  { id: 'modal', label: 'Modal View' },
  { id: 'inline', label: 'Inline View' },
];

type IntroducingGoodfinAIViewProps = {
  variant?: IntroducingGoodfinAIVariant;
  userName?: string;
};

export function IntroducingGoodfinAIView({
  variant = 'modal',
  userName = 'there'
}: IntroducingGoodfinAIViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [completionStatus, setCompletionStatus] = useState<'done' | 'skip' | null>(null);

  const handleModalClose = useCallback((status: 'done' | 'skip') => {
    setCompletionStatus(status);
    setIsModalOpen(false);
  }, []);

  const handleReopenModal = useCallback(() => {
    setCompletionStatus(null);
    setIsModalOpen(true);
  }, []);

  if (variant === 'modal') {
    return (
      <ChatLayout showInput={false} userMessage="Tell me about Goodfin AI">
        <ChatMessage
          content={
            <div className="space-y-3">
              <p className="text-[var(--grey-800)] text-sm font-[var(--font-primary-light)]">
                Goodfin AI is your intelligent financial companion. Ask anything, track your
                portfolio, explore new investment opportunities, and invest — all with the help of AI.
              </p>
              {completionStatus && (
                <div className="mt-4 p-3 bg-[var(--grey-100)] rounded-lg">
                  <p className="text-[var(--grey-600)] text-xs">
                    Onboarding {completionStatus === 'done' ? 'completed' : 'skipped'}
                  </p>
                  <button
                    onClick={handleReopenModal}
                    className="mt-2 text-xs text-[var(--grey-800)] underline hover:text-[var(--grey-950)] transition-colors"
                  >
                    Show onboarding again
                  </button>
                </div>
              )}
            </div>
          }
          showFeedback={true}
        />
        <GoodfinAIOnboardingModal
          open={isModalOpen}
          onClose={handleModalClose}
          userName={userName}
        />
      </ChatLayout>
    );
  }

  // Inline variant - shows a summary card
  return (
    <ChatLayout showInput={false} userMessage="Tell me about Goodfin AI">
      <ChatMessage
        content={<GoodfinAIInlineCard userName={userName} />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Inline variant card component
type GoodfinAIInlineCardProps = {
  userName?: string;
};

function GoodfinAIInlineCard({ userName = 'there' }: GoodfinAIInlineCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg max-w-[500px] border border-border">
      {/* Header with gradient */}
      <div className="bg-[#DFDCE1] p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/conciergeIcon.png"
            alt="Goodfin AI"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-[var(--grey-950)] font-[var(--font-heading)]">
              Hi {userName}!
            </h3>
            <p className="text-sm text-[var(--grey-600)]">What can I help you with today?</p>
          </div>
        </div>

        {/* Sample portfolio cards */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <div className="flex-shrink-0 bg-[var(--grey-50)] rounded-lg p-3 min-w-[140px] border border-[var(--grey-200)]">
            <p className="text-xs text-[var(--grey-500)] mb-1">Total Portfolio Value*</p>
            <p className="text-lg font-semibold text-[var(--grey-950)]">$274,000<span className="text-sm">.00</span></p>
            <span className="text-xs text-[var(--green-700)]">+37%</span>
          </div>
          <div className="flex-shrink-0 bg-[var(--grey-50)] rounded-lg p-3 min-w-[100px] border border-[var(--grey-200)]">
            <p className="text-xs text-[var(--grey-500)] mb-1">Top Performing</p>
            <p className="text-sm font-semibold text-[var(--grey-950)]">Anthropic</p>
          </div>
        </div>
        <p className="text-[10px] text-[var(--grey-500)] mt-2">*snapshot of a sample portfolio</p>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h4 className="text-lg font-semibold text-[var(--grey-900)] mb-2">
          Meet Goodfin AI
        </h4>
        <p className="text-sm text-[var(--grey-600)] mb-4">
          Ask anything, track your portfolio, explore new deals, and invest — all with the help of AI.
        </p>

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['Learn more about Goodfin', 'Summarize my portfolio', 'Most valuable AI startups'].map((suggestion) => (
            <span
              key={suggestion}
              className="px-3 py-1.5 bg-[var(--grey-50)] rounded-full text-xs text-[var(--grey-700)] border border-[var(--grey-200)]"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { GoodfinAIOnboardingModal } from './GoodfinAIOnboardingModal';
export { GoodfinAIInlineCard };
