import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';

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

type PhoneStepProps = {
  firstName: string;
  onSubmit: (data: {
    phoneNumber: string;
    country: string;
  }) => void;
  onBack: () => void;
  isLoading?: boolean;
};

/**
 * PhoneStep Component
 *
 * Asks for phone number with country code and country of residence.
 */
export function PhoneStep({ firstName, onSubmit, onBack, isLoading = false }: PhoneStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [residenceCountry, setResidenceCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResidenceDropdownOpen, setIsResidenceDropdownOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const residenceDropdownRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  // Handle phone number input - only digits
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  }, []);

  // Handle country selection (phone code) - also updates residence as suggestion
  const handleCountrySelect = useCallback((country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setResidenceCountry(country);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  }, []);

  // Handle residence country selection
  const handleResidenceSelect = useCallback((country: typeof COUNTRIES[0]) => {
    setResidenceCountry(country);
    setIsResidenceDropdownOpen(false);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm) {
      const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;
      onSubmit({
        phoneNumber: fullPhoneNumber,
        country: residenceCountry.name,
      });
    }
  };

  const isValidForm = phoneNumber.length >= 7;

  return (
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

      {/* Greeting Text */}
      <div className="text-left mb-4">
        <h1
          style={{
            fontFamily: typography.heading.md.fontFamily,
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.grey[950],
          }}
        >
          Nice to meet you, {firstName}!
        </h1>
      </div>

      {/* Description Text */}
      <div className="text-left mb-8">
        <p
          style={{
            ...typography.paragraph.md,
            color: colors.grey[800],
            lineHeight: 1.6,
          }}
        >
          Enter your phone number to keep your account secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
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
            disabled={isLoading}
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
          disabled={!isValidForm || isLoading}
          className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            ...(isValidForm ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
            color: '#F4F3F5',
            cursor: isValidForm && !isLoading ? 'pointer' : 'not-allowed',
            ...typography.label.md,
          }}
        >
          {isLoading ? (
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
    </div>
  );
}

export default PhoneStep;
