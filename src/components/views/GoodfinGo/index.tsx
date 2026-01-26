import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../Welcome02/components/layout/Header';
import { Sidebar } from '../Welcome02/components/layout/Sidebar';
import { GoodfinGoDashboard } from './GoodfinGoDashboard';
import { MarketingPage } from './MarketingPage';

export type GoodfinGoStep = 'marketing' | 'loading' | 'landing';

// Minimal Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate app loading with smooth progress
    const duration = 1800; // Total loading time
    const interval = 20; // Update interval
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out progress curve for natural feel
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(eased * 100, 100));

      if (step >= steps) {
        clearInterval(timer);
        // Start fade out
        setFadeOut(true);
        // Complete after fade animation
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f7f8] transition-opacity duration-400 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle warm gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 237, 213, 0.4) 0%, transparent 60%)',
        }}
      />

      {/* Logo */}
      <div className="relative flex items-center gap-0.5 mb-8">
        <span className="text-[#69606d] text-[24px] tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
          goodfin
        </span>
        <span
          className="text-[28px] font-bold tracking-tight"
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            background: 'linear-gradient(135deg, #ffd4a8 0%, #ff954a 50%, #e8a060 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: 'skewX(-2deg)',
          }}
        >
          GO
        </span>
      </div>

      {/* Minimal progress indicator */}
      <div className="w-32 h-[2px] bg-[#e6e4e7] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ffcfa8] to-[#ff954a] rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle loading text */}
      <p className="mt-4 text-[12px] text-[#a09a9f] tracking-wide">
        Loading
      </p>
    </div>
  );
}

// Generate a unique conversation ID
function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// URL parameter helpers
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

type GoodfinGoProps = {
  showChrome?: boolean;
  step?: GoodfinGoStep;
  onStepChange?: (step: GoodfinGoStep) => void;
};

export function GoodfinGo({
  showChrome = true,
  step: externalStep,
  onStepChange,
}: GoodfinGoProps) {
  // Internal step state (used if not controlled externally)
  const [internalStep, setInternalStep] = useState<GoodfinGoStep>(() => externalStep ?? 'marketing');

  // Sync internal state with external step when it changes
  useEffect(() => {
    if (externalStep !== undefined && externalStep !== internalStep) {
      setInternalStep(externalStep);
    }
  }, [externalStep]);

  // Use internal step for rendering
  const currentStep = internalStep;

  // Handle step changes
  const setCurrentStep = useCallback((newStep: GoodfinGoStep) => {
    setInternalStep(newStep);
    onStepChange?.(newStep);
  }, [onStepChange]);

  // Conversation state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState('');
  const [conversationActiveTab, setConversationActiveTab] = useState<string | null>('goodfin-ai');
  const [isInConversation, setIsInConversation] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

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

    // Remove from URL
    updateUrlParams({
      conversation: undefined,
      activeTab: undefined,
    });
  }, []);

  // Handle back button click
  const handleBack = useCallback(() => {
    if (currentStep === 'landing') {
      setCurrentStep('marketing');
    } else {
      endConversation();
    }
  }, [currentStep, endConversation, setCurrentStep]);

  // Navigate from marketing to landing (app) page - with loading transition
  const handleGetStarted = useCallback((message?: string) => {
    if (message) {
      setInitialMessage(message);
    }
    // Show loading screen first
    setCurrentStep('loading');
  }, [setCurrentStep]);

  // Handle loading complete - transition to landing
  const handleLoadingComplete = useCallback(() => {
    setCurrentStep('landing');
  }, [setCurrentStep]);

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

  // Marketing page - no chrome (full landing page experience)
  if (currentStep === 'marketing') {
    return <MarketingPage onGetStarted={handleGetStarted} />;
  }

  // Loading screen - transition state
  if (currentStep === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Landing page (app experience) - with optional chrome
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
        <GoodfinGoDashboard
          isInConversation={isInConversation}
          onStartConversation={startConversation}
          onEndConversation={endConversation}
          onUpdateConversationTitle={updateConversationTitle}
          onRequestBack={handleBack}
          initialMessage={initialMessage}
          onInitialMessageConsumed={() => setInitialMessage(null)}
        />
      </div>
    </div>
  );
}

// Export variants for the flow
export const goodfinGoVariants = [
  { id: 'marketing', label: 'Marketing Page' },
  { id: 'loading', label: 'Loading Screen' },
  { id: 'landing', label: 'Landing Page' },
];

// Export subcomponents
export { GoodfinGoDashboard } from './GoodfinGoDashboard';
export { MarketingPage } from './MarketingPage';
