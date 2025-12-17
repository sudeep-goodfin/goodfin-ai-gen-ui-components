import React, { useState, useCallback } from 'react';
import { Link2, Check, Maximize2, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

type HeaderProps = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  onFullscreen?: () => void;
  className?: string;
};

export function Header({
  title,
  breadcrumbs = [],
  onFullscreen,
  className,
}: HeaderProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))
        ) : (
          <span className="text-foreground font-medium">{title}</span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Copy Link Button */}
        <button
          onClick={copyShareLink}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border transition-all',
            'hover:bg-muted text-muted-foreground hover:text-foreground',
            linkCopied && 'bg-success/10 border-success text-success'
          )}
        >
          {linkCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Fullscreen Button */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Fullscreen</span>
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
