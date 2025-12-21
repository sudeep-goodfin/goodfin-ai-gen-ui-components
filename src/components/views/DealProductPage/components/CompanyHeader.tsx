import { cn } from '@/lib/utils';
import type { Company } from '../types';

interface CompanyHeaderProps {
  company: Company;
  className?: string;
}

interface StatItemProps {
  label: string;
  value: string;
  year: number;
}

function StatItem({ label, value, year }: StatItemProps) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <span className="text-xs font-medium text-[#7f7582]">{label}</span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-medium text-[#48424a]">{value}</span>
        <span className="text-xs text-[#7f7582]">{year}</span>
      </div>
    </div>
  );
}

export function CompanyHeader({ company, className }: CompanyHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center py-6 px-10 bg-white/60 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[650px] py-6">
        {/* Company Logo */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-12 h-12 rounded object-cover"
          />
        </div>

        {/* Company Name & Min Investment */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-[28px] leading-9 font-medium text-[#373338] font-['Soehne_Kraftig',sans-serif]">
            {company.name}
          </h1>
          <div className="flex items-center gap-1 text-base">
            <span className="text-[#7f7582]">Min Investment</span>
            <span className="font-medium text-[#373338]">
              ${company.minInvestment.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-5 text-[#29272a] text-center max-w-[406px]">
          {company.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[#e6e4e7]" />

        {/* Stats Row */}
        <div className="flex items-center w-full">
          <StatItem
            label="Revenue"
            value={company.revenue.value}
            year={company.revenue.year}
          />
          <StatItem
            label="Valuation"
            value={company.valuation.value}
            year={company.valuation.year}
          />
          <StatItem
            label="Growth Rate"
            value={company.growthRate.value}
            year={company.growthRate.year}
          />
        </div>
      </div>
    </div>
  );
}
