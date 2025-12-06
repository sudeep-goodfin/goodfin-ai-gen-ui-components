import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type ApplyCreditVariant = 'simple' | 'detailed';

export const applyCreditVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type ApplyCreditViewProps = {
  variant?: ApplyCreditVariant;
};

export function ApplyCreditView({ variant = 'simple' }: ApplyCreditViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="Confirmed. Please proceed with this identity">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { CreditCard } from './CreditCard';
