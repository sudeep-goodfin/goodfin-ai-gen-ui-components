import React from 'react';
import { cn } from '@/lib/utils';
import { iconPaths } from './icons';

// Deal status type
export type DealStatus = 'live' | 'closing' | 'premium';

// Deal card props
export interface DealCardProps {
  id: string;
  category: string;
  status: DealStatus;
  title: string;
  description: string;
  image: string;
  investors?: string[];
  investorNames?: string[];
  onClick?: () => void;
  className?: string;
}

// Status configuration
const STATUS_CONFIG: Record<DealStatus, { text: string; className: string; showDot: boolean; textColor: string }> = {
  live: {
    text: 'LIVE',
    className: 'bg-card',
    showDot: true,
    textColor: 'text-success',
  },
  closing: {
    text: 'CLOSING SOON',
    className: 'bg-muted-foreground/80',
    showDot: false,
    textColor: 'text-card',
  },
  premium: {
    text: 'PREMIUM',
    className: 'bg-gradient-to-r from-amber-500 to-orange-500',
    showDot: false,
    textColor: 'text-white',
  },
};

// Sparkle icon
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="block">
      <path d={iconPaths.autoAwesome} fill="currentColor" className="text-foreground" />
    </svg>
  );
}

// Investor avatar stack
interface InvestorAvatarsProps {
  images: string[];
  names?: string[];
}

function InvestorAvatars({ images, names = [] }: InvestorAvatarsProps) {
  return (
    <div className="flex items-center shrink-0">
      <div className="flex items-start pl-0 pr-0.5">
        {images.slice(0, 4).map((img, index) => (
          <div
            key={index}
            className="bg-card rounded-full border border-border shrink-0 -ml-1 first:ml-0"
            style={{ zIndex: images.length - index }}
          >
            <div className="p-1">
              <div className="relative rounded w-3.5 h-3.5 overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-4 h-4 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-muted-foreground" />
      </div>
      <div className="flex gap-2.5 items-start shrink-0">
        {names.slice(0, 2).map((name, index) => (
          <span key={index} className="text-xs text-foreground whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DealCard({
  category,
  status,
  title,
  description,
  image,
  investors = [],
  investorNames = [],
  onClick,
  className,
}: DealCardProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-muted relative rounded-xl shrink-0 w-[374px] cursor-pointer border-2 border-transparent hover:border-accent/30 transition-all group",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-solid border-card inset-0 pointer-events-none rounded-xl shadow-sm"
      />
      <div className="flex flex-col items-end size-full">
        <div className="flex flex-col gap-2 items-end pb-3 pt-0 px-3 relative w-full">
          {/* Header with category and status */}
          <div className="flex flex-col h-[69px] items-start justify-center relative shrink-0 w-[239px]">
            <div className="flex items-start relative shrink-0 w-full">
              <div className="flex flex-col items-start justify-end relative shrink-0">
                <div className="flex items-center justify-between pt-0.5 relative shrink-0 w-[249px]">
                  {/* Category badge */}
                  <div className="flex items-center justify-center px-2 py-1 relative rounded-full shrink-0 border border-border">
                    <p className="text-xs text-muted-foreground text-right whitespace-nowrap">{category}</p>
                  </div>

                  {/* Status badge */}
                  <div
                    className={cn(
                      "flex gap-2 items-center justify-center overflow-hidden px-6 py-2 relative rounded-bl-full rounded-tl-full shrink-0",
                      config.className
                    )}
                  >
                    {config.showDot && (
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 rounded-full bg-success" />
                      </div>
                    )}
                    <span className={cn("text-sm whitespace-nowrap", config.textColor)}>{config.text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="relative rounded w-full">
            <div className="flex flex-col justify-center size-full">
              <div className="flex flex-col gap-4 items-start justify-center pb-0 pl-2 pr-0 pt-2 relative w-full">
                {/* Title and description */}
                <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
                  <div className="flex h-8 items-end justify-between relative shrink-0 w-full">
                    <div className="flex-1 text-foreground text-xl leading-7">
                      <p>{title}</p>
                    </div>
                    <div className="flex gap-2 items-center justify-center px-3 py-2 relative rounded-full shrink-0 w-8 border border-muted">
                      <SparkleIcon />
                    </div>
                  </div>
                  <div className="flex flex-col h-10 items-start pr-8 relative shrink-0 w-[341px]">
                    <div className="flex-1 text-foreground text-sm leading-5 overflow-hidden text-ellipsis">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>

                {/* Investors section */}
                {(investors.length > 0 || investorNames.length > 0) && (
                  <div className="flex items-center justify-center relative shrink-0 w-full">
                    <div className="flex-1 flex flex-row items-center self-stretch shrink-0">
                      <div className="flex-1 flex flex-col gap-2 h-full items-start min-h-px min-w-px relative shrink-0">
                        <div className="flex gap-2 items-center relative shrink-0 w-full">
                          <span className="text-muted-foreground text-sm whitespace-nowrap">Investors</span>
                          <div className="flex-1 flex items-center min-h-px min-w-px relative shrink-0">
                            <div className="h-px w-9 border-t border-border" />
                            <div className="flex-1 h-px border-t border-border" />
                          </div>
                        </div>
                        <InvestorAvatars images={investors} names={investorNames} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating avatar */}
      <div className="absolute h-[88px] left-5 top-[-6px] w-[82px]">
        <div className="absolute bg-muted-foreground/30 blur-[7px] h-[51px] left-1/2 -translate-x-1/2 opacity-50 top-[33px] w-[58px]" />
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-xl size-[72px] top-0 overflow-hidden">
          <img alt="" className="w-full h-full object-cover rounded-xl" src={image} />
          <div className="absolute inset-0 shadow-[inset_0px_-3px_43px_0px_rgba(255,255,255,0.31)]" />
        </div>
      </div>
    </div>
  );
}

// Deals grid component
interface DealsGridProps {
  deals: DealCardProps[];
  limit?: number;
  showAllLabel?: string;
  onCardClick?: (deal: DealCardProps) => void;
  onShowAllClick?: () => void;
  className?: string;
}

export function DealsGrid({
  deals,
  limit = 3,
  showAllLabel,
  onCardClick,
  onShowAllClick,
  className,
}: DealsGridProps) {
  const visibleDeals = deals.slice(0, limit);
  const label = showAllLabel ?? `Show all (${deals.length}) deals`;

  return (
    <div className={cn("flex flex-col gap-6 w-full mb-8", className)}>
      <div className="flex flex-wrap gap-x-4 gap-y-10 items-start relative shrink-0 w-full">
        {visibleDeals.map((deal) => (
          <DealCard key={deal.id} {...deal} onClick={() => onCardClick?.(deal)} />
        ))}
      </div>

      <button
        onClick={onShowAllClick}
        className="w-full bg-card border-2 border-border rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:border-accent/30 hover:bg-accent/5 transition-all group"
      >
        <span className="text-foreground text-sm font-medium group-hover:text-accent">{label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path d={iconPaths.arrowForward} fill="currentColor" className="text-muted-foreground group-hover:text-accent" />
        </svg>
      </button>
    </div>
  );
}
