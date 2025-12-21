import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, CustomIcon } from './Icon';
import { iconPaths } from './icons';

// Sidebar Item component
interface SidebarItemProps {
  label: string;
  iconPath?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SidebarItem({ label, iconPath, icon, isActive, onClick, className }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center h-auto w-16 py-2.5 gap-1 rounded-lg hover:bg-foreground/5 transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground",
        className
      )}
    >
      {icon ? (
        icon
      ) : iconPath ? (
        <Icon path={iconPath} size={24} className={isActive ? "text-foreground" : "text-muted-foreground"} />
      ) : null}
      <span className="text-[10px] leading-4 font-medium">{label}</span>
    </button>
  );
}

// Community Icon (composite icon)
export function CommunityIcon({ className, isActive }: { className?: string; isActive?: boolean }) {
  const color = isActive ? "currentColor" : "currentColor";
  return (
    <CustomIcon viewBox="0 0 24 24" className={cn(isActive ? "text-foreground" : "text-muted-foreground", className)} width={24} height={24}>
      <path clipRule="evenodd" d={iconPaths.community.path1} fill={color} fillRule="evenodd" />
      <path d={iconPaths.community.path2} fill={color} />
      <path clipRule="evenodd" d={iconPaths.community.path3} fill={color} fillRule="evenodd" />
    </CustomIcon>
  );
}

// AI Icon with sparkle overlay
interface AIIconProps {
  className?: string;
}

export function AIIcon({ className }: AIIconProps) {
  return (
    <div className={cn("relative w-6 h-6", className)}>
      {/* AI Avatar background */}
      <div className="absolute inset-0 rounded-[6px] overflow-hidden bg-gradient-to-br from-[#f4d1ff] via-[#f8bcd8] to-[#fcedd6]" />
      {/* Sparkle overlay */}
      <div className="absolute -top-1 -right-1">
        <CustomIcon viewBox="0 0 16 16" width={12} height={12}>
          <path d={iconPaths.sparkle} fill="currentColor" className="text-muted-foreground" />
        </CustomIcon>
      </div>
    </div>
  );
}

// Navigation item configuration
export interface NavItem {
  id: string;
  label: string;
  iconPath?: string;
  icon?: React.ReactNode;
}

// Main Sidebar component
interface SidebarProps {
  items?: NavItem[];
  bottomItems?: NavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

export function Sidebar({
  items = [],
  bottomItems = [],
  activeItem,
  onItemClick,
  header,
  footer,
  className,
  hidden = false,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex-col w-[72px] bg-muted border-r border-transparent h-full pt-4 pb-4 items-center shrink-0 overflow-y-auto",
        hidden ? "hidden" : "hidden md:flex",
        className
      )}
    >
      {/* Header slot */}
      {header}

      {/* Main Navigation */}
      <div className="flex flex-col gap-1 w-full items-center">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            iconPath={item.iconPath}
            icon={item.icon}
            isActive={activeItem === item.id}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      {bottomItems.length > 0 && (
        <div className="mt-auto pt-4 flex flex-col w-full items-center">
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.id}
              label={item.label}
              iconPath={item.iconPath}
              icon={item.icon}
              isActive={activeItem === item.id}
              onClick={() => onItemClick?.(item.id)}
            />
          ))}
        </div>
      )}

      {/* Footer slot */}
      {footer}
    </div>
  );
}

// Pre-configured default sidebar with common navigation items
interface DefaultSidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
  className?: string;
  showAI?: boolean;
}

export function DefaultSidebar({
  activeItem = 'ai',
  onItemClick,
  className,
  showAI = true,
}: DefaultSidebarProps) {
  const defaultItems: NavItem[] = [
    ...(showAI ? [{ id: 'ai', label: 'Goodfin AI', icon: <AIIcon /> }] : []),
    { id: 'deals', label: 'Deals', iconPath: iconPaths.deals },
    { id: 'dashboard', label: 'Dashboard', iconPath: iconPaths.dashboard },
    { id: 'wishlist', label: 'Wishlist', iconPath: iconPaths.wishlist },
    { id: 'memberships', label: 'Memberships', iconPath: iconPaths.memberships },
    { id: 'community', label: 'Community', icon: <CommunityIcon isActive={activeItem === 'community'} /> },
    { id: 'events', label: 'Events', iconPath: iconPaths.events },
    { id: 'referrals', label: 'Referrals', iconPath: iconPaths.referrals },
  ];

  const bottomItems: NavItem[] = [
    { id: 'help', label: 'Help', iconPath: iconPaths.help },
  ];

  return (
    <Sidebar
      items={defaultItems}
      bottomItems={bottomItems}
      activeItem={activeItem}
      onItemClick={onItemClick}
      className={className}
    />
  );
}
