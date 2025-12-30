import { useState } from 'react';
import { Copy, Check, Users, Sparkles, Send, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface ReferralCTAProps {
  referralCode?: string;
  referralCredit?: number;
  onCopyLink?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
}

interface TickerCTAProps {
  dealName?: string;
  dealTicker?: string;
  dealLogo?: string;
  onPostSubmit?: (post: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

// Combined props for backwards compatibility
interface PostInvestmentCTAProps extends ReferralCTAProps, TickerCTAProps {}

const REFERRAL_SUGGESTIONS = [
  'How do referral credits work?',
  'Show me trending deals',
];

const TICKER_SUGGESTIONS = [
  'What happens next?',
  'View my dashboard',
];

// AI-generated draft post template
const generateDraftPost = (dealName: string) => {
  return `Just invested in ${dealName} on @Goodfin. Excited about their vision and long-term potential. 🚀`;
};

// Placeholder text
const PLACEHOLDER_TEXT = "Share why you invested in this deal...";

/**
 * Referral CTA Component
 * AI intro text: "If you liked the Goodfin experience, invite friends and earn a $300 credit when they complete their first investment."
 */
export function ReferralCTA({
  referralCode = 'abc123',
  referralCredit = 300,
  onCopyLink,
  onSuggestionClick,
}: ReferralCTAProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = `goodfin.com/invite/${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${referralLink}`);
      setCopied(true);
      onCopyLink?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Referral Card */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200/60">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3
              className="text-[18px] font-medium text-amber-900"
              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
            >
              Invite friends to Goodfin
            </h3>
            <p
              className="text-[14px] text-amber-700/80"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              Earn a ${referralCredit} credit when they complete their first investment
            </p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="flex items-center gap-2 bg-white/80 rounded-xl p-3 border border-amber-200/40">
          <div className="flex-1 min-w-0">
            <p
              className="text-[14px] text-amber-800 truncate font-medium"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {referralLink}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all",
              copied
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            )}
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Follow-up Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-[#c4a882]" />
          <span
            className="text-[13px] font-medium text-[#685f6a]"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            Suggestions
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {REFERRAL_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="px-3 py-1.5 text-[13px] text-[#685f6a] bg-white border border-[#e0dce0] rounded-full hover:bg-[#f7f7f8] hover:border-[#c0bcc0] transition-colors"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Ticker CTA Component
 * AI intro text: "Share why you invested in this deal with the Goodfin community."
 */
export function TickerCTA({
  dealName = 'Anthropic',
  dealTicker = 'ANTHR',
  dealLogo = '/icons/products/anthropic.png',
  onPostSubmit,
  onSuggestionClick,
}: TickerCTAProps) {
  const [postText, setPostText] = useState('');
  const [isEnhanced, setIsEnhanced] = useState(false);

  const charCount = postText.length;
  const minChars = 120;
  const progress = Math.min((charCount / minChars) * 100, 100);
  const isMinMet = charCount >= minChars;
  const charsNeeded = minChars - charCount;

  const handleEnhanceWithAI = () => {
    const enhanced = postText.length > 0
      ? `${postText} 🚀 #Goodfin`
      : generateDraftPost(dealName);
    setPostText(enhanced);
    setIsEnhanced(true);
  };

  return (
    <div className="space-y-4">
      {/* AI Message Header */}
      <div>
        {/* AI Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#f0eef0] mb-4">
          <img
            src="/conciergeIcon.png"
            alt="Goodfin AI"
            className="w-full h-full object-cover"
          />
        </div>
        {/* AI Intro Text */}
        <p
          className="text-[16px] text-[#48424a] leading-relaxed mb-4"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          Share why you invested in this deal with the Goodfin community.
        </p>
      </div>

      {/* Goodfin Ticker - Share Your Investment */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h3
                className="text-[15px] font-medium text-gray-900"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Goodfin Ticker
              </h3>
            </div>
            <span
              className="text-[12px] text-gray-500"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              Share why you invested
            </span>
          </div>
          <p
            className="text-[13px] text-gray-500 leading-relaxed"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            Goodfin Ticker is where investors share insights on deals. Post your take and see what others think.
          </p>
        </div>

        {/* Post Composer */}
        <div className="px-5 py-4">
          {/* Deal Badge + AI Enhance */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={dealLogo}
                alt={dealName}
                className="w-6 h-6 rounded-md object-cover"
              />
              <span
                className="text-[13px] font-medium text-gray-700"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {dealName}
              </span>
              <span
                className="text-[12px] text-gray-400"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                ${dealTicker}
              </span>
            </div>
            {isEnhanced ? (
              <span
                className="flex items-center gap-1 px-2 py-0.5 bg-violet-100 text-violet-600 text-[11px] font-medium rounded-full"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                <Sparkles className="w-3 h-3" />
                AI Enhanced
              </span>
            ) : charCount > 0 ? (
              <button
                onClick={handleEnhanceWithAI}
                className="flex items-center gap-1 px-2.5 py-1 bg-violet-50 hover:bg-violet-100 text-violet-600 text-[11px] font-medium rounded-full transition-colors"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                <Sparkles className="w-3 h-3" />
                Enhance with AI
              </button>
            ) : null}
          </div>

          {/* Editable Post */}
          <div className="relative">
            <textarea
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
                setIsEnhanced(false);
              }}
              placeholder={PLACEHOLDER_TEXT}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-[14px] text-gray-700 leading-relaxed resize-none focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 placeholder:text-gray-400"
              style={{ fontFamily: 'Soehne, sans-serif', minHeight: '80px' }}
            />
          </div>

          {/* Footer: Character Count + Submit */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              {/* Circular Progress Indicator */}
              <div className="relative w-6 h-6">
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke={isMinMet ? '#10b981' : '#3b82f6'}
                    strokeWidth="2"
                    strokeDasharray={`${progress * 0.628} 100`}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                </svg>
                {isMinMet && (
                  <Check className="absolute inset-0 m-auto w-3 h-3 text-emerald-500" />
                )}
              </div>

              {/* Character count text */}
              {!isMinMet && (
                <span
                  className="text-[12px] text-blue-500"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {minChars - charCount} more characters needed
                </span>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onPostSubmit?.(postText)}
                    disabled={!isMinMet}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium rounded-lg transition-all",
                      isMinMet
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-emerald-500/40 text-white cursor-not-allowed"
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    {isMinMet ? (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Post to Ticker
                      </>
                    ) : (
                      <span className="text-white/90">{charsNeeded} more characters</span>
                    )}
                  </button>
                </TooltipTrigger>
                {!isMinMet && (
                  <TooltipContent side="top" className="text-xs">
                    <p>Write at least {minChars} characters to post</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Follow-up Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-[#c4a882]" />
          <span
            className="text-[13px] font-medium text-[#685f6a]"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            Suggestions
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TICKER_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="px-3 py-1.5 text-[13px] text-[#685f6a] bg-white border border-[#e0dce0] rounded-full hover:bg-[#f7f7f8] hover:border-[#c0bcc0] transition-colors"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Combined PostInvestmentCTA - for backwards compatibility
 * Renders both ReferralCTA and TickerCTA together
 */
export function PostInvestmentCTA(props: PostInvestmentCTAProps) {
  return (
    <div className="space-y-6">
      <ReferralCTA
        referralCode={props.referralCode}
        referralCredit={props.referralCredit}
        onCopyLink={props.onCopyLink}
        onSuggestionClick={props.onSuggestionClick}
      />
      <TickerCTA
        dealName={props.dealName}
        dealTicker={props.dealTicker}
        dealLogo={props.dealLogo}
        onPostSubmit={props.onPostSubmit}
        onSuggestionClick={props.onSuggestionClick}
      />
    </div>
  );
}
