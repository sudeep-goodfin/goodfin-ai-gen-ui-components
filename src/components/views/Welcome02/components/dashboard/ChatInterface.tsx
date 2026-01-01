import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';
import ContainerCollapse from './wizard/ContainerCollapse';
import { AllDealsView } from './AllDealsView';
import { TickerCTA, ReferralCTA } from '../../../../ui/PostInvestmentCTA';
import { Shimmer } from '../../../../ui/Shimmer';
import goodfinAvatar from '../../assets/goodfin-ai-avatar.png';

// Thinking texts to cycle through
const THINKING_TEXTS = [
    'analyzing your question...',
    'reviewing market data...',
    'connecting insights...',
    'preparing response...',
];

// AI Avatar component
function AIAvatar() {
    return (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-[0px_5px_5px_0px_rgba(190,185,192,0.33)] border border-[#F8F8F8]">
            <img src={goodfinAvatar} alt="Goodfin AI" className="w-full h-full object-cover" />
        </div>
    );
}

export function ThinkingBubble() {
    const [textIndex, setTextIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setTextIndex((prev) => (prev + 1) % THINKING_TEXTS.length);
                setIsFading(false);
            }, 150);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-3 w-full animate-fade-in items-start">
            <AIAvatar />
            <div className="flex flex-col gap-1 pt-1">
                <div
                    className={`transition-opacity duration-150 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                >
                    <Shimmer
                        className="text-[15px] font-normal"
                        duration={1.5}
                        spread={2.5}
                        textColor="hsl(270 5% 55%)"
                        shimmerColor="hsl(270 5% 25%)"
                    >
                        {THINKING_TEXTS[textIndex]}
                    </Shimmer>
                </div>
            </div>
        </div>
    );
}

interface AIResponseProps {
    content: string;
    isStreaming?: boolean;
    thinkingDuration?: number;
    showThinkingLabel?: boolean;
}

export function AIResponse({
    content,
    isStreaming,
    thinkingDuration,
    showThinkingLabel = false
}: AIResponseProps) {
    if (!content && !showThinkingLabel) return null;

    return (
        <div className="flex gap-3 w-full animate-fade-in items-start">
            <AIAvatar />
            <div className="flex flex-col gap-1.5 pt-0.5 w-full max-w-[90%]">
                {/* Thinking duration label */}
                {showThinkingLabel && thinkingDuration !== undefined && (
                    <span className="text-[13px] text-[#8a7f91] font-normal">
                        thought for {thinkingDuration}s
                    </span>
                )}

                {/* Response content */}
                {content && (
                    <p className="text-[#29272a] text-[15px] leading-[1.6] font-normal whitespace-pre-wrap">
                        {content}
                        {isStreaming && (
                            <span className="inline-block w-[2px] h-[18px] ml-0.5 bg-[#8a7f91] align-middle animate-pulse rounded-full" />
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}

export function UserBubble({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full animate-fade-in">
            <div className="bg-[#29272a] text-white px-4 py-3 rounded-[18px] rounded-tr-[4px] max-w-[85%] shadow-sm">
                <p className="text-[15px] leading-[1.5] font-normal">{content}</p>
            </div>
        </div>
    );
}

function DealCard({ data }: { data: any }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ml-12 animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{data.company}</h3>
                        <p className="text-xs text-gray-500">{data.round}</p>
                    </div>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Open
                </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Valuation</p>
                    <p className="font-medium text-gray-900">{data.valuation}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Allocation</p>
                    <p className="font-medium text-gray-900">{data.allocation}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Price / Share</p>
                    <p className="font-medium text-gray-900">{data.price}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Min. Check</p>
                    <p className="font-medium text-gray-900">{data.minCheck}</p>
                </div>
            </div>
            <div className="p-4 pt-0">
                <button className="w-full bg-[#29272a] hover:bg-[#3e3b3f] text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    Review & Commit <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}

export interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    type?: 'text' | 'component';
    componentName?: string;
    data?: any;
}

interface ChatInterfaceProps {
    messages: ChatMessage[];
    isThinking: boolean;
    streamingContent: string;
    thinkingDuration?: number;
    onWizardComplete?: () => void;
    onCardClick?: (title: string) => void;
}

export function ChatInterface({ messages, isThinking, streamingContent, thinkingDuration = 0, onWizardComplete, onCardClick }: ChatInterfaceProps) {
    const isStreaming = streamingContent.length > 0;

    return (
        <div className="w-full max-w-3xl flex flex-col gap-6 pb-20">
            {messages.map((msg, idx) => {
                 if (msg.role === 'user') {
                     return <UserBubble key={idx} content={msg.content} />;
                 }

                 if (msg.type === 'component' && msg.componentName === 'deal-card') {
                     return <DealCard key={idx} data={msg.data} />;
                 }

                 if (msg.type === 'component' && msg.componentName === 'wizard') {
                     return <ContainerCollapse key={idx} onComplete={onWizardComplete} />;
                 }

                 if (msg.type === 'component' && msg.componentName === 'all-deals') {
                     return (
                         <div key={idx} className="w-full animate-fade-in">
                             <AllDealsView onCardClick={onCardClick} />
                         </div>
                     );
                 }

                 if (msg.type === 'component' && msg.componentName === 'ticker-cta') {
                     return (
                         <div key={idx} className="w-full animate-fade-in">
                             <TickerCTA
                                 dealName={msg.data?.dealName || 'Databricks'}
                                 dealLogo={msg.data?.dealLogo || '/icons/products/databricks.jpg'}
                                 onPostSubmit={(post) => console.log('Post submitted:', post)}
                             />
                         </div>
                     );
                 }

                 if (msg.type === 'component' && msg.componentName === 'referral-cta') {
                     return (
                         <div key={idx} className="w-full animate-fade-in">
                             <ReferralCTA
                                 referralCode={msg.data?.referralCode || 'abc123'}
                                 referralCredit={msg.data?.referralCredit || 300}
                                 onCopyLink={() => console.log('Referral link copied')}
                             />
                         </div>
                     );
                 }

                 return <AIResponse key={idx} content={msg.content} />;
            })}

            {/* Thinking state with shimmer animation */}
            {isThinking && <ThinkingBubble />}

            {/* Streaming response with "thought for Xs" label */}
            {isStreaming && (
                <AIResponse
                    content={streamingContent}
                    isStreaming={true}
                    thinkingDuration={thinkingDuration}
                    showThinkingLabel={true}
                />
            )}
        </div>
    );
}
