import React, { useState } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ChatMode } from './InputBar';
import { Greeting } from './Greeting';
import { DealCard } from '../../../../ui/DealCard';
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
  Clock,
  MessageSquare,
  GraduationCap,
  Bell,
  Briefcase,
  Trophy,
  Check,
  Circle,
  Sparkles
} from 'lucide-react';

// Section Header Component - matches v1 style from ResumeInvestmentCard and ExploreGoodfin
function SectionHeader({
  icon,
  title,
  count
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2.5 px-0 py-1">
      <span className="text-[#7f7582]">{icon}</span>
      <span className="text-[14px] leading-4 text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">
        {title}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}

// Action Item Component - styled like v1 list items
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
      className="flex items-center gap-3 py-3 px-4 hover:bg-[#f7f7f8] cursor-pointer transition-colors border-b border-[#e6e4e7] last:border-b-0"
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">{icon}</div>
      <span className="text-[14px] text-[#29272a] leading-5 font-['Soehne',sans-serif]">{text}</span>
    </div>
  );
}

// Action Needed Section
function ActionNeededSection({ onItemClick }: { onItemClick?: (action: string) => void }) {
  const actions = [
    {
      icon: (
        <div className="w-6 h-6 rounded-md overflow-hidden">
          <img src="/icons/products/spaceX.png" alt="SpaceX" className="w-full h-full object-cover" />
        </div>
      ),
      text: 'SpaceX closes in 2 days - Complete wire transfer'
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-md overflow-hidden">
          <img src="/icons/products/anthropic.png" alt="Anthropic" className="w-full h-full object-cover" />
        </div>
      ),
      text: 'Anthropic - Sign subscription docs'
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            alt="Sarah M."
            className="w-full h-full object-cover"
          />
        </div>
      ),
      text: 'Coffee chat with Sarah M. tomorrow at 2pm'
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Zap className="w-4 h-4 text-[#ff5d78]" />}
        title="Action Needed"
        count={3}
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] overflow-hidden">
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

