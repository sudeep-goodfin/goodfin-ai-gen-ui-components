import React from 'react';
import { cn } from '../../../lib/utils';
import { Card, CardContent, Button } from '../../ui';

type AmountSelectorVariant = 'default' | 'dark' | 'simple';

type AmountSelectorProps = {
  selectedAmount: number;
  inputAmount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuickAmountClick: (amount: number) => void;
  quickAmounts?: number[];
  variant?: AmountSelectorVariant;
  helperText?: string;
};

export function AmountSelector({
  selectedAmount,
  inputAmount,
  onAmountChange,
  onQuickAmountClick,
  quickAmounts = [25000, 50000, 100000, 200000],
  variant = 'default',
  helperText = 'These are just suggestions. You can invest any amount above the minimum.',
}: AmountSelectorProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Amount Display */}
        {variant !== 'simple' && (
          <div className="text-center">
            <p className="text-4xl font-bold text-muted-foreground">
              ${selectedAmount.toLocaleString()}
            </p>
          </div>
        )}

        {helperText && variant !== 'simple' && (
          <p className="text-sm text-muted-foreground text-center">{helperText}</p>
        )}

        {/* Investment Amount Input */}
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-3 transition-all',
            variant === 'dark'
              ? 'bg-primary text-primary-foreground'
              : variant === 'simple'
              ? 'bg-muted hover:bg-muted/80'
              : 'bg-muted border border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20'
          )}
        >
          <span
            className={cn(
              'font-semibold text-lg whitespace-nowrap',
              variant === 'dark' ? 'text-primary-foreground' : 'text-muted-foreground'
            )}
          >
            Invest $
          </span>
          <input
            type="text"
            value={inputAmount}
            onChange={onAmountChange}
            placeholder={variant === 'simple' ? 'Enter your amount' : '50,000'}
            className={cn(
              'flex-1 bg-transparent text-right font-semibold text-lg outline-none',
              variant === 'dark'
                ? 'text-primary-foreground placeholder-primary-foreground/50'
                : 'text-foreground placeholder-muted-foreground'
            )}
          />
        </div>

        {/* Quick Amount Chips */}
        {variant !== 'simple' && (
          <div className="flex gap-2 pt-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? 'primary' : 'secondary'}
                className="flex-1"
                onClick={() => onQuickAmountClick(amount)}
              >
                ${(amount / 1000).toFixed(0)}k
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
