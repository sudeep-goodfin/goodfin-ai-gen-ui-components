import React from 'react';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';
import ContainerCollapse from './wizard/ContainerCollapse';
import { AllDealsView } from './AllDealsView';
import imgGoodfinAI from "../../assets/goodfin-ai-avatar.png";

export function ThinkingBubble() {
    return (
        <div className="flex gap-4 w-full animate-fade-in items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                <img src={imgGoodfinAI} alt="AI" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 pt-1 w-full max-w-[80%]">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse delay-75" />
            </div>
        </div>
    );
}

export function AIResponse({ content, isStreaming }: { content: string, isStreaming?: boolean }) {
    if (!content) return null;

    return (
        <div className="flex gap-4 w-full animate-fade-in items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                <img src={imgGoodfinAI} alt="AI" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 pt-1 w-full max-w-[90%]">
                <p className="text-[#29272a] text-[15px] leading-6 font-light whitespace-pre-wrap">
                    {content}
                    {isStreaming && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-purple-400 align-middle animate-pulse" />
                    )}
                </p>
            </div>
        </div>
    );
}

export function UserBubble({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full animate-fade-in">
            <div className="bg-[#29272a] text-white px-5 py-3 rounded-[20px] rounded-tr-sm max-w-[80%] shadow-sm">
                <p className="text-[15px] leading-6 font-light">{content}</p>
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
    onWizardComplete?: () => void;
    onCardClick?: (title: string) => void;
}

export function ChatInterface({ messages, isThinking, streamingContent, onWizardComplete, onCardClick }: ChatInterfaceProps) {
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

                 return <AIResponse key={idx} content={msg.content} />;
            })}

            {isThinking && <ThinkingBubble />}

            {streamingContent && (
                <AIResponse content={streamingContent} isStreaming={true} />
            )}
        </div>
    );
}
