import React, { useCallback, useRef } from 'react';
import { DocsLayout } from './components/layout';
import { ConversationView, aiGreetingConversationFlow, spaceXInvestmentFlow } from './components/chat';
import {
  InvestmentReviewChat,
  investmentReviewVariants,
  DealPreviewView,
  dealPreviewVariants,
  DealPageInvestmentView,
  dealInvestmentVariants,
  InvestmentRiskView,
  investmentRiskVariants,
  DocumentDetailView,
  documentDetailVariants,
  SignatureInputView,
  signatureInputVariants,
  DocumentAttachmentWithSign,
  ApplyCreditView,
  applyCreditVariants,
  PromoCodeView,
  promoCodeVariants,
  InvestorProfileView,
  investorProfileVariants,
  BankSelectionView,
  bankSelectionVariants,
  CountrySelectionView,
  countrySelectionVariants,
  WireInstructionsView,
  wireInstructionsVariants,
  AIGreetingView,
  aiGreetingVariants,
  AIGreetingContent,
  IntroducingTickerView,
  introducingTickerVariants,
  IntroducingGoodfinAIView,
  introducingGoodfinAIVariants,
  WelcomeScreenView,
  welcomeScreenVariants,
  OnboardingView,
  onboardingVariants,
  SignatureInputContent,
  ApplyCreditContent,
  PromoCodeContent,
  InvestorProfileContent,
  BankSelectionContent,
  CountrySelectionContent,
  WireInstructionsContent,
  SignableDocumentCard,
  Welcome02,
  type AIGreetingVariant,
  type OnboardingVariant,
  type WelcomeScreenVariant,
} from './components/views';
import {
  Layout,
  FileText,
  PenTool,
  Edit3,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CreditCard,
  Tag,
  UserCheck,
  Building2,
  Globe,
  Send,
  MessageSquare,
  BarChart3,
  Sparkles,
  Home,
} from 'lucide-react';

