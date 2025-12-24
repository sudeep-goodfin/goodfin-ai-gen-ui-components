import React from 'react';
import { ChatMode } from './InputBar';
import {
  Zap,
  Calendar,
  Target,
  MessageCircle,
  TrendingUp,
  FileText,
  Lightbulb,
  Mic,
  ArrowRight,
  Clock
} from 'lucide-react';

// Section Header Component
function SectionHeader({
  icon,
  title,
  count,
  iconColor = 'text-[#7f7582]'
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className={iconColor}>{icon}</span>
      <span className="text-[14px] leading-4 text-[#7f7582] font-['Soehne_Kraftig',sans-serif] uppercase tracking-wide">
        {title}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}

// Greeting Section
function GreetingSection() {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#F8F8F8]">
          <img src="/conciergeIcon.png" alt="Goodfin AI" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[20px] text-[#48424a] leading-[30.4px] tracking-[-0.7px] font-serif">
          Good afternoon, Alex
        </h1>
      </div>
      <p className="text-[16px] text-[#7f7582] leading-[24px]">
        Your portfolio is up{' '}
        <span className="font-medium text-[#29272a]">$15.4K (+12.4%)</span>{' '}
        this month
      </p>
    </div>
  );
}

// Action Item Component
function ActionItem({
  icon,
  text,
  onClick
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-2 px-3 hover:bg-[#f0eef0] rounded-lg cursor-pointer transition-colors"
    >
      <span className="text-[#7f7582]">{icon}</span>
      <span className="text-[14px] text-[#48424a] leading-5">{text}</span>
    </div>
  );
}

// Action Needed Section
function ActionNeededSection({ onItemClick }: { onItemClick?: (action: string) => void }) {
  const actions = [
    { icon: <Zap className="w-4 h-4 text-[#ff5d78]" />, text: 'SpaceX closes in 2 days - Complete wire transfer' },
    { icon: <FileText className="w-4 h-4" />, text: 'Anthropic - Sign subscription docs' },
    { icon: <MessageCircle className="w-4 h-4" />, text: 'Coffee chat with Sarah M. tomorrow at 2pm' },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<div className="w-3 h-3 rounded-full bg-[#ff5d78]" />}
        title="Action Needed"
        count={3}
      />
      <div className="bg-white rounded-xl border border-[#e6e4e7] overflow-hidden">
        {actions.map((action, idx) => (
          <ActionItem
            key={idx}
            icon={action.icon}
            text={action.text}
            onClick={() => onItemClick?.(action.text)}
          />
        ))}
      </div>
    </div>
  );
}

// This Week Card
function ThisWeekCard({
  date,
  title,
  action,
  actionLabel,
  onClick
}: {
  date?: string;
  title: string;
  action?: string;
  actionLabel: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white rounded-xl border border-[#e6e4e7] p-4 hover:border-[#d4d1d6] hover:shadow-sm cursor-pointer transition-all min-w-[140px]"
    >
      <div className="flex flex-col gap-2">
        {date && (
          <span className="text-[12px] text-[#7f7582] font-medium">{date}</span>
        )}
        <span className="text-[14px] text-[#29272a] font-medium leading-5">{title}</span>
        {action && (
          <span className="text-[13px] text-[#48424a]">{action}</span>
        )}
        <span className="text-[12px] text-[#7f7582] font-medium">[{actionLabel}]</span>
      </div>
    </div>
  );
}

// This Week Section
function ThisWeekSection({ onItemClick }: { onItemClick?: (item: string) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<Calendar className="w-4 h-4" />}
        title="This Week"
      />
      <div className="flex gap-3 overflow-x-auto pb-1">
        <ThisWeekCard
          date="Thu Sep 7"
          title="Pre-All In Brunch"
          actionLabel="RSVP"
          onClick={() => onItemClick?.('event')}
        />
        <ThisWeekCard
          date="Fri Sep 8"
          title="Deal closes"
          action="Databricks"
          actionLabel="Invest"
          onClick={() => onItemClick?.('deal')}
        />
        <ThisWeekCard
          title="New Match"
          action="Coffee Chat"
          actionLabel="View"
          onClick={() => onItemClick?.('coffee')}
        />
      </div>
    </div>
  );
}

// Deal Chip
function DealChip({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 bg-white border border-[#e6e4e7] rounded-full text-[13px] text-[#48424a] hover:border-[#d4d1d6] hover:bg-[#f7f7f8] transition-all"
    >
      {name}
    </button>
  );
}

// Deals For You Section
function DealsForYouSection({ onDealClick }: { onDealClick?: (deal: string) => void }) {
  const deals = ['Anthropic', 'Perplexity', 'Groq'];

  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<Target className="w-4 h-4" />}
        title="Deals For You"
      />
      <div className="bg-white rounded-xl border border-[#e6e4e7] p-4">
        <p className="text-[14px] text-[#48424a] mb-3">
          Based on your interest in AI/ML and previous investments
        </p>
        <div className="flex gap-2 flex-wrap">
          {deals.map((deal) => (
            <DealChip key={deal} name={deal} onClick={() => onDealClick?.(deal)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Community Pulse Section
function CommunityPulseSection() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<MessageCircle className="w-4 h-4" />}
        title="Community Pulse"
      />
      <div className="bg-white rounded-xl border border-[#e6e4e7] p-4 flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#48424a]">
            Member Sentiment: <span className="font-medium">AI/ML Very Bullish</span>, Fintech Neutral
          </span>
        </div>
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#48424a]">
            Hot Topic: "When will Stripe IPO?"
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#48424a]">
            Coffee chats: Popular topics - Tax planning, SPVs
          </span>
        </div>
      </div>
    </div>
  );
}

// Attention Item
function AttentionItem({
  status,
  text,
  actionLabel,
  onClick
}: {
  status: 'urgent' | 'warning';
  text: string;
  actionLabel: string;
  onClick?: () => void;
}) {
  const statusColor = status === 'urgent' ? 'bg-[#ff5d78]' : 'bg-[#ffc107]';

  return (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-[#f0eef0] rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
        <span className="text-[14px] text-[#48424a]">{text}</span>
      </div>
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-[13px] text-[#7f7582] hover:text-[#48424a] transition-colors"
      >
        [{actionLabel} <ArrowRight className="w-3 h-3" />]
      </button>
    </div>
  );
}

// Needs Attention Section
function NeedsAttentionSection({ onItemClick }: { onItemClick?: (action: string) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<Zap className="w-4 h-4" />}
        title="Needs Attention"
      />
      <div className="bg-white rounded-xl border border-[#e6e4e7] overflow-hidden">
        <AttentionItem
          status="urgent"
          text="SpaceX allocation closes in 2 days"
          actionLabel="Complete"
          onClick={() => onItemClick?.('spacex')}
        />
        <AttentionItem
          status="warning"
          text="Anthropic docs ready for signature"
          actionLabel="Sign"
          onClick={() => onItemClick?.('anthropic')}
        />
        <AttentionItem
          status="warning"
          text="New coffee chat matches available"
          actionLabel="Schedule"
          onClick={() => onItemClick?.('coffee')}
        />
      </div>
    </div>
  );
}

// News Card
function NewsCard({
  icon,
  category,
  timestamp,
  title,
  subtitle,
  actionLabel,
  onClick
}: {
  icon: React.ReactNode;
  category: string;
  timestamp?: string;
  title: string;
  subtitle?: string;
  actionLabel: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-[#e6e4e7] p-4 hover:border-[#d4d1d6] hover:shadow-sm cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[12px] text-[#7f7582] font-medium uppercase tracking-wide">{category}</span>
        </div>
        {timestamp && (
          <span className="text-[12px] text-[#7f7582]">{timestamp}</span>
        )}
      </div>
      <p className="text-[14px] text-[#29272a] font-medium mb-1">{title}</p>
      {subtitle && (
        <p className="text-[13px] text-[#7f7582] mb-2">{subtitle}</p>
      )}
      <span className="text-[12px] text-[#7f7582] font-medium">[{actionLabel}]</span>
    </div>
  );
}

// Insights & News Section
function InsightsNewsSection({ onItemClick }: { onItemClick?: (item: string) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeader
        icon={<FileText className="w-4 h-4" />}
        title="Insights & News"
      />
      <div className="flex flex-col gap-3">
        <NewsCard
          icon={<div className="w-3 h-3 rounded-full bg-[#ff5d78]" />}
          category="Breaking"
          timestamp="2 hours ago"
          title="Anthropic announces $2B raise at $20B valuation"
          actionLabel="Read Analysis"
          onClick={() => onItemClick?.('breaking')}
        />
        <NewsCard
          icon={<TrendingUp className="w-4 h-4 text-[#7f7582]" />}
          category="Goodfin Analysis"
          timestamp="Yesterday"
          title='SpaceX: Deep Dive on Starship Economics'
          subtitle='"Why the latest test changes our thesis..."'
          actionLabel="Read More"
          onClick={() => onItemClick?.('analysis')}
        />
        <NewsCard
          icon={<Mic className="w-4 h-4 text-[#7f7582]" />}
          category="Founder Spotlight"
          timestamp="This Week"
          title="Fireside Chat: Perplexity CEO on AI Search"
          actionLabel="Watch Recording"
          onClick={() => onItemClick?.('spotlight')}
        />
        <NewsCard
          icon={<TrendingUp className="w-4 h-4 text-[#7f7582]" />}
          category="Market Update"
          timestamp="Weekly"
          title="Private Markets Pulse: Dec 16-22"
          subtitle="• AI valuations stabilizing after Q3 correction
• Secondary market volume up 15%
• IPO window opening for late 2024"
          actionLabel="Full Report"
          onClick={() => onItemClick?.('market')}
        />
        <NewsCard
          icon={<Lightbulb className="w-4 h-4 text-[#7f7582]" />}
          category="Education"
          title="Understanding Pro-Rata Rights"
          subtitle='"When a company raises a new round, existing investors..."'
          actionLabel="Learn More"
          onClick={() => onItemClick?.('education')}
        />
        <button className="text-[14px] text-[#7f7582] hover:text-[#48424a] transition-colors text-left">
          [View All News →]
        </button>
      </div>
    </div>
  );
}

// Main Component
interface HomeContentV2Props {
  onModeChange?: (mode: ChatMode) => void;
  onStartChat?: (text: string) => void;
  variant?: 'full' | 'compact' | 'action-focused';
}

export function HomeContentV2({
  onModeChange,
  onStartChat,
  variant = 'full'
}: HomeContentV2Props) {
  const handleItemClick = (item: string) => {
    onStartChat?.(item);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-3xl pb-20">
      <div className="flex flex-col gap-8 w-full">
        {/* Always show greeting */}
        <GreetingSection />

        {variant === 'full' && (
          <>
            <ActionNeededSection onItemClick={handleItemClick} />
            <ThisWeekSection onItemClick={handleItemClick} />
            <DealsForYouSection onDealClick={(deal) => onModeChange?.('deals')} />
            <CommunityPulseSection />
            <InsightsNewsSection onItemClick={handleItemClick} />
          </>
        )}

        {variant === 'compact' && (
          <>
            <NeedsAttentionSection onItemClick={handleItemClick} />
            <ThisWeekSection onItemClick={handleItemClick} />
            <DealsForYouSection onDealClick={(deal) => onModeChange?.('deals')} />
          </>
        )}

        {variant === 'action-focused' && (
          <>
            <NeedsAttentionSection onItemClick={handleItemClick} />
            <CommunityPulseSection />
            <InsightsNewsSection onItemClick={handleItemClick} />
          </>
        )}
      </div>
    </div>
  );
}
