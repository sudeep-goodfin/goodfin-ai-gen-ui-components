import React, { useState } from 'react';
import { chatSvgPaths } from './chat-icons';
import { cn } from '@/lib/utils';
import { FileText, Calendar, Briefcase, Home } from "lucide-react";


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
export type ChatMode = 'default' | 'research' | 'deals' | 'news' | MoreMode;

interface InputBarProps {
    currentMode?: ChatMode;
    extraSlotItem?: MoreMode | null;
    onModeChange?: (mode: ChatMode) => void;
}

export function InputBar({ currentMode = 'default', extraSlotItem, onModeChange }: InputBarProps) {

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

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-2">
      {/* Input Box Container */}
      <div className="bg-white relative rounded-[16px] shrink-0 w-full h-[108px] flex flex-col">
        {/* Border & Shadow Layer */}
        <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[-1px_1px_8px_0px_rgba(164,140,160,0.2)]" />

        <div className="relative z-10 flex flex-col justify-between w-full h-full p-[16px]">
            {/* Input Area */}
            <div className="flex h-[24px] items-center">
                 <input
                    type="text"
                    placeholder="Ask anything..."
                    className="w-full text-[16px] leading-normal text-[#29272a] placeholder:text-[#7f7582] bg-transparent outline-none font-light tracking-[-0.3px]"
                 />
            </div>

            {/* Bottom Toolbar */}
            <div className="flex items-end justify-between">
                {/* Left Actions (Chips) */}
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

                {/* Right Actions (Mic & Waveform) */}
                <div className="flex items-center gap-[8px]">
                     {/* Mic Button */}
                    <div className="flex items-center justify-center size-[28px] rounded-[40px] hover:bg-gray-100 cursor-pointer transition-colors">
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
                    </div>

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
