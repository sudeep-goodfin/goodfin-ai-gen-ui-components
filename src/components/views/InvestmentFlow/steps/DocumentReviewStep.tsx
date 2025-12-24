import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { InvestmentSummary } from '../components/InvestmentSummary';
import { FAQSection } from '../components/FAQSection';
import { type CompanyData, type FAQItem } from '../types';

// Import PDF documents
import ppmPdf from '../assets/Goodfin Venture PPM Dec 11 2025.pdf';
import llcPdf from '../assets/Goodfin Venture LLOA Dec 11 2025.pdf';
import subscriptionPdf from '../assets/Goodfin Venture LXXIV Dec 11 2025.pdf';

// Document types for the investment flow
export type DocumentType = 'ppm' | 'llc-agreement' | 'subscription-agreement';

// PDF file mapping
const DOCUMENT_PDFS: Record<DocumentType, string> = {
  ppm: ppmPdf,
  'llc-agreement': llcPdf,
  'subscription-agreement': subscriptionPdf,
};

// Document metadata configuration
const DOCUMENT_CONFIG: Record<
  DocumentType,
  {
    title: string;
    description: string;
    faqItems: FAQItem[];
  }
> = {
  ppm: {
    title: 'Private Placement Memorandum',
    description:
      'This document outlines the risks, disclosures, and structure of your investment.',
    faqItems: [
      {
        question: 'Why do I need to review these documents?',
        answer:
          "These documents explain how your investment works, how your capital is handled, and the terms you're agreeing to. Reviewing them ensures you're fully informed before signing.",
      },
      {
        question: 'Can these documents change after I sign?',
      },
      {
        question: 'How long should this take?',
      },
      {
        question: 'Will I get a copy of what I sign?',
      },
    ],
  },
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

interface DocumentReviewStepProps {
  documentType: DocumentType;
  amount: number;
  company: CompanyData;
  onContinue: () => void;
  onBack?: () => void;
}

export function DocumentReviewStep({
  documentType,
  amount,
  company,
  onContinue,
}: DocumentReviewStepProps) {
  const config = DOCUMENT_CONFIG[documentType];

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
        {/* Left Panel - Document Review Card */}
        <div className="flex flex-col gap-2.5 p-2.5 w-[597px]">
          <div className="bg-[#f7f7f8] flex flex-col gap-6 p-8 w-full rounded-lg">
            {/* Document Title */}
            <div className="flex flex-col gap-2 w-full">
              <h2
                className="text-[28px] leading-[32px] text-[#554d57]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                {config.title}
              </h2>
              <p
                className="text-[14px] leading-[18px] text-[#685f6a]"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                {config.description}
              </p>
              <button
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
                src={`${DOCUMENT_PDFS[documentType]}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-[400px] border-none"
                title={config.title}
              />
            </div>

            {/* CTA Button */}
            <button
              onClick={onContinue}
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
              I've reviewed this — continue
              <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
            </button>
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
