import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';
import { AnimatedWordText } from '../AIGreeting/AnimatedWordText';

// Country data with phone codes - sorted by dial code for dropdown
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
  { dialCode: '+41', name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
  { dialCode: '+31', name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE' },
  { dialCode: '+55', name: 'Brazil', flag: '🇧🇷', code: 'BR' },
  { dialCode: '+52', name: 'Mexico', flag: '🇲🇽', code: 'MX' },
  { dialCode: '+34', name: 'Spain', flag: '🇪🇸', code: 'ES' },
  { dialCode: '+39', name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { dialCode: '+82', name: 'South Korea', flag: '🇰🇷', code: 'KR' },
  { dialCode: '+46', name: 'Sweden', flag: '🇸🇪', code: 'SE' },
  { dialCode: '+47', name: 'Norway', flag: '🇳🇴', code: 'NO' },
  { dialCode: '+86', name: 'China', flag: '🇨🇳', code: 'CN' },
];

// Animation timing constants
const LOGO_FADE_DELAY = 200;

// Animation phases (no thinking phase - shimmer only on first step)
type AnimationPhase =
  | 'idle'
  | 'logo'
  | 'greeting'
  | 'prompt'
  | 'input'
  | 'complete';

// Get time-based greeting
function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

type AnimatedOnboardingFlowProps = {
  onPhoneSubmit?: (phoneNumber: string, country: { name: string; flag: string; code: string }) => void;
};

/**
 * AnimatedOnboardingFlow Component
 *
 * An animated onboarding experience that:
 * 1. Shows AI greeting animation (thinking, greeting text)
 * 2. Prompts for phone number with animated text
 * 3. Has country code dropdown for phone input
 */
export function AnimatedOnboardingFlow({ onPhoneSubmit }: AnimatedOnboardingFlowProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default to US
  const [residenceCountry, setResidenceCountry] = useState(COUNTRIES[0]); // Country of residence
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResidenceDropdownOpen, setIsResidenceDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const residenceDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greetingText = `${getTimeGreeting()}! Welcome to Goodfin.`;
  const promptText = "Enter your phone number to keep your account secure.";

  // Calculate animation durations
  const countWords = (text: string) => text.replace(/\*\*/g, '').split(' ').filter(w => w.length > 0).length;
  const greetingWordCount = countWords(greetingText);
  const promptWordCount = countWords(promptText);
  const greetingDuration = greetingWordCount * 150 + 200;
  const promptDuration = promptWordCount * 100 + 180;

  // Sequential animation timeline (no thinking/shimmer - only shown on first step)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start with logo
    timers.push(setTimeout(() => setPhase('logo'), 0));

    // Phase 2: Show greeting after logo fades in (skip thinking phase)
    const greetingStart = LOGO_FADE_DELAY + 300;
    timers.push(setTimeout(() => setPhase('greeting'), greetingStart));

    // Phase 3: Show prompt AFTER greeting animation completes
    const promptStart = greetingStart + greetingDuration + 300;
    timers.push(setTimeout(() => setPhase('prompt'), promptStart));

    // Phase 4: Show input AFTER prompt animation completes
    const inputStart = promptStart + promptDuration + 400;
    timers.push(setTimeout(() => setPhase('input'), inputStart));

    // Phase 5: Mark complete
    const completeStart = inputStart + 500;
    timers.push(setTimeout(() => setPhase('complete'), completeStart));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [greetingDuration, promptDuration]);

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

  // Focus input when input phase starts
  useEffect(() => {
    if (phase === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  // Handle phone number input - only digits
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  }, []);

  // Handle country selection (phone code) - also updates residence as suggestion
  const handleCountrySelect = useCallback((country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setResidenceCountry(country); // Auto-suggest residence based on phone country
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  }, []);

  // Handle residence country selection
  const handleResidenceSelect = useCallback((country: typeof COUNTRIES[0]) => {
    setResidenceCountry(country);
    setIsResidenceDropdownOpen(false);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 7) {
      setIsSubmitting(true);
      const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;
      setTimeout(() => {
        // Use residence country for the country of residence
        onPhoneSubmit?.(fullPhoneNumber, {
          name: residenceCountry.name,
          flag: residenceCountry.flag,
          code: residenceCountry.code,
        });
        setIsSubmitting(false);
      }, 600);
    }
  }, [phoneNumber, selectedCountry, residenceCountry, onPhoneSubmit]);

  // Determine visibility based on phase
  const showLogo = phase !== 'idle';
  const showGreeting = ['greeting', 'prompt', 'input', 'complete'].includes(phase);
  const showPrompt = ['prompt', 'input', 'complete'].includes(phase);
  const showInput = ['input', 'complete'].includes(phase);
  const isComplete = phase === 'complete';

  const isValidPhone = phoneNumber.length >= 7;

  return (
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
            isComplete && 'animate-pulse-subtle'
          )}
          style={{
            boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
            border: '1px solid #F8F8F8',
          }}
        />
      </div>

      {/* Greeting Text - Left aligned */}
      {showGreeting && (
        <div
          className={cn(
            'text-left transition-opacity duration-300 mb-2',
            showGreeting ? 'opacity-100' : 'opacity-0'
          )}
        >
          <h1
            style={{
              ...typography.heading.sm,
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

      {/* Prompt Text - Left aligned */}
      {showPrompt && (
        <div
          className={cn(
            'text-left transition-opacity duration-300 mb-10',
            showPrompt ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p
            style={{
              ...typography.paragraph.sm,
              color: colors.grey[700],
            }}
          >
            <AnimatedWordText
              text={promptText}
              baseDelay={0}
              wordDelay={100}
              fadeDuration={180}
            />
          </p>
        </div>
      )}

      {/* Phone Input Section */}
      {showInput && (
        <form
          onSubmit={handleSubmit}
          className={cn(
            'w-full transition-opacity duration-300',
            showInput ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Phone Input with Country Code */}
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
                <span
                  style={{
                    ...typography.paragraph.md,
                    color: colors.grey[950],
                  }}
                >
                  {selectedCountry.dialCode}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isDropdownOpen && 'rotate-180'
                  )}
                  style={{ color: colors.grey[500] }}
                />
              </button>

              {/* Dropdown Menu */}
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
                      className={cn(
                        'w-full px-4 py-3 flex items-center gap-3 text-left',
                        'hover:bg-gray-50 transition-colors'
                      )}
                      style={{
                        backgroundColor: selectedCountry.code === country.code
                          ? colors.grey[100]
                          : 'transparent',
                      }}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span
                        style={{
                          ...typography.paragraph.sm,
                          color: colors.grey[950],
                          flex: 1,
                        }}
                      >
                        {country.name}
                      </span>
                      <span
                        style={{
                          ...typography.paragraph.sm,
                          color: colors.grey[500],
                        }}
                      >
                        {country.dialCode}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              ref={inputRef}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone Number"
              autoComplete="tel"
              className="flex-1 h-full px-4 outline-none"
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '16px',
                color: colors.grey[950],
                fontFamily: typography.paragraph.md.fontFamily,
                fontWeight: 400,
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
              }}
            />
          </div>

          {/* Country of Residence - Editable Dropdown */}
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
                    <span
                      style={{
                        fontSize: '12px',
                        color: colors.grey[500],
                        fontFamily: typography.paragraph.sm.fontFamily,
                      }}
                    >
                      Country of Residence
                    </span>
                    <span
                      style={{
                        ...typography.label.sm,
                        color: colors.grey[950],
                      }}
                    >
                      {residenceCountry.name}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isResidenceDropdownOpen && 'rotate-180'
                  )}
                  style={{ color: colors.grey[500] }}
                />
              </button>

              {/* Residence Dropdown Menu */}
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
                      onClick={() => handleResidenceSelect(country)}
                      className={cn(
                        'w-full px-4 py-3 flex items-center gap-3 text-left',
                        'hover:bg-gray-50 transition-colors'
                      )}
                      style={{
                        backgroundColor: residenceCountry.code === country.code
                          ? colors.grey[100]
                          : 'transparent',
                      }}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span
                        style={{
                          ...typography.paragraph.sm,
                          color: colors.grey[950],
                          flex: 1,
                        }}
                      >
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
            disabled={!isValidPhone || isSubmitting}
            className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
            style={{
              ...(isValidPhone ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
              color: '#F4F3F5',
              cursor: isValidPhone && !isSubmitting ? 'pointer' : 'not-allowed',
              ...typography.label.md,
            }}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Continue'
            )}
          </button>

          {/* SMS Consent */}
          <p
            className="text-left mt-4"
            style={{
              ...typography.paragraph.xs,
              color: colors.grey[500],
            }}
          >
            By continuing, you agree to receive SMS messages from Goodfin.
          </p>
        </form>
      )}
    </div>
  );
}

export default AnimatedOnboardingFlow;
