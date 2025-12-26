import { useState, useEffect } from 'react';
import { X, ArrowLeft, Check, Loader2, ChevronDown, Copy, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DealInfo } from '../types';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

type TransferStep = 'details' | 'confirm' | 'processing' | 'success';
type TransferType = 'domestic' | 'international';

interface TransferModalProps {
  isOpen: boolean;
  deal: DealInfo;
  investmentAmount: number;
  onClose: () => void;
  onBack?: () => void;
  onComplete: (amount: number) => void;
}

// Domestic bank details
const DOMESTIC_BANK_DETAILS = {
  accountNumber: '9800000000',
  routingNumber: '084009519',
  referenceId: 'GF-2024-INV-78432',
  recipientName: 'Goodfin Capital LLC',
  recipientAddress: '123 Financial District, Suite 400, San Francisco, CA 94111',
  memoContent: 'Investment - GF-2024-INV-78432',
};

// International bank details
const INTERNATIONAL_BANK_DETAILS = {
  // Step 1: Beneficiary bank information
  swiftBicCode: 'CLNOUS66MER',
  routingNumber: '121145433',
  bankName: 'Column National Association',
  bankAddress: '1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129 USA',
  // Step 2: Beneficiary information
  beneficiaryName: 'GoodFin, Inc.',
  beneficiaryAccountNumber: '187418829466566',
  beneficiaryAddress: '16192 Coastal Highway, Lewes, DE 19958',
  // Step 3: Memo content
  uniqueReferenceId: 'TF4GN',
};

const COUNTRY_OPTIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Other',
];

const ACCOUNT_HOLDER_OPTIONS = [
  'I am the account holder',
  'Joint account holder',
  'Business account',
];

const PROCESSING_TEXTS = [
  'Initiating transfer...',
  'Verifying details...',
  'Processing...',
  'Almost there...',
];

