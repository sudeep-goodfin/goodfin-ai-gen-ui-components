import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, CustomIcon } from '../Icon';
import { svgPaths } from '../../svgPaths';

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
function GoodfinAIIcon() {
  return (
    <div className="relative w-6 h-6">
      {/* AI Avatar background */}
      <div className="absolute inset-0 rounded-[6px] overflow-hidden bg-gradient-to-br from-[#f4d1ff] via-[#f8bcd8] to-[#fcedd6]" />
      {/* Sparkle overlay */}
      <div className="absolute -top-1 -right-1">
        <CustomIcon viewBox="0 0 9 10" width={9} height={10}>
          <path
            clipRule="evenodd"
            d={svgPaths.sparkle}
            fill="#746876"
            fillRule="evenodd"
          />
        </CustomIcon>
      </div>
    </div>
  );
}

// Community Icon (custom multi-path)
function CommunityIcon({ className, color = "#8A7F91" }: { className?: string; color?: string }) {
  return (
    <CustomIcon viewBox="0 0 24 24" className={className} width={24} height={24}>
      <path clipRule="evenodd" d={svgPaths.community1} fill={color} fillRule="evenodd" />
      <path d={svgPaths.community2} fill={color} />
      <path clipRule="evenodd" d={svgPaths.community3} fill={color} fillRule="evenodd" />
    </CustomIcon>
  );
}

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-[72px] bg-[#edebee] border-r border-transparent h-full pt-4 pb-4 items-center shrink-0 overflow-y-auto">
      {/* Main Navigation */}
      <div className="flex flex-col gap-1 w-full items-center">
        {/* Goodfin AI */}
        <button className="flex flex-col items-center justify-center h-auto w-16 py-2.5 gap-1 rounded-lg hover:bg-black/5 transition-colors">
          <GoodfinAIIcon />
          <span className="text-[10px] leading-4 font-medium text-[#29272a]">Goodfin AI</span>
        </button>

        <SidebarItem label="Deals" iconPath={svgPaths.deals} />
        <SidebarItem label="Dashboard" iconPath={svgPaths.dashboard} />
        <SidebarItem label="Wishlist" iconPath={svgPaths.wishlist} />
        <SidebarItem label="Memberships" iconPath={svgPaths.memberships} />
        <SidebarItem label="Community" icon={<CommunityIcon className="text-[#8A7F91]" />} />
        <SidebarItem label="Events" iconPath={svgPaths.events} />
        <SidebarItem label="Referrals" iconPath={svgPaths.referrals} />
      </div>

      {/* Bottom Help */}
      <div className="mt-auto pt-4 flex flex-col w-full items-center">
        <SidebarItem label="Help" iconPath={svgPaths.help} />
      </div>
    </div>
  );
}
