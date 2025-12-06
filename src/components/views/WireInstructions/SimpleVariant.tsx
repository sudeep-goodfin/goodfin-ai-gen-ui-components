import React from 'react';
import { WireInstructionsCard } from './WireInstructionsCard';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Perfect! Here are your <strong>international wire transfer</strong> instructions for Databricks:
      </p>

      <WireInstructionsCard />

      <p className="text-foreground leading-relaxed">
        Let me know once you've initiated the wire!
      </p>
    </div>
  );
}
