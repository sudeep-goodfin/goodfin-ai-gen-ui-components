import React, { useState, useEffect } from 'react';
import { AnimatedWordText } from '../../../AIGreeting/AnimatedWordText';
import { ThinkingText } from '../../../AIGreeting/ThinkingText';
import { cn } from '../../../../../lib/utils';

// Animation phases for first-time user
type AnimationPhase = 'idle' | 'logo' | 'thinking' | 'greeting' | 'description' | 'complete';

// Animation timing constants
const LOGO_FADE_DELAY = 200;
const THINKING_DURATION = 2400;

interface GreetingProps {
  title?: string;
  portfolioGain?: string;
  portfolioPercentage?: string;
  priorityAllocations?: string;
  isFirstTimeUser?: boolean;
  firstTimeTitle?: string;
  firstTimeDescription?: string;
  animationKey?: number;
}

export function Greeting({
  title = "Good afternoon, Alex",
  portfolioGain = "$154k",
  portfolioPercentage = "+12.4%",
  priorityAllocations = "3 priority allocations expiring soon",
  isFirstTimeUser = false,
  firstTimeTitle = "Welcome to Goodfin, Alex",
  firstTimeDescription = "Congratulations on becoming an **accredited investor**! I'm your AI concierge, here to help you discover and invest in **exclusive private market opportunities**. To personalize your experience, I'd love to learn a bit more about your investment preferences.",
  animationKey = 0
}: GreetingProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  // Calculate animation durations based on text length
  const countWords = (text: string) => text.replace(/\*\*/g, '').split(' ').filter(w => w.length > 0).length;
  const greetingWordCount = countWords(firstTimeTitle);
  const descriptionWordCount = countWords(firstTimeDescription);
  const greetingDuration = greetingWordCount * 150 + 200;
  const descriptionDuration = descriptionWordCount * 80 + 180;

  // Sequential animation timeline for first-time users
  useEffect(() => {
    if (!isFirstTimeUser) {
      setPhase('complete');
      return;
    }

    // Reset to idle when animationKey changes
    setPhase('idle');

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start with logo
    timers.push(setTimeout(() => setPhase('logo'), 0));

    // Phase 2: Show thinking after logo fades in
    timers.push(setTimeout(() => setPhase('thinking'), LOGO_FADE_DELAY + 300));

    // Phase 3: Show greeting after thinking completes
    const greetingStart = LOGO_FADE_DELAY + 300 + THINKING_DURATION;
    timers.push(setTimeout(() => setPhase('greeting'), greetingStart));

    // Phase 4: Show description AFTER greeting animation completes
    const descriptionStart = greetingStart + greetingDuration + 300;
    timers.push(setTimeout(() => setPhase('description'), descriptionStart));

    // Phase 5: Mark complete
    const completeStart = descriptionStart + descriptionDuration + 400;
    timers.push(setTimeout(() => setPhase('complete'), completeStart));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isFirstTimeUser, greetingDuration, descriptionDuration, animationKey]);

  // Determine visibility based on phase
  const showLogo = phase !== 'idle';
  const showThinking = phase === 'thinking';
  const showGreeting = ['greeting', 'description', 'complete'].includes(phase);
  const showDescription = ['description', 'complete'].includes(phase);
  const isComplete = phase === 'complete';

  // First-time user with animation
  if (isFirstTimeUser) {
    return (
      <div className="flex flex-col gap-3 w-full">
        {/* AI Avatar */}
        <div
          className={cn(
            'transition-opacity duration-500 mb-2',
            showLogo ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#F8F8F8]" style={{ boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)' }}>
            <img
              src="/conciergeIcon.png"
              alt="Goodfin AI"
              className={cn(
                'w-full h-full object-cover',
                isComplete && 'animate-pulse-subtle'
              )}
            />
          </div>
        </div>

        {/* Thinking State */}
        <ThinkingText
          isVisible={showThinking}
          className="min-h-[28px]"
          loadingTexts={[
            'analyzing your profile...',
            'preparing your experience...',
            'personalizing recommendations...',
          ]}
        />

        {/* Greeting Title - Animates after thinking exits */}
        {showGreeting && (
          <div
            className={cn(
              'transition-opacity duration-300',
              showGreeting ? 'opacity-100' : 'opacity-0'
            )}
          >
            <h1 className="text-[20px] text-[#48424a] leading-[30.4px] tracking-[-0.7px] font-serif">
              <AnimatedWordText
                text={firstTimeTitle}
                baseDelay={0}
                wordDelay={150}
                fadeDuration={200}
              />
            </h1>
          </div>
        )}

        {/* Description - Animates AFTER greeting completes */}
        {showDescription && (
          <div
            className={cn(
              'transition-opacity duration-300',
              showDescription ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-[16px] text-[#7f7582] leading-[24px] font-['Soehne',sans-serif]">
              <AnimatedWordText
                text={firstTimeDescription}
                baseDelay={0}
                wordDelay={80}
                fadeDuration={180}
              />
            </p>
          </div>
        )}
      </div>
    );
  }

  // Returning user (no animation)
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Greeting Header with Avatar inline */}
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-[0px_0.833px_2.5px_0px_rgba(0,0,0,0.1),0px_0.833px_1.667px_-0.833px_rgba(0,0,0,0.1)] border border-[#F8F8F8]">
          <img src="/conciergeIcon.png" alt="Goodfin AI" className="w-full h-full object-cover opacity-90" />
        </div>
        <h1 className="text-[20px] text-[#48424a] leading-[30.4px] tracking-[-0.7px] font-serif">
          {title}
        </h1>
      </div>

      {/* Description for returning users */}
      <p className="text-[16px] text-[#7f7582] leading-[24px] font-['Soehne',sans-serif]">
        Your portfolio increased by{' '}
        <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a] font-medium">
          {portfolioGain} ({portfolioPercentage})
        </span>{' '}
        this month, primarily driven by secondary market activity in SpaceX. You have{' '}
        <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a] font-medium">
          {priorityAllocations}
        </span>
        .
      </p>
    </div>
  );
}
