import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Check, Sparkles } from 'lucide-react';
import { cn } from '../../../../../lib/utils';

// Types
interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  insights?: ExtractedInsight[];
}

interface ExtractedInsight {
  label: string;
  value: string;
  icon?: string;
}

interface ExtractedProfile {
  age?: string;
  employment?: string;
  recentEvent?: string;
  investmentAmount?: string;
  riskTolerance?: string;
  sectors?: string[];
  accredited?: boolean;
  timeHorizon?: string;
}

type ConversationPhase = 'greeting' | 'listening' | 'confirming' | 'followup' | 'complete';

// Mock profile extraction from user input
function extractProfileFromText(text: string): ExtractedProfile {
  const profile: ExtractedProfile = {};
  const lowerText = text.toLowerCase();

  // Age extraction
  if (lowerText.includes('30') || lowerText.includes('thirty') || lowerText.includes('mid-30') || lowerText.includes('mid 30')) {
    profile.age = 'mid-30s';
  } else if (lowerText.includes('40') || lowerText.includes('forty') || lowerText.includes('mid-40')) {
    profile.age = 'mid-40s';
  } else if (lowerText.includes('20') || lowerText.includes('twenty')) {
    profile.age = '20s';
  } else if (lowerText.includes('50') || lowerText.includes('fifty')) {
    profile.age = '50s';
  }

  // Employment/background extraction
  if (lowerText.includes('founder') || lowerText.includes('started') || lowerText.includes('my company')) {
    profile.employment = 'founder';
  } else if (lowerText.includes('engineer') || lowerText.includes('developer') || lowerText.includes('tech')) {
    profile.employment = 'tech professional';
  } else if (lowerText.includes('doctor') || lowerText.includes('medical') || lowerText.includes('healthcare')) {
    profile.employment = 'healthcare professional';
  } else if (lowerText.includes('finance') || lowerText.includes('banker') || lowerText.includes('investor')) {
    profile.employment = 'finance professional';
  }

  // Recent events
  if (lowerText.includes('sold') || lowerText.includes('exit') || lowerText.includes('acquisition') || lowerText.includes('ipo')) {
    profile.recentEvent = 'recent exit';
  } else if (lowerText.includes('inheritance') || lowerText.includes('inherited')) {
    profile.recentEvent = 'inheritance';
  } else if (lowerText.includes('bonus') || lowerText.includes('windfall')) {
    profile.recentEvent = 'liquidity event';
  }

  // Investment amount
  if (lowerText.includes('250k') || lowerText.includes('250,000') || lowerText.includes('250000') || lowerText.includes('quarter million')) {
    profile.investmentAmount = '~$250K';
  } else if (lowerText.includes('500k') || lowerText.includes('500,000') || lowerText.includes('half million')) {
    profile.investmentAmount = '~$500K';
  } else if (lowerText.includes('100k') || lowerText.includes('100,000')) {
    profile.investmentAmount = '~$100K';
  } else if (lowerText.includes('1m') || lowerText.includes('1 million') || lowerText.includes('million')) {
    profile.investmentAmount = '$1M+';
  }

  // Risk tolerance
  if (lowerText.includes('conservative') || lowerText.includes('safe') || lowerText.includes('low risk')) {
    profile.riskTolerance = 'conservative';
  } else if (lowerText.includes('aggressive') || lowerText.includes('high risk') || lowerText.includes('risky')) {
    profile.riskTolerance = 'aggressive';
  } else if (lowerText.includes('moderate') || lowerText.includes('balanced') || lowerText.includes('middle') || lowerText.includes('not too risky') || lowerText.includes('not reckless')) {
    profile.riskTolerance = 'moderate';
  }

  // Sectors
  const sectors: string[] = [];
  if (lowerText.includes('ai') || lowerText.includes('artificial intelligence') || lowerText.includes('machine learning')) {
    sectors.push('AI');
  }
  if (lowerText.includes('climate') || lowerText.includes('clean energy') || lowerText.includes('sustainability') || lowerText.includes('green')) {
    sectors.push('Climate Tech');
  }
  if (lowerText.includes('space') || lowerText.includes('aerospace')) {
    sectors.push('Space Tech');
  }
  if (lowerText.includes('health') || lowerText.includes('biotech') || lowerText.includes('medical')) {
    sectors.push('Healthcare');
  }
  if (lowerText.includes('fintech') || lowerText.includes('financial')) {
    sectors.push('Fintech');
  }
  if (lowerText.includes('crypto') || lowerText.includes('blockchain') || lowerText.includes('web3')) {
    sectors.push('Crypto/Web3');
  }
  if (sectors.length > 0) {
    profile.sectors = sectors;
  }

  // Time horizon
  if (lowerText.includes('long term') || lowerText.includes('10 year') || lowerText.includes('decade') || lowerText.includes('have time')) {
    profile.timeHorizon = 'long-term (7+ years)';
  } else if (lowerText.includes('short term') || lowerText.includes('few years') || lowerText.includes('2-3 years')) {
    profile.timeHorizon = 'short-term (1-3 years)';
  }

  return profile;
}

