import { useState } from 'react';
import { Check, Copy, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type TransferType = 'domestic' | 'international';
type WireStep = 'details' | 'confirm';

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
  swiftBicCode: 'CLNOUS66MER',
  routingNumber: '121145433',
  bankName: 'Column National Association',
  bankAddress: '1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129 USA',
  beneficiaryName: 'GoodFin, Inc.',
  beneficiaryAccountNumber: '187418829466566',
  beneficiaryAddress: '16192 Coastal Highway, Lewes, DE 19958',
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
  const [wireStep, setWireStep] = useState<WireStep>('details');
  const [transferType, setTransferType] = useState<TransferType>('domestic');
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Funding source confirmation state
  const [bankName, setBankName] = useState('');
  const [bankLocation, setBankLocation] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAccountHolderDropdown, setShowAccountHolderDropdown] = useState(false);

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

  const handleCopyAll = async () => {
    let allDetails = '';

    if (transferType === 'domestic') {
      allDetails = `Account Number: ${DOMESTIC_BANK_DETAILS.accountNumber}
Routing Number: ${DOMESTIC_BANK_DETAILS.routingNumber}
Reference ID: ${DOMESTIC_BANK_DETAILS.referenceId}
Recipient Name: ${DOMESTIC_BANK_DETAILS.recipientName}
Recipient Address: ${DOMESTIC_BANK_DETAILS.recipientAddress}
Memo / Reference: ${DOMESTIC_BANK_DETAILS.memoContent}`;
    } else {
      allDetails = `SWIFT/BIC Code: ${INTERNATIONAL_BANK_DETAILS.swiftBicCode}
Routing Number: ${INTERNATIONAL_BANK_DETAILS.routingNumber}
Bank Name: ${INTERNATIONAL_BANK_DETAILS.bankName}
Bank Address: ${INTERNATIONAL_BANK_DETAILS.bankAddress}
Beneficiary Name: ${INTERNATIONAL_BANK_DETAILS.beneficiaryName}
Account Number: ${INTERNATIONAL_BANK_DETAILS.beneficiaryAccountNumber}
Beneficiary Address: ${INTERNATIONAL_BANK_DETAILS.beneficiaryAddress}
Reference ID: ${INTERNATIONAL_BANK_DETAILS.uniqueReferenceId}`;
    }

    try {
      await navigator.clipboard.writeText(allDetails);
      setCopiedField('all');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleConfirmFunding = () => {
    if (!isFormValid) return;
    onComplete();
  };

  // Copy field component
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
    <div className="space-y-3">
      {/* Block 1: Bank Details */}
      {wireStep === 'details' && (
        <>
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
            {/* Header with Copy All */}
            <div className="flex items-center justify-end mb-3">
              <button
                onClick={handleCopyAll}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all',
                  copiedField === 'all'
                    ? 'bg-[#c5ecc5] text-[#3a7a3a]'
                    : 'bg-white/60 text-[#685f6a] hover:bg-white/80 border border-[#d0cdd2]'
                )}
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy All
                  </>
                )}
              </button>
            </div>

            {transferType === 'domestic' ? (
              <div className="flex flex-col gap-0">
                <CopyField label="Account Number" value={DOMESTIC_BANK_DETAILS.accountNumber} fieldKey="accountNumber" />
                <CopyField label="Routing Number" value={DOMESTIC_BANK_DETAILS.routingNumber} fieldKey="routingNumber" />
                <CopyField label="Reference ID" value={DOMESTIC_BANK_DETAILS.referenceId} fieldKey="referenceId" />
                <CopyField label="Recipient Name" value={DOMESTIC_BANK_DETAILS.recipientName} fieldKey="recipientName" />
                <CopyField label="Recipient Address" value={DOMESTIC_BANK_DETAILS.recipientAddress} fieldKey="recipientAddress" />
                <CopyField label="Memo / Reference" value={DOMESTIC_BANK_DETAILS.memoContent} fieldKey="memoContent" />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Beneficiary Bank Information */}
                <div className="flex flex-col gap-0">
                  <div className="py-1 mb-0.5">
                    <p className="text-[10px] text-[#685f6a]" style={{ fontFamily: 'Soehne, sans-serif' }}>Beneficiary bank information</p>
                  </div>
                  <CopyField label="SWIFT/BIC Code" value={INTERNATIONAL_BANK_DETAILS.swiftBicCode} fieldKey="swiftBicCode" />
                  <CopyField label="Routing Number (if asked)" value={INTERNATIONAL_BANK_DETAILS.routingNumber} fieldKey="intlRoutingNumber" />
                  <CopyField label="Bank Name" value={INTERNATIONAL_BANK_DETAILS.bankName} fieldKey="intlBankName" />
                  <CopyField label="Bank Address" value={INTERNATIONAL_BANK_DETAILS.bankAddress} fieldKey="bankAddress" />
                </div>

                {/* Beneficiary Information */}
                <div className="flex flex-col gap-0">
                  <div className="py-1 mb-0.5">
                    <p className="text-[10px] text-[#685f6a]" style={{ fontFamily: 'Soehne, sans-serif' }}>Beneficiary information</p>
                  </div>
                  <CopyField label="Beneficiary Name" value={INTERNATIONAL_BANK_DETAILS.beneficiaryName} fieldKey="beneficiaryName" />
                  <CopyField label="Account Number" value={INTERNATIONAL_BANK_DETAILS.beneficiaryAccountNumber} fieldKey="beneficiaryAccountNumber" />
                  <CopyField label="Beneficiary Address" value={INTERNATIONAL_BANK_DETAILS.beneficiaryAddress} fieldKey="beneficiaryAddress" />
                </div>

                {/* Memo Content */}
                <div className="flex flex-col gap-0">
                  <div className="py-1 mb-0.5">
                    <p className="text-[10px] text-[#685f6a]" style={{ fontFamily: 'Soehne, sans-serif' }}>Memo content</p>
                  </div>
                  <CopyField label="Unique Reference ID" value={INTERNATIONAL_BANK_DETAILS.uniqueReferenceId} fieldKey="uniqueReferenceId" />
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setWireStep('confirm')}
            className="w-full py-2.5 bg-[#373338] text-white text-[13px] font-medium rounded-lg hover:bg-[#29272a] transition-colors"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            I've initiated the bank transfer
          </button>
        </>
      )}

      {/* Block 2: Confirm Funding Source */}
      {wireStep === 'confirm' && (
        <>
          {/* Title */}
          <div className="mb-1">
            <p
              className="text-[15px] text-[#373338] font-medium"
              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
            >
              Confirm your funding source
            </p>
            <p
              className="text-[12px] text-[#685f6a] mt-0.5"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              Please provide details about the bank you're sending from.
            </p>
          </div>

          {/* Bank Name Input */}
          <div>
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
              className="w-full px-3 py-2.5 bg-white border border-[#d9dde9] rounded-lg text-[13px] text-[#373338] placeholder:text-[#a9a4ab] outline-none focus:border-[#7f7582] transition-colors"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            />
          </div>

          {/* Bank Location Dropdown */}
          <div className="relative">
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
              className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-[#d9dde9] rounded-lg text-[13px] hover:border-[#7f7582] transition-colors"
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
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dde9] rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
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
          <div className="relative">
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
              className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-[#d9dde9] rounded-lg text-[13px] hover:border-[#7f7582] transition-colors"
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

          {/* Confirm Button */}
          <button
            onClick={handleConfirmFunding}
            disabled={!isFormValid}
            className={cn(
              'w-full py-2.5 rounded-lg text-[13px] font-medium transition-all mt-1',
              isFormValid
                ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                : 'bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed'
            )}
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            Confirm and continue
          </button>

          {/* Back link */}
          <button
            onClick={() => setWireStep('details')}
            className="w-full text-[11px] text-[#7f7582] hover:text-[#373338] transition-colors text-center"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            ← Back to bank details
          </button>
        </>
      )}
    </div>
  );
}
