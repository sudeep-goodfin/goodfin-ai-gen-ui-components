import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../types';

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ items, className }: FAQSectionProps) {
  // First item with an answer is open by default
  const firstAnswerIndex = items.findIndex((item) => !!item.answer);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    firstAnswerIndex >= 0 ? firstAnswerIndex : null
  );

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className={cn(
        'bg-[#f4f3f5] p-8 flex flex-col gap-6',
        className
      )}
      style={{
        boxShadow: 'inset 1.045px 0.836px 0.836px 0px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Header */}
      <span className="text-xs font-semibold uppercase tracking-wide text-[#8a7f91]">
        Frequently asked questions
      </span>

      {/* FAQ items */}
      <div className="flex flex-col">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const hasAnswer = !!item.answer;

          return (
            <div
              key={index}
              className={cn(
                'border-b border-[#e0ddd8] last:border-b-0',
                hasAnswer && 'cursor-pointer'
              )}
            >
              <button
                onClick={() => hasAnswer && toggleItem(index)}
                className={cn(
                  'w-full flex items-start justify-between gap-3 py-4 text-left',
                  !hasAnswer && 'cursor-default'
                )}
                disabled={!hasAnswer}
              >
                <h4 className="text-[16px] leading-[22px] text-[#373338] tracking-tight font-['Test_Signifier',serif]">
                  {item.question}
                </h4>
                {hasAnswer && (
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-[#8a7f91] flex-shrink-0 transition-transform duration-300',
                      isExpanded && 'rotate-180'
                    )}
                  />
                )}
              </button>

              {/* Animated answer container */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-out',
                  isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                {item.answer && (
                  <p className="text-sm text-[#69606d] leading-5 pb-4">
                    {item.answer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
