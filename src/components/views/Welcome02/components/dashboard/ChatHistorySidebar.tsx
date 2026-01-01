import React from 'react';
import { Plus, FolderOpen, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../../../../../lib/utils';

// Chat history item interface
interface ChatHistoryItem {
  id: string;
  title: string;
  subtitle?: string;
  isPinned?: boolean;
}

// Grouped chat history by date
interface ChatHistoryGroup {
  label: string;
  items: ChatHistoryItem[];
}

// Mock chat history data matching Figma design
const MOCK_CHAT_HISTORY: ChatHistoryGroup[] = [
  {
    label: '', // Current/pinned - no label
    items: [
      {
        id: 'onboarding',
        title: 'Z AI Onboarding',
        subtitle: 'Welcome & Getting Started',
        isPinned: true,
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        id: 'copenhagen',
        title: 'Investing in Copenhagen Atomics U...',
      },
    ],
  },
  {
    label: 'This Month',
    items: [
      { id: 'openai', title: 'OpenAI Departures in Past Year' },
      { id: 'anduril', title: 'Investing in Andruil IV Guide' },
      { id: 'general', title: 'General Chat Introduction' },
      { id: 'overview', title: 'Overview and Features of Goodfin' },
      { id: 'topvc', title: 'Top Venture Capital Funds Overview' },
      { id: 'preipo', title: 'Top Pre-IPO Investment Deals' },
      { id: 'preipo2', title: 'Pre-IPO Investment Opportunities G...' },
    ],
  },
];

interface ChatHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat?: (chatId: string) => void;
  onNewChat?: () => void;
  selectedChatId?: string;
}

export function ChatHistorySidebar({
  isOpen,
  onClose,
  onSelectChat,
  onNewChat,
  selectedChatId,
}: ChatHistorySidebarProps) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[270px] bg-white flex flex-col transition-transform duration-300 ease-out',
          'shadow-[-1px_5px_8px_0px_rgba(164,140,160,0.6)]',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header - Chat History */}
        <div className="px-3 pt-4 pb-2">
          <h2 className="text-[18px] font-semibold text-[#29272a] font-['Soehne_Kraftig',sans-serif]">
            Chat History
          </h2>
        </div>

        {/* Add New Chat button */}
        <button
          onClick={onNewChat}
          className="mx-3 flex items-center gap-2 py-2 text-[#29272a] hover:bg-[#f7f7f8] rounded-lg transition-colors"
        >
          <div className="flex items-center justify-center w-6 h-6">
            <Plus className="w-5 h-5 text-[#29272a]" strokeWidth={2} />
          </div>
          <span className="text-[14px] font-semibold font-['Soehne_Kraftig',sans-serif]">
            Add New Chat
          </span>
        </button>

        {/* Library button */}
        <button className="mx-3 flex items-center gap-3 px-1 py-2 text-[#29272a] hover:bg-[#f7f7f8] rounded-md transition-colors">
          <FolderOpen className="w-[18px] h-[18px] text-[#29272a]" strokeWidth={1.5} />
          <span className="text-[13.3px] font-normal text-[#29272a]">Library</span>
        </button>

        {/* Explore New banner */}
        <div className="mx-3 mt-4 relative overflow-hidden rounded-lg">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-[#f0eef0]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,240,216,0.6) 0%, rgba(255,200,150,0.4) 50%, rgba(255,149,74,0.3) 100%)',
            }}
          />

          <div className="relative flex items-center gap-2.5 px-3 py-2">
            <div className="flex items-center">
              <span className="text-[12px] font-semibold text-[#48424a] font-['Soehne_Kraftig',sans-serif]">
                Explore New
              </span>
              <ChevronRight className="w-4 h-4 text-[#48424a]" />
            </div>

            {/* Deep Research Analyst pill */}
            <div className="flex-1 flex justify-end">
              <div
                className="px-2 py-1 rounded-full flex items-center gap-1 shadow-sm"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                  border: '1px solid rgba(240,238,240,0.2)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#29272a]" />
                <span className="text-[10px] font-light text-[#29272a] font-['Soehne_Leicht',sans-serif] whitespace-nowrap">
                  Deep Research Analyst
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat history list - scrollable */}
        <div className="flex-1 overflow-y-auto mt-4 px-3">
          <div className="flex flex-col gap-4">
            {MOCK_CHAT_HISTORY.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-1">
                {/* Group label */}
                {group.label && (
                  <span className="text-[12px] font-semibold text-[#8a7f91] font-['Soehne_Kraftig',sans-serif] mb-1">
                    {group.label}
                  </span>
                )}

                {/* Chat items */}
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectChat?.(item.id)}
                    className={cn(
                      'w-full text-left px-1 py-2 rounded-md transition-colors',
                      selectedChatId === item.id
                        ? 'bg-[#f0eef0]'
                        : 'hover:bg-[#f7f7f8]'
                    )}
                  >
                    <div className="flex flex-col">
                      {/* Title - bold for pinned items, light for others */}
                      <span
                        className={cn(
                          'text-[14px] text-[#29272a] truncate',
                          item.isPinned
                            ? "font-semibold font-['Soehne_Kraftig',sans-serif]"
                            : "font-light font-['Soehne_Leicht',sans-serif] leading-5"
                        )}
                      >
                        {item.title}
                      </span>

                      {/* Subtitle if exists */}
                      {item.subtitle && (
                        <span className="text-[12px] font-light text-[#373338] font-['Soehne_Leicht',sans-serif] mt-0.5">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
