import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FeedbackValue = 'up' | 'down' | null;

export type FeedbackVariant = 'default' | 'minimal' | 'with-labels';

interface FeedbackButtonsProps {
  variant?: FeedbackVariant;
  value?: FeedbackValue;
  onChange?: (value: FeedbackValue) => void;
  showConfirmation?: boolean;
  confirmationText?: string;
  upLabel?: string;
  downLabel?: string;
  className?: string;
}

export function FeedbackButtons({
  variant = 'default',
  value: controlledValue,
  onChange,
  showConfirmation = true,
  confirmationText = 'Thanks for your feedback',
  upLabel = 'Helpful',
  downLabel = 'Not helpful',
  className,
}: FeedbackButtonsProps) {
  const [internalValue, setInternalValue] = useState<FeedbackValue>(null);

  const isControlled = controlledValue !== undefined;
  const feedback = isControlled ? controlledValue : internalValue;

  const handleFeedback = (newValue: 'up' | 'down') => {
    const nextValue = feedback === newValue ? null : newValue;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <button
          onClick={() => handleFeedback('up')}
          className={cn(
            'p-1.5 rounded-md transition-all duration-200',
            feedback === 'up'
              ? 'bg-[#D7FFE8] text-[#049142]'
              : 'text-[#9B929E] hover:bg-gray-100'
          )}
          aria-label="Helpful response"
          aria-pressed={feedback === 'up'}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleFeedback('down')}
          className={cn(
            'p-1.5 rounded-md transition-all duration-200',
            feedback === 'down'
              ? 'bg-[#FFE0E3] text-[#D70032]'
              : 'text-[#9B929E] hover:bg-gray-100'
          )}
          aria-label="Not helpful response"
          aria-pressed={feedback === 'down'}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  if (variant === 'with-labels') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          onClick={() => handleFeedback('up')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
            feedback === 'up'
              ? 'bg-[#D7FFE8] text-[#049142]'
              : 'bg-gray-100 text-[#7F7582] hover:bg-gray-200'
          )}
          aria-label="Helpful response"
          aria-pressed={feedback === 'up'}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{upLabel}</span>
        </button>
        <button
          onClick={() => handleFeedback('down')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
            feedback === 'down'
              ? 'bg-[#FFE0E3] text-[#D70032]'
              : 'bg-gray-100 text-[#7F7582] hover:bg-gray-200'
          )}
          aria-label="Not helpful response"
          aria-pressed={feedback === 'down'}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{downLabel}</span>
        </button>
        {showConfirmation && feedback && (
          <span className="text-xs ml-2 flex items-center gap-1 text-[#7F7582]">
            <CheckCircle2 className="w-3 h-3" />
            {confirmationText}
          </span>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={() => handleFeedback('up')}
        className="p-2 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: feedback === 'up' ? '#D7FFE8' : 'transparent',
          color: feedback === 'up' ? '#049142' : '#9B929E',
        }}
        aria-label="Helpful response"
        aria-pressed={feedback === 'up'}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleFeedback('down')}
        className="p-2 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: feedback === 'down' ? '#FFE0E3' : 'transparent',
          color: feedback === 'down' ? '#D70032' : '#9B929E',
        }}
        aria-label="Not helpful response"
        aria-pressed={feedback === 'down'}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
      {showConfirmation && feedback && (
        <span
          className="text-xs ml-2 flex items-center gap-1"
          style={{ color: '#7F7582' }}
        >
          <CheckCircle2 className="w-3 h-3" />
          {confirmationText}
        </span>
      )}
    </div>
  );
}

// Variant definitions for the component showcase
export const feedbackButtonsVariants = [
  { id: 'default', label: 'Default' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'with-labels', label: 'With Labels' },
];
