import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Building2 } from 'lucide-react';

type Bank = {
  name: string;
  popular?: boolean;
};

const defaultBanks: Bank[] = [
  // Popular banks
  { name: 'Chase', popular: true },
  { name: 'Bank of America', popular: true },
  { name: 'Wells Fargo', popular: true },
  { name: 'Citibank', popular: true },
  { name: 'US Bank', popular: true },
  { name: 'Capital One', popular: true },
  // Other banks
  { name: 'PNC Bank' },
  { name: 'TD Bank' },
  { name: 'Truist' },
  { name: 'Goldman Sachs' },
  { name: 'Morgan Stanley' },
  { name: 'Charles Schwab' },
  { name: 'Fidelity' },
  { name: 'HSBC' },
  { name: 'Ally Bank' },
  { name: 'Discover Bank' },
  { name: 'SoFi' },
  { name: 'Marcus by Goldman Sachs' },
  { name: 'American Express' },
  { name: 'Barclays' },
  { name: 'BMO Harris' },
  { name: 'Fifth Third Bank' },
  { name: 'KeyBank' },
  { name: 'Regions Bank' },
  { name: 'Huntington Bank' },
  { name: 'M&T Bank' },
  { name: 'Citizens Bank' },
  { name: 'First Republic' },
  { name: 'Silicon Valley Bank' },
  { name: 'Synchrony Bank' },
];

type BankSearchDropdownProps = {
  banks?: Bank[];
  onSelect?: (bank: Bank) => void;
  placeholder?: string;
};

export function BankSearchDropdown({
  banks = defaultBanks,
  onSelect,
  placeholder = 'Search for your bank...',
}: BankSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter banks based on search
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group banks
  const popularBanks = filteredBanks.filter((bank) => bank.popular);
  const otherBanks = filteredBanks.filter((bank) => !bank.popular);

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

  const handleSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setIsOpen(false);
    onSelect?.(bank);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedBank) {
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
            if (selectedBank) setSelectedBank(null);
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
          {filteredBanks.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No banks found matching "{searchQuery}"
            </div>
          ) : (
            <>
              {/* Popular Banks Section */}
              {popularBanks.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/30 sticky top-0">
                    Popular Banks
                  </div>
                  {popularBanks.map((bank, index) => (
                    <button
                      key={`popular-${index}`}
                      onClick={() => handleSelect(bank)}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{bank.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Other Banks Section */}
              {otherBanks.length > 0 && (
                <div>
                  {popularBanks.length > 0 && (
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/30 sticky top-0">
                      All Banks
                    </div>
                  )}
                  {otherBanks.map((bank, index) => (
                    <button
                      key={`other-${index}`}
                      onClick={() => handleSelect(bank)}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{bank.name}</span>
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
