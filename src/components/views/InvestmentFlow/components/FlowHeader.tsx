import { cn } from '@/lib/utils';
import goodfinLogo from '../../Welcome02/assets/goodfin-logo.png';

interface FlowHeaderProps {
  progress: number; // 0-100
  onDismiss: () => void;
  className?: string;
}

export function FlowHeader({ progress, onDismiss, className }: FlowHeaderProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Navigation bar */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-[#edebee]"
        style={{
          boxShadow: '0px 4px 16px 0px rgba(154, 144, 161, 0.1)',
        }}
      >
        {/* Left placeholder for hamburger/back */}
        <div className="w-24" />

        {/* Center logo */}
        <img src={goodfinLogo} alt="Goodfin" className="h-6" />

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="px-6 py-2 border border-[#373338] rounded text-sm font-medium text-[#29272a] hover:bg-black/5 transition-colors"
        >
          I will do this later
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-transparent overflow-hidden">
        <div
          className="h-2 bg-[#7f7582]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
