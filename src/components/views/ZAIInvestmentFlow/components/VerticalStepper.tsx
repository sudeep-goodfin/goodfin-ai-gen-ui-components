import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export interface Step {
  id: string;
  label: string;
  status: StepStatus;
  description?: string;
  ctaLabel?: string;
}

interface VerticalStepperProps {
  steps: Step[];
  onStepClick?: (stepId: string) => void;
}

export function VerticalStepper({ steps, onStepClick }: VerticalStepperProps) {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isClickable = step.status === 'current' || step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div key={step.id} className="flex">
            {/* Step indicator column */}
            <div className="flex flex-col items-center mr-4">
              {/* Circle */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  step.status === 'completed' && 'bg-[#373338] text-white',
                  step.status === 'current' && 'bg-[#373338] text-white',
                  step.status === 'upcoming' && 'bg-[#e8e5e8] text-[#a09a9f]'
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {step.status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1',
                    isCurrent ? 'min-h-[100px]' : 'min-h-[40px]',
                    step.status === 'completed' ? 'bg-[#373338]' : 'bg-[#e8e5e8]'
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div className={cn('pb-6', isLast && 'pb-0', isCurrent && 'pb-8')}>
              {/* Step label */}
              <span
                className={cn(
                  'text-[15px] font-medium block',
                  step.status === 'upcoming' ? 'text-[#a09a9f]' : 'text-[#373338]'
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {step.label}
              </span>

              {/* Description and CTA - shown only for current step */}
              {isCurrent && step.description && (
                <div className="mt-3">
                  <p
                    className="text-[13px] text-[#7f7582] leading-relaxed mb-4"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {step.description}
                  </p>

                  {step.ctaLabel && (
                    <button
                      onClick={() => onStepClick?.(step.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#373338] text-white text-sm font-medium rounded-lg hover:bg-[#29272a] transition-colors"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      {step.ctaLabel}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
