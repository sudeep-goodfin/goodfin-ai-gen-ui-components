import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Send, Mic, X, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';
import { AnimatedWordText } from '../AIGreeting/AnimatedWordText';
import { ThinkingText } from '../AIGreeting/ThinkingText';
import { OnboardingUserData } from './index';

// Deep Research Analyst SVG Icon
function DeepResearchIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.09091 1.86601C7.82928 2.00677 6.61769 2.43913 5.55199 3.12891C4.48628 3.81869 3.59568 4.74696 2.95061 5.84031C2.30555 6.93367 1.92372 8.16211 1.83532 9.42849C1.74693 10.6949 1.95439 11.9644 2.44129 13.137C2.92819 14.3097 3.68119 15.3522 4.64074 16.1833C5.60029 17.0144 6.74006 17.611 7.96989 17.9257C9.19973 18.2403 10.4859 18.2646 11.7268 17.9963C12.9675 17.728 14.1289 17.175 15.1191 16.3806L13.1891 14.4233C12.522 14.9031 11.7565 15.2262 10.9479 15.3686C10.1394 15.5109 9.30879 15.4689 8.51861 15.2456C7.72843 15.0222 6.99888 14.6234 6.38434 14.0788C5.76981 13.5341 5.28617 12.8578 4.9695 12.1002C4.65283 11.3426 4.51129 10.5232 4.55546 9.70331C4.59962 8.88337 4.83832 8.08398 5.24675 7.36476C5.65518 6.64554 6.22977 6.02504 6.92145 5.54958C7.61314 5.07412 8.40353 4.75591 9.09091 4.61874V1.86601ZM10.9091 1.86601V4.61874C12.0258 4.80803 13.0559 5.3401 13.8568 6.1409C14.6577 6.94169 15.1897 7.97201 15.3791 9.08873H18.1318C17.9251 7.24432 17.0977 5.52491 15.7853 4.21253C14.4729 2.90016 12.7535 2.07276 10.9091 1.86601ZM18.1318 10.9069C17.9628 12.4378 17.3633 13.8893 16.4028 15.0933L14.4663 13.1296C14.9319 12.4658 15.2439 11.7064 15.3791 10.9069H18.1318ZM0 9.99783C0 4.47510 4.47727 -0.00216797 10 -0.00216797C15.5227 -0.00216797 20 4.47510 20 9.99783C20 15.5206 15.5227 19.9978 10 19.9978C4.47727 19.9978 0 15.5206 0 9.99783ZM10 6.36146C9.03557 6.36146 8.11066 6.74457 7.42870 7.42653C6.74674 8.10849 6.36364 9.03340 6.36364 9.99783C6.36364 10.9623 6.74674 11.8872 7.42870 12.5691C8.11066 13.2511 9.03557 13.6342 10 13.6342C10.9644 13.6342 11.8893 13.2511 12.5713 12.5691C13.2533 11.8872 13.6364 10.9623 13.6364 9.99783C13.6364 9.03340 13.2533 8.10849 12.5713 7.42653C11.8893 6.74457 10.9644 6.36146 10 6.36146Z"
        fill={active ? '#F0EEF0' : '#554D57'}
      />
    </svg>
  );
}

// Animation timing constants
const THINKING_DURATION = 2000;

// Onboarding-specific loading texts
const ONBOARDING_LOADING_TEXTS = [
  'preparing your experience...',
  'setting things up...',
  'getting ready...',
];

