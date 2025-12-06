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
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-chat-ai-gradient-from to-chat-ai-gradient-to rounded-full flex items-center justify-center shadow-md">
        <Bot className="w-4 h-4 text-white" aria-hidden="true" />
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-4">
        {/* Main Message Bubble */}
        <div className="bg-card text-card-foreground rounded-2xl rounded-tl-md p-5 shadow-sm border border-border">
          <div className="prose prose-sm max-w-none">{content}</div>
        </div>

        {/* Attachments Section */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
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
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                feedback === 'up'
                  ? 'bg-success/10 text-success'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              aria-label="Helpful response"
              aria-pressed={feedback === 'up'}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                feedback === 'down'
                  ? 'bg-destructive/10 text-destructive'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              aria-label="Not helpful response"
              aria-pressed={feedback === 'down'}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            {feedback && (
              <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
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
      className="group flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-info/50 hover:bg-info/5 transition-all duration-200 cursor-pointer"
      aria-label={`Open ${title}`}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-info rounded-lg flex items-center justify-center shadow-sm">
        <FileText className="w-5 h-5 text-info-foreground" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-info transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ExternalLink
        className="w-4 h-4 text-muted-foreground group-hover:text-info transition-colors flex-shrink-0"
        aria-hidden="true"
      />
    </a>
  );
}

export { AttachmentCard };
