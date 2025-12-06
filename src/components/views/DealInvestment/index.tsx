import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';
import { SimpleVariantContent } from './SimpleVariant';

export type DealInvestmentVariant = 'full' | 'minimal' | 'simple';

const variants = [
  { id: 'full' as const, label: 'Full' },
  { id: 'minimal' as const, label: 'Minimal' },
  { id: 'simple' as const, label: 'Simple' },
];

export function DealPageInvestmentView() {
  const [variant, setVariant] = useState<DealInvestmentVariant>('full');

  const getContent = () => {
    switch (variant) {
      case 'full':
        return <FullVariantContent />;
      case 'minimal':
        return <MinimalVariantContent />;
      case 'simple':
        return <SimpleVariantContent />;
    }
  };

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Databricks IV Investment"
      userMessage="I want to invest in Databricks IV"
      variants={variants}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <ChatMessage content={getContent()} showFeedback={true} />
    </ChatLayout>
  );
}

// Export variants for direct use
export { FullVariantContent, MinimalVariantContent, SimpleVariantContent };
export { AmountSelector } from './AmountSelector';
