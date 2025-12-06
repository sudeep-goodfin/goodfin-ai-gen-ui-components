import React from 'react';
import { Sparkles } from 'lucide-react';
import { SuggestionGroup } from '../../ui';
import { documentSummaryPoints } from './documentData';

export function FullBreakdownVariantContent() {
  const suggestions = [
    'Can you explain this in simpler terms?',
    'What are the key risks here?',
    'Skip to the next document',
    'Show me the full document',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground">
        Let's take these one at a time so nothing feels overwhelming.
      </p>

      <h3 className="font-semibold text-foreground text-lg pt-2">
        Document 1 of 3: Subscription Agreement & Privacy Notice
      </h3>

      <p className="text-foreground">Here's the short version:</p>

      <p className="leading-relaxed text-foreground">
        This document outlines the Subscription Agreement for Databricks,
        detailing the qualifications and representations required for
        subscribers to participate in the investment. It specifies the criteria
        for various types of investors, including employee benefit plans,
        corporations, partnerships, and individuals, ensuring compliance with
        relevant regulations.
      </p>

      <ul className="space-y-3 mt-2 list-none pl-1">
        {documentSummaryPoints.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="text-muted-foreground/50 mt-1.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2">
        <a
          href="#"
          className="text-accent hover:text-accent/80 font-medium underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-all"
        >
          View Full Document
        </a>
      </div>

      <p className="pt-2 text-muted-foreground italic bg-muted p-3 rounded-lg border border-border">
        Want a quicker recap or is this clear? Just tell me when it feels clear
        and I'll queue the next doc.
      </p>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Quick actions:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
