import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface OverallOutlookProps {
  rating: number;
  className?: string;
}

export function OverallOutlook({ rating, className }: OverallOutlookProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className="text-sm font-medium text-[#29272a]">Overall Outlook</h3>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`full-${i}`}
              className="w-5 h-5 fill-[#373338] text-[#373338]"
            />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <div className="relative w-5 h-5">
              <Star className="absolute w-5 h-5 text-[#e0e0e0]" />
              <div className="absolute overflow-hidden w-2.5">
                <Star className="w-5 h-5 fill-[#373338] text-[#373338]" />
              </div>
            </div>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-5 h-5 text-[#e0e0e0]" />
          ))}
        </div>
        <span className="text-2xl font-medium text-[#373338]">{rating}</span>
      </div>
    </div>
  );
}
