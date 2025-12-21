import { cn } from '@/lib/utils';

interface RippleAnimationProps {
  className?: string;
  color?: string;
}

export function RippleAnimation({
  className,
  color = 'rgb(138, 126, 144)'
}: RippleAnimationProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className
      )}
      style={{
        filter: 'blur(11px)',
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 0 15px ${color}40)`,
        }}
      >
        {/* Center Core */}
        <circle cx="500" cy="500" r="40" fill={color} opacity="0.9" />

        {/* Animated Rings */}
        <g className="origin-center animate-ripple-1">
          <path
            fill={color}
            d="M500,0 C775.95,0 1000,224.05 1000,500 C1000,775.95 775.95,1000 500,1000 C224.05,1000 0,775.95 0,500 C0,224.05 224.05,0 500,0 Z"
          />
        </g>
        <g className="origin-center animate-ripple-2">
          <path
            fill={color}
            d="M500,0 C775.95,0 1000,224.05 1000,500 C1000,775.95 775.95,1000 500,1000 C224.05,1000 0,775.95 0,500 C0,224.05 224.05,0 500,0 Z"
          />
        </g>
        <g className="origin-center animate-ripple-3">
          <path
            fill={color}
            d="M500,0 C775.95,0 1000,224.05 1000,500 C1000,775.95 775.95,1000 500,1000 C224.05,1000 0,775.95 0,500 C0,224.05 224.05,0 500,0 Z"
          />
        </g>
      </svg>
    </div>
  );
}
