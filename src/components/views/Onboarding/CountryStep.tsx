import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';

// Countries list with flags
const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
];

type CountryStepProps = {
  onNext: (country: string, zip?: string) => void;
  onBack: () => void;
  isLoading?: boolean;
};

export function CountryStep({ onNext, onBack, isLoading = false }: CountryStepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [zipCode, setZipCode] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    // Reset zip code when country changes
    if (country.code !== 'US') {
      setZipCode('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountry) {
      onNext(selectedCountry.name, selectedCountry.code === 'US' ? zipCode : undefined);
    }
  };

  const shouldBeDisabled = () => {
    if (!selectedCountry) return true;
    if (selectedCountry.code === 'US' && !zipCode.trim()) return true;
    return false;
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col relative">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute -left-12 top-0 p-2 hover:opacity-70 transition-opacity hidden md:block"
        disabled={isLoading}
      >
        <ArrowLeft className="w-6 h-6" style={{ color: colors.grey[900] }} />
      </button>

      {/* Header Text */}
      <h1
        className="text-left"
        style={{
          ...typography.heading.sm,
          color: colors.grey[950],
        }}
      >
        Where is your primary residence?
      </h1>
      <p
        className="text-left"
        style={{
          ...typography.paragraph.sm,
          color: colors.grey[900],
          marginTop: '8px',
        }}
      >
        This helps us comply with applicable regulations.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
        <div className="flex flex-col gap-2 mb-10">
          {/* Country Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              disabled={isLoading}
              className={cn(
                'w-full h-[64px] rounded-xl px-6',
                'flex items-center justify-between',
                'transition-all duration-200'
              )}
              style={{
                backgroundColor: colors.white,
                border: isOpen
                  ? `1px solid ${colors.grey[900]}`
                  : '1px solid transparent',
              }}
            >
              <div className="flex items-center gap-3">
                {selectedCountry ? (
                  <>
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span
                      style={{
                        ...typography.paragraph.md,
                        color: colors.grey[950],
                      }}
                    >
                      {selectedCountry.name}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      ...typography.paragraph.md,
                      color: colors.grey[500],
                    }}
                  >
                    Select a country
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                style={{ color: colors.grey[500] }}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.grey[200]}`,
                  maxHeight: '300px',
                }}
              >
                {/* Search Input */}
                <div
                  className="p-3 border-b"
                  style={{ borderColor: colors.grey[200] }}
                >
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: colors.grey[100] }}
                  >
                    <Search className="w-4 h-4" style={{ color: colors.grey[500] }} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm"
                      style={{
                        color: colors.grey[950],
                        fontFamily: typography.paragraph.sm.fontFamily,
                      }}
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="overflow-y-auto" style={{ maxHeight: '220px' }}>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleSelect(country)}
                        className={cn(
                          'w-full px-4 py-3 flex items-center justify-between',
                          'hover:bg-grey-50 transition-colors'
                        )}
                        style={{
                          backgroundColor: selectedCountry?.code === country.code
                            ? colors.grey[100]
                            : 'transparent',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{country.flag}</span>
                          <span
                            style={{
                              ...typography.paragraph.sm,
                              color: colors.grey[950],
                            }}
                          >
                            {country.name}
                          </span>
                        </div>
                        {selectedCountry?.code === country.code && (
                          <Check className="w-5 h-5" style={{ color: colors.green[600] }} />
                        )}
                      </button>
                    ))
                  ) : (
                    <div
                      className="px-4 py-6 text-center"
                      style={{ ...typography.paragraph.sm, color: colors.grey[500] }}
                    >
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ZIP Code Input - Only for US */}
          {selectedCountry?.code === 'US' && (
            <div
              className="w-full rounded-xl transition-all duration-200"
              style={{
                padding: '16px 24px',
                backgroundColor: colors.white,
                border: '1px solid rgba(186, 184, 187, 0.16)',
                height: '64px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: zipCode ? 'flex-start' : 'center',
              }}
            >
              {zipCode && (
                <label
                  style={{
                    fontSize: '12px',
                    color: colors.grey[800],
                    marginBottom: '0px',
                    lineHeight: 1.2,
                    fontFamily: typography.paragraph.sm.fontFamily,
                    fontWeight: 500,
                  }}
                >
                  Zip Code *
                </label>
              )}
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder={zipCode ? '' : 'Zip Code *'}
                disabled={isLoading}
                autoComplete="postal-code"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: zipCode ? '14px' : '16px',
                  color: colors.grey[800],
                  fontFamily: typography.paragraph.md.fontFamily,
                  fontWeight: 300,
                  marginTop: zipCode ? '2px' : '0',
                }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={shouldBeDisabled() || isLoading}
          className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            ...(!shouldBeDisabled() ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
            color: '#F4F3F5',
            cursor: !shouldBeDisabled() && !isLoading ? 'pointer' : 'not-allowed',
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
    </div>
  );
}

export default CountryStep;
