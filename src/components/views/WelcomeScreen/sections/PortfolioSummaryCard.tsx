import React from 'react';
import { Wallet, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import { PortfolioMetricCard } from '../cards';
import type { PortfolioData } from '../mockData';

type PortfolioSummaryCardProps = {
  portfolio: PortfolioData;
  onViewDetails?: () => void;
  onDownloadTaxDocs?: () => void;
  className?: string;
};

/**
 * PortfolioSummaryCard
 *
 * Displays portfolio overview with key metrics and action buttons.
 */
export function PortfolioSummaryCard({
  portfolio,
  onViewDetails,
  onDownloadTaxDocs,
  className,
}: PortfolioSummaryCardProps) {
  // Format currency
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div
      className={cn(
        'flex flex-col p-6 rounded-2xl',
        className
      )}
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.grey[200]}`,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.grey[100] }}
          >
            <Wallet className="w-5 h-5" style={{ color: colors.grey[700] }} />
          </div>
          <h3
            style={{
              ...typography.label.md,
              color: colors.grey[950],
              fontWeight: 600,
            }}
          >
            Your Portfolio
          </h3>
        </div>
        <button
          onClick={onViewDetails}
          className="flex items-center gap-1 text-sm transition-colors hover:opacity-70"
          style={{
            color: colors.grey[600],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <PortfolioMetricCard
          label="Total Invested"
          value={formatCurrency(portfolio.totalInvested)}
        />
        <PortfolioMetricCard
          label="Current Value"
          value={formatCurrency(portfolio.totalValue)}
          change={portfolio.percentageChange}
        />
        <PortfolioMetricCard
          label="Investments"
          value={portfolio.numberOfInvestments.toString()}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onViewDetails}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{
            backgroundColor: colors.grey[900],
            color: colors.white,
          }}
        >
          View Portfolio
        </button>
        <button
          onClick={onDownloadTaxDocs}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:bg-gray-100"
          style={{
            backgroundColor: 'transparent',
            color: colors.grey[700],
            border: `1px solid ${colors.grey[300]}`,
          }}
        >
          <FileText className="w-4 h-4" />
          Tax Documents
        </button>
      </div>
    </div>
  );
}

export default PortfolioSummaryCard;
