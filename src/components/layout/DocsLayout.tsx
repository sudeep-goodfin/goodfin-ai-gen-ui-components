import React, { useState, useEffect } from 'react';
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
  Archive,
  PanelLeftClose,
  PanelLeft,
  ThumbsUp,
  Keyboard,
  LayoutGrid,
  Hand,
  Compass,
  CalendarDays,
  History,
  Wallet,
  Lightbulb,
  Gauge,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Sidebar, type SidebarSection } from './Sidebar';
import { Header, PageHeader } from './Header';
import { Checkbox } from '../ui';
import { releases, getLatestRelease, getReleaseById, getComponentVersionForRelease } from '../../config/versions';
import { ComponentsLanding } from '../views';

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
  welcome02: <Home className="w-4 h-4" />,
  'investment-flow': <DollarSign className="w-4 h-4" />,
  'z-ai-investment-flow': <Sparkles className="w-4 h-4" />,
  archive: <Archive className="w-4 h-4" />,
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
  'input-bar': <MessageSquare className="w-4 h-4" />,
  'feedback-buttons': <ThumbsUp className="w-4 h-4" />,
  // New primitives
  'header': <LayoutGrid className="w-4 h-4" />,
  'sidebar': <PanelLeft className="w-4 h-4" />,
  'greeting': <Hand className="w-4 h-4" />,
  'explore-card': <Compass className="w-4 h-4" />,
  'event-card': <CalendarDays className="w-4 h-4" />,
  'chat-history-drawer': <History className="w-4 h-4" />,
  'deal-card': <TrendingUp className="w-4 h-4" />,
  'portfolio-summary': <BarChart3 className="w-4 h-4" />,
  'my-investments': <Wallet className="w-4 h-4" />,
  'suggestion-card': <Lightbulb className="w-4 h-4" />,
  'progress-widget': <Gauge className="w-4 h-4" />,
};

