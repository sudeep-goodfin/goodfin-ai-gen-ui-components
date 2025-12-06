import React, { useState } from 'react';
import { cn } from '../lib/utils';

type ComponentOption = {
  id: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};

type ComponentShowcaseProps = {
  options: ComponentOption[];
};

export function ComponentShowcase({ options }: ComponentShowcaseProps) {
  const [activeId, setActiveId] = useState(options[0].id);
  const activeComponent = options.find((opt) => opt.id === activeId)?.component;

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Thumbnail Selector */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Component Showcase
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveId(option.id)}
                className={cn(
                  'flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 group',
                  activeId === option.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 hover:bg-muted'
                )}
              >
                {/* Thumbnail Preview Placeholder */}
                <div
                  className={cn(
                    'w-full aspect-video rounded-lg flex items-center justify-center transition-colors',
                    activeId === option.id
                      ? 'bg-accent/10 text-accent'
                      : 'bg-muted text-muted-foreground group-hover:bg-card group-hover:text-accent'
                  )}
                >
                  {option.icon}
                </div>

                <span
                  className={cn(
                    'text-sm font-medium',
                    activeId === option.id ? 'text-accent' : 'text-muted-foreground'
                  )}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Component Frame */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden min-h-[600px] relative">
          {/* Browser-like Header */}
          <div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
              <div className="w-3 h-3 rounded-full bg-warning/60"></div>
              <div className="w-3 h-3 rounded-full bg-success/60"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-card rounded-md border border-border text-xs text-muted-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Live Preview
              </div>
            </div>
          </div>

          {/* Component Render Area */}
          <div className="h-[800px] overflow-y-auto bg-muted/50 relative">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
}
