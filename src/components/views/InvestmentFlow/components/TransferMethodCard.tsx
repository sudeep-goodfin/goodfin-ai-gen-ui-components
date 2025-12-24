import { cn } from '@/lib/utils';
import { Landmark, Globe } from 'lucide-react';
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
  const Icon = option.icon === 'bank' ? Landmark : Globe;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-[18px] bg-[#f4f3f5] border flex flex-col gap-4 transition-colors relative',
        isSelected ? 'border-[#48424a]' : 'border-[#beb9c0]',
        className
      )}
      style={{
        boxShadow: 'inset 1.045px 0.836px 0.836px 0px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Title with icon */}
      <div className="flex items-center gap-2.5">
        <Icon className="w-6 h-6 text-[#29272a]" strokeWidth={1.5} />
        <span
          className="text-[20px] leading-[28px] text-[#29272a]"
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          {option.title}
        </span>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2">
        {option.badges.map((badge, index) => (
          <span
            key={index}
            className={cn(
              'px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.36px] rounded-sm',
              badge.variant === 'success'
                ? 'bg-[#b2ffd2] text-[#049142]'
                : 'bg-[#9b929e] text-[#f0eef0]'
            )}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </button>
  );
}
