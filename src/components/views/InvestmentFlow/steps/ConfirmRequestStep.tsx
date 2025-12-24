import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';

// Confirmation FAQ items
const CONFIRM_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What am I agreeing to on this screen?',
    answer:
      "You're confirming your intent to request an allocation in this investment. This means you understand the process and are choosing to move forward to the next steps.",
  },
  {
    question: 'Is this my final commitment?',
  },
  {
    question: 'What does "requesting an allocation" mean?',
  },
  {
    question: 'When does my investment become final?',
  },
];

// Checkbox items
const CONFIRMATION_ITEMS = [
  {
    id: 'allocation',
    label: "You're requesting an allocation",
  },
  {
    id: 'finalized',
    label: 'Your investment is finalized after funding',
  },
  {
    id: 'managed',
    label: "You're investing through a Goodfin-managed vehicle",
  },
];

interface ConfirmRequestStepProps {
  amount: number;
  company: CompanyData;
  onConfirm: () => void;
  onBack?: () => void;
  /** When true, all checkboxes are pre-checked (user has completed document signing) */
  documentsSigned?: boolean;
}

export function ConfirmRequestStep({
  amount,
  company,
  onConfirm,
  documentsSigned = true,
}: ConfirmRequestStepProps) {
  // Pre-check all items if documents have been signed
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (documentsSigned) {
      return CONFIRMATION_ITEMS.reduce(
        (acc, item) => ({ ...acc, [item.id]: true }),
        {}
      );
    }
    return {};
  });

  const allChecked = CONFIRMATION_ITEMS.every((item) => checkedItems[item.id]);

  const handleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-1.5 items-start px-2.5 py-6 w-full">
        <h1
          className="text-[28px] leading-[32px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          Confirm your investment request
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - Confirmation Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-8 p-8 w-full rounded-lg">
            {/* Section Title */}
            <div className="flex flex-col gap-2 w-full">
              <h2
                className="text-[28px] leading-[32px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Confirm your investment request
              </h2>
              <p
                className="text-[14px] leading-[18px] text-[#685f6a]"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Please review and acknowledge the following before continuing.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              {CONFIRMATION_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                      checkedItems[item.id]
                        ? 'bg-[#5a8a5a] border-[#5a8a5a]'
                        : 'bg-white border-[#beb9c0] group-hover:border-[#8a7f91]'
                    )}
                    onClick={() => handleCheck(item.id)}
                  >
                    {checkedItems[item.id] && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onConfirm}
              disabled={!allChecked}
              className={cn(
                'w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]',
                'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                'relative overflow-hidden',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-opacity'
              )}
              style={{
                fontFamily: 'Soehne Kraftig, sans-serif',
                background:
                  'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
              }}
            >
              I understand and agree to proceed with this investment request
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={CONFIRM_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
