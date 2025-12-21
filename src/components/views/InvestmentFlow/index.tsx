import { useState } from 'react';
import { FlowHeader } from './components/FlowHeader';
import { TransferMethodStep } from './steps/TransferMethodStep';
import {
  TRANSFER_METHODS,
  FAQ_ITEMS,
  type TransferMethod,
  type InvestmentFlowStep,
  type CompanyData,
} from './types';

// Re-export types
export type { InvestmentFlowStep, TransferMethod, CompanyData } from './types';
export { TRANSFER_METHODS, FAQ_ITEMS } from './types';

// Import Anthropic logo
import anthropicLogo from '../Welcome02/assets/avatar-anthropic.png';

// Default company data
const DEFAULT_COMPANY: CompanyData = {
  name: 'Anthropic',
  logo: anthropicLogo,
  description:
    'Anthropic is an AI safety and research company that is working to build reliable, interpretable, and steerable AI systems.',
  type: 'Pre-IPO Company',
};

interface InvestmentFlowProps {
  investmentAmount?: number;
  company?: CompanyData;
  onDismiss: () => void;
  onComplete?: () => void;
}

export function InvestmentFlow({
  investmentAmount = 10000,
  company = DEFAULT_COMPANY,
  onDismiss,
  onComplete,
}: InvestmentFlowProps) {
  const [currentStep, setCurrentStep] = useState<InvestmentFlowStep>('transfer-method');
  const [selectedMethod, setSelectedMethod] = useState<TransferMethod | null>(null);

  // Calculate progress based on current step
  const getProgress = () => {
    switch (currentStep) {
      case 'transfer-method':
        return 12;
      case 'verification':
        return 40;
      case 'signing':
        return 70;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep === 'transfer-method' && selectedMethod) {
      // For now, just show a placeholder for next steps
      setCurrentStep('verification');
    }
  };

  return (
    <div className="h-screen w-full bg-[#f0eef0] flex flex-col overflow-hidden">
      {/* Header with progress */}
      <FlowHeader
        progress={getProgress()}
        onDismiss={onDismiss}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {currentStep === 'transfer-method' && (
          <TransferMethodStep
            amount={investmentAmount}
            company={company}
            transferMethods={TRANSFER_METHODS}
            faqItems={FAQ_ITEMS}
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
            onNext={handleNext}
          />
        )}

        {currentStep === 'verification' && (
          <div className="w-full max-w-[1032px] mx-auto p-10 flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-medium text-[#373338] mb-4">
              Verification Step
            </h2>
            <p className="text-[#7f7582] mb-6 text-center">
              This step would contain identity verification (KYC) flow.
              <br />
              For this prototype, we'll skip to completion.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('transfer-method')}
                className="px-6 py-2 border border-[#373338] text-[#373338] rounded-lg hover:bg-black/5"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onComplete?.();
                  onDismiss();
                }}
                className="px-6 py-2 bg-[#373338] text-white rounded-lg hover:bg-[#48424a]"
              >
                Complete Investment
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// For standalone demo/showcase
export function InvestmentFlowView() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="h-screen w-full bg-[#edebee] flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-[#373338] text-white rounded-lg"
        >
          Open Investment Flow
        </button>
      </div>
    );
  }

  return (
    <InvestmentFlow
      onDismiss={() => setIsOpen(false)}
      onComplete={() => console.log('Investment completed!')}
    />
  );
}

export default InvestmentFlow;
