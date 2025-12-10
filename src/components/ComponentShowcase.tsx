import React, { useState } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { MessageSquare, Layers, Sparkles, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { Checkbox } from './ui';
import { ConversationView, aiGreetingConversationFlow, spaceXInvestmentFlow } from './chat';
import {
  AIGreetingContent,
  accreditedSubStates,
  nonAccreditedSubStates,
  type AIGreetingVariant,
  type AccreditationStatus,
} from './views';

// Conversation flow options
type ConversationFlowOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const conversationFlowOptions: ConversationFlowOption[] = [
  { id: 'ai-greeting', label: 'AI Greeting', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'investment-flow', label: 'Investment Flow', icon: <DollarSign className="w-5 h-5" /> },
];

type VariantOption = {
  id: string;
  label: string;
};

type ComponentOptions = {
  showPresets?: boolean;
  showStepper?: boolean;
  showSuggestions?: boolean;
};

type ComponentOption = {
  id: string;
  label: string;
  component: React.ReactNode | ((variant: string, options?: ComponentOptions) => React.ReactNode);
  icon: React.ReactNode;
  variants?: VariantOption[];
};

type ViewMode = 'component' | 'conversation';

type ComponentShowcaseProps = {
  options: ComponentOption[];
};

export function ComponentShowcase({ options }: ComponentShowcaseProps) {
  const [activeId, setActiveId] = useState(options[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>('component');
  const [activeConversationFlow, setActiveConversationFlow] = useState('ai-greeting');
  // Two-level selector state for AI Greeting
  const [accreditationStatus, setAccreditationStatus] = useState<AccreditationStatus>('accredited');
  const [accreditedSubState, setAccreditedSubState] = useState<string>('first-time');
  const [nonAccreditedSubState, setNonAccreditedSubState] = useState<string>('first-time');
  const [variantStates, setVariantStates] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    options.forEach((opt) => {
      if (opt.variants && opt.variants.length > 0) {
        initial[opt.id] = opt.variants[0].id;
      }
    });
    return initial;
  });

  // Block-04 specific state for card visibility toggles
  const [showPresets, setShowPresets] = useState(true);
  const [showStepper, setShowStepper] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const activeOption = options.find((opt) => opt.id === activeId);
  const activeVariant = variantStates[activeId];

  // Build component options for block-04
  const componentOptions: ComponentOptions = {
    showPresets,
    showStepper,
    showSuggestions,
  };

  const activeComponent = activeOption
    ? typeof activeOption.component === 'function'
      ? activeOption.component(activeVariant, componentOptions)
      : activeOption.component
    : null;

  // Build components map for the conversation view
  const getComponentForId = (id: string) => {
    const option = options.find((opt) => opt.id === id);
    if (!option) return null;
    return typeof option.component === 'function'
      ? option.component(variantStates[id] || (option.variants?.[0]?.id ?? ''))
      : option.component;
  };

  // Derive the greeting variant from two-level state
  const conversationGreetingVariant: AIGreetingVariant = accreditationStatus === 'accredited'
    ? `accredited-${accreditedSubState}` as AIGreetingVariant
    : `non-accredited-${nonAccreditedSubState}` as AIGreetingVariant;

  const conversationComponents: Record<string, React.ReactNode> = {
    // Use AIGreetingContent (without ChatLayout) for embedding in conversation
    // Key forces remount when variant changes to restart animation
    'ai-greeting': (
      <div key={conversationGreetingVariant}>
        <AIGreetingContent variant={conversationGreetingVariant} showReplayButton={true} />
      </div>
    ),
    'deal-preview': getComponentForId('deal-preview'),
    'investment-risk': getComponentForId('investment-risk'),
    'document-detail': getComponentForId('document-detail'),
    'document-detail-2': getComponentForId('document-detail'),
    'signature-input': getComponentForId('signature-input'),
  };

  const handleVariantChange = (variantId: string) => {
    setVariantStates((prev) => ({ ...prev, [activeId]: variantId }));
  };

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* View Mode Toggle - Above Title */}
        <div
          className="flex gap-1 p-1 rounded-xl w-fit"
          style={{ backgroundColor: '#F0EEF0' }}
        >
          <button
            onClick={() => setViewMode('component')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all'
            )}
            style={{
              backgroundColor: viewMode === 'component' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'component' ? '#030303' : '#7F7582',
              boxShadow: viewMode === 'component' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <Layers className="w-4 h-4" />
            Component
          </button>
          <button
            onClick={() => setViewMode('conversation')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all'
            )}
            style={{
              backgroundColor: viewMode === 'conversation' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'conversation' ? '#030303' : '#7F7582',
              boxShadow: viewMode === 'conversation' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Conversation
          </button>
        </div>

        {/* Header & Thumbnail Selector - Only show in component mode */}
        {viewMode === 'component' && (
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
        )}

        {/* Component Frame - Only show in component mode */}
        {viewMode === 'component' && (
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
              {/* Block-04 Card Toggle Options */}
              {activeId === 'deal-page-investment' && activeVariant === 'block-04' && (
                <div className="flex gap-4 mr-4">
                  <Checkbox
                    checked={showPresets}
                    onChange={setShowPresets}
                    label="Presets"
                  />
                  <Checkbox
                    checked={showStepper}
                    onChange={setShowStepper}
                    label="Stepper"
                  />
                  <Checkbox
                    checked={showSuggestions}
                    onChange={setShowSuggestions}
                    label="Suggestions"
                  />
                </div>
              )}
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

            {/* Render Area - Vertical ScrollArea */}
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
        )}

        {/* Conversation View - Full Concierge chat interface */}
        {viewMode === 'conversation' && (
          <>
            {/* Conversation Flow Selector */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
                Mocked GoodFin AI Conversation Flows
              </h2>

              {/* Flow Selector Thumbnails */}
              <div className="flex gap-4">
                {conversationFlowOptions.map((flow) => (
                  <button
                    key={flow.id}
                    onClick={() => setActiveConversationFlow(flow.id)}
                    className={cn(
                      'flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 group flex-shrink-0',
                      activeConversationFlow === flow.id
                        ? 'border-grey-950 bg-grey-100'
                        : 'border-border hover:border-grey-400 hover:bg-muted'
                    )}
                  >
                    {/* Thumbnail Preview Placeholder */}
                    <div
                      className={cn(
                        'w-full aspect-video rounded-lg flex items-center justify-center transition-colors',
                        activeConversationFlow === flow.id
                          ? 'bg-grey-200 text-grey-950'
                          : 'bg-muted text-muted-foreground group-hover:bg-card group-hover:text-grey-700'
                      )}
                    >
                      {flow.icon}
                    </div>

                    <span
                      className={cn(
                        'text-sm font-medium',
                        activeConversationFlow === flow.id ? 'text-grey-950' : 'text-muted-foreground'
                      )}
                    >
                      {flow.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Two-level State Selector - Shows when AI Greeting is selected */}
              {activeConversationFlow === 'ai-greeting' && (
                <div className="mt-4 pt-4 border-t border-border">
                  {/* Level 1: Accreditation Status */}
                  <p className="text-sm text-muted-foreground mb-3">Persona Type</p>
                  <div
                    className="flex gap-1 p-1 rounded-xl w-fit"
                    style={{ backgroundColor: '#F0EEF0' }}
                  >
                    <button
                      onClick={() => setAccreditationStatus('accredited')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
                      )}
                      style={{
                        backgroundColor: accreditationStatus === 'accredited' ? '#FFFFFF' : 'transparent',
                        color: accreditationStatus === 'accredited' ? '#030303' : '#7F7582',
                        boxShadow: accreditationStatus === 'accredited' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                      }}
                    >
                      Accredited
                    </button>
                    <button
                      onClick={() => setAccreditationStatus('non-accredited')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
                      )}
                      style={{
                        backgroundColor: accreditationStatus === 'non-accredited' ? '#FFFFFF' : 'transparent',
                        color: accreditationStatus === 'non-accredited' ? '#030303' : '#7F7582',
                        boxShadow: accreditationStatus === 'non-accredited' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                      }}
                    >
                      Non-Accredited
                    </button>
                  </div>

                  {/* Level 2: Sub-state based on accreditation */}
                  <p className="text-sm text-muted-foreground mb-3 mt-4">User State</p>
                  <div
                    className="flex gap-1 p-1 rounded-xl w-fit"
                    style={{ backgroundColor: '#F0EEF0' }}
                  >
                    {(accreditationStatus === 'accredited' ? accreditedSubStates : nonAccreditedSubStates).map((subState) => {
                      const currentSubState = accreditationStatus === 'accredited' ? accreditedSubState : nonAccreditedSubState;
                      const setSubState = accreditationStatus === 'accredited' ? setAccreditedSubState : setNonAccreditedSubState;
                      return (
                        <button
                          key={subState.id}
                          onClick={() => setSubState(subState.id)}
                          className={cn(
                            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
                          )}
                          style={{
                            backgroundColor: currentSubState === subState.id ? '#FFFFFF' : 'transparent',
                            color: currentSubState === subState.id ? '#030303' : '#7F7582',
                            boxShadow: currentSubState === subState.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {subState.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Conversation Frame */}
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden min-h-[600px] relative">
              {/* Browser-like Header */}
              <div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-card rounded-md border border-border text-xs text-muted-foreground font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {conversationFlowOptions.find(f => f.id === activeConversationFlow)?.label || 'Conversation'}
                  </div>
                </div>
              </div>

              {/* Render Area - Vertical ScrollArea */}
              <ScrollAreaPrimitive.Root className="relative overflow-hidden h-[800px]">
                <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] bg-muted/50">
                  <ConversationView
                    messages={activeConversationFlow === 'ai-greeting' ? aiGreetingConversationFlow : spaceXInvestmentFlow}
                    components={conversationComponents}
                  />
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
          </>
        )}
      </div>
    </div>
  );
}
