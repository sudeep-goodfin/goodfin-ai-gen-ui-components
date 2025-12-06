import React, { useState } from 'react';
import { ChatLayout } from '../../chat/ChatLayout';
import { ChatMessage } from '../../chat/ChatMessage';
import { SignableDocumentCard, DocumentStatus } from './SignableDocumentCard';

function SigningContent() {
  const [ppmStatus, setPpmStatus] = useState<DocumentStatus>('pending');

  return (
    <div className="space-y-4">
      <p className="text-foreground">
        I've prepared the documents for your signature. Please review and sign
        the Private Placement Memorandum to proceed.
      </p>

      <div className="space-y-3 pt-2">
        {/* Signed Example */}
        <SignableDocumentCard
          title="Subscription Agreement"
          subtitle="Signed on Oct 24, 2023"
          status="signed"
        />

        {/* Unsigned Example */}
        <SignableDocumentCard
          title="Private Placement Memorandum"
          subtitle="Waiting for signature"
          status={ppmStatus}
          onSign={() => setPpmStatus('signed')}
        />
      </div>

      <p className="text-sm text-muted-foreground pt-2">
        Once signed, we'll process your investment allocation immediately.
      </p>
    </div>
  );
}

export function DocumentAttachmentWithSign() {
  return (
    <ChatLayout
      title="Investment Assistant"
      subtitle="Databricks Investment Review"
      userMessage="I'm ready to sign."
    >
      <ChatMessage content={<SigningContent />} showFeedback={true} />
    </ChatLayout>
  );
}

// Export components for direct use
export { SignableDocumentCard };
export type { DocumentStatus };
