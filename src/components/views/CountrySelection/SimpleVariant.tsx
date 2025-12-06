import React from 'react';
import { CountrySearchDropdown } from './CountrySearchDropdown';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Perfect! Now let's get your wire transfer set up.
      </p>
      <p className="text-foreground leading-relaxed">
        First question: <strong>Where will you be wiring from?</strong>
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Please tell me your bank's country (e.g., "United States", "United Kingdom", "Singapore", etc.)
      </p>

      <CountrySearchDropdown />
    </div>
  );
}
