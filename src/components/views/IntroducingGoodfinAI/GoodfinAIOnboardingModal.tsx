import { useState, useCallback, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Fixed dimensions for consistent layout
const MODAL_IMAGE_HEIGHT = 340;
const MODAL_CONTENT_HEIGHT = 180;

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(0);

  // Staggered animation states
  const [showImage, setShowImage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] = useState(false);

  const steps = useMemo(() => [
    {
      image: '/img/introduction_goodfin_ai.png',
      title: 'Meet Goodfin AI',
      description: 'Purpose built intelligent private market assistant.',
      objectFit: 'cover' as const,
    },
    {
      image: '/img/introduction_goodfin_ai_deep_research.png',
      title: 'Your new financial superpower',
      description: 'Ask anything, track your portfolio, explore new deals, and invest — all with the help of AI.',
      objectFit: 'contain' as const,
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

  // Reset step and play initial staggered animation when modal opens
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setDisplayStep(0);
      setIsTransitioning(false);
      setHasInitialAnimationPlayed(false);
      setShowImage(false);
      setShowContent(false);
      setShowActions(false);

      // Staggered reveal animation on modal open
      setTimeout(() => setShowImage(true), 100);
      setTimeout(() => setShowContent(true), 200);
      setTimeout(() => {
        setShowActions(true);
        setHasInitialAnimationPlayed(true);
      }, 300);
    }
  }, [open]);

  // Handle step transition with staggered fade animation (only image and content, not actions)
  const transitionToStep = useCallback((newStep: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Staggered fade out: content -> image (actions stay visible)
    setShowContent(false);
    setTimeout(() => setShowImage(false), 50);

    // After fade out completes, change the content
    setTimeout(() => {
      setDisplayStep(newStep);
      setCurrentStep(newStep);

      // Staggered fade in: image -> content (actions already visible)
      setTimeout(() => setShowImage(true), 50);
      setTimeout(() => {
        setShowContent(true);
        setIsTransitioning(false);
      }, 150);
    }, 150);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    if (currentStep < steps.length - 1) {
      transitionToStep(currentStep + 1);
    } else {
      onClose('done');
    }
  }, [currentStep, steps.length, onClose, transitionToStep, isTransitioning]);

  const handleBack = useCallback(() => {
    if (isTransitioning) return;

    if (currentStep > 0) {
      transitionToStep(currentStep - 1);
    }
  }, [currentStep, transitionToStep, isTransitioning]);

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
        style={{ height: `${MODAL_IMAGE_HEIGHT + MODAL_CONTENT_HEIGHT}px` }}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[var(--grey-600)]" />
        </button>

        {/* Image Section - Fixed Height */}
        <div
          className={cn(
            'w-full overflow-hidden transition-all duration-150',
            showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          )}
          style={{
            height: `${MODAL_IMAGE_HEIGHT}px`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <img
            src={steps[displayStep].image}
            alt={steps[displayStep].title}
            className={cn(
              'w-full h-full',
              steps[displayStep].objectFit === 'contain' ? 'object-contain' : 'object-cover object-top'
            )}
          />
        </div>

        {/* Content Section - Fixed Height */}
        <div
          className="px-6 pb-6 pt-4 text-center flex flex-col justify-between"
          style={{ height: `${MODAL_CONTENT_HEIGHT}px` }}
        >
          {/* Title & Description */}
          <div
            className={cn(
              'transition-all duration-150',
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            {/* Title */}
            <h2
              id="goodfin-ai-onboarding-title"
              className="text-xl font-semibold text-[var(--grey-950)] mb-2 font-[var(--font-heading)]"
            >
              {steps[displayStep].title}
            </h2>

            {/* Description */}
            <p className="text-sm text-[var(--grey-800)] max-w-[400px] mx-auto font-[var(--font-primary-light)]">
              {steps[displayStep].description}
            </p>
          </div>

          {/* Navigation */}
          <div
            className={cn(
              'flex items-center justify-between mt-4 transition-all duration-150',
              showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            )}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
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
