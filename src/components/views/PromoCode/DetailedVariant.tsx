import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { PromoCodeCard } from './PromoCodeCard';

export function DetailedVariantContent() {
  const suggestions = [
    'Where can I find promo codes?',
    'What discounts are available?',
    'Can I apply multiple codes?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Do you have a <strong>promo code</strong> for this investment?
      </p>
      <p className="text-foreground leading-relaxed">
        If so, enter it below. Otherwise, you can skip this step.
      </p>

      <PromoCodeCard />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about promo codes:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
