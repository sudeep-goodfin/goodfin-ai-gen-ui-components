import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';
import { X, ChevronLeft, ChevronDown, Check } from 'lucide-react';

// KYC-specific FAQ items
const KYC_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Why do I need to verify my identity?',
    answer:
      'Goodfin is a private investment platform, and identity verification helps ensure that every investor is real, verified, and eligible to participate. This protects you, the companies you invest in, and the integrity of the platform.',
  },
  {
    question: 'How does this protect me?',
  },
  {
    question: 'What information will you collect?',
  },
  {
    question: 'Is my data safe?',
  },
];

interface VerificationStepProps {
  amount: number;
  company: CompanyData;
  onVerify: () => void;
  onBack?: () => void;
}

// Footprint Modal Steps
type FootprintStep = 'sandbox' | 'address' | 'confirm';

export function VerificationStep({
  amount,
  company,
  onVerify,
}: VerificationStepProps) {
  const [showFootprintModal, setShowFootprintModal] = useState(false);
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
    if (showFootprintModal) {
      const timer = setTimeout(() => setModalAnimated(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalAnimated(false);
    }
  }, [showFootprintModal]);

  const handleOpenFootprint = () => {
    setShowFootprintModal(true);
    setFootprintStep('sandbox');
  };

  const handleCloseFootprint = () => {
    setShowFootprintModal(false);
  };

  const handleFootprintContinue = () => {
    if (footprintStep === 'sandbox') {
      setFootprintStep('address');
    } else if (footprintStep === 'address') {
      setFootprintStep('confirm');
    } else {
      setShowFootprintModal(false);
      onVerify();
    }
  };

  const handleFootprintBack = () => {
    if (footprintStep === 'address') {
      setFootprintStep('sandbox');
    } else if (footprintStep === 'confirm') {
      setFootprintStep('address');
    }
  };

  return (
    <>
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-2.5 items-center justify-center px-2.5 py-8 w-full">
        <h1
          className="text-[42px] leading-[40px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          A few quick steps to get you started
        </h1>
        <p
          className="text-[24px] leading-[32px] text-[#685f6a] w-full"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          You'll only need to do this once.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - KYC Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-8 p-8 w-full">
            {/* Section 1: Identity Verification */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                We need to verify your identity
              </h2>
              <p
                className="text-[16px] leading-[20px] text-[#685f6a]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                To make sure it's really you, we need to check your application
                against a photo of your ID and a selfie of you.
              </p>
            </div>

            {/* Illustration */}
            <div className="w-full aspect-[1536/1024] rounded-[20px] border border-[#beb9c0] bg-gradient-to-br from-[#f8f7f5] to-[#f0eeeb] flex items-center justify-center overflow-hidden">
              {/* Shield with checkmark illustration */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -left-16 -top-8 w-8 h-8 rounded-full bg-[#e8e5df] opacity-60" />
                <div className="absolute -right-12 top-4 w-6 h-6 rounded-full bg-[#e0ddd7] opacity-40" />
                <div className="absolute left-8 bottom-0 w-4 h-4 rounded-full bg-[#d8d5cf] opacity-50" />

                {/* Main shield */}
                <div className="relative">
                  <svg
                    width="120"
                    height="140"
                    viewBox="0 0 120 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shield body */}
                    <path
                      d="M60 0L120 20V60C120 100 90 130 60 140C30 130 0 100 0 60V20L60 0Z"
                      fill="url(#shieldGradient)"
                      stroke="#a8c5a8"
                      strokeWidth="2"
                    />
                    {/* Checkmark */}
                    <path
                      d="M35 70L52 87L85 54"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="shieldGradient"
                        x1="60"
                        y1="0"
                        x2="60"
                        y2="140"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7fa87f" />
                        <stop offset="1" stopColor="#5a8a5a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Footsteps decoration */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-30">
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform rotate-12" />
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform -rotate-12" />
                  <div className="w-3 h-4 bg-[#9a9a8a] rounded-full transform rotate-12" />
                </div>
              </div>
            </div>

            {/* Section 2: Privacy Info */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-[24px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Your information stays private
              </h2>
              <div className="flex flex-col gap-1">
                {/* Privacy item 1 */}
                <div className="flex items-center gap-1.5">
                  <div className="w-[38px] h-[28px] flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L4 6V12C4 16.42 7.32 20.5 12 22C16.68 20.5 20 16.42 20 12V6L12 2Z"
                        fill="#e8d9a0"
                        stroke="#c9b97a"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="#8a7a4a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[30px] text-[#685f6a] flex-1"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    Your data is secure and private
                  </p>
                </div>
                {/* Privacy item 2 */}
                <div className="flex items-center gap-1.5">
                  <div className="w-[41px] h-[30px] flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r="10"
                        fill="#a8d4e6"
                        stroke="#7ab8d4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 8V14L17 17"
                        stroke="#4a8aa8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[16px] leading-[30px] text-[#685f6a] flex-1"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    You're always in control
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOpenFootprint}
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
              Verify Identity with Footprint
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Right Panel - Summary & FAQ */}
        <div className="flex-1 flex flex-col gap-6 p-2.5 min-w-0">
          {/* Investment Summary */}
          <InvestmentSummary amount={amount} company={company} />

          {/* FAQ Section */}
          <FAQSection items={KYC_FAQ_ITEMS} />
        </div>
      </div>
    </div>

    {/* Footprint Verification Modal */}
    {showFootprintModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 backdrop-blur-sm',
            'transition-opacity duration-300',
            modalAnimated ? 'opacity-100' : 'opacity-0'
          )}
          onClick={handleCloseFootprint}
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
                        <p className="text-gray-900">sudeep</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last name</p>
                        <p className="text-gray-900">mp</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">Date of birth</p>
                        <p className="text-gray-900">12/09/1990</p>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <div>
                          <p className="text-gray-500">Phone number</p>
                          <p className="text-gray-900">+447934306939</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-gray-900">sudeep+2@goodfin.com</p>
                        </div>
                        <button className="text-[#5b4dc7] text-sm font-medium hover:underline">
                          Verify
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      We recommend verifying both email and phone number
                    </p>
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
          </div>

          {/* Modal Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={handleFootprintContinue}
              className="w-full py-3 bg-[#5b4dc7] text-white rounded-lg font-medium hover:bg-[#4a3db6] transition-colors"
            >
              {footprintStep === 'confirm' ? 'Confirm & Continue' : 'Continue'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Support</a>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              EN
            </span>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
