import { cn } from '@/lib/utils';
import type { CompanyData } from '../types';

interface InvestmentSummaryProps {
  amount: number;
  company: CompanyData;
  className?: string;
}

export function InvestmentSummary({
  amount,
  company,
  className,
}: InvestmentSummaryProps) {
  return (
    <div
      className={cn(
        'bg-[#f4f3f5] p-8 flex flex-col gap-6',
        className
      )}
      style={{
        boxShadow: 'inset 1.045px 0.836px 0.836px 0px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Selected Investment */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#8a7f91]">
          Selected investment
        </span>
        <span className="text-xl font-medium text-[#29272a]">
          ${amount.toLocaleString()}
        </span>
      </div>

      {/* Company info */}
      <div className="flex flex-col gap-4">
        <img
          src={company.logo}
          alt={company.name}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8a7f91]">
            {company.type}
          </span>
          <h3 className="text-xl font-medium text-[#373338] tracking-tight">
            {company.name}
          </h3>
          <p className="text-sm text-[#69606d] leading-5 line-clamp-3">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}
