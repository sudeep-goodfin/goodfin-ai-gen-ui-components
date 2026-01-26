import { cn } from "../../../../../lib/utils";

interface GoodfinAILogoProps {
  className?: string;
  size?: number;
}

export function GoodfinAILogo({ className, size = 48 }: GoodfinAILogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 801 803"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Background circle with shadow */}
      <g filter="url(#shadow)">
        <rect
          width="799.473"
          height="799.473"
          x=".812"
          y="3.176"
          fill="#fff"
          rx="399.736"
        />
      </g>

      {/* Star shape with orange gradient */}
      <path
        fill="url(#orangeGradient)"
        d="M403.266 521.227c54.178 0 99.327-38.653 109.377-89.886h-72.209l-36.681-22.267h254.986c.198 3.813-1.658 7.729-5.568 9.599a512.189 512.189 0 0 0-240.994 240.995c-3.561 7.443-14.536 7.443-18.096 0a512.195 512.195 0 0 0-240.995-240.995c-7.443-3.56-7.443-14.535 0-18.096a512.19 512.19 0 0 0 240.995-240.995c3.56-7.443 14.535-7.443 18.096 0a512.199 512.199 0 0 0 155.302 189.145h-70.931c-19.912-30.369-54.254-50.427-93.282-50.427-61.559 0-111.463 49.904-111.463 111.463 0 61.56 49.904 111.464 111.463 111.464Z"
      />

      <defs>
        {/* Orange gradient */}
        <linearGradient
          id="orangeGradient"
          x1="200"
          x2="600"
          y1="200"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAA76B" />
          <stop offset="1" stopColor="#FFC971" />
        </linearGradient>

        {/* Shadow filter for the background circle */}
        <filter
          id="shadow"
          width="880.04"
          height="836.657"
          x=".812"
          y="-34.009"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="80.567" dy="-37.185" />
          <feGaussianBlur stdDeviation="51.439" />
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0" />
          <feBlend in2="shape" result="effect1_innerShadow_1334_26735" />
        </filter>
      </defs>
    </svg>
  );
}

export default GoodfinAILogo;
