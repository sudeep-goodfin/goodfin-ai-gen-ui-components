import React from 'react';
import { Compass } from 'lucide-react';

interface ExploreCardProps {
  label: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function ExploreThumbnailCard({ label, onClick, children }: ExploreCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white h-[79px] rounded-[11px] overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 group"
    >
      <div className="relative flex flex-col gap-1.5 items-center justify-center p-2 h-full">
        {/* Backdrop blur header */}
        <div className="absolute top-0 left-0 right-0 h-[43px] flex items-center px-3 backdrop-blur-[6px] bg-[rgba(254,254,232,0.05)]">
          <span className="text-[12px] leading-3 text-[#48424a] font-['Soehne_Kraftig',sans-serif] tracking-[-0.09px]">
            {label}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function NewDealsCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white h-[79px] rounded-[11px] overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 flex items-center justify-center gap-7 px-2"
    >
      <span className="text-[12px] leading-3 text-[#48424a] font-['Soehne_Kraftig',sans-serif] tracking-[-0.09px]">
        New Deals
      </span>

      {/* Stacked avatars */}
      <div className="flex items-start relative pr-4">
        <div className="w-10 h-10 rounded-[10px] overflow-hidden relative z-30 border border-white">
          <img src="/icons/products/xAI.png" alt="xAI" className="w-full h-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-[10px] overflow-hidden -ml-4 relative z-20 shadow-[-1.875px_0.625px_2.5px_0px_rgba(0,0,0,0.25)] border border-white">
          <img src="/icons/products/anthropic.png" alt="Anthropic" className="w-full h-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-[10px] overflow-hidden -ml-4 relative z-10 shadow-[-1.875px_0.625px_2.5px_0px_rgba(0,0,0,0.25)] bg-[#2e313a] border border-white">
          <img src="/icons/products/perplexity.png" alt="Perplexity" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

interface ExploreGoodfinProps {
  onDealsClick?: () => void;
  onNewsClick?: () => void;
  onEventsClick?: () => void;
  onCommunityClick?: () => void;
}

export function ExploreGoodfin({
  onDealsClick,
  onNewsClick,
  onEventsClick,
  onCommunityClick
}: ExploreGoodfinProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 px-0 py-1">
        <Compass className="w-4 h-4 text-[#7f7582]" strokeWidth={2} />
        <span className="text-[14px] leading-4 text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">
          Explore Goodfin
        </span>
      </div>

      {/* Cards Grid */}
      <div className="flex gap-3 w-full">
        <NewDealsCard onClick={onDealsClick} />
        <ExploreThumbnailCard label="News" onClick={onNewsClick} />
        <ExploreThumbnailCard label="Events" onClick={onEventsClick} />
        <ExploreThumbnailCard label="Community" onClick={onCommunityClick} />
      </div>
    </div>
  );
}
