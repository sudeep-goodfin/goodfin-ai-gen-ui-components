import { useState, useRef, useEffect } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { Header } from '../Welcome02/components/layout/Header';
import { Sidebar } from '../Welcome02/components/layout/Sidebar';
import { InputBarV02 } from '../Welcome02/components/dashboard/InputBar';
import { Greeting } from '../Welcome02/components/dashboard/Greeting';
import { TabNavigation } from '../DealProductPage/components/TabNavigation';
import { ThinkingText } from '../AIGreeting/ThinkingText';
import { VerticalStepper, type Step, type StepStatus } from './components/VerticalStepper';
import { DocumentCard } from './components/DocumentCard';
import { IdentityVerificationModal } from './components/IdentityVerificationModal';
import { TransferModal } from './components/TransferModal';
import { DocumentSigningModal } from './components/DocumentSigningModal';
import {
  type FlowStep,
  type Message,
  type InvestmentDocument,
  type DealInfo,
  INVESTMENT_DOCUMENTS,
  MOCK_BANK_ACCOUNTS,
  DEFAULT_DEAL,
} from './types';

// Re-export types
export type { FlowStep, InvestmentDocument, DealInfo, Message } from './types';
export { INVESTMENT_DOCUMENTS, MOCK_BANK_ACCOUNTS, DEFAULT_DEAL } from './types';

// Flow state type
type FlowState = 'home' | 'loading' | 'askAmount' | 'investing';

// Loading texts for the shimmer animation
const INVESTMENT_LOADING_TEXTS = [
  'thinking...',
  'fetching the deal...',
  'preparing docs...',
  'almost ready...',
];

// Tab types for this flow
type ZAITabId = 'progress' | 'documents';

interface ZAITab {
  id: ZAITabId;
  label: string;
  isNew?: boolean;
}

const FLOW_TABS: ZAITab[] = [
  { id: 'progress', label: 'Progress' },
  { id: 'documents', label: 'Documents' },
];

interface ZAIInvestmentFlowProps {
  deal?: DealInfo;
  onDismiss?: () => void;
  onComplete?: () => void;
}

