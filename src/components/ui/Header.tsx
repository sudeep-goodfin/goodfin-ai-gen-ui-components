import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { iconPaths } from './icons';

// Avatar component
interface AvatarProps {
  src?: string;
  fallback: string;
  className?: string;
}

export function Avatar({ src, fallback, className }: AvatarProps) {
  return (
    <div className={cn("h-8 w-8 rounded-full overflow-hidden bg-muted", className)}>
      {src ? (
        <img src={src} alt="User avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-muted-foreground">
          {fallback}
        </div>
      )}
    </div>
  );
}

// Header action button
interface HeaderActionProps {
  icon?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function HeaderAction({ icon, label, onClick, className }: HeaderActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded text-muted-foreground hover:bg-foreground/5 transition-colors",
        className
      )}
    >
      {icon && <Icon path={icon} size={18} />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// Main Header component
interface HeaderProps {
  logo?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  onMenuClick?: () => void;
  showMenu?: boolean;
  actions?: React.ReactNode;
  avatar?: {
    src?: string;
    fallback: string;
    onClick?: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  logo,
  logoSrc,
  logoAlt = "Logo",
  onMenuClick,
  showMenu = true,
  actions,
  avatar,
  className,
  children,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between w-full h-16 bg-muted px-4 shadow-sm shrink-0 z-10",
        className
      )}
    >
      {/* Left Side - Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="w-8 h-8 p-1 rounded hover:bg-foreground/5 transition-colors"
          >
            <Icon path={iconPaths.menu} size={24} className="text-foreground" />
          </button>
        )}

        {/* Logo */}
        {logo ? (
          logo
        ) : logoSrc ? (
          <img src={logoSrc} alt={logoAlt} className="h-6" />
        ) : null}
      </div>

      {/* Center - Custom children */}
      {children}

      {/* Right Side - Actions & Avatar */}
      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}

        {/* Avatar */}
        {avatar && (
          <button onClick={avatar.onClick} className="focus:outline-none focus:ring-2 focus:ring-accent rounded-full">
            <Avatar src={avatar.src} fallback={avatar.fallback} />
          </button>
        )}
      </div>
    </header>
  );
}

// Pre-configured default header with common actions
interface DefaultHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  onMenuClick?: () => void;
  showMenu?: boolean;
  showGiftCard?: boolean;
  showReferrals?: boolean;
  showScheduleCall?: boolean;
  onGiftCardClick?: () => void;
  onReferralsClick?: () => void;
  onScheduleCallClick?: () => void;
  avatar?: {
    src?: string;
    fallback: string;
    onClick?: () => void;
  };
  className?: string;
}

export function DefaultHeader({
  logoSrc,
  logoAlt = "Logo",
  onMenuClick,
  showMenu = true,
  showGiftCard = true,
  showReferrals = true,
  showScheduleCall = true,
  onGiftCardClick,
  onReferralsClick,
  onScheduleCallClick,
  avatar,
  className,
}: DefaultHeaderProps) {
  return (
    <Header
      logoSrc={logoSrc}
      logoAlt={logoAlt}
      onMenuClick={onMenuClick}
      showMenu={showMenu}
      avatar={avatar}
      className={className}
      actions={
        <>
          {showGiftCard && (
            <HeaderAction icon={iconPaths.gift} label="Gift Card" onClick={onGiftCardClick} />
          )}
          {showReferrals && (
            <HeaderAction icon={iconPaths.referrals} label="Referrals" onClick={onReferralsClick} />
          )}
          {showScheduleCall && (
            <button
              onClick={onScheduleCallClick}
              className="hidden md:block px-3 py-1.5 rounded text-foreground font-semibold hover:bg-foreground/5 transition-colors"
            >
              Schedule a call
            </button>
          )}
        </>
      }
    />
  );
}
