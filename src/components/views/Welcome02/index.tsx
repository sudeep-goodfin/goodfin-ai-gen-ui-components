import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { WelcomeDashboard } from './components/dashboard/WelcomeDashboard';

export type Welcome02Variant = 'default';

export function Welcome02() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f0eef0] overflow-hidden font-sans text-[#373338]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <WelcomeDashboard />
      </div>
    </div>
  );
}

// Export subcomponents for flexibility
export { Header } from './components/layout/Header';
export { Sidebar } from './components/layout/Sidebar';
export { WelcomeDashboard } from './components/dashboard/WelcomeDashboard';
export { InputBar } from './components/dashboard/InputBar';
export { HomeContent } from './components/dashboard/HomeContent';
export { DashboardContent, SuggestionCard, SUGGESTIONS_DATA } from './components/dashboard/DashboardContent';
export { Greeting } from './components/dashboard/Greeting';
export { ProgressWidget, ProgressCircle } from './components/dashboard/ProgressWidget';
export type { ChatMode, MoreMode } from './components/dashboard/InputBar';
