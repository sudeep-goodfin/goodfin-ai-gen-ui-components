import React, { useState, useEffect, useRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Greeting } from './Greeting';
import { DashboardContent } from './DashboardContent';
import { HomeContent } from './HomeContent';
import { HomeContentV2 } from './HomeContentV2';
import { ChatInterface, ChatMessage } from './ChatInterface';
import { InputBar, ChatMode, MoreMode } from './InputBar';
import { InputBarV02 } from './InputBarV02';
import type { PersonalizationQuestion } from './InputBarV02';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';
import { Icon, CustomIcon } from '../Icon';
import { ArrowLeft, Lock, Target, Zap, Calendar, Sparkles } from 'lucide-react';
import svgPaths from '../../imports/svg-191opiemcf';
import { svgPaths as localSvgPaths } from '../../svgPaths';
import { cn } from '../../../../../lib/utils';
import { ConversationalOnboarding } from '../conversational';

// Preview cards data for personalization peek
const PREVIEW_DEALS = [
  {
    id: 'anthropic',
    title: 'Anthropic',
    category: 'AI',
    image: '/icons/products/anthropic.png',
  },
  {
    id: 'perplexity',
    title: 'Perplexity',
    category: 'AI',
    image: '/icons/products/perplexity.png',
  },
  {
    id: 'spacex',
    title: 'SpaceX',
    category: 'SPACE',
    image: '/icons/products/spaceX.png',
  },
];

const PREVIEW_ACTIONS = [
  { icon: '📊', text: 'Personalized deal recommendations' },
  { icon: '☕', text: 'Coffee chat matches' },
  { icon: '📈', text: 'Portfolio insights' },
];

