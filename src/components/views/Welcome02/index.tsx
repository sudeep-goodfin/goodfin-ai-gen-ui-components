import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { WelcomeDashboard } from './components/dashboard/WelcomeDashboard';

export type Welcome02Variant = 'default';

type Welcome02Props = {
  showChrome?: boolean;
};

export function Welcome02({ showChrome = true }: Welcome02Props) {
  return (
    <div className="flex flex-col h-full w-full bg-[#f0eef0] overflow-hidden font-sans text-[#373338]">
      {showChrome && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {showChrome && <Sidebar />}
        <WelcomeDashboard />
      </div>
    </div>
  );
}

// Export subcomponents for flexibility
export { Header } from './components/layout/Header';
export { Sidebar } from './components/layout/Sidebar';
export type { SidebarNavItem } from './components/layout/Sidebar';
export { WelcomeDashboard } from './components/dashboard/WelcomeDashboard';
export { InputBar, InputBarV01, InputBarV02 } from './components/dashboard/InputBar';
export { HomeContent } from './components/dashboard/HomeContent';
export { DashboardContent, SuggestionCard, SUGGESTIONS_DATA } from './components/dashboard/DashboardContent';
export { Greeting } from './components/dashboard/Greeting';
export { ProgressWidget } from './components/dashboard/ProgressWidget';
export { ProgressCircle, CommunityIcon } from './components/dashboard/icons';
export { NewsContent } from './components/dashboard/NewsContent';
export { EventsContent, EventCard, EVENTS_DATA } from './components/dashboard/EventsContent';
export type { ChatMode, MoreMode, InputBarVersion } from './components/dashboard/InputBar';
export type { EventCardProps } from './components/dashboard/EventsContent';
