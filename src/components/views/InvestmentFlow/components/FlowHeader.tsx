import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import goodfinLogo from '../../Welcome02/assets/goodfin-logo.png';

interface FlowHeaderProps {
  progress: number; // 0-100
  onDismiss: () => void;
  className?: string;
}

export function FlowHeader({ progress, onDismiss, className }: FlowHeaderProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle modal animation
  useEffect(() => {
    if (showConfirmModal) {
      // Small delay to trigger animation
      const timer = setTimeout(() => setModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
    }
  }, [showConfirmModal]);

  const handleDoThisLater = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDismiss = () => {
    setShowConfirmModal(false);
    onDismiss();
  };

  const handleCancelDismiss = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className={cn('flex flex-col', className)}>
        {/* Navigation bar */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-[#edebee]"
          style={{
            boxShadow: '0px 4px 16px 0px rgba(154, 144, 161, 0.1)',
          }}
        >
          {/* Left placeholder for hamburger/back */}
          <div className="w-24" />

          {/* Center logo */}
          <img src={goodfinLogo} alt="Goodfin" className="h-6" />

          {/* Dismiss button */}
          <button
            onClick={handleDoThisLater}
            className="px-6 py-2 border border-[#373338] rounded text-sm font-medium text-[#29272a] hover:bg-black/5 transition-colors"
          >
            I will do this later
          </button>
        </div>

        {/* Progress bar with smooth animation */}
        <div className="h-1 bg-transparent overflow-hidden">
          <div
            className="h-2 bg-[#7f7582] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with fade animation */}
          <div
            className={cn(
              'absolute inset-0 bg-black/40 backdrop-blur-sm',
              'transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              modalVisible ? 'opacity-100' : 'opacity-0'
            )}
            onClick={handleCancelDismiss}
          />

          {/* Modal with scale and fade animation */}
          <div
            className={cn(
              'relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden',
              'transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
              modalVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            )}
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            {/* Close button */}
            <button
              onClick={handleCancelDismiss}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5 text-[#685f6a]" />
            </button>

            {/* Content */}
            <div className="px-8 pt-10 pb-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f0eef0] flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="#7f7582" strokeWidth="2" />
                  <path
                    d="M12 6v6l4 2"
                    stroke="#7f7582"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2
                className="text-[24px] leading-[28px] text-[#373338] mb-3"
                style={{ fontFamily: 'Test Signifier, serif' }}
              >
                Continue anytime
              </h2>

              {/* Message */}
              <p className="text-[16px] leading-[22px] text-[#685f6a] mb-8">
                Your progress has been saved. You can pick up right where you left off whenever you're ready.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmDismiss}
                  className="w-full px-6 py-3 border border-[#373338] text-[#373338] rounded-lg text-[16px] font-medium hover:bg-black/5 transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Return to home
                </button>
                <button
                  onClick={handleCancelDismiss}
                  className="w-full px-6 py-3 bg-[#373338] text-white rounded-lg text-[16px] font-medium hover:bg-[#29272a] transition-colors"
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  Continue investing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
