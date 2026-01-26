import React, { useState, useEffect, useRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Greeting } from '../Welcome02/components/dashboard/Greeting';
import { InputBarV02 } from '../Welcome02/components/dashboard/InputBarV02';
import { ChatMode } from '../Welcome02/components/dashboard/InputBar';
import { ChatHistorySidebar } from '../Welcome02/components/dashboard/ChatHistorySidebar';
import { ArrowLeft, Sparkles, TrendingUp, Star, Newspaper, X, UserPlus, User, ChevronRight, Building2, Users, Calendar, Globe, ExternalLink, Settings } from 'lucide-react';
import { svgPaths as localSvgPaths } from '../Welcome02/svgPaths';
import { cn } from '../../../lib/utils';
import { Shimmer } from '../../ui/Shimmer';
import { GoodfinAILogo } from '../Welcome02/components/dashboard/GoodfinAILogo';
import stripeLogo from '../Welcome02/assets/deal-stripe.png';

// Featured companies with latest news and details
const FEATURED_COMPANIES = [
  {
    id: 'spacex',
    name: 'SpaceX',
    category: 'SPACE TECH',
    image: '/icons/products/spaceX.png',
    news: 'Starship completes successful orbital test flight, marking major milestone for Mars mission timeline.',
    valuation: '$350B',
    founded: '2002',
    headquarters: 'Hawthorne, CA',
    employees: '13,000+',
    website: 'spacex.com',
    description: 'Space Exploration Technologies Corp. designs, manufactures, and launches advanced rockets and spacecraft. The company was founded with the goal of reducing space transportation costs and enabling the colonization of Mars.',
    highlights: [
      'Leading commercial space launch provider globally',
      'Developed reusable rocket technology with Falcon 9',
      'Starlink satellite internet constellation with 5,000+ satellites',
      'NASA Commercial Crew Program partner for ISS missions',
    ],
    metrics: { revenue: '$8.7B', growth: '+42%', funding: '$9.9B' },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'FINTECH',
    image: stripeLogo,
    news: 'Expands payment infrastructure to 10 new markets, reports 25% revenue growth in Q4.',
    valuation: '$65B',
    founded: '2010',
    headquarters: 'San Francisco, CA',
    employees: '8,000+',
    website: 'stripe.com',
    description: 'Stripe is a financial infrastructure platform for businesses. Millions of companies use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.',
    highlights: [
      'Processes hundreds of billions in payments annually',
      'Powers payments for 50+ countries',
      'Trusted by Amazon, Google, Salesforce, and more',
      'Comprehensive suite: payments, billing, treasury, issuing',
    ],
    metrics: { revenue: '$14B', growth: '+25%', funding: '$8.7B' },
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'AI',
    image: '/icons/products/anthropic.png',
    news: 'Launches Claude 4 with enhanced reasoning capabilities, secures $2B in new funding.',
    valuation: '$18B',
    founded: '2021',
    headquarters: 'San Francisco, CA',
    employees: '500+',
    website: 'anthropic.com',
    description: 'Anthropic is an AI safety company building reliable, interpretable, and steerable AI systems. Founded by former OpenAI research leaders, the company focuses on developing AI that is safe and beneficial.',
    highlights: [
      'Developer of Claude, a leading AI assistant',
      'Pioneer in AI safety and constitutional AI research',
      'Strategic partnerships with Amazon and Google',
      'Focus on interpretability and alignment research',
    ],
    metrics: { revenue: '$850M', growth: '+300%', funding: '$7.3B' },
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'AI',
    image: '/icons/products/openAI.png',
    news: 'Reaches 200M weekly active users, announces enterprise partnership with major tech firms.',
    valuation: '$157B',
    founded: '2015',
    headquarters: 'San Francisco, CA',
    employees: '1,500+',
    website: 'openai.com',
    description: 'OpenAI is an AI research and deployment company dedicated to ensuring that artificial general intelligence benefits all of humanity. Creator of GPT-4, DALL-E, and ChatGPT.',
    highlights: [
      'ChatGPT reached 100M users in 2 months',
      'GPT-4 powers thousands of enterprise applications',
      'Strategic partnership with Microsoft ($13B investment)',
      'Leading the frontier of large language models',
    ],
    metrics: { revenue: '$3.4B', growth: '+400%', funding: '$14B' },
  },
];

// Suggestion prompts for research and news
const SUGGESTIONS = [
  { id: '1', text: "What's the latest news on SpaceX?", icon: <Sparkles className="w-4 h-4" /> },
  { id: '2', text: "Research Anthropic's market position", icon: <TrendingUp className="w-4 h-4" /> },
  { id: '3', text: "Compare AI companies valuations", icon: <Star className="w-4 h-4" /> },
];

