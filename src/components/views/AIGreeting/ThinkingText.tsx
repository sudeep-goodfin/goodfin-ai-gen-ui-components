import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Shimmer } from '../../ui/Shimmer';

// Witty loading texts to shuffle through
const LOADING_TEXTS = [
  'summarizing...',
  'crunching numbers...',
  'reading the charts...',
  'brewing insights...',
  'connecting dots...',
  'analyzing trends...',
];

// Animation timing constants
const TEXT_SHUFFLE_INTERVAL = 800; // Time each text is shown (ms)
const TEXT_SHUFFLE_COUNT = 3; // Number of texts to cycle through
const FADE_DURATION = 150; // Fade in/out duration (ms)

type ThinkingTextProps = {
  /** Whether to show the thinking animation */
  isVisible: boolean;
  /** Callback when thinking phase is complete */
  onComplete?: () => void;
  /** Additional className */
  className?: string;
};

/**
 * ThinkingText Component
 *
 * Shows a "thinking" state with shimmer text animation.
 * Cycles through witty loading texts with fade transitions.
 * Uses Shimmer component with semantic color tokens.
 */
export function ThinkingText({
  isVisible,
  onComplete,
  className,
}: ThinkingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) {
      // Fade out before hiding
      setIsFading(true);
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, FADE_DURATION);
      return () => clearTimeout(hideTimer);
    } else {
      setShouldRender(true);
      setIsFading(false);
    }
  }, [isVisible]);

  // Text shuffle animation
  useEffect(() => {
    if (!isVisible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i < TEXT_SHUFFLE_COUNT; i++) {
      const timer = setTimeout(() => {
        // Fade out
        setIsFading(true);

        // Change text after fade out
        setTimeout(() => {
          setCurrentTextIndex(i % LOADING_TEXTS.length);
          setIsFading(false);
        }, FADE_DURATION);
      }, i * TEXT_SHUFFLE_INTERVAL);

      timers.push(timer);
    }

    // Complete callback after all shuffles
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, TEXT_SHUFFLE_COUNT * TEXT_SHUFFLE_INTERVAL);

    timers.push(completeTimer);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isVisible, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'transition-opacity',
        isFading ? 'opacity-0' : 'opacity-100',
        className
      )}
      style={{
        transitionDuration: `${FADE_DURATION}ms`,
      }}
    >
      <Shimmer
        className="font-heading text-lg"
        duration={1.2}
        spread={3}
        textColor="var(--muted-foreground)"
        shimmerColor="var(--foreground)"
      >
        {LOADING_TEXTS[currentTextIndex]}
      </Shimmer>
    </div>
  );
}

export default ThinkingText;
