import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, CustomIcon } from '../Icon';
import svgPaths from '../../imports/svg-191opiemcf';
import { CommunityIcon } from '../dashboard/icons';

export type SidebarNavItem = 'goodfin-ai' | 'deals' | 'dashboard' | 'wishlist' | 'memberships' | 'community' | 'events' | 'referrals' | 'help';

interface SidebarItemProps {
  label: string;
  iconPath?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem({ label, iconPath, icon, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center h-auto w-16 py-2.5 gap-1 rounded-lg hover:bg-black/5 transition-colors",
        isActive ? "text-[#29272a]" : "text-[#8a7f91]"
      )}
    >
      {icon ? icon : (iconPath && <Icon path={iconPath} size={24} fillColor={isActive ? "#29272a" : "#8A7F91"} />)}
      <span className="text-[10px] leading-4 font-medium">{label}</span>
    </button>
  );
}

// Goodfin AI Icon with sparkle overlay
function GoodfinAIIcon({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="relative w-6 h-6">
      {/* AI Avatar background */}
      <div className={cn(
        "absolute inset-0 rounded-[6px] overflow-hidden bg-gradient-to-br from-[#f4d1ff] via-[#f8bcd8] to-[#fcedd6]",
        !isActive && "opacity-70"
      )} />
      {/* Sparkle overlay */}
      <div className="absolute -top-1 -right-1">
        <CustomIcon viewBox="0 0 16 16" width={12} height={12}>
          <path
            d={svgPaths.p131a1900}
            fill="#746876"
          />
        </CustomIcon>
      </div>
    </div>
  );
}

interface SidebarProps {
  activeItem?: SidebarNavItem;
  onNavigate?: (item: SidebarNavItem) => void;
}

export function Sidebar({ activeItem = 'goodfin-ai', onNavigate }: SidebarProps) {
  const handleClick = (item: SidebarNavItem) => {
    onNavigate?.(item);
  };

  return (
    <div className="hidden md:flex flex-col w-[72px] bg-[#edebee] border-r border-transparent h-full pt-4 pb-4 items-center shrink-0 overflow-y-auto">
      {/* Main Navigation */}
      <div className="flex flex-col gap-1 w-full items-center">
        {/* Goodfin AI */}
        <button
          onClick={() => handleClick('goodfin-ai')}
          className={cn(
            "flex flex-col items-center justify-center h-auto w-16 py-2.5 gap-1 rounded-lg hover:bg-black/5 transition-colors",
            activeItem === 'goodfin-ai' ? "text-[#29272a]" : "text-[#8a7f91]"
          )}
        >
          <GoodfinAIIcon isActive={activeItem === 'goodfin-ai'} />
          <span className="text-[10px] leading-4 font-medium">Goodfin AI</span>
        </button>

        <SidebarItem
          label="Deals"
          iconPath={svgPaths.p3fc6c580}
          isActive={activeItem === 'deals'}
          onClick={() => handleClick('deals')}
        />
        <SidebarItem
          label="Dashboard"
          iconPath={svgPaths.p1b13d600}
          isActive={activeItem === 'dashboard'}
          onClick={() => handleClick('dashboard')}
        />
        <SidebarItem
          label="Wishlist"
          iconPath={svgPaths.p29b8e6f1}
          isActive={activeItem === 'wishlist'}
          onClick={() => handleClick('wishlist')}
        />
        <SidebarItem
          label="Memberships"
          iconPath={svgPaths.p1b20f380}
          isActive={activeItem === 'memberships'}
          onClick={() => handleClick('memberships')}
        />
        <SidebarItem
          label="Community"
          icon={<CommunityIcon className={activeItem === 'community' ? "text-[#29272a]" : "text-[#8A7F91]"} />}
          isActive={activeItem === 'community'}
          onClick={() => handleClick('community')}
        />
        <SidebarItem
          label="Events"
          iconPath={svgPaths.p3ace5780}
          isActive={activeItem === 'events'}
          onClick={() => handleClick('events')}
        />
        <SidebarItem
          label="Referrals"
          iconPath={svgPaths.p36a8ec00}
          isActive={activeItem === 'referrals'}
          onClick={() => handleClick('referrals')}
        />
      </div>

      {/* Bottom Help */}
      <div className="mt-auto pt-4 flex flex-col w-full items-center">
        <SidebarItem
          label="Help"
          iconPath={svgPaths.p1a65d500}
          isActive={activeItem === 'help'}
          onClick={() => handleClick('help')}
        />
      </div>
    </div>
  );
}
