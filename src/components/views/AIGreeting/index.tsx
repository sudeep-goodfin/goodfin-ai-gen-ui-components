import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { ChatLayout } from '../../chat/ChatLayout';
import { AnimatedWordText } from './AnimatedWordText';
import { ThinkingText } from './ThinkingText';
import { SuggestionsList } from './SuggestionsList';
import { cn } from '../../../lib/utils';

// Persona types based on accreditation status
export type AccreditationStatus = 'accredited' | 'non-accredited';

// Sub-states for each persona type
export type AccreditedSubState = 'first-time' | 'returning' | 'invested';
export type NonAccreditedSubState = 'first-time' | 'returning' | 'engaged';

// Combined variant type (6 total variants)
export type AIGreetingVariant =
  | 'accredited-first-time'
  | 'accredited-returning'
  | 'accredited-invested'
  | 'non-accredited-first-time'
  | 'non-accredited-returning'
  | 'non-accredited-engaged';

// Sub-state options for UI selectors
export const accreditedSubStates = [
  { id: 'first-time', label: 'First-time' },
  { id: 'returning', label: 'Returning' },
  { id: 'invested', label: 'Invested' },
];

export const nonAccreditedSubStates = [
  { id: 'first-time', label: 'First-time' },
  { id: 'returning', label: 'Returning' },
  { id: 'engaged', label: 'Engaged' },
];

// Legacy export for backward compatibility
export const aiGreetingVariants = [
  { id: 'accredited-first-time', label: 'Accredited First-time' },
  { id: 'accredited-returning', label: 'Accredited Returning' },
  { id: 'accredited-invested', label: 'Accredited Invested' },
  { id: 'non-accredited-first-time', label: 'Non-Accredited First-time' },
  { id: 'non-accredited-returning', label: 'Non-Accredited Returning' },
  { id: 'non-accredited-engaged', label: 'Non-Accredited Engaged' },
];

// Animation timing constants
const LOGO_FADE_DELAY = 200;
const THINKING_DURATION = 2400; // 3 text shuffles at 800ms each

// Animation phases for sequential timeline
type AnimationPhase =
  | 'idle'
  | 'logo'
  | 'thinking'
  | 'greeting'
  | 'summary'
  | 'suggestions'
  | 'complete';

// Get time-based greeting
function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Variant data configuration
type VariantData = {
  userName: string;
  greeting: string;
  summary: string;
  suggestions: string[];
};

const VARIANT_DATA: Record<AIGreetingVariant, VariantData> = {
  // === ACCREDITED USERS (Can view deals, make investments) ===
  'accredited-first-time': {
    userName: 'there',
    greeting: 'Welcome to Goodfin!',
    summary:
      "I'm your **private market finance assistant**. Let's get you started with exploring **exclusive investment opportunities**.",
    suggestions: [
      'Complete my investor profile',
      'Explore available deals',
      'Schedule a call with an advisor',
      'Learn about private markets',
    ],
  },
  'accredited-returning': {
    userName: 'Alex',
    greeting: `${getTimeGreeting()}, Alex!`,
    summary:
      "Welcome back. Since your last visit, we've added **3 new deals** that match your interests. Your watchlist has **2 deals** closing soon.",
    suggestions: [
      'View new deals matching my interests',
      'Check my watchlist',
      'Continue my pending investment',
      'Update my preferences',
    ],
  },
  'accredited-invested': {
    userName: 'Alex',
    greeting: `${getTimeGreeting()}, Alex!`,
    summary:
      'Your portfolio is performing well. Your investments in **TechCorp** have increased **+12.5%** this quarter. You have **1 document** requiring signature.',
    suggestions: [
      'View portfolio performance',
      'Sign pending documents',
      'Explore new investment opportunities',
      'Download tax documents',
    ],
  },

  // === NON-ACCREDITED USERS (Research, insights, news - assistant mode) ===
  'non-accredited-first-time': {
    userName: 'there',
    greeting: 'Welcome to Goodfin!',
    summary:
      "I'm your **private market finance assistant**. I can help you stay informed with **market insights**, research, and the latest **private market news**.",
    suggestions: [
      'Set up my research preferences',
      'Explore market insights',
      'Learn about private markets',
      'Check accreditation options',
    ],
  },
  'non-accredited-returning': {
    userName: 'Alex',
    greeting: `${getTimeGreeting()}, Alex!`,
    summary:
      "Welcome back. I've found **5 new insights** based on your interests. There's also **breaking news** in the sectors you follow.",
    suggestions: [
      'View latest insights',
      'Check market news',
      'Update research preferences',
      'Explore accreditation',
    ],
  },
  'non-accredited-engaged': {
    userName: 'Alex',
    greeting: `${getTimeGreeting()}, Alex!`,
    summary:
      "Your research dashboard is ready. I've prepared **3 new reports** and identified **2 trending topics** in your focus areas.",
    suggestions: [
      'View research reports',
      'Check trending topics',
      'Set up alerts',
      'Schedule advisor call',
    ],
  },
};

