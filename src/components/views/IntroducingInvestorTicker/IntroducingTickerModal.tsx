import React, { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

type IntroducingTickerModalProps = {
  open: boolean;
  onHandleClick: (action: 'skip' | 'explore') => void;
  location?: string;
};

export function IntroducingTickerModal({
  open,
  onHandleClick,
  location = 'dealPage',
}: IntroducingTickerModalProps) {
  const handleSkip = useCallback(() => {
    onHandleClick('skip');
  }, [onHandleClick]);

  const handleExplore = useCallback(() => {
    onHandleClick('explore');
  }, [onHandleClick]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleSkip();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleSkip]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="introducing-investor-ticker-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 w-[90vw] max-w-[668px] bg-white rounded-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.15)]',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[var(--grey-600)]" />
        </button>

        {/* Image Section */}
        <div className="w-full">
          <img
            src="/img/introduction_investor_ticker.png"
            alt="Introducing Investor Ticker"
            className="w-full h-auto rounded-t-xl"
          />
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 pt-4 text-center">
          {/* Title */}
          <h2
            id="introducing-investor-ticker-title"
            className="text-xl font-semibold text-[var(--grey-950)] mb-2 font-[var(--font-heading)]"
          >
            Introducing Investor Ticker
          </h2>

          {/* Description */}
          <p className="text-sm text-[var(--grey-800)] mb-6 max-w-[372px] mx-auto font-[var(--font-primary-light)]">
            The Goodfin Investor Ticker is now open. Your thoughtful input will help guide impactful discussion.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className={cn(
                'px-6 py-2.5 min-w-[100px] rounded-lg',
                'border border-[var(--grey-400)] text-[var(--grey-600)] bg-white',
                'hover:bg-[var(--grey-50)] hover:border-[var(--grey-500)]',
                'transition-colors text-sm font-medium'
              )}
            >
              Skip
            </button>

            {/* Explore Button */}
            <button
              onClick={handleExplore}
              className={cn(
                'px-6 py-2.5 min-w-[100px] rounded-lg',
                'bg-[var(--grey-800)] text-white',
                'hover:bg-[var(--grey-900)]',
                'transition-colors text-sm font-medium'
              )}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
