import React from 'react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

type PremiumMemberCardProps = {
  message: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
};

/**
 * PremiumMemberCard
 *
 * Dark card highlighting premium member status and priority actions.
 * Matches Figma design with dark background and glow effect.
 */
export function PremiumMemberCard({
  message,
  ctaText = 'Review Allocations',
  onCtaClick,
  className,
}: PremiumMemberCardProps) {
  return (
    <div
      className={cn('relative rounded-[20px] p-6 overflow-hidden flex flex-col', className)}
      style={{
        backgroundColor: colors.grey[950],
        border: `1px solid ${colors.grey[950]}`,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Glow Effect */}
      <div
        className="absolute -top-4 right-[-20px] w-24 h-24 rounded-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(24px)',
        }}
      />

      {/* Header */}
      <span
        className="mb-4"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.1504px',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        Premium Member
      </span>

      {/* Message */}
      <p
        className="mb-6 flex-1"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '18px',
          lineHeight: '28px',
          letterSpacing: '-0.4395px',
          color: colors.white,
          maxWidth: '375px',
        }}
      >
        {message}
      </p>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className="w-full py-2 rounded-lg text-center transition-colors hover:bg-white/20"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: colors.white,
          }}
        >
          {ctaText}
        </span>
      </button>
    </div>
  );
}

export default PremiumMemberCard;
