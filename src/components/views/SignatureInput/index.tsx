import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type SignatureInputVariant = 'simple' | 'detailed';

export const signatureInputVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type SignatureInputViewProps = {
  variant?: SignatureInputVariant;
};

export function SignatureInputView({ variant = 'simple' }: SignatureInputViewProps) {
  const userMessage = variant === 'simple'
    ? 'Ready to sign'
    : 'I confirm all four items and am ready to proceed with signature.';

  return (
    <ChatLayout
      title="GoodFin AI"
      subtitle="Document Signature"
      userMessage={userMessage}
    >
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { SignatureCanvas } from './SignatureCanvas';
