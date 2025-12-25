import { useState, useEffect } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InvestmentDocument } from '../types';

// Import PDF documents from InvestmentFlow
import ppmPdf from '../../InvestmentFlow/assets/Goodfin Venture PPM Dec 11 2025.pdf';
import llcPdf from '../../InvestmentFlow/assets/Goodfin Venture LLOA Dec 11 2025.pdf';
import subscriptionPdf from '../../InvestmentFlow/assets/Goodfin Venture LXXIV Dec 11 2025.pdf';

// PDF file mapping by document ID
const DOCUMENT_PDFS: Record<string, string> = {
  'ppm': ppmPdf,
  'subscription': subscriptionPdf,
  'suitability': llcPdf,
};

// Documents that require signature (PPM is review-only)
const REQUIRES_SIGNATURE: Record<string, boolean> = {
  'ppm': false,
  'subscription': true,
  'suitability': true,
};

interface DocumentSigningInlineProps {
  document: InvestmentDocument;
  onSign: (documentId: string) => void;
  onFullscreen: (documentId: string) => void;
}

export function DocumentSigningInline({
  document,
  onSign,
  onFullscreen,
}: DocumentSigningInlineProps) {
  const [signature, setSignature] = useState('');
  const [showSignatureOverlay, setShowSignatureOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);

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

  const requiresSignature = REQUIRES_SIGNATURE[document.id] !== false;
  const pdfUrl = DOCUMENT_PDFS[document.id];

  const handleReviewedClick = () => {
    if (requiresSignature) {
      setShowSignatureOverlay(true);
    } else {
      // For review-only documents (like PPM), acknowledge directly
      onSign(document.id);
    }
  };

  const handleSign = () => {
    if (!signature.trim()) return;
    onSign(document.id);
    setSignature('');
    setShowSignatureOverlay(false);
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
    <div className="relative overflow-hidden rounded-lg">
      {/* Document Content */}
      <div className="space-y-3">
        {/* Document Title & Description */}
        <div>
          <h4
            className="text-[15px] font-medium text-[#373338] mb-1"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            {document.title}
          </h4>
          <p
            className="text-[13px] text-[#7f7582] leading-relaxed"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {document.fullSummary}
          </p>
          <button
            className="mt-2 px-2.5 py-1 text-[11px] text-[#685f6a] bg-white border border-[#d9d5db] rounded-full hover:bg-[#f7f7f8] hover:border-[#beb9c0] transition-colors flex items-center gap-1"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            <Sparkles className="w-3 h-3" />
            Ask AI to explain
          </button>
        </div>

        {/* PDF Preview */}
        {pdfUrl && (
          <div className="w-full bg-white rounded-lg border border-[#e0dce0] overflow-hidden relative group">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
              className="w-full h-[180px] border-none"
              title={document.title}
            />
            {/* Fullscreen button */}
            <button
              onClick={() => onFullscreen(document.id)}
              className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white border border-[#d9d5db] rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              title="View fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#685f6a]" />
            </button>
          </div>
        )}

        {/* Review Button */}
        <button
          onClick={handleReviewedClick}
          className="w-full py-2.5 bg-[#373338] text-white text-[13px] font-medium rounded-lg hover:bg-[#29272a] transition-colors"
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          {requiresSignature ? "I've reviewed this — Sign" : "I've reviewed this"}
        </button>
      </div>

      {/* Signature Overlay - slides up from bottom */}
      {showSignatureOverlay && (
        <div
          className={cn(
            'absolute inset-0 bg-white rounded-lg overflow-hidden',
            'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            overlayAnimated
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          )}
        >
          <div className="flex flex-col h-full p-3">
            {/* Title */}
            <p
              className="text-[14px] text-[#373338] mb-2"
              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
            >
              Enter your full legal name
            </p>

            {/* Signature Input */}
            <div className="bg-[#f7f7f8] border border-[#d9dde9] rounded-lg px-3 pt-3 pb-2 flex flex-col justify-between flex-1 min-h-[80px]">
              <div className="flex-1" />
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Your signature"
                className={cn(
                  'w-full bg-transparent border-none outline-none',
                  'text-[28px] leading-[32px] text-[#6e7791] tracking-[-0.1px] placeholder:text-[#c0bcc0] placeholder:text-[16px]'
                )}
                style={{
                  fontFamily: 'Sacramento, cursive',
                }}
                autoFocus
              />
              {/* Date stamp */}
              <p
                className="text-[10px] text-[#7986b2] text-right mt-1"
                style={{ fontFamily: 'Fira Mono, monospace' }}
              >
                {currentDate}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSign}
              disabled={!isValid}
              className={cn(
                'w-full py-2.5 rounded-lg text-[13px] font-medium mt-2 transition-all',
                isValid
                  ? 'bg-[#373338] text-white hover:bg-[#29272a]'
                  : 'bg-[#e8e5e8] text-[#9a909a] cursor-not-allowed'
              )}
              style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
            >
              Confirm and continue
            </button>

            {/* Disclaimer */}
            <p
              className="text-[10px] text-[#7f7582] text-center mt-2"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              This acts as your electronic acknowledgment.
            </p>

            {/* Back button */}
            <button
              onClick={() => {
                setShowSignatureOverlay(false);
                setSignature('');
              }}
              className="text-[11px] text-[#7f7582] hover:text-[#373338] mt-1 transition-colors"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              ← Back to document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
