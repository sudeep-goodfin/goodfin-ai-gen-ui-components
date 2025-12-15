import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';

type PortfolioMetricCardProps = {
  label: string;
  value: string;
  change?: number; // percentage change (can be positive, negative, or undefined)
  icon?: React.ReactNode;
  className?: string;
};

/**
 * PortfolioMetricCard
 *
 * Displays a single portfolio metric with optional change indicator.
 * Used in the Portfolio Summary section.
 */
export function PortfolioMetricCard({
  label,
  value,
  change,
  icon,
  className,
}: PortfolioMetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  const changeColor = isPositive
    ? colors.green[600]
    : isNegative
    ? colors.red[600]
    : colors.grey[500];

  const ChangeIcon = isPositive
    ? TrendingUp
    : isNegative
    ? TrendingDown
    : Minus;

  return (
    <div
      className={cn(
        'flex flex-col p-4 rounded-xl',
        className
      )}
      style={{
        backgroundColor: 'rgba(247, 247, 248, 0.70)',
        border: '1px solid #F5F4F6',
      }}
    >
      {/* Label */}
      <span
        className="text-xs mb-1"
        style={{
          color: colors.grey[500],
          fontFamily: typography.paragraph.xs.fontFamily,
        }}
      >
        {label}
      </span>

      {/* Value */}
      <div className="flex items-center gap-2">
        {icon && (
          <span style={{ color: colors.grey[600] }}>
            {icon}
          </span>
        )}
        <span
          className="text-xl font-bold"
          style={{
            color: colors.grey[950],
            fontFamily: typography.heading.md.fontFamily,
          }}
        >
          {value}
        </span>
      </div>

      {/* Change Indicator */}
      {change !== undefined && (
        <div
          className="flex items-center gap-1 mt-2"
          style={{ color: changeColor }}
        >
          <ChangeIcon className="w-3 h-3" />
          <span className="text-xs font-medium">
            {isPositive && '+'}
            {change.toFixed(1)}%
          </span>
          {!isNeutral && (
            <span
              className="text-xs"
              style={{ color: colors.grey[500] }}
            >
              this quarter
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default PortfolioMetricCard;
