import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, CustomIcon } from '../Icon';
import svgPaths from '../../imports/svg-191opiemcf';
import { CommunityIcon } from '../dashboard/icons';

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

        <SidebarItem label="Deals" iconPath={svgPaths.p3fc6c580} />
        <SidebarItem label="Dashboard" iconPath={svgPaths.p1b13d600} />
        <SidebarItem label="Wishlist" iconPath={svgPaths.p29b8e6f1} />
        <SidebarItem label="Memberships" iconPath={svgPaths.p1b20f380} />
        <SidebarItem label="Community" icon={<CommunityIcon className="text-[#8A7F91]" />} />
        <SidebarItem label="Events" iconPath={svgPaths.p3ace5780} />
        <SidebarItem label="Referrals" iconPath={svgPaths.p36a8ec00} />
      </div>

      {/* Bottom Help */}
      <div className="mt-auto pt-4 flex flex-col w-full items-center">
        <SidebarItem label="Help" iconPath={svgPaths.p1a65d500} />
      </div>
    </div>
  );
}
