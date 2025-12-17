import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  MessageSquare,
  Layers,
  UserPlus,
  Home,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Layout,
  FileText,
  Edit3,
  PenTool,
  CreditCard,
  Tag,
  UserCheck,
  Building2,
  Globe,
  Send,
  BarChart3,
  Sparkles,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Sidebar, type SidebarSection } from './Sidebar';
import { Header, PageHeader } from './Header';
import { Checkbox } from '../ui';

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

// View type icons map
const viewModeIcons: Record<string, React.ReactNode> = {
  component: <Layers className="w-4 h-4" />,
  conversation: <MessageSquare className="w-4 h-4" />,
  onboarding: <UserPlus className="w-4 h-4" />,
  welcome: <Home className="w-4 h-4" />,
};

// Component icons map
const componentIcons: Record<string, React.ReactNode> = {
  'deal-preview': <TrendingUp className="w-4 h-4" />,
  'deal-page-investment': <DollarSign className="w-4 h-4" />,
  'investment-risk': <AlertTriangle className="w-4 h-4" />,
  'investment-review': <Layout className="w-4 h-4" />,
  'document-detail': <FileText className="w-4 h-4" />,
  'signature-input': <Edit3 className="w-4 h-4" />,
  'document-signing': <PenTool className="w-4 h-4" />,
  'apply-credit': <CreditCard className="w-4 h-4" />,
  'promo-code': <Tag className="w-4 h-4" />,
  'investor-profile': <UserCheck className="w-4 h-4" />,
  'bank-selection': <Building2 className="w-4 h-4" />,
  'country-selection': <Globe className="w-4 h-4" />,
  'wire-instructions': <Send className="w-4 h-4" />,
  'ai-greeting': <MessageSquare className="w-4 h-4" />,
  'introducing-ticker': <BarChart3 className="w-4 h-4" />,
  'introducing-goodfin-ai': <Sparkles className="w-4 h-4" />,
  'welcome-accredited': <Home className="w-4 h-4" />,
};

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

type ViewMode = 'component' | 'conversation' | 'onboarding' | 'welcome';

type DocsLayoutProps = {
  groups: ComponentGroup[];
  renderConversationView?: (flow: string) => React.ReactNode;
  renderOnboardingView?: (variant: string, key: number) => React.ReactNode;
  renderWelcomeView?: (variant: string) => React.ReactNode;
  onboardingVariants?: VariantOption[];
  welcomeVariants?: VariantOption[];
  conversationFlowOptions?: { id: string; label: string }[];
};