// Generate insights from profile
function generateInsights(profile: ExtractedProfile): ExtractedInsight[] {
  const insights: ExtractedInsight[] = [];

  if (profile.employment) {
    const eventText = profile.recentEvent ? ` with ${profile.recentEvent}` : '';
    insights.push({ label: 'Background', value: `${profile.employment}${eventText}`, icon: '👤' });
  }

  if (profile.age) {
    insights.push({ label: 'Age', value: profile.age, icon: '📅' });
  }

  if (profile.investmentAmount) {
    insights.push({ label: 'Looking to invest', value: profile.investmentAmount, icon: '💰' });
  }

  if (profile.riskTolerance) {
    insights.push({ label: 'Risk tolerance', value: profile.riskTolerance, icon: '📊' });
  }

  if (profile.sectors && profile.sectors.length > 0) {
    insights.push({ label: 'Interested in', value: profile.sectors.join(', '), icon: '🎯' });
  }

  if (profile.timeHorizon) {
    insights.push({ label: 'Time horizon', value: profile.timeHorizon, icon: '⏳' });
  }

  return insights;
}

// Check what's missing from profile
function getMissingFields(profile: ExtractedProfile): string[] {
  const missing: string[] = [];
  if (!profile.accredited) missing.push('accredited');
  return missing;
}

interface ConversationalOnboardingProps {
  animationKey?: number;
  onComplete?: () => void;
}