// Deep Research Reports
const DEEP_RESEARCH_REPORTS = [
  {
    id: 'spacex-research',
    company: 'SpaceX',
    title: 'SpaceX: Path to Mars and Beyond',
    summary: 'Comprehensive analysis of SpaceX\'s Starship program, revenue projections, and competitive positioning in the commercial space industry.',
    date: 'Jan 24, 2026',
    readTime: '12 min read',
    image: '/icons/products/spaceX.png',
  },
  {
    id: 'anthropic-research',
    company: 'Anthropic',
    title: 'Anthropic: The AI Safety Imperative',
    summary: 'Deep dive into Anthropic\'s Constitutional AI approach, enterprise adoption, and market differentiation strategy.',
    date: 'Jan 22, 2026',
    readTime: '10 min read',
    image: '/icons/products/anthropic.png',
  },
  {
    id: 'stripe-research',
    company: 'Stripe',
    title: 'Stripe: Fintech Infrastructure Leader',
    summary: 'Analysis of Stripe\'s expansion into financial services, international growth, and path to profitability.',
    date: 'Jan 20, 2026',
    readTime: '8 min read',
    image: stripeLogo,
  },
];

// Latest News
const LATEST_NEWS = [
  {
    id: 'news-1',
    headline: 'SpaceX Starship Achieves Full Orbital Flight',
    source: 'TechCrunch',
    time: '2 hours ago',
    category: 'Space',
  },
  {
    id: 'news-2',
    headline: 'Anthropic Raises $2B at $18B Valuation',
    source: 'Bloomberg',
    time: '5 hours ago',
    category: 'AI',
  },
  {
    id: 'news-3',
    headline: 'Stripe Expands to 10 New Markets in APAC',
    source: 'Reuters',
    time: '8 hours ago',
    category: 'Fintech',
  },
  {
    id: 'news-4',
    headline: 'OpenAI Enterprise Adoption Surges 300%',
    source: 'WSJ',
    time: '1 day ago',
    category: 'AI',
  },
];

// Maximum prompts for non-registered users
const MAX_PROMPTS = 5;

