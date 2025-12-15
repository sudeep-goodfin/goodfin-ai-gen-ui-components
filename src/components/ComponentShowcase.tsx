import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { MessageSquare, Layers, Sparkles, DollarSign, Link2, Check, RotateCcw, UserPlus, Maximize2, X, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Checkbox, Button } from './ui';
import { ConversationView, aiGreetingConversationFlow, spaceXInvestmentFlow } from './chat';
import {
  AIGreetingContent,
  accreditedSubStates,
  nonAccreditedSubStates,
  OnboardingView,
  onboardingVariants,
  SignatureInputContent,
  ApplyCreditContent,
  PromoCodeContent,
  InvestorProfileContent,
  BankSelectionContent,
  CountrySelectionContent,
  WireInstructionsContent,
  SignableDocumentCard,
  type AIGreetingVariant,
  type AccreditationStatus,
  type OnboardingVariant,
} from './views';

// URL parameter helpers
const getUrlParams = () => new URLSearchParams(window.location.search);

const updateUrlParams = (params: Record<string, string | boolean | undefined>) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      url.searchParams.delete(key);
    } else if (typeof value === 'boolean') {
      url.searchParams.set(key, value ? '1' : '0');
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.replaceState({}, '', url.toString());
};

const getBoolParam = (params: URLSearchParams, key: string, defaultValue: boolean): boolean => {
  const value = params.get(key);
  if (value === null) return defaultValue;
  return value === '1';
};

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
  presetCount?: 3 | 6;
};

type ComponentOption = {
  id: string;
  label: string;
  component: React.ReactNode | ((variant: string, options?: ComponentOptions) => React.ReactNode);
  icon: React.ReactNode;
  variants?: VariantOption[];
};

type ComponentGroup = {
  id: string;
  label: string;
  components: ComponentOption[];
};

type ViewMode = 'component' | 'conversation' | 'onboarding';

type ComponentShowcaseProps = {
  options: ComponentOption[];
  groups?: ComponentGroup[];
};

