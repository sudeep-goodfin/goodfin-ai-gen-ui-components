import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

// Footprint Modal Steps
type FootprintStep = 'sandbox' | 'address' | 'confirm' | 'processing' | 'success';

export function IdentityVerificationModal({
  isOpen,
  onClose,
  onComplete,
}: IdentityVerificationModalProps) {
  const [modalAnimated, setModalAnimated] = useState(false);
  const [footprintStep, setFootprintStep] = useState<FootprintStep>('sandbox');

  // Form state
  const [country, setCountry] = useState('United Kingdom');
  const [address, setAddress] = useState('301 Amulree Street');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Scotland');
  const [zipCode, setZipCode] = useState('G32 7SJ');

  // Animate modal
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setModalAnimated(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalAnimated(false);
      // Reset to first step when modal closes
      setFootprintStep('sandbox');
    }
  }, [isOpen]);

  // Auto-complete on success
  useEffect(() => {
    if (footprintStep !== 'success') return;

    const timeout = setTimeout(() => {
      onComplete();
      setFootprintStep('sandbox');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [footprintStep, onComplete]);

  // Processing step auto-advance
  useEffect(() => {
    if (footprintStep !== 'processing') return;

    const timeout = setTimeout(() => {
      setFootprintStep('success');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [footprintStep]);

  const handleCloseFootprint = () => {
    onClose();
  };

  const handleFootprintContinue = () => {
    if (footprintStep === 'sandbox') {
      setFootprintStep('address');
    } else if (footprintStep === 'address') {
      setFootprintStep('confirm');
    } else if (footprintStep === 'confirm') {
      setFootprintStep('processing');
    }
  };

  const handleFootprintBack = () => {
    if (footprintStep === 'address') {
      setFootprintStep('sandbox');
    } else if (footprintStep === 'confirm') {
      setFootprintStep('address');
    }
  };

  if (!isOpen) return null;

  const isProcessingOrSuccess = footprintStep === 'processing' || footprintStep === 'success';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          modalAnimated ? 'opacity-100' : 'opacity-0'
        )}
        onClick={!isProcessingOrSuccess ? handleCloseFootprint : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 overflow-hidden',
          'transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
          modalAnimated
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        )}
      >
        {/* Sandbox Mode Banner */}
        <div className="bg-[#5b4dc7] text-white text-center py-2 text-sm font-medium">
          Sandbox Mode
        </div>

        {/* Modal Header */}
        {!isProcessingOrSuccess && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            {footprintStep !== 'sandbox' ? (
              <button
                onClick={handleFootprintBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <button
                onClick={handleCloseFootprint}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex-1" />
          </div>
        )}

        {/* Step Content */}
        <div className="p-6">
          {/* Sandbox Step */}
          {footprintStep === 'sandbox' && (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Test outcomes
                </h2>
                <p className="text-sm text-gray-500">
                  Select what result you want this user to have after they complete their onboarding
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    General outcome
                  </label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent">
                      <option>Success</option>
                      <option>Failure</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Simulated outcome
                  </label>
                  <p className="text-xs text-gray-500 mb-1.5">
                    Mocked outcome independent of the uploaded image
                  </p>
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Choose simulated outcome
                  </label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent">
                      <option>Success</option>
                      <option>Failure</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Test ID
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value="7D5HDImANd4a2"
                      readOnly
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    You can log into a previously created sandbox user by using the Test ID from that corresponding session.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Address Step */}
          {footprintStep === 'address' && (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  What's your residential address?
                </h2>
                <p className="text-sm text-gray-500">
                  Make sure to provide your updated residential address (no P.O. Boxes).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent"
                    >
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Apartment/neighborhood (optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Neighborhood name, suite no, etc."
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Zip code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5b4dc7] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Step */}
          {footprintStep === 'confirm' && (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm your personal data
                </h2>
                <p className="text-sm text-gray-500">
                  Please make sure that your personal data is accurate and there are no typos before continuing.
                </p>
              </div>

              <div className="space-y-4">
                {/* Basic Data Section */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium text-gray-900">Basic data</span>
                    </div>
                    <button className="text-[#5b4dc7] text-sm font-medium hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">First name</p>
                      <p className="text-gray-900">Alex</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last name</p>
                      <p className="text-gray-900">Johnson</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Date of birth</p>
                      <p className="text-gray-900">12/09/1990</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Phone number</p>
                        <p className="text-gray-900">+1 (555) 123-4567</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-900">alex@example.com</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium text-gray-900">Address</span>
                    </div>
                    <button className="text-[#5b4dc7] text-sm font-medium hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900">{address}</p>
                    <p className="text-gray-900">{city}, {zipCode}, GB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {footprintStep === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#5b4dc7] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Verifying your identity...</p>
            </div>
          )}

          {/* Success Step */}
          {footprintStep === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-[scale-in_0.4s_ease-out]">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verification complete!
              </h3>
              <p className="text-sm text-gray-500">
                Your identity has been verified successfully.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isProcessingOrSuccess && (
          <div className="px-6 pb-6">
            <button
              onClick={handleFootprintContinue}
              className="w-full py-3 bg-[#5b4dc7] text-white rounded-lg font-medium hover:bg-[#4a3db6] transition-colors"
            >
              {footprintStep === 'confirm' ? 'Confirm & Verify' : 'Continue'}
            </button>
          </div>
        )}

        {/* Footer Links */}
        {!isProcessingOrSuccess && (
          <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Support</a>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              EN
            </span>
          </div>
        )}
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
