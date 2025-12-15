import React, { useState } from 'react';
import { Briefcase, Clock, Users } from 'lucide-react';
import { colors } from '../Onboarding/designTokens';
import { cn } from '../../../lib/utils';
import {
  HeroSection,
  LastViewedDealsSection,
  PortfolioChartSection,
  EventsSection,
  CommunityInsightsSection,
} from './sections';
import {
  getTimeGreeting,
  mockDealCards,
  mockEventCards,
  communityTopics,
  mockPortfolioChart,
} from './mockData';

// Mobile tab type
type MobileTab = 'portfolio' | 'recent-activity' | 'community';

// Mobile tab configuration
const mobileTabs: { id: MobileTab; label: string; icon: React.ElementType }[] = [
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'recent-activity', label: 'Recent Activity', icon: Clock },
  { id: 'community', label: 'Community', icon: Users },
];

// Variant type definition
export type WelcomeScreenVariant =
  | 'first-time'
  | 'returning'
  | 'invested'
  | 'coffee-chat'
  | 'upcoming-events'
  | 'active-engaged';

// Variants array for ComponentShowcase
export const welcomeScreenVariants = [
  { id: 'first-time', label: 'First-time' },
  { id: 'returning', label: 'Returning' },
  { id: 'invested', label: 'Invested' },
  { id: 'coffee-chat', label: 'Coffee Chat' },
  { id: 'upcoming-events', label: 'Events' },
  { id: 'active-engaged', label: 'Active' },
];

type WelcomeScreenViewProps = {
  variant?: WelcomeScreenVariant;
};

