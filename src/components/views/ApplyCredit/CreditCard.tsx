import React, { useState } from 'react';
import { Card, CardContent, Button, Input } from '../../ui';

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
  const [creditAmount, setCreditAmount] = useState('');

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

        <Input
          placeholder="Enter credit amount"
          value={creditAmount}
          onChange={(e) => setCreditAmount(e.target.value)}
          type="number"
          max={availableCredit}
          min={0}
        />

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
            disabled={!creditAmount || parseFloat(creditAmount) <= 0 || parseFloat(creditAmount) > availableCredit}
          >
            Apply Credit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