// This Week Card - styled like ExploreGoodfin cards
function ThisWeekCard({
  date,
  title,
  action,
  actionLabel,
  image,
  imageType = 'square',
  onClick
}: {
  date?: string;
  title: string;
  action?: string;
  actionLabel: string;
  image?: string;
  imageType?: 'square' | 'round';
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4 hover:shadow-md cursor-pointer transition-all duration-200 min-w-[160px]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {date && (
              <span className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">{date}</span>
            )}
            <span className="text-[14px] text-[#29272a] font-['Soehne_Kraftig',sans-serif] leading-5">{title}</span>
          </div>
          {image && (
            <div className={`w-10 h-10 ${imageType === 'round' ? 'rounded-full' : 'rounded-lg'} overflow-hidden shrink-0 ml-2`}>
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        {action && (
          <span className="text-[13px] text-[#48424a] font-['Soehne',sans-serif]">{action}</span>
        )}
        <span className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">[{actionLabel}]</span>
      </div>
    </div>
  );
}

// This Week Section
function ThisWeekSection({ onItemClick }: { onItemClick?: (item: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Calendar className="w-4 h-4" />}
        title="This Week"
      />
      <div className="flex gap-3 overflow-x-auto pb-1">
        <ThisWeekCard
          date="Thu Sep 7"
          title="Pre-All In Brunch"
          actionLabel="RSVP"
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop"
          imageType="square"
          onClick={() => onItemClick?.('event')}
        />
        <ThisWeekCard
          date="Fri Sep 8"
          title="Deal closes"
          action="Anthropic"
          actionLabel="Invest"
          image="/icons/products/anthropic.png"
          imageType="square"
          onClick={() => onItemClick?.('deal')}
        />
        <ThisWeekCard
          title="New Match"
          action="Coffee Chat"
          actionLabel="View"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          imageType="round"
          onClick={() => onItemClick?.('coffee')}
        />
      </div>
    </div>
  );
}

// Deals data for the section
const DEALS_FOR_YOU = [
  {
    id: 'anthropic',
    category: 'AI',
    status: 'live' as const,
    title: 'Anthropic',
    description: 'AI safety and research company building reliable, interpretable AI systems',
    image: '/icons/products/anthropic.png',
    investors: ['/icons/products/openAI.png', '/icons/products/spaceX.png'],
    investorNames: ['Spark Capital', 'Menlo Ventures'],
  },
  {
    id: 'perplexity',
    category: 'AI',
    status: 'live' as const,
    title: 'Perplexity',
    description: 'AI-powered answer engine that delivers accurate, real-time answers',
    image: '/icons/products/perplexity.png',
    investors: ['/icons/products/anthropic.png', '/icons/products/openAI.png'],
    investorNames: ['NEA', 'IVP'],
  },
  {
    id: 'groq',
    category: 'AI INFRASTRUCTURE',
    status: 'closing' as const,
    title: 'Groq',
    description: 'Building the fastest AI inference chips for large language models',
    image: '/icons/products/xAI.png',
    investors: ['/icons/products/spaceX.png', '/icons/products/anthropic.png'],
    investorNames: ['Tiger Global', 'D1 Capital'],
  },
];

// Deals For You Section
function DealsForYouSection({ onDealClick }: { onDealClick?: (deal: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Target className="w-4 h-4" />}
        title="Deals For You"
      />
      <p className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif]">
        Based on your interest in AI/ML and previous investments
      </p>
      <ScrollAreaPrimitive.Root className="w-full">
        <ScrollAreaPrimitive.Viewport className="w-full">
          <div className="flex gap-4 pb-4">
            {DEALS_FOR_YOU.map((deal) => (
              <DealCard
                key={deal.id}
                {...deal}
                onClick={() => onDealClick?.(deal.title)}
                className="shrink-0"
              />
            ))}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className="flex h-2.5 touch-none select-none border-t border-t-transparent p-[1px] transition-colors"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[#48424a] hover:bg-[#29272a] transition-colors" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </div>
  );
}

// Community Pulse Section
function CommunityPulseSection() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<MessageCircle className="w-4 h-4" />}
        title="Community Pulse"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Target className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif]">
            Member Sentiment: <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a]">AI/ML Very Bullish</span>, Fintech Neutral
          </span>
        </div>
        <div className="flex items-start gap-3">
          <TrendingUp className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif]">
            Hot Topic: <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a]">"When will Stripe IPO?"</span>
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MessageCircle className="w-4 h-4 text-[#7f7582] mt-0.5" />
          <span className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif]">
            Coffee chats: Popular topics - <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a]">Tax planning, SPVs</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Attention Item - styled like v1 list items
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
    <div className="flex items-center justify-between py-3 px-4 hover:bg-[#f7f7f8] transition-colors border-b border-[#e6e4e7] last:border-b-0">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`} />
        <span className="text-[14px] text-[#29272a] font-['Soehne',sans-serif]">{text}</span>
      </div>
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors"
      >
        [{actionLabel} <ArrowRight className="w-3 h-3" />]
      </button>
    </div>
  );
}

// Needs Attention Section
function NeedsAttentionSection({ onItemClick }: { onItemClick?: (action: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Zap className="w-4 h-4" />}
        title="Needs Attention"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] overflow-hidden">
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

// News Card - styled like v1 cards
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
      className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4 hover:shadow-md cursor-pointer transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] uppercase tracking-wide">{category}</span>
        </div>
        {timestamp && (
          <span className="text-[12px] text-[#7f7582] font-['Soehne',sans-serif]">{timestamp}</span>
        )}
      </div>
      <p className="text-[14px] text-[#29272a] font-['Soehne_Kraftig',sans-serif] mb-1">{title}</p>
      {subtitle && (
        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif] mb-2">{subtitle}</p>
      )}
      <span className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif]">[{actionLabel}]</span>
    </div>
  );
}

// Insights & News Section
function InsightsNewsSection({ onItemClick }: { onItemClick?: (item: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<FileText className="w-4 h-4" />}
        title="Insights & News"
      />
      <div className="flex flex-col gap-3">
        <NewsCard
          icon={<div className="w-2.5 h-2.5 rounded-full bg-[#ff5d78]" />}
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
        <button className="text-[14px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors text-left">
          [View All News →]
        </button>
      </div>
    </div>
  );
}

// Daily Question Section
function DailyQuestionSection({ onVote }: { onVote?: (option: string) => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = [
    'AI Infrastructure',
    'Climate Tech',
    'Defense Tech',
    'Biotech',
    'Something else'
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<MessageSquare className="w-4 h-4" />}
        title="Daily Question"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <p className="text-[16px] text-[#29272a] font-['Soehne_Kraftig',sans-serif] mb-4">
          "What's the most underrated sector for 2025?"
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(option);
                onVote?.(option);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                selectedOption === option
                  ? 'border-[#29272a] bg-[#29272a]/5'
                  : 'border-[#e6e4e7] hover:border-[#9b929e]'
              }`}
            >
              <Circle className={`w-4 h-4 ${selectedOption === option ? 'text-[#29272a]' : 'text-[#9b929e]'}`} />
              <span className="text-[14px] text-[#48424a] font-['Soehne',sans-serif]">{option}</span>
            </button>
          ))}
        </div>
        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif] mb-2">
          234 members have voted • See results after voting
        </p>
        <button className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors">
          [Vote]
        </button>
      </div>
    </div>
  );
}

