import React, { useRef, useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

interface ScratchCardProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  coverColor?: string;
  revealThreshold?: number;
  onReveal?: () => void;
}

// Custom confetti that shoots from corners
function CornerConfetti({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      numberOfPieces={150}
      gravity={0.25}
      initialVelocityX={isLeft ? { min: 10, max: 25 } : { min: -25, max: -10 }}
      initialVelocityY={{ min: -35, max: -20 }}
      confettiSource={{
        x: isLeft ? 0 : window.innerWidth,
        y: window.innerHeight,
        w: 10,
        h: 10,
      }}
      colors={['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#78350f', '#fef3c7', '#fff']}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }}
    />
  );
}

export function ScratchCard({
  children,
  width = 400,
  height = 200,
  coverColor = '#d4a574',
  revealThreshold = 50,
  onReveal,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [dimensions, setDimensions] = useState({ width, height });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set dimensions based on container
    const rect = container.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw scratch pattern
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#c9a66b');
    gradient.addColorStop(0.5, '#d4a574');
    gradient.addColorStop(1, '#b8956a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add shimmer pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < rect.width; i += 20) {
      ctx.fillRect(i, 0, 10, rect.height);
    }

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 16px "Soehne Kraftig", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH TO REVEAL ✨', rect.width / 2, rect.height / 2);
  }, []);

  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    return (transparentPixels / (pixels.length / 4)) * 100;
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 25, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage();
    setScratchPercentage(percentage);

    if (percentage >= revealThreshold && !isRevealed) {
      revealCard();
    }
  }, [isRevealed, revealThreshold, calculateScratchPercentage]);

  const revealCard = useCallback(() => {
    setIsRevealed(true);
    setShowConfetti(true);
    onReveal?.();

    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }, [onReveal]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {showConfetti && (
        <>
          <CornerConfetti side="left" />
          <CornerConfetti side="right" />
        </>
      )}

      {/* Content underneath */}
      <div className={`transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-100'}`}>
        {children}
      </div>

      {/* Scratch overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-pointer rounded-xl"
          style={{ touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
}
