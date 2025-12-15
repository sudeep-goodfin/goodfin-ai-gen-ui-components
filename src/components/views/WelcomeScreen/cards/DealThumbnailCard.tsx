import React from 'react';
import { TrendingUp, Clock, Sparkles } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import type { Deal, DealStatus } from '../mockData';

type DealThumbnailCardProps = {
  deal: Deal;
  onClick?: () => void;
  showProgress?: boolean;
  progress?: number;
  className?: string;
};

const statusConfig: Record<DealStatus, { label: string; bgColor: string; textColor: string }> = {
  'live': {
    label: 'LIVE',
    bgColor: colors.green[100],
    textColor: colors.green[700],
  },
  'closing-soon': {
    label: 'CLOSING SOON',
    bgColor: colors.yellow[100],
    textColor: colors.yellow[700],
  },
  'coming-soon': {
    label: 'COMING SOON',
    bgColor: colors.blue[100],
    textColor: colors.blue[700],
  },
};

// Category-based icon backgrounds
const categoryColors: Record<string, { from: string; to: string }> = {
  'Aerospace': { from: '#1E3A8A', to: '#3B82F6' },
  'Enterprise Software': { from: '#7C3AED', to: '#A78BFA' },
  'Fintech': { from: '#059669', to: '#34D399' },
  'AI/ML': { from: '#DC2626', to: '#F87171' },
  'Social': { from: '#7C3AED', to: '#EC4899' },
  'default': { from: colors.grey[700], to: colors.grey[500] },
};

/**
 * DealThumbnailCard
 *
 * Compact deal card for horizontal scrolling sections.
 * Shows company logo, name, price, and status badge.
 */
export function DealThumbnailCard({
  deal,
  onClick,
  showProgress,
  progress,
  className,
}: DealThumbnailCardProps) {
  const status = statusConfig[deal.status];
  const categoryColor = categoryColors[deal.category] || categoryColors['default'];

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col p-4 rounded-xl transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        'border border-transparent hover:border-gray-200',
        'text-left w-[180px] flex-shrink-0',
        className
      )}
      style={{
        backgroundColor: colors.white,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Logo & Badge Row */}
      <div className="flex items-start justify-between mb-3">
        {/* Company Logo/Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${categoryColor.from} 0%, ${categoryColor.to} 100%)`,
          }}
        >
          <span className="text-white font-bold text-sm">
            {deal.name.charAt(0)}
          </span>
        </div>

        {/* Status Badge */}
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{
            backgroundColor: status.bgColor,
            color: status.textColor,
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Company Name */}
      <h4
        className="font-semibold mb-1 truncate"
        style={{
          ...typography.label.sm,
          color: colors.grey[950],
        }}
      >
        {deal.name}
      </h4>

      {/* Description */}
      <p
        className="text-xs mb-3 line-clamp-2"
        style={{
          color: colors.grey[500],
          lineHeight: 1.4,
        }}
      >
        {deal.description}
      </p>

      {/* Price & Valuation */}
      <div className="mt-auto space-y-1">
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{ color: colors.grey[500] }}
          >
            Price
          </span>
          <span
            className="font-semibold text-sm"
            style={{ color: colors.grey[950] }}
          >
            ${deal.pricePerShare}/sh
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{ color: colors.grey[500] }}
          >
            Val.
          </span>
          <span
            className="text-xs"
            style={{ color: colors.grey[600] }}
          >
            {deal.valuation}
          </span>
        </div>
      </div>

      {/* Progress Bar (for resume investing) */}
      {showProgress && progress !== undefined && (
        <div className="mt-3">
          <div
            className="h-1 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: colors.grey[200] }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: colors.green[500],
              }}
            />
          </div>
          <span
            className="text-[10px] mt-1 block"
            style={{ color: colors.grey[500] }}
          >
            {progress}% complete
          </span>
        </div>
      )}

      {/* New/Featured Indicator */}
      {(deal.isNew || deal.isFeatured) && (
        <div className="flex items-center gap-1 mt-2">
          {deal.isNew && (
            <span
              className="flex items-center gap-0.5 text-[10px] font-medium"
              style={{ color: colors.blue[600] }}
            >
              <Sparkles className="w-3 h-3" />
              New
            </span>
          )}
          {deal.isFeatured && (
            <span
              className="flex items-center gap-0.5 text-[10px] font-medium"
              style={{ color: colors.yellow[600] }}
            >
              <TrendingUp className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default DealThumbnailCard;
