import React from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullBreakdownVariantContent } from './FullBreakdownVariant';
import { CardViewVariantContent } from './CardViewVariant';

export type DocumentDetailVariant = 'full' | 'card';

export const documentDetailVariants = [
  { id: 'full', label: 'Full Breakdown' },
  { id: 'card', label: 'Card View' },
];

type DocumentDetailViewProps = {
  variant?: DocumentDetailVariant;
};

export function DocumentDetailView({ variant = 'full' }: DocumentDetailViewProps) {
  return (
    <ChatLayout
      title="GoodFin AI"
      subtitle="Document Review"
      userMessage="Looks good. Let's move on"
    >
      <ChatMessage
        content={
          variant === 'full'
            ? <FullBreakdownVariantContent />
            : <CardViewVariantContent />
        }
        showFeedback={true}
      />
    </ChatLayout>
  );
}

// Export variants for direct use
export { FullBreakdownVariantContent, CardViewVariantContent };
export { documentSummaryPoints } from './documentData';
