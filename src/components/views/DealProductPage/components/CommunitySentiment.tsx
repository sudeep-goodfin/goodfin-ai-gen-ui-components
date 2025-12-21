import { cn } from '@/lib/utils';
import type { CommunitySentimentData } from '../types';

interface ProgressBarProps {
  label: string;
  value: number;
  className?: string;
}

function ProgressBar({ label, value, className }: ProgressBarProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#29272a]">{label}</span>
        <span className="text-sm font-medium text-[#7f7582]">{value} %</span>
      </div>
      <div className="h-1 bg-[#e0e0e0] rounded">
        <div
          className="h-full bg-[#373338] rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

interface CommunitySentimentProps {
  data: CommunitySentimentData;
  className?: string;
}

export function CommunitySentiment({ data, className }: CommunitySentimentProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className="text-sm font-medium text-[#29272a]">Community Sentiment</h3>
      <div className="flex flex-col gap-3">
        <ProgressBar label="Bullish" value={data.bullish} />
        <ProgressBar label="Neutral" value={data.neutral} />
        <ProgressBar label="Bearish" value={data.bearish} />
      </div>
    </div>
  );
}
