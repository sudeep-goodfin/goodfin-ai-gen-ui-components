import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';
import { DealCardData, Investor } from '../mockData';

type DealCardProps = {
  deal: DealCardData;
  onClick?: () => void;
  onAskAI?: () => void;
  className?: string;
};

// Status badge component
function StatusBadge({ status }: { status: 'live' | 'closing-soon' | 'premium' }) {
  const config = {
    live: {
      label: 'LIVE',
      bgColor: colors.white,
      textColor: colors.green[600],
      showDot: true,
    },
    'closing-soon': {
      label: 'CLOSING SOON',
      bgColor: colors.grey[700],
      textColor: colors.grey[50],
      showDot: false,
    },
    premium: {
      label: 'PREMIUM',
      bgColor: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
      textColor: colors.white,
      showDot: false,
    },
  };

  const { label, bgColor, textColor, showDot } = config[status];

  return (
    <div
      className="flex items-center gap-1 px-6 py-2 rounded-l-full"
      style={{
        background: bgColor,
      }}
    >
      {showDot && (
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: colors.green[500], opacity: 0.5 }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.green[500] }}
          />
        </div>
      )}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '16px',
          color: textColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Generate a consistent color from a string
function stringToColor(str: string): string {
  const colors = [
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#14B8A6', // Teal
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Investor avatar stack
function InvestorAvatars({ investors }: { investors: Investor[] }) {
  return (
    <div className="flex items-start pr-[3px]">
      {investors.slice(0, 4).map((investor, index) => (
        <div
          key={investor.id}
          className="relative rounded-full flex items-center justify-center overflow-hidden"
          style={{
            width: '28px',
            height: '28px',
            marginLeft: index > 0 ? '-3px' : 0,
            backgroundColor: colors.white,
            border: '0.875px solid #E5E4E5',
            boxShadow: 'inset 1.75px 1.75px 1.75px 0px white',
          }}
        >
          {investor.avatarUrl ? (
            <img
              src={investor.avatarUrl}
              alt={investor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: stringToColor(investor.name) }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '10px',
                  color: 'white',
                }}
              >
                {investor.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * DealCard
 *
 * Card showing a deal with logo, category tag, status badge,
 * description, and investor avatars. Matches Figma design.
 */
export function DealCard({
  deal,
  onClick,
  onAskAI,
  className,
}: DealCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl overflow-visible cursor-pointer transition-shadow hover:shadow-lg',
        className
      )}
      onClick={onClick}
      style={{
        backgroundColor: colors.grey[50],
        border: '2px solid white',
        boxShadow: '0px 1px 2px 0px #E3E3E3',
      }}
    >
      {/* Logo with blur shadow */}
      <div className="absolute left-[18px] top-[-8px] w-[82px] h-[88px]">
        {/* Blur shadow */}
        <div
          className="absolute left-1/2 top-[33px] w-[58px] h-[51px] -translate-x-[calc(50%+9.63px)]"
          style={{
            backgroundColor: '#C7B8C7',
            filter: 'blur(7.421px)',
            opacity: 0.5,
          }}
        />
        {/* Logo */}
        <div
          className="absolute left-1/2 top-[0.21px] w-[72px] h-[72px] -translate-x-[calc(50%+5px)] rounded-[11px] overflow-hidden"
          style={{
            boxShadow: 'inset 0px -3.295px 42.785px 0px rgba(255, 255, 255, 0.31)',
          }}
        >
          {deal.logoUrl ? (
            <img
              src={deal.logoUrl}
              alt={deal.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${stringToColor(deal.name)} 0%, ${stringToColor(deal.name + '2')} 100%)`,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: 'white',
                  textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {deal.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Top row - Category tag and Status badge */}
      <div className="flex items-center justify-between pt-[3px] pb-0 px-3">
        {/* Category tag */}
        <div
          className="flex items-center justify-center px-2 py-1 rounded-full"
          style={{
            border: `1px solid ${colors.grey[200]}`,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: colors.grey[500],
              textAlign: 'right',
            }}
          >
            {deal.category}
          </span>
        </div>

        {/* Status badge (positioned to the right edge) */}
        <div className="absolute right-0 top-[3px]">
          <StatusBadge status={deal.status} />
        </div>
      </div>

      {/* Content area */}
      <div className="p-3 pt-[52px]">
        {/* Title row */}
        <div className="flex items-end justify-between mb-1">
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
              color: colors.grey[950],
            }}
          >
            {deal.name}
          </h3>
          {/* Ask AI button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAskAI?.();
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full border"
            style={{
              borderColor: colors.grey[100],
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: colors.grey[600] }} />
          </button>
        </div>

        {/* Description */}
        <p
          className="mb-4 line-clamp-2 pr-8"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '20px',
            color: colors.grey[950],
            maxWidth: '287px',
          }}
        >
          {deal.description}
        </p>

        {/* Investors section */}
        <div className="flex flex-col gap-2">
          {/* Investors label with divider */}
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: colors.grey[800],
              }}
            >
              Investors
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: colors.grey[200] }}
            />
          </div>

          {/* Investor avatars and names */}
          <div className="flex items-center gap-1">
            <InvestorAvatars investors={deal.investors} />
            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: colors.grey[500] }}
              />
            </div>
            <div className="flex gap-3">
              {deal.investors.slice(0, 2).map((investor) => (
                <span
                  key={investor.id}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: colors.grey[950],
                  }}
                >
                  {investor.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
