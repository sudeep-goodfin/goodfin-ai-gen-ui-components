import React from 'react';
import { cn } from '../../lib/utils';

type SuggestionChipProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function SuggestionChip({ children, onClick, className }: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-2 bg-card border border-border rounded-full text-xs text-muted-foreground',
        'hover:border-accent hover:bg-accent/5 hover:text-accent transition-all',
        className
      )}
    >
      {children}
    </button>
  );
}

type SuggestionGroupProps = {
  suggestions: string[];
  label?: string;
  icon?: React.ReactNode;
  onSelect?: (suggestion: string) => void;
};

export function SuggestionGroup({ suggestions, label, icon, onSelect }: SuggestionGroupProps) {
  return (
    <div className="pt-2">
      {(label || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-accent">{icon}</span>}
          {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <SuggestionChip key={i} onClick={() => onSelect?.(suggestion)}>
            {suggestion}
          </SuggestionChip>
        ))}
      </div>
    </div>
  );
}
