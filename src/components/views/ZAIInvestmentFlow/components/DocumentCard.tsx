import { useState } from 'react';
import { FileText, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InvestmentDocument, ChipAction } from '../types';

interface DocumentCardProps {
  document: InvestmentDocument;
  isSigned: boolean;
  onSign: () => void;
  onAskQuestion: (question: string) => void;
}

export function DocumentCard({
  document,
  isSigned,
  onSign,
  onAskQuestion,
}: DocumentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#e0dce0] overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              isSigned ? 'bg-[#e8f5e9]' : 'bg-[#f7f7f8]'
            )}
          >
            {isSigned ? (
              <Check className="w-5 h-5 text-[#5a8a5a]" />
            ) : (
              <FileText className="w-5 h-5 text-[#7f7582]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className="text-[15px] font-medium text-[#373338]"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                {document.title}
              </h3>
              {isSigned && (
                <span className="px-2 py-0.5 bg-[#e8f5e9] text-[#5a8a5a] text-[11px] font-medium rounded-full">
                  Signed
                </span>
              )}
            </div>

            <p
              className="text-[13px] text-[#7f7582] mt-1 leading-relaxed"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {isExpanded ? document.fullSummary : document.summary}
            </p>

            {/* Expand/collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[13px] text-[#7a5af5] hover:text-[#6548d4] mt-1 inline-flex items-center gap-1"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action chips */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {document.chips.map((chip, index) => (
            <button
              key={index}
              onClick={() => onAskQuestion(chip.prompt)}
              className="px-3 py-1.5 bg-[#f7f7f8] hover:bg-[#edebee] text-[12px] text-[#373338] rounded-full transition-colors"
              style={{ fontFamily: 'Soehne, sans-serif' }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 bg-[#fafafa] border-t border-[#e0dce0] flex items-center justify-between gap-3">
        <button
          onClick={() => onAskQuestion(`Tell me more about the ${document.title}`)}
          className="inline-flex items-center gap-1.5 text-[13px] text-[#7f7582] hover:text-[#373338] transition-colors"
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          <Sparkles className="w-4 h-4" />
          Ask Z for more
        </button>

        {!isSigned && (
          <button
            onClick={onSign}
            className="px-4 py-2 bg-[#373338] text-white text-[13px] font-medium rounded-lg hover:bg-[#29272a] transition-colors"
            style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
          >
            Sign Document
          </button>
        )}
      </div>
    </div>
  );
}
