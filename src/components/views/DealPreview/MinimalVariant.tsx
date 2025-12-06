import React from 'react';
import { Sparkles } from 'lucide-react';
import { DealCard } from './DealCard';
import { SuggestionGroup } from '../../ui';

export function MinimalVariantContent() {
  const suggestions = [
    'Tell me more about the team',
    'What are the risks?',
    'Show me the financials',
    'How does this compare to competitors?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Here's the Databricks IV investment opportunity. This is a pre-IPO
        investment in one of the leading AI and data infrastructure companies.
      </p>

      <DealCard />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Ask me anything about this deal:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
