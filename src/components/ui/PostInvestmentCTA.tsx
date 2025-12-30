import { useState } from 'react';
import { Copy, Check, Calendar, MessageCircle, Users, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostInvestmentCTAProps {
  referralCode?: string;
  referralCredit?: number;
  onCopyLink?: () => void;
  onScheduleCall?: () => void;
  onViewDiscussions?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
}

const FOLLOW_UP_SUGGESTIONS = [
  'How do referral credits work?',
  'What can I ask in a 1:1 call?',
  'Show me trending deals',
];

export function PostInvestmentCTA({
  referralCode = 'abc123',
  referralCredit = 300,
  onCopyLink,
  onScheduleCall,
  onViewDiscussions,
  onSuggestionClick,
}: PostInvestmentCTAProps) {
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
              Earn ${referralCredit} credit when they complete their first investment
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

      {/* Feature Cards Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Schedule Call Card */}
        <button
          onClick={onScheduleCall}
          className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center group-hover:bg-violet-200 transition-colors">
              <Calendar className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="text-[14px] font-medium text-gray-900 mb-0.5"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Schedule a Call
              </h4>
              <p
                className="text-[12px] text-gray-500 leading-snug"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                1:1 with a Goodfin advisor
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all mt-1" />
          </div>
        </button>

        {/* Deal Discussions Card */}
        <button
          onClick={onViewDiscussions}
          className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="text-[14px] font-medium text-gray-900 mb-0.5"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Deal Discussions
              </h4>
              <p
                className="text-[12px] text-gray-500 leading-snug"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                See what investors are saying
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-1" />
          </div>
        </button>
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
          {FOLLOW_UP_SUGGESTIONS.map((suggestion, index) => (
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
