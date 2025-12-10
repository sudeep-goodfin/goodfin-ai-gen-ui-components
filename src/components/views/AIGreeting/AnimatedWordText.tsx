import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';

type AnimatedWordProps = {
  text: string;
  delay: number;
  fadeDuration?: number;
  className?: string;
  isBold?: boolean;
};

/**
 * Single animated word component
 * Fades in with staggered delay for natural typing feel
 */
function AnimatedWord({
  text,
  delay,
  fadeDuration = 200,
  className,
  isBold = false,
}: AnimatedWordProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={cn(
        'inline-block transition-opacity',
        isVisible ? 'opacity-100' : 'opacity-0',
        isBold && 'font-semibold',
        className
      )}
      style={{
        transitionDuration: `${fadeDuration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        color: isBold ? 'var(--foreground)' : undefined,
      }}
    >
      {text}&nbsp;
    </span>
  );
}

type AnimatedWordTextProps = {
  /** The text to display word-by-word. Use **text** for bold words. */
  text: string;
  /** Base delay before animation starts (ms) */
  baseDelay?: number;
  /** Delay between each word (ms) */
  wordDelay?: number;
  /** Duration for each word's fade animation (ms) */
  fadeDuration?: number;
  /** Additional className for container */
  className?: string;
  /** Additional className for each word */
  wordClassName?: string;
  /** Callback when all words have been revealed */
  onComplete?: () => void;
};

// Parse word with potential bold markers
type ParsedWord = {
  text: string;
  isBold: boolean;
};

/**
 * Parse text with **bold** markers into word segments
 * Example: "You have **3 new deals** waiting" becomes:
 * [{ text: "You", isBold: false }, { text: "have", isBold: false },
 *  { text: "3", isBold: true }, { text: "new", isBold: true }, { text: "deals", isBold: true },
 *  { text: "waiting", isBold: false }]
 */
function parseTextWithBold(text: string): ParsedWord[] {
  const result: ParsedWord[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text - remove markers and split into words
      const boldText = part.slice(2, -2);
      const words = boldText.split(' ').filter((w) => w.length > 0);
      words.forEach((word) => {
        result.push({ text: word, isBold: true });
      });
    } else {
      // Regular text - split into words
      const words = part.split(' ').filter((w) => w.length > 0);
      words.forEach((word) => {
        result.push({ text: word, isBold: false });
      });
    }
  });

  return result;
}

/**
 * AnimatedWordText Component
 *
 * Renders text word-by-word with staggered fade animations.
 * Each word fades in based on the delay configuration.
 * Supports **bold** markdown syntax for emphasis.
 */
export function AnimatedWordText({
  text,
  baseDelay = 0,
  wordDelay = 150,
  fadeDuration = 200,
  className,
  wordClassName,
  onComplete,
}: AnimatedWordTextProps) {
  const parsedWords = parseTextWithBold(text);

  useEffect(() => {
    if (onComplete && parsedWords.length > 0) {
      const totalDuration = baseDelay + parsedWords.length * wordDelay + fadeDuration;
      const timer = setTimeout(onComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [baseDelay, wordDelay, fadeDuration, parsedWords.length, onComplete]);

  if (!text) return null;

  return (
    <span className={cn('inline', className)}>
      {parsedWords.map((word, index) => (
        <AnimatedWord
          key={`${index}-${word.text}`}
          text={word.text}
          delay={baseDelay + index * wordDelay}
          fadeDuration={fadeDuration}
          className={wordClassName}
          isBold={word.isBold}
        />
      ))}
    </span>
  );
}

export default AnimatedWordText;