export function TransferModal({
  isOpen,
  deal,
  investmentAmount,
  onClose,
  onBack,
  onComplete,
}: TransferModalProps) {
  const [step, setStep] = useState<TransferStep>('details');
  const [transferType, setTransferType] = useState<TransferType>('domestic');
  const [processingTextIndex, setProcessingTextIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Funding source form state
  const [bankName, setBankName] = useState('');
  const [bankLocation, setBankLocation] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountHolderDropdown, setShowAccountHolderDropdown] = useState(false);

  // Form validation
  const isFormValid = bankName.trim() && bankLocation && accountHolder;

  // Handle copy to clipboard
  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleInitiateTransfer = () => {
    setStep('confirm');
  };

  const handleConfirmFunding = () => {
    if (!isFormValid) return;
    setStep('processing');
  };

  // Cycle through processing texts
  useEffect(() => {
    if (step !== 'processing') return;

    const interval = setInterval(() => {
      setProcessingTextIndex((prev) => (prev + 1) % PROCESSING_TEXTS.length);
    }, 600);

    // Auto-advance to success after processing
    const timeout = setTimeout(() => {
      setStep('success');
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [step]);

  // Auto-close on success
  useEffect(() => {
    if (step !== 'success') return;

    const timeout = setTimeout(() => {
      onComplete(investmentAmount);
      // Reset state
      setStep('details');
      setBankName('');
      setBankLocation('');
      setAccountHolder('');
      setPromoCode('');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [step, onComplete, investmentAmount]);

  if (!isOpen) return null;

  const isProcessingOrSuccess = step === 'processing' || step === 'success';

  // Copy field component with click-to-copy behavior
  const CopyField = ({
    label,
    value,
    fieldKey,
  }: {
    label: string;
    value: string;
    fieldKey: string;
  }) => {
    const isCopied = copiedField === fieldKey;

    return (
      <div
        className={cn(
          'group/row flex items-start justify-between py-2 px-3 -mx-3 rounded-lg cursor-pointer',
          'transition-all duration-500 ease-out',
          isCopied ? 'bg-[#dcf5dc]' : 'bg-transparent hover:bg-[#f7f7f8]'
        )}
        onClick={() => handleCopy(value, fieldKey)}
      >
        <div className="flex flex-col gap-0.5 flex-1 mr-3">
          <span
            className="text-[11px] leading-[16px] text-[#8a7f91] uppercase tracking-[0.6px] font-semibold"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {label}
          </span>
          <span
            className="text-[14px] leading-[20px] text-[#373338]"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {value}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(value, fieldKey);
          }}
          className={cn(
            'p-2 rounded-lg transition-all flex-shrink-0',
            isCopied
              ? 'bg-[#c5ecc5] opacity-100'
              : 'opacity-0 group-hover/row:opacity-100 hover:bg-[#e0dce0]'
          )}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-[#3a7a3a]" />
          ) : (
            <Copy className="w-4 h-4 text-[#685f6a]" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isProcessingOrSuccess ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0dce0] flex-shrink-0">
          {onBack && !isProcessingOrSuccess && step === 'details' ? (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#7f7582]" />
            </button>
          ) : step === 'confirm' ? (
            <button
              onClick={() => setStep('details')}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#7f7582]" />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <h3
            className="text-[16px] font-medium text-[#373338]"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            {step === 'details' ? 'Receiving Bank Details' : step === 'confirm' ? 'Confirm Funding Source' : ''}
          </h3>
          {!isProcessingOrSuccess && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <X className="w-5 h-5 text-[#7f7582]" />
            </button>
          )}
          {isProcessingOrSuccess && <div className="w-8" />}
        </div>

        {/* Scrollable Content */}
        <ScrollAreaPrimitive.Root className="flex-1 overflow-hidden">
          <ScrollAreaPrimitive.Viewport className="h-full w-full">
            <div className="p-5">
              {step === 'details' && (
                <div>
                  {/* Amount Header */}
                  <div className="text-center mb-5">
                    <p
                      className="text-[14px] text-[#7f7582] mb-1"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Transfer Amount
                    </p>
                    <p
                      className="text-[32px] text-[#373338]"
                      style={{ fontFamily: 'Test Signifier, serif' }}
                    >
                      ${investmentAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[14px] text-center text-[#7f7582] mb-5 leading-relaxed"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    We'll reserve your allocation once your wire is received and confirmed.
                  </p>

                  {/* Transfer Type Dropdown */}
                  <div className="mb-5">
                    <label
                      className="block text-[13px] text-[#373338] font-medium mb-2"
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Are you sending funds from the U.S.?
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[14px] text-[#373338] hover:border-[#7f7582] transition-colors"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      >
                        <span>{transferType === 'domestic' ? 'Yes, Domestic' : 'No, International'}</span>
                        <ChevronDown className={cn('w-5 h-5 text-[#7f7582] transition-transform', showDropdown && 'rotate-180')} />
                      </button>

                      {showDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0dce0] rounded-xl shadow-lg z-50">
                            <button
                              onClick={() => {
                                setTransferType('domestic');
                                setShowDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-3 text-left text-[14px] hover:bg-[#f7f7f8] rounded-t-xl',
                                transferType === 'domestic' && 'bg-[#f7f7f8]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              Yes, Domestic
                            </button>
                            <button
                              onClick={() => {
                                setTransferType('international');
                                setShowDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-3 text-left text-[14px] hover:bg-[#f7f7f8] rounded-b-xl',
                                transferType === 'international' && 'bg-[#f7f7f8]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              No, International
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bank Details Card */}
                  <div className="bg-[#f7f7f8] border border-[#48424a] rounded-xl p-4 mb-5">
                    {transferType === 'domestic' ? (
                      /* Domestic Bank Details */
                      <div className="flex flex-col gap-0.5">
                        <CopyField
                          label="Account Number"
                          value={DOMESTIC_BANK_DETAILS.accountNumber}
                          fieldKey="accountNumber"
                        />
                        <CopyField
                          label="Routing Number"
                          value={DOMESTIC_BANK_DETAILS.routingNumber}
                          fieldKey="routingNumber"
                        />
                        <CopyField
                          label="Reference ID"
                          value={DOMESTIC_BANK_DETAILS.referenceId}
                          fieldKey="referenceId"
                        />
                        <CopyField
                          label="Recipient Name"
                          value={DOMESTIC_BANK_DETAILS.recipientName}
                          fieldKey="recipientName"
                        />
                        <CopyField
                          label="Recipient Address"
                          value={DOMESTIC_BANK_DETAILS.recipientAddress}
                          fieldKey="recipientAddress"
                        />
                        <CopyField
                          label="Memo / Reference"
                          value={DOMESTIC_BANK_DETAILS.memoContent}
                          fieldKey="memoContent"
                        />
                      </div>
                    ) : (
                      /* International Bank Details */
                      <div className="flex flex-col gap-5">
                        {/* Beneficiary Bank Information */}
                        <div className="flex flex-col gap-0.5">
                          <div className="py-1.5 mb-1">
                            <p
                              className="text-[12px] text-[#685f6a]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              Beneficiary bank information
                            </p>
                          </div>
                          <CopyField
                            label="SWIFT/BIC Code"
                            value={INTERNATIONAL_BANK_DETAILS.swiftBicCode}
                            fieldKey="swiftBicCode"
                          />
                          <CopyField
                            label="SWIFT ABA/Routing Number (if asked)"
                            value={INTERNATIONAL_BANK_DETAILS.routingNumber}
                            fieldKey="intlRoutingNumber"
                          />
                          <CopyField
                            label="Bank Name"
                            value={INTERNATIONAL_BANK_DETAILS.bankName}
                            fieldKey="intlBankName"
                          />
                          <CopyField
                            label="Bank Address"
                            value={INTERNATIONAL_BANK_DETAILS.bankAddress}
                            fieldKey="bankAddress"
                          />
                        </div>

                        {/* Beneficiary Information */}
                        <div className="flex flex-col gap-0.5">
                          <div className="py-1.5 mb-1">
                            <p
                              className="text-[12px] text-[#685f6a]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              Beneficiary information
                            </p>
                          </div>
                          <CopyField
                            label="Beneficiary Name"
                            value={INTERNATIONAL_BANK_DETAILS.beneficiaryName}
                            fieldKey="beneficiaryName"
                          />
                          <CopyField
                            label="Beneficiary Account Number"
                            value={INTERNATIONAL_BANK_DETAILS.beneficiaryAccountNumber}
                            fieldKey="beneficiaryAccountNumber"
                          />
                          <CopyField
                            label="Beneficiary Address"
                            value={INTERNATIONAL_BANK_DETAILS.beneficiaryAddress}
                            fieldKey="beneficiaryAddress"
                          />
                        </div>

                        {/* Memo Content */}
                        <div className="flex flex-col gap-0.5">
                          <div className="py-1.5 mb-1">
                            <p
                              className="text-[12px] text-[#685f6a]"
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              Memo content
                            </p>
                          </div>
                          <CopyField
                            label="Unique Reference ID"
                            value={INTERNATIONAL_BANK_DETAILS.uniqueReferenceId}
                            fieldKey="uniqueReferenceId"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleInitiateTransfer}
                    className="w-full py-3.5 bg-[#373338] text-white text-[15px] font-medium rounded-xl hover:bg-[#29272a] transition-colors"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    I've initiated the bank transfer
                  </button>
                </div>
              )}

              {step === 'confirm' && (
                <div>
                  {/* Title */}
                  <div className="mb-5">
                    <p
                      className="text-[18px] text-[#373338] mb-1"
                      style={{ fontFamily: 'Test Signifier, serif' }}
                    >
                      Confirm your funding source
                    </p>
                    <p
                      className="text-[14px] text-[#685f6a]"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Please provide details about the bank you're sending from.
                    </p>
                  </div>

                  {/* Bank Name Input */}
                  <div className="mb-4">
                    <label
                      className="block text-[12px] text-[#685f6a] uppercase tracking-wide mb-2"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Chase, Bank of America"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>

                  {/* Bank Location Dropdown */}
                  <div className="mb-4 relative">
                    <label
                      className="block text-[12px] text-[#685f6a] uppercase tracking-wide mb-2"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Bank Location
                    </label>
                    <button
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowAccountHolderDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-xl text-[15px] hover:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <span className={bankLocation ? 'text-[#373338]' : 'text-[#a9a4ab]'}>
                        {bankLocation || 'Select country'}
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#685f6a] transition-transform',
                          showLocationDropdown && 'rotate-180'
                        )}
                      />
                    </button>

                    {showLocationDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowLocationDropdown(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                          {COUNTRY_OPTIONS.map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setBankLocation(country);
                                setShowLocationDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-3 text-left text-[14px] hover:bg-[#f7f7f8]',
                                bankLocation === country && 'bg-[#f7f7f8]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Account Holder Dropdown */}
                  <div className="mb-4 relative">
                    <label
                      className="block text-[12px] text-[#685f6a] uppercase tracking-wide mb-2"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Account Holder Status
                    </label>
                    <button
                      onClick={() => {
                        setShowAccountHolderDropdown(!showAccountHolderDropdown);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#d9dde9] rounded-xl text-[15px] hover:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <span className={accountHolder ? 'text-[#373338]' : 'text-[#a9a4ab]'}>
                        {accountHolder || 'Select status'}
                      </span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#685f6a] transition-transform',
                          showAccountHolderDropdown && 'rotate-180'
                        )}
                      />
                    </button>

                    {showAccountHolderDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowAccountHolderDropdown(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-xl shadow-lg z-50">
                          {ACCOUNT_HOLDER_OPTIONS.map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setAccountHolder(status);
                                setShowAccountHolderDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-3 text-left text-[14px] hover:bg-[#f7f7f8]',
                                accountHolder === status && 'bg-[#f7f7f8]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Promo Code Input (Optional) */}
                  <div className="mb-6">
                    <label
                      className="block text-[12px] text-[#685f6a] uppercase tracking-wide mb-2"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      Promo Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full px-4 py-3 bg-white border border-[#d9dde9] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmFunding}
                    disabled={!isFormValid}
                    className={cn(
                      'w-full py-3.5 text-[15px] font-medium rounded-xl transition-colors',
                      isFormValid
                        ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                        : 'bg-[#e0dce0] text-[#a09a9f] cursor-not-allowed'
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Confirm and continue
                  </button>
                </div>
              )}

              {step === 'processing' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[#373338] animate-spin" />
                  </div>
                  <p
                    className="text-[14px] text-[#7f7582]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {PROCESSING_TEXTS[processingTextIndex]}
                  </p>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5a8a5a] flex items-center justify-center animate-[scale-in_0.4s_ease-out]">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="text-[18px] font-medium text-[#373338] mb-2"
                    style={{ fontFamily: 'Test Signifier, serif' }}
                  >
                    Transfer confirmed!
                  </h3>
                  <p
                    className="text-[14px] text-[#7f7582] mb-4"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Your investment of ${investmentAmount.toLocaleString()} has been submitted.
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#f7f7f8] rounded-lg">
                    <p className="text-[11px] text-[#7f7582] uppercase tracking-wide">Reference</p>
                    <p className="text-[14px] font-mono text-[#373338]">
                      {transferType === 'domestic'
                        ? DOMESTIC_BANK_DETAILS.referenceId
                        : INTERNATIONAL_BANK_DETAILS.uniqueReferenceId}
                    </p>
                  </div>
                  <p className="text-[12px] text-[#a09a9f] mt-4">
                    We'll email you when the transfer is complete.
                  </p>
                </div>
              )}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            orientation="vertical"
            className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors hover:bg-black/5"
          >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[#d0cdd2] hover:bg-[#beb9c0] transition-colors" />
          </ScrollAreaPrimitive.Scrollbar>
        </ScrollAreaPrimitive.Root>
      </div>

      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
