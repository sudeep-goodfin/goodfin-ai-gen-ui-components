import React, { useState } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '../lib/utils';

type VariantOption = {
  id: string;
  label: string;
};

type ComponentOption = {
  id: string;
  label: string;
  component: React.ReactNode | ((variant: string) => React.ReactNode);
  icon: React.ReactNode;
  variants?: VariantOption[];
};

type ComponentShowcaseProps = {
  options: ComponentOption[];
};

export function ComponentShowcase({ options }: ComponentShowcaseProps) {
  const [activeId, setActiveId] = useState(options[0].id);
  const [variantStates, setVariantStates] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    options.forEach((opt) => {
      if (opt.variants && opt.variants.length > 0) {
        initial[opt.id] = opt.variants[0].id;
      }
    });
    return initial;
  });

  const activeOption = options.find((opt) => opt.id === activeId);
  const activeVariant = variantStates[activeId];
  const activeComponent = activeOption
    ? typeof activeOption.component === 'function'
      ? activeOption.component(activeVariant)
      : activeOption.component
    : null;

  const handleVariantChange = (variantId: string) => {
    setVariantStates((prev) => ({ ...prev, [activeId]: variantId }));
  };

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Thumbnail Selector */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
            Mocked GoodFin AI Interface Design
          </h2>

          {/* Horizontal ScrollArea for thumbnails */}
          <ScrollAreaPrimitive.Root className="relative overflow-hidden">
            <ScrollAreaPrimitive.Viewport className="w-full">
              <div className="flex gap-4 pb-3">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveId(option.id)}
                    className={cn(
                      'flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 group flex-shrink-0',
                      activeId === option.id
                        ? 'border-grey-950 bg-grey-100'
                        : 'border-border hover:border-grey-400 hover:bg-muted'
                    )}
                  >
                    {/* Thumbnail Preview Placeholder */}
                    <div
                      className={cn(
                        'w-full aspect-video rounded-lg flex items-center justify-center transition-colors',
                        activeId === option.id
                          ? 'bg-grey-200 text-grey-950'
                          : 'bg-muted text-muted-foreground group-hover:bg-card group-hover:text-grey-700'
                      )}
                    >
                      {option.icon}
                    </div>

                    <span
                      className={cn(
                        'text-sm font-medium',
                        activeId === option.id ? 'text-grey-950' : 'text-muted-foreground'
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
              orientation="horizontal"
              className="flex h-2.5 touch-none select-none flex-col border-t border-t-transparent p-[1px] transition-colors"
            >
              <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        </div>

        {/* Component Frame */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden min-h-[600px] relative">
          {/* Browser-like Header with Variant Selector */}
          <div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-card rounded-md border border-border text-xs text-muted-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Preview
              </div>
            </div>
            {/* Variant Selector - Outside preview */}
            {activeOption?.variants && activeOption.variants.length > 0 && (
              <div
                className="flex gap-1 p-1 rounded-xl"
                style={{ backgroundColor: '#F0EEF0' }}
              >
                {activeOption.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
                    )}
                    style={{
                      backgroundColor: activeVariant === variant.id ? '#FFFFFF' : 'transparent',
                      color: activeVariant === variant.id ? '#030303' : '#7F7582',
                      boxShadow: activeVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Component Render Area - Vertical ScrollArea */}
          <ScrollAreaPrimitive.Root className="relative overflow-hidden h-[800px]">
            <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] bg-muted/50">
              {activeComponent}
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
              orientation="vertical"
              className="flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
            >
              <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        </div>
      </div>
    </div>
  );
}
