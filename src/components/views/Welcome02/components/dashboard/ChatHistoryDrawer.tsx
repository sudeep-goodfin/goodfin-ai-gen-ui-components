import React from 'react';
import { X } from 'lucide-react';
import { svgPaths } from '../../svgPaths';

interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

// Mock chat history data
const MOCK_CHAT_HISTORY: ChatHistoryItem[] = [
  {
    id: '1',
    title: 'SpaceX Analysis',
    preview: 'I\'ve analyzed the latest secondary market data for SpaceX...',
    timestamp: 'Today'
  },
  {
    id: '2',
    title: 'Anthropic Investment',
    preview: 'Let\'s resume the investment with Anthropic...',
    timestamp: 'Yesterday'
  },
  {
    id: '3',
    title: 'Portfolio Review',
    preview: 'Your portfolio increased by $154k (+12.4%) this month...',
    timestamp: '2 days ago'
  },
  {
    id: '4',
    title: 'Deal Flow Summary',
    preview: 'Here are 5 new deals that match your criteria...',
    timestamp: '3 days ago'
  },
  {
    id: '5',
    title: 'Market Intelligence',
    preview: 'Tech sector volatility has increased by 15%...',
    timestamp: 'Last week'
  }
];

interface ChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat?: (chatId: string) => void;
}

export function ChatHistoryDrawer({ isOpen, onClose, onSelectChat }: ChatHistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex">
      {/* Drawer Panel */}
      <div
        className="w-80 h-full bg-white shadow-xl flex flex-col animate-slide-in-left"
        style={{
          animation: 'slideInLeft 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e9e6ea]">
          <h2 className="text-base font-semibold text-[#29272a]">Chat History</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#f0eef0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#69606d]" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 py-2 text-sm bg-[#f7f7f8] border border-[#e9e6ea] rounded-lg placeholder:text-[#9f949f] focus:outline-none focus:border-[#d0cdd2] focus:ring-1 focus:ring-[#d0cdd2]"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2">
            {MOCK_CHAT_HISTORY.map((chat, index) => (
              <React.Fragment key={chat.id}>
                {/* Date separator */}
                {index === 0 || MOCK_CHAT_HISTORY[index - 1].timestamp !== chat.timestamp ? (
                  <div className="px-2 py-2 text-xs font-medium text-[#9f949f] uppercase tracking-wider">
                    {chat.timestamp}
                  </div>
                ) : null}

                {/* Chat item */}
                <button
                  onClick={() => onSelectChat?.(chat.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#f7f7f8] transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8f5a] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d={svgPaths.history} fill="white" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#29272a] truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-[#7f7582] truncate mt-0.5">
                        {chat.preview}
                      </div>
                    </div>
                  </div>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#e9e6ea]">
          <button className="w-full text-sm text-[#7f7582] hover:text-[#29272a] transition-colors text-center py-2">
            View all conversations
          </button>
        </div>
      </div>
    </div>
  );
}

// Add keyframe animation to the global styles or use inline
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
if (typeof document !== 'undefined' && !document.querySelector('[data-chat-history-styles]')) {
  styleSheet.setAttribute('data-chat-history-styles', 'true');
  document.head.appendChild(styleSheet);
}
