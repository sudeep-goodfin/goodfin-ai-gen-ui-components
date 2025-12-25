import { useState, useEffect } from 'react';
import { X, Check, Loader2, Building2, Plus, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BankAccount, DealInfo } from '../types';

type TransferStep = 'input' | 'confirm' | 'processing' | 'success';

interface TransferModalProps {
  isOpen: boolean;
  deal: DealInfo;
  bankAccounts: BankAccount[];
  onClose: () => void;
  onComplete: (amount: number, bankId: string) => void;
}

const PROCESSING_TEXTS = [
  'Initiating transfer...',
  'Connecting to bank...',
  'Processing payment...',
  'Almost there...',
];

export function TransferModal({
  isOpen,
  deal,
  bankAccounts,
  onClose,
  onComplete,
}: TransferModalProps) {
  const [step, setStep] = useState<TransferStep>('input');
  const [amount, setAmount] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [processingTextIndex, setProcessingTextIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Parse amount
  const parsedAmount = parseInt(amount.replace(/,/g, ''), 10) || 0;
  const isValidAmount = parsedAmount >= deal.minInvestment;
  const canContinue = isValidAmount && selectedBankId;

  // Format amount for display
  const formatAmount = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits ? parseInt(digits, 10).toLocaleString() : '';
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    setAmount(formatted);
    setError(null);
  };

  const handleContinue = () => {
    if (!canContinue) {
      if (!isValidAmount) {
        setError(`Minimum investment is $${deal.minInvestment.toLocaleString()}`);
      }
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    setReferenceNumber(`GF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
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
      onComplete(parsedAmount, selectedBankId!);
      // Reset state
      setStep('input');
      setAmount('');
      setSelectedBankId(null);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [step, onComplete, parsedAmount, selectedBankId]);

  const selectedBank = bankAccounts.find((b) => b.id === selectedBankId);

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
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0dce0]">
          <h2
            className="text-[18px] font-medium text-[#373338]"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            {step === 'success' ? 'Transfer Complete' : 'Initiate Transfer'}
          </h2>
          {!isProcessingOrSuccess && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <X className="w-5 h-5 text-[#7f7582]" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {step === 'input' && (
            <div>
              {/* Amount input */}
              <div className="mb-6">
                <label
                  className="block text-[13px] text-[#7f7582] mb-2"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[24px] text-[#373338]">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder={deal.minInvestment.toLocaleString()}
                    className={cn(
                      'w-full pl-10 pr-4 py-4 text-[24px] bg-[#f7f7f8] rounded-xl border-2 outline-none transition-colors',
                      error ? 'border-red-400' : 'border-transparent focus:border-[#7a5af5]'
                    )}
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-[13px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
                <p className="mt-2 text-[12px] text-[#a09a9f]">
                  Minimum: ${deal.minInvestment.toLocaleString()}
                </p>
              </div>

              {/* Bank selection */}
              <div className="mb-6">
                <label
                  className="block text-[13px] text-[#7f7582] mb-2"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  Select Bank Account
                </label>
                <div className="space-y-2">
                  {bankAccounts.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBankId(bank.id)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors text-left',
                        selectedBankId === bank.id
                          ? 'border-[#7a5af5] bg-[#f5f3ff]'
                          : 'border-[#e0dce0] hover:border-[#c0bcc0]'
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#7f7582]" />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-[14px] font-medium text-[#373338]"
                          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                        >
                          {bank.name}
                        </p>
                        <p className="text-[12px] text-[#7f7582]">
                          ****{bank.last4} • {bank.type}
                        </p>
                      </div>
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 transition-colors',
                          selectedBankId === bank.id
                            ? 'border-[#7a5af5] bg-[#7a5af5]'
                            : 'border-[#c0bcc0]'
                        )}
                      >
                        {selectedBankId === bank.id && (
                          <Check className="w-full h-full text-white p-0.5" />
                        )}
                      </div>
                    </button>
                  ))}

                  <button className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-[#e0dce0] hover:border-[#c0bcc0] transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-[#f7f7f8] flex items-center justify-center">
                      <Plus className="w-5 h-5 text-[#7f7582]" />
                    </div>
                    <p className="text-[14px] text-[#7f7582]">Add new account</p>
                  </button>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className={cn(
                  'w-full py-3 text-[14px] font-medium rounded-xl transition-colors',
                  canContinue
                    ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                    : 'bg-[#e0dce0] text-[#a09a9f] cursor-not-allowed'
                )}
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Continue
              </button>
            </div>
          )}

          {step === 'confirm' && (
            <div>
              {/* Summary card */}
              <div className="bg-[#f7f7f8] rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#e0dce0]">
                  <img
                    src={deal.logo}
                    alt={deal.companyName}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-[#373338]">
                      {deal.companyName}
                    </p>
                    <p className="text-[12px] text-[#7f7582]">Investment</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[13px] text-[#7f7582]">Amount</span>
                    <span className="text-[13px] font-medium text-[#373338]">
                      ${parsedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-[#7f7582]">From</span>
                    <span className="text-[13px] font-medium text-[#373338]">
                      {selectedBank?.name} (****{selectedBank?.last4})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[13px] text-[#7f7582]">Fee</span>
                    <span className="text-[13px] font-medium text-[#373338]">$0.00</span>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#7f7582] mb-6">
                By confirming, you authorize Goodfin to initiate a transfer from your selected bank account.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 py-3 text-[14px] font-medium text-[#373338] bg-[#f7f7f8] rounded-xl hover:bg-[#edebee] transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 text-[14px] font-medium text-white bg-[#373338] rounded-xl hover:bg-[#29272a] transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Confirm Transfer
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#7a5af5] animate-spin" />
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
                className="text-[16px] font-medium text-[#373338] mb-2"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Transfer initiated!
              </h3>
              <p
                className="text-[14px] text-[#7f7582] mb-4"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Your investment of ${parsedAmount.toLocaleString()} is being processed.
              </p>
              <div className="inline-block px-4 py-2 bg-[#f7f7f8] rounded-lg">
                <p className="text-[11px] text-[#7f7582] uppercase tracking-wide">Reference</p>
                <p className="text-[14px] font-mono text-[#373338]">{referenceNumber}</p>
              </div>
              <p className="text-[12px] text-[#a09a9f] mt-4">
                Expected completion: 3-5 business days
              </p>
            </div>
          )}
        </div>
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
