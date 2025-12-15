import React, { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

type ChartDataPoint = {
  month: string;
  value: number;
};

type PortfolioChartSectionProps = {
  totalValue: number;
  percentageChange: number;
  amountInvested: number;
  returns: number;
  lastUpdated: string;
  chartData: ChartDataPoint[];
  onViewAllDeals?: () => void;
  className?: string;
};

type TimePeriod = '1D' | '1W' | '1M' | '1Y';

/**
 * PortfolioChartSection
 *
 * Section showing portfolio summary with value, change indicator,
 * stats, and a line chart with time period selector.
 * Matches Figma design.
 */
export function PortfolioChartSection({
  totalValue,
  percentageChange,
  amountInvested,
  returns,
  lastUpdated,
  chartData,
  onViewAllDeals,
  className,
}: PortfolioChartSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1D');

  const periods: TimePeriod[] = ['1D', '1W', '1M', '1Y'];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const isPositive = percentageChange >= 0;

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
          Your Portfolio
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

      {/* Portfolio Card */}
      <div
        className="rounded-lg p-[18px]"
        style={{
          backgroundColor: colors.white,
        }}
      >
        {/* Title Row */}
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: colors.grey[500],
            }}
          >
            Portfolio Summary
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '16px',
              color: colors.grey[500],
            }}
          >
            Last Updated {lastUpdated}
          </span>
        </div>

        {/* Value and Change */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '21.47px',
                lineHeight: '30px',
                color: colors.grey[500],
              }}
            >
              $
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '28px',
                lineHeight: '36px',
                color: colors.grey[800],
              }}
            >
              {formatCurrency(totalValue)}
            </span>
            <div className="flex items-center gap-1 pt-1.5">
              <TrendingUp
                className="w-4 h-4"
                style={{ color: isPositive ? colors.green[700] : colors.red[600] }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: isPositive ? colors.green[700] : colors.red[600],
                }}
              >
                {isPositive ? '+' : ''}{percentageChange}%
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: colors.grey[800],
                }}
              >
                Amount Invested
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: colors.grey[800],
                }}
              >
                ${formatCurrency(amountInvested)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: colors.grey[800],
                }}
              >
                Returns
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: colors.grey[800],
                }}
              >
                ${formatCurrency(returns)}
              </span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-[140px] mb-4">
          {/* Simple SVG chart representation */}
          <svg
            className="w-full h-full"
            viewBox="0 0 861 118"
            preserveAspectRatio="none"
          >
            {/* Gradient fill */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 176, 119, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 176, 119, 0)" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path
              d="M0 80 Q100 60, 200 70 T400 50 T600 40 T800 20 L861 20 L861 118 L0 118 Z"
              fill="url(#chartGradient)"
            />
            {/* Line */}
            <path
              d="M0 80 Q100 60, 200 70 T400 50 T600 40 T800 20"
              fill="none"
              stroke="#FFB077"
              strokeWidth="2"
            />
            {/* Current point marker */}
            <circle cx="740" cy="20" r="5" fill={colors.grey[500]} />
            <circle cx="740" cy="20" r="8" fill="none" stroke={colors.grey[300]} strokeWidth="1" />
          </svg>

          {/* Vertical line at current point */}
          <div
            className="absolute right-[121px] top-0 h-[94px] w-px"
            style={{ backgroundColor: colors.grey[300] }}
          />

          {/* Value tooltip */}
          <div
            className="absolute right-[92px] top-[-25px] px-1 py-0.5 rounded"
            style={{
              backgroundColor: colors.white,
              border: `0.5px solid ${colors.grey[100]}`,
              boxShadow: '0px 1px 3px 0px rgba(25, 33, 61, 0.1)',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '1.3',
                color: '#19213D',
              }}
            >
              $000.00
            </span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {chartData.map((point, index) => (
              <span
                key={index}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: colors.grey[800],
                  textAlign: 'center',
                }}
              >
                {point.month}
              </span>
            ))}
          </div>
        </div>

        {/* Time Period Selector */}
        <div
          className="flex items-center justify-center gap-3 px-1 py-1 rounded mx-auto w-fit"
          style={{
            border: `1px solid ${colors.grey[100]}`,
          }}
        >
          {periods.map((period, index) => (
            <React.Fragment key={period}>
              <button
                onClick={() => setSelectedPeriod(period)}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  backgroundColor: selectedPeriod === period ? colors.grey[200] : 'transparent',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: selectedPeriod === period ? 500 : 300,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: selectedPeriod === period ? colors.grey[900] : colors.grey[800],
                    textAlign: 'center',
                  }}
                >
                  {period}
                </span>
              </button>
              {index < periods.length - 1 && (
                <div
                  className="w-px h-[9px]"
                  style={{ backgroundColor: colors.grey[300] }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioChartSection;
