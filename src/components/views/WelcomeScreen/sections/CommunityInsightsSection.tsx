import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Share2, Flag, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';
import { CommunityComment, getCommentsForTopic } from '../mockData';

type SummarizeState = 'idle' | 'loading' | 'complete';

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

// Skeleton loading component
function SkeletonLine({ width = '100%', height = '16px' }: { width?: string; height?: string }) {
  return (
    <div
      className="rounded animate-pulse"
      style={{
        width,
        height,
        backgroundColor: colors.grey[200],
      }}
    />
  );
}

// Summary bottom sheet component
function SummaryBottomSheet({
  state,
  topic,
  onClose,
}: {
  state: SummarizeState;
  topic: string;
  onClose: () => void;
}) {
  const mockSummary = {
    title: `Key insights from ${topic} discussions`,
    points: [
      'Investors are optimistic about recent valuation updates and growth trajectory',
      'Several members discussed the upcoming Series F round and allocation availability',
      'Community consensus suggests strong fundamentals despite market volatility',
      'New regulatory developments may impact the timeline for potential IPO',
    ],
    sentiment: 'Mostly positive',
    activeDiscussions: 12,
  };

  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 rounded-t-[16px] sm:rounded-t-[20px] transition-all duration-500 ease-out',
        state === 'idle' ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      )}
      style={{
        backgroundColor: colors.white,
        boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.15)',
        maxHeight: '85%',
        zIndex: 10,
      }}
    >
      {/* Handle bar */}
      <div className="flex justify-center pt-2 sm:pt-3 pb-1 sm:pb-2">
        <div
          className="w-8 sm:w-10 h-1 rounded-full"
          style={{ backgroundColor: colors.grey[300] }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.grey[800] }} />
          <span
            className="text-base sm:text-lg"
            style={{
              fontFamily: '"Test Signifier", serif',
              lineHeight: '24px',
              color: colors.grey[950],
            }}
          >
            AI Summary
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 sm:p-2 rounded-full transition-colors hover:bg-gray-100"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.grey[600] }} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 80px)' }}>
        {state === 'loading' ? (
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Loading skeleton */}
            <SkeletonLine width="70%" height="20px" />
            <div className="flex flex-col gap-2 sm:gap-3 mt-1 sm:mt-2">
              <SkeletonLine width="100%" />
              <SkeletonLine width="95%" />
              <SkeletonLine width="88%" />
              <SkeletonLine width="92%" />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4">
              <SkeletonLine width="100px" height="28px" />
              <SkeletonLine width="80px" height="28px" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Summary title */}
            <h3
              className="text-sm sm:text-base"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '22px',
                color: colors.grey[950],
              }}
            >
              {mockSummary.title}
            </h3>

            {/* Key points */}
            <ul className="flex flex-col gap-2">
              {mockSummary.points.map((point, index) => (
                <li key={index} className="flex gap-2">
                  <span
                    className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: colors.grey[100] }}
                  >
                    <span
                      className="text-[9px] sm:text-[10px]"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: colors.grey[600],
                      }}
                    >
                      {index + 1}
                    </span>
                  </span>
                  <span
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: colors.grey[700],
                    }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2">
              <div
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{ backgroundColor: colors.green[50] }}
              >
                <span
                  className="text-[10px] sm:text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: colors.green[700],
                  }}
                >
                  {mockSummary.sentiment}
                </span>
              </div>
              <div
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                style={{ backgroundColor: colors.grey[100] }}
              >
                <span
                  className="text-[10px] sm:text-xs"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: colors.grey[700],
                  }}
                >
                  {mockSummary.activeDiscussions} active discussions
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Avatar component
function Avatar({ color, initial }: { color: string; initial: string }) {
  return (
    <div
      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span
        className="text-[10px] sm:text-xs"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
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
      className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded transition-colors hover:bg-gray-100"
    >
      <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#6A7282' }} />
      <span
        className="text-[10px] sm:text-xs"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
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
    <div className="flex gap-1.5 sm:gap-2">
      {/* Left side - Avatar and connector line */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <Avatar color={comment.avatarColor} initial={comment.username.charAt(0).toUpperCase()} />
        {hasReplies && (
          <div
            className="w-px flex-1"
            style={{ backgroundColor: '#E5E7EB' }}
          />
        )}
      </div>

      {/* Right side - Content */}
      <div className="flex-1 min-w-0">
        {/* Header - wraps on mobile */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
          <span
            className="text-[11px] sm:text-xs"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: '#101828',
            }}
          >
            {comment.username}
          </span>
          {comment.role && (
            <span
              className="px-1 sm:px-1.5 py-0.5 rounded-md text-[8px] sm:text-[10px]"
              style={{
                backgroundColor: '#F3F4F6',
                border: '1px solid #E5E7EB',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.1172px',
                color: '#4A5565',
              }}
            >
              {comment.role}
            </span>
          )}
          <span
            className="text-[11px] sm:text-xs hidden sm:inline"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#99A1AF',
            }}
          >
            •
          </span>
          <span
            className="text-[10px] sm:text-xs"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#6A7282',
            }}
          >
            {comment.timestamp}
          </span>
          {comment.isEdited && (
            <span
              className="text-[10px] sm:text-xs"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#99A1AF',
              }}
            >
              edited
            </span>
          )}
        </div>

        {/* Content */}
        <p
          className="mb-1.5 sm:mb-2 text-xs sm:text-sm"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            lineHeight: '1.6',
            letterSpacing: '-0.1504px',
            color: '#1E2939',
          }}
        >
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex gap-0.5 sm:gap-1 -ml-1 sm:-ml-1.5 mb-2 sm:mb-3">
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
  const [summarizeState, setSummarizeState] = useState<SummarizeState>('idle');

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
    // Reset summarize state when topic changes
    setSummarizeState('idle');
  };

  const handleSummarize = () => {
    setSummarizeState('loading');
    onSummarize?.();

    // Simulate AI processing time
    setTimeout(() => {
      setSummarizeState('complete');
    }, 2000);
  };

  const handleCloseSummary = () => {
    setSummarizeState('idle');
  };

  return (
    <div className={cn('flex flex-col gap-3 sm:gap-5', className)}>
      {/* Section Header */}
      <h2
        className="text-base sm:text-xl"
        style={{
          fontFamily: '"Test Signifier", serif',
          lineHeight: '1.5',
          color: colors.grey[950],
        }}
      >
        Community Insights
      </h2>

      {/* Topic Tabs - Horizontal scroll on mobile */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 flex-shrink-0"
            style={{
              backgroundColor: selectedTopic === topic ? colors.grey[50] : colors.grey[100],
            }}
          >
            <span
              className="text-xs sm:text-sm whitespace-nowrap"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
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
        className="relative rounded-lg sm:rounded-[10px] overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.73)',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Comments */}
        <div className="p-4 sm:p-8 pb-20 sm:pb-24">
          <div className="flex flex-col gap-3 sm:gap-4">
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
        </div>

        {/* AI Summarize Button - Fixed at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 sm:p-4"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0) 100%)',
          }}
        >
          <button
            onClick={handleSummarize}
            disabled={summarizeState !== 'idle'}
            className={cn(
              'w-full flex items-center justify-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-lg transition-all',
              summarizeState === 'idle' ? 'hover:bg-gray-100' : 'cursor-not-allowed'
            )}
            style={{
              backgroundColor: colors.grey[50],
              opacity: summarizeState !== 'idle' ? 0.6 : 1,
            }}
          >
            <Sparkles
              className={cn('w-4 h-4 sm:w-5 sm:h-5', summarizeState === 'loading' && 'animate-spin')}
              style={{ color: colors.grey[800] }}
            />
            <span
              className="text-sm sm:text-xl"
              style={{
                fontFamily: '"Test Signifier", serif',
                lineHeight: '1.5',
                color: colors.grey[950],
              }}
            >
              {summarizeState === 'loading'
                ? 'Summarizing...'
                : summarizeState === 'complete'
                ? 'View Summary'
                : 'Summarize using AI'}
            </span>
          </button>
        </div>

        {/* Summary Bottom Sheet */}
        <SummaryBottomSheet
          state={summarizeState}
          topic={selectedTopic}
          onClose={handleCloseSummary}
        />
      </div>

      {/* Join Conversation Link */}
      <button
        onClick={onJoinConversation}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
      >
        <span
          className="text-base sm:text-xl"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            lineHeight: '1.5',
            color: colors.grey[950],
          }}
        >
          Join the conversation
        </span>
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.grey[950] }} />
      </button>
    </div>
  );
}

export default CommunityInsightsSection;
