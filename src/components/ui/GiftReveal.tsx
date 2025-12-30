import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Gift, Sparkles, Users, MessageCircle, DollarSign } from 'lucide-react';
import Confetti from 'react-confetti';
import { cn } from '@/lib/utils';

// Reward card data
interface RewardCard {
  id: number;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  gradient: string;
  borderColor: string;
  accentColor: string;
}

const REWARD_CARDS: RewardCard[] = [
  {
    id: 1,
    icon: <DollarSign className="w-8 h-8" />,
    badge: 'Reward',
    title: 'Earn $300 Credit',
    description: 'Share your investment journey and get $300 credit toward your next deal. Tell us about your experience.',
    ctaLabel: 'Claim $300 Credit',
    gradient: 'from-amber-50 via-yellow-50 to-orange-50',
    borderColor: 'border-amber-200',
    accentColor: 'text-amber-600',
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8" />,
    badge: 'Exclusive',
    title: 'Private 1-on-1 Meeting',
    description: 'You\'ve been matched with a dedicated Goodfin member. Schedule a private meeting to ask questions directly.',
    ctaLabel: 'Schedule Meeting',
    gradient: 'from-violet-50 via-purple-50 to-indigo-50',
    borderColor: 'border-violet-200',
    accentColor: 'text-violet-600',
  },
  {
    id: 3,
    icon: <MessageCircle className="w-8 h-8" />,
    badge: 'Community',
    title: 'Hot Deals Discussion',
    description: 'See what other members and investors are saying about the hottest deals on Goodfin. Join the conversation.',
    ctaLabel: 'View Discussions',
    gradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    borderColor: 'border-emerald-200',
    accentColor: 'text-emerald-600',
  },
];

// Custom confetti for celebration
function CelebrationConfetti() {
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
        initialVelocityX={{ min: -15, max: 15 }}
        initialVelocityY={{ min: -30, max: -10 }}
        confettiSource={{
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          w: 100,
          h: 100,
        }}
        colors={['#fbbf24', '#f59e0b', '#8b5cf6', '#6366f1', '#10b981', '#14b8a6', '#fff']}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1100, pointerEvents: 'none' }}
      />
    </>
  );
}

interface GiftRevealProps {
  onComplete?: () => void;
  onCardAction?: (cardId: number) => void;
}

