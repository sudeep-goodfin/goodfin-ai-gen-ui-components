import React, { useState, useCallback } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { IntroducingTickerModal } from './IntroducingTickerModal';

export type IntroducingTickerVariant = 'modal' | 'inline';

export const introducingTickerVariants = [
  { id: 'modal', label: 'Modal View' },
  { id: 'inline', label: 'Inline View' },
];

type IntroducingTickerViewProps = {
  variant?: IntroducingTickerVariant;
};

export function IntroducingTickerView({ variant = 'modal' }: IntroducingTickerViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [actionTaken, setActionTaken] = useState<'skip' | 'explore' | null>(null);

  const handleModalAction = useCallback((action: 'skip' | 'explore') => {
    setActionTaken(action);
    setIsModalOpen(false);
  }, []);

  const handleReopenModal = useCallback(() => {
    setActionTaken(null);
    setIsModalOpen(true);
  }, []);

  if (variant === 'modal') {
    return (
      <ChatLayout showInput={false} userMessage="Tell me about the Investor Ticker">
        <ChatMessage
          content={
            <div className="space-y-3">
              <p className="text-[var(--grey-800)] text-sm font-[var(--font-primary-light)]">
                The Investor Ticker is a community feature that allows you to share your investment
                outlook and see insights from other Goodfin members. Your thoughtful input helps guide
                impactful discussion.
              </p>
              {actionTaken && (
                <div className="mt-4 p-3 bg-[var(--grey-100)] rounded-lg">
                  <p className="text-[var(--grey-600)] text-xs">
                    You selected: <span className="font-semibold capitalize">{actionTaken}</span>
                  </p>
                  <button
                    onClick={handleReopenModal}
                    className="mt-2 text-xs text-[var(--grey-800)] underline hover:text-[var(--grey-950)] transition-colors"
                  >
                    Show modal again
                  </button>
                </div>
              )}
            </div>
          }
          showFeedback={true}
        />
        <IntroducingTickerModal
          open={isModalOpen}
          onHandleClick={handleModalAction}
        />
      </ChatLayout>
    );
  }

  // Inline variant - shows the content directly without modal
  return (
    <ChatLayout showInput={false} userMessage="Tell me about the Investor Ticker">
      <ChatMessage
        content={<IntroducingTickerInline onAction={handleModalAction} />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Inline variant content component
type IntroducingTickerInlineProps = {
  onAction?: (action: 'skip' | 'explore') => void;
};

function IntroducingTickerInline({ onAction }: IntroducingTickerInlineProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleSkip = useCallback(() => {
    setDismissed(true);
    onAction?.('skip');
  }, [onAction]);

  const handleExplore = useCallback(() => {
    setDismissed(true);
    onAction?.('explore');
  }, [onAction]);

  if (dismissed) {
    return (
      <p className="text-[var(--grey-600)] text-sm font-[var(--font-primary-light)]">
        Thanks for checking out the Investor Ticker! You can access it anytime from the deal page.
      </p>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg max-w-[420px]">
      {/* Image Section */}
      <div className="w-full">
        <img
          src="/img/introduction_investor_ticker.png"
          alt="Introducing Investor Ticker"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-[var(--grey-950)] mb-2 font-[var(--font-heading)]">
          Introducing Investor Ticker
        </h3>
        <p className="text-sm text-[var(--grey-800)] mb-6 font-[var(--font-primary-light)]">
          The Goodfin Investor Ticker is now open. Your thoughtful input will help guide impactful discussion.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleSkip}
            className="px-6 py-2.5 rounded-lg border border-[var(--grey-400)] text-[var(--grey-600)] bg-white hover:bg-[var(--grey-50)] hover:border-[var(--grey-500)] transition-colors text-sm font-medium"
          >
            Skip
          </button>
          <button
            onClick={handleExplore}
            className="px-6 py-2.5 rounded-lg bg-[var(--grey-800)] text-white hover:bg-[var(--grey-900)] transition-colors text-sm font-medium"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export { IntroducingTickerModal } from './IntroducingTickerModal';
export { IntroducingTickerInline };
