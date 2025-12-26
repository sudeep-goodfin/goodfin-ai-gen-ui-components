import { useState, useEffect } from 'react';
import { X, Maximize2, Sparkles } from 'lucide-react';
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
  'suitability': llcPdf, // Using LLC as suitability doc
};

// Documents that require signature (PPM is review-only)
const REQUIRES_SIGNATURE: Record<string, boolean> = {
  'ppm': false,
  'subscription': true,
  'suitability': true,
};

interface DocumentSigningModalProps {
  isOpen: boolean;
  document: InvestmentDocument | null;
  onClose: () => void;
  onSign: (documentId: string) => void;
}

export function DocumentSigningModal({
  isOpen,
  document,
  onClose,
  onSign,
}: DocumentSigningModalProps) {
  const [signature, setSignature] = useState('');
  const [showSignatureOverlay, setShowSignatureOverlay] = useState(false);
  const [overlayAnimated, setOverlayAnimated] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSignature('');
      setShowSignatureOverlay(false);
      setOverlayAnimated(false);
      setShowFullscreen(false);
    }
  }, [isOpen]);

  const requiresSignature = document ? REQUIRES_SIGNATURE[document.id] !== false : true;

  const handleReviewedClick = () => {
    if (requiresSignature) {
      setShowSignatureOverlay(true);
    } else {
      // For review-only documents (like PPM), acknowledge directly
      if (document) {
        onSign(document.id);
        onClose();
      }
    }
  };

  const handleSign = () => {
    if (!document || !signature.trim()) return;
    onSign(document.id);
    onClose();
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
  const pdfUrl = document ? DOCUMENT_PDFS[document.id] : null;

  if (!isOpen || !document) return null;

  return (
    <>
      {/* Fullscreen PDF Modal */}
      {showFullscreen && pdfUrl && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-8">
          <div className="relative w-full h-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e4e7] bg-[#f7f7f8]">
              <h3
                className="text-[18px] leading-[24px] text-[#373338]"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                {document.title}
              </h3>
              <button
                onClick={() => setShowFullscreen(false)}
                className="p-2 hover:bg-[#eae8eb] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#685f6a]" />
              </button>
            </div>
            {/* PDF Content */}
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&view=FitH`}
              className="w-full h-[calc(100%-64px)] border-none"
              title={document.title}
            />
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl mx-4 bg-[#f7f7f8] rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0dce0] bg-white">
            <h2
              className="text-[20px] leading-[24px] text-[#373338]"
              style={{ fontFamily: 'Test Signifier, serif' }}
            >
              Document Review
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
            >
              <X className="w-5 h-5 text-[#7f7582]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-[#f7f7f8] flex flex-col gap-6 p-6 w-full rounded-xl overflow-hidden relative border border-[#e0dce0]">
              {/* Document Title & Description */}
              <div className="flex flex-col gap-2 w-full">
                <h3
                  className="text-[24px] leading-[28px] text-[#373338]"
                  style={{ fontFamily: 'Test Signifier, serif' }}
                >
                  {document.title}
                </h3>
                <p
                  className="text-[14px] leading-[20px] text-[#69606d]"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {document.fullSummary}
                </p>
                <button
                  className="self-start mt-1 px-3 py-1.5 text-[12px] leading-[16px] text-[#685f6a] bg-white border border-[#d9d5db] rounded-full hover:bg-[#f7f7f8] hover:border-[#beb9c0] transition-colors flex items-center gap-1.5"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  <Sparkles className="w-3 h-3" />
                  Ask AI to explain this document
                </button>
              </div>

              {/* PDF Preview */}
              {pdfUrl && (
                <div className="w-full bg-white rounded-lg border border-[#e0ddd8] overflow-hidden shadow-sm relative group">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    className="w-full h-[300px] border-none"
                    title={document.title}
                  />
                  {/* Fullscreen button */}
                  <button
                    onClick={() => setShowFullscreen(true)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white border border-[#d9d5db] rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 text-[#685f6a]" />
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleReviewedClick}
                className={cn(
                  'w-full py-3.5 px-8 rounded-xl text-[16px] leading-[20px] text-[#f4f3f5]',
                  'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                  'relative overflow-hidden hover:opacity-95 transition-opacity'
                )}
                style={{
                  fontFamily: 'Soehne Kraftig, sans-serif',
                  background:
                    'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
                }}
              >
                {requiresSignature ? "I've reviewed this — Let's Sign" : "I've reviewed this document"}
                <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
              </button>

              {/* Signature Overlay - slides up when user clicks "I've reviewed this" */}
              {showSignatureOverlay && (
                <div
                  className={cn(
                    'absolute bottom-0 left-0 right-0 bg-white border-t border-[#e6e4e7] rounded-t-[24px] overflow-hidden',
                    'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    overlayAnimated
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-full opacity-0'
                  )}
                >
                  <div className="flex flex-col gap-3 px-6 pt-5 pb-6">
                    {/* Title */}
                    <p
                      className="text-[18px] leading-[24px] text-[#373338] tracking-[-0.3px]"
                      style={{ fontFamily: 'Test Signifier, serif' }}
                    >
                      Enter your full legal name
                    </p>

                    {/* Signature Input */}
                    <div className="bg-white border border-[#d9dde9] rounded-xl px-4 pt-4 pb-2 flex flex-col justify-between h-[100px]">
                      <div className="flex-1" />
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="Your signature"
                        className={cn(
                          'w-full bg-transparent border-none outline-none',
                          'text-[36px] leading-[40px] text-[#6e7791] tracking-[-0.1px] placeholder:text-[#c0bcc0] placeholder:text-[20px]'
                        )}
                        style={{
                          fontFamily: 'Sacramento, cursive',
                        }}
                        autoFocus
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
                      onClick={handleSign}
                      disabled={!isValid}
                      className={cn(
                        'w-full py-3.5 px-8 rounded-xl text-[16px] leading-[20px]',
                        'shadow-[0px_2px_4px_0px_rgba(190,185,192,0.64)]',
                        'relative overflow-hidden mt-1 transition-all',
                        isValid
                          ? 'text-[#f4f3f5] hover:opacity-95'
                          : 'text-[#9a909a] cursor-not-allowed'
                      )}
                      style={{
                        fontFamily: 'Soehne Kraftig, sans-serif',
                        background: isValid
                          ? 'linear-gradient(94.99deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)'
                          : '#e8e5e8',
                      }}
                    >
                      Confirm and continue
                      {isValid && (
                        <div className="absolute inset-0 shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.14)] pointer-events-none" />
                      )}
                    </button>

                    {/* Disclaimer */}
                    <p
                      className="text-[13px] leading-[16px] text-[#7f7582] text-center mt-1"
                      style={{ fontFamily: 'Soehne, sans-serif' }}
                    >
                      This acts as your electronic signature for this document.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
