import { cn } from '@/lib/utils';
import { TransferMethodCard } from '../components/TransferMethodCard';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import type { TransferMethod, CompanyData, TransferMethodOption, FAQItem } from '../types';

interface TransferMethodStepProps {
  amount: number;
  company: CompanyData;
  transferMethods: TransferMethodOption[];
  faqItems: FAQItem[];
  selectedMethod: TransferMethod | null;
  onSelectMethod: (method: TransferMethod) => void;
  onNext: () => void;
  className?: string;
}

export function TransferMethodStep({
  amount,
  company,
  transferMethods,
  faqItems,
  selectedMethod,
  onSelectMethod,
  onNext,
  className,
}: TransferMethodStepProps) {
  return (
    <div className={cn('w-full max-w-[1032px] mx-auto px-2.5 py-2.5', className)}>
      {/* Title section */}
      <div className="flex flex-col gap-1.5 items-center justify-center px-2.5 py-6">
        <h1
          className="text-[28px] leading-[32px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          Choose how you'd like to transfer funds
        </h1>
        <p
          className="text-[16px] leading-[24px] text-[#685f6a] w-full"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          We'll provide transfer instructions after verification and signing.
        </p>
      </div>

      {/* Two column layout */}
      <div className="flex items-start justify-between gap-5">
        {/* Left column - Transfer methods */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-8 p-8 w-full rounded-lg overflow-hidden">
            <div className="flex flex-col gap-8">
              {/* Section header */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[24px] leading-6 text-[#554d57] font-['Test_Signifier',serif]">
                  Available transfer methods
                </h2>
                <p className="text-base font-medium text-[#685f6a] leading-5">
                  Select how you plan to transfer funds. We'll share the required
                  bank details once your investment is ready to be funded.
                </p>
              </div>

              {/* Transfer method cards */}
              <div className="flex flex-col gap-4">
                {transferMethods.map((method) => (
                  <TransferMethodCard
                    key={method.id}
                    option={method}
                    isSelected={selectedMethod === method.id}
                    onSelect={() => onSelectMethod(method.id)}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={onNext}
                disabled={!selectedMethod}
                className={cn(
                  'w-full py-3 px-8 rounded-lg text-white font-medium text-base transition-all',
                  !selectedMethod && 'opacity-50 cursor-not-allowed'
                )}
                style={{
                  background:
                    'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
                  boxShadow:
                    '0px 2px 4px 0px rgba(190, 185, 192, 0.64), inset 2px 2px 2px 0px rgba(255, 255, 255, 0.14)',
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right column - Summary and FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5">
          <InvestmentSummary
            amount={amount}
            company={company}
            className="h-[316px]"
          />
          <FAQSection items={faqItems} />
        </div>
      </div>
    </div>
  );
}
