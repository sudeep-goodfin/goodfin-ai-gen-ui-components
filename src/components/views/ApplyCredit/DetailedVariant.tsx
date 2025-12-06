import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { CreditCard } from './CreditCard';

export function DetailedVariantContent() {
  const suggestions = [
    'How do I earn more credit?',
    'What is the credit limit?',
    'Can I apply credit later?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Checking your account... No credit available. Let's move to the next step.
      </p>

      <CreditCard availableCredit={300} />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about credit:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
