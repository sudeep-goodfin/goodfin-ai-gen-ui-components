import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Suggestion item props
export interface SuggestionItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: string;
  onClick?: () => void;
  className?: string;
}

export function SuggestionCard({
  icon,
  title,
  subtitle,
  action,
  onClick,
  className,
}: SuggestionItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full bg-card rounded-xl p-4 shadow-sm border border-border flex items-center gap-4 cursor-pointer hover:border-accent/30 hover:shadow-md transition-all group",
        className
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-sm text-foreground font-medium leading-5">{title}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground font-light leading-4">{subtitle}</div>
        )}
      </div>

      {/* Action */}
      {action && (
        <div className="flex items-center gap-1 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {action}
          <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}

// Suggestions list component
interface SuggestionsListProps {
  suggestions: Omit<SuggestionItemProps, 'onClick'>[];
  title?: string;
  onSuggestionClick?: (suggestion: Omit<SuggestionItemProps, 'onClick'>) => void;
  className?: string;
}

export function SuggestionsList({
  suggestions,
  title = "Suggested Actions",
  onSuggestionClick,
  className,
}: SuggestionsListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title && (
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1 px-1">
          {title}
        </div>
      )}
      {suggestions.map((suggestion, index) => (
        <SuggestionCard
          key={index}
          {...suggestion}
          onClick={() => onSuggestionClick?.(suggestion)}
        />
      ))}
    </div>
  );
}
