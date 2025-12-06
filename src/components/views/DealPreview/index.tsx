import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';

export type DealPreviewVariant = 'full' | 'minimal';

export const dealPreviewVariants = [
  { id: 'full', label: 'Full Details' },
  { id: 'minimal', label: 'Minimal' },
];

type DealPreviewViewProps = {
  variant?: DealPreviewVariant;
};

export function DealPreviewView({ variant = 'full' }: DealPreviewViewProps) {
  return (
    <ChatLayout
      title="GoodFin AI"
      subtitle="Deal Preview"
      userMessage="I want to invest in Databricks IV"
    >
      <ChatMessage
        content={variant === 'full' ? <FullVariantContent /> : <MinimalVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { FullVariantContent, MinimalVariantContent };
export { DealCard } from './DealCard';