type AIGreetingContentProps = {
  variant?: AIGreetingVariant;
  onSuggestionClick?: (suggestion: string) => void;
  /** Show replay button when animation completes */
  showReplayButton?: boolean;
  /** Callback to trigger replay from external component */
  onReplayRequest?: (replayFn: () => void) => void;
};

/**
 * AIGreetingContent Component
 *
 * Core greeting content without ChatLayout wrapper.
 * Use this when embedding in ConversationView or other layouts.
 *
 * Animation Timeline (Sequential):
 * 1. Logo fades in
 * 2. Thinking shimmer text appears and cycles
 * 3. Thinking exits, Greeting text animates word-by-word
 * 4. After greeting completes, Summary text animates word-by-word
 * 5. After summary completes, Suggestions section fades in
 * 6. Animation complete
 */
export function AIGreetingContent({
  variant = 'accredited-first-time',
  onSuggestionClick,
  showReplayButton = true,
  onReplayRequest,
}: AIGreetingContentProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [animationKey, setAnimationKey] = useState(0);

  const data = VARIANT_DATA[variant];

  // Helper to count words (strip bold markers before counting)
  const countWords = (text: string) => {
    const stripped = text.replace(/\*\*/g, '');
    return stripped.split(' ').filter(w => w.length > 0).length;
  };

  // Calculate animation durations based on text length
  const greetingWordCount = countWords(data.greeting);
  const summaryWordCount = countWords(data.summary);

  // Greeting: 150ms between words + 200ms fade for last word
  const greetingDuration = greetingWordCount * 150 + 200;
  // Summary: 100ms between words + 180ms fade for last word
  const summaryDuration = summaryWordCount * 100 + 180;

  // Replay animation handler
  const handleReplay = useCallback(() => {
    setPhase('idle');
    setAnimationKey(prev => prev + 1);
  }, []);

  // Expose replay function to parent component
  useEffect(() => {
    if (onReplayRequest) {
      onReplayRequest(handleReplay);
    }
  }, [onReplayRequest, handleReplay]);

  // Sequential animation timeline
  useEffect(() => {
    // Reset when variant changes or replay triggered
    setPhase('idle');

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start with logo
    timers.push(setTimeout(() => setPhase('logo'), 0));

    // Phase 2: Show thinking after logo fades in
    timers.push(setTimeout(() => setPhase('thinking'), LOGO_FADE_DELAY + 300));

    // Phase 3: Show greeting after thinking completes
    const greetingStart = LOGO_FADE_DELAY + 300 + THINKING_DURATION;
    timers.push(setTimeout(() => setPhase('greeting'), greetingStart));

    // Phase 4: Show summary AFTER greeting animation completes
    const summaryStart = greetingStart + greetingDuration + 300; // 300ms pause
    timers.push(setTimeout(() => setPhase('summary'), summaryStart));

    // Phase 5: Show suggestions AFTER summary animation completes
    const suggestionsStart = summaryStart + summaryDuration + 400; // 400ms pause
    timers.push(setTimeout(() => setPhase('suggestions'), suggestionsStart));

    // Phase 6: Mark complete
    const completeStart = suggestionsStart + 500;
    timers.push(setTimeout(() => setPhase('complete'), completeStart));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [variant, greetingDuration, summaryDuration, animationKey]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick?.(suggestion);
    console.log('Suggestion clicked:', suggestion);
  };

  // Determine what to show based on current phase
  const showLogo = phase !== 'idle';
  const showThinking = phase === 'thinking';
  const showGreeting = ['greeting', 'summary', 'suggestions', 'complete'].includes(phase);
  const showSummary = ['summary', 'suggestions', 'complete'].includes(phase);
  const showSuggestions = ['suggestions', 'complete'].includes(phase);
  const isComplete = phase === 'complete';

  return (
    <div className="relative max-w-2xl mx-auto py-8">
      {/* Floating Replay Button - Shows when animation is complete */}
      {showReplayButton && isComplete && (
        <button
          onClick={handleReplay}
          className={cn(
            'absolute top-4 right-0 z-10',
            'flex items-center gap-2 px-3 py-2 rounded-full',
            'bg-card border border-border shadow-sm',
            'text-sm font-medium text-muted-foreground',
            'hover:bg-muted hover:text-foreground',
            'transition-all duration-200',
            'animate-fade-in'
          )}
          aria-label="Replay animation"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay</span>
        </button>
      )}

      {/* Greeting Container */}
      <div className="space-y-6" key={animationKey}>
        {/* Top Row: Logo */}
        <div className="flex items-start justify-between">
          {/* AI Avatar with pulse animation */}
          <div
            className={cn(
              'relative transition-opacity duration-500',
              showLogo ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src="/conciergeIcon.png"
              alt="GoodFin AI"
              className={cn(
                'w-12 h-12 rounded-full',
                isComplete && 'animate-pulse-subtle'
              )}
              style={{
                boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
                border: '1px solid #F8F8F8',
              }}
            />
          </div>
        </div>

        {/* Thinking State - Shows during thinking phase only */}
        <ThinkingText
          isVisible={showThinking}
          className="min-h-[28px]"
        />

        {/* Greeting Text - Animates after thinking exits */}
        {showGreeting && (
          <div
            className={cn(
              'transition-opacity duration-300',
              showGreeting ? 'opacity-100' : 'opacity-0'
            )}
          >
            <h1
              className="font-heading text-2xl leading-tight"
              style={{ color: 'var(--foreground)' }}
            >
              <AnimatedWordText
                text={data.greeting}
                baseDelay={0}
                wordDelay={150}
                fadeDuration={200}
              />
            </h1>
          </div>
        )}

        {/* Summary Text - Animates AFTER greeting completes */}
        {showSummary && (
          <div
            className={cn(
              'transition-opacity duration-300',
              showSummary ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p
              className="font-primary text-lg leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <AnimatedWordText
                text={data.summary}
                baseDelay={0}
                wordDelay={100}
                fadeDuration={180}
              />
            </p>
          </div>
        )}

        {/* Suggestions - Fades in AFTER summary completes */}
        {showSuggestions && (
          <SuggestionsList
            suggestions={data.suggestions}
            isVisible={true}
            showDelay={0}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
}

type AIGreetingViewProps = {
  variant?: AIGreetingVariant;
};

/**
 * AIGreetingView Component
 *
 * Displays a dynamic, personalized AI greeting with animations.
 * Features:
 * - GoodFin logo with pulse animation
 * - "Thinking" state with shimmer text
 * - Word-by-word typing reveal
 * - Time-based greetings
 * - User-state specific messaging
 * - Actionable suggestion chips
 */
export function AIGreetingView({ variant = 'accredited-first-time' }: AIGreetingViewProps) {
  return (
    <ChatLayout showInput={true}>
      <div className="px-4">
        <AIGreetingContent variant={variant} />
      </div>
    </ChatLayout>
  );
}

export default AIGreetingView;
