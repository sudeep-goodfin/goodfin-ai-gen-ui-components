import React from 'react';
import { cn } from '@/lib/utils';
import { CustomIcon } from '../Icon';
import { chatSvgPaths, svgPaths } from '../../svgPaths';
import { Users, FileText, Calendar, Briefcase, X } from 'lucide-react';

// SVG Wrapper component
function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

function Chip({ icon, label, onClick, isActive }: ChipProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0 cursor-pointer transition-colors border border-transparent select-none",
        isActive ? "bg-purple-100 border-purple-200" : "bg-white hover:bg-gray-50"
      )}
    >
      <div className="flex items-center relative shrink-0">
        {icon}
      </div>
      <span className="text-[#29272a] text-[14px] leading-[20px] font-normal whitespace-nowrap">
        {label}
      </span>

      {/* Close Icon (only if active) */}
      {isActive && (
        <div className="absolute -top-[2px] -right-[2px] bg-white rounded-full p-[1px] border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 flex items-center justify-center">
          <X className="w-[10px] h-[10px] text-gray-500" />
        </div>
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
        label = 'Upcoming Events';
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
          <div className="flex items-center justify-center w-[20px] h-[20px]">
            <IconComponent className="h-[16px] w-[16px] text-[#373338]" />
          </div>
        }
      />
    );
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-2">
      {/* Input Box Container */}
      <div className="bg-white relative rounded-[16px] shrink-0 w-full min-h-[108px] flex flex-col">
        {/* Border & Shadow Layer */}
        <div
          aria-hidden="true"
          className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[-1px_1px_8px_0px_rgba(164,140,160,0.2)]"
        />

        <div className="relative z-10 flex flex-col w-full h-full p-1">
          {/* Input Area */}
          <div className="flex-1 px-[12px] py-[8px] flex items-start">
            <input
              type="text"
              placeholder="Ask anything..."
              className="w-full text-[16px] leading-[24px] text-[#29272a] placeholder:text-[#7f7582] bg-transparent outline-none font-light"
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-end justify-between px-[12px] pb-0">
            {/* Left Actions (Chips) */}
            <div className="flex gap-[4px] items-center flex-wrap">
              {/* Deep Research */}
              <Chip
                label="Deep Research"
                isActive={currentMode === 'research'}
                onClick={() => handleToggle('research')}
                icon={
                  <div className="overflow-clip relative shrink-0 size-[20px]">
                    <div className="absolute inset-[8.33%_20.83%_12.5%_20.83%]">
                      <div className="absolute inset-[0_0_-0.01%_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
                          <g>
                            <path d={chatSvgPaths.researchIcon1} fill="#BEB9C0" />
                            <path d={chatSvgPaths.researchIcon2} fill="#373338" />
                            <path d={chatSvgPaths.researchIcon3} fill="#373338" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Deals */}
              <Chip
                label="Deals"
                isActive={currentMode === 'deals'}
                onClick={() => handleToggle('deals')}
                icon={
                  <Wrapper>
                    <g>
                      <path d={chatSvgPaths.dealsIcon3} stroke="#29272A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={chatSvgPaths.dealsIcon1} stroke="#29272A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={chatSvgPaths.dealsIcon2} stroke="#29272A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </Wrapper>
                }
              />

              {/* News */}
              <Chip
                label="News"
                isActive={currentMode === 'news'}
                onClick={() => handleToggle('news')}
                icon={
                  <Wrapper>
                    <defs>
                      <clipPath id="clip_news">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#clip_news)">
                      <path d={chatSvgPaths.news} fill="#BEB9C0" />
                    </g>
                  </Wrapper>
                }
              />

              {/* Dynamic Extra Slot */}
              {renderExtraSlot()}

              {/* More */}
              <Chip
                label="More"
                isActive={false}
                icon={
                  <Wrapper>
                    <defs>
                      <clipPath id="clip_more">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#clip_more)">
                      <path d={chatSvgPaths.more} fill="#373338" />
                    </g>
                  </Wrapper>
                }
              />
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
                      <path d={chatSvgPaths.mic} fill="#48424A" />
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