// Learning Path Progress Section
function LearningPathSection({ onContinue }: { onContinue?: () => void }) {
  const progress = 65;

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<GraduationCap className="w-4 h-4" />}
        title="Your Learning"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <p className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif] mb-2">
          Current Path: <span className="text-[#29272a] font-['Soehne_Kraftig',sans-serif]">Private Market Fundamentals</span>
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-2 bg-[#e6e4e7] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7f7582] to-[#48424a] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[13px] text-[#48424a] font-['Soehne_Kraftig',sans-serif]">{progress}% complete</span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <p className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif]">
            Next up: <span className="text-[#29272a]">Understanding SPV Structures</span>
          </p>
          <button
            onClick={onContinue}
            className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors text-left"
          >
            [Continue Learning →]
          </button>
        </div>

        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif]">
          New courses: <span className="text-[#48424a]">Tax-Efficient Investing • Due Diligence 101</span>
        </p>
      </div>
    </div>
  );
}

// Deal Alerts Section
function DealAlertsSection({ onManageAlerts }: { onManageAlerts?: () => void }) {
  const alerts = [
    { emoji: '🔔', company: 'Perplexity', text: 'Deal you\'re watching closes in 5 days' },
    { emoji: '🏰', company: 'Anduril', text: 'New deal matches your Defense Tech interest' },
    { emoji: '📈', company: 'Groq', text: 'Rising interest from AI-focused members' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Bell className="w-4 h-4" />}
        title="Deal Alerts"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <p className="text-[14px] text-[#7f7582] font-['Soehne',sans-serif] mb-3">
          Based on your interests and watchlist:
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[14px]">{alert.emoji}</span>
              <span className="text-[14px] text-[#48424a] font-['Soehne',sans-serif]">
                <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a]">{alert.company}</span> - {alert.text}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onManageAlerts}
          className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors"
        >
          [Manage Alerts]
        </button>
      </div>
    </div>
  );
}

// Portfolio Company Spotlight Section
function PortfolioSpotlightSection({ onReadMore, onAskConcierge }: { onReadMore?: () => void; onAskConcierge?: () => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Briefcase className="w-4 h-4" />}
        title="Portfolio Company Update"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src="/icons/products/anthropic.png" alt="Anthropic" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[14px] text-[#29272a] font-['Soehne_Kraftig',sans-serif]">ANTHROPIC</p>
            <p className="text-[12px] text-[#7f7582] font-['Soehne',sans-serif]">You invested in Series C</p>
          </div>
        </div>

        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif] mb-2">Latest news:</p>
        <ul className="flex flex-col gap-1 mb-4">
          <li className="text-[14px] text-[#48424a] font-['Soehne',sans-serif]">
            • Raised $2B at $20B valuation <span className="text-[#0a7138]">(+100% since your entry)</span>
          </li>
          <li className="text-[14px] text-[#48424a] font-['Soehne',sans-serif]">
            • Claude 4 launched with multimodal capabilities
          </li>
          <li className="text-[14px] text-[#48424a] font-['Soehne',sans-serif]">
            • Enterprise revenue reportedly 3x YoY
          </li>
        </ul>

        <div className="flex gap-3">
          <button
            onClick={onReadMore}
            className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors"
          >
            [Read Full Update]
          </button>
          <button
            onClick={onAskConcierge}
            className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors"
          >
            [Ask Concierge]
          </button>
        </div>
      </div>
    </div>
  );
}