export function GiftReveal({ onComplete, onCardAction }: GiftRevealProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardAnimating, setCardAnimating] = useState(false);

  // Handle modal animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsModalVisible(false);
    }
  }, [isOpen]);

  // Reveal first card when modal opens
  useEffect(() => {
    if (isOpen && revealedCards.length === 0) {
      const timer = setTimeout(() => {
        setRevealedCards([0]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, revealedCards.length]);

  const handleGiftClick = () => {
    setIsOpen(true);
  };

  const handleNextCard = () => {
    if (cardAnimating) return;

    const nextIndex = currentCardIndex + 1;
    if (nextIndex < REWARD_CARDS.length) {
      setCardAnimating(true);

      // After animation, show next card
      setTimeout(() => {
        setCurrentCardIndex(nextIndex);
        if (!revealedCards.includes(nextIndex)) {
          setRevealedCards([...revealedCards, nextIndex]);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        setCardAnimating(false);
      }, 400);
    } else {
      // All cards revealed - close modal
      handleClose();
    }
  };

  const handleSkip = () => {
    handleNextCard();
  };

  const handleCardAction = (cardId: number) => {
    onCardAction?.(cardId);
    handleNextCard();
  };

  const handleClose = () => {
    setIsOpen(false);
    onComplete?.();
  };

  const currentCard = REWARD_CARDS[currentCardIndex];
  const isLastCard = currentCardIndex === REWARD_CARDS.length - 1;

  return (
    <>
      {/* Gift Box - Closed State */}
      <button
        onClick={handleGiftClick}
        className="group relative w-full"
      >
        {/* Gift Box Container */}
        <div className="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-2xl p-6 border border-amber-200/60 overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.4), transparent)',
                animation: 'borderShine 2s linear infinite',
              }}
            />
          </div>

          {/* Shine overlay animation */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          >
            <div
              className="absolute -inset-full w-[200%] h-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%, transparent 100%)',
                animation: 'shine 3s ease-in-out infinite',
              }}
            />
          </div>

          {/* Sparkle particles */}
          <div className="absolute top-3 right-4 animate-pulse">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div className="absolute bottom-4 left-6 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="absolute top-1/2 right-8 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-3 h-3 text-orange-300" />
          </div>

          {/* Gift content */}
          <div className="relative flex items-center gap-4">
            {/* Gift icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full animate-pulse" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[11px] text-amber-700 uppercase tracking-wider font-medium"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  Rewards Unlocked
                </span>
              </div>
              <h3
                className="text-[18px] font-medium text-amber-900 mb-1"
                style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
              >
                3 Rewards Waiting
              </h3>
              <p
                className="text-[14px] text-amber-700/80"
                style={{ fontFamily: 'Soehne, sans-serif' }}
              >
                Tap to reveal your exclusive rewards
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <ChevronRight className="w-6 h-6 text-amber-600" />
            </div>
          </div>

          {/* Stacked cards preview */}
          <div className="absolute -bottom-2 -right-2 flex">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-16 bg-white rounded-lg border border-amber-200 shadow-md"
                style={{
                  transform: `rotate(${(i - 1) * 8}deg) translateX(${i * -20}px)`,
                  zIndex: 3 - i,
                }}
              />
            ))}
          </div>
        </div>
      </button>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-300",
            isModalVisible ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {showConfetti && <CelebrationConfetti />}

          {/* Close button */}
          <button
            onClick={handleClose}
            className={cn(
              "absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300",
              isModalVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Card Stack */}
          <div
            className={cn(
              "relative transition-all duration-500",
              isModalVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            )}
          >
            {/* Background cards (stack effect) */}
            {REWARD_CARDS.slice(currentCardIndex + 1).reverse().map((card, index) => {
              const offset = (REWARD_CARDS.length - currentCardIndex - 1 - index);
              return (
                <div
                  key={card.id}
                  className={cn(
                    "absolute top-0 left-0 w-[340px] h-[440px] bg-white/50 rounded-3xl border border-white/30 backdrop-blur-sm transition-all duration-300",
                  )}
                  style={{
                    transform: `translateY(${-offset * 12}px) scale(${1 - offset * 0.04})`,
                    zIndex: -offset,
                  }}
                />
              );
            })}

            {/* Current Card */}
            <div
              className={cn(
                "relative w-[340px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-400",
                cardAnimating && "animate-cardSlideOut"
              )}
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl p-[2px] overflow-hidden">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${currentCard.accentColor.includes('amber') ? '#fbbf24' : currentCard.accentColor.includes('violet') ? '#8b5cf6' : '#10b981'}, transparent, ${currentCard.accentColor.includes('amber') ? '#fbbf24' : currentCard.accentColor.includes('violet') ? '#8b5cf6' : '#10b981'})`,
                    animation: 'spin 3s linear infinite',
                  }}
                />
              </div>

              {/* Card content */}
              <div className={cn("relative bg-gradient-to-br rounded-3xl p-8", currentCard.gradient)}>
                {/* Badge */}
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6",
                    currentCard.accentColor.includes('amber') && "bg-amber-100 text-amber-700",
                    currentCard.accentColor.includes('violet') && "bg-violet-100 text-violet-700",
                    currentCard.accentColor.includes('emerald') && "bg-emerald-100 text-emerald-700",
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span
                    className="text-[11px] uppercase tracking-wider font-medium"
                    style={{ fontFamily: 'Soehne, sans-serif' }}
                  >
                    {currentCard.badge}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                    currentCard.accentColor.includes('amber') && "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
                    currentCard.accentColor.includes('violet') && "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
                    currentCard.accentColor.includes('emerald') && "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
                  )}
                >
                  {currentCard.icon}
                </div>

                {/* Title */}
                <h2
                  className="text-[24px] font-medium text-gray-900 mb-3"
                  style={{ fontFamily: 'Test Signifier, serif' }}
                >
                  {currentCard.title}
                </h2>

                {/* Description */}
                <p
                  className="text-[15px] text-gray-600 leading-relaxed mb-8"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {currentCard.description}
                </p>

                {/* Action button */}
                <button
                  onClick={() => handleCardAction(currentCard.id)}
                  className={cn(
                    "w-full py-3.5 rounded-xl font-medium text-[15px] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                    currentCard.accentColor.includes('amber') && "bg-gradient-to-r from-amber-500 to-orange-500",
                    currentCard.accentColor.includes('violet') && "bg-gradient-to-r from-violet-500 to-purple-600",
                    currentCard.accentColor.includes('emerald') && "bg-gradient-to-r from-emerald-500 to-teal-600",
                  )}
                  style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
                >
                  {currentCard.ctaLabel}
                </button>

                {/* Skip button */}
                <button
                  onClick={handleSkip}
                  className="w-full mt-3 py-2.5 text-[14px] text-gray-500 hover:text-gray-700 transition-colors"
                  style={{ fontFamily: 'Soehne, sans-serif' }}
                >
                  {isLastCard ? 'Close' : 'Skip to next'}
                </button>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {REWARD_CARDS.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentCardIndex
                          ? cn(
                              "w-6",
                              currentCard.accentColor.includes('amber') && "bg-amber-500",
                              currentCard.accentColor.includes('violet') && "bg-violet-500",
                              currentCard.accentColor.includes('emerald') && "bg-emerald-500",
                            )
                          : index < currentCardIndex
                            ? "bg-gray-300"
                            : "bg-gray-200"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }

        @keyframes borderShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cardSlideOut {
          0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(150%) rotate(12deg);
            opacity: 0;
          }
        }

        .animate-cardSlideOut {
          animation: cardSlideOut 0.4s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
