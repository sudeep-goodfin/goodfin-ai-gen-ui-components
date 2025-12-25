import { useState, useEffect } from 'react';
import { X, ArrowLeft, Check, Loader2, Clock, ChevronDown, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HorizontalStepper, type Step } from './HorizontalStepper';
import type { DealInfo } from '../types';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

type TransferStep = 'input' | 'processing' | 'success';
type TransferType = 'domestic' | 'international';

interface TransferModalProps {
  isOpen: boolean;
  deal: DealInfo;
  investmentAmount: number;
  onClose: () => void;
  onBack?: () => void;
  onComplete: (amount: number) => void;
  // Step statuses from parent
  commitCompleted?: boolean;
  signingCompleted?: boolean;
  kycCompleted?: boolean;
}

// Wire transfer details
const WIRE_DETAILS = {
  domestic: {
    accountNumber: '708230189443067',
    routingNumber: '121145433',
    recipientName: 'Column National Association',
    address: '1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129',
  },
  international: {
    accountNumber: '708230189443067',
    swiftCode: 'CLNAUS66',
    recipientName: 'Column National Association',
    address: '1 Letterman Drive, Building A, Suite A4-700 San Francisco, CA 94129',
  },
};

const COUNTRY_OPTIONS = [
  'United States of America (the)',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Japan',
  'Singapore',
  'Switzerland',
  'Other',
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
  commitCompleted = true,
  signingCompleted = true,
  kycCompleted = true,
}: TransferModalProps) {
  const [step, setStep] = useState<TransferStep>('input');
  const [transferType, setTransferType] = useState<TransferType>('domestic');
  const [processingTextIndex, setProcessingTextIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form fields
  const [bankName, setBankName] = useState('');
  const [country, setCountry] = useState('United States of America (the)');
  const [isCustomer, setIsCustomer] = useState('Yes');
  const [promoCode, setPromoCode] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Generate unique reference ID
  const referenceId = `32IE0`;
  const investorName = 'sudeep mp';

  // Form validation
  const isFormValid = bankName.trim().length > 0;

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

  const handleConfirmTransfer = () => {
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
      setStep('input');
      setBankName('');
      setPromoCode('');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [step, onComplete, investmentAmount]);

  // Build stepper steps
  const stepperSteps: Step[] = [
    { id: 'commit', label: 'Commit', status: commitCompleted ? 'completed' : 'upcoming' },
    { id: 'signing', label: 'Signing', status: signingCompleted ? 'completed' : 'upcoming' },
    { id: 'kyc', label: 'KYC', status: kycCompleted ? 'completed' : 'upcoming' },
    { id: 'wire', label: 'Wire', status: 'current' },
  ];

  const wireDetails = WIRE_DETAILS[transferType];

  if (!isOpen) return null;

  const isProcessingOrSuccess = step === 'processing' || step === 'success';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isProcessingOrSuccess ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0dce0] flex-shrink-0">
          {onBack && !isProcessingOrSuccess ? (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#7f7582]" />
            </button>
          ) : (
            <div className="w-8" />
          )}
          {!isProcessingOrSuccess && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <X className="w-5 h-5 text-[#7f7582]" />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <ScrollAreaPrimitive.Root className="flex-1 overflow-hidden">
          <ScrollAreaPrimitive.Viewport className="h-full w-full">
            <div className="p-5">
              {step === 'input' && (
                <div>
                  {/* Horizontal Stepper */}
                  <HorizontalStepper steps={stepperSteps} className="mb-8" />

                  {/* Title */}
                  <h2
                    className="text-[22px] text-center text-[#373338] mb-1"
                    style={{ fontFamily: 'Test Signifier, serif' }}
                  >
                    Transfer your funds
                  </h2>

                  {/* Amount */}
                  <p
                    className="text-[36px] text-center text-[#373338] mb-4"
                    style={{ fontFamily: 'Test Signifier, serif' }}
                  >
                    ${investmentAmount.toLocaleString()}
                  </p>

                  {/* Description */}
                  <p
                    className="text-[14px] text-center text-[#7f7582] mb-6 leading-relaxed"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    To add funds, send a wire from your bank to Goodfin using the details below.
                    We'll email you when the transfer is complete.
                  </p>

                  {/* Domestic / International Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setTransferType('domestic')}
                      className={cn(
                        'px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors',
                        transferType === 'domestic'
                          ? 'bg-[#373338] text-white'
                          : 'bg-white text-[#373338] border border-[#e0dce0] hover:bg-[#f7f7f8]'
                      )}
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      Domestic
                    </button>
                    <button
                      onClick={() => setTransferType('international')}
                      className={cn(
                        'px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors',
                        transferType === 'international'
                          ? 'bg-[#373338] text-white'
                          : 'bg-white text-[#373338] border border-[#e0dce0] hover:bg-[#f7f7f8]'
                      )}
                      style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                    >
                      International
                    </button>
                  </div>

                  {/* Wire Details */}
                  <div className="space-y-4 mb-6">
                    {/* Account Number */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] text-[#7f7582] mb-1" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          Account Number
                        </p>
                        <p className="text-[15px] text-[#373338]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {wireDetails.accountNumber}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(wireDetails.accountNumber, 'account')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors flex items-center gap-2',
                          copiedField === 'account'
                            ? 'bg-[#e8f5e8] border-[#5a8a5a] text-[#5a8a5a]'
                            : 'bg-white border-[#e0dce0] text-[#373338] hover:bg-[#f7f7f8]'
                        )}
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {copiedField === 'account' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedField === 'account' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Routing Number / SWIFT */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] text-[#7f7582] mb-1" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {transferType === 'domestic' ? 'Routing Number' : 'SWIFT Code'}
                        </p>
                        <p className="text-[15px] text-[#373338]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {transferType === 'domestic' ? wireDetails.routingNumber : (wireDetails as any).swiftCode}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(transferType === 'domestic' ? wireDetails.routingNumber! : (wireDetails as any).swiftCode, 'routing')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors flex items-center gap-2',
                          copiedField === 'routing'
                            ? 'bg-[#e8f5e8] border-[#5a8a5a] text-[#5a8a5a]'
                            : 'bg-white border-[#e0dce0] text-[#373338] hover:bg-[#f7f7f8]'
                        )}
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {copiedField === 'routing' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedField === 'routing' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Reference ID */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] text-[#7f7582] mb-1" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          Unique Reference ID
                        </p>
                        <p className="text-[15px] text-[#373338]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {referenceId}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(referenceId, 'reference')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors flex items-center gap-2',
                          copiedField === 'reference'
                            ? 'bg-[#e8f5e8] border-[#5a8a5a] text-[#5a8a5a]'
                            : 'bg-white border-[#e0dce0] text-[#373338] hover:bg-[#f7f7f8]'
                        )}
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {copiedField === 'reference' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedField === 'reference' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Recipient Name */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] text-[#7f7582] mb-1" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          Recipient name
                        </p>
                        <p className="text-[15px] text-[#373338]" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {wireDetails.recipientName}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(wireDetails.recipientName, 'recipient')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors flex items-center gap-2',
                          copiedField === 'recipient'
                            ? 'bg-[#e8f5e8] border-[#5a8a5a] text-[#5a8a5a]'
                            : 'bg-white border-[#e0dce0] text-[#373338] hover:bg-[#f7f7f8]'
                        )}
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {copiedField === 'recipient' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedField === 'recipient' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    {/* Address */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <p className="text-[12px] text-[#7f7582] mb-1" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          Address
                        </p>
                        <p className="text-[15px] text-[#373338] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                          {wireDetails.address}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(wireDetails.address, 'address')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors flex items-center gap-2 flex-shrink-0',
                          copiedField === 'address'
                            ? 'bg-[#e8f5e8] border-[#5a8a5a] text-[#5a8a5a]'
                            : 'bg-white border-[#e0dce0] text-[#373338] hover:bg-[#f7f7f8]'
                        )}
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        {copiedField === 'address' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedField === 'address' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Memo Content */}
                  <div className="mb-6">
                    <p className="text-[12px] text-[#7f7582] mb-2" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      Enter memo content
                    </p>
                    <div className="bg-[#f7f7f8] rounded-xl p-4 border border-[#e0dce0]">
                      <p className="text-[14px] text-[#373338] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                        Investor Name: {investorName}
                        <br />
                        Unique Reference ID: {referenceId}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#e0dce0] mb-6" />

                  {/* Bank Name Input */}
                  <div className="mb-4">
                    <label className="block text-[12px] text-[#7f7582] mb-2" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      What is the name of the bank from which you will be wiring your investment?
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Name of the bank"
                      className="w-full px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a09a9f] outline-none focus:border-[#7f7582] transition-colors"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    />
                  </div>

                  {/* Country Dropdown */}
                  <div className="mb-4 relative">
                    <label className="block text-[12px] text-[#7f7582] mb-2" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      In what country is the bank located?
                    </label>
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="w-full px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] outline-none hover:border-[#7f7582] transition-colors flex items-center justify-between"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <span>{country}</span>
                      <ChevronDown className={cn('w-5 h-5 text-[#7f7582] transition-transform', showCountryDropdown && 'rotate-180')} />
                    </button>
                    {showCountryDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowCountryDropdown(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0dce0] rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                          {COUNTRY_OPTIONS.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setCountry(option);
                                setShowCountryDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-2.5 text-left text-[14px] hover:bg-[#f7f7f8] transition-colors',
                                country === option ? 'bg-[#f7f7f8] text-[#373338]' : 'text-[#685f6a]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Customer of Bank Dropdown */}
                  <div className="mb-4 relative">
                    <label className="block text-[12px] text-[#7f7582] mb-2" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      Is the subscriber a customer of the bank?
                    </label>
                    <button
                      onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                      className="w-full px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] outline-none hover:border-[#7f7582] transition-colors flex items-center justify-between"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      <span>{isCustomer}</span>
                      <ChevronDown className={cn('w-5 h-5 text-[#7f7582] transition-transform', showCustomerDropdown && 'rotate-180')} />
                    </button>
                    {showCustomerDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowCustomerDropdown(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0dce0] rounded-xl shadow-lg z-50">
                          {['Yes', 'No'].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setIsCustomer(option);
                                setShowCustomerDropdown(false);
                              }}
                              className={cn(
                                'w-full px-4 py-2.5 text-left text-[14px] hover:bg-[#f7f7f8] transition-colors',
                                isCustomer === option ? 'bg-[#f7f7f8] text-[#373338]' : 'text-[#685f6a]'
                              )}
                              style={{ fontFamily: 'Soehne, sans-serif' }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-[12px] text-[#7f7582] mb-2" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      Have a promo code? Apply here.
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-4 py-3 bg-white border border-[#e0dce0] rounded-xl text-[15px] text-[#373338] placeholder:text-[#a09a9f] outline-none focus:border-[#7f7582] transition-colors"
                        style={{ fontFamily: 'Soehne, sans-serif' }}
                      />
                      <button
                        className="px-6 py-3 bg-white border border-[#e0dce0] rounded-xl text-[14px] font-medium text-[#a09a9f] hover:bg-[#f7f7f8] transition-colors"
                        style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Processing Time Notice */}
                  <div className="flex items-start gap-3 p-4 bg-[#f7f7f8] rounded-xl mb-6">
                    <Clock className="w-5 h-5 text-[#7f7582] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-medium text-[#373338] mb-0.5" style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}>
                        Processing time
                      </p>
                      <p className="text-[12px] text-[#7f7582] leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                        Funds will usually be credited to your Goodfin account on the same day if submitted before 3pm PT.
                      </p>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[13px] text-center text-[#7f7582] mb-4 leading-relaxed" style={{ fontFamily: 'Soehne, sans-serif' }}>
                    Your allocation will be reserved only after we confirm
                    <br />
                    receipt of your wire transfer.
                  </p>

                  {/* Validation Message */}
                  {!isFormValid && (
                    <p className="text-[13px] text-center text-[#e85c4a] mb-4" style={{ fontFamily: 'Soehne, sans-serif' }}>
                      Please fill in all of the fields
                    </p>
                  )}

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmTransfer}
                    disabled={!isFormValid}
                    className={cn(
                      'w-full py-3.5 text-[16px] font-medium rounded-xl transition-colors mb-4',
                      isFormValid
                        ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                        : 'bg-[#e0dce0] text-[#a09a9f] cursor-not-allowed'
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Confirm transfer
                  </button>

                  {/* Support Accordion */}
                  <button className="w-full flex items-center justify-center gap-2 py-3 text-[14px] text-[#7f7582] hover:text-[#373338] transition-colors">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#c0bcc0]">?</span>
                    <span style={{ fontFamily: 'Soehne, sans-serif' }}>Support</span>
                    <ChevronDown className="w-4 h-4" />
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
                    <p className="text-[14px] font-mono text-[#373338]">{referenceId}</p>
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
