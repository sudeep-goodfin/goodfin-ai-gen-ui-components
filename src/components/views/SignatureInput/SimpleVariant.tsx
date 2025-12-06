import React from 'react';
import { SignatureCanvas } from './SignatureCanvas';

export function SimpleVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground">
        Please provide your signature below to complete the document signing
        process.
      </p>

      <SignatureCanvas />
    </div>
  );
}
