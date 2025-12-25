import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export interface Step {
  id: string;
  label: string;
  status: StepStatus;
  description?: string;
  ctaLabel?: string;
}

interface HorizontalStepperProps {
  steps: Step[];
  className?: string;
  selectedStepId?: string | null;
  onStepClick?: (stepId: string) => void;
}

export function HorizontalStepper({ steps, className, selectedStepId, onStepClick }: HorizontalStepperProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Scroll to active step on mount and when steps change
  useEffect(() => {
    if (activeStepRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeStep = activeStepRef.current;

      // Calculate scroll position to center the active step
      const containerWidth = container.offsetWidth;
      const stepLeft = activeStep.offsetLeft;
      const stepWidth = activeStep.offsetWidth;
      const scrollLeft = stepLeft - (containerWidth / 2) + (stepWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  }, [steps]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        'flex items-center gap-0 overflow-x-auto scrollbar-hide pb-2 -mb-2',
        'md:justify-center md:overflow-x-visible',
        className
      )}
    >
      {/* Add padding on mobile for edge spacing */}
      <div className="flex items-center px-4 md:px-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.status === 'current';
          const isSelected = selectedStepId === step.id;
          const isClickable = step.status !== 'upcoming';

          return (
            <div
              key={step.id}
              className="flex items-center"
              ref={isActive ? activeStepRef : null}
            >
              {/* Step */}
              <button
                className={cn(
                  "flex flex-col items-center",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
              >
                {/* Circle */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all flex-shrink-0',
                    step.status === 'completed' && 'bg-[#373338] text-white',
                    step.status === 'current' && 'bg-[#373338] text-white',
                    step.status === 'upcoming' && 'bg-[#e8e5e8] text-[#a09a9f]',
                    isSelected && 'ring-2 ring-offset-2 ring-[#373338]'
                  )}
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  {step.status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'text-[12px] mt-2 whitespace-nowrap',
                    step.status === 'upcoming' ? 'text-[#a09a9f]' : 'text-[#373338]',
                    isSelected && 'font-medium'
                  )}
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {step.label}
                </span>
              </button>

              {/* Connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    'w-12 md:w-16 h-0.5 mx-2 -mt-5 flex-shrink-0',
                    step.status === 'completed' ? 'bg-[#373338]' : 'bg-[#e8e5e8]'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
