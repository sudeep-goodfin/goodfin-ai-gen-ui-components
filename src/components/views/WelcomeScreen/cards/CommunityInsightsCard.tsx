import React from 'react';
import { Users, Flame, TrendingUp } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

type Insight = {
  id: string;
  title: string;
  subtitle: string;
  type: 'hot-topic' | 'moving-fast';
};

type CommunityInsightsCardProps = {
  insights: Insight[];
  className?: string;
};

/**
 * CommunityInsightsCard
 *
 * Card showing community insights with hot topics and trending items.
 * Matches Figma design with colored badges.
 */
export function CommunityInsightsCard({
  insights,
  className,
}: CommunityInsightsCardProps) {
  return (
    <div
      className={cn('rounded-[20px] p-5 flex flex-col gap-4 flex-1', className)}
      style={{
        backgroundColor: colors.white,
        border: '1px solid #E5E7EB',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4" style={{ color: colors.grey[600] }} />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: colors.grey[950],
          }}
        >
          Community Insights
        </span>
      </div>

      {/* Insights List */}
      <div className="flex flex-col gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-3 rounded-[14px] flex flex-col gap-2"
            style={{
              backgroundColor: '#F9FAFB',
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-1.5">
              {insight.type === 'hot-topic' ? (
                <>
                  <Flame className="w-3 h-3" style={{ color: '#155DFC' }} />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#155DFC',
                    }}
                  >
                    Hot Topic
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-3 h-3" style={{ color: '#009966' }} />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#009966',
                    }}
                  >
                    Moving Fast
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.1504px',
                color: colors.grey[950],
              }}
            >
              {insight.title}
            </span>

            {/* Subtitle */}
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: colors.grey[500],
              }}
            >
              {insight.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityInsightsCard;
