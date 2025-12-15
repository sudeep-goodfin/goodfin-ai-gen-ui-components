import React from 'react';
import { colors } from '../Onboarding/designTokens';
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

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.grey[100] }}
    >
      {/* Main Content Container */}
      <div className="max-w-[1800px] mx-auto">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row">
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
