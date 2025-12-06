import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type SignatureInputVariant = 'simple' | 'detailed';

const variants = [
  { id: 'simple' as const, label: 'Simple' },
  { id: 'detailed' as const, label: 'Detailed' },
];

export function SignatureInputView() {
  const [variant, setVariant] = useState<SignatureInputVariant>('simple');

  const userMessage = variant === 'simple'
    ? 'Ready to sign'
    : 'I confirm all four items and am ready to proceed with signature.';

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Document Signature"
      userMessage={userMessage}
      variants={variants}
      activeVariant={variant}
      onVariantChange={setVariant}
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