export function ZAIInvestmentFlow({
  deal = DEFAULT_DEAL,
  onDismiss,
  onComplete,
}: ZAIInvestmentFlowProps) {
  // Flow state
  const [flowState, setFlowState] = useState<FlowState>('home');

  // Investment state
  const [activeTab, setActiveTab] = useState<ZAITabId>('progress');
  const [signedDocuments, setSignedDocuments] = useState<string[]>([]);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [signingDocument, setSigningDocument] = useState<InvestmentDocument | null>(null);
  const [hasCommitted, setHasCommitted] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  // Minimum investment amount
  const MIN_INVESTMENT = 10000;

  // Handle input submission from InputBar
  const handleInputSubmit = (value: string) => {
    const lowerValue = value.toLowerCase();

    // Check if user wants to invest
    if (
      lowerValue.includes('invest') &&
      (lowerValue.includes('anthropic') || lowerValue.includes('deal'))
    ) {
      setFlowState('loading');
    }
  };

  // Handle loading complete - transition to askAmount
  const handleLoadingComplete = () => {
    setFlowState('askAmount');
  };

  // Handle amount submission - transition to investing
  const handleAmountSubmit = (value: string) => {
    const amount = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(amount) && amount > 0) {
      if (amount < MIN_INVESTMENT) {
        setAmountError(`Minimum investment is $${MIN_INVESTMENT.toLocaleString()}`);
        return;
      }
      setAmountError(null);
      setInvestmentAmount(amount);
      setFlowState('investing');
    }
  };

  // Calculate progress
  const getProgress = () => {
    const commitProgress = hasCommitted ? 25 : 0;
    const docProgress = (signedDocuments.length / INVESTMENT_DOCUMENTS.length) * 25;
    const identityProgress = isIdentityVerified ? 25 : 0;
    const transferProgress = isTransferComplete ? 25 : 0;
    return Math.round(commitProgress + docProgress + identityProgress + transferProgress);
  };

  // Get step statuses
  const getCommitStatus = (): StepStatus => {
    if (hasCommitted) return 'completed';
    return 'current';
  };

  const getSigningStatus = (): StepStatus => {
    if (signedDocuments.length === INVESTMENT_DOCUMENTS.length) return 'completed';
    if (hasCommitted) return 'current';
    return 'upcoming';
  };

  const getKYCStatus = (): StepStatus => {
    if (isIdentityVerified) return 'completed';
    if (signedDocuments.length === INVESTMENT_DOCUMENTS.length) return 'current';
    return 'upcoming';
  };

  const getWireStatus = (): StepStatus => {
    if (isTransferComplete) return 'completed';
    if (isIdentityVerified) return 'current';
    return 'upcoming';
  };

  // Build steps array for VerticalStepper
  const steps: Step[] = [
    {
      id: 'commit',
      label: 'Commit',
      status: getCommitStatus(),
      description: `Confirm your investment of $${deal.minInvestment.toLocaleString()} in ${deal.companyName}. This locks in your allocation.`,
      ctaLabel: 'Confirm commitment',
    },
    {
      id: 'signing',
      label: 'Signing',
      status: getSigningStatus(),
      description: `Review and sign ${INVESTMENT_DOCUMENTS.length} required documents including the PPM, Subscription Agreement, and Investor Suitability.`,
      ctaLabel: 'Review documents',
    },
    {
      id: 'kyc',
      label: 'KYC',
      status: getKYCStatus(),
      description: 'Complete identity verification to confirm your accredited investor status. This typically takes 2-3 minutes.',
      ctaLabel: 'Verify identity',
    },
    {
      id: 'wire',
      label: 'Wire',
      status: getWireStatus(),
      description: `Transfer funds via wire or ACH to complete your investment in ${deal.companyName}.`,
      ctaLabel: 'Initiate transfer',
    },
  ];

  // Handle document signing
  const handleSignDocument = (docId: string) => {
    const doc = INVESTMENT_DOCUMENTS.find((d) => d.id === docId);
    if (doc) {
      setSigningDocument(doc);
    }
  };

  const handleDocumentSigned = (docId: string) => {
    setSignedDocuments((prev) => [...prev, docId]);
    setSigningDocument(null);
  };

  // Handle identity verification
  const handleIdentityVerified = () => {
    setIsIdentityVerified(true);
    setShowIdentityModal(false);
  };

  // Handle transfer complete
  const handleTransferComplete = (amount: number, bankId: string) => {
    setIsTransferComplete(true);
    setShowTransferModal(false);
    onComplete?.();
  };

  // Handle step click
  const handleStepClick = (stepId: string) => {
    if (stepId === 'commit' && !hasCommitted) {
      setHasCommitted(true);
    } else if (stepId === 'signing') {
      setActiveTab('documents');
    } else if (stepId === 'kyc' && getKYCStatus() === 'current') {
      setShowIdentityModal(true);
    } else if (stepId === 'wire' && getWireStatus() === 'current') {
      setShowTransferModal(true);
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    setFlowState('home');
  };

  const progress = getProgress();

  return (
    <div className="flex flex-col h-full w-full bg-[#f0eef0] overflow-hidden font-sans text-[#373338]">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f7f7f8]">
          {/* Gradient Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_46_10003)'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial_46_10003)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_46_10003' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_46_10003'%3E%3Crect width='1440' height='981' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
            {/* Main Scrollable Content */}
            <ScrollAreaPrimitive.Root className="flex-1 overflow-hidden">
              <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-none [&>div]:!block">
                <div className="flex flex-col items-center p-6 pb-32 gap-8 w-full min-h-full">
                  {flowState === 'home' && (
                    /* Home State - Greeting */
                    <div className="w-full max-w-2xl mt-16">
                      <Greeting
                        title="Good afternoon, Alex"
                        portfolioGain="$154k"
                        portfolioPercentage="+12.4%"
                        priorityAllocations="3 priority allocations expiring soon"
                      />
                    </div>
                  )}

                  {flowState === 'loading' && (
                    /* Loading State - AI Avatar with Shimmer Animation */
                    <div className="w-full max-w-2xl mt-8">
                      <div className="flex items-start gap-3">
                        {/* AI Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] flex-shrink-0">
                          <img
                            src="/conciergeIcon.png"
                            alt="Goodfin AI"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Shimmer Text */}
                        <div className="pt-2">
                          <ThinkingText
                            isVisible={true}
                            loadingTexts={INVESTMENT_LOADING_TEXTS}
                            onComplete={handleLoadingComplete}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {flowState === 'askAmount' && (
                    /* Ask Amount State - Show deal card and ask for amount */
                    <div className="w-full max-w-2xl mt-8">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
                        <img
                          src="/conciergeIcon.png"
                          alt="Goodfin AI"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Mini Deal Card */}
                      <div className="flex items-center gap-4 bg-[#e8e5e8]/50 rounded-xl px-5 py-4 mb-6">
                        <img
                          src={deal.logo}
                          alt={deal.companyName}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm"
                        />
                        <div>
                          <h2
                            className="text-xl font-medium text-[#373338]"
                            style={{ fontFamily: 'Test Signifier, serif' }}
                          >
                            Invest in {deal.companyName}
                          </h2>
                          <p className="text-[#7f7582] text-sm mt-0.5">{deal.description}</p>
                        </div>
                      </div>

                      {/* AI Question */}
                      <p
                        className="text-[16px] text-[#48424a] leading-relaxed"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        How much would you like to invest in {deal.companyName}?
                      </p>
                    </div>
                  )}

                  {flowState === 'investing' && (
                    /* Investing State - Investment Flow */
                    <div className="w-full max-w-2xl mt-8">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
                        <img
                          src="/conciergeIcon.png"
                          alt="Goodfin AI"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Investment Card with Tabs inside */}
                      <div className="bg-[#e8e5e8]/50 rounded-xl overflow-hidden">
                        {/* Card Header - Deal Info */}
                        <div className="flex items-center gap-4 px-5 py-4 border-b border-[#e0dce0]/50">
                          <img
                            src={deal.logo}
                            alt={deal.companyName}
                            className="w-14 h-14 rounded-xl object-cover shadow-sm"
                          />
                          <div>
                            <h2
                              className="text-xl font-medium text-[#373338]"
                              style={{ fontFamily: 'Test Signifier, serif' }}
                            >
                              Invest in {deal.companyName}
                            </h2>
                            <p className="text-[#7f7582] text-sm mt-0.5">{deal.description}</p>
                          </div>
                        </div>

                        {/* Tabs inside card */}
                        <div className="px-5 pt-4">
                          <TabNavigation
                            tabs={FLOW_TABS as any}
                            activeTab={activeTab as any}
                            onTabChange={(tabId) => setActiveTab(tabId as ZAITabId)}
                            className="mb-4"
                          />
                        </div>

                        {/* Tab Content inside card */}
                        <div className="px-5 pb-5">
                          {activeTab === 'progress' ? (
                            <VerticalStepper steps={steps} onStepClick={handleStepClick} />
                          ) : (
                            <div className="space-y-4">
                              {INVESTMENT_DOCUMENTS.map((doc) => (
                                <DocumentCard
                                  key={doc.id}
                                  document={doc}
                                  isSigned={signedDocuments.includes(doc.id)}
                                  onSign={() => handleSignDocument(doc.id)}
                                  onAskQuestion={() => {}}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollAreaPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                orientation="vertical"
                className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors hover:bg-black/5"
              >
                <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[#d0cdd2] hover:bg-[#beb9c0] transition-colors" />
              </ScrollAreaPrimitive.Scrollbar>
              <ScrollAreaPrimitive.Corner />
            </ScrollAreaPrimitive.Root>

            {/* Sticky Bottom Input Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center p-6 bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/80 to-transparent pointer-events-none">
              <div className="w-full max-w-2xl pointer-events-auto">
                <InputBarV02
                  currentMode={(flowState === 'loading' || flowState === 'askAmount' || flowState === 'investing') ? 'investment' : 'default'}
                  onSubmit={flowState === 'askAmount' ? handleAmountSubmit : handleInputSubmit}
                  formCallout={(flowState === 'askAmount' || flowState === 'investing') ? {
                    state: amountError ? 'error' : flowState === 'askAmount' ? 'awaiting_input' : 'confirmed',
                    dealLogo: deal.logo,
                    headerText: amountError
                      ? amountError
                      : flowState === 'askAmount'
                        ? 'How much would you like to invest?'
                        : `Invest in ${deal.companyName}`,
                    displayValue: investmentAmount ? `$${investmentAmount.toLocaleString()}` : undefined,
                    onClose: handleBackToHome,
                  } : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <IdentityVerificationModal
        isOpen={showIdentityModal}
        onClose={() => setShowIdentityModal(false)}
        onComplete={handleIdentityVerified}
      />

      <TransferModal
        isOpen={showTransferModal}
        deal={deal}
        bankAccounts={MOCK_BANK_ACCOUNTS}
        onClose={() => setShowTransferModal(false)}
        onComplete={handleTransferComplete}
      />

      <DocumentSigningModal
        isOpen={!!signingDocument}
        document={signingDocument}
        onClose={() => setSigningDocument(null)}
        onSign={handleDocumentSigned}
      />
    </div>
  );
}

// Variants for showcase
export const zaiInvestmentFlowVariants = [
  { id: 'default', label: 'Default' },
];

// View wrapper for standalone demo
interface ZAIInvestmentFlowViewProps {
  variant?: string;
}

export function ZAIInvestmentFlowView({ variant = 'default' }: ZAIInvestmentFlowViewProps) {
  return (
    <ZAIInvestmentFlow
      onComplete={() => console.log('Investment completed!')}
    />
  );
}

export default ZAIInvestmentFlow;
