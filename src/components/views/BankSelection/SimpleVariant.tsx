import React from 'react';
import { BankSearchDropdown } from './BankSearchDropdown';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Great! What's the name of the bank you'll be wiring from?
      </p>
      <p className="text-muted-foreground leading-relaxed">
        (e.g., Chase, Bank of America, Wells Fargo, etc.)
      </p>

      <BankSearchDropdown />
    </div>
  );
}
