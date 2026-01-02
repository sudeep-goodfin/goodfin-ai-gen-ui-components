import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, Mic, ArrowUp } from 'lucide-react';
import type { CompanyData } from '../types';

interface InvestmentAmountInputProps {
  company: CompanyData;
  onClose?: () => void;
  onSubmit?: (amount: number) => void;
  onProgressClick?: () => void;
  placeholder?: string;
  className?: string;
}

export function InvestmentAmountInput({
  company,
  onClose,
  onSubmit,
  onProgressClick,
  placeholder = 'Enter Investment Amount',
  className,
}: InvestmentAmountInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const numericValue = parseFloat(inputValue.replace(/,/g, ''));
    if (!isNaN(numericValue) && numericValue > 0) {
      onSubmit?.(numericValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setInputValue('');
      return;
    }
    const numericValue = parseInt(value, 10);
    setInputValue(numericValue.toLocaleString('en-US'));
  };

  const hasValue = inputValue.trim().length > 0;

  return (
    <div
      className={cn(
        'flex flex-col items-start w-full max-w-[768px]',
        'bg-[rgba(230,228,231,0.95)] backdrop-blur-[6px]',
        'border border-[#f8f8f8]',
        'rounded-tl-[18px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[24px]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full px-4 py-3">
        {/* Left: Company avatar + Question */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-[14px] leading-[16px] text-[#29272a]"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            How much would you like to invest?
          </span>
        </div>

        {/* Right: Progress pill + Close */}
        <div className="flex items-center gap-3">
          <button
            onClick={onProgressClick}
            className="flex items-center px-2 py-1 bg-[#f7f7f8] rounded-full hover:bg-[#eae8eb] transition-colors"
          >
            <span
              className="text-[12px] leading-[16px] text-[#48424a]"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              Investment progress
            </span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[rgba(0,0,0,0.05)] transition-colors"
          >
            <X className="w-[10.67px] h-[10.67px] text-[#48424a]" />
          </button>
        </div>
      </div>

      {/* Chatbox Input */}
      <div className="w-full bg-white rounded-[24px] shadow-[-1px_1px_8px_0px_rgba(164,140,160,0.2)]">
        <div className="flex flex-col gap-6 p-4">
          {/* Text Input with dollar sign */}
          <div className="flex items-center h-6 overflow-hidden pl-2">
            <span
              className="text-[16px] leading-[20px] text-[#7f7582] mr-1"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-[16px] leading-[20px] text-[#29272a] placeholder:text-[#7f7582]"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-end justify-end gap-2">
            <button className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#f4f3f5] transition-colors">
              <Mic className="w-[18px] h-[18px] text-[#48424a]" />
            </button>

            <button
              onClick={handleSubmit}
              disabled={!hasValue}
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-2xl transition-all',
                !hasValue && 'opacity-50 cursor-not-allowed'
              )}
              style={{
                background:
                  'linear-gradient(90.43deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
              }}
            >
              <ArrowUp className="w-[18px] h-[18px] text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
