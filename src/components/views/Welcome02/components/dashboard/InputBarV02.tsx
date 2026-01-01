import React, { useState, useRef } from 'react';
import { chatSvgPaths } from './chat-icons';
import { cn } from '@/lib/utils';
import { FileText, Calendar, Briefcase, Home, X, Pencil, Plus, Info, Sparkles, ArrowLeft } from "lucide-react";
import { CommandPanel, Recipe, Context, Pill, PanelMode } from './command-panel';
import { useRecording } from './hooks/useRecording';
import { VoiceRecordingInterface } from './VoiceRecordingInterface';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface ChipProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

function Chip({ icon, activeIcon, label, onClick, isActive }: ChipProps) {
  return (
    <div
        onClick={onClick}
        className={cn(
            "group flex gap-[4px] items-center pl-[8px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0 cursor-pointer transition-colors select-none",
            isActive
              ? "bg-[#685f6a]"
              : "bg-white hover:bg-gray-50"
        )}
    >
      <div className="flex items-center relative shrink-0">
          {isActive && activeIcon ? activeIcon : icon}
      </div>
      <span className={cn(
        "text-[14px] leading-[20px] font-light whitespace-nowrap",
        isActive ? "text-[#f0eef0]" : "text-[#29272a]"
      )}>
        {label}
      </span>
    </div>
  );
}

// Pill component for selected recipes/contexts
interface PillTagProps {
  pill: Pill;
  onRemove: () => void;
}

const PILL_COLORS: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  green: 'bg-green-100 text-green-700 border-green-200',
};

