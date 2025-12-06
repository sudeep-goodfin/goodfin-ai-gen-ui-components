import React from 'react';
import { ChatLayout } from './ChatLayout';
import { ChatMessage } from './ChatMessage';

type ConversationMessage = {
  type: 'user' | 'ai';
  content: React.ReactNode;
  attachments?: { title: string; subtitle?: string; href?: string }[];
};

type ConversationViewProps = {
  messages: ConversationMessage[];
  componentPreview?: React.ReactNode;
  componentPreviewIndex?: number; // Which message index to insert the component after
};

// User message bubble component
function UserMessage({ content }: { content: React.ReactNode }) {
  return (
    <div className="flex justify-end mb-6">
      <div
        className="font-primary"
        style={{
          backgroundColor: '#F0EEF0',
          color: '#030303',
          borderRadius: '16px',
          padding: '8px 12px',
          maxWidth: '450px',
          boxShadow: '0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.50) inset',
        }}
      >
        <div className="text-sm leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

export function ConversationView({
  messages,
  componentPreview,
  componentPreviewIndex = 1,
}: ConversationViewProps) {
  return (
    <ChatLayout>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message.type === 'user' ? (
            <UserMessage content={message.content} />
          ) : (
            <div className="mb-6">
              <ChatMessage
                content={message.content}
                attachments={message.attachments}
                showFeedback={index === messages.length - 1}
              />
            </div>
          )}

          {/* Insert component preview after specified message */}
          {componentPreview && index === componentPreviewIndex && (
            <div className="mb-6">
              {componentPreview}
            </div>
          )}
        </React.Fragment>
      ))}
    </ChatLayout>
  );
}

// Pre-built conversation templates for different component types
export const conversationTemplates = {
  'deal-preview': [
    { type: 'user' as const, content: 'Show me the latest investment opportunity' },
    {
      type: 'ai' as const,
      content: (
        <p>
          I found a great opportunity for you. Here's the deal preview with all the key details including the investment terms, timeline, and expected returns.
        </p>
      ),
    },
    { type: 'user' as const, content: 'This looks interesting. What are the risks?' },
    {
      type: 'ai' as const,
      content: (
        <p>
          I'll prepare a detailed risk assessment for you. Let me know if you'd like to proceed with the investment.
        </p>
      ),
    },
  ],
  'deal-page-investment': [
    { type: 'user' as const, content: 'I want to invest in this deal' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Great choice! Let me help you set up your investment. Please select your investment amount below.
        </p>
      ),
    },
    { type: 'user' as const, content: 'I want to invest $25,000' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Perfect. I've set up your investment for $25,000. Please review the details and confirm when ready.
        </p>
      ),
    },
  ],
  'investment-risk': [
    { type: 'user' as const, content: 'What are the risks of this investment?' },
    {
      type: 'ai' as const,
      content: (
        <p>
          I've analyzed the key risk factors for this investment. Here's a breakdown of the potential risks you should consider before proceeding.
        </p>
      ),
    },
    { type: 'user' as const, content: 'How does this compare to similar investments?' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Compared to similar investments in this sector, the risk profile is moderate. The main differentiators are the management team's experience and the market positioning.
        </p>
      ),
    },
  ],
  'investment-review': [
    { type: 'user' as const, content: 'Can you review my investment documents?' },
    {
      type: 'ai' as const,
      content: (
        <p>
          I've reviewed your investment documents. Here's a summary of the key points and important sections you should pay attention to.
        </p>
      ),
      attachments: [
        { title: 'Investment Agreement', subtitle: 'PDF Document' },
        { title: 'Risk Disclosure', subtitle: 'PDF Document' },
      ],
    },
  ],
  'document-detail': [
    { type: 'user' as const, content: 'Show me the details of this document' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Here's the detailed breakdown of the document. I've highlighted the key sections and summarized the important points for your review.
        </p>
      ),
    },
  ],
  'signature-input': [
    { type: 'user' as const, content: 'I need to sign the investment documents' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Please provide your signature below to complete the investment process. Your signature will be applied to all required documents.
        </p>
      ),
    },
  ],
  'document-signing': [
    { type: 'user' as const, content: 'Which documents do I need to sign?' },
    {
      type: 'ai' as const,
      content: (
        <p>
          Here are the documents that require your signature. Please review each document carefully before signing.
        </p>
      ),
    },
    { type: 'user' as const, content: "I've reviewed them, ready to sign" },
    {
      type: 'ai' as const,
      content: (
        <p>
          Great! Please sign each document below. Once completed, I'll process your investment.
        </p>
      ),
    },
  ],
};
