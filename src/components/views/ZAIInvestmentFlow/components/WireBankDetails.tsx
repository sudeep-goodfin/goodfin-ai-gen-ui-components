import { useState, useEffect } from 'react';
import { Check, Copy, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type TransferType = 'domestic' | 'international';

interface WireBankDetailsProps {
  investmentAmount: number;
  onComplete: () => void;
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

export function WireBankDetails({ investmentAmount, onComplete }: WireBankDetailsProps) {
  const [transferType, setTransferType] = useState<TransferType>('domestic');
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Funding source confirmation state
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);
  const [bankName, setBankName] = useState('');
  const [bankLocation, setBankLocation] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountHolderDropdown, setShowAccountHolderDropdown] = useState(false);

  // Animate overlay when shown
  useEffect(() => {
    if (showConfirmOverlay) {
      const timer = setTimeout(() => {
        setOverlayAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOverlayAnimated(false);
    }
  }, [showConfirmOverlay]);

  const isFormValid = bankName.trim() && bankLocation && accountHolder;

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
    setShowConfirmOverlay(true);
  };

  const handleConfirmFunding = () => {
    if (!isFormValid) return;
    onComplete();
  };

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
          'group/row flex items-start justify-between py-1.5 px-2 -mx-2 rounded-md cursor-pointer',
          'transition-all duration-500 ease-out',
          isCopied ? 'bg-[#dcf5dc]' : 'bg-transparent hover:bg-white/60'
        )}
        onClick={() => handleCopy(value, fieldKey)}
      >
        <div className="flex flex-col gap-0.5 flex-1 mr-2">
          <span
            className="text-[10px] leading-[14px] text-[#8a7f91] uppercase tracking-[0.5px] font-semibold"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {label}
          </span>
          <span
            className="text-[13px] leading-[18px] text-[#373338]"
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
            'p-1.5 rounded-md transition-all flex-shrink-0',
            isCopied
              ? 'bg-[#c5ecc5] opacity-100'
              : 'opacity-0 group-hover/row:opacity-100 hover:bg-[#e0dce0]'
          )}
        >
          {isCopied ? (
            <Check className="w-3.5 h-3.5 text-[#3a7a3a]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#685f6a]" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="space-y-3">
        {/* Amount Display */}
        <div className="text-center py-2">
          <p
            className="text-[12px] text-[#7f7582] mb-0.5"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            Transfer Amount
          </p>
          <p
            className="text-[24px] text-[#373338]"
            style={{ fontFamily: 'Test Signifier, serif' }}
          >
            ${investmentAmount.toLocaleString()}
          </p>
        </div>

        {/* Transfer Type Dropdown */}
        <div className="relative">
          <label
            className="block text-[11px] text-[#685f6a] font-medium mb-1.5"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            Are you sending funds from the U.S.?
          </label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 bg-white border border-[#e0dce0] rounded-lg text-[13px] text-[#373338] hover:border-[#7f7582] transition-colors"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            <span>{transferType === 'domestic' ? 'Yes, Domestic' : 'No, International'}</span>
            <ChevronDown className={cn('w-4 h-4 text-[#7f7582] transition-transform', showDropdown && 'rotate-180')} />
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0dce0] rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setTransferType('domestic');
                    setShowDropdown(false);
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f7f8] rounded-t-lg',
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
                    'w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f7f8] rounded-b-lg',
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

        {/* Bank Details Card */}
        <div className="bg-[#eae8eb] border border-[#48424a]/30 rounded-lg p-3">
          {/* Processing Badge */}
          <div className="bg-[#9b929e] px-1.5 py-0.5 rounded self-start inline-block mb-3">
            <span
              className="text-[9px] text-[#f0eef0] uppercase tracking-[0.3px] font-semibold"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Same-day processing before 3:00 PM PT
            </span>
          </div>

          {transferType === 'domestic' ? (
            /* Domestic Bank Details */
            <div className="flex flex-col gap-0">
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
            /* International Bank Details - Step by Step */
            <div className="flex flex-col gap-4">
              {/* Step 1: Beneficiary Bank Information */}
              <div className="flex flex-col gap-0">
                <div className="py-1 mb-0.5">
                  <p
                    className="text-[12px] text-[#373338] uppercase font-medium"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Step 1
                  </p>
                  <p
                    className="text-[10px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Enter beneficiary bank information
                  </p>
                </div>
                <CopyField
                  label="SWIFT/BIC Code"
                  value={INTERNATIONAL_BANK_DETAILS.swiftBicCode}
                  fieldKey="swiftBicCode"
                />
                <CopyField
                  label="Routing Number (if asked)"
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

              {/* Step 2: Beneficiary Information */}
              <div className="flex flex-col gap-0">
                <div className="py-1 mb-0.5">
                  <p
                    className="text-[12px] text-[#373338] uppercase font-medium"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Step 2
                  </p>
                  <p
                    className="text-[10px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Enter beneficiary information
                  </p>
                </div>
                <CopyField
                  label="Beneficiary Name"
                  value={INTERNATIONAL_BANK_DETAILS.beneficiaryName}
                  fieldKey="beneficiaryName"
                />
                <CopyField
                  label="Account Number"
                  value={INTERNATIONAL_BANK_DETAILS.beneficiaryAccountNumber}
                  fieldKey="beneficiaryAccountNumber"
                />
                <CopyField
                  label="Beneficiary Address"
                  value={INTERNATIONAL_BANK_DETAILS.beneficiaryAddress}
                  fieldKey="beneficiaryAddress"
                />
              </div>

              {/* Step 3: Memo Content */}
              <div className="flex flex-col gap-0">
                <div className="py-1 mb-0.5">
                  <p
                    className="text-[12px] text-[#373338] uppercase font-medium"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Step 3
                  </p>
                  <p
                    className="text-[10px] text-[#685f6a]"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    Enter memo content
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
          className="w-full py-2.5 bg-[#373338] text-white text-[13px] font-medium rounded-lg hover:bg-[#29272a] transition-colors"
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          I've initiated the bank transfer
        </button>
      </div>

      {/* Funding Source Confirmation Overlay */}
      {showConfirmOverlay && (
        <div
          className={cn(
            'absolute inset-0 bg-white rounded-lg overflow-hidden',
            'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            overlayAnimated
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          )}
        >
          <div className="flex flex-col h-full p-3 overflow-y-auto">
            {/* Title */}
            <div className="mb-3">
              <p
                className="text-[14px] text-[#373338] font-medium"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Confirm your funding source
              </p>
              <p
                className="text-[11px] text-[#685f6a] mt-0.5"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Please provide details about the bank you're sending from.
              </p>
            </div>

            {/* Bank Name Input */}
            <div className="mb-3">
              <label
                className="block text-[10px] text-[#685f6a] uppercase tracking-wide mb-1"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Bank Name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Chase, Bank of America"
                className="w-full px-3 py-2 bg-[#f7f7f8] border border-[#d9dde9] rounded-lg text-[13px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              />
            </div>

            {/* Bank Location Dropdown */}
            <div className="mb-3 relative">
              <label
                className="block text-[10px] text-[#685f6a] uppercase tracking-wide mb-1"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Bank Location
              </label>
              <button
                onClick={() => {
                  setShowLocationDropdown(!showLocationDropdown);
                  setShowAccountHolderDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#f7f7f8] border border-[#d9dde9] rounded-lg text-[13px] hover:border-[#7f7582] transition-colors"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                <span className={bankLocation ? 'text-[#373338]' : 'text-[#a9a4ab]'}>
                  {bankLocation || 'Select country'}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[#685f6a] transition-transform',
                    showLocationDropdown && 'rotate-180'
                  )}
                />
              </button>

              {showLocationDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLocationDropdown(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-50 max-h-32 overflow-y-auto">
                    {COUNTRY_OPTIONS.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setBankLocation(country);
                          setShowLocationDropdown(false);
                        }}
                        className={cn(
                          'w-full px-3 py-2 text-left text-[12px] hover:bg-[#f7f7f8]',
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
            <div className="mb-3 relative">
              <label
                className="block text-[10px] text-[#685f6a] uppercase tracking-wide mb-1"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Account Holder Status
              </label>
              <button
                onClick={() => {
                  setShowAccountHolderDropdown(!showAccountHolderDropdown);
                  setShowLocationDropdown(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#f7f7f8] border border-[#d9dde9] rounded-lg text-[13px] hover:border-[#7f7582] transition-colors"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                <span className={accountHolder ? 'text-[#373338]' : 'text-[#a9a4ab]'}>
                  {accountHolder || 'Select status'}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[#685f6a] transition-transform',
                    showAccountHolderDropdown && 'rotate-180'
                  )}
                />
              </button>

              {showAccountHolderDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowAccountHolderDropdown(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-50">
                    {ACCOUNT_HOLDER_OPTIONS.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setAccountHolder(status);
                          setShowAccountHolderDropdown(false);
                        }}
                        className={cn(
                          'w-full px-3 py-2 text-left text-[12px] hover:bg-[#f7f7f8]',
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
            <div className="mb-4">
              <label
                className="block text-[10px] text-[#685f6a] uppercase tracking-wide mb-1"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Promo Code (Optional)
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="w-full px-3 py-2 bg-[#f7f7f8] border border-[#d9dde9] rounded-lg text-[13px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              />
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmFunding}
              disabled={!isFormValid}
              className={cn(
                'w-full py-2.5 rounded-lg text-[13px] font-medium transition-all',
                isFormValid
                  ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                  : 'bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed'
              )}
              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
            >
              Confirm and continue
            </button>

            {/* Back button */}
            <button
              onClick={() => {
                setShowConfirmOverlay(false);
                setBankName('');
                setBankLocation('');
                setAccountHolder('');
                setPromoCode('');
              }}
              className="text-[11px] text-[#7f7582] hover:text-[#373338] mt-2 transition-colors text-center"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              ← Back to bank details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
