import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { FullBreakdownVariantContent } from './FullBreakdownVariant';
import { CardViewVariantContent } from './CardViewVariant';

export type DocumentDetailVariant = 'full' | 'card';

const variants = [
  { id: 'full' as const, label: 'Full Breakdown' },
  { id: 'card' as const, label: 'Card View' },
];

export function DocumentDetailView() {
  const [variant, setVariant] = useState<DocumentDetailVariant>('full');

  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Document Review"
      userMessage="Looks good. Let's move on"
      variants={variants}
      activeVariant={variant}
      onVariantChange={setVariant}
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
