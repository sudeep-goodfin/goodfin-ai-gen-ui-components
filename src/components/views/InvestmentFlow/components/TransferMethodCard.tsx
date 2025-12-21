import { cn } from '@/lib/utils';
import { Building2, Globe } from 'lucide-react';
import type { TransferMethodOption } from '../types';

interface TransferMethodCardProps {
  option: TransferMethodOption;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

export function TransferMethodCard({
  option,
  isSelected,
  onSelect,
  className,
}: TransferMethodCardProps) {
  const Icon = option.icon === 'bank' ? Building2 : Globe;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-[18px] bg-[#f4f3f5] border flex flex-col gap-4 transition-colors',
        isSelected ? 'border-[#48424a]' : 'border-[#beb9c0]',
        className
      )}
      style={{
        boxShadow: 'inset 1.045px 0.836px 0.836px 0px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Title with icon */}
      <div className="flex items-center gap-2.5">
        <Icon className="w-6 h-6 text-[#29272a]" />
        <span className="text-xl font-medium text-[#29272a]">{option.title}</span>
      </div>

      {/* Badges and details */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {option.badges.map((badge, index) => (
            <span
              key={index}
              className={cn(
                'px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-sm',
                badge.variant === 'success'
                  ? 'bg-[#b2ffd2] text-[#049142]'
                  : 'bg-[#9b929e] text-[#f0eef0]'
              )}
            >
              {badge.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#69606d]">
          {option.details.map((detail, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-[#8a7f91]">•</span>}
              {detail}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
