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
  InputBarV01,
  InputBarV02,
  DealProductPage,
  InvestmentFlow,
  ZAIInvestmentFlow,
  zaiInvestmentFlowVariants,
  type AIGreetingVariant,
  type InvestmentFlowStep,
  type OnboardingVariant,
  type WelcomeScreenVariant,
  type InputBarVersion,
  type ZAIUserState,
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
  ThumbsUp,
  PanelLeft,
  CalendarDays,
  History,
  Hand,
  Wallet,
  Lightbulb,
  Gauge,
  Compass,
  LayoutGrid,
} from 'lucide-react';
import {
  FeedbackButtons,
  feedbackButtonsVariants,
  DefaultHeader,
  DefaultSidebar,
  ExploreCard,
  ExploreCardContent,
  EventCard,
  EventsList,
  ChatHistoryDrawerDemo,
  Greeting,
  DealCard,
  PortfolioSummary,
  DEFAULT_CHART_DATA,
  MyInvestments,
  SAMPLE_INVESTMENTS,
  SuggestionCard,
  ProgressWidget,
} from './components/ui';

export function App() {
  // Replay function ref for AI greeting animation
  const replayFnRef = useRef<(() => void) | null>(null);

  const handleReplayRequest = useCallback((replayFn: () => void) => {
    replayFnRef.current = replayFn;
  }, []);

  // Default greeting variant for conversation view
  const conversationGreetingVariant: AIGreetingVariant = 'accredited-first-time';

  // Component groups organized by category
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
          id: 'deal-product-page',
          label: 'Deal Product Page',
          component: () => <DealProductPage />,
          icon: <TrendingUp className="w-6 h-6" />,
          fullscreen: true,
        },
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
          component: (variant: string) => (
            <Welcome02 showChrome={variant === 'with-chrome'} />
          ),
          icon: <Sparkles className="w-6 h-6" />,
          variants: [
            { id: 'app-only', label: 'App Only' },
            { id: 'with-chrome', label: 'With Chrome' },
          ],
        },
      ],
    },
    {
      id: 'primitives',
      label: 'Primitives',
      components: [
        {
          id: 'input-bar',
          label: 'Input Bar (Chatbox)',
          component: (variant: string) => (
            <div className="p-8 bg-[#f7f7f8] min-h-[400px] flex items-end justify-center">
              {variant === 'v0.1' ? (
                <InputBarV01 currentMode="default" />
              ) : (
                <InputBarV02 currentMode="default" />
              )}
            </div>
          ),
          icon: <MessageSquare className="w-6 h-6" />,
          variants: [
            { id: 'v0.1', label: 'v0.1 - Basic' },
            { id: 'v0.2', label: 'v0.2 - Commands' },
          ],
        },
        {
          id: 'feedback-buttons',
          label: 'Feedback Buttons',
          component: (variant: string) => (
            <div className="p-8 bg-white min-h-[200px] flex items-center justify-center">
              <FeedbackButtons variant={variant as 'default' | 'minimal' | 'with-labels'} />
            </div>
          ),
          icon: <ThumbsUp className="w-6 h-6" />,
          variants: feedbackButtonsVariants,
        },
        {
          id: 'header',
          label: 'Header',
          component: () => (
            <div className="bg-muted min-h-[100px]">
              <DefaultHeader
                logoSrc="/goodfin-logo.png"
                avatar={{ fallback: 'AL' }}
              />
            </div>
          ),
          icon: <LayoutGrid className="w-6 h-6" />,
        },
        {
          id: 'sidebar',
          label: 'Sidebar',
          component: () => (
            <div className="bg-muted min-h-[500px] flex">
              <DefaultSidebar activeItem="ai" />
              <div className="flex-1 p-8 flex items-center justify-center text-muted-foreground">
                Main content area
              </div>
            </div>
          ),
          icon: <PanelLeft className="w-6 h-6" />,
        },
        {
          id: 'greeting',
          label: 'Greeting',
          component: () => (
            <div className="p-8 bg-muted min-h-[300px]">
              <Greeting
                title="Good afternoon, Alex"
                description="Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX."
              />
            </div>
          ),
          icon: <Hand className="w-6 h-6" />,
        },
        {
          id: 'explore-card',
          label: 'Explore Card',
          component: () => (
            <div className="p-8 bg-muted min-h-[300px]">
              <div className="grid grid-cols-2 gap-4 max-w-2xl">
                <ExploreCard>
                  <ExploreCardContent
                    title="Browse Deals"
                    descriptions={["Explore investment opportunities"]}
                    icon={<TrendingUp className="w-5 h-5 text-muted-foreground" />}
                  />
                </ExploreCard>
                <ExploreCard>
                  <ExploreCardContent
                    title="My Portfolio"
                    descriptions={["View your investments"]}
                    icon={<Wallet className="w-5 h-5 text-muted-foreground" />}
                  />
                </ExploreCard>
              </div>
            </div>
          ),
          icon: <Compass className="w-6 h-6" />,
        },
        {
          id: 'event-card',
          label: 'Event Card',
          component: () => (
            <div className="p-8 bg-muted min-h-[400px]">
              <div className="max-w-xl">
                <EventsList
                  events={[
                    {
                      id: '1',
                      day: '15',
                      month: 'JAN',
                      year: '2025',
                      title: 'AI Investment Summit',
                      location: 'San Francisco, CA',
                      weekday: 'Wednesday',
                      time: '9:00 AM - 5:00 PM',
                      image: '/icons/products/anthropic.png',
                      typeId: 'summit',
                    },
                    {
                      id: '2',
                      day: '22',
                      month: 'JAN',
                      year: '2025',
                      title: 'Investor Roundtable',
                      location: 'New York, NY',
                      weekday: 'Wednesday',
                      time: '6:00 PM - 9:00 PM',
                      image: '/icons/products/openAI.png',
                      typeId: 'roundtable',
                    },
                  ]}
                  remainingCount={5}
                />
              </div>
            </div>
          ),
          icon: <CalendarDays className="w-6 h-6" />,
        },
        {
          id: 'chat-history-drawer',
          label: 'Chat History Drawer',
          component: () => <ChatHistoryDrawerDemo />,
          icon: <History className="w-6 h-6" />,
        },
        {
          id: 'deal-card',
          label: 'Deal Card',
          component: (variant: string) => (
            <div className="p-8 bg-muted min-h-[300px] flex items-center justify-center">
              <DealCard
                id="1"
                category={variant === 'premium' ? 'EXCLUSIVE' : variant === 'closing' ? 'SPACE TECH' : 'AI'}
                status={variant as 'live' | 'closing' | 'premium'}
                title={variant === 'premium' ? 'OpenAI' : variant === 'closing' ? 'SpaceX' : 'Anthropic'}
                description={
                  variant === 'premium'
                    ? 'Leading AI research lab building safe and beneficial artificial general intelligence'
                    : variant === 'closing'
                    ? 'Space travel with reusable rockets and interplanetary ambitions'
                    : 'AI safety and research company building reliable, interpretable AI systems'
                }
                image={
                  variant === 'premium'
                    ? '/icons/products/openAI.png'
                    : variant === 'closing'
                    ? '/icons/products/spaceX.png'
                    : '/icons/products/anthropic.png'
                }
                investors={[
                  '/icons/products/openAI.png',
                  '/icons/products/spaceX.png',
                  '/icons/products/anthropic.png',
                ]}
                investorNames={['Spark Capital', 'Menlo Ventures']}
              />
            </div>
          ),
          icon: <TrendingUp className="w-6 h-6" />,
          variants: [
            { id: 'live', label: 'Live' },
            { id: 'closing', label: 'Closing Soon' },
            { id: 'premium', label: 'Premium' },
          ],
        },
        {
          id: 'portfolio-summary',
          label: 'Portfolio Summary',
          component: () => (
            <div className="p-8 bg-muted min-h-[450px]">
              <div className="max-w-md">
                <PortfolioSummary
                  totalValue={1946160}
                  changePercent={8.12}
                  amountInvested={1800000}
                  returns={146160}
                  chartData={DEFAULT_CHART_DATA}
                />
              </div>
            </div>
          ),
          icon: <BarChart3 className="w-6 h-6" />,
        },
        {
          id: 'my-investments',
          label: 'My Investments',
          component: () => (
            <div className="p-8 bg-muted min-h-[500px]">
              <div className="max-w-2xl">
                <MyInvestments investments={SAMPLE_INVESTMENTS} />
              </div>
            </div>
          ),
          icon: <Wallet className="w-6 h-6" />,
        },
        {
          id: 'suggestion-card',
          label: 'Suggestion Card',
          component: () => (
            <div className="p-8 bg-muted min-h-[300px]">
              <div className="max-w-md space-y-3">
                <SuggestionCard
                  icon={<TrendingUp className="w-5 h-5" />}
                  title="Review new SpaceX allocation"
                  subtitle="New shares available at $180/share"
                  action="View"
                />
                <SuggestionCard
                  icon={<FileText className="w-5 h-5" />}
                  title="Sign pending documents"
                  subtitle="2 documents awaiting signature"
                  action="Sign"
                />
              </div>
            </div>
          ),
          icon: <Lightbulb className="w-6 h-6" />,
        },
        {
          id: 'progress-widget',
          label: 'Progress Widget',
          component: () => (
            <div className="p-8 bg-muted min-h-[200px]">
              <ProgressWidget
                percentage={23}
                title="Your profile is 23% complete — let's get you to 100% and unlock curated deal flow."
                description="The more you share, the more tailored your Goodfin experience becomes."
              />
            </div>
          ),
          icon: <Gauge className="w-6 h-6" />,
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

  // Welcome02 variants (user states)
  const welcome02Variants = [
    { id: 'accredited-returning', label: 'Accredited Returning' },
    { id: 'accredited-first-time', label: 'Accredited First Time', comingSoon: true },
    { id: 'non-accredited', label: 'Non-Accredited', comingSoon: true },
    { id: 'pending-verification', label: 'Pending Verification', comingSoon: true },
  ];

  // Welcome02 home layout variants
  const welcome02HomeVariants = [
    { id: 'v2-full', label: 'Full' },
    { id: 'v2-compact', label: 'Compact' },
    { id: 'v2-action-focused', label: 'Action' },
  ];

  // Investment Flow user states
  const investmentFlowSteps = [
    { id: 'accredited-first-time', label: 'Accredited First Time' },
    { id: 'already-invested', label: 'Already Invested' },
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
      renderWelcome02View={(_variant, showChrome, homeVariant) => (
        <Welcome02 showChrome={showChrome} homeVariant={homeVariant as 'v1' | 'v2-full' | 'v2-compact' | 'v2-action-focused'} />
      )}
      renderInvestmentFlowView={(step, onDismiss) => {
        // User states for investment flow
        return (
          <InvestmentFlow
            userState={step as 'accredited-first-time' | 'already-invested'}
            onDismiss={onDismiss}
            onComplete={() => {}}
          />
        );
      }}
      renderZAIInvestmentFlowView={(userState, onDismiss) => (
        <ZAIInvestmentFlow
          userState={userState as ZAIUserState}
          onDismiss={onDismiss}
          onComplete={() => {}}
        />
      )}
      zaiInvestmentFlowVariants={zaiInvestmentFlowVariants}
      onboardingVariants={onboardingVariants}
      welcomeVariants={welcomeScreenVariants}
      welcome02Variants={welcome02Variants}
      welcome02HomeVariants={welcome02HomeVariants}
      investmentFlowSteps={investmentFlowSteps}
      conversationFlowOptions={conversationFlowOptions}
    />
  );
}
