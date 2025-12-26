import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ChevronDown, Check, Maximize2, Sparkles, Pencil } from 'lucide-react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

// Import PDF documents
import ppmPdf from '../InvestmentFlow/assets/Goodfin Venture PPM Dec 11 2025.pdf';
import llcPdf from '../InvestmentFlow/assets/Goodfin Venture LLOA Dec 11 2025.pdf';
import subscriptionPdf from '../InvestmentFlow/assets/Goodfin Venture LXXIV Dec 11 2025.pdf';

// PDF file mapping by document ID
const DOCUMENT_PDFS: Record<string, string> = {
  'ppm': ppmPdf,
  'subscription': subscriptionPdf,
  'suitability': llcPdf,
};
import { cn } from '@/lib/utils';
import { Header } from '../Welcome02/components/layout/Header';
import { Sidebar } from '../Welcome02/components/layout/Sidebar';
import { InputBarV02 } from '../Welcome02/components/dashboard/InputBar';
import { Greeting } from '../Welcome02/components/dashboard/Greeting';
import { ThinkingText } from '../AIGreeting/ThinkingText';
import { HorizontalStepper, type Step, type StepStatus } from './components/HorizontalStepper';
import { svgPaths } from '../Welcome02/svgPaths';
import { IdentityVerificationModal } from './components/IdentityVerificationModal';
import { TransferModal } from './components/TransferModal';
import { DocumentSigningModal } from './components/DocumentSigningModal';
import { WireBankDetails } from './components/WireBankDetails';
import { DocumentSigningInline } from './components/DocumentSigningInline';
import { DealCard, type DealCardProps } from '@/components/ui/DealCard';
import {
  type FlowStep,
  type Message,
  type InvestmentDocument,
  type DealInfo,
  INVESTMENT_DOCUMENTS,
  DEFAULT_DEAL,
} from './types';

// Re-export types
export type { FlowStep, InvestmentDocument, DealInfo, Message } from './types';
export { INVESTMENT_DOCUMENTS, DEFAULT_DEAL } from './types';

// Flow state type
type FlowState = 'home' | 'loading' | 'discoveringDeals' | 'selectingDeal' | 'askAmount' | 'processingAmount' | 'investing';

// User state type - distinguishes between returning and first-time accredited investors
export type ZAIUserState = 'accredited-returning' | 'accredited-first-time';

// Sample deals for first-time user discovery
const SAMPLE_DEALS: DealCardProps[] = [
  {
    id: 'anthropic',
    category: 'AI & Machine Learning',
    status: 'live',
    title: 'Anthropic',
    description: 'AI safety company building reliable, interpretable AI systems',
    image: '/icons/products/anthropic.png',
    investors: ['/icons/products/anthropic.png', '/icons/products/spaceX.png'],
    investorNames: ['Spark Capital', 'Google'],
  },
  {
    id: 'spacex',
    category: 'Aerospace',
    status: 'premium',
    title: 'SpaceX',
    description: 'Space exploration and satellite internet technology',
    image: '/icons/products/spaceX.png',
    investors: ['/icons/products/spaceX.png'],
    investorNames: ['Founders Fund'],
  },
  {
    id: 'stripe',
    category: 'Fintech',
    status: 'closing',
    title: 'Stripe',
    description: 'Financial infrastructure for the internet economy',
    image: '/icons/products/stripe.png',
    investors: ['/icons/products/stripe.png'],
    investorNames: ['Sequoia'],
  },
];

// Deal categories for first-time users
const DEAL_CATEGORIES = [
  { id: 'ai', name: 'AI & Machine Learning', count: 12 },
  { id: 'fintech', name: 'Fintech', count: 8 },
  { id: 'aerospace', name: 'Aerospace', count: 5 },
  { id: 'biotech', name: 'Biotech', count: 6 },
  { id: 'consumer', name: 'Consumer', count: 4 },
];

// Suggestion chips data for each step
const STEP_SUGGESTIONS: Record<string, string[]> = {
  commit: [
    'What are the investment risks?',
    'Tell me more about the valuation',
    'What happens after I commit?',
  ],
  ppm: [
    'Summarize the key terms',
    'What are the fees involved?',
    'Explain the risk factors',
  ],
  subscription: [
    'What am I agreeing to?',
    'Can I cancel my investment?',
    'Explain the ownership structure',
  ],
  suitability: [
    'Why is this suitable for me?',
    'What are the liquidity terms?',
    'How long is the lock-up period?',
  ],
  kyc: [
    'How is my data protected?',
    'What if verification fails?',
    'Why do you need this information?',
  ],
  wire: [
    'When will I receive confirmation?',
    'What are the next steps?',
    'How long until the investment closes?',
  ],
};

// Suggestion Chips Component
interface SuggestionChipsProps {
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
}

function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="mt-4">
      {/* Title with sparkle icon */}
      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles className="w-4 h-4 text-[#c4a882]" />
        <span
          className="text-[13px] font-medium text-[#685f6a]"
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          Suggestions
        </span>
      </div>
      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect?.(suggestion)}
            className="px-3 py-1.5 text-[13px] text-[#685f6a] bg-white border border-[#e0dce0] rounded-full hover:bg-[#f7f7f8] hover:border-[#c0bcc0] transition-colors"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

