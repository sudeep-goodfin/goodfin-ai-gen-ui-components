import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { OriginalVariantContent, originalVariantAttachments } from './OriginalVariant';
import { CompactVariantContent } from './CompactVariant';

export type InvestmentReviewVariant = 'original' | 'compact';

const variants = [
  { id: 'original' as const, label: 'Original' },
  { id: 'compact' as const, label: 'Compact' },
];

export function InvestmentReviewChat() {
  const [variant, setVariant] = useState<InvestmentReviewVariant>('original');

  const userMessage = variant === 'original'
    ? 'Looks good!'
    : 'This is clear, ready for the next one.';

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Databricks Investment Review"
      userMessage={userMessage}
      variants={variants}
      activeVariant={variant}
      onVariantChange={setVariant}
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
