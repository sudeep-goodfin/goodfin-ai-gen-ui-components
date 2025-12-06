import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';
import { SimpleVariantContent } from './SimpleVariant';

export type DealInvestmentVariant = 'full' | 'minimal' | 'simple';

export const dealInvestmentVariants = [
  { id: 'full', label: 'Full' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'simple', label: 'Simple' },
];

type DealPageInvestmentViewProps = {
  variant?: DealInvestmentVariant;
};

export function DealPageInvestmentView({ variant = 'full' }: DealPageInvestmentViewProps) {
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
    <ChatLayout showInput={false}
      userMessage="I want to invest in Databricks IV"
    >
      <ChatMessage content={getContent()} showFeedback={true} />
    </ChatLayout>
  );
}

// Export variants for direct use
export { FullVariantContent, MinimalVariantContent, SimpleVariantContent };
export { AmountSelector } from './AmountSelector';
