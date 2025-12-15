import React from 'react';
import { ArrowRight, Bookmark, Rocket } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

// Generate a consistent color from a string
function stringToColor(str: string): [string, string] {
  const colorPairs: [string, string][] = [
    ['#1a1a2e', '#0f3460'], // Dark blue
    ['#2d132c', '#801336'], // Dark purple/maroon
    ['#1a3a1a', '#2d5a27'], // Dark green
    ['#1a2639', '#3e4a61'], // Slate
    ['#2c1a3a', '#5a3d6a'], // Dark violet
    ['#3a1a1a', '#6a3d3d'], // Dark red
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPairs[Math.abs(hash) % colorPairs.length];
}

type ResumeInvestingCardProps = {
  deal: {
    name: string;
    description: string;
    imageUrl?: string;
    lastViewedAt?: string;
  };
  onResume?: () => void;
  onBookmark?: () => void;
  className?: string;
};

/**
 * ResumeInvestingCard
 *
 * Card showing a deal user can resume investing in.
 * Matches Figma design with image, badge, and CTA button.
 */
export function ResumeInvestingCard({
  deal,
  onResume,
  onBookmark,
  className,
}: ResumeInvestingCardProps) {
  // Format last viewed time
  const formatLastViewed = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `Viewed ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `Viewed ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div
      className={cn('relative rounded-[20px] overflow-hidden', className)}
      style={{
        backgroundColor: colors.white,
        border: '1px solid #E5E7EB',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex">
        {/* Deal Image */}
        <div
          className="relative w-48 h-[185px] rounded-[14px] overflow-hidden m-6 mr-0 flex-shrink-0"
          style={{
            backgroundColor: '#1a1a2e',
            backgroundImage: deal.imageUrl ? `url(${deal.imageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Default gradient with icon if no image */}
          {!deal.imageUrl && (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${stringToColor(deal.name)[0]} 0%, ${stringToColor(deal.name)[1]} 100%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Rocket
                  className="w-12 h-12"
                  style={{ color: 'rgba(255, 255, 255, 0.3)' }}
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '32px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {deal.name.charAt(0)}
                </span>
              </div>
            </>
          )}
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Bookmark Button */}
          <button
            onClick={onBookmark}
            className="absolute right-4 top-4 w-[52px] h-[52px] flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          >
            <Bookmark className="w-5 h-5" style={{ color: colors.grey[600] }} />
          </button>

          {/* Badge and Last Viewed */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: '#DBEAFE',
                color: '#1447E6',
              }}
            >
              Resume
            </span>
            {deal.lastViewedAt && (
              <span
                className="text-xs"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6A7282',
                }}
              >
                {formatLastViewed(deal.lastViewedAt)}
              </span>
            )}
          </div>

          {/* Deal Name */}
          <h3
            className="mb-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '28px',
              letterSpacing: '-0.4492px',
              color: colors.grey[950],
            }}
          >
            {deal.name}
          </h3>

          {/* Description */}
          <p
            className="mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.1504px',
              color: colors.grey[500],
            }}
          >
            {deal.description}
          </p>

          {/* Resume Button */}
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full w-fit transition-colors hover:opacity-90"
            style={{
              backgroundColor: colors.grey[950],
              color: colors.white,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.1504px',
              }}
            >
              Resume Investing
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeInvestingCard;
