import React from 'react';
import { PromoCodeCard } from './PromoCodeCard';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Do you have a <strong>promo code</strong> for this investment?
      </p>
      <p className="text-foreground leading-relaxed">
        If so, enter it below. Otherwise, you can skip this step.
      </p>

      <PromoCodeCard />
    </div>
  );
}
