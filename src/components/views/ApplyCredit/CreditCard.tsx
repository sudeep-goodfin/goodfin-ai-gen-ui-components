import React, { useState } from 'react';
import { Card, CardContent, Button } from '../../ui';

type CreditCardProps = {
  availableCredit?: number;
  onApply?: (amount: number) => void;
  onSkip?: () => void;
};

export function CreditCard({
  availableCredit = 300,
  onApply,
  onSkip,
}: CreditCardProps) {
  const [creditAmount, setCreditAmount] = useState(availableCredit.toString());

  const handleApply = () => {
    const amount = parseFloat(creditAmount);
    if (!isNaN(amount) && amount > 0 && amount <= availableCredit) {
      onApply?.(amount);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">Apply Credit</h3>
          <p className="text-sm text-muted-foreground">
            You have ${availableCredit.toLocaleString()} in available credit. How much would you like to apply to this investment?
          </p>
        </div>

        {/* Input with $ prefix */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
        >
          <span className="text-muted-foreground font-medium">$</span>
          <input
            type="number"
            placeholder="Enter credit amount"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            max={availableCredit}
            min={0}
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onSkip}
          >
            Skip Credit
          </Button>
          <Button
            className="flex-1"
            onClick={handleApply}
          >
            Apply Credit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
