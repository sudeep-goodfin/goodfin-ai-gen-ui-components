import { useState } from 'react';
import { Header } from '../Welcome02/components/layout/Header';
import { Sidebar, type SidebarNavItem } from '../Welcome02/components/layout/Sidebar';
import { CompanyHeader } from './components/CompanyHeader';
import { TabNavigation } from './components/TabNavigation';
import { InvestorTicker } from './components/InvestorTicker';
import { InvestmentPanel } from './components/InvestmentPanel';
import { RippleAnimation } from './components/RippleAnimation';
import { InvestmentFlow } from '../InvestmentFlow';
import {
  ANTHROPIC_DATA,
  SAMPLE_POSTS,
  INVESTMENT_SIGNAL,
  COMMUNITY_SENTIMENT,
  TABS,
  type TabId,
} from './types';

// Re-export types
export type { Company, InvestorPost, TabId } from './types';
export { ANTHROPIC_DATA, SAMPLE_POSTS } from './types';

interface DealProductPageProps {
  onStartInvestment?: () => void;
  onNavigate?: (item: SidebarNavItem) => void;
}

export function DealProductPage({ onStartInvestment, onNavigate }: DealProductPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('investor-ticker');
  const [showInvestmentFlow, setShowInvestmentFlow] = useState(false);

  const handleStartInvestment = () => {
    setShowInvestmentFlow(true);
    onStartInvestment?.();
  };

  const handleSidebarNavigate = (item: SidebarNavItem) => {
    onNavigate?.(item);
  };

  // If we're showing the investment flow, render it
  if (showInvestmentFlow) {
    return (
      <InvestmentFlow
        investmentAmount={10000}
        company={{
          name: ANTHROPIC_DATA.name,
          logo: ANTHROPIC_DATA.logo,
          description: ANTHROPIC_DATA.description,
          type: 'Pre-IPO Company',
        }}
        onDismiss={() => setShowInvestmentFlow(false)}
        onComplete={() => {
          console.log('Investment completed!');
          setShowInvestmentFlow(false);
        }}
      />
    );
  }

  return (
    <div className="h-screen w-full bg-[#edebee] flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar activeItem="deals" onNavigate={handleSidebarNavigate} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[864px] pb-6 pl-9 pr-4">
            {/* Company Header with ripple background effect */}
            <div className="relative overflow-hidden">
              {/* Ripple animation background */}
              <div className="absolute inset-0 -top-20 flex items-center justify-center">
                <RippleAnimation className="w-[400px] h-[400px] opacity-40" />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#edebee]" />
              <CompanyHeader company={ANTHROPIC_DATA} className="relative z-10" />
            </div>

            {/* Tabs and Content */}
            <div className="flex flex-col gap-6 pt-4">
              <TabNavigation
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab content */}
              {activeTab === 'investor-ticker' && (
                <InvestorTicker posts={SAMPLE_POSTS} />
              )}

              {activeTab === 'highlights' && (
                <div className="text-sm text-[#7f7582] py-8 text-center">
                  Highlights content coming soon...
                </div>
              )}

              {activeTab === 'key-details' && (
                <div className="text-sm text-[#7f7582] py-8 text-center">
                  Key Details content coming soon...
                </div>
              )}

              {activeTab === 'news' && (
                <div className="text-sm text-[#7f7582] py-8 text-center">
                  News content coming soon...
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Investment Panel */}
        <aside className="w-[280px] flex-shrink-0">
          <InvestmentPanel
            currentlyInvested={10000}
            investmentSignal={INVESTMENT_SIGNAL}
            communitySentiment={COMMUNITY_SENTIMENT}
            overallRating={4.2}
            onStartInvestment={handleStartInvestment}
          />
        </aside>
      </div>
    </div>
  );
}

// For showcase/demo purposes
export function DealProductPageView() {
  return <DealProductPage />;
}

// Legacy export for backwards compatibility
export const InvestmentEntry = DealProductPage;
export const InvestmentEntryView = DealProductPageView;

export default DealProductPage;
