import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';

export type DealPreviewVariant = 'full' | 'minimal';

const variants = [
  { id: 'full' as const, label: 'Full Details' },
  { id: 'minimal' as const, label: 'Minimal' },
];

export function DealPreviewView() {
  const [variant, setVariant] = useState<DealPreviewVariant>('full');

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Friday, December 5th"
      userMessage="I want to invest in Databricks IV"
      variants={variants}
      activeVariant={variant}
      onVariantChange={setVariant}
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
