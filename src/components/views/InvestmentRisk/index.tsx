import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';

export type InvestmentRiskVariant = 'full' | 'minimal';

export const investmentRiskVariants = [
  { id: 'full', label: 'Full Details' },
  { id: 'minimal', label: 'Minimal' },
];

type InvestmentRiskViewProps = {
  variant?: InvestmentRiskVariant;
};

export function InvestmentRiskView({ variant = 'full' }: InvestmentRiskViewProps) {
  return (
    <ChatLayout
      title="GoodFin AI"
      subtitle="Risk Acknowledgment"
      userMessage="I'd like to invest 200000"
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
export { RiskCard, riskCardsData } from './RiskCard';
