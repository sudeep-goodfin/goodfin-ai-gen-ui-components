import React, { useState, useCallback } from 'react';
import { Link2, Check, Maximize2, ArrowLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

type HeaderProps = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  onFullscreen?: () => void;
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
  className?: string;
};

export function Header({
  title,
  breadcrumbs = [],
  onFullscreen,
  onMenuToggle,
  showMenuButton = true,
  className,
}: HeaderProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  // For mobile: show only last 2 breadcrumbs with ellipsis
  const getMobileBreadcrumbs = () => {
    if (breadcrumbs.length <= 2) return breadcrumbs;
    return [
      { label: '...', onClick: undefined },
      ...breadcrumbs.slice(-2)
    ];
  };

  const mobileBreadcrumbs = getMobileBreadcrumbs();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-3 md:px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      {/* Left: Menu button + Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm min-w-0 flex-1">
        {/* Mobile menu button */}
        {showMenuButton && onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Desktop breadcrumbs - full */}
        <div className="hidden md:flex items-center gap-2 min-w-0">
          {breadcrumbs.length > 0 ? (
            breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium whitespace-nowrap truncate">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-foreground font-medium">{title}</span>
          )}
        </div>

        {/* Mobile breadcrumbs - truncated */}
        <div className="flex md:hidden items-center gap-1.5 min-w-0 overflow-hidden">
          {mobileBreadcrumbs.length > 0 ? (
            mobileBreadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                )}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs whitespace-nowrap"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium text-xs whitespace-nowrap truncate">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-foreground font-medium text-xs">{title}</span>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Copy Link Button */}
        <button
          onClick={copyShareLink}
          className={cn(
            'flex items-center gap-2 px-2 md:px-3 py-1.5 text-sm rounded-md border border-border transition-all',
            'hover:bg-muted text-muted-foreground hover:text-foreground',
            linkCopied && 'bg-success/10 border-success text-success'
          )}
        >
          {linkCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </button>

        {/* Fullscreen Button */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="flex items-center gap-2 px-2 md:px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        )}
      </div>
    </header>
  );
}

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  backButton?: {
    label: string;
    onClick: () => void;
  };
};

export function PageHeader({ title, description, badge, backButton }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backButton && (
        <button
          onClick={backButton.onClick}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backButton.label}
        </button>
      )}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold text-foreground font-heading">{title}</h1>
        {badge && (
          <span className="text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground font-medium">
            {badge}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