// Country data with phone codes
const COUNTRIES = [
  { dialCode: '+1', name: 'United States', flag: '🇺🇸', code: 'US' },
  { dialCode: '+1', name: 'Canada', flag: '🇨🇦', code: 'CA' },
  { dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { dialCode: '+91', name: 'India', flag: '🇮🇳', code: 'IN' },
  { dialCode: '+61', name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { dialCode: '+49', name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { dialCode: '+33', name: 'France', flag: '🇫🇷', code: 'FR' },
  { dialCode: '+81', name: 'Japan', flag: '🇯🇵', code: 'JP' },
  { dialCode: '+65', name: 'Singapore', flag: '🇸🇬', code: 'SG' },
  { dialCode: '+852', name: 'Hong Kong', flag: '🇭🇰', code: 'HK' },
];

// Accredited Investor options
const accreditedOptions = [
  {
    key: 'netWorthBased',
    label: 'Accredited Investor (Net Worth-Based)',
    description: 'I have a net worth exceeding $1 million, excluding the value of my primary residence.',
  },
  {
    key: 'incomeBased',
    label: 'Accredited Investor (Income-Based)',
    description: 'I have earned income exceeding $200,000 individually (or $300,000 jointly with my spouse) in each of the past two years.',
  },
];

const qualifiedOptions = [
  {
    key: 'qualifiedClient',
    label: "I'm also a Qualified Client",
    description: 'I have a net worth exceeding $2.2 million, excluding my primary residence.',
  },
  {
    key: 'qualifiedPurchaser',
    label: "I'm also a Qualified Purchaser",
    description: 'I own at least $5 million in investments (for individuals).',
  },
];

const finraOption = {
  key: 'finraLicensed',
  label: "I'm also a FINRA-Licensed Representative",
  description: 'I currently hold a Series 7, 65, or 82 license.',
};

const notAccreditedOption = {
  key: 'notAccredited',
  label: 'Not Accredited',
  description: 'I am here to learn about private market investing.',
};

type Section = 'name' | 'phone' | 'accreditation' | 'summary' | 'non-accredited-complete';

// Carousel slide data for non-accredited users
const CAROUSEL_SLIDES = [
  {
    tag: 'Deep Research Analyst',
    title: 'Purpose built Private market intelligence assistant',
    description: 'Get AI-powered analysis on private market opportunities, company financials, and investment trends.',
  },
  {
    tag: 'Market Insights',
    title: 'Stay informed with real-time market data',
    description: 'Access curated private market news, fund performance data, and emerging investment opportunities.',
  },
  {
    tag: 'Learning Hub',
    title: 'Build your private market knowledge',
    description: 'Explore educational content, investment guides, and expert insights tailored for aspiring investors.',
  },
];

const CAROUSEL_AUTO_ADVANCE_MS = 4000;

// Suggestions for non-accredited users after onboarding
const NON_ACCREDITED_SUGGESTIONS = [
  'Set up my research preferences',
  'Explore market insights',
  'Learn about private markets',
  'Browse educational content',
  'View trending topics',
];

type ChatBasedOnboardingProps = {
  onComplete?: (userData: OnboardingUserData) => void;
};

export function ChatBasedOnboarding({ onComplete }: ChatBasedOnboardingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerId = 'chat-onboarding-scroll';
  const sectionRefs = useRef<Record<Section, HTMLDivElement | null>>({
    name: null,
    phone: null,
    accreditation: null,
    summary: null,
    'non-accredited-complete': null,
  });

  // Current active section
  const [activeSection, setActiveSection] = useState<Section>('name');
  const [completedSections, setCompletedSections] = useState<Set<Section>>(new Set());

  // Animation states for name section (like original NameStep)
  type AnimationPhase = 'idle' | 'logo' | 'thinking' | 'greeting' | 'description' | 'followup' | 'input' | 'complete';
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  // Animation states for non-accredited completion section
  type NonAccreditedPhase = 'idle' | 'logo' | 'thinking' | 'greeting' | 'summary' | 'carousel' | 'complete';
  const [nonAccreditedPhase, setNonAccreditedPhase] = useState<NonAccreditedPhase>('idle');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [showChatInput, setShowChatInput] = useState(false);
  const [chatInputValue, setChatInputValue] = useState('');
  const [isDeepResearchEnabled, setIsDeepResearchEnabled] = useState(false);
  const [showBorderShine, setShowBorderShine] = useState(false);
  const [isSuggestionsExpanded, setIsSuggestionsExpanded] = useState(false);
  const carouselTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showLastName, setShowLastName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [residenceCountry, setResidenceCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResidenceDropdownOpen, setIsResidenceDropdownOpen] = useState(false);
  const [selectedAccreditations, setSelectedAccreditations] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Refs for inputs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const residenceDropdownRef = useRef<HTMLDivElement>(null);

  // Animation text content (same as NameStep)
  const greetingText = "Hello, I'm Goodfin.";
  const descriptionText = "I'm your intelligent private market assistant, here to help you discover and access exclusive private market opportunities.";
  const followupText = "I'd love for us to get to know each other a bit better.";

  // Non-accredited completion text content
  const nonAccreditedGreeting = "Welcome to Goodfin!";
  const nonAccreditedSummary = "I'm your **private market finance assistant**. I can help you stay informed with **market insights**, research, and the latest **private market news**.";

  // Calculate animation durations
  const countWords = (text: string) => text.replace(/\*\*/g, '').split(' ').filter(w => w.length > 0).length;
  const greetingWordCount = countWords(greetingText);
  const descriptionWordCount = countWords(descriptionText);
  const followupWordCount = countWords(followupText);

  const greetingDuration = greetingWordCount * 150 + 200;
  const descriptionDuration = descriptionWordCount * 80 + 200;
  const followupDuration = followupWordCount * 100 + 200;

  // Animation timing constants
  const LOGO_FADE_DELAY = 200;

  // Sequential animation timeline (like NameStep)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start with logo
    timers.push(setTimeout(() => setPhase('logo'), 0));

    // Phase 2: Show thinking after logo fades in
    timers.push(setTimeout(() => setPhase('thinking'), LOGO_FADE_DELAY + 300));

    // Phase 3: Show greeting after thinking completes
    const greetingStart = LOGO_FADE_DELAY + 300 + THINKING_DURATION;
    timers.push(setTimeout(() => setPhase('greeting'), greetingStart));

    // Phase 4: Show description AFTER greeting animation completes
    const descriptionStart = greetingStart + greetingDuration + 200;
    timers.push(setTimeout(() => setPhase('description'), descriptionStart));

    // Phase 5: Show followup AFTER description animation completes
    const followupStart = descriptionStart + descriptionDuration + 200;
    timers.push(setTimeout(() => setPhase('followup'), followupStart));

    // Phase 6: Show input AFTER followup animation completes
    const inputStart = followupStart + followupDuration + 300;
    timers.push(setTimeout(() => setPhase('input'), inputStart));

    // Phase 7: Mark complete
    const completeStart = inputStart + 500;
    timers.push(setTimeout(() => setPhase('complete'), completeStart));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [greetingDuration, descriptionDuration, followupDuration]);

  // Focus input when input phase starts
  useEffect(() => {
    if (phase === 'input' && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [phase]);

  // Determine visibility based on phase (like NameStep)
  const showLogo = phase !== 'idle';
  const showThinking = phase === 'thinking';
  const showGreeting = ['greeting', 'description', 'followup', 'input', 'complete'].includes(phase);
  const showDescription = ['description', 'followup', 'input', 'complete'].includes(phase);
  const showFollowup = ['followup', 'input', 'complete'].includes(phase);
  const showInput = ['input', 'complete'].includes(phase);

  // Non-accredited section animation durations
  const naGreetingWordCount = countWords(nonAccreditedGreeting);
  const naSummaryWordCount = countWords(nonAccreditedSummary);
  const naGreetingDuration = naGreetingWordCount * 150 + 200;
  const naSummaryDuration = naSummaryWordCount * 100 + 200;

  // Start non-accredited animation when section becomes active
  useEffect(() => {
    if (activeSection !== 'non-accredited-complete') return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const LOGO_DELAY = 200;

    // Reset state
    setNonAccreditedPhase('idle');
    setCarouselIndex(0);
    setShowGetStarted(false);

    // Phase 1: Logo
    timers.push(setTimeout(() => setNonAccreditedPhase('logo'), 0));

    // Phase 2: Thinking
    timers.push(setTimeout(() => setNonAccreditedPhase('thinking'), LOGO_DELAY + 300));

    // Phase 3: Greeting
    const greetingStart = LOGO_DELAY + 300 + THINKING_DURATION;
    timers.push(setTimeout(() => setNonAccreditedPhase('greeting'), greetingStart));

    // Phase 4: Summary
    const summaryStart = greetingStart + naGreetingDuration + 300;
    timers.push(setTimeout(() => setNonAccreditedPhase('summary'), summaryStart));

    // Phase 5: Carousel
    const carouselStart = summaryStart + naSummaryDuration + 400;
    timers.push(setTimeout(() => setNonAccreditedPhase('carousel'), carouselStart));

    // Phase 6: Complete (after carousel appears)
    timers.push(setTimeout(() => setNonAccreditedPhase('complete'), carouselStart + 500));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [activeSection, naGreetingDuration, naSummaryDuration]);

  // Carousel auto-advance
  useEffect(() => {
    if (nonAccreditedPhase !== 'carousel' && nonAccreditedPhase !== 'complete') return;
    if (carouselPaused) return;

    carouselTimerRef.current = setTimeout(() => {
      if (carouselIndex < CAROUSEL_SLIDES.length - 1) {
        setCarouselIndex(prev => prev + 1);
      } else {
        // Show Get Started button after last slide
        setShowGetStarted(true);
      }
    }, CAROUSEL_AUTO_ADVANCE_MS);

    return () => {
      if (carouselTimerRef.current) {
        clearTimeout(carouselTimerRef.current);
      }
    };
  }, [nonAccreditedPhase, carouselIndex, carouselPaused]);

  // Non-accredited visibility states
  const naShowLogo = nonAccreditedPhase !== 'idle';
  const naShowThinking = nonAccreditedPhase === 'thinking';
  const naShowGreeting = ['greeting', 'summary', 'carousel', 'complete'].includes(nonAccreditedPhase);
  const naShowSummary = ['summary', 'carousel', 'complete'].includes(nonAccreditedPhase);
  const naShowCarousel = ['carousel', 'complete'].includes(nonAccreditedPhase);

  // Carousel handlers
  const handleCarouselNext = () => {
    setCarouselPaused(true);
    if (carouselIndex < CAROUSEL_SLIDES.length - 1) {
      setCarouselIndex(prev => prev + 1);
    } else {
      setShowGetStarted(true);
    }
  };

  const handleCarouselDot = (index: number) => {
    setCarouselPaused(true);
    setCarouselIndex(index);
  };

  const handleGetStarted = () => {
    // Show the chat input with animation
    setShowChatInput(true);
    // Trigger border shine animation
    setShowBorderShine(true);
    // Remove shine after animation completes
    setTimeout(() => {
      setShowBorderShine(false);
    }, 1500);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (residenceDropdownRef.current && !residenceDropdownRef.current.contains(e.target as Node)) {
        setIsResidenceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scrolling between sections on the main container
  // Content within sections can still scroll via their own overflow
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if the event target is inside a scrollable element within the section
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('[data-scrollable]');

      // If inside a scrollable area, allow it
      if (scrollableParent) {
        const element = scrollableParent as HTMLElement;
        const canScrollUp = element.scrollTop > 0;
        const canScrollDown = element.scrollTop < element.scrollHeight - element.clientHeight;

        // Allow scroll if there's room to scroll in that direction
        if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
          return; // Allow the scroll
        }
      }

      // Prevent scrolling between sections
      e.preventDefault();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Scroll to section with snap effect
  const scrollToSection = useCallback((section: Section) => {
    const el = sectionRefs.current[section];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(section);

      // Focus input after scroll
      setTimeout(() => {
        if (section === 'name' && firstNameRef.current) {
          firstNameRef.current.focus();
        } else if (section === 'phone' && phoneRef.current) {
          phoneRef.current.focus();
        }
      }, 500);
    }
  }, []);

  // Handle section completion
  const completeSection = useCallback((section: Section, nextSection: Section) => {
    setCompletedSections(prev => new Set(prev).add(section));
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      scrollToSection(nextSection);
    }, 500);
  }, [scrollToSection]);

  // Name section handlers
  const handleFirstNameBlur = () => {
    if (firstName.trim().length >= 1 && !showLastName) {
      setShowLastName(true);
      setTimeout(() => lastNameRef.current?.focus(), 300);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim().length >= 2 && lastName.trim().length >= 1) {
      completeSection('name', 'phone');
    }
  };

  // Phone section handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ''));
  };

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setResidenceCountry(country);
    setIsDropdownOpen(false);
    phoneRef.current?.focus();
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 7) {
      completeSection('phone', 'accreditation');
    }
  };

  // Accreditation handlers
  const handleToggleAccreditation = (key: string) => {
    const newSelected = new Set(selectedAccreditations);

    if (key === 'notAccredited') {
      newSelected.clear();
      newSelected.add('notAccredited');
    } else {
      newSelected.delete('notAccredited');
      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }
    }

    setSelectedAccreditations(newSelected);
  };

  const handleAccreditationSubmit = () => {
    if (selectedAccreditations.size > 0) {
      const isAccredited = !selectedAccreditations.has('notAccredited');

      if (isAccredited) {
        completeSection('accreditation', 'summary');
      } else {
        // Non-accredited - navigate to completion screen with greeting
        completeSection('accreditation', 'non-accredited-complete');
      }
    }
  };

  // Determine CTA button text based on accreditation selection
  const getAccreditationButtonText = () => {
    if (selectedAccreditations.size === 0) return 'Continue';
    if (selectedAccreditations.has('notAccredited')) return "I'm not an accredited investor";

    // Build the status text based on selections
    const statuses: string[] = ['accredited investor'];

    if (selectedAccreditations.has('qualifiedClient')) {
      statuses.push('qualified client');
    }
    if (selectedAccreditations.has('qualifiedPurchaser')) {
      statuses.push('qualified purchaser');
    }

    // Format the button text
    if (statuses.length === 1) {
      return "I agree I'm an accredited investor";
    } else if (statuses.length === 2) {
      return `I agree I'm an ${statuses[0]} & ${statuses[1]}`;
    } else {
      return `I agree I'm an ${statuses[0]}, ${statuses[1]} & ${statuses[2]}`;
    }
  };

  // Summary submit
  const handleFinalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userData: OnboardingUserData = {
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email: '',
        country: residenceCountry.name,
        phoneNumber: `${selectedCountry.dialCode}${phoneNumber}`,
        isAccredited: !selectedAccreditations.has('notAccredited'),
        isAccreditedConfirmed: !selectedAccreditations.has('notAccredited'),
        accreditationSelections: Array.from(selectedAccreditations),
      };
      onComplete?.(userData);
      alert('Application submitted successfully!');
    }, 1500);
  };

  // Section tracking for scroll indicator - dynamically adjust based on path
  const isNonAccreditedPath = activeSection === 'non-accredited-complete' || completedSections.has('non-accredited-complete');
  const sections: Section[] = isNonAccreditedPath
    ? ['name', 'phone', 'accreditation', 'non-accredited-complete']
    : ['name', 'phone', 'accreditation', 'summary'];
  const currentIndex = sections.indexOf(activeSection);

  // Toggle switch component
  const ToggleSwitch = ({ isOn, onToggle, disabled }: { isOn: boolean; onToggle: () => void; disabled?: boolean }) => (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="relative w-12 h-7 rounded-full transition-all duration-200 flex-shrink-0"
      style={{
        backgroundColor: isOn ? colors.grey[900] : colors.grey[300],
      }}
    >
      <div
        className={cn(
          'absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-200',
          isOn ? 'left-6' : 'left-1'
        )}
      />
    </button>
  );

  // Option row component
  const OptionRow = ({ option, isSelected }: { option: { key: string; label: string; description: string }; isSelected: boolean }) => (
    <div className="flex items-start gap-3">
      <ToggleSwitch
        isOn={isSelected}
        onToggle={() => handleToggleAccreditation(option.key)}
        disabled={isLoading}
      />
      <div className="flex flex-col gap-1">
        <span style={{ ...typography.paragraph.sm, color: colors.grey[900], fontWeight: 500 }}>
          {option.label}
        </span>
        <span style={{ ...typography.paragraph.xs, color: colors.grey[600], lineHeight: 1.5 }}>
          {option.description}
        </span>
      </div>
    </div>
  );

  // Inline SVG as data URI for background
  const bgSvg = `url("data:image/svg+xml,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`;

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden relative"
      style={{
        background: `${bgSvg} no-repeat center bottom / 100% auto, ${colors.grey[100]}`,
      }}
    >
      {/* Hide scrollbar CSS for WebKit + Border Shine Animation */}
      <style>{`
        #${scrollContainerId}::-webkit-scrollbar,
        [data-scrollable]::-webkit-scrollbar {
          display: none;
        }

        @keyframes borderShine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .border-shine {
          position: relative;
          overflow: hidden;
        }

        .border-shine::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 26px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 149, 74, 0.6) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: borderShine 1.5s ease-in-out;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>

      {/* Snap Scroll Container - Hide scrollbar, only navigate via buttons */}
      <div
        id={scrollContainerId}
        ref={containerRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        {/* Section 1: Name (with animated greeting like NameStep) */}
        <section
          ref={(el) => { sectionRefs.current.name = el; }}
          className="min-h-screen w-full flex items-center justify-center px-4 snap-start snap-always"
        >
          <div className="w-full max-w-[480px] flex flex-col">
            {/* AI Avatar */}
            <div
              className={cn(
                'transition-opacity duration-500 mb-8',
                showLogo ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img
                src="/conciergeIcon.png"
                alt="Goodfin AI"
                className={cn(
                  'w-12 h-12 rounded-full',
                  phase === 'complete' && 'animate-pulse-subtle'
                )}
                style={{
                  boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
                  border: '1px solid #F8F8F8',
                }}
              />
            </div>

            {/* Thinking State */}
            <ThinkingText
              isVisible={showThinking}
              className="min-h-[28px] mb-6"
              loadingTexts={ONBOARDING_LOADING_TEXTS}
            />

            {/* Greeting Text - "Hello, I'm Goodfin." */}
            {showGreeting && (
              <div
                className={cn(
                  'text-left transition-opacity duration-300 mb-4',
                  showGreeting ? 'opacity-100' : 'opacity-0'
                )}
              >
                <h1
                  style={{
                    fontFamily: typography.heading.md.fontFamily,
                    fontSize: '32px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: colors.grey[950],
                  }}
                >
                  <AnimatedWordText
                    text={greetingText}
                    baseDelay={0}
                    wordDelay={150}
                    fadeDuration={200}
                  />
                </h1>
              </div>
            )}

            {/* Description Text */}
            {showDescription && (
              <div
                className={cn(
                  'text-left transition-opacity duration-300 mb-3',
                  showDescription ? 'opacity-100' : 'opacity-0'
                )}
              >
                <p
                  style={{
                    ...typography.paragraph.md,
                    color: colors.grey[800],
                    lineHeight: 1.6,
                  }}
                >
                  <AnimatedWordText
                    text={descriptionText}
                    baseDelay={0}
                    wordDelay={80}
                    fadeDuration={150}
                  />
                </p>
              </div>
            )}

            {/* Follow-up Text */}
            {showFollowup && (
              <div
                className={cn(
                  'text-left transition-opacity duration-300 mb-8',
                  showFollowup ? 'opacity-100' : 'opacity-0'
                )}
              >
                <p
                  style={{
                    ...typography.paragraph.md,
                    color: colors.grey[800],
                    lineHeight: 1.6,
                  }}
                >
                  <AnimatedWordText
                    text={followupText}
                    baseDelay={0}
                    wordDelay={100}
                    fadeDuration={180}
                  />
                </p>
              </div>
            )}

            {/* Input Section */}
            {showInput && (
              <form
                onSubmit={handleNameSubmit}
                className={cn(
                  'w-full transition-opacity duration-300',
                  showInput ? 'opacity-100' : 'opacity-0'
                )}
              >
                {/* First Name Input */}
                <div
                  className="w-full rounded-xl transition-all duration-200 mb-4"
                  style={{
                    backgroundColor: 'rgba(247, 247, 248, 0.70)',
                    border: '1px solid #F5F4F6',
                    padding: '12px 16px',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      color: colors.grey[600],
                      fontFamily: typography.paragraph.sm.fontFamily,
                      marginBottom: '2px',
                    }}
                  >
                    Nice to meet you, I'm...
                  </label>
                  <input
                    ref={firstNameRef}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={handleFirstNameBlur}
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    disabled={isLoading}
                    className="w-full outline-none bg-transparent"
                    style={{
                      border: 'none',
                      fontSize: '16px',
                      color: colors.grey[950],
                      fontFamily: typography.paragraph.md.fontFamily,
                    }}
                  />
                </div>

                {/* Last Name Input */}
                <div
                  className={cn(
                    'w-full rounded-xl transition-all duration-300 mb-6 overflow-hidden',
                    showLastName ? 'opacity-100 max-h-[100px]' : 'opacity-0 max-h-0'
                  )}
                  style={{
                    backgroundColor: 'rgba(247, 247, 248, 0.70)',
                    border: showLastName ? '1px solid #F5F4F6' : 'none',
                    padding: showLastName ? '12px 16px' : '0 16px',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      color: colors.grey[600],
                      fontFamily: typography.paragraph.sm.fontFamily,
                      marginBottom: '2px',
                    }}
                  >
                    Last name
                  </label>
                  <input
                    ref={lastNameRef}
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    disabled={isLoading}
                    className="w-full outline-none bg-transparent"
                    style={{
                    border: 'none',
                    fontSize: '16px',
                    color: colors.grey[950],
                    fontFamily: typography.paragraph.md.fontFamily,
                  }}
                />
              </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!(firstName.trim().length >= 2 && lastName.trim().length >= 1) || isLoading}
                  className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
                  style={{
                    ...(firstName.trim().length >= 2 && lastName.trim().length >= 1
                      ? buttonStyles.gradient.enabled
                      : buttonStyles.gradient.disabled),
                    color: '#F4F3F5',
                    cursor: firstName.trim().length >= 2 && lastName.trim().length >= 1 && !isLoading ? 'pointer' : 'not-allowed',
                    ...typography.label.md,
                  }}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Section 2: Phone */}
        <section
          ref={(el) => { sectionRefs.current.phone = el; }}
          className="min-h-screen w-full flex items-center justify-center px-4 snap-start snap-always"
        >
          <div className="w-full max-w-[480px] flex flex-col">
            {/* AI Avatar */}
            <div className="mb-8">
              <img
                src="/conciergeIcon.png"
                alt="Goodfin AI"
                className="w-12 h-12 rounded-full"
                style={{
                  boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
                  border: '1px solid #F8F8F8',
                }}
              />
            </div>

            {/* Greeting */}
            <div className="text-left mb-4">
              <h2
                style={{
                  fontFamily: typography.heading.md.fontFamily,
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: colors.grey[950],
                }}
              >
                Nice to meet you, {firstName || 'there'}!
              </h2>
            </div>

            <div className="text-left mb-8">
              <p style={{ ...typography.paragraph.md, color: colors.grey[800], lineHeight: 1.6 }}>
                Enter your phone number to keep your account secure.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="w-full">
              {/* Phone Input */}
              <div
                className="w-full rounded-xl transition-all duration-200 mb-4 flex items-center"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${phoneNumber.length > 0 ? colors.grey[400] : 'rgba(186, 184, 187, 0.16)'}`,
                  height: '64px',
                }}
              >
                {/* Country Code Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 h-[62px] border-r hover:bg-gray-50 transition-colors"
                    style={{
                      borderColor: 'rgba(186, 184, 187, 0.16)',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                    }}
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span style={{ ...typography.paragraph.md, color: colors.grey[950] }}>
                      {selectedCountry.dialCode}
                    </span>
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform duration-200', isDropdownOpen && 'rotate-180')}
                      style={{ color: colors.grey[500] }}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.grey[200]}`,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        minWidth: '200px',
                      }}
                    >
                      {COUNTRIES.map((country, index) => (
                        <button
                          key={`${country.code}-${index}`}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
                          style={{
                            backgroundColor: selectedCountry.code === country.code ? colors.grey[100] : 'transparent',
                          }}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span style={{ ...typography.paragraph.sm, color: colors.grey[950], flex: 1 }}>
                            {country.name}
                          </span>
                          <span style={{ ...typography.paragraph.sm, color: colors.grey[500] }}>
                            {country.dialCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  ref={phoneRef}
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  disabled={isLoading}
                  className="flex-1 h-full px-4 outline-none"
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '16px',
                    color: colors.grey[950],
                    fontFamily: typography.paragraph.md.fontFamily,
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                  }}
                />
              </div>

              {/* Country of Residence */}
              {phoneNumber.length >= 3 && (
                <div className="relative mb-6" ref={residenceDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsResidenceDropdownOpen(!isResidenceDropdownOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100"
                    style={{
                      backgroundColor: 'rgba(247, 247, 248, 0.70)',
                      border: isResidenceDropdownOpen ? `1px solid ${colors.grey[400]}` : '1px solid #F5F4F6',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{residenceCountry.flag}</span>
                      <div className="flex flex-col text-left">
                        <span style={{ fontSize: '12px', color: colors.grey[500] }}>Country of Residence</span>
                        <span style={{ ...typography.label.sm, color: colors.grey[950] }}>{residenceCountry.name}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn('w-4 h-4 transition-transform duration-200', isResidenceDropdownOpen && 'rotate-180')}
                      style={{ color: colors.grey[500] }}
                    />
                  </button>

                  {isResidenceDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.grey[200]}`,
                        maxHeight: '250px',
                        overflowY: 'auto',
                      }}
                    >
                      {COUNTRIES.map((country, index) => (
                        <button
                          key={`residence-${country.code}-${index}`}
                          type="button"
                          onClick={() => {
                            setResidenceCountry(country);
                            setIsResidenceDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
                          style={{
                            backgroundColor: residenceCountry.code === country.code ? colors.grey[100] : 'transparent',
                          }}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span style={{ ...typography.paragraph.sm, color: colors.grey[950], flex: 1 }}>
                            {country.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={phoneNumber.length < 7 || isLoading}
                className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
                style={{
                  ...(phoneNumber.length >= 7 ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
                  color: '#F4F3F5',
                  cursor: phoneNumber.length >= 7 && !isLoading ? 'pointer' : 'not-allowed',
                  ...typography.label.md,
                }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Continue'
                )}
              </button>

              <p className="text-left mt-4" style={{ ...typography.paragraph.xs, color: colors.grey[500] }}>
                By continuing, you agree to receive SMS messages from Goodfin.
              </p>
            </form>
          </div>
        </section>

        {/* Section 3: Accreditation */}
        <section
          ref={(el) => { sectionRefs.current.accreditation = el; }}
          className="h-screen w-full flex items-center justify-center px-4 py-8 snap-start snap-always"
        >
          <div
            data-scrollable
            className="w-full max-w-[560px] flex flex-col max-h-[calc(100vh-64px)] overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* AI Avatar */}
            <div className="mb-8">
              <img
                src="/conciergeIcon.png"
                alt="Goodfin AI"
                className="w-12 h-12 rounded-full"
                style={{
                  boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
                  border: '1px solid #F8F8F8',
                }}
              />
            </div>

            {/* Greeting */}
            <div className="text-left mb-4">
              <h2
                style={{
                  fontFamily: typography.heading.md.fontFamily,
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: colors.grey[950],
                }}
              >
                Almost there, {firstName || 'there'}!
              </h2>
            </div>

            <div className="text-left mb-8">
              <p style={{ ...typography.paragraph.md, color: colors.grey[800], lineHeight: 1.6 }}>
                I need to confirm your investor status for regulatory compliance.
              </p>
            </div>

            {/* Section Header */}
            <p style={{ ...typography.paragraph.sm, color: colors.grey[950], fontWeight: 600, marginBottom: '20px' }}>
              Investor Accreditation Status (Select all that apply):
            </p>

            {/* Accredited Options */}
            <div
              className="w-full rounded-xl mb-4"
              style={{
                backgroundColor: 'rgba(247, 247, 248, 0.70)',
                border: '1px solid #F5F4F6',
                padding: '20px',
              }}
            >
              <div className="space-y-5">
                {accreditedOptions.map((option) => (
                  <OptionRow key={option.key} option={option} isSelected={selectedAccreditations.has(option.key)} />
                ))}
              </div>
            </div>

            {/* Qualified Options */}
            <div
              className="w-full rounded-xl mb-4"
              style={{
                backgroundColor: 'rgba(247, 247, 248, 0.70)',
                border: '1px solid #F5F4F6',
                padding: '20px',
              }}
            >
              <div className="space-y-5">
                {qualifiedOptions.map((option) => (
                  <OptionRow key={option.key} option={option} isSelected={selectedAccreditations.has(option.key)} />
                ))}
              </div>
            </div>

            {/* FINRA Option */}
            <div
              className="w-full rounded-xl mb-4"
              style={{
                backgroundColor: 'rgba(247, 247, 248, 0.70)',
                border: '1px solid #F5F4F6',
                padding: '20px',
              }}
            >
              <OptionRow option={finraOption} isSelected={selectedAccreditations.has(finraOption.key)} />
            </div>

            {/* Not Accredited Option */}
            <div
              className="w-full rounded-xl mb-8"
              style={{
                backgroundColor: 'rgba(247, 247, 248, 0.70)',
                border: '1px solid #F5F4F6',
                padding: '20px',
              }}
            >
              <OptionRow option={notAccreditedOption} isSelected={selectedAccreditations.has(notAccreditedOption.key)} />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleAccreditationSubmit}
              disabled={selectedAccreditations.size === 0 || isLoading}
              className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{
                ...(selectedAccreditations.size > 0 ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
                color: '#F4F3F5',
                cursor: selectedAccreditations.size > 0 && !isLoading ? 'pointer' : 'not-allowed',
                ...typography.label.md,
              }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                getAccreditationButtonText()
              )}
            </button>
          </div>
        </section>

        {/* Section 4: Summary */}
        <section
          ref={(el) => { sectionRefs.current.summary = el; }}
          className="min-h-screen w-full flex items-center justify-center px-4 snap-start snap-always"
        >
          <div className="w-full max-w-[480px] flex flex-col">
            {/* Header */}
            <h2
              className="text-left"
              style={{
                ...typography.heading.sm,
                color: colors.grey[950],
              }}
            >
              Here's a summary of your application
            </h2>
            <p
              className="text-left"
              style={{
                ...typography.paragraph.sm,
                color: colors.grey[900],
                marginTop: '8px',
              }}
            >
              Confirm your details to complete onboarding.
            </p>

            {/* Summary Container */}
            <div
              style={{
                marginTop: '32px',
                marginBottom: '32px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                background: 'rgba(247, 247, 248, 0.70)',
                borderRadius: '12px',
                boxShadow: '2px 2px 2px 0px #FFF inset',
                border: '1px solid #F5F4F6',
              }}
            >
              {/* Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ ...typography.label.xs, color: '#9A90A1' }}>First name</span>
                  <span style={{ ...typography.label.sm, color: colors.grey[900] }}>{firstName || '-'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ ...typography.label.xs, color: '#9A90A1' }}>Last name</span>
                  <span style={{ ...typography.label.sm, color: colors.grey[900] }}>{lastName || '-'}</span>
                </div>
              </div>

              {/* Phone & Country */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ ...typography.label.xs, color: '#9A90A1' }}>Phone number</span>
                  <span style={{ ...typography.label.sm, color: colors.grey[900] }}>
                    {phoneNumber ? `${selectedCountry.dialCode}${phoneNumber}` : '-'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ ...typography.label.xs, color: '#9A90A1' }}>Country</span>
                  <span style={{ ...typography.label.sm, color: colors.grey[900] }}>{residenceCountry.name}</span>
                </div>
              </div>

              {/* Accreditation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ ...typography.label.xs, color: '#9A90A1' }}>Accredited investor?</span>
                <span style={{ ...typography.label.sm, color: colors.grey[900] }}>
                  {selectedAccreditations.has('notAccredited') ? 'No' : 'Yes'}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isLoading}
              className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{
                ...buttonStyles.gradient.enabled,
                color: '#F4F3F5',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                ...typography.label.md,
              }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </section>

        {/* Section 5: Non-Accredited Complete */}
        <section
          ref={(el) => { sectionRefs.current['non-accredited-complete'] = el; }}
          className="min-h-screen w-full flex items-start justify-center px-4 pt-[15vh] pb-8 snap-start snap-always"
        >
          <div className="w-full max-w-[560px] flex flex-col">
            {/* AI Avatar */}
            <div
              className={cn(
                'transition-opacity duration-500 mb-6',
                naShowLogo ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img
                src="/conciergeIcon.png"
                alt="Goodfin AI"
                className={cn(
                  'w-12 h-12 rounded-full',
                  nonAccreditedPhase === 'complete' && 'animate-pulse-subtle'
                )}
                style={{
                  boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
                  border: '1px solid #F8F8F8',
                }}
              />
            </div>

            {/* Thinking State */}
            <ThinkingText
              isVisible={naShowThinking}
              className="min-h-[28px] mb-6"
              loadingTexts={ONBOARDING_LOADING_TEXTS}
            />

            {/* Greeting Text */}
            {naShowGreeting && (
              <div
                className={cn(
                  'text-left transition-opacity duration-300 mb-4',
                  naShowGreeting ? 'opacity-100' : 'opacity-0'
                )}
              >
                <h1
                  style={{
                    fontFamily: typography.heading.md.fontFamily,
                    fontSize: '28px',
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: colors.grey[950],
                  }}
                >
                  <AnimatedWordText
                    text={nonAccreditedGreeting}
                    baseDelay={0}
                    wordDelay={150}
                    fadeDuration={200}
                  />
                </h1>
              </div>
            )}

            {/* Summary Text */}
            {naShowSummary && (
              <div
                className={cn(
                  'text-left transition-opacity duration-300 mb-8',
                  naShowSummary ? 'opacity-100' : 'opacity-0'
                )}
              >
                <p
                  style={{
                    ...typography.paragraph.md,
                    color: colors.grey[700],
                    lineHeight: 1.6,
                  }}
                >
                  <AnimatedWordText
                    text={nonAccreditedSummary}
                    baseDelay={0}
                    wordDelay={100}
                    fadeDuration={180}
                  />
                </p>
              </div>
            )}

            {/* Gen UI Carousel */}
            {naShowCarousel && !showChatInput && (
              <div
                className={cn(
                  'w-full transition-all duration-500',
                  naShowCarousel ? 'opacity-100' : 'opacity-0'
                )}
                onMouseEnter={() => setCarouselPaused(true)}
                onMouseLeave={() => setCarouselPaused(false)}
              >
                {/* Intro Label */}
                <div className="flex items-center gap-2 px-1 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: colors.grey[500] }} />
                  <span
                    className="text-sm"
                    style={{
                      color: colors.grey[500],
                      fontFamily: typography.paragraph.sm.fontFamily,
                    }}
                  >
                    Intro
                  </span>
                </div>
                {/* Carousel Card */}
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    border: '1px solid #E5E5E5',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Top Section - Preview Image Area */}
                  <div
                    className="w-full px-6 pt-6 pb-4"
                    style={{ backgroundColor: '#F8F8F8' }}
                  >
                    <p
                      style={{
                        ...typography.paragraph.md,
                        color: colors.grey[900],
                        fontWeight: 500,
                        marginBottom: '16px',
                      }}
                    >
                      Preview Product image
                    </p>

                    {/* Mock Input with Tag */}
                    <div className="flex justify-end">
                      <div
                        className="rounded-lg px-4 py-2"
                        style={{
                          backgroundColor: colors.white,
                          border: '1px solid #E5E5E5',
                        }}
                      >
                        <p
                          className="text-xs mb-2"
                          style={{ color: colors.grey[500] }}
                        >
                          Type to run a financial deep dive
                        </p>
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: colors.grey[800],
                            color: colors.white,
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <span className="text-sm font-medium">
                            {CAROUSEL_SLIDES[carouselIndex].tag}
                          </span>
                          <button className="ml-1 hover:opacity-70">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-200" />

                  {/* Bottom Section - Title & Description */}
                  <div className="px-6 py-6">
                    <h3
                      style={{
                        fontFamily: typography.heading.sm.fontFamily,
                        fontSize: '20px',
                        fontWeight: 600,
                        color: colors.grey[950],
                        marginBottom: '8px',
                      }}
                    >
                      {CAROUSEL_SLIDES[carouselIndex].title}
                    </h3>
                    <p
                      style={{
                        ...typography.paragraph.sm,
                        color: colors.grey[600],
                        lineHeight: 1.5,
                      }}
                    >
                      {CAROUSEL_SLIDES[carouselIndex].description}
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                      {/* Dots */}
                      <div className="flex items-center gap-2">
                        {CAROUSEL_SLIDES.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleCarouselDot(index)}
                            className={cn(
                              'w-2 h-2 rounded-full transition-all duration-200',
                              index === carouselIndex ? 'bg-gray-900' : 'bg-gray-300'
                            )}
                          />
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={handleCarouselNext}
                        className="px-6 py-2.5 rounded-lg border transition-colors hover:bg-gray-50"
                        style={{
                          borderColor: colors.grey[300],
                          color: colors.grey[900],
                          ...typography.label.sm,
                        }}
                      >
                        {carouselIndex === CAROUSEL_SLIDES.length - 1 ? 'Done' : 'Next'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Get Started Button */}
                {showGetStarted && (
                  <button
                    onClick={handleGetStarted}
                    className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200 mt-6 animate-fade-in"
                    style={{
                      ...buttonStyles.gradient.enabled,
                      color: '#F4F3F5',
                      ...typography.label.md,
                    }}
                  >
                    Get Started
                  </button>
                )}
              </div>
            )}

            {/* Suggestions - Appears when chat input is shown */}
            {showChatInput && (
              <div
                className="w-full transition-all duration-700"
                style={{
                  opacity: showChatInput ? 1 : 0,
                  transform: showChatInput ? 'translateY(0)' : 'translateY(20px)',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: '200ms',
                }}
              >
                {/* Suggestions Label */}
                <div className="flex items-center gap-2 px-1 mb-4">
                  <Sparkles className="w-4 h-4" style={{ color: colors.grey[500] }} />
                  <span
                    className="text-sm"
                    style={{
                      color: colors.grey[500],
                      fontFamily: typography.paragraph.sm.fontFamily,
                    }}
                  >
                    Suggestions for you
                  </span>
                </div>

                {/* Suggestions Card */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    border: '1px solid #E5E5E5',
                    boxShadow: 'inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {(isSuggestionsExpanded ? NON_ACCREDITED_SUGGESTIONS : NON_ACCREDITED_SUGGESTIONS.slice(0, 3)).map((suggestion, index, arr) => (
                    <button
                      key={index}
                      onClick={() => setChatInputValue(suggestion)}
                      className={cn(
                        'w-full text-left px-4 py-3 transition-colors duration-200',
                        'hover:bg-gray-50 cursor-pointer'
                      )}
                      style={{
                        borderBottom: index !== arr.length - 1 || NON_ACCREDITED_SUGGESTIONS.length > 3 ? `1px solid ${colors.grey[200]}` : 'none',
                      }}
                    >
                      <span
                        className="text-sm"
                        style={{
                          color: colors.grey[900],
                          fontFamily: typography.paragraph.sm.fontFamily,
                        }}
                      >
                        {suggestion}
                      </span>
                    </button>
                  ))}

                  {/* Show More/Less Toggle */}
                  {NON_ACCREDITED_SUGGESTIONS.length > 3 && (
                    <button
                      onClick={() => setIsSuggestionsExpanded(!isSuggestionsExpanded)}
                      className="w-full text-left px-4 py-3 transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <span
                        className="text-sm"
                        style={{
                          color: colors.grey[500],
                          fontFamily: typography.paragraph.sm.fontFamily,
                        }}
                      >
                        {isSuggestionsExpanded ? 'Show less...' : 'Show more...'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Radix-style Custom Scroll Indicator */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
        style={{
          height: '120px',
          width: '6px',
        }}
      >
        {/* Track */}
        <div
          className="w-full h-full rounded-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Thumb */}
          <div
            className="w-full rounded-full transition-all duration-300 ease-out"
            style={{
              backgroundColor: colors.grey[900],
              height: `${100 / sections.length}%`,
              transform: `translateY(${currentIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Chat Input - Fades in with bezier curve animation */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 pt-6 pb-10 px-4 z-50',
          'transition-all duration-700'
        )}
        style={{
          opacity: showChatInput ? 1 : 0,
          transform: showChatInput ? 'translateY(0)' : 'translateY(40px)',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: showChatInput ? 'auto' : 'none',
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Input Container */}
          <div
            className={cn(
              'w-full flex flex-col gap-2 px-3 py-2',
              showBorderShine && 'border-shine'
            )}
            style={{
              backgroundColor: colors.white,
              border: '2px solid #FFFFFF',
              borderRadius: '24px',
              boxShadow: '0px 2px 8px 0px rgba(164, 140, 160, 0.20)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            {/* Top Row - Input + Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Input Field */}
              <input
                type="text"
                value={chatInputValue}
                onChange={(e) => setChatInputValue(e.target.value)}
                placeholder={isDeepResearchEnabled ? 'Type to run a financial deep dive' : 'Type your response...'}
                className="flex-1 bg-transparent text-sm outline-none py-1"
                style={{
                  color: colors.grey[950],
                  fontWeight: 500,
                  fontFamily: typography.paragraph.md.fontFamily,
                }}
                aria-label="Chat message input"
              />

              {/* Action Buttons */}
              {chatInputValue.trim() ? (
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" style={{ color: colors.grey[950] }} />
                </button>
              ) : (
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
                  aria-label="Voice input"
                >
                  <Mic className="w-5 h-5" style={{ color: colors.grey[950] }} />
                </button>
              )}
            </div>

            {/* Bottom Row - Deep Research Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsDeepResearchEnabled(!isDeepResearchEnabled)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: isDeepResearchEnabled ? '#685F6A' : 'transparent',
                  cursor: 'pointer',
                }}
                aria-label="Toggle Deep Research Analyst"
                aria-pressed={isDeepResearchEnabled}
              >
                <DeepResearchIcon active={isDeepResearchEnabled} />
                <span
                  className="text-sm"
                  style={{
                    color: isDeepResearchEnabled ? '#F0EEF0' : colors.grey[950],
                    fontFamily: typography.paragraph.sm.fontFamily,
                  }}
                >
                  Deep Research Analyst
                </span>
                {isDeepResearchEnabled && (
                  <X
                    className="w-5 h-5 ml-1 cursor-pointer hover:opacity-80"
                    style={{ color: '#9B929E' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeepResearchEnabled(false);
                    }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Disclaimer Text */}
          <p
            className="text-xs text-center mt-2 px-4"
            style={{
              color: '#7F7582',
              fontFamily: typography.paragraph.xs.fontFamily,
            }}
          >
            Goodfin AI Concierge does not provide tax, financial, investment, or legal advice. It can present inaccurate information. Make sure to validate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBasedOnboarding;
