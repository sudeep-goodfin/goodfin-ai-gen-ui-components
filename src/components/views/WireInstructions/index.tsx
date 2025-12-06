import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type WireInstructionsVariant = 'simple' | 'detailed';

export const wireInstructionsVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type WireInstructionsViewProps = {
  variant?: WireInstructionsVariant;
};

export function WireInstructionsView({ variant = 'simple' }: WireInstructionsViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="Yes">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { WireInstructionsCard } from './WireInstructionsCard';