// Member Milestones Section
function MemberMilestonesSection() {
  const milestones = [
    { completed: true, text: 'First investment: Jan 2023' },
    { completed: true, text: '5 investments completed' },
    { completed: true, text: 'First coffee chat' },
    { completed: false, text: '10 investments (3 more to go!)' },
    { completed: false, text: 'Attend live event' },
    { completed: false, text: 'Complete education path' },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Trophy className="w-4 h-4" />}
        title="Your Milestones"
      />
      <div className="bg-white rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <div className="flex flex-col gap-2 mb-4">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {milestone.completed ? (
                <Check className="w-4 h-4 text-[#0a7138]" />
              ) : (
                <Circle className="w-4 h-4 text-[#9b929e]" />
              )}
              <span className={`text-[14px] font-['Soehne',sans-serif] ${
                milestone.completed ? 'text-[#48424a]' : 'text-[#7f7582]'
              }`}>
                {milestone.text}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif]">
          You've been a member for 2 years 🎉
        </p>
      </div>
    </div>
  );
}

// Concierge Suggestions Section
function ConciergeSuggestionsSection({ onAction }: { onAction?: (action: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <SectionHeader
        icon={<Sparkles className="w-4 h-4" />}
        title="Concierge Suggests"
      />
      <div className="bg-gradient-to-br from-[#f7f7f8] to-[#e9e6ea] rounded-[12px] border border-[#e6e4e7] shadow-[0px_1px_2px_0px_#e3e3e3] p-4">
        <p className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif] mb-2">
          Based on your recent activity:
        </p>
        <p className="text-[15px] text-[#29272a] font-['Soehne',sans-serif] mb-4 leading-relaxed">
          "You've been researching AI deals. Want me to compare Anthropic, Perplexity, and Groq side by side?"
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAction?.('compare')}
            className="px-3 py-1.5 bg-[#29272a] text-white text-[12px] font-['Soehne_Kraftig',sans-serif] rounded-lg hover:bg-[#48424a] transition-colors"
          >
            Yes, compare them
          </button>
          <button
            onClick={() => onAction?.('other')}
            className="px-3 py-1.5 bg-white border border-[#e6e4e7] text-[#48424a] text-[12px] font-['Soehne_Kraftig',sans-serif] rounded-lg hover:border-[#9b929e] transition-colors"
          >
            Something else
          </button>
          <button
            onClick={() => onAction?.('dismiss')}
            className="text-[12px] text-[#7f7582] font-['Soehne_Kraftig',sans-serif] hover:text-[#48424a] transition-colors px-2"
          >
            [Dismiss]
          </button>
        </div>
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
    <div className="flex flex-col items-center justify-center w-full max-w-3xl pb-20">
      <div className="flex flex-col gap-10 grow items-center w-full">
        {/* Always show greeting - reusing v1 Greeting component */}
        <Greeting />

        {variant === 'full' && (
          <>
            <ConciergeSuggestionsSection onAction={(action) => handleItemClick(action)} />
            <ActionNeededSection onItemClick={handleItemClick} />
            <ThisWeekSection onItemClick={handleItemClick} />
            <DealsForYouSection onDealClick={(deal) => onModeChange?.('deals')} />
            <DealAlertsSection onManageAlerts={() => handleItemClick('manage-alerts')} />
            <PortfolioSpotlightSection
              onReadMore={() => handleItemClick('portfolio-update')}
              onAskConcierge={() => handleItemClick('ask-concierge')}
            />
            <LearningPathSection onContinue={() => handleItemClick('continue-learning')} />
            <DailyQuestionSection onVote={(option) => handleItemClick(`vote-${option}`)} />
            <CommunityPulseSection />
            <MemberMilestonesSection />
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
