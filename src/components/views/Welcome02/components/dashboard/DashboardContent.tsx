import React from 'react';
import { ProgressWidget } from './ProgressWidget';
import { NewsContent } from './NewsContent';
import { EventsContent } from './EventsContent';
import { ChatMode } from './InputBar';
import PortfolioSummary from '../../imports/Frame2147228782';
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
    Globe
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

export const SUGGESTIONS_DATA: Record<string, Omit<SuggestionItemProps, 'onClick'>[]> = {
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

export function DashboardContent({ mode, onSuggestionClick }: { mode: ChatMode, onSuggestionClick?: (text: string) => void }) {
    if (mode === 'default') {
        return <ProgressWidget />;
    }

    if (mode === 'news') {
        return <NewsContent />;
    }

    if (mode === 'events') {
        return <EventsContent />;
    }

    // Special Layout for Portfolio Mode
    if (mode === 'portfolio') {
        const suggestions = SUGGESTIONS_DATA[mode] || [];
        return (
            <div className="w-full max-w-3xl flex flex-col gap-6">
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
            </div>
        );
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
