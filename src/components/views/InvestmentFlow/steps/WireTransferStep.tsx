import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';
import { ChevronDown, Copy, Check } from 'lucide-react';

// Wire transfer FAQ items
const WIRE_TRANSFER_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I send a wire transfer?',
    answer:
      'Log into your bank account or visit your bank in person. Use the details provided to initiate a domestic wire transfer. Make sure to include the reference ID in the memo field.',
  },
  {
    question: 'How long does a wire transfer take?',
  },
  {
    question: 'What if I send from the wrong account?',
  },
  {
    question: 'Can I use an international wire?',
  },
];

// Bank details for display
const BANK_DETAILS = {
  accountNumber: '9800000000',
  routingNumber: '084009519',
  referenceId: 'GF-2024-INV-78432',
  recipientName: 'Goodfin Capital LLC',
  recipientAddress: '123 Financial District, Suite 400, San Francisco, CA 94111',
  memoContent: 'Investment - GF-2024-INV-78432',
};

interface WireTransferStepProps {
  amount: number;
  company: CompanyData;
  onConfirm: () => void;
  onBack?: () => void;
}

export function WireTransferStep({
  amount,
  company,
  onConfirm,
}: WireTransferStepProps) {
  const [transferType, setTransferType] = useState<'domestic' | 'international'>('domestic');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFundingOverlay, setShowFundingOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Funding source form state
  const [bankName, setBankName] = useState('');
  const [bankLocation, setBankLocation] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountHolderDropdown, setShowAccountHolderDropdown] = useState(false);

  // Animate overlay when shown
  useEffect(() => {
    if (showFundingOverlay) {
      const timer = setTimeout(() => {
        setOverlayAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOverlayAnimated(false);
    }
  }, [showFundingOverlay]);

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInitiateTransfer = () => {
    setShowFundingOverlay(true);
  };

  const handleConfirmFunding = () => {
    onConfirm();
  };

  const isFormValid = bankName.trim() && bankLocation && accountHolder;

  // Format amount for display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-2.5 items-center justify-center px-2.5 py-8 w-full">
        <h1
          className="text-[42px] leading-[40px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          Send the wire from your bank
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - Wire Details Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-6 p-8 w-full rounded-lg relative overflow-hidden">
            {/* Section Header with Amount */}
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-[28px] leading-[32px] text-[#554d57]"
                  style={{ fontFamily: 'Test Signifier, serif' }}
                >
                  Receiving Bank Details
                </h2>
                <p
                  className="text-[14px] leading-[18px] text-[#685f6a]"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  Use these details to send your wire transfer.
                </p>
              </div>

              {/* Amount Badge */}
              <div className="bg-[#373338] text-white px-4 py-2 rounded-lg">
                <span
                  className="text-[18px] leading-[24px]"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  {formattedAmount}
                </span>
              </div>
            </div>

            {/* Transfer Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-lg"
              >
                <span
                  className="text-[16px] leading-[20px] text-[#373338]"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {transferType === 'domestic' ? 'Domestic Wire Transfer' : 'International Wire Transfer'}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-[#685f6a] transition-transform",
                  showDropdown && "rotate-180"
                )} />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setTransferType('domestic');
                      setShowDropdown(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                      transferType === 'domestic' && "bg-[#f7f7f8]"
                    )}
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Domestic Wire Transfer
                  </button>
                  <button
                    onClick={() => {
                      setTransferType('international');
                      setShowDropdown(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                      transferType === 'international' && "bg-[#f7f7f8]"
                    )}
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    International Wire Transfer
                  </button>
                </div>
              )}
            </div>

            {/* Bank Details List */}
            <div className="flex flex-col gap-3">
              {/* Account Number */}
              <div className="flex items-center justify-between py-3 border-b border-[#e6e4e7]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Account Number
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Fira Mono, monospace' }}
                  >
                    {BANK_DETAILS.accountNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('accountNumber', BANK_DETAILS.accountNumber)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'accountNumber' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>

              {/* Routing Number */}
              <div className="flex items-center justify-between py-3 border-b border-[#e6e4e7]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Routing Number
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Fira Mono, monospace' }}
                  >
                    {BANK_DETAILS.routingNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('routingNumber', BANK_DETAILS.routingNumber)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'routingNumber' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>

              {/* Reference ID */}
              <div className="flex items-center justify-between py-3 border-b border-[#e6e4e7]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Reference ID
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Fira Mono, monospace' }}
                  >
                    {BANK_DETAILS.referenceId}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('referenceId', BANK_DETAILS.referenceId)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'referenceId' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>

              {/* Recipient Name */}
              <div className="flex items-center justify-between py-3 border-b border-[#e6e4e7]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Recipient Name
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {BANK_DETAILS.recipientName}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('recipientName', BANK_DETAILS.recipientName)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'recipientName' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>

              {/* Recipient Address */}
              <div className="flex items-center justify-between py-3 border-b border-[#e6e4e7]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Recipient Address
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {BANK_DETAILS.recipientAddress}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('recipientAddress', BANK_DETAILS.recipientAddress)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'recipientAddress' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>

              {/* Memo Content */}
              <div className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Memo / Reference
                  </span>
                  <span
                    className="text-[16px] leading-[20px] text-[#373338]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {BANK_DETAILS.memoContent}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('memoContent', BANK_DETAILS.memoContent)}
                  className="p-2 hover:bg-[#e6e4e7] rounded-lg transition-colors"
                >
                  {copiedField === 'memoContent' ? (
                    <Check className="w-4 h-4 text-[#5a8a5a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#685f6a]" />
                  )}
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleInitiateTransfer}
              className={cn(
                'w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]',
                'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                'relative overflow-hidden'
              )}
              style={{
                fontFamily: 'Soehne Kraftig, sans-serif',
                background:
                  'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
              }}
            >
              I've initiated the bank transfer
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>

            {/* Funding Source Overlay */}
            {showFundingOverlay && (
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 bg-white border border-[#e6e4e7] rounded-t-[30px] overflow-hidden',
                  'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  overlayAnimated
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                )}
              >
                <div className="flex flex-col gap-4 px-[37px] pt-[21px] pb-6">
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <p
                      className="text-[20px] leading-[32px] text-[#373338] tracking-[-0.4px]"
                      style={{ fontFamily: 'Test Signifier, serif' }}
                    >
                      Confirm your funding source
                    </p>
                    <p
                      className="text-[14px] leading-[18px] text-[#685f6a]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Please provide details about the bank you're sending from.
                    </p>
                  </div>

                  {/* Bank Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Chase, Bank of America"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-lg text-[16px] leading-[20px] text-[#373338] placeholder:text-[#a9a4ab]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>

                  {/* Bank Location Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Bank Location
                    </label>
                    <button
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowAccountHolderDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-lg"
                    >
                      <span
                        className={cn(
                          "text-[16px] leading-[20px]",
                          bankLocation ? "text-[#373338]" : "text-[#a9a4ab]"
                        )}
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        {bankLocation || 'Select country'}
                      </span>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-[#685f6a] transition-transform",
                        showLocationDropdown && "rotate-180"
                      )} />
                    </button>

                    {showLocationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Other'].map((country) => (
                          <button
                            key={country}
                            onClick={() => {
                              setBankLocation(country);
                              setShowLocationDropdown(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                              bankLocation === country && "bg-[#f7f7f8]"
                            )}
                            style={{ fontFamily: 'Soehne, sans-serif' }}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Account Holder Dropdown */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Account Holder Status
                    </label>
                    <button
                      onClick={() => {
                        setShowAccountHolderDropdown(!showAccountHolderDropdown);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-lg"
                    >
                      <span
                        className={cn(
                          "text-[16px] leading-[20px]",
                          accountHolder ? "text-[#373338]" : "text-[#a9a4ab]"
                        )}
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        {accountHolder || 'Select status'}
                      </span>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-[#685f6a] transition-transform",
                        showAccountHolderDropdown && "rotate-180"
                      )} />
                    </button>

                    {showAccountHolderDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-10">
                        {['I am the account holder', 'Joint account holder', 'Business account'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setAccountHolder(status);
                              setShowAccountHolderDropdown(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-[16px] leading-[20px] hover:bg-[#f7f7f8]",
                              accountHolder === status && "bg-[#f7f7f8]"
                            )}
                            style={{ fontFamily: 'Soehne, sans-serif' }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Promo Code Input (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[12px] leading-[16px] text-[#685f6a] uppercase tracking-wide"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Promo Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-lg text-[16px] leading-[20px] text-[#373338] placeholder:text-[#a9a4ab]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmFunding}
                    disabled={!isFormValid}
                    className={cn(
                      'w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#f4f3f5]',
                      'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                      'relative overflow-hidden mt-2',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    style={{
                      fontFamily: 'Soehne Kraftig, sans-serif',
                      background:
                        'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
                    }}
                  >
                    Confirm and continue
                    <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={WIRE_TRANSFER_FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}
