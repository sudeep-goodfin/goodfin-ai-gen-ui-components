import React, { useState, useRef } from 'react';
import { chatSvgPaths } from './chat-icons';
import { cn } from '@/lib/utils';
import { FileText, Calendar, Briefcase, Home, X } from "lucide-react";
import { CommandPanel, Recipe, Context, Pill, PanelMode } from './command-panel';
import { useRecording } from './hooks/useRecording';
import { VoiceRecordingInterface } from './VoiceRecordingInterface';


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
export type CalloutState = 'default' | 'awaiting_input' | 'confirmed' | 'error' | 'commit_confirm';

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

interface FormCallout {
  state: CalloutState;
  dealLogo?: string;
  headerText: string; // Main text - deal name, question, or error message
  displayValue?: string; // e.g., "$50,000" shown on the right
  responses?: CalloutResponse[]; // Collected responses from user
  onClose?: () => void;
  // Commit confirmation specific props
  checkboxes?: CommitCheckbox[];
  onCheckboxChange?: (id: string, checked: boolean) => void;
  ctaText?: string;
  onCtaClick?: () => void;
}

interface InputBarProps {
    currentMode?: ChatMode;
    extraSlotItem?: MoreMode | null;
    onModeChange?: (mode: ChatMode) => void;
    onSubmit?: (value: string) => void;
    investmentAction?: InvestmentAction;
    formNudge?: string; // Shows a label above the input (e.g., "enter the investment amount")
    formCallout?: FormCallout; // Shows a callout header with deal info
}

export function InputBarV02({ currentMode = 'default', extraSlotItem, onModeChange, onSubmit, investmentAction, formNudge, formCallout }: InputBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [showCommandPanel, setShowCommandPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>('recipes');
  const [triggerQuery, setTriggerQuery] = useState('');
  const [selectedPills, setSelectedPills] = useState<Pill[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const moreMenuItems = [
    { label: 'Community Insight', value: 'insight', icon: <FileText className="h-4 w-4 text-gray-500" /> },
    { label: 'My Portfolio', value: 'portfolio', icon: <Briefcase className="h-4 w-4 text-gray-500" /> },
    { label: 'Events', value: 'events', icon: <Calendar className="h-4 w-4 text-gray-500" /> },
  ];

  const isInvestmentMode = currentMode === 'investment' && investmentAction;
  const hasNudge = !!formNudge;
  const hasCallout = !!formCallout;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-2">
      {/* Wrapper for callout + input */}
      <div className="w-full relative">
        {/* Form Callout Header */}
        {hasCallout && (
          <div
            className={cn(
              "rounded-t-[16px] px-4 py-3 flex flex-col gap-3 transition-colors duration-300",
              formCallout.state === 'default' && "bg-[#a8d4f0]",
              formCallout.state === 'awaiting_input' && "bg-[#c4a882] animate-pulse",
              formCallout.state === 'confirmed' && "bg-[#e8e5e8]",
              formCallout.state === 'error' && "bg-[#e8a8a8]",
              formCallout.state === 'commit_confirm' && "bg-[#e8e5e8]"
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

            {/* Main row with deal info and header text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {formCallout.dealLogo && (
                  <img
                    src={formCallout.dealLogo}
                    alt="Deal"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <span
                  className={cn(
                    "text-[15px] font-medium text-[#29272a]",
                    formCallout.state === 'error' && "text-[#8a2929]"
                  )}
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  {formCallout.headerText}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {formCallout.displayValue && (
                  <span
                    className="text-[18px] font-medium text-[#29272a]"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    {formCallout.displayValue}
                  </span>
                )}
                {formCallout.onClose && (
                  <button
                    onClick={formCallout.onClose}
                    className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-[#29272a]" />
                  </button>
                )}
              </div>
            </div>

            {/* Checkboxes for commit confirmation */}
            {formCallout.state === 'commit_confirm' && formCallout.checkboxes && (
              <div className="flex flex-col gap-4 mt-2 pt-3 border-t border-black/10">
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
                          : "bg-white border-[#c0bcc0] group-hover:border-[#9a909a]"
                      )}>
                        {checkbox.checked && (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path
                              d="M1 5L4.5 8.5L11 1"
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
                      className="text-[14px] leading-[20px] text-[#48424a]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      {checkbox.text}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input Box Container */}
        <div className={cn(
          "bg-white relative shrink-0 w-full",
          hasCallout ? "rounded-b-[16px]" : "rounded-[16px]",
          formCallout?.state === 'commit_confirm' ? "h-auto" : hasNudge ? "min-h-[140px]" : isInvestmentMode ? "min-h-[140px]" : "h-[108px]"
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
                        ? "Enter your response..."
                        : isInvestmentMode
                          ? `Ask followup about ${investmentAction?.label?.replace('Invest in ', '').toLowerCase() || 'this deal'}`
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

            {/* Bottom Section - relative container for overlay - hidden in commit_confirm state */}
            {formCallout?.state !== 'commit_confirm' && (
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
                {/* Left Actions (Chips) - Hidden in investment mode or when callout is shown */}
                {!isInvestmentMode && !hasCallout ? (
                <div className="flex gap-[4px] items-center flex-wrap">
                    {/* Home */}
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

                    {/* Deep Research */}
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

                    {/* Deals */}
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

                    {/* News */}
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

                    {/* Dynamic Extra Slot */}
                    {renderExtraSlot()}

                    {/* More - With Simple Dropdown */}
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
