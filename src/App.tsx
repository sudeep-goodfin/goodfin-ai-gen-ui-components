import React, { useCallback, useRef, useState } from 'react';
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
  InvestmentAmountInput,
  ZAIInvestmentFlow,
  zaiInvestmentFlowVariants,
  type AIGreetingVariant,
  type InvestmentFlowStep,
  type OnboardingVariant,
  type WelcomeScreenVariant,
  type InputBarVersion,
  type ZAIUserState,
  ShimmerShowcase,
  shimmerVariants,
  ThinkingIndicatorShowcase,
  thinkingVariants,
  AIResponseShowcase,
  aiResponseVariants,
  ChainOfThoughtShowcase,
  LongRunningTaskShowcase,
  longRunningTaskVariants,
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
  Bot,
  Loader2,
  MessageCircle,
  BrainCircuit,
  Clock,
  Settings,
  ChevronDown,
  ChevronUp,
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

// InputBar Playground Component with interactive configuration
type PlaygroundChatMode = 'default' | 'research' | 'deals' | 'news' | 'investment' | 'insight' | 'events' | 'portfolio';
type PlaygroundCalloutState = 'none' | 'awaiting_input' | 'confirmed' | 'error';

// URL helpers for playground
const getPlaygroundParams = () => new URLSearchParams(window.location.search);
const updatePlaygroundParams = (params: Record<string, string | boolean>) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value === false || value === '' || value === 'none' || value === 'default') {
      url.searchParams.delete(key);
    } else if (typeof value === 'boolean') {
      url.searchParams.set(key, value ? '1' : '0');
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.replaceState({}, '', url.toString());
};

interface InputBarPlaygroundProps {
  suggestions: Array<{ id: string; text: string; icon?: React.ReactNode }>;
}

