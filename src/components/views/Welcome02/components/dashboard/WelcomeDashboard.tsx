import React, { useState, useEffect, useRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Greeting } from './Greeting';
import { DashboardContent } from './DashboardContent';
import { HomeContent } from './HomeContent';
import { HomeContentV2 } from './HomeContentV2';
import { ChatInterface, ChatMessage } from './ChatInterface';
import { InputBar, ChatMode, MoreMode } from './InputBar';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';
import { Icon, CustomIcon } from '../Icon';
import { ArrowLeft } from 'lucide-react';
import svgPaths from '../../imports/svg-191opiemcf';
import { svgPaths as localSvgPaths } from '../../svgPaths';

// Home Content Variant Types
export type HomeVariant = 'v1' | 'v2-full' | 'v2-compact' | 'v2-action-focused';

// Dropdown menu component
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedback: () => void;
  onResetConversation: () => void;
}

function DropdownMenu({ isOpen, onClose, onFeedback, onResetConversation }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#e9e6ea] py-1 z-50"
    >
      <button
        onClick={() => {
          onFeedback();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.feedback} fill="#69606d" />
        </svg>
        Got Feedback
      </button>
      <button
        onClick={() => {
          onResetConversation();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#29272a] hover:bg-[#f7f7f8] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d={localSvgPaths.reset} fill="#69606d" />
        </svg>
        Reset Conversation
      </button>
    </div>
  );
}

// Component for the header with left and right actions
interface HeaderActionsProps {
  isInChat: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  onFeedback: () => void;
  onResetConversation: () => void;
}

function HeaderActions({ isInChat, onToggleHistory, onNewChat, onFeedback, onResetConversation }: HeaderActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

      {/* Right side - Compose and More */}
      {!isInChat && (
        <div className="flex items-center gap-1">
          {/* New Chat / Compose */}
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            title="New Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d={localSvgPaths.pencilCompose} fill="#69606d" />
            </svg>
          </button>

          {/* More Options */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              title="More Options"
            >
              <svg width="20" height="20" viewBox="0 0 24 20" fill="none">
                <path d={localSvgPaths.moreHorizontal} fill="#69606d" />
              </svg>
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              onFeedback={onFeedback}
              onResetConversation={onResetConversation}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const GREETING_DATA: Record<ChatMode, { title: string; description: string }> = {
  default: {
    title: "Good afternoon, Alex",
    description: "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon."
  },
  research: {
    title: "Deep Research",
    description: "I can help you analyze market trends, review company filings, and synthesize complex financial data. What would you like to investigate today?"
  },
  deals: {
    title: "Deals",
    description: "Reviewing the latest secondary market opportunities and private equity allocations tailored to your investment thesis. 5 new deals match your criteria."
  },
  news: {
    title: "Market Intelligence",
    description: "Breaking news and curated insights impacting your portfolio. Tech sector volatility has increased by 15% following the latest regulatory announcements."
  },
  insight: {
    title: "Community Insight",
    description: "Exclusive reports and investment memorandums shared by the community. See what top analysts are saying about the latest IPOs."
  },
  portfolio: {
    title: "My Portfolio",
    description: "Your total asset value is up 12% YTD. Key drivers include SpaceX and Stripe. Review your detailed performance analysis below."
  },
  events: {
    title: "Upcoming Events",
    description: "Register for upcoming webinars, roundtables, and exclusive member meetups. Don't miss the Q3 Strategy Session next week."
  }
};

interface WelcomeDashboardProps {
  homeVariant?: HomeVariant;
}

export function WelcomeDashboard({ homeVariant = 'v1' }: WelcomeDashboardProps) {
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [extraSlotItem, setExtraSlotItem] = useState<MoreMode | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Chat State
  const [chatState, setChatState] = useState<{
    isActive: boolean;
    messages: ChatMessage[];
    isThinking: boolean;
    streamingContent: string;
  }>({ isActive: false, messages: [], isThinking: false, streamingContent: "" });

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
    if (mode === 'insight' || mode === 'events' || mode === 'portfolio') {
      setExtraSlotItem(mode);
    }
  };

  // Reset chat when mode changes
  useEffect(() => {
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "" });
  }, [currentMode]);

  const handleStartChat = (text: string) => {
    setChatState(prev => ({
      isActive: true,
      messages: [{ role: 'user', content: text }],
      isThinking: true,
      streamingContent: ""
    }));

    // Simulate thinking delay then streaming
    setTimeout(() => {
      setChatState(prev => ({ ...prev, isThinking: false }));

      let fullResponse = "";
      let componentMessage: ChatMessage | null = null;

      if (text.includes("Anthropic")) {
        fullResponse = "Let's resume the investment with Anthropic. I've secured a specialized allocation block for you in the Series C secondary round. Here are the details:";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'wizard',
          data: {}
        };
      } else if (text.toLowerCase().includes("show me all deals") || text.toLowerCase().includes("show all deals")) {
        fullResponse = "Here's a comprehensive view of all available deals organized by category. You can filter by Pre-IPO, Featured, Venture Funds, Early-Stage Startups, and Private Equity Funds. Click on any deal to learn more.";
        componentMessage = {
          role: 'ai',
          content: '',
          type: 'component',
          componentName: 'all-deals',
          data: {}
        };
      } else {
        fullResponse = "I've analyzed the latest secondary market data for SpaceX. The valuation has stabilized around $180B, driven by successful Starship test flights and increased Starlink revenue. \n\nComparing against the last 6 months:\n• Trading volume is up 15%\n• Buy-side demand exceeds supply by 2:1\n• Pricing is currently at a 5% premium to the last tender offer.\n\nWould you like me to drill down into specific transaction multiples?";
      }

      let i = 0;
      const interval = setInterval(() => {
        i++;
        setChatState(prev => ({
          ...prev,
          streamingContent: fullResponse.slice(0, i)
        }));

        if (i >= fullResponse.length) {
          clearInterval(interval);
          // Finalize message
          setChatState(prev => ({
            ...prev,
            messages: [
              ...prev.messages,
              { role: 'ai', content: fullResponse },
              ...(componentMessage ? [componentMessage] : [])
            ],
            streamingContent: ""
          }));
        }
      }, 15); // Streaming speed

    }, 1500); // Thinking delay
  };

  const handleWizardComplete = () => {
    // Append the post-completion message
    setChatState(prev => {
      // Prevent duplicate messages if clicked multiple times quickly
      const lastMsg = prev.messages[prev.messages.length - 1];
      if (lastMsg && lastMsg.role === 'ai' && lastMsg.content.includes("successfully transferred")) {
        return prev;
      }

      const successMsg: ChatMessage = {
        role: 'ai',
        content: "Hey, since you've successfully transferred, now you can invite your network to co-invest in this exclusive Anthropic allocation. This helps you build your track record.\n\nWould you like to send an invite or set up performance monitoring for this position?"
      };

      return {
        ...prev,
        messages: [...prev.messages, successMsg]
      };
    });
  };

  const handleBack = () => {
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "" });
  };

  const handleToggleHistory = () => {
    setIsHistoryDrawerOpen(prev => !prev);
  };

  const handleNewChat = () => {
    // Reset to default state for new chat
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "" });
    setCurrentMode('default');
  };

  const handleFeedback = () => {
    // Placeholder for feedback action
    console.log('Got Feedback clicked');
    // Could open a modal or redirect to feedback form
  };

  const handleResetConversation = () => {
    // Reset the current conversation
    setChatState({ isActive: false, messages: [], isThinking: false, streamingContent: "" });
  };

  const handleSelectChat = (chatId: string) => {
    // Placeholder for loading a specific chat
    console.log('Selected chat:', chatId);
    setIsHistoryDrawerOpen(false);
    // Would load the chat messages from the selected chat ID
  };

  const content = GREETING_DATA[currentMode];

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f7f7f8]">
      {/* Chat History Drawer */}
      <ChatHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        onSelectChat={handleSelectChat}
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
          /* When in chat: show back button on left, history toggle still on left but after back */
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-[#7f7582] hover:text-[#29272a] transition-colors px-2 py-1.5 rounded-lg hover:bg-black/5"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>
            <button
              onClick={handleToggleHistory}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              title="Chat History"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d={localSvgPaths.sidebarLeft} fill="#69606d" />
              </svg>
            </button>
          </div>
        ) : (
          /* When not in chat: show header actions with history toggle, compose, and more */
          <HeaderActions
            isInChat={chatState.isActive}
            onToggleHistory={handleToggleHistory}
            onNewChat={handleNewChat}
            onFeedback={handleFeedback}
            onResetConversation={handleResetConversation}
          />
        )}
      </div>

      {/* Main Content Scrollable Area - Using Radix UI ScrollArea */}
      <ScrollAreaPrimitive.Root className="relative z-10 flex-1 w-full overflow-hidden">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-none [&>div]:!block">
          <div className="flex flex-col items-center p-6 gap-10 w-full min-h-full">
            {/* If Chat is Active, show Chat Interface */}
            {chatState.isActive ? (
              <div className="w-full max-w-3xl mt-6">
                <ChatInterface
                  messages={chatState.messages}
                  isThinking={chatState.isThinking}
                  streamingContent={chatState.streamingContent}
                  onWizardComplete={handleWizardComplete}
                  onCardClick={handleStartChat}
                />
              </div>
            ) : (
              /* Otherwise show standard Dashboard content */
              <>
                {currentMode === 'default' ? (
                  <div className="w-full max-w-3xl mt-6">
                    {homeVariant === 'v1' ? (
                      <HomeContent
                        onModeChange={handleModeChange}
                        onStartChat={handleStartChat}
                      />
                    ) : (
                      <HomeContentV2
                        variant={
                          homeVariant === 'v2-full' ? 'full' :
                          homeVariant === 'v2-compact' ? 'compact' : 'action-focused'
                        }
                        onModeChange={handleModeChange}
                        onStartChat={handleStartChat}
                      />
                    )}
                  </div>
                ) : (
                  <div className={`flex flex-col gap-10 w-full mt-10 ${currentMode === 'news' ? 'max-w-6xl' : 'max-w-3xl'}`}>
                    {/* Only show greeting for modes that don't have their own greeting in DashboardContent */}
                    {currentMode !== 'events' && (
                      <Greeting
                        title={content.title}
                        description={content.description}
                      />
                    )}
                    <DashboardContent
                      mode={currentMode}
                      onSuggestionClick={handleStartChat}
                    />
                  </div>
                )}
              </>
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
          <InputBar
            currentMode={currentMode}
            extraSlotItem={extraSlotItem}
            onModeChange={handleModeChange}
          />
        </div>
      </div>
    </div>
  );
}
