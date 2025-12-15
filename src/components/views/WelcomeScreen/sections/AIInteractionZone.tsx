import React, { useState } from 'react';
import { Sparkles, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';

type AIInteractionZoneProps = {
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
  onSendMessage?: (message: string) => void;
  className?: string;
};

/**
 * AIInteractionZone
 *
 * Displays suggested questions and a mini chat input.
 * Allows users to interact with AI assistant.
 */
export function AIInteractionZone({
  suggestions,
  onSuggestionClick,
  onSendMessage,
  className,
}: AIInteractionZoneProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const visibleSuggestions = isExpanded ? suggestions : suggestions.slice(0, 3);
  const hasMoreSuggestions = suggestions.length > 3;

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick?.(suggestion);
    setInputValue(suggestion);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4" style={{ color: colors.grey[500] }} />
        <span
          className="text-sm"
          style={{
            color: colors.grey[500],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        >
          Ask Goodfin AI
        </span>
      </div>

      {/* Suggestions List */}
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.grey[200]}`,
          boxShadow: 'inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.5)',
        }}
      >
        {visibleSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={cn(
              'w-full text-left px-4 py-3 transition-colors duration-200',
              'hover:bg-gray-50 cursor-pointer'
            )}
            style={{
              borderBottom: index !== visibleSuggestions.length - 1 || hasMoreSuggestions
                ? `1px solid ${colors.grey[200]}`
                : 'none',
            }}
          >
            <span
              className="text-sm"
              style={{
                color: colors.grey[900],
                fontFamily: typography.paragraph.sm.fontFamily,
              }}
            >
              {suggestion}
            </span>
          </button>
        ))}

        {/* Show More/Less Toggle */}
        {hasMoreSuggestions && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-left px-4 py-3 transition-colors duration-200 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" style={{ color: colors.grey[500] }} />
            ) : (
              <ChevronDown className="w-4 h-4" style={{ color: colors.grey[500] }} />
            )}
            <span
              className="text-sm"
              style={{
                color: colors.grey[500],
                fontFamily: typography.paragraph.sm.fontFamily,
              }}
            >
              {isExpanded ? 'Show less' : `Show ${suggestions.length - 3} more...`}
            </span>
          </button>
        )}
      </div>

      {/* Mini Chat Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl"
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.grey[200]}`,
          boxShadow: '0px 2px 8px 0px rgba(164, 140, 160, 0.12)',
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm outline-none"
          style={{
            color: colors.grey[950],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-all',
            inputValue.trim()
              ? 'bg-gray-900 hover:bg-gray-800'
              : 'bg-gray-200 cursor-not-allowed'
          )}
        >
          <Send
            className="w-4 h-4"
            style={{
              color: inputValue.trim() ? colors.white : colors.grey[500],
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default AIInteractionZone;
