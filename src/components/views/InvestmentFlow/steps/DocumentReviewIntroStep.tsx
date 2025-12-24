import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';

// Document review intro FAQ items
const INTRO_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Why do I need to verify my identity?',
    answer:
      'Goodfin is a private investment platform, and identity verification helps ensure that every investor is real, verified, and eligible to participate. This protects you, the companies you invest in, and the integrity of the platform.',
  },
  {
    question: 'How does this protect me?',
  },
  {
    question: 'What information will you collect?',
  },
  {
    question: 'Is my data safe?',
  },
];

interface DocumentReviewIntroStepProps {
  amount: number;
  company: CompanyData;
  onContinue: () => void;
  onBack?: () => void;
}

export function DocumentReviewIntroStep({
  amount,
  company,
  onContinue,
}: DocumentReviewIntroStepProps) {
  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-1.5 items-start px-2.5 py-6 w-full">
        <h1
          className="text-[28px] leading-[32px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          2. Review your investment documents
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - Intro Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-8 p-8 w-full rounded-lg">
            {/* Section 1: Introduction */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[32px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Before your sign, we want you to feel fully informed
              </h2>
              <p
                className="text-[16px] leading-[20px] text-[#685f6a]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                These documents outline the terms of your investment, how your capital is
                handled, and your rights as an investor. Take your time reviewing them —
                you'll sign only when you're ready.
              </p>
            </div>

            {/* Illustration */}
            <div className="w-full aspect-[3/2] rounded-[12px] border border-[#e0ddd8] bg-gradient-to-br from-[#f8f7f5] to-[#f0eeeb] flex items-center justify-center overflow-hidden">
              <div className="relative flex items-center gap-4">
                {/* Document stack */}
                <div className="relative">
                  {/* Back document */}
                  <div className="absolute -left-2 -top-2 w-[100px] h-[130px] bg-white rounded shadow-sm border border-[#e8e5df] transform rotate-[-6deg]" />
                  {/* Middle document */}
                  <div className="absolute -left-1 -top-1 w-[100px] h-[130px] bg-white rounded shadow-sm border border-[#e8e5df] transform rotate-[-3deg]" />
                  {/* Front document with text */}
                  <div className="relative w-[100px] h-[130px] bg-white rounded shadow-md border border-[#d8d5cf] p-3">
                    <div className="w-full h-2 bg-[#e8e5df] rounded mb-2" />
                    <div className="w-3/4 h-2 bg-[#e8e5df] rounded mb-2" />
                    <div className="w-full h-1.5 bg-[#f0eeeb] rounded mb-1" />
                    <div className="w-full h-1.5 bg-[#f0eeeb] rounded mb-1" />
                    <div className="w-2/3 h-1.5 bg-[#f0eeeb] rounded mb-3" />
                    <div className="w-full h-2 bg-[#e8e5df] rounded mb-2" />
                    <div className="w-full h-1.5 bg-[#f0eeeb] rounded mb-1" />
                    <div className="w-full h-1.5 bg-[#f0eeeb] rounded" />
                  </div>
                </div>

                {/* Magnifying glass */}
                <div className="relative -ml-6 mt-8">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="14"
                      fill="white"
                      stroke="#9a9a8a"
                      strokeWidth="3"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="44"
                      y2="44"
                      stroke="#9a9a8a"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Shield with checkmark */}
                <div className="relative -ml-2 -mt-4">
                  <svg
                    width="56"
                    height="68"
                    viewBox="0 0 56 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28 0L56 10V30C56 50 42 63 28 68C14 63 0 50 0 30V10L28 0Z"
                      fill="url(#introShieldGradient)"
                      stroke="#a8c5a8"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17 34L24 41L39 26"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="introShieldGradient"
                        x1="28"
                        y1="0"
                        x2="28"
                        y2="68"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7fa87f" />
                        <stop offset="1" stopColor="#5a8a5a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Section 2: Confidence Info */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                You're reviewing with confidence
              </h2>
              <div className="flex flex-col gap-2">
                {/* Confidence item 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e8d9a0] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="#8a7a4a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[24px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Your documents are presented exactly as filed
                  </p>
                </div>
                {/* Confidence item 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e8d9a0] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="#8a7a4a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[24px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    No hidden terms or last-minute changes
                  </p>
                </div>
                {/* Confidence item 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e8d9a0] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="#8a7a4a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[24px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    You'll receive a copy of everything you sign
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onContinue}
              className={cn(
                'w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]',
                'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                'relative overflow-hidden'
              )}
              style={{
                fontFamily: 'Soehne Kraftig, sans-serif',
                background:
                  'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
              }}
            >
              Continue to documents
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={INTRO_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