// Company News Card Component - Premium Investment Card
function CompanyNewsCard({
  company,
  onClick,
  onLearnMore
}: {
  company: typeof FEATURED_COMPANIES[0];
  onClick?: () => void;
  onLearnMore?: () => void;
}) {
  const isPositiveGrowth = company.metrics.growth.startsWith('+');

  return (
    <div
      className="group relative bg-white rounded-[20px] border border-[#e8e6ea] overflow-hidden transition-all duration-300 hover:border-[#d4d0d6] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,245,235,0.5) 0%, rgba(255,230,210,0.3) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Logo with subtle ring */}
            <div className="relative">
              <div className="w-11 h-11 rounded-[12px] overflow-hidden bg-gradient-to-br from-[#f8f7f9] to-[#f0eef1] p-[1px]">
                <div className="w-full h-full rounded-[11px] overflow-hidden bg-white">
                  <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Online indicator dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-white" />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[#1a1a1a] tracking-[-0.01em]">{company.name}</h3>
              <span className="text-[10px] text-[#8a8490] font-medium uppercase tracking-[0.08em]">{company.category}</span>
            </div>
          </div>

          {/* Valuation badge */}
          <div className="text-right">
            <div className="text-[11px] text-[#8a8490] font-medium mb-0.5">Valuation</div>
            <div className="text-[15px] font-bold text-[#1a1a1a] tracking-[-0.02em]">{company.valuation}</div>
          </div>
        </div>

        {/* News content */}
        <div
          onClick={onClick}
          className="cursor-pointer mb-4"
        >
          <p className="text-[13px] text-[#4a464d] leading-[1.6] line-clamp-2">{company.news}</p>
        </div>

        {/* Metrics row */}
        <div className="flex items-center gap-3 mb-4 py-3 border-t border-b border-[#f0eef1]">
          <div className="flex-1">
            <div className="text-[10px] text-[#8a8490] font-medium uppercase tracking-wide mb-1">Revenue</div>
            <div className="text-[13px] font-semibold text-[#1a1a1a]">{company.metrics.revenue}</div>
          </div>
          <div className="w-px h-8 bg-[#e8e6ea]" />
          <div className="flex-1">
            <div className="text-[10px] text-[#8a8490] font-medium uppercase tracking-wide mb-1">Growth</div>
            <div className={cn(
              "text-[13px] font-semibold",
              isPositiveGrowth ? "text-[#16a34a]" : "text-[#dc2626]"
            )}>
              {company.metrics.growth}
            </div>
          </div>
          <div className="w-px h-8 bg-[#e8e6ea]" />
          <div className="flex-1">
            <div className="text-[10px] text-[#8a8490] font-medium uppercase tracking-wide mb-1">Funding</div>
            <div className="text-[13px] font-semibold text-[#1a1a1a]">{company.metrics.funding}</div>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore?.();
            }}
            className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white text-[12px] font-medium transition-all duration-200 hover:bg-[#2d2d2d] hover:gap-2"
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-[#8a8490]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff954a] animate-pulse" />
            <span>Active opportunity</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Company Detail Page Component - Production Layout (matches AWS repo design)
function CompanyDetailPage({
  company,
  onBack,
  onAskAI
}: {
  company: typeof FEATURED_COMPANIES[0];
  onBack: () => void;
  onAskAI: (query: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'highlights' | 'details' | 'news'>('highlights');

  const tabs = [
    { id: 'highlights', label: 'Highlights' },
    { id: 'details', label: 'Key Details' },
    { id: 'news', label: 'News' },
  ] as const;

  return (
    <div className="flex-1 bg-[#f4f3f5] overflow-hidden flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 min-h-full">

            {/* Left Column - Main Content (2/3) */}
            <div className="lg:col-span-2 flex flex-col">

              {/* Title Card Section */}
              <div className="relative">
                <div className="px-6 py-6">
                  {/* Back Button */}
                  <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#69606d] hover:text-[#29272a] transition-colors mb-6"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Centered Content */}
                  <div className="flex flex-col items-center text-center max-w-[650px] mx-auto">
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
                      <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Company Name */}
                    <h1 className="text-[24px] font-serif text-[#29272a] mb-4">{company.name}</h1>

                    {/* Description */}
                    <p className="text-[15px] text-[#69606d] leading-relaxed mb-6">
                      {company.description}
                    </p>

                    {/* Metrics Row */}
                    <div className="w-full border-t border-[#dfdce1] pt-6 mt-2">
                      <div className="grid grid-cols-3 gap-4 max-w-[500px] mx-auto">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[11px] text-[#69606d] uppercase tracking-wide">Revenue</span>
                          <span className="text-[15px] font-semibold text-[#29272a]">{company.metrics.revenue}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[11px] text-[#69606d] uppercase tracking-wide">Valuation</span>
                          <span className="text-[15px] font-semibold text-[#29272a]">{company.valuation}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[11px] text-[#69606d] uppercase tracking-wide">Growth</span>
                          <span className="text-[15px] font-semibold text-[#22c55e]">{company.metrics.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="px-6 py-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => {
                      onAskAI(`Run a Deep Research report on ${company.name}`);
                      onBack();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e4e7] rounded-full text-[13px] text-[#48424a] hover:border-[#c5bfc6] hover:shadow-sm transition-all"
                  >
                    <span className="px-1.5 py-0.5 bg-[#29272a] text-white text-[10px] font-medium rounded">new</span>
                    Run a Deep Research report on {company.name}
                  </button>
                  <button
                    onClick={() => {
                      onAskAI(`What makes ${company.name} an interesting opportunity?`);
                      onBack();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e4e7] rounded-full text-[13px] text-[#48424a] hover:border-[#c5bfc6] hover:shadow-sm transition-all"
                  >
                    What makes {company.name} an interesting opportunity?
                  </button>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="px-6 pb-6">
                {/* Tab Headers */}
                <div className="flex gap-6 border-b border-[#e6e4e7] mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "pb-3 text-[14px] font-medium border-b-2 transition-colors -mb-px",
                        activeTab === tab.id
                          ? "border-[#29272a] text-[#29272a]"
                          : "border-transparent text-[#69606d] hover:text-[#48424a]"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                  {activeTab === 'highlights' && (
                    <div className="space-y-4">
                      {company.highlights.map((highlight, idx) => (
                        <div key={idx} className="bg-[#faf8f6] p-4 rounded-lg">
                          <p className="text-[14px] text-[#48424a] leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="bg-[#faf8f6] rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[12px] text-[#69606d]">Founded</span>
                          <p className="text-[14px] font-medium text-[#29272a]">{company.founded}</p>
                        </div>
                        <div>
                          <span className="text-[12px] text-[#69606d]">Headquarters</span>
                          <p className="text-[14px] font-medium text-[#29272a]">{company.headquarters}</p>
                        </div>
                        <div>
                          <span className="text-[12px] text-[#69606d]">Employees</span>
                          <p className="text-[14px] font-medium text-[#29272a]">{company.employees}</p>
                        </div>
                        <div>
                          <span className="text-[12px] text-[#69606d]">Total Funding</span>
                          <p className="text-[14px] font-medium text-[#29272a]">{company.metrics.funding}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'news' && (
                    <div className="bg-[#faf8f6] rounded-lg p-4">
                      <p className="text-[14px] text-[#48424a] leading-relaxed">{company.news}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar (1/3) */}
            <div className="lg:col-span-1 bg-[#f4f3f5] lg:bg-transparent p-6 lg:pr-6 lg:pl-0 lg:py-6">
              <div className="lg:sticky lg:top-6 space-y-4">

                {/* Valuation Card */}
                <div className="bg-gradient-to-br from-[#fff8f0] to-[#ffefe0] rounded-xl p-4 border border-[#ffe4c9]">
                  <span className="text-[11px] text-[#a86c4a] font-medium uppercase tracking-wide">Valuation</span>
                  <p className="text-[24px] font-bold text-[#29272a] mt-1">{company.valuation}</p>
                </div>

                {/* Metrics */}
                <div className="bg-white rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#69606d]">Revenue</span>
                    <span className="text-[13px] font-semibold text-[#29272a]">{company.metrics.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#69606d]">Growth</span>
                    <span className="text-[13px] font-semibold text-[#22c55e]">{company.metrics.growth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#69606d]">Total Funding</span>
                    <span className="text-[13px] font-semibold text-[#29272a]">{company.metrics.funding}</span>
                  </div>
                </div>

                {/* Company Info */}
                <div className="bg-white rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#69606d]" />
                    <span className="text-[12px] text-[#69606d]">Founded</span>
                    <span className="text-[13px] font-medium text-[#29272a] ml-auto">{company.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#69606d]" />
                    <span className="text-[12px] text-[#69606d]">HQ</span>
                    <span className="text-[13px] font-medium text-[#29272a] ml-auto">{company.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#69606d]" />
                    <span className="text-[12px] text-[#69606d]">Employees</span>
                    <span className="text-[13px] font-medium text-[#29272a] ml-auto">{company.employees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#69606d]" />
                    <span className="text-[12px] text-[#69606d]">Website</span>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium text-[#ff954a] hover:underline ml-auto flex items-center gap-1"
                    >
                      {company.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    onAskAI(`Tell me everything about ${company.name} - their business model, financials, competitive advantages, and risks`);
                    onBack();
                  }}
                  className="w-full h-12 rounded-xl text-white text-[14px] font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(90deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 100%), #373338',
                    boxShadow: '0 2px 4px 0 rgba(190, 185, 192, 0.64), 2px 2px 2px 0 rgba(255, 255, 255, 0.14) inset',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Dive deep with Goodfin Go
                </button>

                {/* Deep Research Report Button */}
                <button
                  onClick={() => {
                    onAskAI(`Generate a deep research report for ${company.name}`);
                    onBack();
                  }}
                  className="w-full p-4 rounded-xl text-left overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #fff8f0 0%, #ffe8d4 50%, #ffd4b8 100%)',
                  }}
                >
                  <span className="text-[13px] font-medium text-[#29272a]">Deep Research Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

// Prompt Counter Badge Component with Profile - Minimal Design
function PromptCounterBadge({ count, max, onClick }: { count: number; max: number; onClick?: () => void }) {
  const remaining = max - count;
  const isLow = remaining <= 1;
  const isEmpty = remaining <= 0;
  const progress = count / max;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full transition-all duration-200',
        'bg-white/80 backdrop-blur-sm border',
        isEmpty ? 'border-[#e8a87c]/40' : 'border-[#e6e4e7]',
        'hover:bg-white hover:shadow-sm hover:border-[#d0cdd2]'
      )}
    >
      {/* Tooltip - Bottom Position */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#29272a] text-white text-[11px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {isEmpty ? 'Sign up for unlimited access' : 'Click to manage account'}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#29272a]" />
      </div>

      {/* Profile circle with progress indicator */}
      <div className="relative">
        {/* Background track */}
        <svg className="absolute -inset-0.5 w-7 h-7" viewBox="0 0 28 28">
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke="#e6e4e7"
            strokeWidth="2"
          />
        </svg>
        {/* Progress arc - primary color */}
        <svg className="absolute -inset-0.5 w-7 h-7" viewBox="0 0 28 28">
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="none"
            stroke={isEmpty ? '#d97b4a' : isLow ? '#e8a060' : '#ff954a'}
            strokeWidth="2"
            strokeDasharray={`${progress * 75.4} 75.4`}
            strokeLinecap="round"
            transform="rotate(-90 14 14)"
            className="transition-all duration-500"
          />
        </svg>
        {/* Filled profile circle */}
        <div className={cn(
          'relative w-6 h-6 rounded-full flex items-center justify-center transition-colors',
          isEmpty ? 'bg-[#d97b4a]' : 'bg-[#ff954a]'
        )}>
          <User className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Text */}
      <span className={cn(
        'text-[12px] font-medium tracking-tight transition-colors',
        isEmpty ? 'text-[#a86c4a]' : 'text-[#48424a]'
      )}>
        {remaining > 0 ? `${remaining} prompt${remaining !== 1 ? 's' : ''} left` : 'Sign up'}
      </span>
    </button>
  );
}

// Registration Modal Component - Minimal, Clean Design
function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRegister = () => {
    console.log('Registration clicked - would redirect to registration');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - subtle blur */}
      <div
        className={cn(
          "absolute inset-0 bg-[#29272a]/20 backdrop-blur-[2px] transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal - minimal white card */}
      <div
        className={cn(
          "relative w-full max-w-[340px] bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden transition-all duration-300 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        )}
      >
        {/* Subtle warm accent line at top */}
        <div className="h-[3px] bg-gradient-to-r from-[#ffcfa8] via-[#ffb87a] to-[#ffcfa8]" />

        <div className="p-6">
          {/* Close button - minimal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#a09a9f] hover:text-[#69606d] hover:bg-[#f0eef0] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="pr-6">
            <h3 className="text-[17px] font-semibold text-[#29272a] tracking-tight mb-1.5">
              Create your account
            </h3>
            <p className="text-[13px] text-[#69606d] leading-relaxed mb-6">
              Unlimited research queries. Personalized insights. Full access to Goodfin Go.
            </p>
          </div>

          {/* Single CTA - prominent */}
          <button
            onClick={handleRegister}
            className="w-full h-11 rounded-xl bg-[#29272a] text-white text-[14px] font-medium tracking-tight hover:bg-[#3d3a3e] active:scale-[0.98] transition-all"
          >
            Get started free
          </button>

          {/* Subtle dismiss */}
          <button
            onClick={onClose}
            className="w-full mt-2 py-2 text-[13px] text-[#a09a9f] hover:text-[#69606d] transition-colors"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}

// Header Actions Component
interface HeaderActionsProps {
  isInChat: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  promptCount: number;
  maxPrompts: number;
  onProfileClick: () => void;
}

function HeaderActions({ isInChat, onToggleHistory, onNewChat, promptCount, maxPrompts, onProfileClick }: HeaderActionsProps) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      {/* Left side - Chat History Toggle */}
      <button
        onClick={onToggleHistory}
        className="p-2 hover:bg-black/5 rounded-lg transition-colors"
        title="Chat History"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.sidebarLeft} fill="#69606d" />
        </svg>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side - Compose then Prompt Counter */}
      <div className="flex items-center gap-2">
        {!isInChat && (
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            title="New Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d={localSvgPaths.pencilCompose} fill="#69606d" />
            </svg>
          </button>
        )}
        <PromptCounterBadge count={promptCount} max={maxPrompts} onClick={onProfileClick} />
      </div>
    </div>
  );
}

// Conversation Header Component
interface ConversationHeaderProps {
  onToggleHistory: () => void;
  onBack: () => void;
  onNewChat: () => void;
  title: string;
  titleOverflow: boolean;
  promptCount: number;
  maxPrompts: number;
  onProfileClick: () => void;
}

function ConversationHeader({
  onToggleHistory,
  onBack,
  onNewChat,
  title,
  titleOverflow,
  promptCount,
  maxPrompts,
  onProfileClick,
}: ConversationHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#e6e4e7] bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button
          onClick={onToggleHistory}
          className="p-2 hover:bg-black/5 rounded-lg transition-colors shrink-0"
          title="Chat History"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d={localSvgPaths.sidebarLeft} fill="#69606d" />
          </svg>
        </button>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#69606d] hover:text-[#29272a] hover:bg-black/5 transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-medium hidden sm:inline">Back</span>
        </button>

        <div className="h-5 w-px bg-[#d0cdd2] shrink-0" />

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-[15px] font-semibold text-[#29272a] truncate">
            {title}{titleOverflow && '...'}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f0eef0] text-[11px] font-medium text-[#69606d] border border-[#e6e4e7] shrink-0">
            Goodfin Go
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onNewChat}
          className="p-2 hover:bg-black/5 rounded-lg transition-colors"
          title="New Chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d={localSvgPaths.pencilCompose} fill="#69606d" />
          </svg>
        </button>
        <PromptCounterBadge count={promptCount} max={maxPrompts} onClick={onProfileClick} />
      </div>
    </div>
  );
}

interface GoodfinGoDashboardProps {
  isInConversation?: boolean;
  onStartConversation?: (message: string, tab?: string) => void;
  onEndConversation?: () => void;
  onUpdateConversationTitle?: (title: string) => void;
  onRequestBack?: () => void;
  initialMessage?: string | null;
  onInitialMessageConsumed?: () => void;
}

export function GoodfinGoDashboard({
  isInConversation: externalIsInConversation,
  onStartConversation,
  onEndConversation,
  onUpdateConversationTitle,
  onRequestBack,
  initialMessage,
  onInitialMessageConsumed,
}: GoodfinGoDashboardProps) {
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof FEATURED_COMPANIES[0] | null>(null);

  // Chat state - start in active mode if there's an initial message
  const [chatState, setChatState] = useState<{
    isActive: boolean;
    messages: Array<{ role: 'user' | 'ai'; content: string }>;
    isThinking: boolean;
    streamingContent: string;
    thinkingStartTime: number | null;
    thinkingDuration: number | null;
  }>(() => {
    if (initialMessage) {
      return {
        isActive: true,
        messages: [{ role: 'user', content: initialMessage }],
        isThinking: true,
        streamingContent: "",
        thinkingStartTime: Date.now(),
        thinkingDuration: null
      };
    }
    return { isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: null };
  });

  // Animation state for first render
  const [hasAnimated, setHasAnimated] = useState(false);

  // Track if initial message has been processed
  const initialMessageProcessedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Store callbacks in refs to avoid stale closures
  const onStartConversationRef = useRef(onStartConversation);
  const onInitialMessageConsumedRef = useRef(onInitialMessageConsumed);

  useEffect(() => {
    onStartConversationRef.current = onStartConversation;
    onInitialMessageConsumedRef.current = onInitialMessageConsumed;
  });

  // Handle initial message from marketing page - trigger AI response
  useEffect(() => {
    if (initialMessage && !initialMessageProcessedRef.current) {
      initialMessageProcessedRef.current = true;

      // Increment prompt count for initial message
      setPromptCount(prev => prev + 1);

      // Notify parent about conversation start
      onStartConversationRef.current?.(initialMessage, 'goodfin-ai');

      // Start AI response after a brief delay
      const timer = setTimeout(() => {
        // Calculate thinking duration and stop thinking indicator
        setChatState(prev => {
          const duration = prev.thinkingStartTime
            ? Math.round((Date.now() - prev.thinkingStartTime) / 1000)
            : 1;
          return { ...prev, isThinking: false, thinkingDuration: duration };
        });

        // Determine response based on message content
        const lowerText = initialMessage.toLowerCase();
        let response: string;
        if (lowerText.includes('accredited') || lowerText.includes('anthropic') || lowerText.includes('openai')) {
          response = "I'd love to help you with that! However, this deal requires accredited investor status. Let me show you the Goodfin Go page where you can explore deals available to all investors and learn how to become accredited.";
        } else {
          response = "Welcome to Goodfin Go! I can help you explore investment opportunities available to all investors. We have public secondary market deals in companies like SpaceX and Stripe. Would you like to learn more about these opportunities or find out how to access our full catalog?";
        }

        // Start streaming
        let idx = 0;
        const chunks = response.match(/.{1,12}/g) || [];
        const streamInterval = setInterval(() => {
          if (idx < chunks.length) {
            setChatState(prev => ({
              ...prev,
              streamingContent: prev.streamingContent + chunks[idx]
            }));
            idx++;
          } else {
            clearInterval(streamInterval);
            setChatState(prev => ({
              ...prev,
              messages: [...prev.messages, { role: 'ai', content: response }],
              streamingContent: ""
            }));
          }
        }, 60);

        onInitialMessageConsumedRef.current?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [initialMessage]);

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
  };

  // Trigger AI response streaming for a given message
  const triggerAIResponse = (text: string, currentPromptCount?: number) => {
    // Calculate thinking duration and stop thinking indicator
    setChatState(prev => {
      const duration = prev.thinkingStartTime
        ? Math.round((Date.now() - prev.thinkingStartTime) / 1000)
        : 1;
      return { ...prev, isThinking: false, thinkingDuration: duration };
    });

    // Check if user is asking about premium deals or accreditation
    const lowerText = text.toLowerCase();
    let response: string;
    if (lowerText.includes('accredited') || lowerText.includes('anthropic') || lowerText.includes('openai')) {
      response = "I'd love to help you with that! However, this deal requires accredited investor status. Let me show you the Goodfin Go page where you can explore deals available to all investors and learn how to become accredited.";
    } else {
      response = "Welcome to Goodfin Go! I can help you explore investment opportunities available to all investors. We have public secondary market deals in companies like SpaceX and Stripe. Would you like to learn more about these opportunities or find out how to access our full catalog?";
    }

    // Add limit warning if this is the last free prompt
    if (currentPromptCount === MAX_PROMPTS) {
      response += "\n\nNote: This was your last free query for today. Register for a free account to continue using Goodfin Go with unlimited access.";
    }

    let idx = 0;
    const chunks = response.match(/.{1,12}/g) || [];
    const streamInterval = setInterval(() => {
      if (idx < chunks.length) {
        setChatState(prev => ({
          ...prev,
          streamingContent: prev.streamingContent + chunks[idx]
        }));
        idx++;
      } else {
        clearInterval(streamInterval);
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, { role: 'ai', content: response }],
          streamingContent: ""
        }));
      }
    }, 60);
  };

  const handleStartChat = (text: string) => {
    // Check if limit reached
    if (promptCount >= MAX_PROMPTS) {
      setShowRegistrationModal(true);
      return;
    }

    // Increment prompt count
    const newCount = promptCount + 1;
    setPromptCount(newCount);

    onStartConversation?.(text, 'goodfin-ai');

    setChatState({
      isActive: true,
      messages: [{ role: 'user', content: text }],
      isThinking: true,
      streamingContent: "",
      thinkingStartTime: Date.now(),
      thinkingDuration: null,
    });

    // Simulate AI response delay then trigger streaming
    setTimeout(() => {
      triggerAIResponse(text, newCount);
    }, 1500);
  };

  const handleBack = () => {
    if (onRequestBack) {
      onRequestBack();
    } else {
      setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: null });
      onEndConversation?.();
    }
  };

  const handleToggleHistory = () => {
    setIsHistoryDrawerOpen(prev => !prev);
  };

  const handleNewChat = () => {
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "", thinkingStartTime: null, thinkingDuration: null });
    setCurrentMode('default');
  };

  const handleSelectChat = (chatId: string) => {
    setIsHistoryDrawerOpen(false);
  };

  // If a company is selected, show the company detail page
  if (selectedCompany) {
    return (
      <CompanyDetailPage
        company={selectedCompany}
        onBack={() => setSelectedCompany(null)}
        onAskAI={handleStartChat}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f7f7f8]">
      {/* Chat History Sidebar */}
      <ChatHistorySidebar
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      {/* Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_46_10003)'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial_46_10003)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_46_10003' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_46_10003'%3E%3Crect width='1440' height='981' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      />

      {/* Top Header Row */}
      <div className="relative z-10 w-full">
        {chatState.isActive ? (
          <ConversationHeader
            onToggleHistory={handleToggleHistory}
            onBack={handleBack}
            onNewChat={handleNewChat}
            title={chatState.messages.find(m => m.role === 'user')?.content?.slice(0, 40) || 'New Conversation'}
            titleOverflow={(chatState.messages.find(m => m.role === 'user')?.content?.length || 0) > 40}
            promptCount={promptCount}
            maxPrompts={MAX_PROMPTS}
            onProfileClick={() => setShowRegistrationModal(true)}
          />
        ) : (
          <HeaderActions
            isInChat={chatState.isActive}
            onToggleHistory={handleToggleHistory}
            onNewChat={handleNewChat}
            promptCount={promptCount}
            maxPrompts={MAX_PROMPTS}
            onProfileClick={() => setShowRegistrationModal(true)}
          />
        )}
      </div>

      {/* Main Content */}
      <ScrollAreaPrimitive.Root className="relative z-10 flex-1 w-full overflow-hidden">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-none [&>div]:!block">
          <div className="flex flex-col items-center p-6 gap-8 w-full min-h-full">
            {chatState.isActive ? (
              /* Chat Interface */
              <div className="w-full max-w-3xl mt-6 space-y-4">
                {chatState.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-3">
                        <GoodfinAILogo size={32} />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        msg.role === 'user'
                          ? "bg-[#29272a] text-white"
                          : "bg-white border border-[#e6e4e7] text-[#29272a]"
                      )}
                    >
                      {/* Show thinking duration for AI messages */}
                      {msg.role === 'ai' && chatState.thinkingDuration !== null && (
                        <span className="block text-[12px] font-medium text-[#a09a9f] mb-2">
                          thought for {chatState.thinkingDuration} sec{chatState.thinkingDuration !== 1 ? 's' : ''}
                        </span>
                      )}
                      <p className="text-[14px] leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {/* AI Thinking/Streaming State */}
                {(chatState.isThinking || chatState.streamingContent) && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-3">
                      <GoodfinAILogo size={32} />
                    </div>
                    <div className="max-w-[80%] bg-white border border-[#e6e4e7] rounded-2xl px-4 py-3 text-[#29272a]">
                      <div className="space-y-2">
                        {/* Thinking State with Shimmer */}
                        {chatState.isThinking ? (
                          <Shimmer
                            className="text-[14px] font-medium"
                            duration={1.2}
                            spread={3}
                            textColor="hsl(0 0% 65%)"
                            shimmerColor="hsl(0 0% 20%)"
                          >
                            thinking about your question...
                          </Shimmer>
                        ) : chatState.thinkingDuration !== null && (
                          <span className="text-[12px] font-medium text-[#a09a9f]">
                            thought for {chatState.thinkingDuration} sec{chatState.thinkingDuration !== 1 ? 's' : ''}
                          </span>
                        )}
                        {/* Streaming Response */}
                        {chatState.streamingContent && (
                          <p className="text-[14px] leading-relaxed">
                            {chatState.streamingContent}
                            <span className="inline-block w-0.5 h-4 bg-[#29272a]/70 ml-0.5 animate-pulse align-middle" />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Landing Page Content */
              <div className="w-full max-w-3xl mt-10 space-y-8">
                {/* Greeting with Portfolio Summary */}
                <div
                  className={cn(
                    'transition-all duration-700 ease-out',
                    !hasAnimated
                      ? 'opacity-0 blur-md translate-y-4'
                      : 'opacity-100 blur-0 translate-y-0'
                  )}
                >
                  <Greeting
                    title="Welcome back"
                    customDescription="Based on your interests, here are top company insights, deep research, and the latest news."
                  />
                </div>

                {/* Trending pre-IPO Companies Section */}
                <div
                  className={cn(
                    'transition-all duration-700 ease-out delay-200',
                    !hasAnimated
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-100 translate-y-0'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-[#69606d]" />
                      <span className="text-[13px] font-semibold text-[#29272a]">Trending pre-IPO Companies</span>
                    </div>
                    <button
                      className="flex items-center gap-1.5 text-[11px] text-[#a09a9f] hover:text-[#69606d] transition-colors group"
                      onClick={() => {/* TODO: Open preferences modal */}}
                    >
                      <span>Based on your interests</span>
                      <Settings className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-200" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FEATURED_COMPANIES.map((company) => (
                      <CompanyNewsCard
                        key={company.id}
                        company={company}
                        onClick={() => setSelectedCompany(company)}
                        onLearnMore={() => setSelectedCompany(company)}
                      />
                    ))}
                  </div>
                </div>

                {/* Deep Research Reports Section */}
                <div
                  className={cn(
                    'transition-all duration-700 ease-out delay-300',
                    !hasAnimated
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-100 translate-y-0'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#69606d]" />
                      <span className="text-[13px] font-semibold text-[#29272a]">Deep Research Reports</span>
                    </div>
                    <button className="text-[11px] text-[#ff954a] font-medium hover:underline">View all</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DEEP_RESEARCH_REPORTS.map((report) => (
                      <div
                        key={report.id}
                        onClick={() => handleStartChat(`Show me the deep research report on ${report.company}`)}
                        className="group bg-white rounded-[16px] border border-[#e6e4e7] overflow-hidden hover:border-[#c5bfc6] hover:shadow-sm transition-all cursor-pointer"
                      >
                        {/* Gradient Header */}
                        <div
                          className="h-20 relative"
                          style={{
                            background: 'linear-gradient(135deg, #fff8f0 0%, #ffe8d4 50%, #ffd4b8 100%)',
                          }}
                        >
                          <div className="absolute bottom-3 left-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm">
                              <img src={report.image} alt={report.company} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-[14px] font-semibold text-[#29272a] mb-2 line-clamp-1">{report.title}</h3>
                          <p className="text-[12px] text-[#69606d] line-clamp-2 mb-3">{report.summary}</p>
                          <div className="flex items-center justify-between text-[11px] text-[#a09a9f]">
                            <span>{report.date}</span>
                            <span>{report.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest News Section */}
                <div
                  className={cn(
                    'transition-all duration-700 ease-out delay-400',
                    !hasAnimated
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-100 translate-y-0'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-[#69606d]" />
                      <span className="text-[13px] font-semibold text-[#29272a]">Latest News</span>
                    </div>
                    <button className="text-[11px] text-[#ff954a] font-medium hover:underline">View all</button>
                  </div>
                  <div className="bg-white rounded-[16px] border border-[#e6e4e7] divide-y divide-[#e6e4e7]">
                    {LATEST_NEWS.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => handleStartChat(`Tell me more about: ${news.headline}`)}
                        className="flex items-center justify-between p-4 hover:bg-[#faf9fa] transition-colors cursor-pointer"
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-[14px] font-medium text-[#29272a] mb-1 line-clamp-1">{news.headline}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#a09a9f]">
                            <span>{news.source}</span>
                            <span>•</span>
                            <span>{news.time}</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-[#f0eef0] text-[10px] font-medium text-[#69606d] rounded-md shrink-0">
                          {news.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors hover:bg-black/5"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[#d0cdd2] hover:bg-[#beb9c0] transition-colors" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>

      {/* Sticky Bottom Input Bar */}
      <div className="relative z-20 w-full flex justify-center p-6 bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/80 to-transparent">
        <div className="w-full max-w-3xl">
          {promptCount >= MAX_PROMPTS ? (
            <div
              onClick={() => setShowRegistrationModal(true)}
              className="cursor-pointer"
            >
              <div className="relative">
                <InputBarV02
                  currentMode={currentMode}
                  onModeChange={handleModeChange}
                  onSubmit={handleStartChat}
                  isInConversation={chatState.isActive}
                  suggestions={[]}
                  placeholder="Daily limit reached - Register for unlimited access"
                  restrictedModes={['deals', 'portfolio']}
                />
                <div className="absolute inset-0 bg-white/50 rounded-[20px] pointer-events-none" />
              </div>
            </div>
          ) : (
            <InputBarV02
              currentMode={currentMode}
              onModeChange={handleModeChange}
              onSubmit={handleStartChat}
              isInConversation={chatState.isActive}
              suggestions={!chatState.isActive ? SUGGESTIONS : []}
              onSuggestionClick={(s) => handleStartChat(s.text)}
              placeholder={chatState.isActive ? "Follow up..." : "Research private companies..."}
              restrictedModes={['deals', 'portfolio']}
            />
          )}
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
}
