import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Share2, Flag } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';
import { CommunityComment, getCommentsForTopic } from '../mockData';

type CommunityInsightsSectionProps = {
  topics: string[];
  comments?: CommunityComment[]; // Optional - if not provided, will use topic-based comments
  onJoinConversation?: () => void;
  onSummarize?: () => void;
  onTopicChange?: (topic: string) => void;
  onReply?: (commentId: string) => void;
  onShare?: (commentId: string) => void;
  onReport?: (commentId: string) => void;
  className?: string;
};

// Avatar component
function Avatar({ color, initial }: { color: string; initial: string }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          lineHeight: '16px',
          color: colors.white,
        }}
      >
        {initial}
      </span>
    </div>
  );
}

// Action button component
function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-1.5 py-1 rounded transition-colors hover:bg-gray-100"
    >
      <Icon className="w-4 h-4" style={{ color: '#6A7282' }} />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          color: '#6A7282',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </button>
  );
}

// Single comment component
function CommentNode({
  comment,
  hasReplies,
  onReply,
  onShare,
  onReport,
}: {
  comment: CommunityComment;
  hasReplies?: boolean;
  onReply?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}) {
  return (
    <div className="flex gap-2">
      {/* Left side - Avatar and connector line */}
      <div className="flex flex-col items-center gap-2">
        <Avatar color={comment.avatarColor} initial={comment.username.charAt(0).toUpperCase()} />
        {hasReplies && (
          <div
            className="w-px flex-1"
            style={{ backgroundColor: '#E5E7EB' }}
          />
        )}
      </div>

      {/* Right side - Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#101828',
            }}
          >
            {comment.username}
          </span>
          {comment.role && (
            <span
              className="px-1.5 py-0.5 rounded-md"
              style={{
                backgroundColor: '#F3F4F6',
                border: '1px solid #E5E7EB',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '13px',
                letterSpacing: '0.1172px',
                color: '#4A5565',
              }}
            >
              {comment.role}
            </span>
          )}
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#99A1AF',
            }}
          >
            •
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#6A7282',
            }}
          >
            {comment.timestamp}
          </span>
          {comment.isEdited && (
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#99A1AF',
              }}
            >
              edited
            </span>
          )}
        </div>

        {/* Content */}
        <p
          className="mb-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22.75px',
            letterSpacing: '-0.1504px',
            color: '#1E2939',
          }}
        >
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex gap-1 -ml-1.5 mb-3">
          <ActionButton icon={MessageSquare} label="Reply" onClick={onReply} />
          <ActionButton icon={Share2} label="Share" onClick={onShare} />
          <ActionButton icon={Flag} label="Report" onClick={onReport} />
        </div>

        {/* Replies */}
        {comment.replies?.map((reply) => (
          <CommentNode
            key={reply.id}
            comment={reply}
            onReply={onReply}
            onShare={onShare}
            onReport={onReport}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * CommunityInsightsSection
 *
 * Section showing forum-style community comments with tabs,
 * threaded replies, and AI summarization.
 * Matches Figma design.
 */
export function CommunityInsightsSection({
  topics,
  comments: externalComments,
  onJoinConversation,
  onSummarize,
  onTopicChange,
  onReply,
  onShare,
  onReport,
  className,
}: CommunityInsightsSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  // Get comments based on selected topic (use external comments if provided, otherwise fetch by topic)
  const displayComments = useMemo(() => {
    if (externalComments) {
      return externalComments;
    }
    return getCommentsForTopic(selectedTopic);
  }, [externalComments, selectedTopic]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    onTopicChange?.(topic);
  };

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* Section Header */}
      <h2
        style={{
          fontFamily: '"Test Signifier", serif',
          fontSize: '20px',
          lineHeight: '30px',
          color: colors.grey[950],
        }}
      >
        Community Insights
      </h2>

      {/* Topic Tabs */}
      <div className="flex gap-1 flex-wrap">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className="px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: selectedTopic === topic ? colors.grey[50] : colors.grey[100],
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: selectedTopic === topic ? colors.grey[950] : colors.grey[500],
              }}
            >
              {topic}
            </span>
          </button>
        ))}
      </div>

      {/* Forum Thread Container */}
      <div
        className="rounded-[10px] p-8 pt-8"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.73)',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Comments */}
        <div className="flex flex-col gap-4">
          {displayComments.map((comment) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              hasReplies={!!comment.replies?.length}
              onReply={() => onReply?.(comment.id)}
              onShare={() => onShare?.(comment.id)}
              onReport={() => onReport?.(comment.id)}
            />
          ))}
        </div>

        {/* AI Summarize Button */}
        <button
          onClick={onSummarize}
          className="w-full flex items-center justify-center gap-2.5 p-3 rounded-lg mt-6 transition-colors hover:bg-gray-100"
          style={{
            backgroundColor: colors.grey[50],
          }}
        >
          <Sparkles className="w-5 h-5" style={{ color: colors.grey[800] }} />
          <span
            style={{
              fontFamily: '"Test Signifier", serif',
              fontSize: '20px',
              lineHeight: '30px',
              color: colors.grey[950],
            }}
          >
            Summarize the conversations using AI
          </span>
        </button>
      </div>

      {/* Join Conversation Link */}
      <button
        onClick={onJoinConversation}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '30px',
            color: colors.grey[950],
          }}
        >
          Join the conversation
        </span>
        <ArrowRight className="w-6 h-6" style={{ color: colors.grey[950] }} />
      </button>
    </div>
  );
}

export default CommunityInsightsSection;