function PillTag({ pill, onRemove }: PillTagProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      PILL_COLORS[pill.color]
    )}>
      <span className="opacity-60">{pill.type === 'recipe' ? '/' : '@'}</span>
      <span>{pill.name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="hover:opacity-70 transition-opacity ml-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

// Simple dropdown menu component
function SimpleDropdown({
  children,
  items,
  onSelect
}: {
  children: React.ReactNode;
  items: { label: string; value: string; icon: React.ReactNode }[];
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-xl p-2 z-50">
            {items.map((item) => (
              <button
                key={item.value}
                className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                onClick={() => {
                  onSelect(item.value);
                  setIsOpen(false);
                }}
              >
                {item.icon}
                <span className="text-sm text-[#29272a]">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export type MoreMode = 'insight' | 'events' | 'portfolio';
export type ChatMode = 'default' | 'research' | 'deals' | 'news' | 'investment' | MoreMode;

interface InvestmentAction {
  label: string;
  onClose: () => void;
}

// Callout states
export type CalloutState = 'default' | 'awaiting_input' | 'confirmed' | 'error' | 'commit_confirm' | 'investor_type' | 'business_info' | 'personalization' | 'personalization_processing' | 'personalization_complete';

interface CalloutResponse {
  id: string;
  question: string;
  answer: string;
}

// Checkbox item for commit confirmation
export interface CommitCheckbox {
  id: string;
  text: string;
  checked: boolean;
}

// Investor type option
export interface InvestorTypeOption {
  id: string;
  title: string;
  subtitle: string;
}

// Investor type group (for grouped sections)
export interface InvestorTypeGroup {
  category: string;
  title: string;
  options: InvestorTypeOption[];
}

// Saved investor profile for returning users
export interface SavedInvestorProfile {
  id: string;
  label: string; // Short label like "U.S. Entity"
}

// Business owner for business info form
export interface BusinessOwner {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isPrimary: boolean;
}

// Business info form data
export interface BusinessInfoData {
  businessName: string;
  businessEmail: string;
  countryName: string;
  owners: BusinessOwner[];
  documents: string[];
}

// Personalization option for first-time users
export interface PersonalizationOption {
  id: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}

// Question input types
export type PersonalizationInputType = 'options' | 'multi-select' | 'text' | 'scale';

// Condition for showing a question based on previous answers
export interface PersonalizationCondition {
  questionId: string;
  values: string[]; // Show if any of these values are selected
}

// Personalization question for the callout
export interface PersonalizationQuestion {
  id: string;
  question: string;
  inputType: PersonalizationInputType;
  options?: PersonalizationOption[];
  placeholder?: string; // For text inputs
  scaleMin?: number; // For scale inputs
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  condition?: PersonalizationCondition; // Conditional display
  optional?: boolean;
}

interface FormCallout {
  state: CalloutState;
  dealLogo?: string;
  headerText: string; // Main text - deal name, question, or error message
  displayValue?: string; // e.g., "$50,000" shown on the right
  responses?: CalloutResponse[]; // Collected responses from user
  onClose?: () => void;
  onProgressClick?: () => void; // Click handler for "Investment progress" button
  onEditAmount?: () => void; // Click handler for editing the investment amount
  // Commit confirmation specific props
  checkboxes?: CommitCheckbox[];
  onCheckboxChange?: (id: string, checked: boolean) => void;
  ctaText?: string;
  isCtaDisabled?: boolean;
  onCtaClick?: () => void;
  // Investor type selection props
  investorTypeGroups?: InvestorTypeGroup[];
  selectedInvestorType?: string;
  onInvestorTypeSelect?: (id: string) => void;
  // Saved profile for returning investors
  savedInvestorProfile?: SavedInvestorProfile;
  onChangeProfile?: () => void; // Click handler to change saved profile
  // Business info form props
  businessInfo?: BusinessInfoData;
  onBusinessInfoChange?: (field: keyof BusinessInfoData, value: string) => void;
  onAddBusinessOwner?: () => void;
  onOwnerEmailChange?: (index: number, email: string) => void;
  onAddDocument?: () => void;
  primaryOwnerName?: string; // Current user's name for display
  // Personalization callout props
  personalizationQuestions?: PersonalizationQuestion[];
  currentQuestionIndex?: number;
  selectedPersonalizationOptions?: Record<string, string[]>; // questionId -> selected option ids or text values
  onPersonalizationOptionSelect?: (questionId: string, optionId: string, isMultiSelect?: boolean) => void;
  onPersonalizationTextChange?: (questionId: string, value: string) => void;
  onPersonalizationScaleChange?: (questionId: string, value: number) => void;
  isPersonalizationExpanded?: boolean;
  onTogglePersonalizationExpand?: () => void;
  onSkipQuestion?: () => void; // For optional questions
  onSkipPersonalization?: () => void; // Skip entire personalization flow
  onBack?: () => void; // Go back to previous question
  animatingOptionId?: string; // Currently animating option (for selection animation)
  // Completion flow props
  gratificationTitle?: string;
  gratificationSubtitle?: string;
  onContinueToHome?: () => void;
}

interface InputBarProps {
    currentMode?: ChatMode;
    extraSlotItem?: MoreMode | null;
    onModeChange?: (mode: ChatMode) => void;
    onSubmit?: (value: string) => void;
    investmentAction?: InvestmentAction;
    formNudge?: string; // Shows a label above the input (e.g., "enter the investment amount")
    formCallout?: FormCallout; // Shows a callout header with deal info
    shake?: boolean; // Trigger shake animation (e.g., for invalid input)
    placeholder?: string; // Custom placeholder text
    isInConversation?: boolean; // Hide mode chips when in active conversation
}

export function InputBarV02({ currentMode = 'default', extraSlotItem, onModeChange, onSubmit, investmentAction, formNudge, formCallout, shake, placeholder: customPlaceholder, isInConversation = false }: InputBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [showCommandPanel, setShowCommandPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>('recipes');
  const [triggerQuery, setTriggerQuery] = useState('');
  const [selectedPills, setSelectedPills] = useState<Pill[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ask AI expanded state for personalization
  const [isAskAiExpanded, setIsAskAiExpanded] = useState(false);
  const [askAiQuery, setAskAiQuery] = useState('');

  // Mock conversation messages for demo
  const [askAiMessages, setAskAiMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'user', content: 'What investment sectors should I focus on?' },
    { role: 'ai', content: 'Based on your profile, I recommend focusing on growth-stage technology companies, particularly in AI/ML infrastructure and fintech. These sectors align well with your risk tolerance and investment horizon.' },
    { role: 'user', content: 'How much should I allocate to alternatives?' },
    { role: 'ai', content: 'For your net worth range, a 15-25% allocation to alternatives is typical. Start with 10% if you\'re new to private markets, then gradually increase as you gain experience.' },
  ]);

  // Voice recording hook
  const {
    recordingState,
    isRecording,
    isProcessing,
    hasTranscription,
    isPaused,
    recordingTime,
    transcription,
    startRecording,
    cancelRecording,
    confirmRecording,
    acceptTranscription,
    discardTranscription,
  } = useRecording();

  // Show overlay when not idle
  const showRecordingOverlay = recordingState !== 'idle';

  const handleAcceptTranscription = () => {
    const text = acceptTranscription();
    if (text) {
      setInputValue(text);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check for trigger commands (/ or @)
    const lastAtIndex = value.lastIndexOf('@');
    const lastSlashIndex = value.lastIndexOf('/');
    const lastTriggerIndex = Math.max(lastAtIndex, lastSlashIndex);

    if (lastTriggerIndex !== -1) {
      const afterTrigger = value.substring(lastTriggerIndex + 1);
      const beforeTrigger = value.substring(0, lastTriggerIndex);

      // Only trigger if at start or after a space
      if (lastTriggerIndex === 0 || beforeTrigger.endsWith(' ')) {
        const triggerChar = value[lastTriggerIndex];
        setTriggerQuery(afterTrigger);

        if (triggerChar === '/') {
          setPanelMode('recipes');
          setShowCommandPanel(true);
        } else if (triggerChar === '@') {
          setPanelMode('contexts');
          setShowCommandPanel(true);
        }
        return;
      }
    }

    // If no trigger detected, close panel
    if (!value.includes('/') && !value.includes('@')) {
      setTriggerQuery('');
      setShowCommandPanel(false);
    }
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    const lastSlashIndex = inputValue.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      const beforeSlash = inputValue.substring(0, lastSlashIndex);
      const afterTrigger = inputValue.substring(lastSlashIndex + 1 + triggerQuery.length);

      const newPill: Pill = {
        id: `${recipe.id}-${Date.now()}`,
        name: recipe.name,
        type: 'recipe',
        color: recipe.color,
      };
      setSelectedPills((prev) => [...prev, newPill]);

      setInputValue(beforeSlash.trimEnd() + (afterTrigger ? ' ' + afterTrigger.trimStart() : ''));
    }

    setShowCommandPanel(false);
    setTriggerQuery('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleContextSelect = (context: Context) => {
    const lastAtIndex = inputValue.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const beforeAt = inputValue.substring(0, lastAtIndex);
      const afterTrigger = inputValue.substring(lastAtIndex + 1 + triggerQuery.length);

      const newPill: Pill = {
        id: `${context.id}-${Date.now()}`,
        name: context.name,
        type: 'context',
        color: context.color,
      };
      setSelectedPills((prev) => [...prev, newPill]);

      setInputValue(beforeAt.trimEnd() + (afterTrigger ? ' ' + afterTrigger.trimStart() : ''));
    }

    setShowCommandPanel(false);
    setTriggerQuery('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRemovePill = (pillId: string) => {
    setSelectedPills((prev) => prev.filter((p) => p.id !== pillId));
  };

  const handleClearSearchQuery = () => {
    setTriggerQuery('');

    // Keep the trigger character but clear the query after it
    const lastAtIndex = inputValue.lastIndexOf('@');
    const lastSlashIndex = inputValue.lastIndexOf('/');
    const lastTriggerIndex = Math.max(lastAtIndex, lastSlashIndex);

    if (lastTriggerIndex !== -1) {
      setInputValue(inputValue.substring(0, lastTriggerIndex + 1));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Let the CommandPanel handle keyboard navigation when open
    if (showCommandPanel && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Escape') {
      setShowCommandPanel(false);
    }

    // Handle Enter to submit
    if (e.key === 'Enter' && inputValue.trim() && !showCommandPanel) {
      e.preventDefault();
      onSubmit?.(inputValue.trim());
      setInputValue('');
    }

    // Handle backspace to remove pills when input is empty
    if (e.key === 'Backspace' && inputValue === '' && selectedPills.length > 0) {
      e.preventDefault();
      setSelectedPills((prev) => prev.slice(0, -1));
    }
  };

  const handleToggle = (mode: ChatMode) => {
      if (currentMode === mode) {
          onModeChange?.('default');
      } else {
          onModeChange?.(mode);
      }
  };

  const renderExtraSlot = () => {
    if (!extraSlotItem) return null;

    let label = '';
    let IconComponent: React.ElementType | null = null;

    switch (extraSlotItem) {
        case 'insight':
            label = 'Community Insight';
            IconComponent = FileText;
            break;
        case 'events':
            label = 'Events';
            IconComponent = Calendar;
            break;
        case 'portfolio':
            label = 'My Portfolio';
            IconComponent = Briefcase;
            break;
    }

    if (!IconComponent) return null;

    return (
        <Chip
            label={label}
            isActive={currentMode === extraSlotItem}
            onClick={() => handleToggle(extraSlotItem)}
            icon={
                <IconComponent className="size-[11px] text-[#7f7582]" />
            }
            activeIcon={
                <IconComponent className="size-[11px] text-[#f0eef0]" />
            }
        />
    );
  };

  // Base "more" items (always in the dropdown)
  const baseMoreMenuItems = [
    { label: 'Community Insight', value: 'insight', icon: <FileText className="h-4 w-4 text-gray-500" /> },
    { label: 'My Portfolio', value: 'portfolio', icon: <Briefcase className="h-4 w-4 text-gray-500" /> },
    { label: 'Events', value: 'events', icon: <Calendar className="h-4 w-4 text-gray-500" /> },
  ];

  // All main chip items (for mobile dropdown)
  const mainChipItems = [
    { label: 'Home', value: 'default', icon: <Home className="h-4 w-4 text-gray-500" /> },
    { label: 'Deep Research', value: 'research', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 12 16">
        <path d={chatSvgPaths.p282ff240} fill="#6b7280" />
        <path d={chatSvgPaths.pda45600} fill="#6b7280" />
        <path d={chatSvgPaths.p27a45c00} fill="#6b7280" />
      </svg>
    )},
    { label: 'Deals', value: 'deals', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20">
        <path d={chatSvgPaths.pbe91080} stroke="#6b7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={chatSvgPaths.p3fc7e680} stroke="#6b7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={chatSvgPaths.p553b480} stroke="#6b7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </svg>
    )},
    { label: 'News', value: 'news', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20">
        <path d={chatSvgPaths.p36490700} fill="#6b7280" />
      </svg>
    )},
  ];

  // Mobile: show non-active main items + base more items
  // Desktop: show only base more items
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extra slot item for mobile dropdown
  const extraSlotMenuItem = extraSlotItem ? (() => {
    switch (extraSlotItem) {
      case 'insight':
        return { label: 'Community Insight', value: 'insight', icon: <FileText className="h-4 w-4 text-gray-500" /> };
      case 'events':
        return { label: 'Events', value: 'events', icon: <Calendar className="h-4 w-4 text-gray-500" /> };
      case 'portfolio':
        return { label: 'My Portfolio', value: 'portfolio', icon: <Briefcase className="h-4 w-4 text-gray-500" /> };
      default:
        return null;
    }
  })() : null;

  const moreMenuItems = isMobile
    ? [
        ...mainChipItems.filter(item => item.value !== currentMode),
        ...(extraSlotMenuItem && extraSlotItem !== currentMode ? [extraSlotMenuItem] : []),
        ...baseMoreMenuItems.filter(item => item.value !== currentMode && item.value !== extraSlotItem),
      ]
    : baseMoreMenuItems;

  const isInvestmentMode = currentMode === 'investment' && investmentAction;
  const hasNudge = !!formNudge;
  const hasCallout = !!formCallout;

  // Check if we should show rainbow border (for personalization states)
  const showRainbowBorder = formCallout?.state === 'personalization' ||
    formCallout?.state === 'personalization_processing' ||
    formCallout?.state === 'personalization_complete';

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-2">
      {/* Wrapper for callout + input with rainbow border for personalization */}
      <div className={cn(
        "w-full relative rounded-[16px]",
        !showRainbowBorder && "overflow-hidden",
        shake && "animate-shake",
        showRainbowBorder && "rainbow-border-hover"
      )}>
        {/* Form Callout Header */}
        {hasCallout && (
          <div
            className={cn(
              "rounded-t-[16px] px-4 py-3 flex flex-col gap-3 transition-colors duration-300",
              formCallout.state === 'default' && "bg-[#a8d4f0]",
              formCallout.state === 'awaiting_input' && "bg-[#c4a882] animate-pulse",
              formCallout.state === 'confirmed' && "bg-[#e8e5e8]",
              formCallout.state === 'error' && "bg-[#e8a8a8]",
              formCallout.state === 'commit_confirm' && "bg-[#e8e5e8]",
              formCallout.state === 'investor_type' && "bg-[#e8e5e8]",
              formCallout.state === 'business_info' && "bg-[#e8e5e8]",
              formCallout.state === 'personalization' && "bg-gradient-to-b from-[#f5f0e8] to-[#e8e5e8]",
              formCallout.state === 'personalization_processing' && "bg-gradient-to-b from-[#f5f0e8] to-[#e8e5e8]",
              formCallout.state === 'personalization_complete' && "bg-gradient-to-b from-[#e8f5e8] to-[#e8e5e8]"
            )}
            style={formCallout.state === 'awaiting_input' ? { animationDuration: '3s' } : undefined}
          >
            {/* Collected responses */}
            {formCallout.responses && formCallout.responses.length > 0 && (
              <div className="flex flex-col gap-2 pb-2 border-b border-black/10">
                {formCallout.responses.map((response) => (
                  <div key={response.id} className="flex items-center justify-between">
                    <span
                      className="text-[13px] text-[#29272a]/70"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      {response.question}
                    </span>
                    <span
                      className="text-[14px] font-medium text-[#29272a]"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      {response.answer}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Main row with deal info and header text - hidden during processing/gratification */}
            {formCallout.state !== 'personalization_processing' && formCallout.state !== 'personalization_complete' && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Back button when AI overlay is shown */}
                {formCallout.state === 'personalization' && isAskAiExpanded && (
                  <button
                    onClick={() => setIsAskAiExpanded(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#373338]" />
                  </button>
                )}
                {!isAskAiExpanded && formCallout.dealLogo && (
                  <img
                    src={formCallout.dealLogo}
                    alt="Deal"
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex flex-col gap-1 min-w-0">
                  {(formCallout.headerText || isAskAiExpanded) && (
                  <span
                    className={cn(
                      "text-[14px] md:text-[15px] font-medium text-[#29272a] truncate",
                      formCallout.state === 'error' && "text-[#8a2929]"
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    {isAskAiExpanded ? "Ask AI anything" : formCallout.headerText}
                  </span>
                  )}
                  {/* Saved investor profile badge for returning users - hidden when AI overlay */}
                  {formCallout.savedInvestorProfile && !isAskAiExpanded && (
                    <button
                      onClick={formCallout.onChangeProfile}
                      className="self-start flex items-center gap-1 px-2 py-0.5 text-[10px] text-[#685f6a] bg-white/60 hover:bg-white/80 border border-[#d0cdd2] rounded-md transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <span className="text-[#7f7582]">Investing as</span>
                      <span className="font-medium">{formCallout.savedInvestorProfile.label}</span>
                      <Pencil className="w-2.5 h-2.5 text-[#a09a9f]" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* Ask AI button - toggles expanded AI response area - hidden when already expanded */}
                {formCallout.state === 'personalization' && formCallout.isPersonalizationExpanded && !isAskAiExpanded && (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsAskAiExpanded(!isAskAiExpanded)}
                          className={cn(
                            "flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium border rounded-lg transition-colors",
                            isAskAiExpanded
                              ? "text-white bg-[#373338] border-[#373338] hover:bg-[#29272a]"
                              : "text-[#685f6a] bg-white/60 hover:bg-white/80 border-[#d0cdd2]"
                          )}
                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Ask AI
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isAskAiExpanded ? 'Close AI assistant' : 'Ask AI for help'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {/* Skip personalization button - on the right - hidden when AI overlay */}
                {formCallout.state === 'personalization' && formCallout.isPersonalizationExpanded && formCallout.onSkipPersonalization && !isAskAiExpanded && (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={formCallout.onSkipPersonalization}
                          className="flex items-center justify-center px-2.5 py-1.5 text-[11px] font-medium text-[#685f6a] bg-white/60 hover:bg-white/80 border border-[#d0cdd2] rounded-lg transition-colors"
                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                        >
                          Skip
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remind me later</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formCallout.onClose && (
                  <>
                    {/* Investment progress button - hidden on mobile */}
                    <button
                      onClick={formCallout.onProgressClick}
                      className="hidden md:flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#685f6a] bg-white/60 hover:bg-white/80 border border-[#d0cdd2] rounded-md transition-colors"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Investment progress
                    </button>
                    {formCallout.displayValue && (
                      <button
                        onClick={formCallout.onEditAmount}
                        className="group flex items-center gap-1 md:gap-1.5 hover:bg-black/5 rounded-md px-1.5 md:px-2 py-1 transition-colors"
                      >
                        <span
                          className="text-[13px] md:text-[14px] font-medium text-[#29272a]"
                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                        >
                          {formCallout.displayValue}
                        </span>
                        <Pencil className="w-3 h-3 text-[#a09a9f] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                    <button
                      onClick={formCallout.onClose}
                      className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5 rounded-full hover:bg-black/10 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-3.5 md:h-3.5 text-[#29272a]" />
                    </button>
                  </>
                )}
              </div>
            </div>
            )}

            {/* Checkboxes for commit confirmation */}
            {formCallout.state === 'commit_confirm' && formCallout.checkboxes && (
              <div className="flex flex-col gap-5 mt-2 pt-3 border-t border-black/10">
                {formCallout.checkboxes.map((checkbox) => (
                  <label
                    key={checkbox.id}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={(e) => formCallout.onCheckboxChange?.(checkbox.id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        checkbox.checked
                          ? "bg-[#373338] border-[#373338]"
                          : "bg-white border-[#beb9c0] group-hover:border-[#8a7f91]"
                      )}>
                        {checkbox.checked && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-[14px] leading-[22px] text-[#373338]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      {checkbox.text}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Investor Type Selection - Grouped Sections */}
            {formCallout.state === 'investor_type' && formCallout.investorTypeGroups && (
              <div className="flex flex-col gap-4 mt-2">
                {formCallout.investorTypeGroups.map((group) => (
                  <div key={group.category} className="flex flex-col gap-2">
                    {/* Group Title */}
                    <h4
                      className="text-[14px] font-medium text-[#685f6a]"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      {group.title}
                    </h4>
                    {/* Group Options */}
                    <div className="flex flex-col gap-2">
                      {group.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => formCallout.onInvestorTypeSelect?.(option.id)}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl border-2 transition-all",
                            formCallout.selectedInvestorType === option.id
                              ? "border-[#373338] bg-white"
                              : "border-[#e0dce0] bg-white hover:border-[#c0bcc0]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[15px] text-[#373338]"
                              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                            >
                              {option.title}
                            </span>
                            <span
                              className="text-[12px] text-[#7f7582]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {option.subtitle}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Business Info Form */}
            {formCallout.state === 'business_info' && formCallout.businessInfo && (
              <div className="flex flex-col gap-5 mt-2">
                {/* Business Information Section */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[14px] font-medium text-[#373338]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Business Information
                  </h4>
                  {/* Business Name */}
                  <input
                    type="text"
                    value={formCallout.businessInfo.businessName}
                    onChange={(e) => formCallout.onBusinessInfoChange?.('businessName', e.target.value)}
                    placeholder="Business Name"
                    className="w-full px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  />
                  {/* Business Email & Country */}
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={formCallout.businessInfo.businessEmail}
                      onChange={(e) => formCallout.onBusinessInfoChange?.('businessEmail', e.target.value)}
                      placeholder="Business Email"
                      className="flex-1 px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                    <input
                      type="text"
                      value={formCallout.businessInfo.countryName}
                      onChange={(e) => formCallout.onBusinessInfoChange?.('countryName', e.target.value)}
                      placeholder="Country name"
                      className="flex-1 px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Business Owners Section */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[14px] font-medium text-[#373338]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Business Owners
                  </h4>

                  {/* Primary Owner */}
                  <div className="bg-[#f7f7f8] rounded-xl p-4">
                    <p
                      className="text-[13px] text-[#685f6a] mb-2"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Primary Owner (You)
                    </p>
                    <div className="bg-white border border-[#e0dce0] rounded-xl px-4 py-3">
                      <p
                        className="text-[15px] text-[#373338]"
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {formCallout.primaryOwnerName || 'You'}
                      </p>
                      <p
                        className="text-[13px] text-[#5a8a5a] flex items-center gap-1"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        • Verified
                      </p>
                    </div>
                  </div>

                  {/* Other Owners */}
                  <div className="bg-[#f7f7f8] rounded-xl p-4">
                    <p
                      className="text-[13px] text-[#685f6a] mb-2"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Other Owners
                    </p>
                    {/* Existing other owners */}
                    {formCallout.businessInfo.owners
                      .filter(o => !o.isPrimary)
                      .map((owner, index) => (
                        <input
                          key={owner.id}
                          type="email"
                          value={owner.email}
                          onChange={(e) => formCallout.onOwnerEmailChange?.(index, e.target.value)}
                          placeholder="Enter owner's email"
                          className="w-full px-4 py-3 mb-2 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                          style={{ fontFamily: 'Soehne, sans-serif' }}
                        />
                      ))}
                    {/* Add new owner input */}
                    <input
                      type="email"
                      placeholder="Enter owner's email"
                      className="w-full px-4 py-3 mb-2 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                    {/* Add Business Owner button */}
                    <button
                      onClick={formCallout.onAddBusinessOwner}
                      className="w-full px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#a9a4ab] hover:border-[#c0bcc0] hover:text-[#685f6a] transition-colors flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Business Owner
                    </button>
                    {/* Info text */}
                    <div className="flex items-center gap-2 mt-3 justify-center">
                      <Info className="w-4 h-4 text-[#373338]" />
                      <p
                        className="text-[13px] text-[#373338]"
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        Our team will contact other owners for verification
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upload Documents Section */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[14px] font-medium text-[#373338]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Upload Business Required Documents
                  </h4>
                  <button
                    onClick={formCallout.onAddDocument}
                    className="w-full px-4 py-4 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] hover:border-[#c0bcc0] transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    <Plus className="w-4 h-4" />
                    Document
                  </button>
                </div>
              </div>
            )}

            {/* Personalization Questions - Progressive Disclosure (One at a time) - Hidden when AI overlay is shown */}
            {formCallout.state === 'personalization' && formCallout.personalizationQuestions && formCallout.isPersonalizationExpanded && !isAskAiExpanded && (
              <div className="flex flex-col gap-3 mt-2">
                {/* Previously answered questions - playful stacked summary */}
                {(() => {
                  const currentIndex = formCallout.currentQuestionIndex ?? 0;
                  const totalQuestions = formCallout.personalizationQuestions.length;
                  const answeredQuestions = formCallout.personalizationQuestions.filter((q, idx) => {
                    const selectedValues = formCallout.selectedPersonalizationOptions?.[q.id] || [];
                    return selectedValues.length > 0 && idx < currentIndex;
                  });

                  if (answeredQuestions.length === 0) return null;

                  const progress = Math.round((answeredQuestions.length / totalQuestions) * 100);

                  // Playful messages based on progress
                  const getPlayfulMessage = () => {
                    if (progress < 20) return "Great start! 🚀";
                    if (progress < 40) return "You're on a roll! ✨";
                    if (progress < 60) return "Halfway there! 🎯";
                    if (progress < 80) return "Almost done! 💪";
                    if (progress < 95) return "Final stretch! 🏁";
                    return "Just one more! 🎉";
                  };

                  return (
                    <div className="relative mb-1">
                      {/* Stacked cards visual */}
                      <div className="relative">
                        {/* Background stack layers */}
                        {answeredQuestions.length > 1 && (
                          <div className="absolute inset-x-1 top-1 h-full bg-white/30 rounded-lg border border-[#e8e5e8]/50" />
                        )}
                        {answeredQuestions.length > 2 && (
                          <div className="absolute inset-x-2 top-2 h-full bg-white/20 rounded-lg border border-[#e8e5e8]/30" />
                        )}
                        {/* Top card showing progress */}
                        <div className="relative flex flex-col gap-2 px-3 py-2.5 bg-white/60 rounded-lg border border-[#e8e5e8]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[13px] text-[#373338] font-medium"
                                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                              >
                                {getPlayfulMessage()}
                              </span>
                            </div>
                            <span
                              className="text-[12px] text-[#7f7582]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {answeredQuestions.length}/{totalQuestions}
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-[#e8e5e8] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#373338] to-[#685f6a] rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Current question - expanded with appropriate input type */}
                {formCallout.personalizationQuestions.map((question, qIndex) => {
                  const isCurrentQuestion = qIndex === (formCallout.currentQuestionIndex ?? 0);

                  if (!isCurrentQuestion) return null;

                  const isMultiSelect = question.inputType === 'multi-select';
                  const selectedValues = formCallout.selectedPersonalizationOptions?.[question.id] || [];

                  return (
                    <div
                      key={question.id}
                      className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      {/* Question Text with Back Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Back button - only show if not on first question */}
                          {(formCallout.currentQuestionIndex ?? 0) > 0 && formCallout.onBack && (
                            <TooltipProvider delayDuration={300}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={formCallout.onBack}
                                    className="flex items-center justify-center w-7 h-7 text-[#685f6a] hover:text-[#373338] hover:bg-[#f0eef0] rounded-lg transition-colors"
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Go back</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <p
                            className="text-[15px] text-[#373338]"
                            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                          >
                            {question.question}
                            {question.optional && (
                              <span className="text-[12px] text-[#a09a9f] ml-2">(optional)</span>
                            )}
                          </p>
                        </div>
                        {isMultiSelect && (
                          <span
                            className="text-[11px] text-[#7f7582] bg-[#f0eef0] px-2 py-0.5 rounded-full"
                            style={{ fontFamily: 'Soehne, sans-serif' }}
                          >
                            Select multiple
                          </span>
                        )}
                      </div>

                      {/* Options Grid (for 'options' and 'multi-select' types) */}
                      {(question.inputType === 'options' || question.inputType === 'multi-select') && question.options && (
                        <div className={cn(
                          "grid gap-2",
                          question.options.length <= 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
                        )}>
                          {question.options.map((option) => {
                            const isSelected = selectedValues.includes(option.id);
                            const isAnimating = formCallout.animatingOptionId === option.id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => formCallout.onPersonalizationOptionSelect?.(question.id, option.id, isMultiSelect)}
                                disabled={!!formCallout.animatingOptionId}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left",
                                  isSelected
                                    ? "border-[#373338] bg-white shadow-sm"
                                    : "border-[#e0dce0] bg-white hover:border-[#c0bcc0]",
                                  isAnimating && "animate-selection-pulse",
                                  formCallout.animatingOptionId && !isAnimating && "opacity-50 pointer-events-none"
                                )}
                              >
                                {/* Single-select checkmark indicator */}
                                {!isMultiSelect && isSelected && (
                                  <div className={cn(
                                    "w-4 h-4 rounded-full bg-[#373338] flex items-center justify-center flex-shrink-0",
                                    isAnimating && "animate-selection-check"
                                  )}>
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                                {isMultiSelect && (
                                  <div className={cn(
                                    "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                                    isSelected ? "bg-[#373338] border-[#373338]" : "border-[#beb9c0]"
                                  )}>
                                    {isSelected && (
                                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                {option.icon && (
                                  <span className="text-[16px] flex-shrink-0">{option.icon}</span>
                                )}
                                <span
                                  className="text-[13px] text-[#373338]"
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  {option.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Text Input */}
                      {question.inputType === 'text' && (
                        <input
                          type="text"
                          value={selectedValues[0] || ''}
                          onChange={(e) => formCallout.onPersonalizationTextChange?.(question.id, e.target.value)}
                          placeholder={question.placeholder || 'Enter your answer...'}
                          className="w-full px-4 py-3 bg-white border-2 border-[#e0dce0] rounded-xl text-[14px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#373338] transition-colors"
                          style={{ fontFamily: 'Soehne, sans-serif' }}
                        />
                      )}

                      {/* Scale Input */}
                      {question.inputType === 'scale' && (
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1.5">
                            {Array.from({ length: (question.scaleMax || 10) - (question.scaleMin || 1) + 1 }, (_, i) => {
                              const value = (question.scaleMin || 1) + i;
                              const isSelected = selectedValues[0] === String(value);
                              return (
                                <button
                                  key={value}
                                  onClick={() => formCallout.onPersonalizationScaleChange?.(question.id, value)}
                                  className={cn(
                                    "flex-1 py-2.5 rounded-lg border-2 text-[13px] font-medium transition-all",
                                    isSelected
                                      ? "border-[#373338] bg-[#373338] text-white"
                                      : "border-[#e0dce0] bg-white text-[#373338] hover:border-[#c0bcc0]"
                                  )}
                                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                                >
                                  {value}
                                </button>
                              );
                            })}
                          </div>
                          {question.scaleLabels && (
                            <div className="flex justify-between px-1">
                              <span className="text-[11px] text-[#7f7582]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                                {question.scaleLabels.min}
                              </span>
                              <span className="text-[11px] text-[#7f7582]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                                {question.scaleLabels.max}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Skip button for optional questions */}
                      {question.optional && formCallout.onSkipQuestion && (
                        <button
                          onClick={formCallout.onSkipQuestion}
                          className="self-start text-[12px] text-[#7f7582] hover:text-[#373338] transition-colors"
                          style={{ fontFamily: 'Soehne, sans-serif' }}
                        >
                          Skip this question →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Processing State - Shimmer Animation */}
            {formCallout.state === 'personalization_processing' && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-full max-w-xs">
                  {/* Shimmer bars */}
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-[#e8e5e8] via-[#f5f2f5] to-[#e8e5e8] rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <div className="h-3 bg-gradient-to-r from-[#e8e5e8] via-[#f5f2f5] to-[#e8e5e8] rounded-full animate-shimmer w-4/5" style={{ backgroundSize: '200% 100%', animationDelay: '0.1s' }} />
                    <div className="h-3 bg-gradient-to-r from-[#e8e5e8] via-[#f5f2f5] to-[#e8e5e8] rounded-full animate-shimmer w-3/5" style={{ backgroundSize: '200% 100%', animationDelay: '0.2s' }} />
                  </div>
                </div>
                <p
                  className="mt-4 text-[13px] text-[#7f7582]"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  Personalizing your experience...
                </p>
              </div>
            )}

            {/* Gratification State - Completion Celebration */}
            {formCallout.state === 'personalization_complete' && (
              <div className="flex flex-col items-center justify-center py-6 animate-in fade-in duration-500">
                {/* Celebration emoji */}
                <div className="text-4xl mb-3 animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '2' }}>
                  🎉
                </div>
                {/* Gratification text */}
                <h3
                  className="text-[18px] text-[#373338] font-medium text-center mb-1 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif', animationDelay: '0.2s', animationFillMode: 'backwards' }}
                >
                  {formCallout.gratificationTitle || "You're all set!"}
                </h3>
                <p
                  className="text-[14px] text-[#7f7582] text-center max-w-xs mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ fontFamily: 'Soehne, sans-serif', animationDelay: '0.4s', animationFillMode: 'backwards' }}
                >
                  {formCallout.gratificationSubtitle || "We've personalized your Goodfin experience based on your preferences."}
                </p>
                {/* Continue CTA */}
                <button
                  onClick={formCallout.onContinueToHome}
                  className="px-6 py-2.5 bg-[#373338] text-white text-[14px] font-medium rounded-xl hover:bg-[#29272a] transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif', animationDelay: '0.6s', animationFillMode: 'backwards' }}
                >
                  Continue to Home
                </button>
              </div>
            )}

            {/* Minimized Personalization Summary with Progress - Hidden when AI overlay is shown */}
            {formCallout.state === 'personalization' && !formCallout.isPersonalizationExpanded && !isAskAiExpanded && (
              <button
                onClick={formCallout.onTogglePersonalizationExpand}
                className="flex items-center justify-between w-full px-4 py-3 mt-1 rounded-xl bg-white/70 hover:bg-white/90 border border-[#e0dce0] transition-all group"
              >
                <div className="flex items-center gap-3">
                  {/* Progress indicator */}
                  <div className="flex items-center gap-1">
                    {formCallout.personalizationQuestions?.map((q, idx) => {
                      const isAnswered = (formCallout.selectedPersonalizationOptions?.[q.id]?.length ?? 0) > 0;
                      const isCurrent = idx === (formCallout.currentQuestionIndex ?? 0);
                      return (
                        <div
                          key={q.id}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            isAnswered
                              ? "bg-[#373338]"
                              : isCurrent
                                ? "bg-[#a09a9f] ring-2 ring-[#a09a9f]/30"
                                : "bg-[#e0dce0]"
                          )}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col items-start">
                    <span
                      className="text-[14px] text-[#373338] font-medium"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Personalizing your experience
                    </span>
                    <span
                      className="text-[12px] text-[#7f7582]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      {Object.keys(formCallout.selectedPersonalizationOptions || {}).filter(k =>
                        (formCallout.selectedPersonalizationOptions?.[k]?.length ?? 0) > 0
                      ).length} of {formCallout.personalizationQuestions?.length || 0} questions answered
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[12px] text-[#7f7582] group-hover:text-[#373338] transition-colors"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Continue
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[#7f7582] group-hover:text-[#373338] transition-colors transform group-hover:translate-y-0.5"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        )}

        {/* Input Box Container - Hidden for processing/complete states */}
        {formCallout?.state !== 'personalization_processing' && formCallout?.state !== 'personalization_complete' && (
        <div className={cn(
          "bg-white relative shrink-0 w-full",
          hasCallout ? "rounded-b-[16px]" : "rounded-[16px]",
          (formCallout?.state === 'commit_confirm' || formCallout?.state === 'investor_type' || formCallout?.state === 'business_info' || formCallout?.state === 'personalization') ? "h-auto" : hasNudge ? "min-h-[140px]" : isInvestmentMode ? "min-h-[140px]" : "h-[108px]"
        )}>
          {/* Border & Shadow Layer */}
          <div aria-hidden="true" className={cn(
            "absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none shadow-[-1px_1px_8px_0px_rgba(164,140,160,0.2)]",
            hasCallout ? "rounded-b-[16px] border-t-0" : "rounded-[16px]"
          )} />

        {/* Command Panel */}
        <CommandPanel
          isOpen={showCommandPanel}
          mode={panelMode}
          searchQuery={triggerQuery}
          onClose={() => setShowCommandPanel(false)}
          onRecipeSelect={handleRecipeSelect}
          onContextSelect={handleContextSelect}
          onClearSearchQuery={handleClearSearchQuery}
        />

        <div className="relative z-10 flex flex-col justify-between w-full h-full p-[16px]">
            {/* Commit Confirm CTA Button - replaces entire input area */}
            {formCallout?.state === 'commit_confirm' ? (
              <button
                onClick={formCallout.onCtaClick}
                disabled={formCallout.checkboxes?.some(cb => !cb.checked)}
                className={cn(
                  "w-full py-3.5 rounded-xl text-[16px] font-medium transition-all",
                  formCallout.checkboxes?.every(cb => cb.checked)
                    ? "bg-[#373338] text-white hover:bg-[#29272a] cursor-pointer"
                    : "bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed"
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {formCallout.ctaText || 'I agree and understand'}
              </button>
            ) : formCallout?.state === 'investor_type' ? (
              <button
                onClick={formCallout.onCtaClick}
                disabled={!formCallout.selectedInvestorType}
                className={cn(
                  "w-full py-3.5 rounded-xl text-[16px] font-medium transition-all",
                  formCallout.selectedInvestorType
                    ? "bg-[#373338] text-white hover:bg-[#29272a] cursor-pointer"
                    : "bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed"
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {formCallout.ctaText || 'Continue'}
              </button>
            ) : formCallout?.state === 'business_info' ? (
              <button
                onClick={formCallout.onCtaClick}
                disabled={!formCallout.businessInfo?.businessName || !formCallout.businessInfo?.businessEmail}
                className={cn(
                  "w-full py-3.5 rounded-xl text-[16px] font-medium transition-all",
                  formCallout.businessInfo?.businessName && formCallout.businessInfo?.businessEmail
                    ? "bg-[#373338] text-white hover:bg-[#29272a] cursor-pointer"
                    : "bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed"
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {formCallout.ctaText || 'Submit Business Information'}
              </button>
            ) : formCallout?.state === 'personalization' ? (
              <div className="flex flex-col gap-3">
                {/* Primary CTA Button - hidden when AI overlay is shown */}
                {!isAskAiExpanded && (
                  <button
                    onClick={formCallout.onCtaClick}
                    disabled={formCallout.isCtaDisabled}
                    className={cn(
                      "w-full py-3.5 rounded-xl text-[16px] font-medium transition-all",
                      !formCallout.isCtaDisabled
                        ? "bg-[#373338] text-white hover:bg-[#29272a] cursor-pointer"
                        : "bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed"
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    {formCallout.ctaText || 'Continue'}
                  </button>
                )}

                {/* AI Chat Overlay - shows when Ask AI is clicked */}
                {isAskAiExpanded && (
                  <div className="flex flex-col gap-3">
                    {/* Conversation Messages - Scrollable */}
                    <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                      {askAiMessages.map((msg, idx) => (
                        <div key={idx} className={cn(
                          "flex gap-2",
                          msg.role === 'user' ? "flex-row-reverse" : ""
                        )}>
                          {/* Avatar */}
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                            msg.role === 'ai'
                              ? "bg-gradient-to-br from-[#373338] to-[#685f6a]"
                              : "bg-[#e0dce0]"
                          )}>
                            {msg.role === 'ai' ? (
                              <Sparkles className="w-3 h-3 text-white" />
                            ) : (
                              <span className="text-[10px] font-medium text-[#685f6a]">Y</span>
                            )}
                          </div>
                          {/* Message Bubble */}
                          <div className={cn(
                            "flex-1 max-w-[85%] rounded-lg px-3 py-2",
                            msg.role === 'ai'
                              ? "bg-white border border-[#e8e5e8]"
                              : "bg-[#373338] text-white"
                          )}>
                            <p
                              className={cn(
                                "text-[13px] leading-relaxed",
                                msg.role === 'ai' ? "text-[#373338]" : "text-white"
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Query Input */}
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-[#e0dce0] px-4 py-3">
                      <input
                        type="text"
                        value={askAiQuery}
                        onChange={(e) => setAskAiQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && askAiQuery.trim()) {
                            const userMsg = { role: 'user' as const, content: askAiQuery };
                            const aiMsg = { role: 'ai' as const, content: `That's a great question! Based on your investment profile and goals, I'd suggest considering a balanced approach. Would you like more specific recommendations?` };
                            setAskAiMessages(prev => [...prev, userMsg, aiMsg]);
                            setAskAiQuery('');
                          }
                        }}
                        placeholder="Type your question..."
                        className="flex-1 text-[15px] text-[#29272a] placeholder:text-[#a09a9f] bg-transparent outline-none"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      />
                      <button
                        onClick={() => {
                          if (askAiQuery.trim()) {
                            const userMsg = { role: 'user' as const, content: askAiQuery };
                            const aiMsg = { role: 'ai' as const, content: `That's a great question! Based on your investment profile and goals, I'd suggest considering a balanced approach. Would you like more specific recommendations?` };
                            setAskAiMessages(prev => [...prev, userMsg, aiMsg]);
                            setAskAiQuery('');
                          }
                        }}
                        className="p-2 rounded-lg bg-[#373338] hover:bg-[#29272a] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Investment Action Header */}
                {isInvestmentMode && !hasCallout && (
                  <div className="flex items-center justify-between bg-[#a8d4f0] rounded-lg px-4 py-2.5 mb-3">
                    <span
                      className="text-[15px] font-medium text-[#29272a]"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      {investmentAction.label}
                    </span>
                    <button
                      onClick={investmentAction.onClose}
                      className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-[#29272a]" />
                    </button>
                  </div>
                )}

                {/* Input Area */}
                <div className={cn(
                  "flex items-center gap-2 flex-wrap",
                  (isInvestmentMode || hasCallout) ? "flex-1 min-h-[24px]" : "h-[24px] overflow-hidden"
                )}>
                  {/* Selected Pills - hidden in investment mode or callout */}
                  {!isInvestmentMode && !hasCallout && selectedPills.map((pill) => (
                    <PillTag
                      key={pill.id}
                      pill={pill}
                      onRemove={() => handleRemovePill(pill.id)}
                    />
                  ))}

                  {/* Input - disabled when recording/processing/transcribed */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={showRecordingOverlay}
                    placeholder={
                      hasCallout
                        ? formCallout?.state === 'awaiting_input'
                          ? "Enter investment amount..."
                          : customPlaceholder || "Ask a follow-up question..."
                        : isInvestmentMode
                          ? customPlaceholder || `Ask followup about ${investmentAction?.label?.replace('Invest in ', '').toLowerCase() || 'this deal'}`
                          : selectedPills.length > 0
                            ? "Add more context..."
                            : "Ask anything... (type / or @ for commands)"
                    }
                    className={cn(
                      "flex-1 min-w-[200px] text-[16px] leading-normal text-[#29272a] placeholder:text-[#7f7582] bg-transparent outline-none font-light tracking-[-0.3125px]",
                      showRecordingOverlay && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>
              </>
            )}

            {/* Bottom Section - relative container for overlay - hidden in commit_confirm, investor_type, business_info, and personalization states */}
            {formCallout?.state !== 'commit_confirm' && formCallout?.state !== 'investor_type' && formCallout?.state !== 'business_info' && formCallout?.state !== 'personalization' && (
            <div className="relative">
              {/* Voice Recording Interface - overlayed at bottom */}
              {showRecordingOverlay && (
                <div className="absolute inset-0 z-20 bg-white flex items-center">
                  <VoiceRecordingInterface
                    recordingState={recordingState}
                    recordingTime={recordingTime}
                    isPaused={isPaused}
                    transcription={transcription}
                    onCancel={cancelRecording}
                    onConfirm={confirmRecording}
                    onAccept={handleAcceptTranscription}
                    onDiscard={discardTranscription}
                  />
                </div>
              )}

              {/* Bottom Toolbar - visible but behind overlay when recording */}
              <div className={cn(
                "flex items-end justify-between pl-0 pr-[12px]",
                showRecordingOverlay && "opacity-30 pointer-events-none"
              )}>
                {/* Left Actions (Chips) - Hidden in investment mode, when callout is shown, or when in conversation */}
                {!isInvestmentMode && !hasCallout && !isInConversation ? (
                <div className="flex gap-[4px] items-center flex-wrap">
                    {/* Home - hidden on mobile unless active */}
                    <div className={cn(
                      currentMode === 'default' ? "block" : "hidden md:block"
                    )}>
                      <Chip
                          label="Home"
                          isActive={currentMode === 'default'}
                          onClick={() => handleToggle('default')}
                          icon={
                              <Home className="size-[11px] text-[#7f7582]" />
                          }
                          activeIcon={
                              <Home className="size-[11px] text-[#f0eef0]" />
                          }
                      />
                    </div>

                    {/* Deep Research - hidden on mobile unless active */}
                    <div className={cn(
                      currentMode === 'research' ? "block" : "hidden md:block"
                    )}>
                      <Chip
                          label="Deep Research"
                          isActive={currentMode === 'research'}
                          onClick={() => handleToggle('research')}
                          icon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 12 16">
                                <path d={chatSvgPaths.p282ff240} fill="#7f7582" />
                                <path d={chatSvgPaths.pda45600} fill="#7f7582" />
                                <path d={chatSvgPaths.p27a45c00} fill="#7f7582" />
                              </svg>
                          }
                          activeIcon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 12 16">
                                <path d={chatSvgPaths.p282ff240} fill="#f0eef0" />
                                <path d={chatSvgPaths.pda45600} fill="#f0eef0" />
                                <path d={chatSvgPaths.p27a45c00} fill="#f0eef0" />
                              </svg>
                          }
                      />
                    </div>

                    {/* Deals - hidden on mobile unless active */}
                    <div className={cn(
                      currentMode === 'deals' ? "block" : "hidden md:block"
                    )}>
                      <Chip
                          label="Deals"
                          isActive={currentMode === 'deals'}
                          onClick={() => handleToggle('deals')}
                          icon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 20 20">
                                <path d={chatSvgPaths.pbe91080} stroke="#7f7582" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                <path d={chatSvgPaths.p3fc7e680} stroke="#7f7582" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                <path d={chatSvgPaths.p553b480} stroke="#7f7582" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                              </svg>
                          }
                          activeIcon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 20 20">
                                <path d={chatSvgPaths.pbe91080} stroke="#f0eef0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                <path d={chatSvgPaths.p3fc7e680} stroke="#f0eef0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                <path d={chatSvgPaths.p553b480} stroke="#f0eef0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                              </svg>
                          }
                      />
                    </div>

                    {/* News - hidden on mobile unless active */}
                    <div className={cn(
                      currentMode === 'news' ? "block" : "hidden md:block"
                    )}>
                      <Chip
                          label="News"
                          isActive={currentMode === 'news'}
                          onClick={() => handleToggle('news')}
                          icon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 20 20">
                                <path d={chatSvgPaths.p36490700} fill="#7f7582" />
                              </svg>
                          }
                          activeIcon={
                              <svg className="size-[11px]" fill="none" viewBox="0 0 20 20">
                                <path d={chatSvgPaths.p36490700} fill="#f0eef0" />
                              </svg>
                          }
                      />
                    </div>

                    {/* Dynamic Extra Slot - hidden on mobile unless active */}
                    {extraSlotItem && (
                      <div className={cn(
                        currentMode === extraSlotItem ? "block" : "hidden md:block"
                      )}>
                        {renderExtraSlot()}
                      </div>
                    )}

                    {/* Mobile: Show active "more" item as chip when selected */}
                    {isMobile && ['insight', 'events', 'portfolio'].includes(currentMode) && currentMode !== extraSlotItem && (
                      <Chip
                        label={
                          currentMode === 'insight' ? 'Community Insight' :
                          currentMode === 'events' ? 'Events' :
                          'My Portfolio'
                        }
                        isActive={true}
                        onClick={() => handleToggle(currentMode)}
                        icon={
                          currentMode === 'insight' ? <FileText className="size-[11px] text-[#f0eef0]" /> :
                          currentMode === 'events' ? <Calendar className="size-[11px] text-[#f0eef0]" /> :
                          <Briefcase className="size-[11px] text-[#f0eef0]" />
                        }
                      />
                    )}

                    {/* More - With Simple Dropdown - always visible */}
                    <SimpleDropdown
                      items={moreMenuItems}
                      onSelect={(value) => onModeChange?.(value as ChatMode)}
                    >
                      <Chip
                        label="More"
                        isActive={false}
                        icon={
                            <svg className="size-[11px]" fill="none" viewBox="0 0 20 20">
                              <path d={chatSvgPaths.p24b71d80} fill="#7f7582" />
                            </svg>
                        }
                      />
                    </SimpleDropdown>
                </div>
                ) : (
                  <div className="flex-1" /> /* Empty spacer in investment mode */
                )}

                {/* Right Actions (Mic & Waveform) */}
                <div className="flex items-center gap-[8px] h-[36px] w-[72px]">
                     {/* Mic Button - triggers voice recording */}
                    <button
                      onClick={startRecording}
                      className="flex items-center justify-center size-[28px] rounded-[40px] hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                        <div className="relative shrink-0 size-[18px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                                <defs>
                                  <clipPath id="clip_mic">
                                    <rect fill="white" height="18" width="18" />
                                  </clipPath>
                                </defs>
                                <g clipPath="url(#clip_mic)">
                                  <path d={chatSvgPaths.p22ac6580} fill="#48424A" />
                                </g>
                              </svg>
                        </div>
                    </button>

                    {/* Waveform Button */}
                    <div className="bg-[rgba(229,220,227,0.56)] flex flex-col items-center justify-center rounded-[16px] shrink-0 w-[36px] h-[36px] hover:bg-[rgba(229,220,227,0.7)] cursor-pointer transition-colors">
                         <div className="flex gap-[1.5px] items-center justify-center relative shrink-0 size-[18px]">
                              <div className="w-[3px] h-[4.5px] bg-[#48424a] rounded-[15px]" />
                              <div className="w-[3px] h-[10.5px] bg-[#48424a] rounded-[15px]" />
                              <div className="w-[3px] h-[7.5px] bg-[#48424a] rounded-[15px]" />
                         </div>
                    </div>
                </div>
              </div>
            </div>
            )}
        </div>
        </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="w-full text-center">
         <p className="text-[12px] leading-[16px] text-[#7f7582] font-light">
            Goodfin AI Concierge does not provide tax, financial, investment, or legal advice. It can present inaccurate information. Make sure to validate.
         </p>
      </div>
    </div>
  );
}
