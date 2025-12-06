import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Bot, CheckCircle2 } from 'lucide-react';
import { AttachmentCard } from './AttachmentCard';
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
  showFeedback = true
}: ChatMessageProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  return <div className="flex gap-3 max-w-2xl">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
        <Bot className="w-4 h-4 text-white" aria-hidden="true" />
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-4">
        {/* Main Message Bubble */}
        <div className="bg-white rounded-2xl rounded-tl-md p-5 shadow-sm border border-gray-100">
          <div className="prose prose-sm prose-gray max-w-none">{content}</div>
        </div>

        {/* Attachments Section */}
        {attachments.length > 0 && <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
              Reference Documents
            </p>
            <div className="space-y-2">
              {attachments.map((attachment, index) => <AttachmentCard key={index} title={attachment.title} subtitle={attachment.subtitle} href={attachment.href} />)}
            </div>
          </div>}

        {/* Feedback Buttons */}
        {showFeedback && <div className="flex items-center gap-1 pt-1">
            <button onClick={() => setFeedback(feedback === 'up' ? null : 'up')} className={`p-2 rounded-lg transition-all duration-200 ${feedback === 'up' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`} aria-label="Helpful response" aria-pressed={feedback === 'up'}>
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button onClick={() => setFeedback(feedback === 'down' ? null : 'down')} className={`p-2 rounded-lg transition-all duration-200 ${feedback === 'down' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`} aria-label="Not helpful response" aria-pressed={feedback === 'down'}>
              <ThumbsDown className="w-4 h-4" />
            </button>
            {feedback && <span className="text-xs text-gray-500 ml-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Thanks for your feedback
              </span>}
          </div>}
      </div>
    </div>;
}
// Pre-built message content component for the investment docs review
export function InvestmentDocsMessage() {
  return <>
      <p className="text-gray-800 leading-relaxed">
        Great pace—you've reviewed the docs for your investment in{' '}
        <strong>Databricks</strong>.
      </p>
      <p className="text-gray-800 leading-relaxed mt-3">
        These are standard across private funds. Quick confirmations:
      </p>
      <ol className="mt-3 space-y-2 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-semibold">
            1
          </span>
          <span>Accredited investor</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-semibold">
            2
          </span>
          <span>Long-term and illiquid (5-7+ years)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-semibold">
            3
          </span>
          <span>Docs reviewed (PPM, LLOA, Subscription Agreement)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-semibold">
            4
          </span>
          <span>Capital at risk / no guarantees</span>
        </li>
      </ol>
      <p className="text-gray-800 leading-relaxed mt-4 p-3 bg-violet-50 rounded-lg border border-violet-100">
        When these look good, just say <strong>"all clear"</strong> and we'll
        move to your signature.
      </p>
    </>;
}