import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Bot, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

type Attachment = {
  title: string;
  subtitle?: string;
  href?: string;
};

type ChatMessageProps = {
  content: React.ReactNode;
  attachments?: Attachment[];
  showFeedback?: boolean;
};

export function ChatMessage({
  content,
  attachments = [],
  showFeedback = true,
}: ChatMessageProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="flex gap-3 max-w-2xl">
      {/* AI Avatar - Concierge style */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#030303' }}
      >
        <Bot className="w-4 h-4 text-white" aria-hidden="true" />
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-4">
        {/* Main Message Bubble - Exact Concierge ChatBubble styling */}
        <div
          className="p-3 font-primary"
          style={{
            backgroundColor: 'var(--chat-ai-bg)',
            color: 'var(--chat-ai-foreground)',
            borderRadius: '24px',
            boxShadow: 'var(--chat-bubble-inset-shadow)',
          }}
        >
          <div className="prose prose-sm max-w-none" style={{ color: 'var(--chat-ai-foreground)' }}>
            {content}
          </div>
        </div>

        {/* Attachments Section - Concierge reference links style */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <p
              className="text-xs font-medium uppercase tracking-wide px-1"
              style={{ color: '#7F7582' }}
            >
              Reference Documents
            </p>
            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <AttachmentCard
                  key={index}
                  title={attachment.title}
                  subtitle={attachment.subtitle}
                  href={attachment.href}
                />
              ))}
            </div>
          </div>
        )}

        {/* Feedback Buttons */}
        {showFeedback && (
          <div className="flex items-center gap-1 pt-1">
            <button
              onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: feedback === 'up' ? '#D7FFE8' : 'transparent',
                color: feedback === 'up' ? '#049142' : '#9B929E',
              }}
              aria-label="Helpful response"
              aria-pressed={feedback === 'up'}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: feedback === 'down' ? '#FFE0E3' : 'transparent',
                color: feedback === 'down' ? '#D70032' : '#9B929E',
              }}
              aria-label="Not helpful response"
              aria-pressed={feedback === 'down'}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            {feedback && (
              <span
                className="text-xs ml-2 flex items-center gap-1"
                style={{ color: '#7F7582' }}
              >
                <CheckCircle2 className="w-3 h-3" />
                Thanks for your feedback
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type AttachmentCardProps = {
  title: string;
  subtitle?: string;
  href?: string;
};

function AttachmentCard({ title, subtitle = 'PDF Document', href = '#' }: AttachmentCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--chat-card-border)',
        borderRadius: '16px',
      }}
      aria-label={`Open ${title}`}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: '#F0EEF0' }}
      >
        <FileText className="w-5 h-5" style={{ color: '#685F6A' }} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate transition-colors font-primary"
          style={{ color: '#030303' }}
        >
          {title}
        </p>
        <p className="text-xs" style={{ color: '#7F7582' }}>
          {subtitle}
        </p>
      </div>
      <ExternalLink
        className="w-4 h-4 transition-colors flex-shrink-0"
        style={{ color: '#9B929E' }}
        aria-hidden="true"
      />
    </a>
  );
}

export { AttachmentCard };
