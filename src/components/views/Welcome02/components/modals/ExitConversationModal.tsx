import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ExitConversationModalProps {
  isOpen: boolean;
  conversationTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  onDontAskAgain: (value: boolean) => void;
}

export function ExitConversationModal({
  isOpen,
  conversationTitle,
  onConfirm,
  onCancel,
  onDontAskAgain,
}: ExitConversationModalProps) {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDontAskAgain(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (dontAskAgain) {
      onDontAskAgain(true);
    }
    onConfirm();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setDontAskAgain(checked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
        className={cn(
          "relative z-10 w-[90vw] max-w-[400px] bg-white rounded-2xl shadow-xl",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        <div className="p-6">
          {/* Title */}
          <h2
            id="exit-modal-title"
            className="text-[17px] font-semibold text-[#29272a] mb-2"
          >
            Leave conversation?
          </h2>

          {/* Description */}
          <p className="text-[14px] text-[#69606d] mb-5 leading-relaxed">
            You're about to leave{' '}
            <span className="font-medium text-[#48424a]">"{conversationTitle}"</span>.
            Your conversation will be saved in history.
          </p>

          {/* Don't ask again checkbox */}
          <label className="flex items-center gap-3 cursor-pointer mb-6 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={dontAskAgain}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-md border-2 transition-all duration-150",
                  dontAskAgain
                    ? "bg-[#29272a] border-[#29272a]"
                    : "bg-white border-[#d0cdd2] group-hover:border-[#a09a9f]"
                )}
              >
                {dontAskAgain && (
                  <svg
                    className="w-full h-full text-white p-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[13px] text-[#69606d] select-none">
              Don't ask me again
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-[14px] font-medium",
                "bg-[#f0eef0] text-[#48424a]",
                "hover:bg-[#e6e4e7] transition-colors"
              )}
            >
              Stay
            </button>
            <button
              onClick={handleConfirm}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-[14px] font-medium",
                "bg-[#29272a] text-white",
                "hover:bg-[#3d3a3f] transition-colors"
              )}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
