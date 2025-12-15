import React from 'react';
import { cn } from '../../../lib/utils';
import { colors } from '../Onboarding/designTokens';

type WelcomeScreenLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * WelcomeScreenLayout
 *
 * Dashboard-style layout wrapper for the Welcome Screen.
 * Provides:
 * - Full-screen container with radial gradient background
 * - Centered max-width content area
 * - Responsive padding and spacing
 */
export function WelcomeScreenLayout({ children, className }: WelcomeScreenLayoutProps) {
  // Radial gradient background SVG (reused from ChatBasedOnboarding)
  const bgSvg = `url("data:image/svg+xml,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`;

  return (
    <div
      className={cn(
        'min-h-screen w-full overflow-y-auto',
        className
      )}
      style={{
        background: `${bgSvg} no-repeat center bottom / 100% auto, ${colors.grey[100]}`,
      }}
    >
      {/* Hide scrollbar styles */}
      <style>{`
        .welcome-screen-container::-webkit-scrollbar {
          display: none;
        }
        .welcome-screen-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Content Container */}
      <div className="welcome-screen-container w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </div>
    </div>
  );
}

export default WelcomeScreenLayout;