// Personalization Preview Component - shows muted/locked cards
function PersonalizationPreview({ isVisible, onUnlock, isUnlocked }: { isVisible: boolean; onUnlock?: () => void; isUnlocked?: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="w-full relative">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#a09a9f]" />
        <span className={cn(
          "text-[13px] font-['Soehne_Kraftig',sans-serif]",
          isUnlocked ? "text-[#a09a9f]" : "text-shimmer"
        )}>
          Unlock your personalized experience
        </span>
      </div>

      {/* Cards Container with dimmed overlay */}
      <div className="relative">
        {/* Gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f7f8] z-10 pointer-events-none" />

        {/* Muted Cards Grid */}
        <div className="opacity-40 blur-[1px] select-none pointer-events-none">
          {/* Deal Cards Row */}
          <div className="flex gap-3 overflow-hidden mb-4">
            {PREVIEW_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="flex-shrink-0 w-[180px] bg-white rounded-[12px] border border-[#e6e4e7] p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#f0eef0]">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#a09a9f] font-['Soehne_Kraftig',sans-serif] uppercase">{deal.category}</span>
                    <p className="text-[13px] text-[#48424a] font-['Soehne_Kraftig',sans-serif]">{deal.title}</p>
                  </div>
                </div>
                <div className="h-2 bg-[#e6e4e7] rounded-full w-3/4 mb-1" />
                <div className="h-2 bg-[#e6e4e7] rounded-full w-1/2" />
              </div>
            ))}
          </div>

          {/* Action Items Preview */}
          <div className="bg-white rounded-[12px] border border-[#e6e4e7] overflow-hidden">
            {PREVIEW_ACTIONS.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-3 px-4 border-b border-[#e6e4e7] last:border-b-0"
              >
                <span className="text-lg grayscale">{action.icon}</span>
                <div className="flex-1">
                  <div className="h-3 bg-[#e6e4e7] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lock indicator / Unlock CTA button in center - only show when not unlocked */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={onUnlock}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full animate-rainbow bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:2px_solid_transparent] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] text-white cursor-pointer transition-transform hover:scale-[1.02] shadow-lg"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[13px] font-['Soehne_Kraftig',sans-serif]">
                Complete setup to unlock
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Home Content Variant Types
export type HomeVariant = 'v1' | 'v2-full' | 'v2-compact' | 'v2-action-focused';

// Dropdown menu component
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onResetConversation: () => void;
}

function DropdownMenu({ isOpen, onClose, onFeedback, onResetConversation }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#e9e6ea] py-1 z-50"
    >
      <button
        onClick={() => {
          onFeedback();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.feedback} fill="#69606d" />
        </svg>
        Got Feedback
      </button>
      <button
        onClick={() => {
          onResetConversation();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.reset} fill="#69606d" />
        </svg>
        Reset Conversation
      </button>
    </div>
  );
}

// Component for the header with left and right actions
interface HeaderActionsProps {
  isInChat: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  onFeedback: () => void;
  onResetConversation: () => void;
}

function HeaderActions({ isInChat, onToggleHistory, onNewChat, onFeedback, onResetConversation }: HeaderActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      {/* Left side - Chat History Toggle */}
      <button
        onClick={onToggleHistory}
        className="p-2 hover:bg-black/5 rounded-lg transition-colors"
        title="Chat History"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.sidebarLeft} fill="#69606d" />
        </svg>
      </button>

      {/* Right side - Compose and More */}
      {!isInChat && (
        <div className="flex items-center gap-1">
          {/* New Chat / Compose */}
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            title="New Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d={localSvgPaths.pencilCompose} fill="#69606d" />
            </svg>
          </button>

          {/* More Options */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              title="More Options"
            >
              <svg width="20" height="20" viewBox="0 0 24 20" fill="none">
                <path d={localSvgPaths.moreHorizontal} fill="#69606d" />
              </svg>
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              onFeedback={onFeedback}
              onResetConversation={onResetConversation}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const GREETING_DATA: Record<ChatMode, { title: string; description: string }> = {
  default: {
    title: "Good afternoon, Alex",
    description: "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon."
  },
  research: {
    title: "Deep Research",
    description: "I can help you analyze market trends, review company filings, and synthesize complex financial data. What would you like to investigate today?"
  },
  deals: {
    title: "Deals",
    description: "Reviewing the latest secondary market opportunities and private equity allocations tailored to your investment thesis. 5 new deals match your criteria."
  },
  news: {
    title: "Market Intelligence",
    description: "Breaking news and curated insights impacting your portfolio. Tech sector volatility has increased by 15% following the latest regulatory announcements."
  },
  insight: {
    title: "Community Insight",
    description: "Exclusive reports and investment memorandums shared by the community. See what top analysts are saying about the latest IPOs."
  },
  portfolio: {
    title: "My Portfolio",
    description: "Your total asset value is up 12% YTD. Key drivers include SpaceX and Stripe. Review your detailed performance analysis below."
  },
  events: {
    title: "Upcoming Events",
    description: "Register for upcoming webinars, roundtables, and exclusive member meetups. Don't miss the Q3 Strategy Session next week."
  }
};

// Animation orchestration phases for first-time users
type AnimationStage = 'idle' | 'greeting' | 'inputbar' | 'complete';

// Animation timing constants
const GREETING_COMPLETE_DELAY = 7000; // Time for greeting animation to complete
const INPUTBAR_DELAY = 800; // Delay after greeting before input bar with callout appears

// Personalization questions for the callout
const PERSONALIZATION_QUESTIONS: PersonalizationQuestion[] = [
  // 1. Age Group
  {
    id: 'age_group',
    question: "What age bracket are you in?",
    inputType: 'options',
    options: [
      { id: 'under_30', title: 'Under 30' },
      { id: '30_39', title: '30-39' },
      { id: '40_49', title: '40-49' },
      { id: '50_plus', title: '50 or over' },
    ],
  },
  // 2. Education Level
  {
    id: 'education',
    question: "What's your highest education level?",
    inputType: 'options',
    options: [
      { id: 'high_school', title: 'High School' },
      { id: 'associate', title: 'Associate Degree' },
      { id: 'bachelors', title: "Bachelor's Degree" },
      { id: 'graduate', title: 'Graduate Degree' },
    ],
  },
  // 3. Employment Status
  {
    id: 'employment',
    question: "What's your current employment status?",
    inputType: 'options',
    options: [
      { id: 'founder', title: 'Founder' },
      { id: 'employed', title: 'Employed' },
      { id: 'retired', title: 'Retired' },
      { id: 'self_employed', title: 'Self-employed' },
      { id: 'student', title: 'Student' },
      { id: 'other', title: 'Other' },
    ],
  },
  // 4. Employer (conditional: Employed or Founder)
  {
    id: 'employer',
    question: "What's the name of the company?",
    inputType: 'text',
    placeholder: 'Enter company name...',
    condition: { questionId: 'employment', values: ['employed', 'founder'] },
  },
  // 5. Job Title (conditional: Employed)
  {
    id: 'job_title',
    question: "What's your role or title at the company?",
    inputType: 'text',
    placeholder: 'Enter your job title...',
    condition: { questionId: 'employment', values: ['employed'] },
  },
  // 6. Industry (conditional: Employed)
  {
    id: 'industry',
    question: "What industry or sector is your company in?",
    inputType: 'text',
    placeholder: 'Enter industry...',
    condition: { questionId: 'employment', values: ['employed'] },
  },
  // 7. Company Stage (conditional: Founder)
  {
    id: 'company_stage',
    question: "What stage is your company at currently?",
    inputType: 'options',
    options: [
      { id: 'pre_seed', title: 'Idea or Pre-seed' },
      { id: 'seed', title: 'Seed' },
      { id: 'series_a', title: 'Series A' },
      { id: 'series_b', title: 'Series B' },
      { id: 'series_c_plus', title: 'Series C or later' },
    ],
    condition: { questionId: 'employment', values: ['founder'] },
  },
  // 8. Net Worth
  {
    id: 'net_worth',
    question: "Where would you place yourself today?",
    inputType: 'options',
    options: [
      { id: '500k_1m', title: '$500K - $1M' },
      { id: '1m_5m', title: '$1M - $5M' },
      { id: '5m_10m', title: '$5M - $10M' },
      { id: '10m_plus', title: '$10M+' },
    ],
  },
  // 9. Investment Familiarity
  {
    id: 'familiarity',
    question: "How familiar are you with investing beyond public equities?",
    inputType: 'scale',
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: 'Novice', max: 'Expert' },
  },
  // 10. Investable Assets
  {
    id: 'investable_assets',
    question: "What size pool feels right for alternative investments?",
    inputType: 'options',
    options: [
      { id: 'under_100k', title: '<$100K' },
      { id: '100k_500k', title: '$100K - $500K' },
      { id: '500k_1m', title: '$500K - $1M' },
      { id: '1m_5m', title: '$1M - $5M' },
      { id: '5m_plus', title: '$5M+' },
    ],
  },
  // 11. Investment Goals (multi-select)
  {
    id: 'investment_goals',
    question: "What are your primary investment objectives?",
    inputType: 'multi-select',
    options: [
      { id: 'appreciation', title: 'Capital appreciation' },
      { id: 'diversification', title: 'Diversification' },
      { id: 'income', title: 'Income generation' },
      { id: 'tax', title: 'Tax optimization' },
      { id: 'hedging', title: 'Portfolio hedging' },
      { id: 'expertise', title: 'Sector expertise' },
    ],
  },
  // 12. Risk Tolerance
  {
    id: 'risk_tolerance',
    question: "What's your comfort level with investment risk?",
    inputType: 'options',
    options: [
      { id: 'conservative', title: 'Conservative' },
      { id: 'moderate', title: 'Moderate' },
      { id: 'aggressive', title: 'Aggressive' },
      { id: 'very_aggressive', title: 'Very aggressive' },
    ],
  },
  // 13. Investment Time Horizon
  {
    id: 'time_horizon',
    question: "What's your expected holding period?",
    inputType: 'options',
    options: [
      { id: '1_3_years', title: '1-3 years' },
      { id: '3_7_years', title: '3-7 years' },
      { id: '7_plus_years', title: '7+ years' },
      { id: 'no_timeline', title: 'No specific timeline' },
    ],
  },
  // 14. Sector Interests (multi-select)
  {
    id: 'sector_interests',
    question: "Which investment sectors interest you most?",
    inputType: 'multi-select',
    options: [
      { id: 'early_stage', title: 'Early stage startups' },
      { id: 'growth_stage', title: 'Growth stage companies' },
      { id: 'private_equity', title: 'Private equity' },
      { id: 'private_credit', title: 'Private credit' },
      { id: 'real_estate', title: 'Real estate' },
      { id: 'venture_funds', title: 'Venture funds' },
    ],
  },
  // 15. Coffee Chat Interest
  {
    id: 'coffee_chat',
    question: "Would you be open to meet other community members for coffee chats?",
    inputType: 'options',
    options: [
      { id: 'yes', title: 'Yes, I\'d love to!' },
      { id: 'no', title: 'Not right now' },
    ],
  },
  // 16. Location (conditional: coffee chat = yes)
  {
    id: 'location',
    question: "Where are you located?",
    inputType: 'text',
    placeholder: 'Enter your city...',
    condition: { questionId: 'coffee_chat', values: ['yes'] },
  },
  // 17-19 are conditional text fields for coffee chat
  // 20. Discussion Topics (conditional: coffee chat = yes, multi-select)
  {
    id: 'discussion_topics',
    question: "What are you interested in discussing?",
    inputType: 'multi-select',
    options: [
      { id: 'strategies', title: 'Investing strategies' },
      { id: 'angel', title: 'Angel investing' },
      { id: 'deal_sourcing', title: 'Deal sourcing' },
      { id: 'portfolio', title: 'Portfolio construction' },
      { id: 'tax', title: 'Tax optimization' },
      { id: 'sectors', title: 'Learning new sectors' },
    ],
    condition: { questionId: 'coffee_chat', values: ['yes'] },
  },
  // 21. Engagement Type (conditional: coffee chat = yes, multi-select)
  {
    id: 'engagement_type',
    question: "How would you like to engage?",
    inputType: 'multi-select',
    options: [
      { id: 'social', title: 'Social' },
      { id: 'mentoring', title: 'Mentoring / Advising' },
      { id: 'collaborating', title: 'Collaborating on a project' },
      { id: 'co_investing', title: 'Co-investing' },
      { id: 'sharing', title: 'Sharing resources' },
    ],
    condition: { questionId: 'coffee_chat', values: ['yes'] },
  },
  // 22. Chat Frequency (conditional: coffee chat = yes)
  {
    id: 'chat_frequency',
    question: "What is your preferred frequency for coffee chats?",
    inputType: 'options',
    options: [
      { id: 'weekly', title: 'Once a week' },
      { id: 'biweekly', title: 'Once every two weeks' },
      { id: 'monthly', title: 'Once a month' },
      { id: 'quarterly', title: 'Once a quarter' },
    ],
    condition: { questionId: 'coffee_chat', values: ['yes'] },
  },
];

interface WelcomeDashboardProps {
  homeVariant?: HomeVariant;
  isFirstTimeUser?: boolean;
  isConversationalOnboarding?: boolean;
  animationKey?: number;
  isInConversation?: boolean;
  onStartConversation?: (message: string, tab?: string) => void;
  onEndConversation?: () => void;
  onUpdateConversationTitle?: (title: string) => void;
  onRequestBack?: () => void; // Called when user wants to go back (for confirmation modal)
}

export function WelcomeDashboard({
  homeVariant = 'v1',
  isFirstTimeUser = false,
  isConversationalOnboarding = false,
  animationKey = 0,
  isInConversation: externalIsInConversation,
  onStartConversation,
  onEndConversation,
  onUpdateConversationTitle,
  onRequestBack,
}: WelcomeDashboardProps) {
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [extraSlotItem, setExtraSlotItem] = useState<MoreMode | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Animation orchestration state for first-time users
  const [animationStage, setAnimationStage] = useState<AnimationStage>('idle');

  // Personalization state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedPersonalizationOptions, setSelectedPersonalizationOptions] = useState<Record<string, string[]>>({});
  const [isPersonalizationExpanded, setIsPersonalizationExpanded] = useState(true);
  const [personalizationComplete, setPersonalizationComplete] = useState(false);
  const [hasUnlockedPersonalization, setHasUnlockedPersonalization] = useState(false);
  const [animatingOptionId, setAnimatingOptionId] = useState<string | null>(null);

  // Completion flow state: 'questions' | 'processing' | 'gratification' | 'done'
  const [completionFlowState, setCompletionFlowState] = useState<'questions' | 'processing' | 'gratification' | 'done'>('questions');

  // Chat State
  const [chatState, setChatState] = useState<{
    isActive: boolean;
    messages: ChatMessage[];
    isThinking: boolean;
    streamingContent: string;
    thinkingStartTime: number | null;
    thinkingDuration: number;
  }>({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });

  // Animation orchestration effect
  useEffect(() => {
    if (!isFirstTimeUser) {
      setAnimationStage('complete');
      return;
    }

    // Reset animation and personalization state when key changes
    setAnimationStage('idle');
    setCurrentQuestionIndex(0);
    setSelectedPersonalizationOptions({});
    setIsPersonalizationExpanded(true);
    setPersonalizationComplete(false);
    setHasUnlockedPersonalization(false);
    setCompletionFlowState('questions');

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start with greeting animation immediately
    timers.push(setTimeout(() => setAnimationStage('greeting'), 100));

    // After greeting completes, show input bar with callout
    timers.push(setTimeout(() => setAnimationStage('inputbar'), GREETING_COMPLETE_DELAY));

    // Mark complete shortly after inputbar appears
    timers.push(setTimeout(() => setAnimationStage('complete'), GREETING_COMPLETE_DELAY + INPUTBAR_DELAY));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isFirstTimeUser, animationKey]);

  // Get visible questions (filtering out conditionals that don't apply)
  const getVisibleQuestions = () => {
    return PERSONALIZATION_QUESTIONS.filter(q => {
      if (!q.condition) return true;
      const conditionAnswers = selectedPersonalizationOptions[q.condition.questionId] || [];
      return q.condition.values.some(v => conditionAnswers.includes(v));
    });
  };

  const visibleQuestions = getVisibleQuestions();

  // Find next visible question index
  const findNextVisibleQuestionIndex = (currentIdx: number) => {
    const currentQuestion = visibleQuestions[currentIdx];
    if (!currentQuestion) return currentIdx;

    const currentGlobalIdx = PERSONALIZATION_QUESTIONS.findIndex(q => q.id === currentQuestion.id);
    let nextIdx = currentIdx + 1;

    // If we're at the end of visible questions
    if (nextIdx >= visibleQuestions.length) {
      return currentIdx; // Stay at current (will trigger complete)
    }

    return nextIdx;
  };

  // Personalization option selection handler
  const handlePersonalizationOptionSelect = (questionId: string, optionId: string, isMultiSelect?: boolean) => {
    // For single-select, start the selection animation
    if (!isMultiSelect) {
      setAnimatingOptionId(optionId);
    }

    setSelectedPersonalizationOptions(prev => {
      const current = prev[questionId] || [];

      if (isMultiSelect) {
        // Toggle for multi-select
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        }
        return { ...prev, [questionId]: [...current, optionId] };
      } else {
        // Single select - replace (don't toggle off, user must select something)
        return { ...prev, [questionId]: [optionId] };
      }
    });

    // Auto-advance for single-select questions after animation completes
    if (!isMultiSelect) {
      // Wait for animation to complete (400ms pulse + 100ms buffer)
      setTimeout(() => {
        // Clear animation state
        setAnimatingOptionId(null);

        // Then advance to next question
        const nextIdx = findNextVisibleQuestionIndex(currentQuestionIndex);
        if (nextIdx > currentQuestionIndex) {
          setCurrentQuestionIndex(nextIdx);
        } else {
          // Last question - trigger completion
          handlePersonalizationComplete();
        }
      }, 500);
    }
  };

  // Go back to previous question
  const handlePersonalizationBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Text input change handler
  const handlePersonalizationTextChange = (questionId: string, value: string) => {
    setSelectedPersonalizationOptions(prev => ({
      ...prev,
      [questionId]: value ? [value] : []
    }));
  };

  // Scale input change handler
  const handlePersonalizationScaleChange = (questionId: string, value: number) => {
    setSelectedPersonalizationOptions(prev => ({
      ...prev,
      [questionId]: [String(value)]
    }));
    // No auto-advance - user must click Continue button
  };

  // Continue/Next button handler (for multi-select and text inputs)
  const handlePersonalizationContinue = () => {
    const nextIdx = findNextVisibleQuestionIndex(currentQuestionIndex);
    if (nextIdx > currentQuestionIndex) {
      setCurrentQuestionIndex(nextIdx);
    } else {
      // We're at the end
      handlePersonalizationComplete();
    }
  };

  // Skip optional question
  const handleSkipQuestion = () => {
    const nextIdx = findNextVisibleQuestionIndex(currentQuestionIndex);
    if (nextIdx > currentQuestionIndex) {
      setCurrentQuestionIndex(nextIdx);
    }
  };

  // Personalization completion handler - triggers completion flow
  const handlePersonalizationComplete = () => {
    // Start processing state
    setCompletionFlowState('processing');

    // After processing, show gratification
    setTimeout(() => {
      setCompletionFlowState('gratification');
    }, 2000); // 2 seconds of processing animation
  };

  // Continue to home after gratification
  const handleContinueToHome = () => {
    setCompletionFlowState('done');
    setPersonalizationComplete(true);
    setIsPersonalizationExpanded(false);
  };

  // Unlock personalization - triggered by clicking the unlock CTA
  const handleUnlockPersonalization = () => {
    setHasUnlockedPersonalization(true);
  };

  // Skip personalization - remind me later (go back to unlock preview)
  const handleSkipPersonalization = () => {
    setHasUnlockedPersonalization(false);
    // Reset question state so user can start fresh when they return
    setCurrentQuestionIndex(0);
    setSelectedPersonalizationOptions({});
    setAnimatingOptionId(null);
    setCompletionFlowState('questions');
    // Don't set personalizationComplete - keep showing the unlock preview
  };

  // Toggle personalization expand/collapse
  const handleTogglePersonalizationExpand = () => {
    setIsPersonalizationExpanded(prev => !prev);
  };

  // Check if current question has a valid answer
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const currentQuestionAnswered = currentQuestion
    ? (selectedPersonalizationOptions[currentQuestion.id]?.length ?? 0) > 0
    : false;

  // Check if we're on the last question
  const isLastQuestion = currentQuestionIndex >= visibleQuestions.length - 1;

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
    if (mode === 'insight' || mode === 'events' || mode === 'portfolio') {
      setExtraSlotItem(mode);
    }
  };

  // Reset chat when mode changes
  useEffect(() => {
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });
  }, [currentMode]);

  // Sync with external conversation state (e.g., when header back button is clicked)
  useEffect(() => {
    if (externalIsInConversation === false && chatState.isActive) {
      // External state says we're not in conversation, reset local state
      setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });
    }
  }, [externalIsInConversation]);

  const handleStartChat = (text: string) => {
    // Notify parent about conversation start
    onStartConversation?.(text, 'goodfin-ai');

    const thinkingStart = Date.now();

    setChatState(prev => ({
      isActive: true,
      messages: [{ role: 'user', content: text }],
      isThinking: true,
      streamingContent: "",
      thinkingStartTime: thinkingStart,
      thinkingDuration: 0
    }));

    // Random thinking time between 2-4 seconds for realism
    const thinkingTime = 2000 + Math.random() * 2000;

    // Simulate thinking delay then streaming
    setTimeout(() => {
      const duration = Math.round((Date.now() - thinkingStart) / 1000);
      setChatState(prev => ({ ...prev, isThinking: false, thinkingDuration: duration }));

      let fullResponse = "";
      let componentMessage: ChatMessage | null = null;

      if (text.includes("Databricks") && text.includes("Share why you invested")) {
        fullResponse = "";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'ticker-cta',
          data: {
            dealName: 'Databricks',
            dealLogo: '/icons/products/databricks.jpg'
          }
        };
      } else if (text.includes("Invite friends") && text.includes("$300 credit")) {
        fullResponse = "Invite friends and earn a $300 credit when they complete their first investment. Credits can be applied to reduce your next investment amount.";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'referral-cta',
          data: {
            referralCode: 'abc123',
            referralCredit: 300
          }
        };
      } else if (text.includes("Anthropic")) {
        fullResponse = "Let's resume the investment with Anthropic. I've secured a specialized allocation block for you in the Series C secondary round. Here are the details:";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'wizard',
          data: {}
        };
      } else if (text.toLowerCase().includes("show me all deals") || text.toLowerCase().includes("show all deals")) {
        fullResponse = "Here's a comprehensive view of all available deals organized by category. You can filter by Pre-IPO, Featured, Venture Funds, Early-Stage Startups, and Private Equity Funds. Click on any deal to learn more.";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'all-deals',
          data: {}
        };
      } else {
        fullResponse = "I've analyzed the latest secondary market data for SpaceX. The valuation has stabilized around $180B, driven by successful Starship test flights and increased Starlink revenue. \n\nComparing against the last 6 months:\n• Trading volume is up 15%\n• Buy-side demand exceeds supply by 2:1\n• Pricing is currently at a 5% premium to the last tender offer.\n\nWould you like me to drill down into specific transaction multiples?";
      }

      // Chunk-based streaming (12 chars per chunk, 60ms interval) - matches AI Elements pattern
      const chunks = fullResponse.match(/.{1,12}/g) || [];
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < chunks.length) {
          setChatState(prev => ({
            ...prev,
            streamingContent: prev.streamingContent + chunks[currentIndex]
          }));
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          // Finalize message with thinking duration
          setChatState(prev => ({
            ...prev,
            messages: [
              ...prev.messages,
              { role: 'ai', content: fullResponse, thinkingDuration: prev.thinkingDuration },
              ...(componentMessage ? [componentMessage] : [])
            ],
            streamingContent: ""
          }));
        }
      }, 60); // Chunk streaming speed

    }, thinkingTime);
  };

  const handleWizardComplete = () => {
    // Append the post-completion message
    setChatState(prev => {
      // Prevent duplicate messages if clicked multiple times quickly
      const lastMsg = prev.messages[prev.messages.length - 1];
      if (lastMsg && lastMsg.role === 'ai' && lastMsg.content.includes("successfully transferred")) {
        return prev;
      }

      const successMsg: ChatMessage = {
        role: 'ai',
        content: "Hey, since you've successfully transferred, now you can invite your network to co-invest in this exclusive Anthropic allocation. This helps you build your track record.\n\nWould you like to send an invite or set up performance monitoring for this position?"
      };

      return {
        ...prev,
        messages: [...prev.messages, successMsg]
      };
    });
  };

  const handleBack = () => {
    // If parent wants to handle back (e.g., show confirmation modal), let them
    if (onRequestBack) {
      onRequestBack();
    } else {
      // Otherwise, directly end conversation
      setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });
      onEndConversation?.();
    }
  };

  const handleToggleHistory = () => {
    setIsHistoryDrawerOpen(prev => !prev);
  };

  const handleNewChat = () => {
    // Reset to default state for new chat
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });
    setCurrentMode('default');
  };

  const handleFeedback = () => {
    // Placeholder for feedback action
    console.log('Got Feedback clicked');
    // Could open a modal or redirect to feedback form
  };

  const handleResetConversation = () => {
    // Reset the current conversation
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: 0 });
  };

  const handleSelectChat = (chatId: string) => {
    // Placeholder for loading a specific chat
    console.log('Selected chat:', chatId);
    setIsHistoryDrawerOpen(false);
    // Would load the chat messages from the selected chat ID
  };

  const content = GREETING_DATA[currentMode];

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f7f7f8]">
      {/* Chat History Drawer */}
      <ChatHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        onSelectChat={handleSelectChat}
      />

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

      {/* Conversational Onboarding - Full screen takeover */}
      {isConversationalOnboarding && (
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          <ConversationalOnboarding
            animationKey={animationKey}
            onComplete={() => {
              // Handle completion - could navigate to dashboard
              console.log('Conversational onboarding complete');
            }}
          />
        </div>
      )}

      {/* Top Header Row - Hidden during conversational onboarding */}
      {!isConversationalOnboarding && (
      <div className="relative z-10 w-full">
        {chatState.isActive ? (
          /* When in chat: show conversation header with back button, title, and history toggle */
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e6e4e7] bg-white/50 backdrop-blur-sm">
            {/* Left side: Back button and title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#69606d] hover:text-[#29272a] hover:bg-black/5 transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-[14px] font-medium hidden sm:inline">Back</span>
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-[#d0cdd2] shrink-0" />

              {/* Conversation title */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-[15px] font-semibold text-[#29272a] truncate">
                  {chatState.messages.find(m => m.role === 'user')?.content?.slice(0, 40) || 'New Conversation'}
                  {(chatState.messages.find(m => m.role === 'user')?.content?.length || 0) > 40 && '...'}
                </span>
                {/* Active tab badge */}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f0eef0] text-[11px] font-medium text-[#69606d] border border-[#e6e4e7] shrink-0">
                  Goodfin AI
                </span>
              </div>
            </div>

            {/* Right side: History toggle */}
            <button
              onClick={handleToggleHistory}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors shrink-0"
              title="Chat History"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d={localSvgPaths.sidebarLeft} fill="#69606d" />
              </svg>
            </button>
          </div>
        ) : (
          /* When not in chat: show header actions with history toggle, compose, and more */
          <HeaderActions
            isInChat={chatState.isActive}
            onToggleHistory={handleToggleHistory}
            onNewChat={handleNewChat}
            onFeedback={handleFeedback}
            onResetConversation={handleResetConversation}
          />
        )}
      </div>
      )}

      {/* Main Content Scrollable Area - Using Radix UI ScrollArea */}
      {!isConversationalOnboarding && (
      <ScrollAreaPrimitive.Root className="relative z-10 flex-1 w-full overflow-hidden">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-none [&>div]:!block">
          <div className="flex flex-col items-center p-6 gap-10 w-full min-h-full">
            {/* If Chat is Active, show Chat Interface */}
            {chatState.isActive ? (
              <div className="w-full max-w-3xl mt-6">
                <ChatInterface
                  messages={chatState.messages}
                  isThinking={chatState.isThinking}
                  streamingContent={chatState.streamingContent}
                  thinkingDuration={chatState.thinkingDuration}
                  onWizardComplete={handleWizardComplete}
                  onCardClick={handleStartChat}
                />
              </div>
            ) : (
              /* Otherwise show standard Dashboard content */
              <>
                {currentMode === 'default' && isFirstTimeUser && !personalizationComplete ? (
                  /* First-time user personalization flow with orchestrated animations */
                  <div className="flex flex-col gap-8 w-full mt-10 max-w-3xl">
                    {/* Greeting - visible from 'greeting' stage onwards */}
                    <div
                      className={cn(
                        'transition-all duration-700 ease-out',
                        animationStage === 'idle'
                          ? 'opacity-0 blur-md translate-y-4'
                          : 'opacity-100 blur-0 translate-y-0'
                      )}
                    >
                      <Greeting
                        isFirstTimeUser={true}
                        animationKey={animationKey}
                      />
                    </div>

                    {/* Personalization Preview - muted cards peek */}
                    <div
                      className={cn(
                        'transition-all duration-700 ease-out delay-500',
                        animationStage === 'idle' || animationStage === 'greeting'
                          ? 'opacity-0 translate-y-4'
                          : 'opacity-100 translate-y-0'
                      )}
                    >
                      <PersonalizationPreview
                        isVisible={true}
                        onUnlock={handleUnlockPersonalization}
                        isUnlocked={hasUnlockedPersonalization}
                      />
                    </div>
                    {/* Personalization questions are now shown in the InputBar callout below */}
                  </div>
                ) : currentMode === 'default' ? (
                  <div className="w-full max-w-3xl mt-6">
                    {homeVariant === 'v1' ? (
                      <HomeContent
                        onModeChange={handleModeChange}
                        onStartChat={handleStartChat}
                      />
                    ) : (
                      <HomeContentV2
                        variant={
                          homeVariant === 'v2-full' ? 'full' :
                          homeVariant === 'v2-compact' ? 'compact' : 'action-focused'
                        }
                        onModeChange={handleModeChange}
                        onStartChat={handleStartChat}
                      />
                    )}
                  </div>
                ) : (
                  <div className={`flex flex-col gap-10 w-full mt-10 ${currentMode === 'news' ? 'max-w-6xl' : 'max-w-3xl'}`}>
                    {/* Only show greeting for modes that don't have their own greeting in DashboardContent */}
                    {currentMode !== 'events' && (
                      <Greeting
                        title={content.title}
                        description={content.description}
                        isFirstTimeUser={isFirstTimeUser}
                      />
                    )}
                    <DashboardContent
                      mode={currentMode}
                      onSuggestionClick={handleStartChat}
                      isFirstTimeUser={isFirstTimeUser}
                    />
                  </div>
                )}
              </>
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
      )}

      {/* Sticky Bottom Input Bar - with blur animation for first-time users */}
      {!isConversationalOnboarding && (
      <div
        className={cn(
          "relative z-20 w-full flex justify-center p-6 bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/80 to-transparent",
          isFirstTimeUser && "transition-all duration-700 ease-out",
          isFirstTimeUser && ['idle', 'greeting'].includes(animationStage)
            ? 'opacity-0 blur-sm translate-y-4'
            : 'opacity-100 blur-0 translate-y-0'
        )}
      >
        <div className="w-full max-w-3xl">
          {/* Show personalization flow only after user clicks unlock */}
          {isFirstTimeUser && hasUnlockedPersonalization && !personalizationComplete ? (
            <InputBarV02
              currentMode={currentMode}
              onModeChange={handleModeChange}
              placeholder="Tell me more about your investment preferences..."
              formCallout={{
                state: completionFlowState === 'processing'
                  ? 'personalization_processing'
                  : completionFlowState === 'gratification'
                    ? 'personalization_complete'
                    : 'personalization',
                headerText: completionFlowState === 'questions' ? "Let's personalize your experience" : undefined,
                personalizationQuestions: visibleQuestions,
                currentQuestionIndex,
                selectedPersonalizationOptions,
                animatingOptionId: animatingOptionId || undefined,
                onPersonalizationOptionSelect: handlePersonalizationOptionSelect,
                onPersonalizationTextChange: handlePersonalizationTextChange,
                onPersonalizationScaleChange: handlePersonalizationScaleChange,
                isPersonalizationExpanded,
                onTogglePersonalizationExpand: handleTogglePersonalizationExpand,
                onSkipQuestion: handleSkipQuestion,
                onSkipPersonalization: handleSkipPersonalization,
                onBack: handlePersonalizationBack,
                ctaText: isLastQuestion && currentQuestionAnswered
                  ? "Complete Setup"
                  : currentQuestionAnswered
                    ? "Continue"
                    : "Select an option",
                isCtaDisabled: !currentQuestionAnswered,
                onCtaClick: isLastQuestion && currentQuestionAnswered
                  ? handlePersonalizationComplete
                  : handlePersonalizationContinue,
                // Gratification props
                gratificationTitle: "You're all set!",
                gratificationSubtitle: "We've personalized your Goodfin experience based on your preferences.",
                onContinueToHome: handleContinueToHome,
              }}
            />
          ) : (
            <InputBar
              currentMode={currentMode}
              extraSlotItem={extraSlotItem}
              onModeChange={handleModeChange}
              isInConversation={chatState.isActive || externalIsInConversation}
            />
          )}
        </div>
      </div>
      )}
    </div>
  );
}
