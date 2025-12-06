import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SimpleVariantContent } from './SimpleVariant';
import { DetailedVariantContent } from './DetailedVariant';

export type InvestorProfileVariant = 'simple' | 'detailed';

export const investorProfileVariants = [
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
];

type InvestorProfileViewProps = {
  variant?: InvestorProfileVariant;
};

export function InvestorProfileView({ variant = 'simple' }: InvestorProfileViewProps) {
  return (
    <ChatLayout showInput={false} userMessage="I have read the documents, and fully acknowledge the risks. Signed. [Name]">
      <ChatMessage
        content={variant === 'simple' ? <SimpleVariantContent /> : <DetailedVariantContent />}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { SimpleVariantContent, DetailedVariantContent };
export { ProfileSelector } from './ProfileSelector';
