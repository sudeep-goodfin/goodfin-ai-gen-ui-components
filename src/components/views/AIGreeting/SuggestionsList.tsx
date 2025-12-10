import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';

type SuggestionsListProps = {
  /** List of suggestion strings */
  suggestions: string[];
  /** Whether to show the suggestions (for animation timing) */
  isVisible: boolean;
  /** Delay before showing suggestions (ms) */
  showDelay?: number;
  /** Callback when a suggestion is clicked */
  onSuggestionClick?: (suggestion: string) => void;
  /** Additional className */
  className?: string;
};

const DEFAULT_VISIBLE_SUGGESTIONS = 3;

/**
 * SuggestionsList Component
 *
 * Displays a list of actionable suggestions in a card format.
 * Based on WelcomeSection design from goodfin_aws.
 */
export function SuggestionsList({
  suggestions,
  isVisible,
  showDelay = 0,
  onSuggestionClick,
  className,
}: SuggestionsListProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, showDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, showDelay]);

  if (!shouldRender || suggestions.length === 0) return null;

  const visibleSuggestions = isExpanded
    ? suggestions
    : suggestions.slice(0, DEFAULT_VISIBLE_SUGGESTIONS);
  const shouldShowToggle = suggestions.length > DEFAULT_VISIBLE_SUGGESTIONS;

  return (
    <div
      className={cn(
        'space-y-4 transition-opacity duration-300',
        shouldRender ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {/* Suggestions Label */}
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
        <span
          className="text-sm font-primary"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Suggestions for you
        </span>
      </div>

      {/* Suggestions Card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.5)',
        }}
      >
        {visibleSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick?.(suggestion)}
            className={cn(
              'w-full text-left px-4 py-3 transition-colors duration-200',
              'hover:bg-muted/50 cursor-pointer',
              index !== visibleSuggestions.length - 1 && !shouldShowToggle
                ? 'border-b'
                : '',
              index !== visibleSuggestions.length - 1 && shouldShowToggle
                ? 'border-b'
                : ''
            )}
            style={{
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="text-sm font-primary"
              style={{ color: 'var(--foreground)' }}
            >
              {suggestion}
            </span>
          </button>
        ))}

        {/* Show More/Less Toggle */}
        {shouldShowToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-left px-4 py-3 transition-colors duration-200 hover:bg-muted/50 cursor-pointer border-t"
            style={{
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="text-sm font-primary"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {isExpanded ? 'Show less...' : 'Show more...'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SuggestionsList;
