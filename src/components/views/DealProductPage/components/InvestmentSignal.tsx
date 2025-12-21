import { cn } from '@/lib/utils';
import type { InvestmentSignalData } from '../types';

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
        <span className="text-sm font-medium text-[#7f7582]">{value}%</span>
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

interface InvestmentSignalProps {
  data: InvestmentSignalData;
  className?: string;
}

export function InvestmentSignal({ data, className }: InvestmentSignalProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className="text-sm font-medium text-[#29272a]">Investment Signal</h3>
      <div className="flex flex-col gap-3">
        <ProgressBar label="Very likely" value={data.veryLikely} />
        <ProgressBar label="Considering" value={data.considering} />
        <ProgressBar label="Already invested" value={data.alreadyInvested} />
        <ProgressBar label="Unlikely" value={data.unlikely} />
      </div>
    </div>
  );
}
