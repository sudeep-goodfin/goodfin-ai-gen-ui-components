import React from 'react';
import { CreditCard } from './CreditCard';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Checking your account... No credit available. Let's move to the next step.
      </p>

      <CreditCard availableCredit={300} />
    </div>
  );
}