export function ComponentShowcase({ options, groups }: ComponentShowcaseProps) {
  // Flatten all components from groups if provided, otherwise use options
  const allComponents = groups
    ? groups.flatMap(g => g.components)
    : options;

  // Initialize state from URL parameters
  const [activeGroupId, setActiveGroupId] = useState(() => {
    if (!groups) return '';
    const params = getUrlParams();
    const groupId = params.get('group');
    return groupId && groups.some(g => g.id === groupId) ? groupId : groups[0].id;
  });

  const [activeId, setActiveId] = useState(() => {
    const params = getUrlParams();
    const componentId = params.get('component');
    if (componentId && allComponents.some(opt => opt.id === componentId)) {
      return componentId;
    }
    // Default to first component in first group, or first option
    if (groups && groups.length > 0) {
      return groups[0].components[0]?.id || '';
    }
    return options[0]?.id || '';
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const params = getUrlParams();
    const mode = params.get('view');
    if (mode === 'conversation') return 'conversation';
    if (mode === 'onboarding') return 'onboarding';
    return 'component';
  });
  const [activeOnboardingVariant, setActiveOnboardingVariant] = useState<OnboardingVariant>(() => {
    const params = getUrlParams();
    const variant = params.get('onboardingVariant');
    return (variant as OnboardingVariant) || 'signup';
  });
  const [onboardingKey, setOnboardingKey] = useState(0);
  const [activeConversationFlow, setActiveConversationFlow] = useState(() => {
    const params = getUrlParams();
    return params.get('flow') || 'ai-greeting';
  });
  // Two-level selector state for AI Greeting
  const [accreditationStatus, setAccreditationStatus] = useState<AccreditationStatus>(() => {
    const params = getUrlParams();
    const status = params.get('accreditation');
    return status === 'non-accredited' ? 'non-accredited' : 'accredited';
  });
  const [accreditedSubState, setAccreditedSubState] = useState<string>(() => {
    const params = getUrlParams();
    return params.get('accreditedState') || 'first-time';
  });
  const [nonAccreditedSubState, setNonAccreditedSubState] = useState<string>(() => {
    const params = getUrlParams();
    return params.get('nonAccreditedState') || 'first-time';
  });
  const [variantStates, setVariantStates] = useState<Record<string, string>>(() => {
    const params = getUrlParams();
    const initial: Record<string, string> = {};
    allComponents.forEach((opt) => {
      if (opt.variants && opt.variants.length > 0) {
        const urlVariant = params.get(`variant_${opt.id}`);
        initial[opt.id] = urlVariant && opt.variants.some(v => v.id === urlVariant)
          ? urlVariant
          : opt.variants[0].id;
      }
    });
    return initial;
  });

  // Block-04 specific state for card visibility toggles
  const [showPresets, setShowPresets] = useState(() => getBoolParam(getUrlParams(), 'presets', true));
  const [showStepper, setShowStepper] = useState(() => getBoolParam(getUrlParams(), 'stepper', true));
  const [showSuggestions, setShowSuggestions] = useState(() => getBoolParam(getUrlParams(), 'suggestions', true));
  const [presetCount, setPresetCount] = useState<3 | 6>(() => {
    const params = getUrlParams();
    const count = params.get('presetCount');
    return count === '3' ? 3 : 6;
  });

  // Copy link feedback state
  const [linkCopied, setLinkCopied] = useState(false);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC key handler for exiting fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Replay function ref for AI greeting animation
  const replayFnRef = useRef<(() => void) | null>(null);

  const handleReplayRequest = useCallback((replayFn: () => void) => {
    replayFnRef.current = replayFn;
  }, []);

  const triggerReplay = useCallback(() => {
    if (replayFnRef.current) {
      replayFnRef.current();
    }
  }, []);

  // Update URL when state changes
  useEffect(() => {
    const params: Record<string, string | boolean | undefined> = {
      view: viewMode,
      group: viewMode === 'component' && groups ? activeGroupId : undefined,
      component: viewMode === 'component' ? activeId : undefined,
      [`variant_${activeId}`]: viewMode === 'component' ? variantStates[activeId] : undefined,
      flow: viewMode === 'conversation' ? activeConversationFlow : undefined,
      accreditation: viewMode === 'conversation' && activeConversationFlow === 'ai-greeting' ? accreditationStatus : undefined,
      accreditedState: viewMode === 'conversation' && activeConversationFlow === 'ai-greeting' && accreditationStatus === 'accredited' ? accreditedSubState : undefined,
      nonAccreditedState: viewMode === 'conversation' && activeConversationFlow === 'ai-greeting' && accreditationStatus === 'non-accredited' ? nonAccreditedSubState : undefined,
      onboardingVariant: viewMode === 'onboarding' ? activeOnboardingVariant : undefined,
    };

    // Add block-04 specific params
    if (viewMode === 'component' && activeId === 'deal-page-investment' && variantStates[activeId] === 'block-04') {
      params.presets = showPresets;
      params.stepper = showStepper;
      params.suggestions = showSuggestions;
      params.presetCount = String(presetCount);
    }

    updateUrlParams(params);
  }, [viewMode, activeId, activeGroupId, groups, variantStates, activeConversationFlow, accreditationStatus, accreditedSubState, nonAccreditedSubState, showPresets, showStepper, showSuggestions, presetCount, activeOnboardingVariant]);

  // Copy current URL to clipboard
  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  const activeOption = allComponents.find((opt) => opt.id === activeId);
  const activeVariant = variantStates[activeId];
  const activeGroup = groups?.find(g => g.id === activeGroupId);
  const displayComponents = groups ? (activeGroup?.components || []) : options;

  // Build component options for block-04
  const componentOptions: ComponentOptions = {
    showPresets,
    showStepper,
    showSuggestions,
    presetCount,
  };

  const activeComponent = activeOption
    ? typeof activeOption.component === 'function'
      ? activeOption.component(activeVariant, componentOptions)
      : activeOption.component
    : null;

  // Build components map for the conversation view
  const getComponentForId = (id: string) => {
    const option = allComponents.find((opt) => opt.id === id);
    if (!option) return null;
    return typeof option.component === 'function'
      ? option.component(variantStates[id] || (option.variants?.[0]?.id ?? ''))
      : option.component;
  };

  // Handler for changing groups
  const handleGroupChange = (groupId: string) => {
    setActiveGroupId(groupId);
    const group = groups?.find(g => g.id === groupId);
    if (group && group.components.length > 0) {
      setActiveId(group.components[0].id);
    }
  };

  // Derive the greeting variant from two-level state
  const conversationGreetingVariant: AIGreetingVariant = accreditationStatus === 'accredited'
    ? `accredited-${accreditedSubState}` as AIGreetingVariant
    : `non-accredited-${nonAccreditedSubState}` as AIGreetingVariant;

  // Document signing content component for conversation embedding
  const DocumentSigningContent = () => (
    <div className="space-y-4">
      <p style={{ color: 'var(--chat-ai-foreground)' }}>
        I've prepared the documents for your signature. Please review and sign
        the Private Placement Memorandum to proceed.
      </p>
      <div className="space-y-3 pt-2">
        <SignableDocumentCard
          title="Subscription Agreement"
          subtitle="Signed on Oct 24, 2023"
          status="signed"
        />
        <SignableDocumentCard
          title="Private Placement Memorandum"
          subtitle="Waiting for signature"
          status="pending"
        />
      </div>
      <p className="text-sm pt-2" style={{ color: '#7F7582' }}>
        Once signed, we'll process your investment allocation immediately.
      </p>
    </div>
  );

  const conversationComponents: Record<string, React.ReactNode> = {
    // Use AIGreetingContent (without ChatLayout) for embedding in conversation
    // Key forces remount when variant changes to restart animation
    // showReplayButton={false} - button moved to conversation flows header
    'ai-greeting': (
      <div key={conversationGreetingVariant}>
        <AIGreetingContent
          variant={conversationGreetingVariant}
          showReplayButton={false}
          onReplayRequest={handleReplayRequest}
        />
      </div>
    ),
    'deal-preview': getComponentForId('deal-preview'),
    'investment-risk': getComponentForId('investment-risk'),
    'document-detail': getComponentForId('document-detail'),
    'document-detail-2': getComponentForId('document-detail'),
    // Use content-only components for investment flow embedding
    'signature-input': <SignatureInputContent />,
    'document-signing': <DocumentSigningContent />,
    'apply-credit': <ApplyCreditContent />,
    'promo-code': <PromoCodeContent />,
    'investor-profile': <InvestorProfileContent />,
    'country-selection': <CountrySelectionContent />,
    'bank-selection': <BankSelectionContent />,
    'wire-instructions': <WireInstructionsContent />,
  };

  const handleVariantChange = (variantId: string) => {
    setVariantStates((prev) => ({ ...prev, [activeId]: variantId }));
  };

  // Render fullscreen overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-muted">
        {/* Fullscreen Preview Content - Press ESC to exit */}
        <div className="h-full w-full overflow-auto">
          {viewMode === 'component' && activeComponent}
          {viewMode === 'conversation' && (
            <ConversationView
              messages={activeConversationFlow === 'ai-greeting' ? aiGreetingConversationFlow : spaceXInvestmentFlow}
              components={conversationComponents}
            />
          )}
          {viewMode === 'onboarding' && (
            <OnboardingView variant={activeOnboardingVariant} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* View Mode Toggle & Share Button - Above Title */}
        <div className="flex items-center gap-3">
          <div
            className="flex gap-1 p-1 rounded-xl"
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
            <button
              onClick={() => setViewMode('onboarding')}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all'
              )}
              style={{
                backgroundColor: viewMode === 'onboarding' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'onboarding' ? '#030303' : '#7F7582',
                boxShadow: viewMode === 'onboarding' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <UserPlus className="w-4 h-4" />
              Onboarding
            </button>
          </div>

          {/* Share Link Button */}
          <Button
            onClick={copyShareLink}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            {linkCopied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>

          {/* Fullscreen Button */}
          <Button
            onClick={() => setIsFullscreen(true)}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </Button>
        </div>

        {/* Header & Thumbnail Selector - Only show in component mode */}
        {viewMode === 'component' && (
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
              Mocked Goodfin AI Interface Design
            </h2>

            {/* Group Selector - Only show if groups are provided */}
            {groups && groups.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">User Flow</p>
                <div
                  className="flex gap-1 p-1 rounded-xl w-fit"
                  style={{ backgroundColor: '#F0EEF0' }}
                >
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => handleGroupChange(group.id)}
                      className={cn(
                        'px-4 py-2 text-sm font-medium rounded-lg transition-all'
                      )}
                      style={{
                        backgroundColor: activeGroupId === group.id ? '#FFFFFF' : 'transparent',
                        color: activeGroupId === group.id ? '#030303' : '#7F7582',
                        boxShadow: activeGroupId === group.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                      }}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Horizontal ScrollArea for thumbnails */}
            <ScrollAreaPrimitive.Root className="relative overflow-hidden">
              <ScrollAreaPrimitive.Viewport className="w-full">
                <div className="flex gap-4 pb-3">
                  {displayComponents.map((option) => (
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
                <div className="flex gap-4 mr-4 items-center">
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
                  {/* Preset Count Toggle */}
                  {showPresets && (
                    <div
                      className="flex gap-1 p-1 rounded-lg ml-2"
                      style={{ backgroundColor: '#F0EEF0' }}
                    >
                      <button
                        onClick={() => setPresetCount(3)}
                        className={cn(
                          'px-2 py-1 text-xs font-medium rounded transition-all'
                        )}
                        style={{
                          backgroundColor: presetCount === 3 ? '#FFFFFF' : 'transparent',
                          color: presetCount === 3 ? '#030303' : '#7F7582',
                          boxShadow: presetCount === 3 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                        }}
                      >
                        3 Presets
                      </button>
                      <button
                        onClick={() => setPresetCount(6)}
                        className={cn(
                          'px-2 py-1 text-xs font-medium rounded transition-all'
                        )}
                        style={{
                          backgroundColor: presetCount === 6 ? '#FFFFFF' : 'transparent',
                          color: presetCount === 6 ? '#030303' : '#7F7582',
                          boxShadow: presetCount === 6 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                        }}
                      >
                        6 Presets
                      </button>
                    </div>
                  )}
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground font-heading">
                  Mocked Goodfin AI Conversation Flows
                </h2>
                {/* Replay Animation Button */}
                {activeConversationFlow === 'ai-greeting' && (
                  <Button
                    onClick={triggerReplay}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Replay Animation
                  </Button>
                )}
              </div>

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

        {/* Onboarding View - Goodfin onboarding flows */}
        {viewMode === 'onboarding' && (
          <>
            {/* Onboarding Flow Selector */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
                Mocked Goodfin Onboarding Flows
              </h2>

              {/* Flow Selector Thumbnails */}
              <ScrollAreaPrimitive.Root className="relative overflow-hidden">
                <ScrollAreaPrimitive.Viewport className="w-full">
                  <div className="flex gap-4 pb-3">
                    {onboardingVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setActiveOnboardingVariant(variant.id as OnboardingVariant)}
                        className={cn(
                          'flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 group flex-shrink-0',
                          activeOnboardingVariant === variant.id
                            ? 'border-grey-950 bg-grey-100'
                            : 'border-border hover:border-grey-400 hover:bg-muted'
                        )}
                      >
                        {/* Thumbnail Preview Placeholder */}
                        <div
                          className={cn(
                            'w-full aspect-video rounded-lg flex items-center justify-center transition-colors',
                            activeOnboardingVariant === variant.id
                              ? 'bg-grey-200 text-grey-950'
                              : 'bg-muted text-muted-foreground group-hover:bg-card group-hover:text-grey-700'
                          )}
                        >
                          <UserPlus className="w-6 h-6" />
                        </div>

                        <span
                          className={cn(
                            'text-sm font-medium',
                            activeOnboardingVariant === variant.id ? 'text-grey-950' : 'text-muted-foreground'
                          )}
                        >
                          {variant.label}
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

            {/* Reset Buttons */}
            <div className="flex justify-end gap-2 mb-3">
              {/* Reset Flow State - Clears localStorage and resets step data */}
              <button
                onClick={() => {
                  // Clear any onboarding-related localStorage
                  Object.keys(localStorage).forEach(key => {
                    if (key.toLowerCase().includes('onboarding')) {
                      localStorage.removeItem(key);
                    }
                  });
                  // Reset the component
                  setOnboardingKey(prev => prev + 1);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Reset Flow State
              </button>
              {/* Reset Animation - Only show for animated-flow variant */}
              {activeOnboardingVariant === 'animated-flow' && (
                <button
                  onClick={() => setOnboardingKey(prev => prev + 1)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Animation
                </button>
              )}
            </div>

            {/* Onboarding Frame */}
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
                    {onboardingVariants.find(v => v.id === activeOnboardingVariant)?.label || 'Onboarding'}
                  </div>
                </div>
              </div>

              {/* Render Area - Vertical ScrollArea */}
              <ScrollAreaPrimitive.Root className="relative overflow-hidden h-[800px]">
                <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
                  <OnboardingView key={onboardingKey} variant={activeOnboardingVariant} />
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
