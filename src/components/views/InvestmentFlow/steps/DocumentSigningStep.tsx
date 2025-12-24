import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';

// Document types that require signing
export type SignableDocumentType = 'llc-agreement' | 'subscription-agreement';

// Document metadata configuration for signing
const SIGNABLE_DOCUMENT_CONFIG: Record<
  SignableDocumentType,
  {
    title: string;
    description: string;
    faqItems: FAQItem[];
  }
> = {
  'llc-agreement': {
    title: 'Limited Liability Company Agreement',
    description:
      'This document explains how the investment vehicle is structured, including roles, rights, and responsibilities.',
    faqItems: [
      {
        question: 'What is the Limited Liability Company (LLC) Agreement?',
        answer:
          'The LLC Agreement explains how the investment vehicle is structured, including roles, responsibilities, and how decisions are handled. It governs how the investment operates on behalf of investors.',
      },
      {
        question: 'Why am I asked to enter my full legal name here?',
      },
      {
        question: 'Is this a legally binding signature?',
      },
      {
        question: 'Can I review this document again later?',
      },
    ],
  },
  'subscription-agreement': {
    title: 'Subscription Agreement',
    description:
      'This document formalizes your commitment to invest and outlines the terms of your subscription.',
    faqItems: [
      {
        question: 'What is the Subscription Agreement?',
        answer:
          "The Subscription Agreement formalizes your intent to invest. It outlines the terms of your subscription, including the amount you're committing and your acknowledgment of the risks involved.",
      },
      {
        question: 'What happens after I sign this?',
      },
      {
        question: 'Can I change my investment amount?',
      },
      {
        question: 'Is my investment finalized after signing?',
      },
    ],
  },
};

interface DocumentSigningStepProps {
  documentType: SignableDocumentType;
  amount: number;
  company: CompanyData;
  onConfirm: (signature: string) => void;
  onBack?: () => void;
}

export function DocumentSigningStep({
  documentType,
  amount,
  company,
  onConfirm,
}: DocumentSigningStepProps) {
  const [signature, setSignature] = useState('');
  const [showSignatureOverlay, setShowSignatureOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);
  const config = SIGNABLE_DOCUMENT_CONFIG[documentType];

  // Animate overlay when shown
  useEffect(() => {
    if (showSignatureOverlay) {
      const timer = setTimeout(() => {
        setOverlayAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOverlayAnimated(false);
    }
  }, [showSignatureOverlay]);

  const handleReviewedClick = () => {
    setShowSignatureOverlay(true);
  };

  // Format current date as DD-MM-YYYY
  const currentDate = new Date()
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');

  const isValid = signature.trim().length > 0;

  return (
    <div className="w-full max-w-[1032px] mx-auto px-2.5 py-2.5">
      {/* Header */}
      <div className="flex flex-col gap-2.5 items-center justify-center px-2.5 py-8 w-full">
        <h1
          className="text-[42px] leading-[40px] text-[#373338] w-full"
          style={{ fontFamily: 'Test Signifier, serif' }}
        >
          2.1 Document review
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex items-start justify-between w-full gap-4">
        {/* Left Panel - Document Card with Signature Overlay */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-4 p-8 w-full overflow-hidden relative">
            {/* Document Title */}
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-[28px] leading-normal text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                {config.title}
              </h2>
              <p
                className="text-[14px] leading-[20px] text-[#69606d]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {config.description}
              </p>
            </div>

            {/* Document Preview Images */}
            <div className="relative h-[342px] w-full overflow-hidden">
              {/* Back document image (placeholder) */}
              <div className="absolute left-0 top-0 w-[513px] h-[342px] rounded-[20px] border border-[#beb9c0] bg-white overflow-hidden">
                <div className="p-6">
                  <h3
                    className="text-[14px] leading-[18px] text-[#373338] uppercase tracking-wide font-semibold mb-4"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    1. Investment Commitment
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[95%] h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[90%] h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[85%] h-2 bg-[#f0eeeb] rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5 mt-4">
                    <div className="w-full h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[92%] h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[88%] h-2 bg-[#f0eeeb] rounded" />
                  </div>
                </div>
              </div>
              {/* Front document image (placeholder) */}
              <div className="absolute left-[38px] top-[38px] w-[434px] h-[375px] rounded-[12px] border border-[#f0eef0] bg-white overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3
                    className="text-[14px] leading-[18px] text-[#373338] uppercase tracking-wide font-semibold mb-4"
                    style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                  >
                    1. Investment Commitment
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[95%] h-2 bg-[#f0eeeb] rounded" />
                    <div className="w-[90%] h-2 bg-[#f0eeeb] rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                className="w-full py-3 px-8 rounded-lg text-[16px] leading-[20px] text-[#373338] border border-[#373338] shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)] relative overflow-hidden"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                Chat with the document using Goodfin AI
                <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
              </button>
              <button
                onClick={handleReviewedClick}
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
                I've reviewed this — Let's Sign
                <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
              </button>
            </div>

            {/* Signature Overlay - slides up when user clicks "I've reviewed this" */}
            {showSignatureOverlay && (
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 bg-white border border-[#e6e4e7] rounded-t-[30px] overflow-hidden',
                  'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  overlayAnimated
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                )}
              >
                <div className="flex flex-col gap-2 px-[37px] pt-[21px] pb-6">
                  {/* Title */}
                  <p
                    className="text-[20px] leading-[32px] text-[#373338] tracking-[-0.4px]"
                    style={{ fontFamily: 'Test Signifier, serif' }}
                  >
                    Enter your full legal name
                  </p>

                  {/* Signature Input */}
                  <div className="bg-white border border-[#d9dde9] rounded-lg px-4 pt-4 pb-2 flex flex-col justify-between h-[101px]">
                    <div className="flex-1" />
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder=""
                      className={cn(
                        'w-full bg-transparent border-none outline-none',
                        'text-[46px] leading-[24px] text-[#6e7791] tracking-[-0.1px]'
                      )}
                      style={{
                        fontFamily: 'Sacramento, cursive',
                      }}
                    />
                    {/* Date stamp */}
                    <p
                      className="text-[12px] leading-[16px] text-[#7986b2] text-right mt-2"
                      style={{ fontFamily: 'Fira Mono, monospace' }}
                    >
                      {currentDate}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onConfirm(signature)}
                    disabled={!isValid}
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

                  {/* Disclaimer */}
                  <p
                    className="text-[14px] leading-[16px] text-black text-center mt-2"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    This acts as your electronic acknowledgment for this document.
                  </p>
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
          <FAQSection items={config.faqItems} />
        </div>
      </div>
    </div>
  );
}
