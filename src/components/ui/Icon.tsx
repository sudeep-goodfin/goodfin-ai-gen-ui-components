import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  path: string;
  size?: number | string;
  fillColor?: string;
}

export function Icon({ path, size = 24, className, fillColor = "currentColor", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("block shrink-0", className)}
      preserveAspectRatio="none"
      {...props}
    >
      <path d={path} fill={fillColor} />
    </svg>
  );
}

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  viewBox?: string;
}

export function CustomIcon({ children, viewBox = "0 0 24 24", className, ...props }: CustomIconProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={cn("block shrink-0", className)}
      preserveAspectRatio="none"
      {...props}
    >
      {children}
    </svg>
  );
}
