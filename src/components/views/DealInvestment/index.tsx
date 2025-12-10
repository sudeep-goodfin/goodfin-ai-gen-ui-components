import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';
import { SimpleVariantContent } from './SimpleVariant';
import { Block04VariantContent } from './Block04Variant';

export type DealInvestmentVariant = 'full' | 'minimal' | 'simple' | 'block-04';

export const dealInvestmentVariants = [
  { id: 'full', label: 'Full' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'simple', label: 'Simple' },
  { id: 'block-04', label: 'Block 04' },
];

type DealPageInvestmentViewProps = {
  variant?: DealInvestmentVariant;
  showPresets?: boolean;
  showStepper?: boolean;
  showSuggestions?: boolean;
};

export function DealPageInvestmentView({
  variant = 'full',
  showPresets = true,
  showStepper = true,
  showSuggestions = true
}: DealPageInvestmentViewProps) {
  const getContent = () => {
    switch (variant) {
      case 'full':
        return <FullVariantContent />;
      case 'minimal':
        return <MinimalVariantContent />;
      case 'simple':
        return <SimpleVariantContent />;
      case 'block-04':
        return <Block04VariantContent showPresets={showPresets} showStepper={showStepper} showSuggestions={showSuggestions} />;
    }
  };

  const getUserMessage = () => {
    if (variant === 'block-04') {
      return 'I want to invest in Goodfin - Y Combinator YC 2025 Fund';
    }
    return 'I want to invest in Databricks IV';
  };

  return (
    <ChatLayout showInput={false}
      userMessage={getUserMessage()}
    >
      <ChatMessage content={getContent()} showFeedback={true} />
    </ChatLayout>
  );
}

// Export variants for direct use
export { FullVariantContent, MinimalVariantContent, SimpleVariantContent, Block04VariantContent };
export { AmountSelector } from './AmountSelector';
