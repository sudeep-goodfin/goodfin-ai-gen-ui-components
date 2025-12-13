import { useState, useCallback, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

type GoodfinAIOnboardingModalProps = {
  open: boolean;
  onClose: (status: 'done' | 'skip') => void;
  userName?: string;
};

export function GoodfinAIOnboardingModal({
  open,
  onClose,
}: GoodfinAIOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(() => [
    {
      image: '/img/introduction_goodfin_ai.png',
      title: 'Meet Goodfin AI',
      description: 'Purpose built intelligent private market assistant.',
    },
    {
      image: '/img/introduction_goodfin_ai_deep_research.png',
      title: 'Your new financial superpower',
      description: 'Ask anything, track your portfolio, explore new deals, and invest — all with the help of AI.',
    },
  ], []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose('skip');
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Reset step when modal opens
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
    }
  }, [open]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose('done');
    }
  }, [currentStep, steps.length, onClose]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    onClose('skip');
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="goodfin-ai-onboarding-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 w-[90vw] max-w-[668px] bg-white rounded-xl overflow-hidden',
          'shadow-[0_8px_32px_rgba(0,0,0,0.15)]',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[var(--grey-600)]" />
        </button>

        {/* Image Section */}
        <div className="w-full">
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 pt-4 text-center">
          {/* Title */}
          <h2
            id="goodfin-ai-onboarding-title"
            className="text-xl font-semibold text-[var(--grey-950)] mb-2 font-[var(--font-heading)]"
          >
            {steps[currentStep].title}
          </h2>

          {/* Description */}
          <p className="text-sm text-[var(--grey-800)] mb-6 max-w-[400px] mx-auto font-[var(--font-primary-light)]">
            {steps[currentStep].description}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Skip (desktop) / Back (mobile) */}
            <div className="w-[100px]">
              <button
                onClick={handleSkip}
                className="hidden sm:block text-sm text-[var(--grey-400)] hover:text-[var(--grey-600)] transition-colors"
              >
                skip
              </button>
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(
                  'sm:hidden px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  currentStep === 0
                    ? 'border-[var(--grey-200)] text-[var(--grey-300)] cursor-not-allowed'
                    : 'border-[var(--grey-400)] text-[var(--grey-600)] hover:bg-[var(--grey-50)]'
                )}
              >
                Back
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentStep ? 'bg-[var(--grey-900)]' : 'bg-[var(--grey-300)]'
                  )}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 w-[100px] justify-end">
              {/* Back button (desktop) */}
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(
                  'hidden sm:block px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  currentStep === 0
                    ? 'border-[var(--grey-200)] text-[var(--grey-300)] cursor-not-allowed'
                    : 'border-[var(--grey-400)] text-[var(--grey-600)] hover:bg-[var(--grey-50)]'
                )}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-[var(--grey-800)] text-white text-sm font-medium hover:bg-[var(--grey-900)] transition-colors min-w-[70px]"
              >
                {currentStep === steps.length - 1 ? 'Done' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
