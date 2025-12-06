import React, { useState } from 'react';
import { Card, CardContent, Button, Input } from '../../ui';

type PromoCodeCardProps = {
  onApply?: (code: string) => void;
  onSkip?: () => void;
  onContinue?: () => void;
};

export function PromoCodeCard({
  onApply,
  onSkip,
  onContinue,
}: PromoCodeCardProps) {
  const [promoCode, setPromoCode] = useState('');

  const handleApply = () => {
    if (promoCode.trim()) {
      onApply?.(promoCode);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">Promo Code</h3>
          <p className="text-sm text-muted-foreground">
            Do you have a promo code you'd like to apply to this investment?
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleApply}
            disabled={!promoCode.trim()}
          >
            Apply
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onSkip}
          >
            Skip Promo Code
          </Button>
          <Button
            className="flex-1"
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
