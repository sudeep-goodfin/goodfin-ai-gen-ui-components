import React, { useState } from 'react';
import { ProgressWidget } from './ProgressWidget';
import { NewsContent } from './NewsContent';
import { EventsContent } from './EventsContent';
import { ChatMode } from './InputBar';
import PortfolioSummary from '../../imports/Frame2147228782';
import { DealsCardsGrid } from './DealsCardsGrid';
import { cn } from '../../../../../lib/utils';
import {
    Search,
    TrendingUp,
    Newspaper,
    FileText,
    Calendar,
    Briefcase,
    ArrowRight,
    Building2,
    Zap,
    Globe,
    ExternalLink,
    Target,
    DollarSign,
    Clock,
    Sparkles,
    Heart
} from 'lucide-react';

export interface SuggestionItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: string;
    onClick?: () => void;
}

export function SuggestionCard({ icon, title, subtitle, action, onClick }: SuggestionItemProps) {
    return (
        <div
            onClick={onClick}
            className="w-full bg-white rounded-xl p-4 shadow-[0px_1px_2px_0px_rgba(177,170,170,0.1)] border border-[#f6f6f6] flex items-center gap-4 cursor-pointer hover:border-purple-200 hover:shadow-md transition-all group"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors shrink-0">
                {icon}
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <div className="text-sm text-[#29272a] font-medium leading-5">
                    {title}
                </div>
                {subtitle && (
                    <div className="text-xs text-[#7f7582] font-light leading-4">
                        {subtitle}
                    </div>
                )}
            </div>
            {action && (
                <div className="flex items-center gap-1 text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {action}
                    <ArrowRight className="w-3 h-3" />
                </div>
            )}
        </div>
    );
}

// Portfolio tabs type
type PortfolioTab = 'summary' | 'investments';

// My Investments data
const MY_INVESTMENTS_DATA = [
    {
        id: '1',
        name: 'SpaceX',
        type: 'Secondary',
        investedAmount: 250000,
        currentValue: 312500,
        returnPercent: 25.0,
        date: 'Mar 2024',
        status: 'active' as const,
    },
    {
        id: '2',
        name: 'Anthropic',
        type: 'Series C',
        investedAmount: 150000,
        currentValue: 187500,
        returnPercent: 25.0,
        date: 'Jan 2024',
        status: 'active' as const,
    },
    {
        id: '3',
        name: 'Stripe',
        type: 'Secondary',
        investedAmount: 200000,
        currentValue: 224000,
        returnPercent: 12.0,
        date: 'Nov 2023',
        status: 'active' as const,
    },
    {
        id: '4',
        name: 'Databricks',
        type: 'Series I',
        investedAmount: 100000,
        currentValue: 118000,
        returnPercent: 18.0,
        date: 'Aug 2023',
        status: 'active' as const,
    },
    {
        id: '5',
        name: 'Discord',
        type: 'Secondary',
        investedAmount: 75000,
        currentValue: 82500,
        returnPercent: 10.0,
        date: 'Jun 2023',
        status: 'active' as const,
    },
];