export function ConversationalOnboarding({ animationKey = 0, onComplete }: ConversationalOnboardingProps) {
  const [phase, setPhase] = useState<ConversationPhase>('greeting');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [extractedProfile, setExtractedProfile] = useState<ExtractedProfile>({});
  const [showGreetingAnimation, setShowGreetingAnimation] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting message
  const greetingMessage = `Hi! I'm here to help find the right investment opportunities for you.

Tell me a bit about yourself - your background, what you're looking to achieve, and any preferences you have. Feel free to share as much or as little as you'd like.`;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset on animation key change
  useEffect(() => {
    setPhase('greeting');
    setMessages([]);
    setInputValue('');
    setExtractedProfile({});
    setShowGreetingAnimation(true);

    // Show greeting after animation
    const timer = setTimeout(() => {
      setShowGreetingAnimation(false);
      setMessages([{
        id: '1',
        role: 'ai',
        content: greetingMessage,
        timestamp: new Date()
      }]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [animationKey]);

  // Handle user submission
  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Process based on current phase
    if (phase === 'greeting' || phase === 'listening') {
      // Extract profile from user input
      const profile = extractProfileFromText(userMessage.content);
      const mergedProfile = { ...extractedProfile, ...profile };
      setExtractedProfile(mergedProfile);

      // Generate AI response with insights
      setTimeout(() => {
        const insights = generateInsights(mergedProfile);
        const missing = getMissingFields(mergedProfile);

        let responseContent = '';

        if (insights.length > 0) {
          responseContent = `Great to meet you! Here's what I gathered:`;

          // Check if we need to ask about accreditation
          if (missing.includes('accredited')) {
            responseContent += `\n\nOne quick question - are you an accredited investor? This helps us show you the right opportunities.`;
            setPhase('followup');
          } else {
            responseContent += `\n\nLooks like we have everything we need! Let me show you some deals that match your profile...`;
            setPhase('complete');
          }
        } else {
          responseContent = `Thanks for sharing! Could you tell me a bit more about what you're looking for in terms of investments? For example, your investment goals, risk tolerance, or sectors you're interested in.`;
          setPhase('listening');
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: responseContent,
          timestamp: new Date(),
          insights: insights.length > 0 ? insights : undefined
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);

    } else if (phase === 'followup') {
      // Handle accreditation answer
      const lowerInput = userMessage.content.toLowerCase();
      const isAccredited = lowerInput.includes('yes') || lowerInput.includes('yeah') || lowerInput.includes('yep') || lowerInput.includes('am');

      setExtractedProfile(prev => ({ ...prev, accredited: isAccredited }));

      setTimeout(() => {
        const responseContent = isAccredited
          ? `Perfect! Based on your profile, I can see some great opportunities that match your interests. Let me personalize your dashboard...`
          : `No problem! We have some excellent opportunities for non-accredited investors as well. Let me set up your personalized experience...`;

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: responseContent,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setPhase('complete');

        // Trigger completion after a delay
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      }, 1000);
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Toggle recording (mock)
  const handleRecordToggle = () => {
    if (isRecording) {
      // Stop recording - simulate transcription
      setIsRecording(false);
      // In real implementation, this would process the audio
      setInputValue(prev => prev || "I'm a 35-year-old founder, just sold my company last year. Looking to put some of that into alternatives - interested in AI companies and climate tech. I'd say moderate risk, I have time but don't want to be reckless. Probably looking to invest $250k to start.");
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Greeting Animation */}
          {showGreetingAnimation && (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0eef0] to-[#e6e4e7] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#7f7582]" />
                </div>
                <span className="text-[#7f7582] text-sm font-['Soehne_Kraftig',sans-serif]">
                  Starting your personalized onboarding...
                </span>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'ai' ? (
                <AIMessage message={message} />
              ) : (
                <UserMessage message={message} />
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#48424a] to-[#29272a] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-[#e6e4e7]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#a09a9f] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#a09a9f] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#a09a9f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {phase !== 'complete' && !showGreetingAnimation && (
        <div className="border-t border-[#e6e4e7] bg-white/80 backdrop-blur-sm px-6 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-end gap-3">
              {/* Voice Button */}
              <button
                onClick={handleRecordToggle}
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  isRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-[#f0eef0] text-[#7f7582] hover:bg-[#e6e4e7]"
                )}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isRecording ? "Listening..." : "Type or use voice to share about yourself..."}
                  rows={1}
                  className={cn(
                    "w-full resize-none rounded-2xl border border-[#e6e4e7] bg-white px-4 py-3 pr-12",
                    "text-[#29272a] placeholder:text-[#a09a9f]",
                    "focus:outline-none focus:ring-2 focus:ring-[#48424a]/20 focus:border-[#48424a]",
                    "font-['Soehne',sans-serif] text-[15px]",
                    isRecording && "opacity-50"
                  )}
                  disabled={isRecording}
                  style={{
                    minHeight: '48px',
                    maxHeight: '120px'
                  }}
                />

                {/* Send Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isRecording}
                  className={cn(
                    "absolute right-2 bottom-2 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    inputValue.trim()
                      ? "bg-[#29272a] text-white hover:bg-[#48424a]"
                      : "bg-[#e6e4e7] text-[#a09a9f]"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recording indicator */}
            {isRecording && (
              <div className="mt-3 flex items-center justify-center gap-2 text-red-500 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span>Recording... Click the mic button when done</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion State */}
      {phase === 'complete' && (
        <div className="border-t border-[#e6e4e7] bg-gradient-to-t from-[#f7f7f8] to-white px-6 py-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              <span>Profile complete! Loading your personalized dashboard...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// AI Message Component
function AIMessage({ message }: { message: Message }) {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#48424a] to-[#29272a] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-[#e6e4e7]">
          <p className="text-[#29272a] text-[15px] font-['Soehne',sans-serif] whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Insights Card */}
        {message.insights && message.insights.length > 0 && (
          <div className="bg-white rounded-xl border border-[#e6e4e7] p-4 shadow-sm">
            <div className="space-y-2">
              {message.insights.map((insight, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1">
                  <span className="text-lg">{insight.icon || '✓'}</span>
                  <span className="text-[13px] text-[#7f7582] font-['Soehne',sans-serif]">{insight.label}:</span>
                  <span className="text-[13px] text-[#29272a] font-['Soehne_Kraftig',sans-serif]">{insight.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// User Message Component
function UserMessage({ message }: { message: Message }) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="bg-[#29272a] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
        <p className="text-[15px] font-['Soehne',sans-serif] whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default ConversationalOnboarding;