export function DocsLayout({
  groups,
  renderConversationView,
  renderOnboardingView,
  renderWelcomeView,
  onboardingVariants = [],
  welcomeVariants = [],
  conversationFlowOptions = [],
}: DocsLayoutProps) {
  // Flatten all components from groups
  const allComponents = groups.flatMap(g => g.components);

  // Initialize state from URL parameters
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const params = getUrlParams();
    const mode = params.get('view');
    if (mode === 'conversation') return 'conversation';
    if (mode === 'onboarding') return 'onboarding';
    if (mode === 'welcome') return 'welcome';
    return 'component';
  });

  const [activeGroupId, setActiveGroupId] = useState(() => {
    const params = getUrlParams();
    const groupId = params.get('group');
    return groupId && groups.some(g => g.id === groupId) ? groupId : groups[0]?.id || '';
  });

  const [activeId, setActiveId] = useState(() => {
    const params = getUrlParams();
    const componentId = params.get('component');
    if (componentId && allComponents.some(opt => opt.id === componentId)) {
      return componentId;
    }
    return groups[0]?.components[0]?.id || '';
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

  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand active item if it has variants
    const activeOpt = allComponents.find(c => c.id === activeId);
    if (activeOpt?.variants && activeOpt.variants.length > 0) {
      return [activeId];
    }
    return [];
  });

  // Block-04 specific state
  const [showPresets, setShowPresets] = useState(() => getBoolParam(getUrlParams(), 'presets', true));
  const [showStepper, setShowStepper] = useState(() => getBoolParam(getUrlParams(), 'stepper', true));
  const [showSuggestions, setShowSuggestions] = useState(() => getBoolParam(getUrlParams(), 'suggestions', true));
  const [presetCount, setPresetCount] = useState<3 | 6>(() => {
    const params = getUrlParams();
    const count = params.get('presetCount');
    return count === '3' ? 3 : 6;
  });

  // Onboarding/Welcome specific state
  const [activeOnboardingVariant, setActiveOnboardingVariant] = useState(() => {
    const params = getUrlParams();
    return params.get('onboardingVariant') || onboardingVariants[0]?.id || 'signup';
  });
  const [activeWelcomeVariant, setActiveWelcomeVariant] = useState(() => {
    const params = getUrlParams();
    return params.get('welcomeVariant') || welcomeVariants[0]?.id || 'first-time';
  });
  const [activeConversationFlow, setActiveConversationFlow] = useState(() => {
    const params = getUrlParams();
    return params.get('flow') || conversationFlowOptions[0]?.id || 'ai-greeting';
  });

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Onboarding reset key
  const [onboardingKey, setOnboardingKey] = useState(0);

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

  // Update URL when state changes
  useEffect(() => {
    const params: Record<string, string | boolean | undefined> = {
      view: viewMode,
      group: viewMode === 'component' ? activeGroupId : undefined,
      component: viewMode === 'component' ? activeId : undefined,
      [`variant_${activeId}`]: viewMode === 'component' ? variantStates[activeId] : undefined,
      flow: viewMode === 'conversation' ? activeConversationFlow : undefined,
      onboardingVariant: viewMode === 'onboarding' ? activeOnboardingVariant : undefined,
      welcomeVariant: viewMode === 'welcome' ? activeWelcomeVariant : undefined,
    };

    // Add block-04 specific params
    if (viewMode === 'component' && activeId === 'deal-page-investment' && variantStates[activeId] === 'block-04') {
      params.presets = showPresets;
      params.stepper = showStepper;
      params.suggestions = showSuggestions;
      params.presetCount = String(presetCount);
    }

    updateUrlParams(params);
  }, [viewMode, activeId, activeGroupId, variantStates, activeConversationFlow, activeOnboardingVariant, activeWelcomeVariant, showPresets, showStepper, showSuggestions, presetCount]);

  // Build sidebar sections based on view mode
  const buildSidebarSections = (): SidebarSection[] => {
    // Main view modes as top-level sections
    const viewModes: SidebarSection = {
      id: 'flows',
      label: 'Flows',
      items: [
        {
          id: 'component',
          label: 'Component',
          icon: viewModeIcons.component,
        },
        {
          id: 'conversation',
          label: 'Conversation',
          icon: viewModeIcons.conversation,
          children: conversationFlowOptions.map(f => ({ id: f.id, label: f.label })),
        },
        {
          id: 'onboarding',
          label: 'Onboarding',
          icon: viewModeIcons.onboarding,
          children: onboardingVariants.map(v => ({ id: v.id, label: v.label })),
        },
        {
          id: 'welcome',
          label: 'Welcome',
          icon: viewModeIcons.welcome,
          children: welcomeVariants.map(v => ({ id: v.id, label: v.label })),
        },
      ],
    };

    // Component groups
    const componentSections: SidebarSection[] = groups.map(group => ({
      id: group.id,
      label: group.label,
      items: group.components.map(comp => ({
        id: comp.id,
        label: comp.label,
        icon: componentIcons[comp.id] || comp.icon,
        children: comp.variants?.map(v => ({ id: v.id, label: v.label })),
      })),
    }));

    return [viewModes, ...componentSections];
  };

  const sidebarSections = buildSidebarSections();

  // Handle sidebar navigation
  const handleSectionClick = (sectionId: string) => {
    // Section clicks don't do anything special currently
  };

  const handleItemClick = (sectionId: string, itemId: string) => {
    if (sectionId === 'flows') {
      // View mode items
      if (itemId === 'component') {
        setViewMode('component');
      } else if (itemId === 'conversation') {
        setViewMode('conversation');
      } else if (itemId === 'onboarding') {
        setViewMode('onboarding');
      } else if (itemId === 'welcome') {
        setViewMode('welcome');
      }
    } else {
      // Component items
      setViewMode('component');
      const group = groups.find(g => g.id === sectionId);
      if (group) {
        setActiveGroupId(sectionId);
        setActiveId(itemId);
      }
    }
  };

  const handleSubItemClick = (sectionId: string, itemId: string, subItemId: string) => {
    if (sectionId === 'flows') {
      if (itemId === 'conversation') {
        setViewMode('conversation');
        setActiveConversationFlow(subItemId);
      } else if (itemId === 'onboarding') {
        setViewMode('onboarding');
        setActiveOnboardingVariant(subItemId);
      } else if (itemId === 'welcome') {
        setViewMode('welcome');
        setActiveWelcomeVariant(subItemId);
      }
    } else {
      // Component variant selection
      setViewMode('component');
      const group = groups.find(g => g.id === sectionId);
      if (group) {
        setActiveGroupId(sectionId);
        setActiveId(itemId);
        setVariantStates(prev => ({ ...prev, [itemId]: subItemId }));
      }
    }
  };

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Get active item info
  const activeOption = allComponents.find(opt => opt.id === activeId);
  const activeVariant = variantStates[activeId];
  const activeGroup = groups.find(g => g.id === activeGroupId);

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

  // Determine which sub-item is active
  const getActiveSubItem = () => {
    if (viewMode === 'conversation') return activeConversationFlow;
    if (viewMode === 'onboarding') return activeOnboardingVariant;
    if (viewMode === 'welcome') return activeWelcomeVariant;
    if (viewMode === 'component') return variantStates[activeId];
    return undefined;
  };

  // Build breadcrumbs
  const buildBreadcrumbs = () => {
    const crumbs = [{ label: 'Goodfin AI Primitives' }];

    if (viewMode === 'component' && activeGroup && activeOption) {
      crumbs.push(
        { label: activeGroup.label },
        { label: activeOption.label }
      );
      if (activeVariant && activeOption.variants) {
        const variantLabel = activeOption.variants.find(v => v.id === activeVariant)?.label;
        if (variantLabel) {
          crumbs.push({ label: variantLabel });
        }
      }
    } else if (viewMode === 'conversation') {
      crumbs.push({ label: 'Conversation' });
      const flowLabel = conversationFlowOptions.find(f => f.id === activeConversationFlow)?.label;
      if (flowLabel) crumbs.push({ label: flowLabel });
    } else if (viewMode === 'onboarding') {
      crumbs.push({ label: 'Onboarding' });
      const variantLabel = onboardingVariants.find(v => v.id === activeOnboardingVariant)?.label;
      if (variantLabel) crumbs.push({ label: variantLabel });
    } else if (viewMode === 'welcome') {
      crumbs.push({ label: 'Welcome' });
      const variantLabel = welcomeVariants.find(v => v.id === activeWelcomeVariant)?.label;
      if (variantLabel) crumbs.push({ label: variantLabel });
    }

    return crumbs;
  };

  // Render fullscreen overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-muted">
        {/* Close button */}
        <button
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-card border border-border shadow-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Fullscreen Preview Content */}
        <div className="h-full w-full overflow-auto">
          {viewMode === 'component' && activeComponent}
          {viewMode === 'conversation' && renderConversationView?.(activeConversationFlow)}
          {viewMode === 'onboarding' && renderOnboardingView?.(activeOnboardingVariant, onboardingKey)}
          {viewMode === 'welcome' && renderWelcomeView?.(activeWelcomeVariant)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header
        title="Goodfin AI Primitives"
        breadcrumbs={buildBreadcrumbs()}
        onFullscreen={() => setIsFullscreen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sections={sidebarSections}
          activeSection={viewMode === 'component' ? activeGroupId : 'flows'}
          activeItem={viewMode === 'component' ? activeId : viewMode}
          activeSubItem={getActiveSubItem()}
          expandedItems={[
            ...expandedItems,
            viewMode, // Keep current view mode expanded
            activeId, // Keep active component expanded
          ]}
          onSectionClick={handleSectionClick}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          onToggleExpand={handleToggleExpand}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-5xl">
            {/* Component View */}
            {viewMode === 'component' && (
              <>
                <PageHeader
                  title={activeOption?.label || 'Component'}
                  description={`Preview different variants of the ${activeOption?.label} component.`}
                />

                {/* Variant Pills */}
                {activeOption?.variants && activeOption.variants.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Variant</p>
                    <div
                      className="inline-flex gap-1 p-1 rounded-xl"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {activeOption.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setVariantStates(prev => ({ ...prev, [activeId]: variant.id }))}
                          className={cn(
                            'px-3 py-1.5 text-sm font-medium rounded-lg transition-all'
                          )}
                          style={{
                            backgroundColor: activeVariant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeVariant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Block-04 Options */}
                {activeId === 'deal-page-investment' && activeVariant === 'block-04' && (
                  <div className="mb-6 flex items-center gap-6 p-4 bg-muted rounded-lg">
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
                    {showPresets && (
                      <div
                        className="flex gap-1 p-1 rounded-lg ml-4"
                        style={{ backgroundColor: 'var(--grey-200)' }}
                      >
                        <button
                          onClick={() => setPresetCount(3)}
                          className={cn('px-2 py-1 text-xs font-medium rounded transition-all')}
                          style={{
                            backgroundColor: presetCount === 3 ? '#FFFFFF' : 'transparent',
                            color: presetCount === 3 ? 'var(--grey-950)' : 'var(--grey-500)',
                          }}
                        >
                          3 Presets
                        </button>
                        <button
                          onClick={() => setPresetCount(6)}
                          className={cn('px-2 py-1 text-xs font-medium rounded transition-all')}
                          style={{
                            backgroundColor: presetCount === 6 ? '#FFFFFF' : 'transparent',
                            color: presetCount === 6 ? 'var(--grey-950)' : 'var(--grey-500)',
                          }}
                        >
                          6 Presets
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Preview Container */}
                <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
                  <ScrollAreaPrimitive.Root className="relative overflow-hidden">
                    <ScrollAreaPrimitive.Viewport className="w-full min-h-[600px] max-h-[800px]">
                      {activeComponent}
                    </ScrollAreaPrimitive.Viewport>
                    <ScrollAreaPrimitive.Scrollbar
                      orientation="vertical"
                      className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
                    >
                      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
                    </ScrollAreaPrimitive.Scrollbar>
                    <ScrollAreaPrimitive.Corner />
                  </ScrollAreaPrimitive.Root>
                </div>
              </>
            )}

            {/* Conversation View */}
            {viewMode === 'conversation' && (
              <>
                <PageHeader
                  title="Conversation Flow"
                  description="Preview the full conversation interface with embedded components."
                />

                {/* Flow Selector Pills */}
                {conversationFlowOptions.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Flow</p>
                    <div
                      className="inline-flex gap-1 p-1 rounded-xl"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {conversationFlowOptions.map((flow) => (
                        <button
                          key={flow.id}
                          onClick={() => setActiveConversationFlow(flow.id)}
                          className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-all')}
                          style={{
                            backgroundColor: activeConversationFlow === flow.id ? '#FFFFFF' : 'transparent',
                            color: activeConversationFlow === flow.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeConversationFlow === flow.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {flow.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview Container */}
                <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
                  <ScrollAreaPrimitive.Root className="relative overflow-hidden">
                    <ScrollAreaPrimitive.Viewport className="w-full min-h-[600px] max-h-[800px]">
                      {renderConversationView?.(activeConversationFlow)}
                    </ScrollAreaPrimitive.Viewport>
                    <ScrollAreaPrimitive.Scrollbar
                      orientation="vertical"
                      className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
                    >
                      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
                    </ScrollAreaPrimitive.Scrollbar>
                    <ScrollAreaPrimitive.Corner />
                  </ScrollAreaPrimitive.Root>
                </div>
              </>
            )}

            {/* Onboarding View */}
            {viewMode === 'onboarding' && (
              <>
                <PageHeader
                  title="Onboarding Flow"
                  description="Preview the onboarding experience for new users."
                />

                {/* Variant Selector Pills */}
                {onboardingVariants.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Step</p>
                    <div
                      className="inline-flex gap-1 p-1 rounded-xl flex-wrap"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {onboardingVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setActiveOnboardingVariant(variant.id)}
                          className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-all')}
                          style={{
                            backgroundColor: activeOnboardingVariant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeOnboardingVariant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeOnboardingVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset Buttons */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => {
                      Object.keys(localStorage).forEach(key => {
                        if (key.toLowerCase().includes('onboarding')) {
                          localStorage.removeItem(key);
                        }
                      });
                      setOnboardingKey(prev => prev + 1);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reset Flow State
                  </button>
                  {activeOnboardingVariant === 'animated-flow' && (
                    <button
                      onClick={() => setOnboardingKey(prev => prev + 1)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Animation
                    </button>
                  )}
                </div>

                {/* Preview Container */}
                <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
                  <ScrollAreaPrimitive.Root className="relative overflow-hidden">
                    <ScrollAreaPrimitive.Viewport className="w-full min-h-[600px] max-h-[800px]">
                      {renderOnboardingView?.(activeOnboardingVariant, onboardingKey)}
                    </ScrollAreaPrimitive.Viewport>
                    <ScrollAreaPrimitive.Scrollbar
                      orientation="vertical"
                      className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
                    >
                      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
                    </ScrollAreaPrimitive.Scrollbar>
                    <ScrollAreaPrimitive.Corner />
                  </ScrollAreaPrimitive.Root>
                </div>
              </>
            )}

            {/* Welcome View */}
            {viewMode === 'welcome' && (
              <>
                <PageHeader
                  title="Welcome Screen"
                  description="Preview the welcome screen for accredited investors."
                />

                {/* Variant Selector Pills */}
                {welcomeVariants.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Variant</p>
                    <div
                      className="inline-flex gap-1 p-1 rounded-xl flex-wrap"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {welcomeVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setActiveWelcomeVariant(variant.id)}
                          className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-all')}
                          style={{
                            backgroundColor: activeWelcomeVariant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeWelcomeVariant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeWelcomeVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview Container */}
                <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
                  <ScrollAreaPrimitive.Root className="relative overflow-hidden">
                    <ScrollAreaPrimitive.Viewport className="w-full min-h-[600px] max-h-[800px]">
                      {renderWelcomeView?.(activeWelcomeVariant)}
                    </ScrollAreaPrimitive.Viewport>
                    <ScrollAreaPrimitive.Scrollbar
                      orientation="vertical"
                      className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
                    >
                      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-grey-300 hover:bg-grey-400 transition-colors" />
                    </ScrollAreaPrimitive.Scrollbar>
                    <ScrollAreaPrimitive.Corner />
                  </ScrollAreaPrimitive.Root>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