// Editable Amount Component
interface EditableAmountProps {
  amount: number | null;
  onEdit: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

function EditableAmount({ amount, onEdit, className, size = 'md' }: EditableAmountProps) {
  return (
    <button
      onClick={onEdit}
      className={cn(
        "group flex items-center gap-1.5 hover:bg-black/5 rounded-md px-1.5 py-0.5 -mx-1.5 transition-colors",
        className
      )}
    >
      <span
        className={cn(
          "text-[#7f7582]",
          size === 'sm' ? "text-sm" : "text-sm"
        )}
        style={{ fontFamily: 'Soehne, sans-serif' }}
      >
        ${amount?.toLocaleString()} investment
      </span>
      <Pencil className="w-3 h-3 text-[#a09a9f] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

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

interface ZAIInvestmentFlowProps {
  deal?: DealInfo;
  userState?: ZAIUserState;
  onDismiss?: () => void;
  onComplete?: () => void;
}

export function ZAIInvestmentFlow({
  deal = DEFAULT_DEAL,
  userState = 'accredited-returning',
  onDismiss,
  onComplete,
}: ZAIInvestmentFlowProps) {
  // Determine if this is a first-time investor
  const isFirstTimeInvestor = userState === 'accredited-first-time';
  // Flow state
  const [flowState, setFlowState] = useState<FlowState>('home');

  // Selected deal for first-time users (starts with default, can be changed during discovery)
  const [selectedDeal, setSelectedDeal] = useState<DealInfo>(deal);

  // Investment state
  const [signedDocuments, setSignedDocuments] = useState<string[]>([]);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [signingDocument, setSigningDocument] = useState<InvestmentDocument | null>(null);
  const [hasCommitted, setHasCommitted] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [shakeInput, setShakeInput] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const investmentCardRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const aiResponseRef = useRef<HTMLDivElement>(null);

  // Document accordion state
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const [fullscreenDocId, setFullscreenDocId] = useState<string | null>(null);

  // Selected step state - for viewing completed steps
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Progress response state - shows new AI response with mini card
  const [showProgressResponse, setShowProgressResponse] = useState(false);
  const progressResponseRef = useRef<HTMLDivElement>(null);

  // Auto-expand first unsigned document when on signing step
  useEffect(() => {
    if (hasCommitted && signedDocuments.length < INVESTMENT_DOCUMENTS.length) {
      // Find first unsigned document
      const firstUnsignedDoc = INVESTMENT_DOCUMENTS.find(doc => !signedDocuments.includes(doc.id));
      if (firstUnsignedDoc && expandedDocId !== firstUnsignedDoc.id) {
        setExpandedDocId(firstUnsignedDoc.id);
      }
    }
  }, [hasCommitted, signedDocuments, expandedDocId]);

  // Auto-scroll to AI response when new AI response is shown
  useEffect(() => {
    // States that trigger new AI responses
    const aiResponseStates: FlowState[] = ['discoveringDeals', 'selectingDeal', 'askAmount', 'investing'];
    if (aiResponseStates.includes(flowState) && aiResponseRef.current && scrollViewportRef.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (aiResponseRef.current && scrollViewportRef.current) {
          // Get the position of the AI response relative to the scroll container
          const viewportRect = scrollViewportRef.current.getBoundingClientRect();
          const elementRect = aiResponseRef.current.getBoundingClientRect();
          const scrollTop = scrollViewportRef.current.scrollTop;
          const offsetTop = elementRect.top - viewportRect.top + scrollTop - 24; // 24px padding from top

          scrollViewportRef.current.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, [flowState]);

  // Commit confirmation state
  const [showCommitConfirm, setShowCommitConfirm] = useState(false);
  const [commitCheckboxes, setCommitCheckboxes] = useState([
    {
      id: 'process',
      text: 'By entering an amount above, you are requesting an allocation to invest in this deal and will be expected to complete the process in a timely manner. This includes signing of legal documents, a brief compliance check and wiring of funds from your bank account.',
      checked: false,
    },
    {
      id: 'allocation',
      text: 'Your allocation will be reserved only after we confirm receipt of your wire transfer. The investment will be final only after the full transaction with the underlying fund or company is closed, which can take weeks or longer, depending on the circumstances of the transaction.',
      checked: false,
    },
    {
      id: 'ownership',
      text: 'I understand and acknowledge that I am not purchasing direct shares or ownership in the target company or non-Goodfin fund. My investment represents an interest in a Goodfin-managed vehicle, which pools capital and holds the shares or interests directly or indirectly through another entity or entities.',
      checked: false,
    },
  ]);

  // Investor type selection state
  const [showInvestorTypeSelection, setShowInvestorTypeSelection] = useState(false);
  const [selectedInvestorType, setSelectedInvestorType] = useState<string | null>(null);
  const [isInvestorTypeComplete, setIsInvestorTypeComplete] = useState(!isFirstTimeInvestor); // Returning users already have this done

  // All investor type options grouped by category
  const investorTypeGroups = [
    {
      category: 'individual',
      title: "I'm an individual",
      options: [
        {
          id: 'us-individual',
          title: 'U.S. Individual',
          subtitle: 'Residing in the U.S.',
        },
        {
          id: 'non-us-individual',
          title: 'Non-U.S. Individual',
          subtitle: 'Residing outside the U.S.',
        },
      ],
    },
    {
      category: 'business',
      title: "I'm a business",
      options: [
        {
          id: 'us-entity',
          title: 'U.S. Entity, Trust, or Joint Account',
          subtitle: 'Registered in the U.S.',
        },
        {
          id: 'non-us-entity',
          title: 'Non-U.S. Entity, Trust, or Joint Account',
          subtitle: 'Registered outside the U.S.',
        },
      ],
    },
  ];

  // Saved investor profile for returning users
  const [savedInvestorProfile, setSavedInvestorProfile] = useState<{id: string; label: string} | null>(
    isFirstTimeInvestor ? null : { id: 'us-entity', label: 'U.S. Entity' }
  );

  // Business info form state
  const [showBusinessInfoForm, setShowBusinessInfoForm] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessEmail: '',
    countryName: '',
    owners: [] as Array<{id: string; name: string; email: string; isVerified: boolean; isPrimary: boolean}>,
    documents: [] as string[],
  });

  // Minimum investment amount
  const MIN_INVESTMENT = 10000;

  // Credit state
  const [availableCredit] = useState(500);
  const [appliedCredit, setAppliedCredit] = useState(500);

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
        // Trigger shake animation
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 600); // Reset after animation
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

  const getInvestorTypeStatus = (): StepStatus => {
    if (isInvestorTypeComplete) return 'completed';
    if (hasCommitted) return 'current';
    return 'upcoming';
  };

  const getSigningStatus = (): StepStatus => {
    if (signedDocuments.length === INVESTMENT_DOCUMENTS.length) return 'completed';
    // For first-time users, signing requires investor type to be complete
    if (isFirstTimeInvestor) {
      if (hasCommitted && isInvestorTypeComplete) return 'current';
    } else {
      if (hasCommitted) return 'current';
    }
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

  // Get the current document to sign (first unsigned document)
  const getCurrentDocument = () => {
    return INVESTMENT_DOCUMENTS.find(doc => !signedDocuments.includes(doc.id));
  };

  // Get signing step description based on current document
  const getSigningDescription = () => {
    if (signedDocuments.length === INVESTMENT_DOCUMENTS.length) {
      return 'All documents have been signed.';
    }
    const docsRemaining = INVESTMENT_DOCUMENTS.length - signedDocuments.length;
    return `Review and sign ${docsRemaining} document${docsRemaining > 1 ? 's' : ''} to continue.`;
  };

  // Get signing CTA label based on current document
  const getSigningCtaLabel = () => {
    const currentDoc = getCurrentDocument();
    if (!currentDoc) return 'All signed';
    return currentDoc.id === 'ppm' ? 'Review document' : 'Review & Sign';
  };

  // Build steps array for VerticalStepper
  const baseSteps: Step[] = [
    {
      id: 'commit',
      label: 'Commit',
      status: getCommitStatus(),
      description: `Confirm your investment of $${(investmentAmount || selectedDeal.minInvestment).toLocaleString()} in ${selectedDeal.companyName}. This locks in your allocation.`,
      ctaLabel: 'Confirm commitment',
    },
  ];

  // Add investor type step only for first-time users
  if (isFirstTimeInvestor) {
    baseSteps.push({
      id: 'investor_type',
      label: 'Investor Type',
      status: getInvestorTypeStatus(),
      description: 'Select your investor type to help us ensure compliance with regulations and provide the right investment experience.',
      ctaLabel: 'Select investor type',
    });
  }

  // Add remaining steps
  const steps: Step[] = [
    ...baseSteps,
    {
      id: 'signing',
      label: 'Signing',
      status: getSigningStatus(),
      description: getSigningDescription(),
      ctaLabel: getSigningCtaLabel(),
    },
    {
      id: 'kyc',
      label: 'KYC',
      status: getKYCStatus(),
      description: 'Complete identity verification to confirm your accredited investor status. This typically takes 2-3 minutes.',
      ctaLabel: 'Verify with Footprint',
    },
    {
      id: 'wire',
      label: 'Wire',
      status: getWireStatus(),
      description: `Transfer funds via wire or ACH to complete your investment in ${selectedDeal.companyName}.`,
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
  const handleTransferComplete = (amount: number) => {
    setIsTransferComplete(true);
    setShowTransferModal(false);
    onComplete?.();
  };

  // Handle step click
  const handleStepClick = (stepId: string) => {
    if (stepId === 'commit' && !hasCommitted) {
      // Show commit confirmation instead of immediately committing
      setShowCommitConfirm(true);
    } else if (stepId === 'investor_type' && getInvestorTypeStatus() === 'current') {
      // Show investor type selection
      setShowInvestorTypeSelection(true);
    } else if (stepId === 'signing' && getSigningStatus() === 'current') {
      // Open the current document to sign
      const currentDoc = getCurrentDocument();
      if (currentDoc) {
        setSigningDocument(currentDoc);
      }
    } else if (stepId === 'kyc' && getKYCStatus() === 'current') {
      // For returning users with saved profile, go directly to verification
      if (savedInvestorProfile) {
        // Check if business type - show business form, otherwise show Footprint
        if (isBusinessType(savedInvestorProfile.id)) {
          setShowBusinessInfoForm(true);
        } else {
          setShowIdentityModal(true);
        }
      } else {
        // This shouldn't happen for first-time users as they have investor_type step
        setShowIdentityModal(true);
      }
    } else if (stepId === 'wire' && getWireStatus() === 'current') {
      setShowTransferModal(true);
    }
  };

  // Check if selected type is a business type
  const isBusinessType = (typeId: string) => {
    return typeId === 'us-entity' || typeId === 'non-us-entity';
  };

  // Handle investor type selection continue
  const handleInvestorTypeContinue = () => {
    if (selectedInvestorType) {
      // Find the selected option from the groups to get its label
      let profileLabel = '';
      for (const group of investorTypeGroups) {
        const found = group.options.find(opt => opt.id === selectedInvestorType);
        if (found) {
          profileLabel = found.title;
          break;
        }
      }
      setSavedInvestorProfile({ id: selectedInvestorType, label: profileLabel });
      setShowInvestorTypeSelection(false);
      setIsInvestorTypeComplete(true); // Mark investor type step as complete

      // For first-time users with explicit investor type step,
      // don't auto-start KYC - let them proceed through the flow
      // KYC will be triggered when they click on KYC step
    }
  };

  // Handle business info form field change
  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  // Handle add business owner
  const handleAddBusinessOwner = () => {
    setBusinessInfo(prev => ({
      ...prev,
      owners: [...prev.owners, { id: `owner-${Date.now()}`, name: '', email: '', isVerified: false, isPrimary: false }]
    }));
  };

  // Handle owner email change
  const handleOwnerEmailChange = (index: number, email: string) => {
    setBusinessInfo(prev => {
      const newOwners = [...prev.owners];
      if (newOwners[index]) {
        newOwners[index].email = email;
      }
      return { ...prev, owners: newOwners };
    });
  };

  // Handle add document
  const handleAddDocument = () => {
    // In a real implementation, this would open a file picker
    console.log('Add document clicked');
  };

  // Handle business info submission
  const handleBusinessInfoSubmit = () => {
    // Mark identity as verified (business verification complete)
    setIsIdentityVerified(true);
    setShowBusinessInfoForm(false);
  };

  // Handle change profile - allow user to re-select investor type
  const handleChangeProfile = () => {
    setShowInvestorTypeSelection(true);
  };

  // Handle checkbox change for commit confirmation
  const handleCommitCheckboxChange = (id: string, checked: boolean) => {
    setCommitCheckboxes(prev =>
      prev.map(cb => cb.id === id ? { ...cb, checked } : cb)
    );
  };

  // Handle commit confirmation submission
  const handleCommitConfirm = () => {
    if (commitCheckboxes.every(cb => cb.checked)) {
      setHasCommitted(true);
      setShowCommitConfirm(false);
      // Reset checkboxes for next time
      setCommitCheckboxes(prev => prev.map(cb => ({ ...cb, checked: false })));
    }
  };

  // Handle close button click - show confirmation modal
  const handleCloseClick = () => {
    if (showCommitConfirm) {
      // Cancel commit confirmation and go back to regular flow
      setShowCommitConfirm(false);
    } else if (showInvestorTypeSelection) {
      // Cancel investor type selection
      setShowInvestorTypeSelection(false);
      setSelectedInvestorType(null);
    } else if (showBusinessInfoForm) {
      // Cancel business info form
      setShowBusinessInfoForm(false);
    } else {
      setShowExitModal(true);
    }
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
    setShowCommitConfirm(false);
    setCommitCheckboxes(prev => prev.map(cb => ({ ...cb, checked: false })));
    setShowInvestorTypeSelection(false);
    setSelectedInvestorType(null);
    setIsInvestorTypeComplete(!isFirstTimeInvestor);
    setShowBusinessInfoForm(false);
    setBusinessInfo({
      businessName: '',
      businessEmail: '',
      countryName: '',
      owners: [],
      documents: [],
    });
    setSelectedDeal(deal); // Reset to default deal
  };

  // Handle cancel exit - close modal and continue
  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  // Handle investment progress click - show new AI response with mini card
  const handleProgressClick = () => {
    setShowProgressResponse(true);
    // Scroll to the new response after it renders
    setTimeout(() => {
      progressResponseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Handle edit amount - go back to askAmount state
  const handleEditAmount = () => {
    setFlowState('askAmount');
    setShowProgressResponse(false);
  };

  const progress = getProgress();

  // Get dynamic placeholder based on current step
  const getStepPlaceholder = () => {
    if (flowState !== 'investing') return undefined;

    const currentStep = steps.find(s => s.status === 'current');
    if (!currentStep) return 'Ask a follow-up question...';

    switch (currentStep.id) {
      case 'commit':
        return 'Ask about commitment terms or investment details...';
      case 'signing':
        const currentDoc = getCurrentDocument();
        if (currentDoc) {
          return `Ask about ${currentDoc.title.toLowerCase()}...`;
        }
        return 'Ask about the documents...';
      case 'kyc':
        return 'Ask about identity verification or compliance...';
      case 'wire':
        return 'Ask about wire transfer or payment details...';
      default:
        return 'Ask a follow-up question...';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f0eef0] overflow-hidden font-sans text-[#373338]">
      {/* Header - only show on home screen */}
      {flowState === 'home' && <Header />}

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
              <ScrollAreaPrimitive.Viewport ref={scrollViewportRef} className="h-full w-full rounded-none [&>div]:!block overflow-y-auto">
                <div className="flex flex-col items-center p-6 pb-96 gap-6 w-full">
                  {flowState === 'home' && (
                    /* Home State - Greeting */
                    <>
                      <div className="w-full max-w-2xl mt-16">
                        <Greeting
                          title="Good afternoon, Alex"
                          isFirstTimeUser={isFirstTimeInvestor}
                          portfolioGain="$154k"
                          portfolioPercentage="+12.4%"
                          priorityAllocations="3 priority allocations expiring soon"
                        />
                      </div>

                      {/* Action Needed Card - different content for first-time vs returning users */}
                      <div className="w-full max-w-2xl mt-6">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-3">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#F87171" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span
                            className="text-[15px] text-[#373338]"
                            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                          >
                            {isFirstTimeInvestor ? 'Get Started' : 'Action Needed (3)'}
                          </span>
                        </div>

                        {/* Action Items Card */}
                        <div className="bg-white rounded-xl border border-[#e0dce0] overflow-hidden">
                          {/* For returning users: Anthropic urgent item */}
                          {!isFirstTimeInvestor && (
                            <div
                              onClick={() => {
                                setUserMessage('Continue my investment in Anthropic');
                                setFlowState('loading');
                              }}
                              className="flex items-center gap-3 px-5 py-4 border-b border-[#e0dce0]/60 bg-[#FEF2F2] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                            >
                              <img
                                src="/icons/products/anthropic.png"
                                alt="Anthropic"
                                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 flex items-center justify-between gap-3">
                                <p
                                  className="text-[15px] text-[#373338]"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  Anthropic closes in 2 days - Complete wire transfer
                                </p>
                                <span
                                  className="text-[11px] font-medium text-[#DC2626] bg-[#FEE2E2] px-2 py-1 rounded-full flex-shrink-0"
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  Continue Investment
                                </span>
                              </div>
                            </div>
                          )}

                          {/* For returning users: SpaceX subscription */}
                          {!isFirstTimeInvestor && (
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e0dce0]/60 hover:bg-[#f7f7f8]/50 transition-colors cursor-pointer">
                              <img
                                src="/icons/products/spaceX.png"
                                alt="SpaceX"
                                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                              />
                              <p
                                className="text-[15px] text-[#373338]"
                                style={{ fontFamily: 'Soehne, sans-serif' }}
                              >
                                SpaceX - Sign subscription docs
                              </p>
                            </div>
                          )}

                          {/* New Deals - for first-time users */}
                          {isFirstTimeInvestor && (
                            <div
                              onClick={() => {
                                setUserMessage('Show me available deals');
                                setFlowState('loading');
                                // After loading, transition to deal discovery
                                setTimeout(() => {
                                  setFlowState('discoveringDeals');
                                }, 1500);
                              }}
                              className="flex items-center gap-3 px-5 py-4 border-b border-[#e0dce0]/60 hover:bg-[#f7f7f8]/50 transition-colors cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#e8e5e8] flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#685f6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className="flex-1 flex items-center justify-between gap-3">
                                <p
                                  className="text-[15px] text-[#373338]"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  Explore new investment opportunities
                                </p>
                                <span
                                  className="text-[11px] font-medium text-[#5a8a5a] bg-[#5a8a5a]/10 px-2 py-1 rounded-full flex-shrink-0"
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  New Deals
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Coffee chat - for both */}
                          <div className={cn(
                            "flex items-center gap-3 px-5 py-4 hover:bg-[#f7f7f8]/50 transition-colors cursor-pointer",
                            isFirstTimeInvestor && "border-b border-[#e0dce0]/60"
                          )}>
                            <img
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                              alt="Sarah M."
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <p
                              className="text-[15px] text-[#373338]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              Coffee chat with Sarah M. tomorrow at 2pm
                            </p>
                          </div>

                          {/* Community Insight - for first-time users */}
                          {isFirstTimeInvestor && (
                            <div className="flex items-center gap-3 px-5 py-4 hover:bg-[#f7f7f8]/50 transition-colors cursor-pointer">
                              <div className="w-8 h-8 rounded-lg bg-[#e8e5e8] flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#685f6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <p
                                className="text-[15px] text-[#373338]"
                                style={{ fontFamily: 'Soehne, sans-serif' }}
                              >
                                Join the community and connect with other investors
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
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

                  {/* Deal Discovery Flow - for first-time users */}
                  {(flowState === 'discoveringDeals' || flowState === 'selectingDeal') && (
                    <div className="w-full max-w-2xl">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
                        <img
                          src="/conciergeIcon.png"
                          alt="Goodfin AI"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* AI Introduction Message */}
                      <div className="mb-6">
                        <p
                          className="text-[16px] text-[#48424a] leading-relaxed mb-4"
                          style={{ fontFamily: 'Soehne, sans-serif' }}
                        >
                          Welcome to Goodfin! As an accredited investor, you have access to exclusive pre-IPO and private market opportunities. Here are some of our most popular deals across different sectors:
                        </p>

                        {/* Deal Categories */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {DEAL_CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              className="px-3 py-1.5 text-[13px] text-[#685f6a] bg-white border border-[#e0dce0] rounded-full hover:border-[#c0bcc0] hover:bg-[#f7f7f8] transition-colors"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {category.name} <span className="text-[#a9a4ab]">({category.count})</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Featured Deals */}
                      <div className="mb-6">
                        <h3
                          className="text-[14px] font-medium text-[#685f6a] mb-4"
                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                        >
                          Featured Opportunities
                        </h3>
                        <div className="flex flex-col gap-4">
                          {SAMPLE_DEALS.map((sampleDeal) => (
                            <div
                              key={sampleDeal.id}
                              onClick={() => {
                                // Set the selected deal
                                setSelectedDeal({
                                  id: sampleDeal.id,
                                  companyName: sampleDeal.title,
                                  logo: sampleDeal.image,
                                  minInvestment: 25000,
                                  description: sampleDeal.description,
                                });
                                setUserMessage(`I'd like to invest in ${sampleDeal.title}`);
                                setFlowState('selectingDeal');
                              }}
                              className={cn(
                                "flex items-center gap-4 bg-white border-2 rounded-xl px-4 py-4 cursor-pointer transition-all",
                                selectedDeal.id === sampleDeal.id && flowState === 'selectingDeal'
                                  ? "border-[#373338]"
                                  : "border-[#e0dce0] hover:border-[#c0bcc0]"
                              )}
                            >
                              <img
                                src={sampleDeal.image}
                                alt={sampleDeal.title}
                                className="w-14 h-14 rounded-xl object-cover shadow-sm"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className="text-[17px] font-medium text-[#373338]"
                                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                  >
                                    {sampleDeal.title}
                                  </h4>
                                  <span className={cn(
                                    "text-[10px] px-2 py-0.5 rounded-full uppercase",
                                    sampleDeal.status === 'live' && "bg-[#5a8a5a]/10 text-[#5a8a5a]",
                                    sampleDeal.status === 'premium' && "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
                                    sampleDeal.status === 'closing' && "bg-[#7f7582] text-white"
                                  )}>
                                    {sampleDeal.status === 'closing' ? 'Closing Soon' : sampleDeal.status}
                                  </span>
                                </div>
                                <p
                                  className="text-[13px] text-[#7f7582]"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  {sampleDeal.description}
                                </p>
                                <p
                                  className="text-[11px] text-[#a9a4ab] mt-1"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  {sampleDeal.category} • Min. $25,000
                                </p>
                              </div>
                              <ChevronDown className="w-5 h-5 text-[#a9a4ab] -rotate-90" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prompt to select */}
                      <p
                        className="text-[14px] text-[#7f7582]"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        Select a deal above to learn more and start investing, or tell me what sector you're interested in.
                      </p>
                    </div>
                  )}

                  {/* User deal selection response */}
                  {flowState === 'selectingDeal' && (
                    <div className="w-full max-w-2xl mt-4">
                      <div className="flex justify-end">
                        <div className="bg-[#373338] text-white px-4 py-3 rounded-2xl rounded-br-md">
                          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                            I'd like to invest in {selectedDeal.companyName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI response after deal selection - transition to askAmount */}
                  {flowState === 'selectingDeal' && (
                    <div className="w-full max-w-2xl mt-4">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
                        <img
                          src="/conciergeIcon.png"
                          alt="Goodfin AI"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p
                        className="text-[16px] text-[#48424a] leading-relaxed mb-4"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        Great choice! {selectedDeal.companyName} is one of our most sought-after opportunities.
                        Let me walk you through the investment process.
                      </p>

                      {/* Continue button */}
                      <button
                        onClick={() => {
                          setFlowState('askAmount');
                        }}
                        className="px-6 py-3 bg-[#373338] text-white text-[14px] font-medium rounded-xl hover:bg-[#29272a] transition-colors"
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        Continue to invest in {selectedDeal.companyName}
                      </button>
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
                          src={selectedDeal.logo}
                          alt={selectedDeal.companyName}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm"
                        />
                        <div>
                          <h2
                            className="text-xl font-medium text-[#373338]"
                            style={{ fontFamily: 'Test Signifier, serif' }}
                          >
                            Invest in {selectedDeal.companyName}
                          </h2>
                          <p className="text-[#7f7582] text-sm mt-0.5">{selectedDeal.description}</p>
                        </div>
                      </div>

                      {/* AI Question */}
                      <p
                        className="text-[16px] text-[#48424a] leading-relaxed"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        How much would you like to invest in {selectedDeal.companyName}?
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
                    <div ref={aiResponseRef} className="w-full max-w-2xl">
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
                        Great! I've prepared your investment of ${investmentAmount?.toLocaleString()} in {selectedDeal.companyName}. Let's walk through the steps:
                      </p>

                      {/* Investment Card with Horizontal Stepper */}
                      <div ref={investmentCardRef} className="bg-white rounded-xl border border-[#e0dce0]">
                        {/* Card Header - Deal Info */}
                        <div className="flex items-center gap-4 px-5 py-4 border-b border-[#e0dce0]/50">
                          <img
                            src={selectedDeal.logo}
                            alt={selectedDeal.companyName}
                            className="w-14 h-14 rounded-xl object-cover shadow-sm"
                          />
                          <div className="flex-1">
                            <h2
                              className="text-xl font-medium text-[#373338]"
                              style={{ fontFamily: 'Test Signifier, serif' }}
                            >
                              Invest in {selectedDeal.companyName}
                            </h2>
                            <EditableAmount
                              amount={investmentAmount}
                              onEdit={handleEditAmount}
                            />
                          </div>
                        </div>

                        {/* Horizontal Stepper */}
                        <div className="px-5 pt-5">
                          <HorizontalStepper
                            steps={steps}
                            selectedStepId={selectedStepId}
                            onStepClick={(stepId) => {
                              // Toggle selection - clicking same step deselects it
                              if (selectedStepId === stepId) {
                                setSelectedStepId(null);
                              } else {
                                setSelectedStepId(stepId);
                              }
                            }}
                          />
                        </div>

                        {/* Current Step Details */}
                        {(() => {
                          // Show selected step if one is selected, otherwise show current step
                          const displayStep = selectedStepId
                            ? steps.find(s => s.id === selectedStepId)
                            : steps.find(s => s.status === 'current');
                          if (!displayStep) return null;
                          const isViewingCompleted = selectedStepId && displayStep.status === 'completed';

                          // Special rendering for Signing step - show documents accordion
                          if (displayStep.id === 'signing') {
                            return (
                              <div className="px-5 pb-5 pt-4">
                                <div className="bg-[#f7f7f8] rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <h3
                                      className="text-[16px] font-medium text-[#373338]"
                                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                    >
                                      {displayStep.label}
                                    </h3>
                                    {isViewingCompleted && (
                                      <span className="text-[12px] text-[#5a8a5a] bg-[#5a8a5a]/10 px-2 py-1 rounded-full">
                                        Completed
                                      </span>
                                    )}
                                  </div>

                                  {/* Documents Accordion */}
                                  <div className="space-y-2">
                                    {INVESTMENT_DOCUMENTS.map((doc, index) => {
                                      const isSigned = signedDocuments.includes(doc.id);
                                      const isExpanded = expandedDocId === doc.id;
                                      const pdfUrl = DOCUMENT_PDFS[doc.id];
                                      // Check if all previous documents are signed (unlocks this one)
                                      const previousDocsSigned = INVESTMENT_DOCUMENTS.slice(0, index).every(
                                        (prevDoc) => signedDocuments.includes(prevDoc.id)
                                      );
                                      const isLocked = !isSigned && !previousDocsSigned;

                                      return (
                                        <div
                                          key={doc.id}
                                          className={cn(
                                            "bg-white rounded-lg border border-[#e0dce0] overflow-hidden transition-opacity",
                                            isLocked && "opacity-50"
                                          )}
                                        >
                                          {/* Accordion Header */}
                                          <button
                                            onClick={() => {
                                              if (!isLocked) {
                                                setExpandedDocId(isExpanded ? null : doc.id);
                                              }
                                            }}
                                            disabled={isLocked}
                                            className={cn(
                                              "w-full flex items-center justify-between p-4 transition-colors",
                                              isLocked
                                                ? "cursor-not-allowed"
                                                : "hover:bg-[#f7f7f8]/50"
                                            )}
                                          >
                                            <div className="flex items-center gap-3">
                                              {/* Status indicator */}
                                              <div
                                                className={cn(
                                                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                                                  isSigned
                                                    ? 'bg-[#373338] text-white'
                                                    : isLocked
                                                      ? 'bg-[#d0cdd2] text-[#a09a9f]'
                                                      : 'bg-[#e8e5e8] text-[#7f7582]'
                                                )}
                                              >
                                                {isSigned ? (
                                                  <Check className="w-3.5 h-3.5" />
                                                ) : (
                                                  index + 1
                                                )}
                                              </div>
                                              <div className="text-left">
                                                <p
                                                  className={cn(
                                                    'text-[14px] font-medium',
                                                    isSigned
                                                      ? 'text-[#7f7582]'
                                                      : isLocked
                                                        ? 'text-[#a09a9f]'
                                                        : 'text-[#373338]'
                                                  )}
                                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                                >
                                                  {doc.title}
                                                </p>
                                                {isSigned && (
                                                  <p className="text-[12px] text-[#5a8a5a]">
                                                    {doc.id === 'ppm' ? 'Reviewed' : 'Reviewed & Signed'}
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                            {!isLocked && (
                                              <ChevronDown
                                                className={cn(
                                                  'w-5 h-5 text-[#7f7582] transition-transform',
                                                  isExpanded && 'rotate-180'
                                                )}
                                              />
                                            )}
                                          </button>

                                          {/* Accordion Content */}
                                          {isExpanded && !isLocked && (
                                            <div className="px-4 pb-4 border-t border-[#e0dce0] pt-3">
                                              {!isSigned ? (
                                                <DocumentSigningInline
                                                  document={doc}
                                                  onSign={(docId) => {
                                                    handleDocumentSigned(docId);
                                                    setExpandedDocId(null);
                                                  }}
                                                  onFullscreen={(docId) => setFullscreenDocId(docId)}
                                                />
                                              ) : (
                                                <p
                                                  className="text-[13px] text-[#5a8a5a] leading-relaxed"
                                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                                >
                                                  {doc.id === 'ppm' ? 'You have reviewed this document.' : 'You have reviewed and signed this document.'}
                                                </p>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Special rendering for Commit step - show fee breakdown
                          if (displayStep.id === 'commit') {
                            const adminFeePercent = 0.05;
                            const fundFeePercent = 0.10;
                            const amount = investmentAmount || selectedDeal.minInvestment;
                            const adminFee = amount * adminFeePercent;
                            const fundFee = amount * fundFeePercent;

                            return (
                              <div className="px-5 pb-5 pt-4">
                                <div className="bg-[#f7f7f8] rounded-xl p-5">
                                  {/* Header with completed badge */}
                                  <div className="flex items-center justify-between mb-4">
                                    <h3
                                      className="text-[18px] font-medium text-[#373338]"
                                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                    >
                                      {displayStep.label}
                                    </h3>
                                    {isViewingCompleted && (
                                      <span
                                        className="text-[12px] text-[#5a8a5a] bg-[#5a8a5a]/10 px-3 py-1.5 rounded-full"
                                        style={{ fontFamily: 'Soehne, sans-serif' }}
                                      >
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                  {/* Total Investment */}
                                  <div className="mb-5">
                                    <p
                                      className="text-[13px] text-[#7f7582] mb-1"
                                      style={{ fontFamily: 'Soehne, sans-serif' }}
                                    >
                                      Total Investment
                                    </p>
                                    <p
                                      className="text-[32px] text-[#373338]"
                                      style={{ fontFamily: 'Test Signifier, serif' }}
                                    >
                                      ${amount.toLocaleString()}<span className="text-[20px] text-[#a09a9f]">.00</span>
                                    </p>
                                  </div>

                                  {/* Fee Breakdown */}
                                  <div className="border-t border-[#e0dce0] pt-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="text-[15px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Goodfin Admin Fee
                                        </span>
                                        <span
                                          className="text-[14px] text-[#7f7582]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          (5% fee one-time)
                                        </span>
                                      </div>
                                      <span
                                        className="text-[15px] font-medium text-[#373338]"
                                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                      >
                                        ${adminFee.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="text-[15px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Underlying Fund Fee
                                        </span>
                                        <span
                                          className="text-[14px] text-[#7f7582]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          (10% fee one-time)
                                        </span>
                                      </div>
                                      <span
                                        className="text-[15px] font-medium text-[#373338]"
                                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                      >
                                        ${fundFee.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Carry Structure */}
                                  <div className="border-t border-[#e0dce0] pt-4 mt-4">
                                    <p
                                      className="text-[13px] text-[#7f7582] mb-3"
                                      style={{ fontFamily: 'Soehne, sans-serif' }}
                                    >
                                      Carry Structure
                                    </p>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[15px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Goodfin Carry
                                        </span>
                                        <span
                                          className="text-[15px] text-[#7f7582]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          None
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[15px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Underlying Fund Carry
                                        </span>
                                        <span
                                          className="text-[15px] text-[#7f7582]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          5% recursive
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Apply Credit - editable when active, read-only when completed */}
                                  {!isViewingCompleted ? (
                                    <div className="border-t border-[#e0dce0] pt-4 mt-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <label
                                          className="text-[13px] text-[#7f7582]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          Apply Credit
                                        </label>
                                        <span
                                          className="text-[12px] text-[#5a8a5a] bg-[#5a8a5a]/10 px-2.5 py-1 rounded-full"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          ${availableCredit.toLocaleString()} available
                                        </span>
                                      </div>
                                      <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#7f7582]">$</span>
                                        <input
                                          type="text"
                                          value={appliedCredit}
                                          onChange={(e) => {
                                            const val = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
                                            setAppliedCredit(Math.min(val, availableCredit));
                                          }}
                                          className="w-full pl-8 pr-4 py-3 bg-white border border-[#e0dce0] rounded-lg text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        />
                                      </div>
                                      <p
                                        className="text-[13px] text-[#7f7582] mt-2"
                                        style={{ fontFamily: 'Soehne, sans-serif' }}
                                      >
                                        Credit from referrals and promotions. Adjust the amount you'd like to apply to this investment.
                                      </p>
                                    </div>
                                  ) : appliedCredit > 0 && (
                                    <div className="border-t border-[#e0dce0] pt-4 mt-4 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[15px] text-[#5a8a5a]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          Credit Applied
                                        </span>
                                        <span
                                          className="text-[15px] text-[#5a8a5a]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          -${appliedCredit.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[16px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Total Paid
                                        </span>
                                        <span
                                          className="text-[16px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          ${(amount - appliedCredit).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Total Due Summary - only when active */}
                                  {!isViewingCompleted && appliedCredit > 0 && (
                                    <div className="border-t border-[#e0dce0] pt-4 mt-4 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[15px] text-[#5a8a5a]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          Credit Applied
                                        </span>
                                        <span
                                          className="text-[15px] text-[#5a8a5a]"
                                          style={{ fontFamily: 'Soehne, sans-serif' }}
                                        >
                                          -${appliedCredit.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span
                                          className="text-[16px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          Total Due
                                        </span>
                                        <span
                                          className="text-[16px] font-medium text-[#373338]"
                                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                        >
                                          ${(amount - appliedCredit).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* CTA Button - only show if not viewing completed */}
                                  {!isViewingCompleted && (
                                    <button
                                      onClick={() => handleStepClick(displayStep.id)}
                                      className="w-full mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-3.5 bg-[#373338] text-white text-[15px] font-medium rounded-lg hover:bg-[#29272a] transition-colors"
                                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                    >
                                      {displayStep.ctaLabel}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // Special rendering for Wire step - show bank details inline
                          if (displayStep.id === 'wire' && !isViewingCompleted) {
                            return (
                              <div className="px-5 pb-5 pt-4">
                                <div className="bg-[#f7f7f8] rounded-xl p-4">
                                  <h3
                                    className="text-[16px] font-medium text-[#373338] mb-3"
                                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                  >
                                    Wire Transfer
                                  </h3>
                                  <WireBankDetails
                                    investmentAmount={investmentAmount || 0}
                                    onComplete={() => handleTransferComplete(investmentAmount || 0)}
                                  />
                                </div>
                              </div>
                            );
                          }

                          // Default rendering for other steps
                          return (
                            <div className="px-5 pb-5 pt-4">
                              <div className="bg-[#f7f7f8] rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h3
                                    className="text-[16px] font-medium text-[#373338]"
                                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                  >
                                    {displayStep.label}
                                  </h3>
                                  {isViewingCompleted && (
                                    <span className="text-[12px] text-[#5a8a5a] bg-[#5a8a5a]/10 px-2 py-1 rounded-full">
                                      Completed
                                    </span>
                                  )}
                                </div>
                                <p
                                  className="text-[14px] text-[#7f7582] leading-relaxed mb-4"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  {displayStep.description}
                                </p>
                                {!isViewingCompleted && (
                                  <button
                                    onClick={() => handleStepClick(displayStep.id)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#373338] text-white text-sm font-medium rounded-lg hover:bg-[#29272a] transition-colors"
                                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                  >
                                    {displayStep.ctaLabel}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Suggestions below the card */}
                      {(() => {
                        const currentStep = steps.find(s => s.status === 'current');
                        if (!currentStep) return null;

                        // For signing step, show suggestions for the current document
                        if (currentStep.id === 'signing') {
                          const currentDoc = INVESTMENT_DOCUMENTS.find(doc => !signedDocuments.includes(doc.id));
                          if (currentDoc && STEP_SUGGESTIONS[currentDoc.id]) {
                            return (
                              <SuggestionChips
                                suggestions={STEP_SUGGESTIONS[currentDoc.id]}
                                onSelect={(suggestion) => console.log('Selected:', suggestion)}
                              />
                            );
                          }
                          return null;
                        }

                        // For other steps, show step-specific suggestions
                        if (STEP_SUGGESTIONS[currentStep.id]) {
                          return (
                            <SuggestionChips
                              suggestions={STEP_SUGGESTIONS[currentStep.id]}
                              onSelect={(suggestion) => console.log('Selected:', suggestion)}
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}

                  {/* Investor Type Selection AI Message */}
                  {flowState === 'investing' && showInvestorTypeSelection && (
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
                        {/* AI Question */}
                        <div className="pt-2">
                          <p
                            className="text-[16px] text-[#48424a] leading-relaxed"
                            style={{ fontFamily: 'Soehne, sans-serif' }}
                          >
                            Before we verify your identity, please select your investor type. This helps us ensure compliance with regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Investment Progress AI Response */}
                  {flowState === 'investing' && showProgressResponse && (
                    <div ref={progressResponseRef} className="w-full max-w-2xl">
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
                        Here's your investment progress for {selectedDeal.companyName}:
                      </p>

                      {/* Mini Investment Card */}
                      <div className="bg-white rounded-xl overflow-hidden border border-[#e0dce0]">
                        {/* Card Header - Deal Info */}
                        <div className="flex items-center gap-4 px-5 py-4 border-b border-[#e0dce0]/50">
                          <img
                            src={selectedDeal.logo}
                            alt={selectedDeal.companyName}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm"
                          />
                          <div className="flex-1">
                            <h2
                              className="text-lg font-medium text-[#373338]"
                              style={{ fontFamily: 'Test Signifier, serif' }}
                            >
                              {selectedDeal.companyName}
                            </h2>
                            <EditableAmount
                              amount={investmentAmount}
                              onEdit={handleEditAmount}
                            />
                          </div>
                          <div className="text-right">
                            <span
                              className="text-[13px] font-medium text-[#5a8a5a]"
                              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                            >
                              {progress}% Complete
                            </span>
                          </div>
                        </div>

                        {/* Horizontal Stepper */}
                        <div className="px-5 pt-5">
                          <HorizontalStepper steps={steps} />
                        </div>

                        {/* Current Step Details */}
                        {(() => {
                          const currentStep = steps.find(s => s.status === 'current');
                          if (!currentStep) return null;

                          // Special rendering for Wire step - show bank details inline
                          if (currentStep.id === 'wire') {
                            return (
                              <div className="px-5 pb-5 pt-4">
                                <div className="bg-[#f7f7f8] rounded-xl p-4">
                                  <h3
                                    className="text-[16px] font-medium text-[#373338] mb-3"
                                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                  >
                                    Wire Transfer
                                  </h3>
                                  <WireBankDetails
                                    investmentAmount={investmentAmount || 0}
                                    onComplete={() => {
                                      setShowProgressResponse(false);
                                      handleTransferComplete(investmentAmount || 0);
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="px-5 pb-5 pt-4">
                              <div className="bg-[#f7f7f8] rounded-xl p-4">
                                <h3
                                  className="text-[16px] font-medium text-[#373338] mb-2"
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  {currentStep.label}
                                </h3>
                                <p
                                  className="text-[14px] text-[#7f7582] leading-relaxed mb-4"
                                  style={{ fontFamily: 'Soehne, sans-serif' }}
                                >
                                  {currentStep.description}
                                </p>
                                <button
                                  onClick={() => {
                                    setShowProgressResponse(false);
                                    handleStepClick(currentStep.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#373338] text-white text-sm font-medium rounded-lg hover:bg-[#29272a] transition-colors"
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  {currentStep.ctaLabel}
                                </button>
                              </div>
                            </div>
                          );
                        })()}
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

            {/* Blur Overlay when callout is expanded */}
            {(showCommitConfirm || showInvestorTypeSelection || showBusinessInfoForm || flowState === 'askAmount') && (
              <div
                className="absolute inset-0 z-15 bg-black/20 backdrop-blur-sm transition-all duration-300"
                onClick={() => {
                  if (showCommitConfirm) setShowCommitConfirm(false);
                  if (showInvestorTypeSelection) {
                    setShowInvestorTypeSelection(false);
                    setSelectedInvestorType(null);
                  }
                  if (showBusinessInfoForm) setShowBusinessInfoForm(false);
                  // Don't dismiss on askAmount - user needs to enter amount
                }}
              />
            )}

            {/* Sticky Bottom Input Bar */}
            <div className={cn(
              "absolute bottom-0 left-0 right-0 z-20 flex justify-center p-6 pointer-events-none transition-all duration-300",
              (showCommitConfirm || showInvestorTypeSelection || showBusinessInfoForm || flowState === 'askAmount')
                ? "bg-transparent"
                : "bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/80 to-transparent"
            )}>
              <div className="w-full max-w-2xl pointer-events-auto">
                <InputBarV02
                  currentMode={(flowState === 'loading' || flowState === 'askAmount' || flowState === 'processingAmount' || flowState === 'investing') ? 'investment' : 'default'}
                  onSubmit={flowState === 'askAmount' ? handleAmountSubmit : handleInputSubmit}
                  shake={shakeInput}
                  placeholder={getStepPlaceholder()}
                  formCallout={(flowState === 'askAmount' || flowState === 'processingAmount' || flowState === 'investing') ? {
                    state: showBusinessInfoForm
                      ? 'business_info'
                      : showInvestorTypeSelection
                        ? 'investor_type'
                        : showCommitConfirm
                          ? 'commit_confirm'
                          : amountError
                            ? 'error'
                            : flowState === 'askAmount'
                              ? 'awaiting_input'
                              : 'confirmed',
                    dealLogo: selectedDeal.logo,
                    headerText: amountError
                      ? amountError
                      : showBusinessInfoForm
                        ? 'Business Information'
                        : showInvestorTypeSelection
                          ? 'Select your investor type'
                          : showCommitConfirm
                            ? 'Confirm your commitment'
                            : flowState === 'askAmount'
                              ? 'How much would you like to invest?'
                              : `Invest in ${selectedDeal.companyName}`,
                    displayValue: investmentAmount ? `$${investmentAmount.toLocaleString()}` : undefined,
                    onClose: handleCloseClick,
                    onProgressClick: handleProgressClick,
                    onEditAmount: handleEditAmount,
                    // Commit confirmation props
                    checkboxes: showCommitConfirm ? commitCheckboxes : undefined,
                    onCheckboxChange: showCommitConfirm ? handleCommitCheckboxChange : undefined,
                    ctaText: showBusinessInfoForm
                      ? 'Submit Business Information'
                      : showInvestorTypeSelection
                        ? 'Continue'
                        : 'I agree and understand',
                    onCtaClick: showBusinessInfoForm
                      ? handleBusinessInfoSubmit
                      : showInvestorTypeSelection
                        ? handleInvestorTypeContinue
                        : handleCommitConfirm,
                    // Investor type selection props
                    investorTypeGroups: showInvestorTypeSelection ? investorTypeGroups : undefined,
                    selectedInvestorType: showInvestorTypeSelection ? selectedInvestorType ?? undefined : undefined,
                    onInvestorTypeSelect: showInvestorTypeSelection ? setSelectedInvestorType : undefined,
                    // Business info form props
                    businessInfo: showBusinessInfoForm ? businessInfo : undefined,
                    onBusinessInfoChange: showBusinessInfoForm ? handleBusinessInfoChange : undefined,
                    onAddBusinessOwner: showBusinessInfoForm ? handleAddBusinessOwner : undefined,
                    onOwnerEmailChange: showBusinessInfoForm ? handleOwnerEmailChange : undefined,
                    onAddDocument: showBusinessInfoForm ? handleAddDocument : undefined,
                    primaryOwnerName: showBusinessInfoForm ? 'sudeep mp' : undefined,
                    // Saved profile for returning investors (show when not in selection mode and not awaiting input)
                    savedInvestorProfile: (!showBusinessInfoForm && !showInvestorTypeSelection && !showCommitConfirm && flowState !== 'askAmount' && savedInvestorProfile) ? savedInvestorProfile : undefined,
                    onChangeProfile: handleChangeProfile,
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
        investmentAmount={investmentAmount || selectedDeal.minInvestment}
        onClose={() => setShowTransferModal(false)}
        onBack={() => setShowTransferModal(false)}
        onComplete={(amount) => handleTransferComplete(amount)}
      />

      <DocumentSigningModal
        isOpen={!!signingDocument}
        document={signingDocument}
        onClose={() => setSigningDocument(null)}
        onSign={handleDocumentSigned}
      />

      {/* Fullscreen PDF Modal */}
      {fullscreenDocId && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e4e7] bg-[#f7f7f8]">
              <h3
                className="text-[18px] leading-[24px] text-[#373338]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                {INVESTMENT_DOCUMENTS.find(d => d.id === fullscreenDocId)?.title}
              </h3>
              <button
                onClick={() => setFullscreenDocId(null)}
                className="p-2 hover:bg-[#eae8eb] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#685f6a]" />
              </button>
            </div>
            {/* PDF Content */}
            <iframe
              src={`${DOCUMENT_PDFS[fullscreenDocId]}#toolbar=1&navpanes=1&view=FitH`}
              className="w-full h-[calc(100%-64px)] border-none"
              title={INVESTMENT_DOCUMENTS.find(d => d.id === fullscreenDocId)?.title}
            />
          </div>
        </div>
      )}

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

// Variants for showcase (user states)
export const zaiInvestmentFlowVariants = [
  { id: 'accredited-returning', label: 'Accredited Returning' },
  { id: 'accredited-first-time', label: 'Accredited First Time' },
];

// View wrapper for standalone demo
interface ZAIInvestmentFlowViewProps {
  userState?: ZAIUserState;
}

export function ZAIInvestmentFlowView({ userState = 'accredited-returning' }: ZAIInvestmentFlowViewProps) {
  return (
    <ZAIInvestmentFlow
      userState={userState}
      onComplete={() => console.log('Investment completed!')}
    />
  );
}

export default ZAIInvestmentFlow;
