import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import { InsightCard } from '../cards';
import type { CommunityInsight } from '../mockData';

type CommunityTickerSectionProps = {
  insights: CommunityInsight[];
  onInsightClick?: (insight: CommunityInsight) => void;
  onViewAllClick?: () => void;
  className?: string;
};

/**
 * CommunityTickerSection
 *
 * Displays community activity and insights.
 * Shows recent investments, milestones, and discussions.
 */
export function CommunityTickerSection({
  insights,
  onInsightClick,
  onViewAllClick,
  className,
}: CommunityTickerSectionProps) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" style={{ color: colors.grey[600] }} />
          <h3
            style={{
              ...typography.label.md,
              color: colors.grey[950],
              fontWeight: 600,
            }}
          >
            Community Insights
          </h3>
        </div>
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

      {/* Insights List */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.grey[200]}`,
        }}
      >
        {insights.slice(0, 5).map((insight, index) => (
          <div
            key={insight.id}
            style={{
              borderBottom: index !== insights.slice(0, 5).length - 1
                ? `1px solid ${colors.grey[100]}`
                : 'none',
            }}
          >
            <InsightCard
              insight={insight}
              onClick={() => onInsightClick?.(insight)}
            />
          </div>
        ))}
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 mt-3">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: colors.green[500] }}
        />
        <span
          className="text-xs"
          style={{ color: colors.grey[500] }}
        >
          Live updates
        </span>
      </div>
    </div>
  );
}

export default CommunityTickerSection;
