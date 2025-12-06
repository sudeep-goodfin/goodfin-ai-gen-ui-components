import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type BankSelectionVariant = 'simple' | 'detailed';

export const bankSelectionVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type BankSelectionViewProps = {
  variant?: BankSelectionVariant;
};

export function BankSelectionView({ variant = 'simple' }: BankSelectionViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="United States">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { BankSearchDropdown } from './BankSearchDropdown';
