import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type PromoCodeVariant = 'simple' | 'detailed';

export const promoCodeVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type PromoCodeViewProps = {
  variant?: PromoCodeVariant;
};

export function PromoCodeView({ variant = 'simple' }: PromoCodeViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="I don't want to apply any credit to this investment.">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { PromoCodeCard } from './PromoCodeCard';
