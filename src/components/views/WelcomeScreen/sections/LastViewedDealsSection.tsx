import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';
import { ResumeInvestingCard } from '../cards/ResumeInvestingCard';
import { DealCard } from '../cards/DealCard';
import { DealCardData } from '../mockData';

type LastViewedDealsSectionProps = {
  resumeDeal: {
    name: string;
    description: string;
    imageUrl?: string;
    lastViewedAt?: string;
  };
  deals: DealCardData[];
  onResumeDeal?: () => void;
  onViewAllDeals?: () => void;
  onDealClick?: (dealId: string) => void;
  onAskAI?: (dealId: string) => void;
  className?: string;
};

/**
 * LastViewedDealsSection
 *
 * Section showing the resume card at top and a grid of deal cards below.
 * Matches Figma design with "Last Viewed Deals" header and "View all deals" link.
 */
export function LastViewedDealsSection({
  resumeDeal,
  deals,
  onResumeDeal,
  onViewAllDeals,
  onDealClick,
  onAskAI,
  className,
}: LastViewedDealsSectionProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2
          style={{
            fontFamily: '"Tinos", serif',
            fontSize: '20px',
            lineHeight: '30px',
            color: colors.grey[950],
          }}
        >
          Last Viewed Deals
        </h2>
        <button
          onClick={onViewAllDeals}
          className="flex items-center gap-1 transition-opacity hover:opacity-70"
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.1504px',
              color: colors.grey[500],
              textAlign: 'center',
            }}
          >
            View all deals
          </span>
          <ArrowRight className="w-4 h-4" style={{ color: colors.grey[500] }} />
        </button>
      </div>

      {/* Resume Card */}
      <ResumeInvestingCard
        deal={resumeDeal}
        onResume={onResumeDeal}
      />

      {/* Deal Cards Horizontal Scroll */}
      <div className="pt-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={() => onDealClick?.(deal.id)}
              onAskAI={() => onAskAI?.(deal.id)}
              className="w-[320px] min-w-[320px] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastViewedDealsSection;
