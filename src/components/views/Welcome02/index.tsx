import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { WelcomeDashboard, type HomeVariant } from './components/dashboard/WelcomeDashboard';
import { ExitConversationModal } from './components/modals/ExitConversationModal';

export type Welcome02Variant = 'default';

// Storage key for "don't ask again" preference
const DONT_ASK_AGAIN_KEY = 'goodfin_exit_conversation_dont_ask';

// Generate a unique conversation ID
function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// URL parameter helpers
const getUrlParams = () => new URLSearchParams(window.location.search);

const updateUrlParams = (params: Record<string, string | undefined>) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.replaceState({}, '', url.toString());
};

type Welcome02Props = {
  showChrome?: boolean;
  homeVariant?: HomeVariant;
  isFirstTimeUser?: boolean;
  isConversationalOnboarding?: boolean;
  animationKey?: number;
};

export function Welcome02({
  showChrome = true,
  homeVariant = 'v1',
  isFirstTimeUser = false,
  isConversationalOnboarding = false,
  animationKey = 0,
}: Welcome02Props) {
  // Conversation state - Note: we don't restore from URL since we don't have message history
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationActiveTab, setConversationActiveTab] = useState<string | null>('goodfin-ai');
  const [isInConversation, setIsInConversation] = useState(false);

  // Modal state
  const [showExitModal, setShowExitModal] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(DONT_ASK_AGAIN_KEY) === 'true';
    }
    return false;
  });

  // Start a new conversation
  const startConversation = useCallback((initialMessage: string, tab: string = 'goodfin-ai') => {
    const newId = generateConversationId();
    setConversationId(newId);
    setIsInConversation(true);
    setConversationActiveTab(tab);

    // Derive title from message
    const title = initialMessage.length > 40 ? initialMessage.slice(0, 40) + '...' : initialMessage;
    setConversationTitle(title || 'New Conversation');

    // Update URL
    updateUrlParams({
      conversation: newId,
      activeTab: tab,
    });
  }, []);

  // End conversation
  const endConversation = useCallback(() => {
    setConversationId(null);
    setIsInConversation(false);
    setConversationTitle('');
    setConversationActiveTab(null);
    setShowExitModal(false);

    // Remove from URL
    updateUrlParams({
      conversation: undefined,
      activeTab: undefined,
    });
  }, []);

  // Handle back button click
  const handleBack = useCallback(() => {
    if (dontAskAgain) {
      endConversation();
    } else {
      setShowExitModal(true);
    }
  }, [dontAskAgain, endConversation]);

  // Handle modal confirm
  const handleModalConfirm = useCallback(() => {
    endConversation();
  }, [endConversation]);

  // Handle modal cancel
  const handleModalCancel = useCallback(() => {
    setShowExitModal(false);
  }, []);

  // Handle "don't ask again"
  const handleDontAskAgain = useCallback((value: boolean) => {
    setDontAskAgain(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DONT_ASK_AGAIN_KEY, String(value));
    }
  }, []);

  // Update conversation title
  const updateConversationTitle = useCallback((title: string) => {
    setConversationTitle(title);
  }, []);

  // Sync URL when conversation state changes
  useEffect(() => {
    if (isInConversation && conversationId) {
      updateUrlParams({
        conversation: conversationId,
        activeTab: conversationActiveTab || undefined,
      });
    }
  }, [isInConversation, conversationId, conversationActiveTab]);

  return (
    <div className="flex flex-col h-full w-full bg-[#f0eef0] overflow-hidden font-sans text-[#373338]">
      {showChrome && (
        <Header
          isInConversation={isInConversation}
          conversationTitle={conversationTitle}
          activeTab={conversationActiveTab}
          onBack={handleBack}
        />
      )}
      <div className="flex flex-1 overflow-hidden">
        {showChrome && (
          <Sidebar
            isInConversation={isInConversation}
            conversationActiveTab={conversationActiveTab}
          />
        )}
        <WelcomeDashboard
          homeVariant={homeVariant}
          isFirstTimeUser={isFirstTimeUser}
          isConversationalOnboarding={isConversationalOnboarding}
          animationKey={animationKey}
          isInConversation={isInConversation}
          onStartConversation={startConversation}
          onEndConversation={endConversation}
          onUpdateConversationTitle={updateConversationTitle}
          onRequestBack={handleBack}
        />
      </div>

      {/* Exit Conversation Modal */}
      <ExitConversationModal
        isOpen={showExitModal}
        conversationTitle={conversationTitle}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        onDontAskAgain={handleDontAskAgain}
      />
    </div>
  );
}

// Export subcomponents for flexibility
export { Header } from './components/layout/Header';
export { Sidebar } from './components/layout/Sidebar';
export type { SidebarNavItem } from './components/layout/Sidebar';
export { WelcomeDashboard } from './components/dashboard/WelcomeDashboard';
export type { HomeVariant } from './components/dashboard/WelcomeDashboard';
export { InputBar, InputBarV01, InputBarV02 } from './components/dashboard/InputBar';
export { HomeContent } from './components/dashboard/HomeContent';
export { HomeContentV2 } from './components/dashboard/HomeContentV2';
export { DashboardContent, SuggestionCard, SUGGESTIONS_DATA } from './components/dashboard/DashboardContent';
export { Greeting } from './components/dashboard/Greeting';
export { ResumeInvestmentCard } from './components/dashboard/ResumeInvestmentCard';
export { ExploreGoodfin } from './components/dashboard/ExploreGoodfin';
export { ProgressWidget } from './components/dashboard/ProgressWidget';
export { ProgressCircle, CommunityIcon } from './components/dashboard/icons';
export { NewsContent } from './components/dashboard/NewsContent';
export { EventsContent, EventCard, EVENTS_DATA } from './components/dashboard/EventsContent';
export type { ChatMode, MoreMode, InputBarVersion } from './components/dashboard/InputBar';
export type { EventCardProps } from './components/dashboard/EventsContent';
