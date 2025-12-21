import React from 'react';
import { cn } from '@/lib/utils';
import { iconPaths } from './icons';
import { CustomIcon } from './Icon';

// Progress circle component
interface ProgressCircleProps {
  percentage: number;
  size?: number;
  className?: string;
}

export function ProgressCircle({ percentage = 23, size = 48, className }: ProgressCircleProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background Track */}
      <CustomIcon viewBox="0 0 48 48" className="absolute inset-0 w-full h-full text-muted-foreground/20" width={size} height={size}>
        <path d={iconPaths.progressCircle} fill="currentColor" />
      </CustomIcon>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-muted-foreground">
        {percentage}%
      </div>

      {/* Active Segment */}
      <div className="absolute inset-0">
        <div className="absolute top-[0.21%] right-[0.68%] w-[50%] h-[48%]">
          <svg className="block w-full h-full" fill="none" viewBox="0 0 24 23">
            <path d={iconPaths.progressActive} fill="currentColor" className="text-muted-foreground" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Progress widget props
interface ProgressWidgetProps {
  percentage?: number;
  title?: string;
  description?: string;
  onActionClick?: () => void;
  className?: string;
}

export function ProgressWidget({
  percentage = 23,
  title = "Your profile is 23% complete — let's get you to 100% and unlock curated deal flow.",
  description = "The more you share, the more tailored your Goodfin experience becomes.",
  onActionClick,
  className,
}: ProgressWidgetProps) {
  return (
    <div
      className={cn(
        "w-full max-w-3xl bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4",
        className
      )}
    >
      <div className="flex-1 flex items-center gap-4">
        {/* Progress Circle */}
        <div className="shrink-0">
          <ProgressCircle percentage={percentage} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground font-medium leading-4">{title}</div>
          <div className="text-xs text-foreground font-light leading-4">{description}</div>
        </div>
      </div>

      {/* Action Arrow */}
      <button
        onClick={onActionClick}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d={iconPaths.arrowRight} fill="currentColor" className="text-foreground" />
        </svg>
      </button>
    </div>
  );
}
