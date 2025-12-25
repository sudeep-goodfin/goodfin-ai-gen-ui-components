import { useState, useRef, useEffect } from 'react';
import { X, Check, FileText, Pen, Type, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InvestmentDocument } from '../types';

type SignatureMode = 'draw' | 'type';

interface DocumentSigningModalProps {
  isOpen: boolean;
  document: InvestmentDocument | null;
  onClose: () => void;
  onSign: (documentId: string) => void;
}

// Simple mock PDF pages
const MOCK_PDF_PAGES = [
  { pageNumber: 1, content: 'Page 1 - Terms and Conditions' },
  { pageNumber: 2, content: 'Page 2 - Investment Terms' },
  { pageNumber: 3, content: 'Page 3 - Risk Disclosures' },
  { pageNumber: 4, content: 'Page 4 - Signatures' },
];

export function DocumentSigningModal({
  isOpen,
  document,
  onClose,
  onSign,
}: DocumentSigningModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSignature, setShowSignature] = useState(false);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const totalPages = MOCK_PDF_PAGES.length;

  // Clear canvas when mode changes
  useEffect(() => {
    if (signatureMode === 'draw' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      setHasDrawnSignature(false);
    }
  }, [signatureMode]);

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#373338';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasDrawnSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
  };

  const handleSign = () => {
    if (!document) return;
    onSign(document.id);
  };

  const canSign =
    (signatureMode === 'draw' && hasDrawnSignature) ||
    (signatureMode === 'type' && typedSignature.trim().length > 0);

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0dce0] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f7f7f8] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#7f7582]" />
            </div>
            <div>
              <h2
                className="text-[16px] font-medium text-[#373338]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {document.title}
              </h2>
              <p className="text-[12px] text-[#7f7582]">Review and sign</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f7f7f8] transition-colors"
          >
            <X className="w-5 h-5 text-[#7f7582]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {!showSignature ? (
            <>
              {/* PDF Viewer Mock */}
              <div className="flex-1 bg-[#f0eef0] p-6 overflow-auto">
                <div className="bg-white rounded-lg shadow-sm max-w-xl mx-auto p-8 min-h-[400px]">
                  <div className="text-center text-[#7f7582]">
                    <p className="text-lg font-medium mb-2">{document.title}</p>
                    <p className="text-sm">{MOCK_PDF_PAGES[currentPage - 1]?.content}</p>
                    <p className="text-xs text-[#a09a9f] mt-8">
                      [Document preview - Page {currentPage}]
                    </p>
                  </div>
                </div>
              </div>

              {/* Page navigation */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-[#e0dce0] bg-white flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-[#f7f7f8] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#7f7582]" />
                  </button>
                  <span className="text-[13px] text-[#7f7582]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-[#f7f7f8] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5 text-[#7f7582]" />
                  </button>
                </div>

                <button
                  onClick={() => setShowSignature(true)}
                  className="px-4 py-2 bg-[#373338] text-white text-[13px] font-medium rounded-lg hover:bg-[#29272a] transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  <Pen className="w-4 h-4" />
                  Sign Document
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Signature panel */}
              <div className="flex-1 p-5 overflow-auto">
                {/* Mode toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSignatureMode('draw')}
                    className={cn(
                      'flex-1 py-2 px-4 rounded-lg text-[13px] font-medium flex items-center justify-center gap-2 transition-colors',
                      signatureMode === 'draw'
                        ? 'bg-[#373338] text-white'
                        : 'bg-[#f7f7f8] text-[#7f7582] hover:bg-[#edebee]'
                    )}
                  >
                    <Pen className="w-4 h-4" />
                    Draw
                  </button>
                  <button
                    onClick={() => setSignatureMode('type')}
                    className={cn(
                      'flex-1 py-2 px-4 rounded-lg text-[13px] font-medium flex items-center justify-center gap-2 transition-colors',
                      signatureMode === 'type'
                        ? 'bg-[#373338] text-white'
                        : 'bg-[#f7f7f8] text-[#7f7582] hover:bg-[#edebee]'
                    )}
                  >
                    <Type className="w-4 h-4" />
                    Type
                  </button>
                </div>

                {signatureMode === 'draw' ? (
                  <div>
                    <div className="relative bg-[#fafafa] border-2 border-dashed border-[#e0dce0] rounded-xl">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={150}
                        className="w-full touch-none cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      {!hasDrawnSignature && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="text-[14px] text-[#a09a9f]">Draw your signature here</p>
                        </div>
                      )}
                    </div>
                    {hasDrawnSignature && (
                      <button
                        onClick={clearCanvas}
                        className="mt-2 text-[13px] text-[#7f7582] hover:text-[#373338] flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      placeholder="Type your full name"
                      className="w-full px-4 py-4 text-[20px] bg-[#fafafa] border-2 border-[#e0dce0] rounded-xl focus:border-[#7a5af5] outline-none transition-colors"
                      style={{ fontFamily: 'cursive' }}
                    />
                    {typedSignature && (
                      <div className="mt-4 p-4 bg-[#fafafa] rounded-xl border border-[#e0dce0]">
                        <p className="text-[12px] text-[#7f7582] mb-2">Preview:</p>
                        <p
                          className="text-[24px] text-[#373338]"
                          style={{ fontFamily: 'cursive' }}
                        >
                          {typedSignature}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-[12px] text-[#7f7582] mt-4">
                  By signing, you agree to the terms outlined in this document.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-[#e0dce0] bg-white flex-shrink-0">
                <button
                  onClick={() => setShowSignature(false)}
                  className="px-4 py-2 text-[13px] font-medium text-[#7f7582] hover:text-[#373338] transition-colors"
                >
                  Back to document
                </button>
                <button
                  onClick={handleSign}
                  disabled={!canSign}
                  className={cn(
                    'px-6 py-2 text-[13px] font-medium rounded-lg flex items-center gap-2 transition-colors',
                    canSign
                      ? 'bg-[#5a8a5a] text-white hover:bg-[#4a7a4a]'
                      : 'bg-[#e0dce0] text-[#a09a9f] cursor-not-allowed'
                  )}
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  <Check className="w-4 h-4" />
                  Confirm Signature
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
