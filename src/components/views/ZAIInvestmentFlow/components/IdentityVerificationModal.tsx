import { useState, useEffect } from 'react';
import { X, Camera, CreditCard, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationStep = 'intro' | 'selfie' | 'id-front' | 'id-back' | 'processing' | 'success';

interface IdentityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const PROCESSING_TEXTS = [
  'Analyzing your selfie...',
  'Verifying ID document...',
  'Checking against database...',
  'Almost done...',
];

export function IdentityVerificationModal({
  isOpen,
  onClose,
  onComplete,
}: IdentityVerificationModalProps) {
  const [step, setStep] = useState<VerificationStep>('intro');
  const [processingTextIndex, setProcessingTextIndex] = useState(0);

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
      onComplete();
      setStep('intro'); // Reset for next time
    }, 2000);

    return () => clearTimeout(timeout);
  }, [step, onComplete]);

  const handleCapture = () => {
    if (step === 'selfie') setStep('id-front');
    else if (step === 'id-front') setStep('id-back');
    else if (step === 'id-back') setStep('processing');
  };

  const getStepIndex = () => {
    switch (step) {
      case 'selfie':
        return 0;
      case 'id-front':
        return 1;
      case 'id-back':
        return 2;
      default:
        return -1;
    }
  };

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
            Verify Your Identity
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
          {step === 'intro' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f7f7f8] flex items-center justify-center">
                <Camera className="w-8 h-8 text-[#7f7582]" />
              </div>
              <h3
                className="text-[16px] font-medium text-[#373338] mb-2"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Quick verification
              </h3>
              <p
                className="text-[14px] text-[#7f7582] mb-6"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                We'll need a selfie and photos of your ID to verify your identity. This takes about 2 minutes.
              </p>

              {/* Steps preview */}
              <div className="flex justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f7f7f8] rounded-lg">
                  <Camera className="w-4 h-4 text-[#7f7582]" />
                  <span className="text-[12px] text-[#7f7582]">Selfie</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f7f7f8] rounded-lg">
                  <CreditCard className="w-4 h-4 text-[#7f7582]" />
                  <span className="text-[12px] text-[#7f7582]">ID Front</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#f7f7f8] rounded-lg">
                  <CreditCard className="w-4 h-4 text-[#7f7582]" />
                  <span className="text-[12px] text-[#7f7582]">ID Back</span>
                </div>
              </div>

              <button
                onClick={() => setStep('selfie')}
                className="w-full py-3 bg-[#373338] text-white text-[14px] font-medium rounded-xl hover:bg-[#29272a] transition-colors"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Get Started
              </button>
            </div>
          )}

          {(step === 'selfie' || step === 'id-front' || step === 'id-back') && (
            <div className="text-center py-4">
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      i <= getStepIndex() ? 'bg-[#373338]' : 'bg-[#e0dce0]'
                    )}
                  />
                ))}
              </div>

              {/* Camera view mock */}
              <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                {/* Frame guide */}
                <div
                  className={cn(
                    'border-2 border-white/50 border-dashed',
                    step === 'selfie' ? 'w-32 h-32 rounded-full' : 'w-48 h-32 rounded-lg'
                  )}
                />

                {/* Label */}
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-white text-[13px] bg-black/50 px-3 py-1 rounded-full">
                    {step === 'selfie' && 'Position your face in the circle'}
                    {step === 'id-front' && 'Position the front of your ID'}
                    {step === 'id-back' && 'Position the back of your ID'}
                  </span>
                </div>
              </div>

              {/* Capture button */}
              <button
                onClick={handleCapture}
                className="w-16 h-16 mx-auto rounded-full bg-white border-4 border-[#373338] hover:border-[#7a5af5] transition-colors flex items-center justify-center"
                aria-label="Capture"
              >
                <div className="w-12 h-12 rounded-full bg-[#373338]" />
              </button>
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
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#5a8a5a] flex items-center justify-center animate-[scale-in_0.4s_ease-out]">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-[16px] font-medium text-[#373338] mb-2"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Verification complete!
              </h3>
              <p
                className="text-[14px] text-[#7f7582]"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Your identity has been verified successfully.
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
