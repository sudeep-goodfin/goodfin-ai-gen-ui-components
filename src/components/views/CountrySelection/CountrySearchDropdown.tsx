import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Globe } from 'lucide-react';

type Country = {
  name: string;
  code: string;
  popular?: boolean;
};

const defaultCountries: Country[] = [
  // Popular countries
  { name: 'United States', code: 'US', popular: true },
  { name: 'United Kingdom', code: 'GB', popular: true },
  { name: 'Canada', code: 'CA', popular: true },
  { name: 'Singapore', code: 'SG', popular: true },
  { name: 'Australia', code: 'AU', popular: true },
  { name: 'Germany', code: 'DE', popular: true },
  // Other countries
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'China', code: 'CN' },
  { name: 'India', code: 'IN' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Ireland', code: 'IE' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Israel', code: 'IL' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Austria', code: 'AT' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Poland', code: 'PL' },
];

type CountrySearchDropdownProps = {
  countries?: Country[];
  onSelect?: (country: Country) => void;
  placeholder?: string;
};

export function CountrySearchDropdown({
  countries = defaultCountries,
  onSelect,
  placeholder = 'Search for your country...',
}: CountrySearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group countries
  const popularCountries = filteredCountries.filter((country) => country.popular);
  const otherCountries = filteredCountries.filter((country) => !country.popular);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchQuery(country.name);
    setIsOpen(false);
    onSelect?.(country);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedCountry) {
      setSearchQuery('');
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 px-3 py-3 rounded-xl border bg-background transition-all ${
          isOpen ? 'border-accent ring-2 ring-accent/20' : 'border-border'
        }`}
      >
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            if (selectedCountry) setSelectedCountry(null);
          }}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
        />
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform cursor-pointer ${
            isOpen ? 'rotate-180' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No countries found matching "{searchQuery}"
            </div>
          ) : (
            <>
              {/* Popular Countries Section */}
              {popularCountries.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/30 sticky top-0">
                    Popular Countries
                  </div>
                  {popularCountries.map((country, index) => (
                    <button
                      key={`popular-${index}`}
                      onClick={() => handleSelect(country)}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Other Countries Section */}
              {otherCountries.length > 0 && (
                <div>
                  {popularCountries.length > 0 && (
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/30 sticky top-0">
                      All Countries
                    </div>
                  )}
                  {otherCountries.map((country, index) => (
                    <button
                      key={`other-${index}`}
                      onClick={() => handleSelect(country)}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
