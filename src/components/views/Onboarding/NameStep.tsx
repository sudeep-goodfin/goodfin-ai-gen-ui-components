import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';
import { AnimatedWordText } from '../AIGreeting/AnimatedWordText';
import { ThinkingText } from '../AIGreeting/ThinkingText';

// Animation timing constants
const LOGO_FADE_DELAY = 200;
const THINKING_DURATION = 2400;

// Onboarding-specific loading texts
const ONBOARDING_LOADING_TEXTS = [
  'preparing your experience...',
  'setting things up...',
  'getting ready...',
];

// Animation phases
type AnimationPhase =
  | 'idle'
  | 'logo'
  | 'thinking'
  | 'greeting'
  | 'description'
  | 'followup'
  | 'input'
  | 'complete';

type NameStepProps = {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
  }) => void;
  isLoading?: boolean;
};

/**
 * NameStep Component
 *
 * Conversational onboarding step that asks for name.
 * Shows first name first, then reveals last name after first name is entered.
 */
export function NameStep({ onSubmit, isLoading = false }: NameStepProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showLastName, setShowLastName] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  // Content - Goodfin context
  const greetingText = "Hello, I'm Goodfin.";
  const descriptionText = "I'm your intelligent private market assistant, here to help you discover and access exclusive private market opportunities.";
  const followupText = "I'd love for us to get to know each other a bit better.";

  // Calculate animation durations
  const countWords = (text: string) => text.replace(/\*\*/g, '').split(' ').filter(w => w.length > 0).length;
  const greetingWordCount = countWords(greetingText);
  const descriptionWordCount = countWords(descriptionText);
  const followupWordCount = countWords(followupText);

  const greetingDuration = greetingWordCount * 150 + 200;
  const descriptionDuration = descriptionWordCount * 80 + 200;
  const followupDuration = followupWordCount * 100 + 200;

  // Sequential animation timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start with logo
    timers.push(setTimeout(() => setPhase('logo'), 0));

    // Phase 2: Show thinking after logo fades in
    timers.push(setTimeout(() => setPhase('thinking'), LOGO_FADE_DELAY + 300));

    // Phase 3: Show greeting after thinking completes
    const greetingStart = LOGO_FADE_DELAY + 300 + THINKING_DURATION;
    timers.push(setTimeout(() => setPhase('greeting'), greetingStart));

    // Phase 4: Show description AFTER greeting animation completes
    const descriptionStart = greetingStart + greetingDuration + 200;
    timers.push(setTimeout(() => setPhase('description'), descriptionStart));

    // Phase 5: Show followup AFTER description animation completes
    const followupStart = descriptionStart + descriptionDuration + 200;
    timers.push(setTimeout(() => setPhase('followup'), followupStart));

    // Phase 6: Show input AFTER followup animation completes
    const inputStart = followupStart + followupDuration + 300;
    timers.push(setTimeout(() => setPhase('input'), inputStart));

    // Phase 7: Mark complete
    const completeStart = inputStart + 500;
    timers.push(setTimeout(() => setPhase('complete'), completeStart));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [greetingDuration, descriptionDuration, followupDuration]);

  // Focus input when input phase starts
  useEffect(() => {
    if (phase === 'input' && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [phase]);

  // Handle first name blur - show last name field
  const handleFirstNameBlur = () => {
    if (firstName.trim().length >= 1 && !showLastName) {
      setShowLastName(true);
      // Focus last name input after a short delay for animation
      setTimeout(() => {
        lastNameRef.current?.focus();
      }, 300);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm) {
      onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
    }
  };

  // Determine visibility based on phase
  const showLogo = phase !== 'idle';
  const showThinking = phase === 'thinking';
  const showGreeting = ['greeting', 'description', 'followup', 'input', 'complete'].includes(phase);
  const showDescription = ['description', 'followup', 'input', 'complete'].includes(phase);
  const showFollowup = ['followup', 'input', 'complete'].includes(phase);
  const showInput = ['input', 'complete'].includes(phase);
  const isComplete = phase === 'complete';

  const isValidForm = firstName.trim().length >= 2 && lastName.trim().length >= 1;

  return (
    <div className="w-full max-w-[480px] flex flex-col">
      {/* AI Avatar */}
      <div
        className={cn(
          'transition-opacity duration-500 mb-8',
          showLogo ? 'opacity-100' : 'opacity-0'
        )}
      >
        <img
          src="/conciergeIcon.png"
          alt="Goodfin AI"
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

      {/* Thinking State */}
      <ThinkingText
        isVisible={showThinking}
        className="min-h-[28px] mb-6"
        loadingTexts={ONBOARDING_LOADING_TEXTS}
      />

      {/* Greeting Text - "Hello, I'm Goodfin." */}
      {showGreeting && (
        <div
          className={cn(
            'text-left transition-opacity duration-300 mb-4',
            showGreeting ? 'opacity-100' : 'opacity-0'
          )}
        >
          <h1
            style={{
              fontFamily: typography.heading.md.fontFamily,
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.grey[950],
            }}
          >
            <AnimatedWordText
              text={greetingText}
              baseDelay={0}
              wordDelay={150}
              fadeDuration={200}
            />
          </h1>
        </div>
      )}

      {/* Description Text */}
      {showDescription && (
        <div
          className={cn(
            'text-left transition-opacity duration-300 mb-3',
            showDescription ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p
            style={{
              ...typography.paragraph.md,
              color: colors.grey[800],
              lineHeight: 1.6,
            }}
          >
            <AnimatedWordText
              text={descriptionText}
              baseDelay={0}
              wordDelay={80}
              fadeDuration={150}
            />
          </p>
        </div>
      )}

      {/* Follow-up Text */}
      {showFollowup && (
        <div
          className={cn(
            'text-left transition-opacity duration-300 mb-8',
            showFollowup ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p
            style={{
              ...typography.paragraph.md,
              color: colors.grey[800],
              lineHeight: 1.6,
            }}
          >
            <AnimatedWordText
              text={followupText}
              baseDelay={0}
              wordDelay={100}
              fadeDuration={180}
            />
          </p>
        </div>
      )}

      {/* Input Section */}
      {showInput && (
        <form
          onSubmit={handleSubmit}
          className={cn(
            'w-full transition-opacity duration-300',
            showInput ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* First Name Input */}
          <div
            className="w-full rounded-xl transition-all duration-200 mb-4"
            style={{
              backgroundColor: 'rgba(247, 247, 248, 0.70)',
              border: '1px solid #F5F4F6',
              padding: '12px 16px',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: colors.grey[600],
                fontFamily: typography.paragraph.sm.fontFamily,
                marginBottom: '2px',
              }}
            >
              Nice to meet you, I'm...
            </label>
            <input
              ref={firstNameRef}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleFirstNameBlur}
              placeholder="Enter your first name"
              autoComplete="given-name"
              disabled={isLoading}
              className="w-full outline-none bg-transparent"
              style={{
                border: 'none',
                fontSize: '16px',
                color: colors.grey[950],
                fontFamily: typography.paragraph.md.fontFamily,
                fontWeight: 400,
              }}
            />
          </div>

          {/* Last Name Input - Appears after first name is entered */}
          <div
            className={cn(
              'w-full rounded-xl transition-all duration-300 mb-6 overflow-hidden',
              showLastName ? 'opacity-100 max-h-[100px]' : 'opacity-0 max-h-0'
            )}
            style={{
              backgroundColor: 'rgba(247, 247, 248, 0.70)',
              border: showLastName ? '1px solid #F5F4F6' : 'none',
              padding: showLastName ? '12px 16px' : '0 16px',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: colors.grey[600],
                fontFamily: typography.paragraph.sm.fontFamily,
                marginBottom: '2px',
              }}
            >
              Last name
            </label>
            <input
              ref={lastNameRef}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              autoComplete="family-name"
              disabled={isLoading}
              className="w-full outline-none bg-transparent"
              style={{
                border: 'none',
                fontSize: '16px',
                color: colors.grey[950],
                fontFamily: typography.paragraph.md.fontFamily,
                fontWeight: 400,
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValidForm || isLoading}
            className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
            style={{
              ...(isValidForm ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
              color: '#F4F3F5',
              cursor: isValidForm && !isLoading ? 'pointer' : 'not-allowed',
              ...typography.label.md,
            }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Continue'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default NameStep;
