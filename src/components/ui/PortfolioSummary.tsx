import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// Time range options
export type TimeRange = '1D' | '1W' | '1M' | '1Y';

// Chart data point
export interface ChartDataPoint {
  name: string;
  value: number;
}

// Portfolio summary props
export interface PortfolioSummaryProps {
  totalValue: number;
  changePercent: number;
  amountInvested: number;
  returns: number;
  chartData: ChartDataPoint[];
  currency?: string;
  lastUpdated?: string;
  defaultTimeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
  className?: string;
}

// Time range selector
interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = ['1D', '1W', '1M', '1Y'];

  return (
    <div className="flex gap-1 items-center justify-center px-1 py-1 relative rounded border border-border">
      {ranges.map((range, index) => (
        <React.Fragment key={range}>
          <button
            onClick={() => onChange(range)}
            className={cn(
              "px-2 py-1 text-xs rounded transition-colors cursor-pointer",
              value === range
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            {range}
          </button>
          {index < ranges.length - 1 && (
            <div className="h-2.5 w-0 flex items-center justify-center">
              <div className="h-full w-px bg-border rotate-90" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Stat display component
interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col gap-1 items-start justify-center shrink-0">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-medium text-muted-foreground">{value}</div>
    </div>
  );
}

export function PortfolioSummary({
  totalValue,
  changePercent,
  amountInvested,
  returns,
  chartData,
  currency = "$",
  lastUpdated = "24 Hr ago",
  defaultTimeRange = '1D',
  onTimeRangeChange,
  className,
}: PortfolioSummaryProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);
  const isPositive = changePercent >= 0;

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    onTimeRangeChange?.(range);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className={cn("bg-card relative rounded-lg size-full", className)}>
      <div className="size-full">
        <div className="flex flex-col items-start p-4 relative size-full">
          <div className="flex-1 flex flex-col gap-3 grow items-start w-full">
            {/* Title Section */}
            <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
              <p className="font-medium">Portfolio Summary</p>
              <p className="font-light">Last Updated {lastUpdated}</p>
            </div>

            <div className="flex flex-col h-[270px] items-start relative shrink-0 w-full">
              {/* Header Stats */}
              <div className="flex flex-col gap-3 h-24 items-start relative shrink-0 w-[309px]">
                {/* Total Value */}
                <div className="flex gap-2 items-center relative shrink-0">
                  <div className="flex gap-1 items-center relative shrink-0">
                    <div className="flex items-center pt-1 relative shrink-0">
                      <span className="text-xl font-medium text-muted-foreground">{currency}</span>
                    </div>
                    <span className="text-[28px] font-medium text-muted-foreground leading-9">
                      {formatCurrency(totalValue)}
                    </span>
                  </div>
                  {/* Change Percent */}
                  <div className="flex gap-1 items-end pt-1.5 relative shrink-0">
                    <div className="shrink-0 w-4 h-4">
                      <svg className="block size-full" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 4L12 10H4L8 4Z"
                          fill={isPositive ? '#049142' : '#dc2626'}
                          transform={isPositive ? '' : 'rotate(180 8 8)'}
                        />
                      </svg>
                    </div>
                    <span className={cn("text-lg font-medium", isPositive ? "text-success" : "text-destructive")}>
                      {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Amount Invested & Returns */}
                <div className="flex gap-6 items-start relative shrink-0">
                  <Stat label="Amount Invested" value={`${currency}${formatCurrency(amountInvested)}`} />
                  <Stat label="Returns" value={`${currency}${formatCurrency(returns)}`} />
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex flex-col gap-1 items-center justify-center relative shrink-0 w-full grow">
                <div className="h-[140px] relative shrink-0 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FBA76C" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#FFC971" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card px-3 py-2 rounded-lg shadow-lg border border-border">
                                <p className="text-sm font-medium text-foreground">
                                  {currency}{payload[0].value?.toLocaleString()}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FBA76C"
                        strokeWidth={2}
                        fill="url(#portfolioGradient)"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#7f7582', fontSize: 10 }}
                        dy={10}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Time Range Selector */}
                <div className="mt-2">
                  <TimeRangeSelector value={timeRange} onChange={handleTimeRangeChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default chart data
export const DEFAULT_CHART_DATA: ChartDataPoint[] = [
  { name: 'JAN', value: 1780000 },
  { name: 'FEB', value: 1820000 },
  { name: 'MAR', value: 1790000 },
  { name: 'APR', value: 1890000 },
  { name: 'MAY', value: 1860000 },
  { name: 'JUN', value: 1946160 },
];
