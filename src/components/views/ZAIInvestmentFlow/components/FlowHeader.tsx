import { X, ChevronLeft, MoreVertical } from 'lucide-react';
import type { DealInfo } from '../types';

interface FlowHeaderProps {
  deal: DealInfo;
  progress: number;
  onBack: () => void;
  onDismiss: () => void;
  onShowProgress?: () => void;
}

export function FlowHeader({ deal, progress, onBack, onDismiss, onShowProgress }: FlowHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e0dce0]">
      {/* Progress bar */}
      <div className="h-1 bg-[#e8e5e8]">
        <div
          className="h-full bg-[#373338] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header content */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-[#f7f7f8] transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-[#373338]" />
        </button>

        {/* Deal info */}
        <div className="flex items-center gap-3">
          <img
            src={deal.logo}
            alt={deal.companyName}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span
            className="text-[15px] font-medium text-[#373338]"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {deal.companyName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onShowProgress && (
            <button
              onClick={onShowProgress}
              className="px-3 py-1.5 text-xs font-medium text-[#7f7582] bg-[#f7f7f8] rounded-full hover:bg-[#edebee] transition-colors"
            >
              Progress
            </button>
          )}
          <button
            onClick={onDismiss}
            className="p-2 -mr-2 rounded-full hover:bg-[#f7f7f8] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#373338]" />
          </button>
        </div>
      </div>
    </div>
  );
}
