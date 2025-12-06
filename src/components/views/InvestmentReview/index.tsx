import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { OriginalVariantContent, originalVariantAttachments } from './OriginalVariant';
import { CompactVariantContent } from './CompactVariant';

export type InvestmentReviewVariant = 'original' | 'compact';

export const investmentReviewVariants = [
  { id: 'original', label: 'Original' },
  { id: 'compact', label: 'Compact' },
];

type InvestmentReviewChatProps = {
  variant?: InvestmentReviewVariant;
};

export function InvestmentReviewChat({ variant = 'original' }: InvestmentReviewChatProps) {
  const userMessage = variant === 'original'
    ? 'Looks good!'
    : 'This is clear, ready for the next one.';

  return (
    <ChatLayout showInput={false}
      userMessage={userMessage}
      inputPlaceholder="Type 'all clear' to proceed..."
    >
      <ChatMessage
        content={
          variant === 'original'
            ? <OriginalVariantContent />
            : <CompactVariantContent />
        }
        attachments={variant === 'original' ? originalVariantAttachments : undefined}
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { OriginalVariantContent, CompactVariantContent };
