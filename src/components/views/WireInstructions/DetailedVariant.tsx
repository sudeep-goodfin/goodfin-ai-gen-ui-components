import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { WireInstructionsCard } from './WireInstructionsCard';

export function DetailedVariantContent() {
  const suggestions = [
    'How long will the transfer take?',
    'What if I made a mistake?',
    'Can I cancel the wire?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Perfect! Here are your <strong>international wire transfer</strong> instructions for Databricks:
      </p>

      <WireInstructionsCard />

      <p className="text-foreground leading-relaxed">
        Let me know once you've initiated the wire!
      </p>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about wire transfers:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
