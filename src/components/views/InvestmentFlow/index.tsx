import { useState, useEffect, useRef } from 'react';
import { FlowHeader } from './components/FlowHeader';
import { TransferMethodStep } from './steps/TransferMethodStep';
import { VerificationStep } from './steps/VerificationStep';
import { DocumentReviewIntroStep } from './steps/DocumentReviewIntroStep';
import { DocumentReviewStep } from './steps/DocumentReviewStep';
import { DocumentSigningStep } from './steps/DocumentSigningStep';
import { ConfirmRequestStep } from './steps/ConfirmRequestStep';
import { WireTransferStep } from './steps/WireTransferStep';
import { cn } from '@/lib/utils';
import {
  TRANSFER_METHODS,
  FAQ_ITEMS,
  type TransferMethod,
  type InvestmentFlowStep,
  type CompanyData,
} from './types';

// Animated step wrapper for gentle, smooth transitions
interface AnimatedStepProps {
  children: React.ReactNode;
  stepKey: string;
}

function AnimatedStep({ children, stepKey }: AnimatedStepProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const prevKeyRef = useRef(stepKey);

  useEffect(() => {
    // When step changes, fade out first then fade in
    if (prevKeyRef.current !== stepKey) {
      setIsVisible(false);

      // Wait for fade out, then update content and fade in
      const fadeOutTimer = setTimeout(() => {
        prevKeyRef.current = stepKey;
        setShouldRender(false);

        // Brief pause before rendering new content
        requestAnimationFrame(() => {
          setShouldRender(true);
          // Trigger fade in after content renders
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        });
      }, 300);

      return () => clearTimeout(fadeOutTimer);
    } else {
      // Initial mount - gentle fade in
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [stepKey]);

  return (
    <div
      className={cn(
        'transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {shouldRender && children}
    </div>
  );
}

// Re-export types
export type { InvestmentFlowStep, TransferMethod, CompanyData } from './types';
export { TRANSFER_METHODS, FAQ_ITEMS } from './types';

// User state type for investment flow
export type InvestmentUserState = 'accredited-first-time' | 'already-invested';

// Anthropic logo from public folder
const anthropicLogo = '/icons/products/anthropic.png';

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
  userState?: InvestmentUserState;
  onDismiss: () => void;
  onComplete?: () => void;
}

export function InvestmentFlow({
  investmentAmount = 10000,
  company = DEFAULT_COMPANY,
  userState = 'accredited-first-time',
  onDismiss,
  onComplete,
}: InvestmentFlowProps) {
  // Internal flow step starts at transfer-method for all user states
  const [currentStep, setCurrentStep] = useState<InvestmentFlowStep>('transfer-method');
  const [selectedMethod, setSelectedMethod] = useState<TransferMethod | null>(null);

  // Calculate progress based on current step
  const getProgress = () => {
    switch (currentStep) {
      case 'transfer-method':
        return 10;
      case 'verification':
        return 20;
      case 'document-intro':
        return 30;
      case 'ppm-review':
        return 40;
      case 'llc-signing':
        return 55;
      case 'subscription-signing':
        return 70;
      case 'confirm-request':
        return 80;
      case 'wire-transfer':
        return 95;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep === 'transfer-method' && selectedMethod) {
      setCurrentStep('verification');
    }
  };

  const handleVerificationComplete = () => {
    setCurrentStep('document-intro');
  };

  const handleDocumentIntroComplete = () => {
    setCurrentStep('ppm-review');
  };

  const handlePPMReviewComplete = () => {
    // Skip llc-review, go directly to llc-signing (which has both CTAs)
    setCurrentStep('llc-signing');
  };

  const handleLLCSigningComplete = () => {
    // Skip subscription-review, go directly to subscription-signing
    setCurrentStep('subscription-signing');
  };

  const handleSubscriptionSigningComplete = () => {
    setCurrentStep('confirm-request');
  };

  const handleConfirmComplete = () => {
    setCurrentStep('wire-transfer');
  };

  const handleWireTransferComplete = () => {
    setCurrentStep('complete');
    onComplete?.();
  };

  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case 'verification':
        setCurrentStep('transfer-method');
        break;
      case 'document-intro':
        setCurrentStep('verification');
        break;
      case 'ppm-review':
        setCurrentStep('document-intro');
        break;
      case 'llc-signing':
        setCurrentStep('ppm-review');
        break;
      case 'subscription-signing':
        setCurrentStep('llc-signing');
        break;
      case 'confirm-request':
        setCurrentStep('subscription-signing');
        break;
      case 'wire-transfer':
        setCurrentStep('confirm-request');
        break;
    }
  };

  // Can go back from any step except the first one and complete
  const canGoBack = currentStep !== 'transfer-method' && currentStep !== 'complete';

  return (
    <div className="h-screen w-full bg-[#f0eef0] flex flex-col overflow-hidden">
      {/* Header with progress */}
      <FlowHeader
        progress={getProgress()}
        onDismiss={onDismiss}
        onBack={handleBack}
        canGoBack={canGoBack}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatedStep stepKey={currentStep}>
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
            <VerificationStep
              amount={investmentAmount}
              company={company}
              onVerify={handleVerificationComplete}
              onBack={() => setCurrentStep('transfer-method')}
            />
          )}

          {currentStep === 'document-intro' && (
            <DocumentReviewIntroStep
              amount={investmentAmount}
              company={company}
              onContinue={handleDocumentIntroComplete}
              onBack={() => setCurrentStep('verification')}
            />
          )}

          {currentStep === 'ppm-review' && (
            <DocumentReviewStep
              documentType="ppm"
              amount={investmentAmount}
              company={company}
              onContinue={handlePPMReviewComplete}
              onBack={() => setCurrentStep('document-intro')}
            />
          )}

          {currentStep === 'llc-signing' && (
            <DocumentSigningStep
              documentType="llc-agreement"
              amount={investmentAmount}
              company={company}
              onConfirm={handleLLCSigningComplete}
              onBack={() => setCurrentStep('ppm-review')}
            />
          )}

          {currentStep === 'subscription-signing' && (
            <DocumentSigningStep
              documentType="subscription-agreement"
              amount={investmentAmount}
              company={company}
              onConfirm={handleSubscriptionSigningComplete}
              onBack={() => setCurrentStep('llc-signing')}
            />
          )}

          {currentStep === 'confirm-request' && (
            <ConfirmRequestStep
              amount={investmentAmount}
              company={company}
              onConfirm={handleConfirmComplete}
              onBack={() => setCurrentStep('subscription-signing')}
            />
          )}

          {currentStep === 'wire-transfer' && (
            <WireTransferStep
              amount={investmentAmount}
              company={company}
              onConfirm={handleWireTransferComplete}
              onBack={() => setCurrentStep('confirm-request')}
            />
          )}

          {currentStep === 'complete' && (
            <div className="w-full max-w-[1032px] mx-auto px-2.5 py-16 flex flex-col items-center justify-center gap-8">
              <div className="w-20 h-20 rounded-full bg-[#5a8a5a] flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20L17 27L30 13"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1
                className="text-[42px] leading-[40px] text-[#373338] text-center"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Investment request submitted
              </h1>
              <p
                className="text-[18px] leading-[24px] text-[#685f6a] text-center max-w-md"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                You'll receive transfer instructions via email. Complete the funding to finalize your investment.
              </p>
              <button
                onClick={onDismiss}
                className="px-8 py-3 bg-[#373338] text-white rounded-lg text-[16px]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Return to dashboard
              </button>
            </div>
          )}
        </AnimatedStep>
      </main>
    </div>
  );
}

// User state variants for showcase
export const investmentFlowVariants = [
  { id: 'accredited-first-time', label: 'Accredited First Time' },
  { id: 'already-invested', label: 'Already Invested' },
];

// For standalone demo/showcase
interface InvestmentFlowViewProps {
  userState?: InvestmentUserState;
}

export function InvestmentFlowView({ userState = 'accredited-first-time' }: InvestmentFlowViewProps) {
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
      userState={userState}
      onDismiss={() => setIsOpen(false)}
      onComplete={() => console.log('Investment completed!')}
    />
  );
}

export default InvestmentFlow;
