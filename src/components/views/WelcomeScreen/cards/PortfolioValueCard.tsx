import React from 'react';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

type PortfolioValueCardProps = {
  totalValue: number;
  percentageChange: number;
  comparisonPeriod?: string;
  onViewAnalysis?: () => void;
  className?: string;
};

/**
 * PortfolioValueCard
 *
 * Card showing total portfolio value with percentage change.
 * Matches Figma design with clean layout and action link.
 */
export function PortfolioValueCard({
  totalValue,
  percentageChange,
  comparisonPeriod = 'vs last month',
  onViewAnalysis,
  className,
}: PortfolioValueCardProps) {
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const isPositive = percentageChange >= 0;

  return (
    <div
      className={cn('rounded-[20px] p-6 flex flex-col', className)}
      style={{
        backgroundColor: colors.white,
        border: '1px solid #E5E7EB',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: colors.grey[500],
          }}
        >
          Total Portfolio Value
        </span>
        <Info className="w-4 h-4" style={{ color: colors.grey[400] }} />
      </div>

      {/* Value */}
      <div
        className="mb-1"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '30px',
          lineHeight: '36px',
          letterSpacing: '0.3955px',
          color: colors.grey[950],
        }}
      >
        {formatCurrency(totalValue)}
      </div>

      {/* Change Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          <TrendingUp
            className="w-3 h-3"
            style={{ color: isPositive ? '#009966' : '#EB0037' }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.1504px',
              color: isPositive ? '#009966' : '#EB0037',
            }}
          >
            {isPositive ? '+' : ''}{percentageChange.toFixed(1)}%
          </span>
        </div>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: '#99A1AF',
          }}
        >
          {comparisonPeriod}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-5">
        {/* View Analysis Link */}
        <button
          onClick={onViewAnalysis}
          className="flex items-center justify-between w-full group"
        >
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
            View Analysis
          </span>
          <ArrowUpRight
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: colors.grey[600] }}
          />
        </button>
      </div>
    </div>
  );
}

export default PortfolioValueCard;
