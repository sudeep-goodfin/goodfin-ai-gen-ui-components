import React from 'react';
import { CustomIcon } from '../Icon';
import svgPaths from '../../imports/svg-68p9mk74mk';
import { ChatMode } from './InputBar';
import { Greeting } from './Greeting';
import { ArrowRight } from 'lucide-react';
import { EventCard, EVENTS_DATA } from './EventsContent';

// Background container for explore cards
function ExploreCard({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div
      onClick={onClick}
      className="bg-[#f7f7f8] h-[196px] relative rounded-[12px] shrink-0 w-full cursor-pointer group transition-all duration-300 overflow-hidden border border-[#e6e4e7] hover:border-[#d4d1d6] hover:shadow-md"
    >
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[12px] relative rounded-[inherit] size-full z-10">
        {children}
      </div>
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
function ExploreCardContent({ title, descriptions, icon }: { title: string; descriptions: string[]; icon?: React.ReactNode }) {
  return (
    <div className="absolute flex flex-col gap-[8px] items-start left-0 p-[20px] top-0 w-full h-full rounded-[12px]">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-[#e9e6ea] flex items-center justify-center mb-2 group-hover:bg-[#d4d1d6] transition-colors">
          {icon}
        </div>
      )}
      <span className="text-[#29272a] text-[16px] leading-[20px] font-medium tracking-[-0.15px] group-hover:text-[#48424a] transition-colors">
        {title}
      </span>
      <div className="text-[#7f7582] text-[13px] leading-5 font-normal">
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

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl pb-20">
      <div className="flex flex-col gap-[32px] grow items-center w-full">

        {/* Greeting Section */}
        <Greeting />

        {/* Pick up where you left off */}
        <div className="flex flex-col gap-3 items-start w-full">
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
          <ResumeCard onClick={() => onStartChat ? onStartChat('Resume investing in Anthropic') : onModeChange?.('deals')} />
        </div>

        {/* Explore Goodfin */}
        <div className="flex flex-col gap-3 items-start w-full">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <ExploreCard onClick={() => onModeChange?.('deals')}>
                  <ExploreCardContent
                    title="New Deals"
                    descriptions={["Browse exclusive late-stage allocations.", "Access top-tier VC deals."]}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" fill="#48424a"/>
                      </svg>
                    }
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('events')}>
                  <ExploreCardContent
                    title="Events"
                    descriptions={["Join exclusive member summits.", "Network with industry peers."]}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" fill="#48424a"/>
                      </svg>
                    }
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('news')}>
                  <ExploreCardContent
                    title="News"
                    descriptions={["Latest market intelligence.", "Regulatory updates & trends."]}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 3l-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z" fill="#48424a"/>
                      </svg>
                    }
                  />
                </ExploreCard>

                <ExploreCard onClick={() => onModeChange?.('insight')}>
                  <ExploreCardContent
                    title="Insights"
                    descriptions={["Expert investment memos.", "Community deal analysis."]}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" fill="#48424a"/>
                      </svg>
                    }
                  />
                </ExploreCard>
            </div>
        </div>

        {/* Upcoming Events */}
        <div className="flex flex-col gap-3 items-start w-full">
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
              text={`(${EVENTS_DATA.length}) Upcoming events`}
            />

            <div className="flex flex-col gap-3 w-full">
              {EVENTS_DATA.slice(0, 3).map((item) => (
                <EventCard
                  key={item.id}
                  {...item}
                  onClick={() => onModeChange?.('events')}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
