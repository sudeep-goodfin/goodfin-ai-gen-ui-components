import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import { Header } from '../Welcome02/components/layout/Header';
import { Sidebar } from '../Welcome02/components/layout/Sidebar';
import { InputBarV02 } from '../Welcome02/components/dashboard/InputBar';
import { Greeting } from '../Welcome02/components/dashboard/Greeting';
import { TabNavigation } from '../DealProductPage/components/TabNavigation';
import { ThinkingText } from '../AIGreeting/ThinkingText';
import { VerticalStepper, type Step, type StepStatus } from './components/VerticalStepper';
import { svgPaths } from '../Welcome02/svgPaths';
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
type FlowState = 'home' | 'loading' | 'askAmount' | 'processingAmount' | 'investing';

// Loading texts for the shimmer animation
const INVESTMENT_LOADING_TEXTS = [
  'thinking...',
  'fetching the deal...',
  'preparing docs...',
  'almost ready...',
];

// Loading texts for processing investment amount
const PROCESSING_AMOUNT_TEXTS = [
  'processing...',
  'preparing your investment...',
  'setting up documents...',
  'ready!',
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
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Minimum investment amount
  const MIN_INVESTMENT = 10000;

  // Handle click outside menu to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Handle exit modal animation
  useEffect(() => {
    if (showExitModal) {
      const timer = setTimeout(() => setExitModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setExitModalVisible(false);
    }
  }, [showExitModal]);

  // Handle input submission from InputBar
  const handleInputSubmit = (value: string) => {
    const lowerValue = value.toLowerCase();

    // Check if user wants to invest
    if (
      lowerValue.includes('invest') &&
      (lowerValue.includes('anthropic') || lowerValue.includes('deal'))
    ) {
      setUserMessage(value);
      setFlowState('loading');
    }
  };

  // Handle loading complete - transition to askAmount
  const handleLoadingComplete = () => {
    setFlowState('askAmount');
  };

  // Handle amount submission - transition to processingAmount
  const handleAmountSubmit = (value: string) => {
    const amount = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(amount) && amount > 0) {
      if (amount < MIN_INVESTMENT) {
        setAmountError(`Minimum investment is $${MIN_INVESTMENT.toLocaleString()}`);
        return;
      }
      setAmountError(null);
      setInvestmentAmount(amount);
      setFlowState('processingAmount');
    }
  };

  // Handle processing amount complete - transition to investing
  const handleProcessingComplete = () => {
    setFlowState('investing');
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

  // Handle close button click - show confirmation modal
  const handleCloseClick = () => {
    setShowExitModal(true);
  };

  // Handle confirm exit - go back to home
  const handleConfirmExit = () => {
    setShowExitModal(false);
    setFlowState('home');
    // Reset investment state
    setInvestmentAmount(null);
    setAmountError(null);
    setHasCommitted(false);
    setSignedDocuments([]);
    setIsIdentityVerified(false);
    setIsTransferComplete(false);
    setUserMessage('');
  };

  // Handle cancel exit - close modal and continue
  const handleCancelExit = () => {
    setShowExitModal(false);
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
            {/* Conversation Header - Show when in investment flow */}
            {flowState !== 'home' && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e6ea]/50">
                {/* Left side - Back button */}
                <button
                  onClick={handleCloseClick}
                  className="flex items-center gap-2 text-[#7f7582] hover:text-[#29272a] transition-colors px-2 py-1.5 rounded-lg hover:bg-black/5"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back</span>
                </button>

                {/* Right side - Actions */}
                <div className="flex items-center gap-1">
                  {/* New Chat / Compose */}
                  <button
                    onClick={() => {}}
                    className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                    title="New Chat"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d={svgPaths.pencilCompose} fill="#69606d" />
                    </svg>
                  </button>

                  {/* More Options */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                      title="More Options"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 20" fill="none">
                        <path d={svgPaths.moreHorizontal} fill="#69606d" />
                      </svg>
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#e9e6ea] py-1 z-50">
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d={svgPaths.feedback} fill="#69606d" />
                          </svg>
                          Got Feedback
                        </button>
                        <button
                          onClick={() => {
                            handleConfirmExit();
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d={svgPaths.reset} fill="#69606d" />
                          </svg>
                          Reset Conversation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Main Scrollable Content */}
            <ScrollAreaPrimitive.Root className="flex-1 overflow-hidden">
              <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-none [&>div]:!block">
                <div className="flex flex-col items-center p-6 pb-32 gap-6 w-full min-h-full">
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

                  {/* Show user message when in investment flow */}
                  {flowState !== 'home' && userMessage && (
                    <div className="w-full max-w-2xl mt-4">
                      <div className="flex justify-end">
                        <div className="bg-[#373338] text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                            {userMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {flowState === 'loading' && (
                    /* Loading State - AI Avatar with Shimmer Animation */
                    <div className="w-full max-w-2xl">
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

                  {(flowState === 'askAmount' || flowState === 'processingAmount' || flowState === 'investing') && (
                    /* Ask Amount State - Show deal card and ask for amount */
                    <div className="w-full max-w-2xl">
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

                  {/* User amount response - show after askAmount */}
                  {(flowState === 'processingAmount' || flowState === 'investing') && investmentAmount && (
                    <div className="w-full max-w-2xl">
                      <div className="flex justify-end">
                        <div className="bg-[#373338] text-white px-4 py-3 rounded-2xl rounded-br-md">
                          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                            ${investmentAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {flowState === 'processingAmount' && (
                    /* Processing Amount State - AI Avatar with Shimmer */
                    <div className="w-full max-w-2xl">
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
                            loadingTexts={PROCESSING_AMOUNT_TEXTS}
                            onComplete={handleProcessingComplete}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {flowState === 'investing' && (
                    /* Investing State - AI response with Investment Card */
                    <div className="w-full max-w-2xl">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
                        <img
                          src="/conciergeIcon.png"
                          alt="Goodfin AI"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* AI Response Text */}
                      <p
                        className="text-[16px] text-[#48424a] leading-relaxed mb-4"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        Great! I've prepared your investment of ${investmentAmount?.toLocaleString()} in {deal.companyName}. Here's your investment progress:
                      </p>

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
                  currentMode={(flowState === 'loading' || flowState === 'askAmount' || flowState === 'processingAmount' || flowState === 'investing') ? 'investment' : 'default'}
                  onSubmit={flowState === 'askAmount' ? handleAmountSubmit : handleInputSubmit}
                  formCallout={(flowState === 'askAmount' || flowState === 'processingAmount' || flowState === 'investing') ? {
                    state: amountError ? 'error' : flowState === 'askAmount' ? 'awaiting_input' : 'confirmed',
                    dealLogo: deal.logo,
                    headerText: amountError
                      ? amountError
                      : flowState === 'askAmount'
                        ? 'How much would you like to invest?'
                        : `Invest in ${deal.companyName}`,
                    displayValue: investmentAmount ? `$${investmentAmount.toLocaleString()}` : undefined,
                    onClose: handleCloseClick,
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

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with fade animation */}
          <div
            className={cn(
              'absolute inset-0 bg-black/40 backdrop-blur-sm',
              'transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              exitModalVisible ? 'opacity-100' : 'opacity-0'
            )}
            onClick={handleCancelExit}
          />

          {/* Modal with scale and fade animation */}
          <div
            className={cn(
              'relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden',
              'transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
              exitModalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            )}
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {/* Close button */}
            <button
              onClick={handleCancelExit}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5 text-[#685f6a]" />
            </button>

            {/* Content */}
            <div className="px-8 pt-10 pb-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f0eef0] flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="#7f7582" strokeWidth="2" />
                  <path
                    d="M12 6v6l4 2"
                    stroke="#7f7582"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2
                className="text-[24px] leading-[28px] text-[#373338] mb-3"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Continue anytime
              </h2>

              {/* Message */}
              <p className="text-[16px] leading-[22px] text-[#685f6a] mb-8">
                Your progress has been saved. You can pick up right where you left off whenever you're ready.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmExit}
                  className="w-full px-6 py-3 border border-[#373338] text-[#373338] rounded-lg text-[16px] font-medium hover:bg-black/5 transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Return to home
                </button>
                <button
                  onClick={handleCancelExit}
                  className="w-full px-6 py-3 bg-[#373338] text-white rounded-lg text-[16px] font-medium hover:bg-[#29272a] transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Continue investing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
