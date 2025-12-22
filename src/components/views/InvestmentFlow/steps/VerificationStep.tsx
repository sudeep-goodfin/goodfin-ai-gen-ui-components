import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';

// KYC-specific FAQ items
const KYC_FAQ_ITEMS: FAQItem[] = [
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

interface VerificationStepProps {
  amount: number;
  company: CompanyData;
  onVerify: () => void;
  onBack?: () => void;
}

export function VerificationStep({
  amount,
  company,
  onVerify,
  onBack,
}: VerificationStepProps) {
  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-2.5 items-center justify-center px-2.5 py-8 w-full">
        <h1
          className="text-[42px] leading-[40px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          A few quick steps to get you started
        </h1>
        <p
          className="text-[24px] leading-[32px] text-[#685f6a] w-full"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          You'll only need to do this once.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - KYC Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-8 p-8 w-full">
            {/* Section 1: Identity Verification */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                We need to verify your identity
              </h2>
              <p
                className="text-[16px] leading-[20px] text-[#685f6a]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                To make sure it's really you, we need to check your application
                against a photo of your ID and a selfie of you.
              </p>
            </div>

            {/* Illustration */}
            <div className="w-full aspect-[1536/1024] rounded-[20px] border border-[#beb9c0] bg-gradient-to-br from-[#f8f7f5] to-[#f0eeeb] flex items-center justify-center overflow-hidden">
              {/* Shield with checkmark illustration */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -left-16 -top-8 w-8 h-8 rounded-full bg-[#e8e5df] opacity-60" />
                <div className="absolute -right-12 top-4 w-6 h-6 rounded-full bg-[#e0ddd7] opacity-40" />
                <div className="absolute left-8 bottom-0 w-4 h-4 rounded-full bg-[#d8d5cf] opacity-50" />

                {/* Main shield */}
                <div className="relative">
                  <svg
                    width="120"
                    height="140"
                    viewBox="0 0 120 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shield body */}
                    <path
                      d="M60 0L120 20V60C120 100 90 130 60 140C30 130 0 100 0 60V20L60 0Z"
                      fill="url(#shieldGradient)"
                      stroke="#a8c5a8"
                      strokeWidth="2"
                    />
                    {/* Checkmark */}
                    <path
                      d="M35 70L52 87L85 54"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="shieldGradient"
                        x1="60"
                        y1="0"
                        x2="60"
                        y2="140"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7fa87f" />
                        <stop offset="1" stopColor="#5a8a5a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Footsteps decoration */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-30">
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform rotate-12" />
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform -rotate-12" />
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform rotate-12" />
                </div>
              </div>
            </div>

            {/* Section 2: Privacy Info */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Your information stays private
              </h2>
              <div className="flex flex-col gap-1">
                {/* Privacy item 1 */}
                <div className="flex items-center gap-1.5">
                  <div className="w-[38px] h-[28px] flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L4 6V12C4 16.42 7.32 20.5 12 22C16.68 20.5 20 16.42 20 12V6L12 2Z"
                        fill="#e8d9a0"
                        stroke="#c9b97a"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="#8a7a4a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[30px] text-[#685f6a] flex-1"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Your data is secure and private
                  </p>
                </div>
                {/* Privacy item 2 */}
                <div className="flex items-center gap-1.5">
                  <div className="w-[41px] h-[30px] flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r="10"
                        fill="#a8d4e6"
                        stroke="#7ab8d4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 8V14L17 17"
                        stroke="#4a8aa8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[30px] text-[#685f6a] flex-1"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    You're always in control
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onVerify}
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
              Verify Identity with Footprint
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={KYC_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
