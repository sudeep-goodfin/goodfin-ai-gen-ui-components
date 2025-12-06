import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { CountrySearchDropdown } from './CountrySearchDropdown';

export function DetailedVariantContent() {
  const suggestions = [
    'Can I wire from multiple countries?',
    'Are there country restrictions?',
    'What currencies are supported?',
  ];

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

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about wire transfers:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
