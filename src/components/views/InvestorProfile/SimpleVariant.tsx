import React from 'react';
import { ProfileSelector } from './ProfileSelector';

export function SimpleVariantContent() {
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
    </div>
  );
}
