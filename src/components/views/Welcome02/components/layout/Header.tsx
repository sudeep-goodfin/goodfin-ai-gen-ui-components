import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import svgPaths from '../../imports/svg-191opiemcf';
import goodfinLogo from '../../assets/goodfin-logo.png';

// Tab label mapping
const TAB_LABELS: Record<string, string> = {
  'goodfin-ai': 'Goodfin AI',
  'deals': 'Deals',
  'dashboard': 'Dashboard',
  'wishlist': 'Wishlist',
  'memberships': 'Memberships',
  'community': 'Community',
  'events': 'Events',
  'referrals': 'Referrals',
  'help': 'Help',
};

// Avatar component
function Avatar({ src, fallback }: { src?: string; fallback: string }) {
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#dfdce1]">
      {src ? (
        <img src={src} alt="User avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-[#48424a]">
          {fallback}
        </div>
      )}
    </div>
  );
}

// Active tab badge
function ActiveTabBadge({ tab }: { tab: string }) {
  const label = TAB_LABELS[tab] || tab;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f0eef0] text-[11px] font-medium text-[#69606d] border border-[#e6e4e7]">
      {label}
    </span>
  );
}

interface HeaderProps {
  isInConversation?: boolean;
  conversationTitle?: string;
  activeTab?: string | null;
  onBack?: () => void;
}

export function Header({
  isInConversation = false,
  conversationTitle = '',
  activeTab = null,
  onBack,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between w-full h-16 bg-[#edebee] px-4 shadow-sm shrink-0 z-10">
      {/* Left Side - Back button (in conversation) or Menu & Logo (default) */}
      <div className="flex items-center gap-3">
        {isInConversation ? (
          <>
            {/* Back Button */}
            <button
              onClick={onBack}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg",
                "text-[#69606d] hover:text-[#29272a] hover:bg-black/5",
                "transition-colors"
              )}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-[14px] font-medium hidden sm:inline">Back</span>
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-[#d0cdd2]" />

            {/* Conversation Title */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-[#29272a] truncate max-w-[180px] sm:max-w-[280px]">
                {conversationTitle || 'New Conversation'}
              </span>
              {activeTab && <ActiveTabBadge tab={activeTab} />}
            </div>
          </>
        ) : (
          <>
            {/* Mobile Menu Icon */}
            <button className="w-8 h-8 p-1 rounded hover:bg-black/5 transition-colors">
              <Icon path={svgPaths.p1d821780} size={24} fillColor="#373338" />
            </button>

            {/* Logo */}
            <img src={goodfinLogo} alt="Goodfin" className="h-6" />
          </>
        )}
      </div>

      {/* Right Side - Actions & Avatar */}
      <div className="flex items-center gap-4">
        {/* Action Buttons - Hidden when in conversation on mobile */}
        <div className={cn(
          "hidden md:flex items-center gap-2",
          isInConversation && "md:hidden lg:flex"
        )}>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.p1bc18500} size={18} fillColor="#48424A" />
            <span className="text-sm font-medium">Gift Card</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.p36a8ec00} size={18} fillColor="#48424A" />
            <span className="text-sm font-medium">Referrals</span>
          </button>
        </div>

        <button className={cn(
          "hidden md:block px-3 py-1.5 rounded text-[#373338] font-semibold hover:bg-black/5 transition-colors",
          isInConversation && "md:hidden lg:block"
        )}>
          Schedule a call
        </button>

        <Avatar fallback="AL" />
      </div>
    </header>
  );
}