export function App() {
  // Replay function ref for AI greeting animation
  const replayFnRef = useRef<(() => void) | null>(null);

  const handleReplayRequest = useCallback((replayFn: () => void) => {
    replayFnRef.current = replayFn;
  }, []);

  // Default greeting variant for conversation view
  const conversationGreetingVariant: AIGreetingVariant = 'accredited-first-time';

  // Component groups organized by user flow
  const componentGroups = [
    {
      id: 'investment-flow',
      label: 'Investment Flow',
      components: [
        {
          id: 'deal-preview',
          label: 'Deal Preview',
          component: (variant: string) => <DealPreviewView variant={variant as 'full' | 'minimal'} />,
          icon: <TrendingUp className="w-6 h-6" />,
          variants: dealPreviewVariants,
        },
        {
          id: 'deal-page-investment',
          label: 'Deal Investment',
          component: (variant: string, options?: { showPresets?: boolean; showStepper?: boolean; showSuggestions?: boolean; presetCount?: 3 | 6 }) => (
            <DealPageInvestmentView
              variant={variant as 'full' | 'minimal' | 'simple' | 'block-04'}
              showPresets={options?.showPresets}
              showStepper={options?.showStepper}
              showSuggestions={options?.showSuggestions}
              presetCount={options?.presetCount}
            />
          ),
          icon: <DollarSign className="w-6 h-6" />,
          variants: dealInvestmentVariants,
        },
        {
          id: 'investment-risk',
          label: 'Investment Risk',
          component: (variant: string) => <InvestmentRiskView variant={variant as 'full' | 'minimal'} />,
          icon: <AlertTriangle className="w-6 h-6" />,
          variants: investmentRiskVariants,
        },
        {
          id: 'investment-review',
          label: 'Investment Review',
          component: (variant: string) => <InvestmentReviewChat variant={variant as 'original' | 'compact'} />,
          icon: <Layout className="w-6 h-6" />,
          variants: investmentReviewVariants,
        },
        {
          id: 'document-detail',
          label: 'Document Detail',
          component: (variant: string) => <DocumentDetailView variant={variant as 'full' | 'card'} />,
          icon: <FileText className="w-6 h-6" />,
          variants: documentDetailVariants,
        },
        {
          id: 'signature-input',
          label: 'Signature Input',
          component: (variant: string) => <SignatureInputView variant={variant as 'simple' | 'detailed'} />,
          icon: <Edit3 className="w-6 h-6" />,
          variants: signatureInputVariants,
        },
        {
          id: 'document-signing',
          label: 'Document Signing',
          component: <DocumentAttachmentWithSign />,
          icon: <PenTool className="w-6 h-6" />,
        },
        {
          id: 'apply-credit',
          label: 'Apply Credit',
          component: (variant: string) => <ApplyCreditView variant={variant as 'simple' | 'detailed'} />,
          icon: <CreditCard className="w-6 h-6" />,
          variants: applyCreditVariants,
        },
        {
          id: 'promo-code',
          label: 'Promo Code',
          component: (variant: string) => <PromoCodeView variant={variant as 'simple' | 'detailed'} />,
          icon: <Tag className="w-6 h-6" />,
          variants: promoCodeVariants,
        },
        {
          id: 'investor-profile',
          label: 'Investor Profile',
          component: (variant: string) => <InvestorProfileView variant={variant as 'simple' | 'detailed'} />,
          icon: <UserCheck className="w-6 h-6" />,
          variants: investorProfileVariants,
        },
        {
          id: 'bank-selection',
          label: 'Bank Selection',
          component: (variant: string) => <BankSelectionView variant={variant as 'simple' | 'detailed'} />,
          icon: <Building2 className="w-6 h-6" />,
          variants: bankSelectionVariants,
        },
        {
          id: 'country-selection',
          label: 'Country Selection',
          component: (variant: string) => <CountrySelectionView variant={variant as 'simple' | 'detailed'} />,
          icon: <Globe className="w-6 h-6" />,
          variants: countrySelectionVariants,
        },
        {
          id: 'wire-instructions',
          label: 'Wire Instructions',
          component: (variant: string) => <WireInstructionsView variant={variant as 'simple' | 'detailed'} />,
          icon: <Send className="w-6 h-6" />,
          variants: wireInstructionsVariants,
        },
      ],
    },
    {
      id: 'deal-page',
      label: 'Deal Page',
      components: [
        {
          id: 'ai-greeting',
          label: 'AI Greeting',
          component: (variant: string) => <AIGreetingView variant={variant as 'first-time' | 'returning' | 'invested' | 'non-invested'} />,
          icon: <MessageSquare className="w-6 h-6" />,
          variants: aiGreetingVariants,
        },
        {
          id: 'introducing-ticker',
          label: 'Introducing Ticker',
          component: (variant: string) => <IntroducingTickerView variant={variant as 'modal' | 'inline'} />,
          icon: <BarChart3 className="w-6 h-6" />,
          variants: introducingTickerVariants,
        },
        {
          id: 'introducing-goodfin-ai',
          label: 'Introducing Goodfin AI',
          component: (variant: string) => <IntroducingGoodfinAIView variant={variant as 'modal' | 'inline'} />,
          icon: <Sparkles className="w-6 h-6" />,
          variants: introducingGoodfinAIVariants,
        },
      ],
    },
    {
      id: 'welcome-screen',
      label: 'Welcome Screen',
      components: [
        {
          id: 'welcome-accredited',
          label: 'Accredited Welcome',
          component: (variant: string) => <WelcomeScreenView variant={variant as 'first-time' | 'returning' | 'invested' | 'coffee-chat' | 'upcoming-events' | 'active-engaged'} />,
          icon: <Home className="w-6 h-6" />,
          variants: welcomeScreenVariants,
        },
        {
          id: 'welcome-02',
          label: 'Welcome 0.2',
          component: () => <Welcome02 />,
          icon: <Sparkles className="w-6 h-6" />,
        },
      ],
    },
  ];

  // Document signing content component for conversation embedding
  const DocumentSigningContent = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--chat-ai-foreground)' }}>
        I've prepared the documents for your signature. Please review and sign
        the Private Placement Memorandum to proceed.
      </p>
      <div className="space-y-3 pt-2">
        <SignableDocumentCard
          title="Subscription Agreement"
          subtitle="Signed on Oct 24, 2023"
          status="signed"
        />
        <SignableDocumentCard
          title="Private Placement Memorandum"
          subtitle="Waiting for signature"
          status="pending"
        />
      </div>
      <p className="text-sm pt-2" style={{ color: '#7F7582' }}>
        Once signed, we'll process your investment allocation immediately.
      </p>
    </div>
  );

  // Build components map for conversation view
  const conversationComponents: Record<string, React.ReactNode> = {
    'ai-greeting': (
      <div key={conversationGreetingVariant}>
        <AIGreetingContent
          variant={conversationGreetingVariant}
          showReplayButton={false}
          onReplayRequest={handleReplayRequest}
        />
      </div>
    ),
    'deal-preview': <DealPreviewView variant="full" />,
    'investment-risk': <InvestmentRiskView variant="full" />,
    'document-detail': <DocumentDetailView variant="full" />,
    'document-detail-2': <DocumentDetailView variant="full" />,
    'signature-input': <SignatureInputContent />,
    'document-signing': <DocumentSigningContent />,
    'apply-credit': <ApplyCreditContent />,
    'promo-code': <PromoCodeContent />,
    'investor-profile': <InvestorProfileContent />,
    'country-selection': <CountrySelectionContent />,
    'bank-selection': <BankSelectionContent />,
    'wire-instructions': <WireInstructionsContent />,
  };

  // Conversation flow options
  const conversationFlowOptions = [
    { id: 'ai-greeting', label: 'AI Greeting' },
    { id: 'investment-flow', label: 'Investment Flow' },
  ];

  // Welcome02 variants
  const welcome02Variants = [
    { id: 'default', label: 'Default' },
  ];

  return (
    <DocsLayout
      groups={componentGroups}
      renderConversationView={(flow) => (
        <ConversationView
          messages={flow === 'ai-greeting' ? aiGreetingConversationFlow : spaceXInvestmentFlow}
          components={conversationComponents}
        />
      )}
      renderOnboardingView={(variant, key) => (
        <OnboardingView key={key} variant={variant as OnboardingVariant} />
      )}
      renderWelcomeView={(variant) => (
        <WelcomeScreenView variant={variant as WelcomeScreenVariant} />
      )}
      renderWelcome02View={(_variant, showChrome) => (
        <Welcome02 showChrome={showChrome} />
      )}
      onboardingVariants={onboardingVariants}
      welcomeVariants={welcomeScreenVariants}
      welcome02Variants={welcome02Variants}
      conversationFlowOptions={conversationFlowOptions}
    />
  );
}
