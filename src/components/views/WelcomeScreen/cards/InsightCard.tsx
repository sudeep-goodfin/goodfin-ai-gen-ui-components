import React from 'react';
import { TrendingUp, Users, Trophy, Newspaper } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import type { CommunityInsight, InsightCategory } from '../mockData';

type InsightCardProps = {
  insight: CommunityInsight;
  onClick?: () => void;
  className?: string;
};

const categoryConfig: Record<InsightCategory, { icon: typeof TrendingUp; color: string; bgColor: string }> = {
  'investment': {
    icon: TrendingUp,
    color: colors.green[600],
    bgColor: colors.green[100],
  },
  'milestone': {
    icon: Trophy,
    color: colors.yellow[600],
    bgColor: colors.yellow[100],
  },
  'community': {
    icon: Users,
    color: colors.blue[600],
    bgColor: colors.blue[100],
  },
  'news': {
    icon: Newspaper,
    color: colors.grey[700],
    bgColor: colors.grey[200],
  },
};

/**
 * InsightCard
 *
 * Displays a community insight or news item.
 * Used in the Community Ticker section.
 */
export function InsightCard({ insight, onClick, className }: InsightCardProps) {
  const config = categoryConfig[insight.category];
  const Icon = config.icon;

  // Format relative time
  const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg transition-all duration-200',
        'hover:bg-gray-50 cursor-pointer',
        className
      )}
      style={{
        backgroundColor: 'transparent',
      }}
      onClick={onClick}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: config.bgColor,
        }}
      >
        <Icon
          className="w-4 h-4"
          style={{ color: config.color }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-snug"
          style={{
            color: colors.grey[800],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        >
          {insight.text}
        </p>
        <span
          className="text-xs mt-1 block"
          style={{ color: colors.grey[500] }}
        >
          {getRelativeTime(insight.timestamp)}
        </span>
      </div>
    </div>
  );
}

export default InsightCard;