// Mock data matching Figma design
const mockData = {
  user: {
    firstName: 'Alex',
  },
  portfolio: {
    totalValue: 1946160,
    percentageChange: 12.4,
    gainAmount: 154000,
  },
  priorityAllocations: 3,
  suggestions: [
    { text: 'What does the 20% carry mean? How is it charged?' },
    { text: 'What is accreditation and how do I qualify?' },
    { text: 'Learn more about GoodFin' },
    { text: 'Show more...' },
  ],
  resumeDeal: {
    name: 'SpaceX',
    description: 'Leading the future of space exploration. Series F allocation available with updated valuation cap.',
    lastViewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
};

/**
 * WelcomeScreenView
 *
 * Redesigned welcome screen for accredited investors.
 * Two-column layout with main content on left and sidebar on right.
 * Matches Figma design.
 */
export function WelcomeScreenView({
  variant = 'active-engaged',
}: WelcomeScreenViewProps) {
  // Mobile tab state
  const [activeTab, setActiveTab] = useState<MobileTab>('portfolio');

  // Generate greeting based on time and user
  const greeting = {
    headline: `${getTimeGreeting()}, ${mockData.user.firstName}`,
    subheadline: `Your portfolio increased by $${(mockData.portfolio.gainAmount / 1000).toFixed(0)}k (+${mockData.portfolio.percentageChange}%) this month, primarily driven by secondary market activity in SpaceX. You have ${mockData.priorityAllocations} priority allocations expiring soon.`,
  };

  // Handlers
  const handleSuggestionClick = (text: string) => {
    console.log('Suggestion clicked:', text);
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };

  const handleResumeDeal = () => {
    console.log('Resume deal clicked:', mockData.resumeDeal.name);
  };

  const handleViewAllDeals = () => {
    console.log('View all deals clicked');
  };

  const handleDealClick = (dealId: string) => {
    console.log('Deal clicked:', dealId);
  };

  const handleAskAI = (dealId: string) => {
    console.log('Ask AI clicked for deal:', dealId);
  };

  const handleViewAllEvents = () => {
    console.log('View all events clicked');
  };

  const handleEventClick = (eventId: string) => {
    console.log('Event clicked:', eventId);
  };

  const handleJoinConversation = () => {
    console.log('Join conversation clicked');
  };

  const handleSummarize = () => {
    console.log('Summarize clicked');
  };

  // Render mobile tab content
  const renderMobileTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <PortfolioChartSection
            totalValue={mockPortfolioChart.totalValue}
            percentageChange={mockPortfolioChart.percentageChange}
            amountInvested={mockPortfolioChart.amountInvested}
            returns={mockPortfolioChart.returns}
            lastUpdated={mockPortfolioChart.lastUpdated}
            chartData={mockPortfolioChart.chartData}
            onViewAllDeals={handleViewAllDeals}
          />
        );
      case 'recent-activity':
        return (
          <LastViewedDealsSection
            resumeDeal={mockData.resumeDeal}
            deals={mockDealCards}
            onResumeDeal={handleResumeDeal}
            onViewAllDeals={handleViewAllDeals}
            onDealClick={handleDealClick}
            onAskAI={handleAskAI}
          />
        );
      case 'community':
        return (
          <div className="space-y-6">
            <EventsSection
              events={mockEventCards}
              onViewAllEvents={handleViewAllEvents}
              onEventClick={handleEventClick}
            />
            <CommunityInsightsSection
              topics={communityTopics}
              onJoinConversation={handleJoinConversation}
              onSummarize={handleSummarize}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.grey[100] }}
    >
      {/* Main Content Container */}
      <div className="max-w-[1800px] mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden px-4 pt-6 pb-8">
          {/* Hero Section with Gradient */}
          <HeroSection
            greeting={greeting}
            suggestions={mockData.suggestions}
            onSuggestionClick={handleSuggestionClick}
            onSendMessage={handleSendMessage}
            className="mb-6"
          />

          {/* Mobile Tabs */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ backgroundColor: colors.grey[200] }}
          >
            {mobileTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all duration-200',
                    isActive ? 'shadow-sm' : ''
                  )}
                  style={{
                    backgroundColor: isActive ? colors.white : 'transparent',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isActive ? colors.grey[900] : colors.grey[500] }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: isActive ? colors.grey[900] : colors.grey[500],
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Tab Content */}
          <div className="animate-in fade-in duration-200">
            {renderMobileTabContent()}
          </div>
        </div>

        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:flex flex-row">
          {/* Left Column - Main Content (~60%) */}
          <div className="flex-1 lg:max-w-[1000px] px-6 pt-8 pb-12">
            {/* Hero Section with Gradient */}
            <HeroSection
              greeting={greeting}
              suggestions={mockData.suggestions}
              onSuggestionClick={handleSuggestionClick}
              onSendMessage={handleSendMessage}
              className="mb-10"
            />

            {/* Last Viewed Deals Section */}
            <LastViewedDealsSection
              resumeDeal={mockData.resumeDeal}
              deals={mockDealCards}
              onResumeDeal={handleResumeDeal}
              onViewAllDeals={handleViewAllDeals}
              onDealClick={handleDealClick}
              onAskAI={handleAskAI}
              className="mb-10"
            />

            {/* Portfolio Chart Section */}
            <PortfolioChartSection
              totalValue={mockPortfolioChart.totalValue}
              percentageChange={mockPortfolioChart.percentageChange}
              amountInvested={mockPortfolioChart.amountInvested}
              returns={mockPortfolioChart.returns}
              lastUpdated={mockPortfolioChart.lastUpdated}
              chartData={mockPortfolioChart.chartData}
              onViewAllDeals={handleViewAllDeals}
            />
          </div>

          {/* Right Column - Sidebar (~40%) */}
          <div
            className="lg:w-[800px] p-6 pt-8"
            style={{ backgroundColor: colors.grey[200] }}
          >
            {/* Events Section */}
            <EventsSection
              events={mockEventCards}
              onViewAllEvents={handleViewAllEvents}
              onEventClick={handleEventClick}
              className="mb-12"
            />

            {/* Community Insights Section - comments auto-filter by selected topic */}
            <CommunityInsightsSection
              topics={communityTopics}
              onJoinConversation={handleJoinConversation}
              onSummarize={handleSummarize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Content-only export for embedding in other layouts
export function WelcomeScreenContent({
  variant = 'active-engaged',
}: WelcomeScreenViewProps) {
  const greeting = {
    headline: `${getTimeGreeting()}, ${mockData.user.firstName}`,
    subheadline: `Your portfolio increased by $${(mockData.portfolio.gainAmount / 1000).toFixed(0)}k (+${mockData.portfolio.percentageChange}%) this month, primarily driven by secondary market activity in SpaceX. You have ${mockData.priorityAllocations} priority allocations expiring soon.`,
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Column */}
      <div className="flex-1 lg:max-w-[1000px] p-4 space-y-6">
        <HeroSection
          greeting={greeting}
          suggestions={mockData.suggestions}
        />

        <LastViewedDealsSection
          resumeDeal={mockData.resumeDeal}
          deals={mockDealCards}
        />

        <PortfolioChartSection
          totalValue={mockPortfolioChart.totalValue}
          percentageChange={mockPortfolioChart.percentageChange}
          amountInvested={mockPortfolioChart.amountInvested}
          returns={mockPortfolioChart.returns}
          lastUpdated={mockPortfolioChart.lastUpdated}
          chartData={mockPortfolioChart.chartData}
        />
      </div>

      {/* Right Column */}
      <div
        className="lg:w-[800px] p-4 space-y-6"
        style={{ backgroundColor: colors.grey[200] }}
      >
        <EventsSection events={mockEventCards} />
        <CommunityInsightsSection
          topics={communityTopics}
        />
      </div>
    </div>
  );
}

export default WelcomeScreenView;

// Re-export types and data for external use
export type { WelcomeScreenVariant };
export { getTimeGreeting };

// Re-export old data structures for backwards compatibility
export { VARIANT_DATA } from './mockData';