type VariantOption = {
  id: string;
  label: string;
  comingSoon?: boolean;
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

type ViewMode = 'landing' | 'component' | 'conversation' | 'onboarding' | 'welcome' | 'welcome02' | 'investment-flow' | 'z-ai-investment-flow';

type DocsLayoutProps = {
  groups: ComponentGroup[];
  renderConversationView?: (flow: string) => React.ReactNode;
  renderOnboardingView?: (variant: string, key: number) => React.ReactNode;
  renderWelcomeView?: (variant: string) => React.ReactNode;
  renderWelcome02View?: (variant: string, showChrome: boolean, homeVariant: string) => React.ReactNode;
  renderInvestmentFlowView?: (step: string, onDismiss: () => void) => React.ReactNode;
  renderZAIInvestmentFlowView?: (userState: string, onDismiss: () => void) => React.ReactNode;
  onboardingVariants?: VariantOption[];
  welcomeVariants?: VariantOption[];
  welcome02Variants?: VariantOption[];
  welcome02HomeVariants?: VariantOption[];
  investmentFlowSteps?: VariantOption[];
  zaiInvestmentFlowVariants?: VariantOption[];
  conversationFlowOptions?: { id: string; label: string }[];
};

export function DocsLayout({
  groups,
  renderConversationView,
  renderOnboardingView,
  renderWelcomeView,
  renderWelcome02View,
  renderInvestmentFlowView,
  renderZAIInvestmentFlowView,
  onboardingVariants = [],
  welcomeVariants = [],
  welcome02Variants = [],
  welcome02HomeVariants = [],
  investmentFlowSteps = [],
  zaiInvestmentFlowVariants = [],
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
    if (mode === 'welcome02') return 'welcome02';
    if (mode === 'investment-flow') return 'investment-flow';
    if (mode === 'z-ai-investment-flow') return 'z-ai-investment-flow';
    if (mode === 'landing') return 'landing';
    // If no component is specified in URL, show landing page
    const componentId = params.get('component');
    if (!componentId) return 'landing';
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
    return '';
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
  const [activeWelcome02Variant, setActiveWelcome02Variant] = useState(() => {
    const params = getUrlParams();
    return params.get('welcome02Variant') || welcome02Variants[0]?.id || 'default';
  });
  const [activeWelcome02HomeVariant, setActiveWelcome02HomeVariant] = useState(() => {
    const params = getUrlParams();
    return params.get('homeVariant') || welcome02HomeVariants[0]?.id || 'v1';
  });
  const [activeConversationFlow, setActiveConversationFlow] = useState(() => {
    const params = getUrlParams();
    return params.get('flow') || conversationFlowOptions[0]?.id || 'ai-greeting';
  });
  const [activeInvestmentFlowStep, setActiveInvestmentFlowStep] = useState(() => {
    const params = getUrlParams();
    return params.get('investmentStep') || investmentFlowSteps[0]?.id || 'transfer-method';
  });
  const [activeZAIInvestmentFlowVariant, setActiveZAIInvestmentFlowVariant] = useState(() => {
    const params = getUrlParams();
    return params.get('zaiVariant') || zaiInvestmentFlowVariants[0]?.id || 'accredited-returning';
  });

  // Fullscreen state (from URL)
  const [isFullscreen, setIsFullscreen] = useState(() => {
    return getBoolParam(getUrlParams(), 'fullscreen', false);
  });

  // Welcome02 chrome toggle (header/sidebar visibility) - default to false (no chrome)
  const [showWelcome02Chrome, setShowWelcome02Chrome] = useState(() => {
    return getBoolParam(getUrlParams(), 'chrome', false);
  });

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Desktop sidebar collapsed state (persisted to URL)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return getBoolParam(getUrlParams(), 'collapsed', false);
  });

  // Onboarding reset key
  const [onboardingKey, setOnboardingKey] = useState(0);

  // Global release version state (persisted to URL)
  const [selectedRelease, setSelectedRelease] = useState(() => {
    const params = getUrlParams();
    const urlRelease = params.get('release');
    if (urlRelease && releases.some(r => r.id === urlRelease)) {
      return urlRelease;
    }
    return getLatestRelease().id;
  });

  // Prototype mode notification
  const [showPrototypeNotification, setShowPrototypeNotification] = useState(false);

  // Track ESC key presses for double-tap exit
  const [escPressCount, setEscPressCount] = useState(0);
  const escTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // ESC key handler - requires pressing ESC twice continuously to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setEscPressCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            setIsFullscreen(false);
            return 0;
          }
          return newCount;
        });

        // Reset count after 500ms if second ESC not pressed
        if (escTimeoutRef.current) {
          clearTimeout(escTimeoutRef.current);
        }
        escTimeoutRef.current = setTimeout(() => {
          setEscPressCount(0);
        }, 500);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (escTimeoutRef.current) {
        clearTimeout(escTimeoutRef.current);
      }
    };
  }, [isFullscreen]);

  // Reset ESC count when exiting fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      setEscPressCount(0);
    }
  }, [isFullscreen]);

  // Show notification when entering prototype mode
  useEffect(() => {
    if (isFullscreen) {
      setShowPrototypeNotification(true);
      const timer = setTimeout(() => {
        setShowPrototypeNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  // Handle component click from landing page
  const handleLandingComponentClick = (groupId: string, componentId: string) => {
    setViewMode('component');
    setActiveGroupId(groupId);
    setActiveId(componentId);
    // Set default variant if available
    const component = allComponents.find(c => c.id === componentId);
    if (component?.variants && component.variants.length > 0) {
      setVariantStates(prev => ({
        ...prev,
        [componentId]: component.variants![0].id,
      }));
    }
  };

  // Update URL when state changes
  useEffect(() => {
    const params: Record<string, string | boolean | undefined> = {
      view: viewMode === 'landing' ? undefined : viewMode, // Don't show landing in URL
      group: viewMode === 'component' ? activeGroupId : undefined,
      component: viewMode === 'component' ? activeId : undefined,
      [`variant_${activeId}`]: viewMode === 'component' ? variantStates[activeId] : undefined,
      flow: viewMode === 'conversation' ? activeConversationFlow : undefined,
      onboardingVariant: viewMode === 'onboarding' ? activeOnboardingVariant : undefined,
      welcomeVariant: viewMode === 'welcome' ? activeWelcomeVariant : undefined,
      welcome02Variant: viewMode === 'welcome02' ? activeWelcome02Variant : undefined,
      homeVariant: viewMode === 'welcome02' ? activeWelcome02HomeVariant : undefined,
      investmentStep: viewMode === 'investment-flow' ? activeInvestmentFlowStep : undefined,
      zaiVariant: viewMode === 'z-ai-investment-flow' ? activeZAIInvestmentFlowVariant : undefined,
      // Fullscreen state (only store if true to keep URLs cleaner)
      fullscreen: isFullscreen ? true : undefined,
      // Chrome toggle for welcome02 (only store if true since false is default)
      chrome: viewMode === 'welcome02' && showWelcome02Chrome ? true : undefined,
      // Sidebar collapsed state (only store if true to keep URLs cleaner)
      collapsed: isSidebarCollapsed ? true : undefined,
      // Release version (only store if not latest to keep URLs cleaner)
      release: selectedRelease !== getLatestRelease().id ? selectedRelease : undefined,
    };

    // Add block-04 specific params
    if (viewMode === 'component' && activeId === 'deal-page-investment' && variantStates[activeId] === 'block-04') {
      params.presets = showPresets;
      params.stepper = showStepper;
      params.suggestions = showSuggestions;
      params.presetCount = String(presetCount);
    }

    updateUrlParams(params);
  }, [viewMode, activeId, activeGroupId, variantStates, activeConversationFlow, activeOnboardingVariant, activeWelcomeVariant, activeWelcome02Variant, activeWelcome02HomeVariant, activeInvestmentFlowStep, activeZAIInvestmentFlowVariant, isFullscreen, showWelcome02Chrome, isSidebarCollapsed, selectedRelease, showPresets, showStepper, showSuggestions, presetCount]);

  // Build sidebar sections based on view mode
  const buildSidebarSections = (): SidebarSection[] => {
    // Flows section - main user flows (reordered: Onboarding, Welcome Screen, Conversation)
    const flowsSection: SidebarSection = {
      id: 'flows',
      label: 'Flows',
      items: [
        {
          id: 'onboarding',
          label: 'Onboarding',
          icon: viewModeIcons.onboarding,
          children: onboardingVariants.map(v => ({ id: v.id, label: v.label })),
        },
        {
          id: 'welcome02',
          label: 'Welcome Screen Flow 0.2',
          icon: viewModeIcons.welcome02,
          children: welcome02Variants.length > 0
            ? welcome02Variants.map(v => ({ id: v.id, label: v.label }))
            : undefined,
        },
        {
          id: 'investment-flow',
          label: 'Investment Flow',
          icon: viewModeIcons['investment-flow'],
          children: investmentFlowSteps.length > 0
            ? investmentFlowSteps.map(s => ({ id: s.id, label: s.label }))
            : undefined,
        },
        {
          id: 'z-ai-investment-flow',
          label: 'Z AI Investment Flow',
          icon: viewModeIcons['z-ai-investment-flow'],
          children: zaiInvestmentFlowVariants.length > 0
            ? zaiInvestmentFlowVariants.map(v => ({ id: v.id, label: v.label }))
            : undefined,
        },
        {
          id: 'conversation',
          label: 'Conversation',
          icon: viewModeIcons.conversation,
          children: conversationFlowOptions.map(f => ({ id: f.id, label: f.label })),
        },
      ],
    };

    // Component groups - each group as its own section
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

    // Archive section with older versions
    const archiveSection: SidebarSection = {
      id: 'archive',
      label: 'Archive',
      items: [
        {
          id: 'welcome',
          label: 'Welcome Screen Flow 0.1',
          icon: viewModeIcons.welcome,
          children: welcomeVariants.map(v => ({ id: v.id, label: v.label })),
        },
      ],
    };

    return [flowsSection, ...componentSections, archiveSection];
  };

  const sidebarSections = buildSidebarSections();

  // Handle sidebar navigation
  const handleSectionClick = (sectionId: string) => {
    // Section clicks don't do anything special currently
  };

  const handleItemClick = (sectionId: string, itemId: string) => {
    if (sectionId === 'flows') {
      // View mode items
      if (itemId === 'conversation') {
        setViewMode('conversation');
      } else if (itemId === 'onboarding') {
        setViewMode('onboarding');
      } else if (itemId === 'welcome02') {
        setViewMode('welcome02');
      } else if (itemId === 'investment-flow') {
        setViewMode('investment-flow');
      } else if (itemId === 'z-ai-investment-flow') {
        setViewMode('z-ai-investment-flow');
      }
    } else if (sectionId === 'archive') {
      // Archive items
      if (itemId === 'welcome') {
        setViewMode('welcome');
      }
    } else {
      // Component items - sectionId is the group id
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
      } else if (itemId === 'welcome02') {
        setViewMode('welcome02');
        setActiveWelcome02Variant(subItemId);
      } else if (itemId === 'investment-flow') {
        setViewMode('investment-flow');
        setActiveInvestmentFlowStep(subItemId);
      } else if (itemId === 'z-ai-investment-flow') {
        setViewMode('z-ai-investment-flow');
        setActiveZAIInvestmentFlowVariant(subItemId);
      }
    } else if (sectionId === 'archive') {
      // Archive sub-items
      if (itemId === 'welcome') {
        setViewMode('welcome');
        setActiveWelcomeVariant(subItemId);
      }
    } else {
      // Component variant selection - sectionId is the group id
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
    if (viewMode === 'welcome02') return activeWelcome02Variant;
    if (viewMode === 'investment-flow') return activeInvestmentFlowStep;
    if (viewMode === 'z-ai-investment-flow') return activeZAIInvestmentFlowVariant;
    if (viewMode === 'component') return variantStates[activeId];
    return undefined;
  };

  // Build breadcrumbs
  const buildBreadcrumbs = () => {
    type BreadcrumbItem = {
      label: string;
      onClick?: () => void;
      dropdownOptions?: { id: string; label: string }[];
      selectedOptionId?: string;
      onOptionSelect?: (optionId: string) => void;
    };

    const crumbs: BreadcrumbItem[] = [
      {
        label: 'Goodfin AI Primitives',
        onClick: viewMode !== 'landing' ? () => setViewMode('landing') : undefined,
      },
    ];

    if (viewMode === 'landing') {
      crumbs.push({ label: 'Components' });
    } else if (viewMode === 'component' && activeGroup && activeOption) {
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
      if (conversationFlowOptions.length > 0) {
        const currentLabel = conversationFlowOptions.find(f => f.id === activeConversationFlow)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: conversationFlowOptions.map(f => ({ id: f.id, label: f.label })),
          selectedOptionId: activeConversationFlow,
          onOptionSelect: (id) => setActiveConversationFlow(id),
        });
      }
    } else if (viewMode === 'onboarding') {
      crumbs.push({ label: 'Onboarding' });
      if (onboardingVariants.length > 0) {
        const currentLabel = onboardingVariants.find(v => v.id === activeOnboardingVariant)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: onboardingVariants.map(v => ({ id: v.id, label: v.label })),
          selectedOptionId: activeOnboardingVariant,
          onOptionSelect: (id) => setActiveOnboardingVariant(id),
        });
      }
    } else if (viewMode === 'welcome02') {
      crumbs.push({ label: 'Welcome Screen Flow 0.2' });
      if (welcome02Variants.length > 0) {
        const currentLabel = welcome02Variants.find(v => v.id === activeWelcome02Variant)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: welcome02Variants.map(v => ({ id: v.id, label: v.label })),
          selectedOptionId: activeWelcome02Variant,
          onOptionSelect: (id) => setActiveWelcome02Variant(id),
        });
      }
    } else if (viewMode === 'welcome') {
      crumbs.push({ label: 'Archive' }, { label: 'Welcome Screen Flow 0.1' });
      if (welcomeVariants.length > 0) {
        const currentLabel = welcomeVariants.find(v => v.id === activeWelcomeVariant)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: welcomeVariants.map(v => ({ id: v.id, label: v.label })),
          selectedOptionId: activeWelcomeVariant,
          onOptionSelect: (id) => setActiveWelcomeVariant(id),
        });
      }
    } else if (viewMode === 'investment-flow') {
      crumbs.push({ label: 'Investment Flow' });
      if (investmentFlowSteps.length > 0) {
        const currentLabel = investmentFlowSteps.find(s => s.id === activeInvestmentFlowStep)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: investmentFlowSteps.map(s => ({ id: s.id, label: s.label })),
          selectedOptionId: activeInvestmentFlowStep,
          onOptionSelect: (id) => setActiveInvestmentFlowStep(id),
        });
      }
    } else if (viewMode === 'z-ai-investment-flow') {
      crumbs.push({ label: 'Z AI Investment Flow' });
      if (zaiInvestmentFlowVariants.length > 0) {
        const currentLabel = zaiInvestmentFlowVariants.find(v => v.id === activeZAIInvestmentFlowVariant)?.label || '';
        crumbs.push({
          label: currentLabel,
          dropdownOptions: zaiInvestmentFlowVariants.map(v => ({ id: v.id, label: v.label })),
          selectedOptionId: activeZAIInvestmentFlowVariant,
          onOptionSelect: (id) => setActiveZAIInvestmentFlowVariant(id),
        });
      }
    }

    return crumbs;
  };

  // Render prototype mode (fullscreen)
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-muted">
        {/* Prototype Mode Notification Overlay */}
        {showPrototypeNotification && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-500"
            onClick={() => setShowPrototypeNotification(false)}
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Notification card */}
            <div
              className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-6 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Keyboard className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Prototype Mode</span>
              </div>
              <p className="text-foreground text-lg font-medium">
                Press <kbd className="px-2 py-1 bg-muted rounded-md text-sm font-mono border border-border">ESC</kbd> twice to exit
              </p>
            </div>
          </div>
        )}

        {/* Prototype Preview Content */}
        <div className="h-full w-full overflow-auto">
          {viewMode === 'landing' && (
            <ComponentsLanding
              groups={groups}
              onComponentClick={handleLandingComponentClick}
            />
          )}
          {viewMode === 'component' && activeComponent}
          {viewMode === 'conversation' && renderConversationView?.(activeConversationFlow)}
          {viewMode === 'onboarding' && renderOnboardingView?.(activeOnboardingVariant, onboardingKey)}
          {viewMode === 'welcome' && renderWelcomeView?.(activeWelcomeVariant)}
          {viewMode === 'welcome02' && renderWelcome02View?.(activeWelcome02Variant, false, activeWelcome02HomeVariant)}
          {viewMode === 'investment-flow' && renderInvestmentFlowView?.(activeInvestmentFlowStep, () => {
            setViewMode('welcome02');
            setActiveWelcome02Variant('accredited-returning');
          })}
          {viewMode === 'z-ai-investment-flow' && renderZAIInvestmentFlowView?.(activeZAIInvestmentFlowVariant, () => {
            setViewMode('welcome02');
            setActiveWelcome02Variant('accredited-returning');
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        title="Goodfin AI Primitives"
        breadcrumbs={buildBreadcrumbs()}
        onFullscreen={() => setIsFullscreen(true)}
        onMenuToggle={() => setIsSidebarOpen(prev => !prev)}
        onSidebarToggle={() => setIsSidebarCollapsed(prev => !prev)}
        isSidebarCollapsed={isSidebarCollapsed}
        showMenuButton={true}
        versions={releases.map(r => ({
          id: r.id,
          label: r.label,
          date: r.date,
          isLatest: r.isLatest,
        }))}
        selectedVersion={selectedRelease}
        onVersionChange={setSelectedRelease}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sections={sidebarSections}
          activeSection={viewMode === 'component' ? activeGroupId : viewMode === 'landing' ? undefined : 'flows'}
          activeItem={viewMode === 'component' ? activeId : viewMode === 'landing' ? undefined : viewMode}
          activeSubItem={getActiveSubItem()}
          expandedItems={expandedItems}
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={() => setIsSidebarOpen(false)}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          onSectionClick={handleSectionClick}
          onItemClick={handleItemClick}
          onSubItemClick={handleSubItemClick}
          onToggleExpand={handleToggleExpand}
        />

        {/* Main Content Area */}
        <main className={cn("flex-1 overflow-hidden", (viewMode === 'welcome02' || viewMode === 'investment-flow' || viewMode === 'z-ai-investment-flow') && "flex flex-col")}>
          {/* Standard content wrapper with Radix ScrollArea - only shown for non-fullscreen views */}
          {viewMode !== 'welcome02' && viewMode !== 'investment-flow' && viewMode !== 'z-ai-investment-flow' && (
          <ScrollAreaPrimitive.Root className="h-full w-full">
            <ScrollAreaPrimitive.Viewport className="h-full w-full">
              <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {/* Landing View */}
            {viewMode === 'landing' && (
              <ComponentsLanding
                groups={groups}
                onComponentClick={handleLandingComponentClick}
              />
            )}

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
                <div className="border border-border rounded-xl bg-muted/30">
                  {activeComponent}
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
                <div className="border border-border rounded-xl bg-muted/30">
                  {renderConversationView?.(activeConversationFlow)}
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
                <div className="border border-border rounded-xl bg-muted/30">
                  {renderOnboardingView?.(activeOnboardingVariant, onboardingKey)}
                </div>
              </>
            )}

            {/* Welcome View (Archive) */}
            {viewMode === 'welcome' && (
              <>
                <PageHeader
                  title="Welcome Screen Flow 0.1"
                  description="Archived version - Preview the welcome screen for accredited investors."
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
                <div className="border border-border rounded-xl bg-muted/30">
                  {renderWelcomeView?.(activeWelcomeVariant)}
                </div>
              </>
            )}

              </div>
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.Scrollbar
              orientation="vertical"
              className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors hover:bg-black/5"
            >
              <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground/30 transition-colors" />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
          )}

          {/* Welcome 0.2 View - renders outside the constrained container */}
          {viewMode === 'welcome02' && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Options Bar */}
              <div className="flex flex-wrap items-center gap-4 px-4 md:px-8 py-3 border-b border-border bg-background/50">
                {/* Variant Selector Pills */}
                {welcome02Variants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Variant:</span>
                    <div
                      className="inline-flex gap-1 p-1 rounded-lg"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {welcome02Variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => !variant.comingSoon && setActiveWelcome02Variant(variant.id)}
                          disabled={variant.comingSoon}
                          className={cn(
                            'px-2.5 py-1 text-sm font-medium rounded-md transition-all flex items-center gap-1.5',
                            variant.comingSoon && 'cursor-not-allowed opacity-60'
                          )}
                          style={{
                            backgroundColor: activeWelcome02Variant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeWelcome02Variant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeWelcome02Variant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                          {variant.comingSoon && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                              Soon
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Home Layout Selector Pills */}
                {welcome02HomeVariants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Home Layout:</span>
                    <div
                      className="inline-flex gap-1 p-1 rounded-lg"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {welcome02HomeVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setActiveWelcome02HomeVariant(variant.id)}
                          className={cn('px-2.5 py-1 text-sm font-medium rounded-md transition-all')}
                          style={{
                            backgroundColor: activeWelcome02HomeVariant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeWelcome02HomeVariant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeWelcome02HomeVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chrome Toggle */}
                <button
                  onClick={() => setShowWelcome02Chrome(prev => !prev)}
                  className={cn(
                    'flex items-center gap-2 px-2.5 py-1 text-sm font-medium rounded-md border transition-all',
                    showWelcome02Chrome
                      ? 'border-border bg-background text-muted-foreground hover:text-foreground'
                      : 'border-foreground bg-foreground/10 text-foreground'
                  )}
                >
                  {showWelcome02Chrome ? (
                    <>
                      <PanelLeft className="w-4 h-4" />
                      <span>With Chrome</span>
                    </>
                  ) : (
                    <>
                      <PanelLeftClose className="w-4 h-4" />
                      <span>App Only</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct render - no container */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {renderWelcome02View?.(activeWelcome02Variant, showWelcome02Chrome, activeWelcome02HomeVariant)}
              </div>
            </div>
          )}

          {/* Investment Flow View - renders outside the constrained container */}
          {viewMode === 'investment-flow' && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Options Bar */}
              <div className="flex flex-wrap items-center gap-4 px-4 md:px-8 py-3 border-b border-border bg-background/50">
                {/* Step Selector Pills */}
                {investmentFlowSteps.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Step:</span>
                    <div
                      className="inline-flex gap-1 p-1 rounded-lg"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {investmentFlowSteps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setActiveInvestmentFlowStep(step.id)}
                          className={cn('px-2.5 py-1 text-sm font-medium rounded-md transition-all')}
                          style={{
                            backgroundColor: activeInvestmentFlowStep === step.id ? '#FFFFFF' : 'transparent',
                            color: activeInvestmentFlowStep === step.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeInvestmentFlowStep === step.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {step.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct render - no container */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {renderInvestmentFlowView?.(activeInvestmentFlowStep, () => {
                  setViewMode('welcome02');
                  setActiveWelcome02Variant('accredited-returning');
                })}
              </div>
            </div>
          )}

          {/* Z AI Investment Flow View - renders outside the constrained container */}
          {viewMode === 'z-ai-investment-flow' && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Options Bar */}
              <div className="flex flex-wrap items-center gap-4 px-4 md:px-8 py-3 border-b border-border bg-background/50">
                {/* Variant Selector Pills */}
                {zaiInvestmentFlowVariants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">User State:</span>
                    <div
                      className="inline-flex gap-1 p-1 rounded-lg"
                      style={{ backgroundColor: 'var(--grey-100)' }}
                    >
                      {zaiInvestmentFlowVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setActiveZAIInvestmentFlowVariant(variant.id)}
                          className={cn('px-2.5 py-1 text-sm font-medium rounded-md transition-all')}
                          style={{
                            backgroundColor: activeZAIInvestmentFlowVariant === variant.id ? '#FFFFFF' : 'transparent',
                            color: activeZAIInvestmentFlowVariant === variant.id ? 'var(--grey-950)' : 'var(--grey-500)',
                            boxShadow: activeZAIInvestmentFlowVariant === variant.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                          }}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct render - no container */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {renderZAIInvestmentFlowView?.(activeZAIInvestmentFlowVariant, () => {
                  setViewMode('welcome02');
                  setActiveWelcome02Variant('accredited-returning');
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
