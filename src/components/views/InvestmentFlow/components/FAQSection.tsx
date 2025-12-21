import { cn } from '@/lib/utils';
import type { FAQItem } from '../types';

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ items, className }: FAQSectionProps) {
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
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h4 className="text-xl text-[#373338] tracking-tight font-['Test_Signifier',serif]">
              {item.question}
            </h4>
            {item.answer && (
              <p className="text-sm text-[#69606d] leading-5">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
