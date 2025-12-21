import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconPaths } from './icons';

export interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

interface ChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat?: (chatId: string) => void;
  chatHistory?: ChatHistoryItem[];
  searchPlaceholder?: string;
  viewAllLabel?: string;
  className?: string;
}

export function ChatHistoryDrawer({
  isOpen,
  onClose,
  onSelectChat,
  chatHistory = [],
  searchPlaceholder = "Search conversations...",
  viewAllLabel = "View all conversations",
  className,
}: ChatHistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex">
      {/* Drawer Panel */}
      <div
        className={cn(
          "w-80 h-full bg-card shadow-xl flex flex-col animate-slide-in-left",
          className
        )}
        style={{
          animation: 'slideInLeft 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Chat History</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-muted-foreground/40 focus:ring-1 focus:ring-muted-foreground/40"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2">
            {chatHistory.map((chat, index) => (
              <React.Fragment key={chat.id}>
                {/* Date separator */}
                {index === 0 || chatHistory[index - 1].timestamp !== chat.timestamp ? (
                  <div className="px-2 py-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                    {chat.timestamp}
                  </div>
                ) : null}

                {/* Chat item */}
                <button
                  onClick={() => onSelectChat?.(chat.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d={iconPaths.history} fill="white" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">
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
        <div className="px-4 py-3 border-t border-border">
          <button className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center py-2">
            {viewAllLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add keyframe animation styles
if (typeof document !== 'undefined') {
  const styleId = 'chat-history-drawer-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
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
    document.head.appendChild(styleSheet);
  }
}

// Demo wrapper component with state management
interface ChatHistoryDrawerDemoProps {
  chatHistory?: ChatHistoryItem[];
  buttonLabel?: string;
  className?: string;
}

export function ChatHistoryDrawerDemo({
  chatHistory = [
    { id: '1', title: 'SpaceX Investment', preview: 'Looking at secondary market...', timestamp: 'Today' },
    { id: '2', title: 'Portfolio Review', preview: 'My portfolio performance...', timestamp: 'Yesterday' },
  ],
  buttonLabel = 'Open Chat History',
  className,
}: ChatHistoryDrawerDemoProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("p-8 bg-muted min-h-[400px] relative", className)}>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90"
      >
        {buttonLabel}
      </button>
      <ChatHistoryDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chatHistory={chatHistory}
      />
    </div>
  );
}
