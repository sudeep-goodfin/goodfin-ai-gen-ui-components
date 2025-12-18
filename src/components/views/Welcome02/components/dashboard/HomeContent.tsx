import React from 'react';
import { CustomIcon } from '../Icon';
import svgPaths from '../../imports/svg-68p9mk74mk';
import { SuggestionCard, SUGGESTIONS_DATA } from './DashboardContent';
import { ChatMode } from './InputBar';
import { Greeting } from './Greeting';
import { ArrowRight } from 'lucide-react';

// Background container for explore cards
function ExploreCard({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div
      onClick={onClick}
      className="bg-white h-[196px] relative rounded-[6px] shrink-0 w-full cursor-pointer group transition-all duration-300 overflow-hidden"
    >
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[12px] relative rounded-[inherit] size-full z-10">
        {children}
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#a46f04] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px] group-hover:border-purple-300 transition-colors z-20"
      />
    </div>
  );
}

// Section header component
function SectionHeader({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start px-0 py-[8px] w-full">
      <div className="flex gap-[10px] items-center">
        <div className="flex items-center shrink-0">
          {icon}
        </div>
        <span className="text-[#48424a] text-[16px] leading-[24px]">{text}</span>
      </div>
    </div>
  );
}

// Resume card (pick up where you left off)
function ResumeCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white h-[198px] relative rounded-[12px] shrink-0 w-full overflow-hidden border border-[#e3e3e3] shadow-sm cursor-pointer hover:shadow-lg hover:border-purple-200 transition-all group"
    >
      <div className="flex flex-col gap-[8px] items-start overflow-clip rounded-[inherit] size-full">
        {/* Top banner */}
        <div className="bg-[#d3a88c] w-full">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="flex gap-[10px] items-start px-[20px] py-[28px] w-full">
              <div className="flex items-center shrink-0">
                <CustomIcon viewBox="0 0 20 20" width={20} height={20}>
                  <g clipPath="url(#clip_history_resume)">
                    <path d={svgPaths.p2b204f00} fill="#F7F7F8" />
                  </g>
                  <defs>
                    <clipPath id="clip_history_resume">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </CustomIcon>
              </div>
              <span className="text-[#f7f7f8] text-[18px] leading-[20px]">
                You can resume your last action in SpaceX, or ask me what's changed.
              </span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col h-[253px] items-start w-full">
          <div className="h-[100px] w-full">
            <div className="flex items-center size-full">
              <div className="flex items-center justify-between p-[16px] w-full">
                {/* Avatar and company info */}
                <div className="flex gap-[10px] items-start">
                  <div className="h-[88px] w-[82px] relative">
                    <div className="absolute bg-[#c7b8c7] blur-[7px] filter h-[51px] left-1/2 -translate-x-1/2 opacity-50 top-[33px] w-[58px]" />
                    <div className="absolute left-1/2 -translate-x-1/2 rounded-[11px] size-[72px] top-0 overflow-hidden bg-gradient-to-br from-purple-200 to-orange-100 shadow-[inset_0px_-3px_43px_0px_rgba(255,255,255,0.31)]">
                      <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-[#48424a]">
                        A
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-[120px]">
                    <div className="flex gap-[4px] h-[32px] items-end">
                      <span className="text-[#29272a] text-[20px] leading-[28px] font-semibold whitespace-nowrap">
                        Anthropic
                      </span>
                    </div>
                  </div>
                </div>

                {/* Resume button */}
                <div className="bg-[#29272a] flex gap-[6px] h-[32px] items-center justify-center px-[16px] rounded-[4px] cursor-pointer group-hover:bg-black transition-colors">
                  <span className="text-[#f7f7f8] text-[12px] leading-[12px] font-semibold whitespace-nowrap">
                    Resume Investing
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#f7f7f8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Explore card content
function ExploreCardContent({ title, descriptions }: { title: string; descriptions: string[] }) {
  return (
    <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(254,254,232,0.05)] flex flex-col gap-[4px] items-start left-0 p-[20px] top-0 w-full h-full rounded-[6px]">
      <span className="text-[#87560c] text-[16px] leading-[20px] font-medium tracking-[-0.15px] group-hover:-translate-y-1 transition-transform duration-300">
        {title}
      </span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#87560c] text-[12px] leading-4 font-normal mt-2">
        {descriptions.map((desc, idx) => (
          <p key={idx}>{desc}</p>
        ))}
      </div>
    </div>
  );
}

interface HomeContentProps {
  onModeChange?: (mode: ChatMode) => void;
  onStartChat?: (text: string) => void;
}

export function HomeContent({ onModeChange, onStartChat }: HomeContentProps) {
  // Gradient backgrounds for explore cards (simulating images)
  const cardGradients = [
    'linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe082 100%)',
    'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)',
    'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
    'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)'
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl pb-20">
      <div className="flex flex-col gap-[40px] grow items-center w-full">

        {/* Greeting Section */}
        <Greeting />

        {/* Sections Container */}
        <div className="flex flex-col gap-[10px] items-center w-full">

          {/* Pick up where you left off */}
          <SectionHeader
            icon={
              <CustomIcon viewBox="0 0 20 20" width={20} height={20}>
                <g clipPath="url(#clip_history)">
                  <path d={svgPaths.p2b204f00} fill="#373338" />
                </g>
                <defs>
                  <clipPath id="clip_history">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </CustomIcon>
            }
            text="Pick up where you left off"
          />

          <div className="flex flex-col items-start w-full">
            <div className="flex gap-[16px] items-center w-full">
              <div className="flex-1">
                <ResumeCard onClick={() => onStartChat ? onStartChat('Resume investing in Anthropic') : onModeChange?.('deals')} />
              </div>
            </div>
          </div>

          {/* Explore Goodfin */}
          <div className="flex flex-col gap-[10px] items-start w-full">
            <SectionHeader
              icon={
                <CustomIcon viewBox="0 0 20 20" width={20} height={20}>
                  <g clipPath="url(#clip_explore)">
                    <path d={svgPaths.pa245280} fill="#373338" />
                  </g>
                  <defs>
                    <clipPath id="clip_explore">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </CustomIcon>
              }
              text="Explore Goodfin"
            />

            {/* Overflow Container */}
            <div className="relative w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px] w-[110%] -ml-[5%]">
                <ExploreCard onClick={() => onModeChange?.('deals')}>
                  <div
                    className="absolute h-[196px] left-0 top-0 w-full rounded-[6px] group-hover:blur-[3px] group-hover:scale-110 transition-all duration-500"
                    style={{ background: cardGradients[0] }}
                  />
                  <ExploreCardContent
                    title="New Deals"
                    descriptions={["Browse exclusive late-stage allocations.", "Access top-tier VC deals."]}
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('events')}>
                  <div
                    className="absolute h-[196px] left-0 top-0 w-full rounded-[6px] group-hover:blur-[3px] group-hover:scale-110 transition-all duration-500"
                    style={{ background: cardGradients[1] }}
                  />
                  <ExploreCardContent
                    title="Events"
                    descriptions={["Join exclusive member summits.", "Network with industry peers."]}
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('news')}>
                  <div
                    className="absolute h-[196px] left-0 top-0 w-full rounded-[6px] group-hover:blur-[3px] group-hover:scale-110 transition-all duration-500"
                    style={{ background: cardGradients[2] }}
                  />
                  <ExploreCardContent
                    title="News"
                    descriptions={["Latest market intelligence.", "Regulatory updates & trends."]}
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('insight')}>
                  <div
                    className="absolute h-[196px] left-0 top-0 w-full rounded-[6px] group-hover:blur-[3px] group-hover:scale-110 transition-all duration-500"
                    style={{ background: cardGradients[3] }}
                  />
                  <ExploreCardContent
                    title="Insights"
                    descriptions={["Expert investment memos.", "Community deal analysis."]}
                  />
                </ExploreCard>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="flex flex-col gap-[10px] items-start w-full">
            <SectionHeader
              icon={
                <CustomIcon viewBox="0 0 20 20" width={20} height={20}>
                  <g clipPath="url(#clip_calendar)">
                    <path d={svgPaths.p1e918d00} fill="#373338" />
                  </g>
                  <defs>
                    <clipPath id="clip_calendar">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </CustomIcon>
              }
              text="Upcoming events"
            />

            <div className="flex flex-col gap-3 w-full">
              {SUGGESTIONS_DATA['events'].map((item, index) => (
                <SuggestionCard
                  key={index}
                  {...item}
                  onClick={() => onModeChange?.('events')}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
