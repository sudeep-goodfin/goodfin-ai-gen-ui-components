import React, { useState } from 'react';
import { Sparkles, ArrowRight, Mic, Globe } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';

type Suggestion = {
  text: string;
  onClick?: () => void;
};

type HeroSectionProps = {
  greeting: {
    headline: string;
    subheadline: string;
  };
  suggestions: Suggestion[];
  onSuggestionClick?: (text: string) => void;
  onSendMessage?: (message: string) => void;
  className?: string;
};

/**
 * HeroSection
 *
 * Main hero section with gradient background, AI greeting,
 * suggestion list, and chat input matching the Figma design.
 */
export function HeroSection({
  greeting,
  suggestions,
  onSuggestionClick,
  onSendMessage,
  className,
}: HeroSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const visibleSuggestions = showAllSuggestions ? suggestions : suggestions.slice(0, 3);

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

  // SVG background encoded as data URI
  const backgroundSvg = `url("data:image/svg+xml,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_46_10003)'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial_46_10003)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_46_10003' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_46_10003'%3E%3Crect width='1440' height='981' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`;

  return (
    <div
      className={cn('relative rounded-[32px] overflow-hidden', className)}
      style={{
        backgroundColor: '#F0EEF0',
      }}
    >
      {/* SVG gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundSvg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative p-8">
        {/* AI Avatar and Greeting */}
        <div className="flex flex-col gap-6 mb-8">
          {/* AI Avatar */}
          <div
            className="w-12 h-12 rounded-full overflow-hidden"
            style={{
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
              border: '1px solid #F8F8F8',
            }}
          >
            <img
              src="/conciergeIcon.png"
              alt="Goodfin AI"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Greeting Text */}
          <div className="flex flex-col gap-1.5">
            <h1
              style={{
                fontFamily: '"Test Signifier", serif',
                fontSize: '28px',
                lineHeight: '33.6px',
                letterSpacing: '-0.7px',
                color: colors.grey[800],
              }}
            >
              {greeting.headline}
            </h1>
            <p
              style={{
                fontFamily: '"Test Signifier", "Noto Sans", sans-serif',
                fontSize: '20px',
                lineHeight: '28px',
                color: colors.grey[800],
                maxWidth: '794px',
              }}
            >
              {greeting.subheadline}
            </p>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mb-6">
          {/* Suggestions Header */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: colors.grey[800], opacity: 0.7 }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-0.3125px',
                color: colors.grey[800],
              }}
            >
              Suggestions for you
            </span>
          </div>

          {/* Suggestions List */}
          <div
            className="rounded-xl overflow-hidden max-w-[768px]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid #F0EEF0',
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
            }}
          >
            {visibleSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion.text)}
                className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/50"
                style={{
                  borderBottom: index !== visibleSuggestions.length - 1 ? '1px solid #F0EEF0' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-0.3125px',
                    color: colors.grey[800],
                  }}
                >
                  {suggestion.text}
                </span>
                <ArrowRight className="w-4 h-4" style={{ color: colors.grey[500] }} />
              </button>
            ))}

            {/* Show More */}
            {suggestions.length > 3 && (
              <button
                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-white/50"
                style={{
                  borderTop: '1px solid #F0EEF0',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-0.3125px',
                    color: colors.grey[800],
                  }}
                >
                  {showAllSuggestions ? 'Show less' : 'Show more...'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div
          className="rounded-2xl p-4"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
            maxWidth: '1288px',
          }}
        >
          {/* Text Area */}
          <div className="mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Start typing or hit V on your keyboard to speak..."
              className="w-full bg-transparent outline-none"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-0.3125px',
                color: colors.grey[950],
              }}
            />
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            {/* Deep Research Analyst Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: colors.white,
                border: '1px solid #F3F4F6',
                boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
              }}
            >
              <Globe className="w-5 h-5" style={{ color: colors.grey[800] }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.1504px',
                  color: colors.grey[950],
                }}
              >
                Deep Research Analyst
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Attach Button (hidden for now) */}
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 9.16667L10.4167 16.25C9.5 17.1667 8.33333 17.5 7.08333 17.5C5.83333 17.5 4.58333 17.0833 3.75 16.25C2.91667 15.4167 2.5 14.1667 2.5 13.3333C2.5 12.0833 2.91667 10.9167 3.75 10.0833L10.8333 3C11.5 2.33333 12.5 2.08333 13.3333 2.08333C14.1667 2.08333 15.0833 2.41667 15.8333 3.16667C16.5833 3.91667 16.9167 4.75 16.9167 5.66667C16.9167 6.5 16.5833 7.5 15.9167 8.16667L8.75 15.3333C8.33333 15.75 7.91667 15.9167 7.5 15.9167C7.08333 15.9167 6.58333 15.6667 6.25 15.3333C5.91667 15 5.66667 14.5 5.66667 14.0833C5.66667 13.6667 5.83333 13.25 6.25 12.8333L12.5 6.58333" stroke="#48424A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Voice Button */}
              <button
                className="w-9 h-9 flex items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(229, 220, 227, 0.5)',
                }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-[3px] h-[5px] rounded-full" style={{ backgroundColor: colors.grey[800] }} />
                  <div className="w-[3px] h-[11px] rounded-full" style={{ backgroundColor: colors.grey[800] }} />
                  <div className="w-[3px] h-[8px] rounded-full" style={{ backgroundColor: colors.grey[800] }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
