import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { BankSearchDropdown } from './BankSearchDropdown';

export function DetailedVariantContent() {
  const suggestions = [
    'Can I wire from multiple banks?',
    'What are the wire instructions?',
    'How long does the transfer take?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Great! What's the name of the bank you'll be wiring from?
      </p>
      <p className="text-muted-foreground leading-relaxed">
        (e.g., Chase, Bank of America, Wells Fargo, etc.)
      </p>

      <BankSearchDropdown />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about wire transfers:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