function InputBarPlayground({ suggestions }: InputBarPlaygroundProps) {
  // Initialize state from URL params
  const initFromUrl = () => {
    const params = getPlaygroundParams();
    return {
      chatMode: (params.get('mode') as PlaygroundChatMode) || 'default',
      calloutState: (params.get('callout') as PlaygroundCalloutState) || 'none',
      showSuggestions: params.get('suggestions') === '1',
      isStreaming: params.get('streaming') === '1',
      isInConversation: params.get('conversation') === '1',
    };
  };

  const initial = initFromUrl();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [chatMode, setChatMode] = useState<PlaygroundChatMode>(initial.chatMode);
  const [showSuggestions, setShowSuggestions] = useState(initial.showSuggestions);
  const [isStreaming, setIsStreaming] = useState(initial.isStreaming);
  const [isInConversation, setIsInConversation] = useState(initial.isInConversation);
  const [calloutState, setCalloutState] = useState<PlaygroundCalloutState>(initial.calloutState);
  const [shake, setShake] = useState(false);

  // Update URL when state changes
  const updateChatMode = (mode: PlaygroundChatMode) => {
    setChatMode(mode);
    updatePlaygroundParams({ mode });
  };

  const updateCalloutState = (state: PlaygroundCalloutState) => {
    setCalloutState(state);
    updatePlaygroundParams({ callout: state });
    // Trigger shake animation when error state is selected
    if (state === 'error') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const updateShowSuggestions = (value: boolean) => {
    setShowSuggestions(value);
    updatePlaygroundParams({ suggestions: value });
  };

  const updateIsStreaming = (value: boolean) => {
    setIsStreaming(value);
    updatePlaygroundParams({ streaming: value });
  };

  const updateIsInConversation = (value: boolean) => {
    setIsInConversation(value);
    updatePlaygroundParams({ conversation: value });
  };

  const getFormCallout = () => {
    if (calloutState === 'none') return undefined;

    const baseCallout = {
      dealLogo: '/icons/products/anthropic.png',
      onClose: () => setCalloutState('none'),
    };

    switch (calloutState) {
      case 'awaiting_input':
        return { ...baseCallout, state: 'awaiting_input' as const, headerText: 'Anthropic' };
      case 'confirmed':
        return { ...baseCallout, state: 'confirmed' as const, headerText: 'Anthropic', displayValue: '$50,000', onEditAmount: () => {} };
      case 'error':
        return { ...baseCallout, state: 'error' as const, headerText: 'Minimum investment is $25,000' };
      default:
        return undefined;
    }
  };

  return (
    <div className="bg-[#f7f7f8] min-h-[600px]">
      {/* Settings Panel */}
      <div className="border-b border-gray-200 bg-white">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Configuration</span>
          </div>
          {isSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isSettingsOpen && (
          <div className="px-4 pb-4 space-y-4">
            {/* Chat Mode */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chat Mode</label>
              <div className="flex flex-wrap gap-2">
                {(['default', 'research', 'deals', 'news'] as PlaygroundChatMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateChatMode(mode)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      chatMode === mode
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Callout State */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Callout State</label>
              <div className="flex flex-wrap gap-2">
                {(['none', 'awaiting_input', 'confirmed', 'error'] as PlaygroundCalloutState[]).map((state) => (
                  <button
                    key={state}
                    onClick={() => updateCalloutState(state)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      calloutState === state
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {state === 'none' ? 'None' : state.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSuggestions}
                  onChange={(e) => updateShowSuggestions(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-700">Show Suggestions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStreaming}
                  onChange={(e) => updateIsStreaming(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-700">Streaming</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInConversation}
                  onChange={(e) => updateIsInConversation(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-700">In Conversation</span>
              </label>
            </div>

            {/* Error Animation - Only show when error state is selected */}
            {calloutState === 'error' && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Error Animation</label>
                <button
                  onClick={() => {
                    setShake(true);
                    setTimeout(() => setShake(false), 500);
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Trigger Shake Animation
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="p-8 min-h-[500px] flex items-end justify-center">
        <InputBarV02
          currentMode={calloutState !== 'none' ? 'investment' : chatMode}
          suggestions={showSuggestions ? suggestions : []}
          isStreaming={isStreaming}
          isInConversation={isInConversation}
          formCallout={getFormCallout()}
          shake={shake}
          onStopStreaming={() => updateIsStreaming(false)}
          onSuggestionClick={(s) => console.log('Selected:', s.text)}
        />
      </div>
    </div>
  );
}

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
          component: (variant: string) => {
            const suggestions = [
              { id: '1', text: "Show me trending pre-IPO deals this week", icon: <Sparkles className="w-4 h-4" /> },
              { id: '2', text: "What's the minimum investment for Anthropic?", icon: <Sparkles className="w-4 h-4" /> },
              { id: '3', text: "Compare SpaceX and Stripe investment terms", icon: <Sparkles className="w-4 h-4" /> },
              { id: '4', text: "Help me diversify my private market portfolio", icon: <Sparkles className="w-4 h-4" /> },
            ];

            if (variant === 'v0.1') {
              return (
                <div className="p-8 bg-[#f7f7f8] min-h-[300px] flex items-end justify-center">
                  <InputBarV01 currentMode="default" />
                </div>
              );
            }

            if (variant === 'all-states') {
              return (
                <div className="p-8 bg-[#f7f7f8] space-y-12">
                  {/* Default State */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Default State</h3>
                    <InputBarV02 currentMode="default" />
                  </div>

                  {/* With Suggestions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">With Suggestions (click input)</h3>
                    <InputBarV02
                      currentMode="default"
                      suggestions={suggestions}
                      onSuggestionClick={(s) => console.log('Selected:', s.text)}
                    />
                  </div>

                  {/* Chat Modes */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Chat Modes</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Research Mode</span>
                        <InputBarV02 currentMode="research" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Deals Mode</span>
                        <InputBarV02 currentMode="deals" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">News Mode</span>
                        <InputBarV02 currentMode="news" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">In Conversation</span>
                        <InputBarV02 currentMode="deals" isInConversation />
                      </div>
                    </div>
                  </div>

                  {/* Investment States */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Investment Flow States</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Awaiting Input</span>
                        <InputBarV02
                          currentMode="investment"
                          formCallout={{
                            state: 'awaiting_input',
                            dealLogo: '/icons/products/anthropic.png',
                            headerText: 'Anthropic',
                            onClose: () => {},
                          }}
                          placeholder="Enter amount"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Confirmed</span>
                        <InputBarV02
                          currentMode="investment"
                          formCallout={{
                            state: 'confirmed',
                            dealLogo: '/icons/products/anthropic.png',
                            headerText: 'Anthropic',
                            displayValue: '$50,000',
                            onClose: () => {},
                            onEditAmount: () => {},
                          }}
                          placeholder="Ask a follow-up question..."
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Error State</span>
                        <InputBarV02
                          currentMode="investment"
                          formCallout={{
                            state: 'error',
                            dealLogo: '/icons/products/anthropic.png',
                            headerText: 'Minimum investment is $25,000',
                            onClose: () => {},
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">Streaming Response</span>
                        <InputBarV02
                          currentMode="default"
                          isStreaming={true}
                          onStopStreaming={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // v0.2 - Interactive Playground
            return <InputBarPlayground suggestions={suggestions} />;
          },
          icon: <MessageSquare className="w-6 h-6" />,
          variants: [
            { id: 'v0.1', label: 'v0.1 - Basic' },
            { id: 'v0.2', label: 'v0.2 - Playground' },
            { id: 'all-states', label: 'All States' },
          ],
        },
        {
          id: 'investment-amount-input',
          label: 'Investment Amount Input',
          component: () => (
            <div className="p-8 bg-[#d9d5db] min-h-[300px] flex items-center justify-center">
              <InvestmentAmountInput
                company={{
                  name: 'Anthropic',
                  logo: '/icons/products/anthropic.png',
                  description: 'AI safety and research company',
                  type: 'Pre-IPO Company',
                }}
                onSubmit={(amount) => console.log('Amount:', amount)}
                onClose={() => console.log('Close')}
                onProgressClick={() => console.log('Progress')}
              />
            </div>
          ),
          icon: <DollarSign className="w-6 h-6" />,
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
    {
      id: 'ai-elements',
      label: 'AI Elements',
      components: [
        {
          id: 'shimmer',
          label: 'Shimmer Effect',
          component: (variant: string) => (
            <ShimmerShowcase variant={variant as 'default' | 'fast' | 'slow' | 'custom-colors'} />
          ),
          icon: <Sparkles className="w-6 h-6" />,
          variants: shimmerVariants,
        },
        {
          id: 'thinking-indicator',
          label: 'Thinking Indicator',
          component: (variant: string) => (
            <ThinkingIndicatorShowcase variant={variant as 'default' | 'investment' | 'analysis' | 'custom'} />
          ),
          icon: <Loader2 className="w-6 h-6" />,
          variants: thinkingVariants,
        },
        {
          id: 'ai-response',
          label: 'AI Streaming Response',
          component: () => <AIResponseShowcase />,
          icon: <MessageCircle className="w-6 h-6" />,
        },
        {
          id: 'chain-of-thought',
          label: 'Chain of Thought',
          component: () => <ChainOfThoughtShowcase />,
          icon: <BrainCircuit className="w-6 h-6" />,
        },
        {
          id: 'long-running-task',
          label: 'Long Running Task',
          component: () => <LongRunningTaskShowcase />,
          icon: <Clock className="w-5 h-5" />,
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

  // Personalization variants (post-account creation onboarding questions)
  const personalizationVariants = [
    { id: 'accredited-first-time', label: 'Accredited First Time' },
    { id: 'conversational', label: 'Conversational' },
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
      renderPersonalizationView={(variant, animationKey) => (
        <Welcome02
          key={animationKey}
          showChrome={false}
          homeVariant="v2-full"
          isFirstTimeUser={variant === 'accredited-first-time'}
          isConversationalOnboarding={variant === 'conversational'}
          animationKey={animationKey}
        />
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
      personalizationVariants={personalizationVariants}
      welcomeVariants={welcomeScreenVariants}
      welcome02Variants={welcome02Variants}
      welcome02HomeVariants={welcome02HomeVariants}
      investmentFlowSteps={investmentFlowSteps}
      conversationFlowOptions={conversationFlowOptions}
    />
  );
}
