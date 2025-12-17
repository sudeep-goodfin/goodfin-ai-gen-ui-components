import React, { useState } from 'react';
import { Greeting } from './Greeting';
import { DashboardContent } from './DashboardContent';
import { HomeContent } from './HomeContent';
import { InputBar, ChatMode, MoreMode } from './InputBar';
import { Icon, CustomIcon } from '../Icon';
import { svgPaths } from '../../svgPaths';

// Component for the top right history/action icons
function TopActions() {
  return (
    <div className="flex items-center gap-3 self-end md:self-auto ml-auto px-6 py-4 opacity-50 hover:opacity-100 transition-opacity">
      <button className="p-1 hover:bg-black/5 rounded">
        <CustomIcon viewBox="0 0 18 18" width={18} height={18}>
          <path d={svgPaths.clock} fill="#69606D" />
        </CustomIcon>
      </button>
      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-black/5 rounded">
          <CustomIcon viewBox="0 0 18 18" width={18} height={18}>
            <path d={svgPaths.clock} fill="#69606D" />
          </CustomIcon>
        </button>
        <button className="bg-[#dfdce1] p-1 rounded hover:bg-[#d0cdd2]">
          <CustomIcon viewBox="0 0 18 18" width={18} height={18}>
            <path d={svgPaths.plus} fill="#69606D" />
          </CustomIcon>
        </button>
        <button className="p-1 hover:bg-black/5 rounded rotate-90">
          <Icon path={svgPaths.threeDots} size={18} fillColor="#373338" />
        </button>
      </div>
    </div>
  );
}

const GREETING_DATA: Record<ChatMode, { title: string; description: string }> = {
  default: {
    title: "Good afternoon, Alex",
    description: "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon."
  },
  research: {
    title: "Deep Research",
    description: "I can help you analyze market trends, review company filings, and synthesize complex financial data. What would you like to investigate today?"
  },
  deals: {
    title: "Deal Flow",
    description: "Reviewing the latest secondary market opportunities and private equity allocations tailored to your investment thesis. 5 new deals match your criteria."
  },
  news: {
    title: "Market Intelligence",
    description: "Breaking news and curated insights impacting your portfolio. Tech sector volatility has increased by 15% following the latest regulatory announcements."
  },
  insight: {
    title: "Community Insight",
    description: "Exclusive reports and investment memorandums shared by the community. See what top analysts are saying about the latest IPOs."
  },
  portfolio: {
    title: "My Portfolio",
    description: "Your total asset value is up 12% YTD. Key drivers include SpaceX and Stripe. Review your detailed performance analysis below."
  },
  events: {
    title: "Upcoming Events",
    description: "Register for upcoming webinars, roundtables, and exclusive member meetups. Don't miss the Q3 Strategy Session next week."
  }
};

export function WelcomeDashboard() {
  const [currentMode, setCurrentMode] = useState<ChatMode>('default');
  const [extraSlotItem, setExtraSlotItem] = useState<MoreMode | null>(null);

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
    if (mode === 'insight' || mode === 'events' || mode === 'portfolio') {
      setExtraSlotItem(mode);
    }
  };

  const content = GREETING_DATA[currentMode];

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f7f7f8]">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_46_10003)'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial_46_10003)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_46_10003' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_46_10003'%3E%3Crect width='1440' height='981' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      />

      {/* Top Actions */}
      <div className="relative z-10 w-full flex justify-end">
        <TopActions />
      </div>

      {/* Main Content Scrollable Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center p-6 gap-10 overflow-y-auto w-full">
        {currentMode === 'default' ? (
          <div className="w-full max-w-3xl mt-6">
            <HomeContent onModeChange={handleModeChange} />
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full max-w-3xl mt-10">
            <Greeting
              title={content.title}
              description={content.description}
            />
            <DashboardContent mode={currentMode} />
          </div>
        )}
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="relative z-20 w-full flex justify-center p-6 bg-gradient-to-t from-[#f7f7f8] via-[#f7f7f8]/80 to-transparent">
        <div className="w-full max-w-3xl">
          <InputBar
            currentMode={currentMode}
            extraSlotItem={extraSlotItem}
            onModeChange={handleModeChange}
          />
        </div>
      </div>
    </div>
  );
}
