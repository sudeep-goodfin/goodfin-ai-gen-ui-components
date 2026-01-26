import React, { useState } from 'react';
import { Home, FlaskConical, Gift, StickyNote, MoreHorizontal, Mic } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Y Combinator logo (orange square with Y)
const YC_LOGO = '/icons/yc-logo.png';

interface MarketingPageProps {
  onGetStarted: (initialMessage?: string) => void;
}

export function MarketingPage({ onGetStarted }: MarketingPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onGetStarted(inputValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onGetStarted(inputValue.trim());
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'research', label: 'Deep Research', icon: FlaskConical },
    { id: 'deals', label: 'Deals', icon: Gift },
    { id: 'news', label: 'News', icon: StickyNote },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#212121] overflow-hidden">
      {/* Background with golden curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient overlays for the golden curve effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 120%, rgba(180, 130, 70, 0.15) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 30% 100%, rgba(200, 150, 80, 0.1) 0%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 70% 90%, rgba(180, 130, 70, 0.08) 0%, transparent 35%)',
          }}
        />
        {/* Subtle golden line accent */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[60%] opacity-30"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(180, 130, 70, 0)" />
              <stop offset="30%" stopColor="rgba(200, 150, 80, 0.4)" />
              <stop offset="50%" stopColor="rgba(220, 170, 100, 0.6)" />
              <stop offset="70%" stopColor="rgba(200, 150, 80, 0.4)" />
              <stop offset="100%" stopColor="rgba(180, 130, 70, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M-100,400 Q200,200 500,350 T900,250 T1300,400 T1600,300"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
          />
          <path
            d="M-100,450 Q300,250 600,400 T1000,300 T1400,450 T1700,350"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-[120px] py-6 backdrop-blur-sm border-b border-white/10">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-[#f7f7f8] text-xl font-medium tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
            goodfin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-9">
          {['About', 'AI Manifesto', 'Insights', 'Community', 'Contact Us'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#f0eef0] text-[16px] font-semibold hover:text-white transition-colors"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-6 h-10 rounded-lg border border-[#685f6a] text-[#f0eef0] text-sm font-medium hover:bg-white/5 transition-colors">
            Login
          </button>
          <button
            onClick={onGetStarted}
            className="px-6 h-10 rounded-lg bg-[#29272a] text-[#f7f7f8] text-sm font-medium hover:bg-[#3d3a3e] transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32">
        {/* Goodfin GO Logo */}
        <div className="flex items-center gap-0.5 mb-12">
          <span className="text-[#9b929e] text-[28px] tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
            goodfin
          </span>
          <span
            className="text-[34px] font-bold tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #fff8e8 0%, #ffd080 40%, #ffb060 60%, #f0eef0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: 'skewX(-3deg)',
            }}
          >
            GO
          </span>
          {/* Sparkle */}
          <svg width="14" height="14" viewBox="0 0 14 14" className="ml-1 -mt-4">
            <path
              d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z"
              fill="url(#sparkleGrad)"
            />
            <defs>
              <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd080" />
                <stop offset="100%" stopColor="#ffb060" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Headline */}
        <h1
          className="text-[#f0eef0] text-[48px] font-medium text-center leading-[54px] tracking-tight uppercase mb-6"
          style={{ fontFamily: "'Signifier', Georgia, serif" }}
        >
          Your AI for<br />private markets.
        </h1>

        {/* Subheadline */}
        <p className="text-white/70 text-[18px] text-center leading-[27px] max-w-[540px] mb-12">
          GoodFin GO is the first agentic AI for pre-IPO investing—research, execute, and manage through natural conversation.
        </p>

        {/* Input Bar */}
        <div className="w-full max-w-[594px] mb-6">
          <div className="relative backdrop-blur-[60px] bg-white/5 border border-[#e9e6ea]/10 rounded-2xl p-4">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[#f7f7f8] text-[16px] placeholder-[#f7f7f8]/50 outline-none mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />

            {/* Bottom Row: Tabs and Actions */}
            <div className="flex items-center justify-between">
              {/* Mode Tabs */}
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors",
                        isActive
                          ? "bg-white/15 text-[#f0eef0]"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <Icon className="w-[11px] h-[11px]" />
                      <span style={{ fontFamily: "'Söhne', sans-serif", fontWeight: 300 }}>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                  <Mic className="w-[18px] h-[18px] text-[#9b929e]" />
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-9 h-9 rounded-2xl bg-[#eadde7]/60 flex items-center justify-center hover:bg-[#eadde7]/80 transition-colors"
                >
                  <div className="flex items-center justify-center gap-[1.5px]">
                    <div className="w-[3px] h-[4.5px] bg-white rounded-full" />
                    <div className="w-[3px] h-[10.5px] bg-white rounded-full" />
                    <div className="w-[3px] h-[7.5px] bg-white rounded-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[#f0eef0] text-sm font-medium">backed by</span>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[14px] rounded bg-[#ff6600] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">Y</span>
                </div>
                <span className="text-[#f7f7f8] text-[10px] font-medium tracking-tight">Combinator</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
