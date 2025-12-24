import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { AIChatSidebar } from '../components/AIChatSidebar';
import { type CompanyData, type FAQItem } from '../types';

// Import PDF documents
import llcPdf from '../assets/Goodfin Venture LLOA Dec 11 2025.pdf';
import subscriptionPdf from '../assets/Goodfin Venture LXXIV Dec 11 2025.pdf';

// Document types that require signing
export type SignableDocumentType = 'llc-agreement' | 'subscription-agreement';

// PDF file mapping
const SIGNABLE_DOCUMENT_PDFS: Record<SignableDocumentType, string> = {
  'llc-agreement': llcPdf,
  'subscription-agreement': subscriptionPdf,
};

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
        answer:
          'Your full legal name is required for legal identification and to ensure the signature is valid and enforceable under applicable laws.',
      },
      {
        question: 'Is this a legally binding signature?',
        answer:
          'Yes, your electronic signature has the same legal effect as a handwritten signature under the E-SIGN Act and UETA.',
      },
      {
        question: 'Can I review this document again later?',
        answer:
          'Yes, you can access all your signed documents anytime from your Goodfin dashboard under "My Documents".',
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
        answer:
          'After signing, you will proceed to the wire transfer step to fund your investment. Your allocation is reserved once we receive your funds.',
      },
      {
        question: 'Can I change my investment amount?',
        answer:
          'You can adjust your investment amount before signing. After signing, changes require contacting our support team.',
      },
      {
        question: 'Is my investment finalized after signing?',
        answer:
          'Signing reserves your allocation. Your investment is finalized once we receive and confirm your wire transfer.',
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
  const [showAIChat, setShowAIChat] = useState(false);
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
    <>
      <AIChatSidebar
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        documentTitle={config.title}
      />
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
            <div className="flex flex-col gap-2 w-full">
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
              <button
                onClick={() => setShowAIChat(true)}
                className="self-start mt-1 px-3 py-1.5 text-[12px] leading-[16px] text-[#685f6a] bg-white border border-[#d9d5db] rounded-full hover:bg-[#f7f7f8] hover:border-[#beb9c0] transition-colors flex items-center gap-1.5"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                <Sparkles className="w-3 h-3" />
                Ask AI to explain this document
              </button>
            </div>

            {/* Document Preview - Embedded PDF */}
            <div className="w-full bg-white rounded-lg border border-[#e0ddd8] overflow-hidden shadow-sm">
              <iframe
                src={`${SIGNABLE_DOCUMENT_PDFS[documentType]}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-[342px] border-none"
                title={config.title}
              />
            </div>

            {/* Action Button */}
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
    </>
  );
}
