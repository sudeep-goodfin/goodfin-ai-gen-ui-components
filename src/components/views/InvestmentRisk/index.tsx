import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullVariantContent } from './FullVariant';
import { MinimalVariantContent } from './MinimalVariant';

export type InvestmentRiskVariant = 'full' | 'minimal';

const variants = [
  { id: 'full' as const, label: 'Full Details' },
  { id: 'minimal' as const, label: 'Minimal' },
];

export function InvestmentRiskView() {
  const [variant, setVariant] = useState<InvestmentRiskVariant>('full');

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Risk Acknowledgment"
      userMessage="I'd like to invest 200000"
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
export { RiskCard, riskCardsData } from './RiskCard';
