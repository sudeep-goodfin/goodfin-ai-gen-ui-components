import React from 'react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import type { GreetingData } from '../mockData';

type GreetingSectionProps = {
  greeting: GreetingData;
  className?: string;
};

/**
 * GreetingSection
 *
 * Displays personalized greeting with AI avatar.
 * Features:
 * - AI avatar with pulse animation
 * - Time-based greeting headline
 * - Personalized subheadline with markdown bold support
 */
export function GreetingSection({ greeting, className }: GreetingSectionProps) {
  // Parse markdown bold (**text**) in subheadline
  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} style={{ color: colors.grey[950], fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {/* AI Avatar */}
      <div className="mb-6">
        <img
          src="/conciergeIcon.png"
          alt="Goodfin AI"
          className="w-12 h-12 rounded-full animate-pulse-subtle"
          style={{
            boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
            border: '1px solid #F8F8F8',
          }}
        />
      </div>

      {/* Greeting Headline */}
      <h1
        className="mb-3"
        style={{
          fontFamily: typography.heading.lg.fontFamily,
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.grey[950],
        }}
      >
        {greeting.headline}
      </h1>

      {/* Subheadline */}
      <p
        style={{
          ...typography.paragraph.md,
          color: colors.grey[600],
          lineHeight: 1.6,
          maxWidth: '600px',
        }}
      >
        {renderWithBold(greeting.subheadline)}
      </p>
    </div>
  );
}

export default GreetingSection;
