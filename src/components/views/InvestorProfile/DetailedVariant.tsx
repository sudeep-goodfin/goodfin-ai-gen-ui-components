import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { ProfileSelector } from './ProfileSelector';

export function DetailedVariantContent() {
  const suggestions = [
    'Why is identity verification needed?',
    'How is my data protected?',
    'Can I use a different profile?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Nice — documents are signed.
      </p>
      <p className="text-foreground leading-relaxed">
        Next up is identity verification for your Databricks investment. This is standard for all investors and helps protect you.
      </p>
      <p className="text-foreground leading-relaxed">
        It usually takes under a minute and I'll guide you step by step. Want to knock it out now? If anything is unclear, I'm here to help.
      </p>

      <ProfileSelector />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Questions about verification:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
