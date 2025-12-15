import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import { DealThumbnailCard } from '../cards';
import type { Deal } from '../mockData';

type FeaturedDealsSectionProps = {
  deals: Deal[];
  onDealClick?: (deal: Deal) => void;
  onViewAllClick?: () => void;
  className?: string;
};

/**
 * FeaturedDealsSection
 *
 * Displays a grid of featured/recommended deals.
 * - 2-column responsive grid
 * - "View All" link
 */
export function FeaturedDealsSection({
  deals,
  onDealClick,
  onViewAllClick,
  className,
}: FeaturedDealsSectionProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{
            ...typography.label.md,
            color: colors.grey[950],
            fontWeight: 600,
          }}
        >
          Featured Deals
        </h3>
        <button
          onClick={onViewAllClick}
          className="flex items-center gap-1 text-sm transition-colors hover:opacity-70"
          style={{
            color: colors.grey[600],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.slice(0, 4).map((deal) => (
          <DealThumbnailCard
            key={deal.id}
            deal={deal}
            onClick={() => onDealClick?.(deal)}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedDealsSection;
