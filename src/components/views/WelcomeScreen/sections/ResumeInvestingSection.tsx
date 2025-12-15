import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import { DealThumbnailCard } from '../cards';
import type { RecentDeal } from '../mockData';

type ResumeInvestingSectionProps = {
  deals: RecentDeal[];
  onDealClick?: (deal: RecentDeal) => void;
  onSeeAllClick?: () => void;
  className?: string;
};

/**
 * ResumeInvestingSection
 *
 * Horizontal scrolling section showing recently viewed deals.
 * Shows progress indicator for partially completed investments.
 */
export function ResumeInvestingSection({
  deals,
  onDealClick,
  onSeeAllClick,
  className,
}: ResumeInvestingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h3
            style={{
              ...typography.label.md,
              color: colors.grey[950],
              fontWeight: 600,
            }}
          >
            Resume Investing
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: colors.grey[500] }}
          >
            Continue where you left off
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Scroll Controls */}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{
              backgroundColor: 'rgba(247, 247, 248, 0.70)',
              border: `1px solid ${colors.grey[200]}`,
            }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: colors.grey[600] }} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{
              backgroundColor: 'rgba(247, 247, 248, 0.70)',
              border: `1px solid ${colors.grey[200]}`,
            }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: colors.grey[600] }} />
          </button>
          {/* See All */}
          <button
            onClick={onSeeAllClick}
            className="flex items-center gap-1 text-sm transition-colors hover:opacity-70 ml-2"
            style={{
              color: colors.grey[600],
              fontFamily: typography.paragraph.sm.fontFamily,
            }}
          >
            See All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .resume-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {deals.map((deal) => (
          <DealThumbnailCard
            key={deal.id}
            deal={deal}
            onClick={() => onDealClick?.(deal)}
            showProgress
            progress={deal.progress}
          />
        ))}
      </div>
    </div>
  );
}

export default ResumeInvestingSection;
