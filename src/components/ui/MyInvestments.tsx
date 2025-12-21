import React from 'react';
import { Building2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Investment data type
export interface Investment {
  id: string;
  name: string;
  type: string;
  investedAmount: number;
  currentValue: number;
  returnPercent: number;
  date: string;
  status: 'active' | 'pending' | 'exited';
  icon?: React.ReactNode;
}

// Investment row component
interface InvestmentRowProps {
  investment: Investment;
  currency?: string;
  onViewClick?: (investment: Investment) => void;
  className?: string;
}

export function InvestmentRow({
  investment,
  currency = "$",
  onViewClick,
  className,
}: InvestmentRowProps) {
  const isPositive = investment.returnPercent >= 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-muted-foreground/30 transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          {investment.icon ?? <Building2 className="w-5 h-5 text-muted-foreground" />}
        </div>
        {/* Info */}
        <div>
          <div className="text-sm font-medium text-foreground">{investment.name}</div>
          <div className="text-xs text-muted-foreground/70">
            {investment.type} · {investment.date}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Values */}
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">
            {currency}{investment.currentValue.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground/70">
            {currency}{investment.investedAmount.toLocaleString()} invested
          </div>
        </div>

        {/* Return percent */}
        <div className={cn("text-sm font-medium", isPositive ? "text-success" : "text-destructive")}>
          {isPositive ? '+' : ''}{investment.returnPercent.toFixed(1)}%
        </div>

        {/* Action button */}
        <button
          onClick={() => onViewClick?.(investment)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground/70" />
        </button>
      </div>
    </div>
  );
}

// My Investments content component
interface MyInvestmentsProps {
  investments: Investment[];
  currency?: string;
  onViewInvestment?: (investment: Investment) => void;
  className?: string;
}

export function MyInvestments({
  investments,
  currency = "$",
  onViewInvestment,
  className,
}: MyInvestmentsProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;
  const isPositive = totalReturn >= 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-xl border border-border">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Total Invested</div>
          <div className="text-lg font-medium text-foreground">
            {currency}{totalInvested.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Current Value</div>
          <div className="text-lg font-medium text-foreground">
            {currency}{totalValue.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Total Return</div>
          <div className={cn("text-lg font-medium", isPositive ? "text-success" : "text-destructive")}>
            {isPositive ? '+' : ''}{totalReturn.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Investments List */}
      <div className="flex flex-col gap-2">
        {investments.map((investment) => (
          <InvestmentRow
            key={investment.id}
            investment={investment}
            currency={currency}
            onViewClick={onViewInvestment}
          />
        ))}
      </div>
    </div>
  );
}

// Default sample investments data
export const SAMPLE_INVESTMENTS: Investment[] = [
  {
    id: '1',
    name: 'SpaceX',
    type: 'Secondary',
    investedAmount: 250000,
    currentValue: 312500,
    returnPercent: 25.0,
    date: 'Mar 2024',
    status: 'active',
  },
  {
    id: '2',
    name: 'Anthropic',
    type: 'Series C',
    investedAmount: 150000,
    currentValue: 187500,
    returnPercent: 25.0,
    date: 'Jan 2024',
    status: 'active',
  },
  {
    id: '3',
    name: 'Stripe',
    type: 'Secondary',
    investedAmount: 200000,
    currentValue: 224000,
    returnPercent: 12.0,
    date: 'Nov 2023',
    status: 'active',
  },
  {
    id: '4',
    name: 'Databricks',
    type: 'Series I',
    investedAmount: 100000,
    currentValue: 118000,
    returnPercent: 18.0,
    date: 'Aug 2023',
    status: 'active',
  },
  {
    id: '5',
    name: 'Discord',
    type: 'Secondary',
    investedAmount: 75000,
    currentValue: 82500,
    returnPercent: 10.0,
    date: 'Jun 2023',
    status: 'active',
  },
];
