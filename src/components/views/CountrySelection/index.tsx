import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type CountrySelectionVariant = 'simple' | 'detailed';

export const countrySelectionVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type CountrySelectionViewProps = {
  variant?: CountrySelectionVariant;
};

export function CountrySelectionView({ variant = 'simple' }: CountrySelectionViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="I don't have a promo code to apply.">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { CountrySearchDropdown } from './CountrySearchDropdown';