// Investment row component
function InvestmentRow({ investment }: { investment: typeof MY_INVESTMENTS_DATA[0] }) {
    const isPositive = investment.returnPercent >= 0;
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#f0eef0] hover:border-[#e0dde1] transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7f5f8] to-[#ebe8ec] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#7f7582]" />
                </div>
                <div>
                    <div className="text-sm font-medium text-[#29272a]">{investment.name}</div>
                    <div className="text-xs text-[#9f949f]">{investment.type} · {investment.date}</div>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-sm font-medium text-[#29272a]">
                        ${investment.currentValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#9f949f]">
                        ${investment.investedAmount.toLocaleString()} invested
                    </div>
                </div>
                <div className={`text-sm font-medium ${isPositive ? 'text-[#049142]' : 'text-[#dc2626]'}`}>
                    {isPositive ? '+' : ''}{investment.returnPercent.toFixed(1)}%
                </div>
                <button className="p-2 hover:bg-[#f7f5f8] rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-[#9f949f]" />
                </button>
            </div>
        </div>
    );
}

// My Investments content
function MyInvestmentsContent() {
    const totalInvested = MY_INVESTMENTS_DATA.reduce((sum, inv) => sum + inv.investedAmount, 0);
    const totalValue = MY_INVESTMENTS_DATA.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalReturn = ((totalValue - totalInvested) / totalInvested) * 100;

    return (
        <div className="flex flex-col gap-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-[#f0eef0]">
                <div>
                    <div className="text-xs text-[#7f7582] mb-1">Total Invested</div>
                    <div className="text-lg font-medium text-[#29272a]">${totalInvested.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-xs text-[#7f7582] mb-1">Current Value</div>
                    <div className="text-lg font-medium text-[#29272a]">${totalValue.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-xs text-[#7f7582] mb-1">Total Return</div>
                    <div className="text-lg font-medium text-[#049142]">+{totalReturn.toFixed(1)}%</div>
                </div>
            </div>

            {/* Investments List */}
            <div className="flex flex-col gap-2">
                {MY_INVESTMENTS_DATA.map((investment) => (
                    <InvestmentRow key={investment.id} investment={investment} />
                ))}
            </div>
        </div>
    );
}

// Portfolio Tabs Component
function PortfolioTabs({ activeTab, onTabChange }: { activeTab: PortfolioTab; onTabChange: (tab: PortfolioTab) => void }) {
    return (
        <div className="flex gap-1 p-1 bg-[#f0eef0] rounded-lg w-fit">
            <button
                onClick={() => onTabChange('summary')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'summary'
                        ? 'bg-white text-[#29272a] shadow-sm'
                        : 'text-[#7f7582] hover:text-[#29272a]'
                }`}
            >
                Portfolio Summary
            </button>
            <button
                onClick={() => onTabChange('investments')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'investments'
                        ? 'bg-white text-[#29272a] shadow-sm'
                        : 'text-[#7f7582] hover:text-[#29272a]'
                }`}
            >
                My Investments
            </button>
        </div>
    );
}

// Portfolio Content with Tabs
function PortfolioContent({ onSuggestionClick }: { onSuggestionClick?: (text: string) => void }) {
    const [activeTab, setActiveTab] = useState<PortfolioTab>('summary');
    const suggestions = SUGGESTIONS_DATA['portfolio'] || [];

    return (
        <div className="w-full max-w-3xl flex flex-col gap-6">
            {/* Tabs */}
            <PortfolioTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === 'summary' ? (
                <>
                    {/* Portfolio Summary from Figma Import */}
                    <div className="w-full h-[350px] shrink-0">
                        <PortfolioSummary />
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-col gap-3">
                        <div className="text-sm font-medium text-[#7f7582] uppercase tracking-wider mb-1 px-1">
                            Suggested Actions
                        </div>
                        {suggestions.map((item, index) => (
                            <SuggestionCard
                                key={index}
                                {...item}
                                onClick={() => onSuggestionClick?.(item.title)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <MyInvestmentsContent />
            )}
        </div>
    );
}

export const SUGGESTIONS_DATA: Record<string, Omit<SuggestionItemProps, 'onClick'>[]> = {
    personalization: [
        {
            icon: <Target className="w-5 h-5" />,
            title: "What are your investment goals?",
            subtitle: "Growth, income, diversification, or specific sectors",
            action: "Tell me"
        },
        {
            icon: <DollarSign className="w-5 h-5" />,
            title: "What's your typical investment size?",
            subtitle: "Help me find deals that match your allocation preferences",
            action: "Set range"
        },
        {
            icon: <Heart className="w-5 h-5" />,
            title: "Any sectors you're particularly excited about?",
            subtitle: "AI, fintech, healthcare, climate tech, and more",
            action: "Explore"
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "What's your investment horizon?",
            subtitle: "Short-term liquidity vs. long-term growth",
            action: "Select"
        }
    ],
    research: [
        {
            icon: <Search className="w-5 h-5" />,
            title: "Analyze SpaceX's latest valuation history",
            subtitle: "Compare against secondary market trades over the last 6 months",
            action: "Start Analysis"
        },
        {
            icon: <Globe className="w-5 h-5" />,
            title: "Market Map: Generative AI Infrastructure",
            subtitle: "Identify key players, funding rounds, and emerging competitors",
            action: "View Map"
        },
        {
            icon: <Building2 className="w-5 h-5" />,
            title: "Compare Stripe vs. Adyen financials",
            subtitle: "Deep dive into revenue growth, margins, and market share",
            action: "Compare"
        }
    ],
    deals: [
        {
            icon: <Building2 className="w-5 h-5" />,
            title: "Databricks - Series I Allocation",
            subtitle: "Late-stage opportunity at $43B valuation. Minimum check: $50k",
            action: "View Deal"
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Anthropic - Secondary Market Block",
            subtitle: "Access to employee liquidity program. Discount to last round.",
            action: "Review Terms"
        },
        {
            icon: <Building2 className="w-5 h-5" />,
            title: "Canva - Pre-IPO Round",
            subtitle: "Strategic allocation available via Special Purpose Vehicle",
            action: "Request Access"
        }
    ],
    news: [
        {
            icon: <Newspaper className="w-5 h-5" />,
            title: "IPO Market Thaws: Reddit & Astera Labs",
            subtitle: "What successful debuts mean for the 2025 pipeline",
            action: "Read Brief"
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            title: "Fed Signals Potential Rate Cuts",
            subtitle: "Impact analysis on private equity and venture valuations",
            action: "See Analysis"
        },
        {
            icon: <Globe className="w-5 h-5" />,
            title: "Antitrust Scrutiny on Big Tech AI Deals",
            subtitle: "Regulatory headwinds for Microsoft, Google, and Amazon",
            action: "Read More"
        }
    ],
    insight: [
        {
            icon: <FileText className="w-5 h-5" />,
            title: "State of Private Markets Q3 2025",
            subtitle: "Comprehensive report on VC fundraising and exit activity",
            action: "Download PDF"
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Memo: The Vertical AI Revolution",
            subtitle: "Shared by Partner at Sequoia Capital. 15 min read.",
            action: "Read Memo"
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Secondary Liquidity: Buyer's Guide",
            subtitle: "Best practices for navigating pricing spreads in 2025",
            action: "View Guide"
        }
    ],
    events: [
        {
            icon: <Calendar className="w-5 h-5" />,
            title: "Annual Member Summit 2025",
            subtitle: "Nov 15, 2025 • San Francisco, CA • In-person",
            action: "RSVP"
        },
        {
            icon: <Globe className="w-5 h-5" />,
            title: "Webinar: Fintech Valuation Frameworks",
            subtitle: "Oct 28, 2025 • 10:00 AM PST • Online",
            action: "Register"
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            title: "Q4 Investor Roundtable",
            subtitle: "Dec 05, 2025 • New York, NY • Private Dinner",
            action: "Join Waitlist"
        }
    ],
    portfolio: [
        {
            icon: <TrendingUp className="w-5 h-5" />,
            title: "Performance Review: Q3 2025",
            subtitle: "Your portfolio outperformed the benchmark by 450bps",
            action: "View Details"
        },
        {
            icon: <Briefcase className="w-5 h-5" />,
            title: "Action Required: Tax Documents",
            subtitle: "K-1s for Fund III and IV are now available for download",
            action: "Go to Documents"
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Liquidity Event: SpaceX Tender Offer",
            subtitle: "Option to sell up to 10% of your position closes in 5 days",
            action: "Review Offer"
        }
    ]
};

// Animation stage type from WelcomeDashboard
type AnimationStage = 'idle' | 'greeting' | 'questions' | 'inputbar' | 'complete';

interface DashboardContentProps {
    mode: ChatMode;
    onSuggestionClick?: (text: string) => void;
    isFirstTimeUser?: boolean;
    animationStage?: AnimationStage;
}

export function DashboardContent({ mode, onSuggestionClick, isFirstTimeUser = false, animationStage = 'complete' }: DashboardContentProps) {
    // Determine if questions should be visible based on animation stage
    const showPersonalization = ['questions', 'inputbar', 'complete'].includes(animationStage);

    // First-time users see personalization questions in default mode
    if (mode === 'default' && isFirstTimeUser) {
        const suggestions = SUGGESTIONS_DATA['personalization'] || [];
        return (
            <div className="w-full max-w-3xl flex flex-col gap-3">
                <div
                    className={cn(
                        "text-sm font-medium text-[#7f7582] uppercase tracking-wider mb-1 px-1 transition-all duration-500",
                        showPersonalization ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    Let's personalize your experience
                </div>
                {suggestions.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            'transition-all duration-500 ease-out',
                            showPersonalization ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-2'
                        )}
                        style={{
                            transitionDelay: showPersonalization ? `${index * 120}ms` : '0ms'
                        }}
                    >
                        <SuggestionCard
                            {...item}
                            onClick={() => onSuggestionClick?.(item.title)}
                        />
                    </div>
                ))}
            </div>
        );
    }

    if (mode === 'default') {
        return <ProgressWidget />;
    }

    if (mode === 'news') {
        return <NewsContent />;
    }

    if (mode === 'events') {
        return <EventsContent />;
    }

    // Special Layout for Deals Mode with Cards Grid
    if (mode === 'deals') {
        const suggestions = SUGGESTIONS_DATA[mode] || [];
        return (
            <div className="w-full max-w-3xl flex flex-col gap-6">
                {/* Deals Cards Grid */}
                <DealsCardsGrid onCardClick={(title) => onSuggestionClick?.(title)} />

                {/* Suggestions */}
                <div className="flex flex-col gap-3">
                    <div className="text-sm font-medium text-[#7f7582] uppercase tracking-wider mb-1 px-1">
                        Suggested Actions
                    </div>
                    {suggestions.map((item, index) => (
                        <SuggestionCard
                            key={index}
                            {...item}
                            onClick={() => onSuggestionClick?.(item.title)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Special Layout for Portfolio Mode with Tabs
    if (mode === 'portfolio') {
        return <PortfolioContent onSuggestionClick={onSuggestionClick} />;
    }

    const suggestions = SUGGESTIONS_DATA[mode] || [];

    if (suggestions.length === 0) return null;

    return (
        <div className="w-full max-w-3xl flex flex-col gap-3">
            <div className="text-sm font-medium text-[#7f7582] uppercase tracking-wider mb-1 px-1">
                Suggested Actions
            </div>
            {suggestions.map((item, index) => (
                <SuggestionCard
                    key={index}
                    {...item}
                    onClick={() => onSuggestionClick?.(item.title)}
                />
            ))}
        </div>
    );
}
