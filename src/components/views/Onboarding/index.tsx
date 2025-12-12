import React, { useState } from 'react';
import { SignupStep } from './SignupStep';
import { CountryStep } from './CountryStep';
import { VerifyPhoneStep } from './VerifyPhoneStep';
import { AccreditationStep } from './AccreditationStep';
import { SummaryStep } from './SummaryStep';
import { colors } from './designTokens';

// Onboarding step types - matching goodfin_aws SIGNUP_STEPS
export type OnboardingStep =
  | 'signup'
  | 'country'
  | 'verify-phone'
  | 'accreditation'
  | 'summary';

// Variants for showcasing different states
export type OnboardingVariant =
  | 'signup'
  | 'country'
  | 'verify-phone'
  | 'accreditation'
  | 'summary'
  | 'full-flow';

export const onboardingVariants = [
  { id: 'full-flow', label: 'Full Flow' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'country', label: 'Country' },
  { id: 'verify-phone', label: 'Phone' },
  { id: 'accreditation', label: 'Accreditation' },
  { id: 'summary', label: 'Summary' },
];

// Mock user data for states
export type OnboardingUserData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  zip?: string;
  phoneNumber: string;
  isAccredited: boolean;
  accreditationSelections: string[];
};

const initialUserData: OnboardingUserData = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  zip: '',
  phoneNumber: '',
  isAccredited: false,
  accreditationSelections: [],
};

// Mock user data for individual step previews
const mockUserData: OnboardingUserData = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  country: 'United States',
  zip: '94105',
  phoneNumber: '+1 (415) 555-0123',
  isAccredited: true,
  accreditationSelections: ['netWorthBased', 'qualifiedClient'],
};

type OnboardingViewProps = {
  variant?: OnboardingVariant;
};

/**
 * OnboardingView Component
 *
 * Displays the Goodfin onboarding flow with multiple steps:
 * 1. Signup - Name & Email
 * 2. Country - Primary residence
 * 3. Verify Phone - Phone number with SMS consent
 * 4. Accreditation - Investor accreditation status
 * 5. Summary - Review and submit
 */
export function OnboardingView({ variant = 'signup' }: OnboardingViewProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    variant === 'full-flow' ? 'signup' : variant as OnboardingStep
  );
  const [userData, setUserData] = useState<OnboardingUserData>(
    variant === 'full-flow' ? initialUserData : mockUserData
  );
  const [isLoading, setIsLoading] = useState(false);

  // For individual step variants, show that step directly
  // For full-flow, enable navigation
  const isFullFlow = variant === 'full-flow';

  const handleNextStep = (nextStep: OnboardingStep) => {
    if (isFullFlow) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setCurrentStep(nextStep);
        setIsLoading(false);
      }, 600);
    }
  };

  const handlePrevStep = (prevStep: OnboardingStep) => {
    if (isFullFlow) {
      setCurrentStep(prevStep);
    }
  };

  const handleUpdateUserData = (data: Partial<OnboardingUserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Determine which step to show
  const stepToShow = isFullFlow ? currentStep : variant as OnboardingStep;

  // Step order for progress indicator
  const steps: OnboardingStep[] = ['signup', 'country', 'verify-phone', 'accreditation', 'summary'];
  const currentStepIndex = steps.indexOf(stepToShow);

  // Inline SVG as data URI for background
  const bgSvg = `url("data:image/svg+xml,%3Csvg width='1440' height='981' viewBox='0 0 1440 981' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1440' height='981' fill='%23F0EEF0'/%3E%3Crect width='1440' height='981' fill='url(%23paint0_radial)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(549.5 -560.5) rotate(30.465) scale(2906.24 2427.24)'%3E%3Cstop offset='0.283654' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.413462' stop-color='%23E9E6EA' stop-opacity='0'/%3E%3Cstop offset='0.4376' stop-color='white' stop-opacity='0.3'/%3E%3Cstop offset='0.591346' stop-color='%23FFF0D8'/%3E%3Cstop offset='0.701923' stop-color='%23FF954A'/%3E%3Cstop offset='0.850962' stop-color='white'/%3E%3Cstop offset='0.985577' stop-color='%23E9E6EA'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`;

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{
        background: `${bgSvg} no-repeat center bottom / 100% auto, ${colors.grey[100]}`,
      }}
    >
      {/* Header */}
      <header
        className="w-full py-5 px-8 flex items-center justify-center"
        style={{
          background: 'transparent',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
            fontSize: '20px',
            fontWeight: 700,
            color: colors.grey[950],
            letterSpacing: '-0.5px',
          }}
        >
          goodfin
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 overflow-y-auto">
        {stepToShow === 'signup' && (
          <SignupStep
            onNext={(data) => {
              handleUpdateUserData(data);
              handleNextStep('country');
            }}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'country' && (
          <CountryStep
            onNext={(country, zip) => {
              handleUpdateUserData({ country, zip });
              handleNextStep('verify-phone');
            }}
            onBack={() => handlePrevStep('signup')}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'verify-phone' && (
          <VerifyPhoneStep
            onNext={(phoneNumber) => {
              handleUpdateUserData({ phoneNumber });
              handleNextStep('accreditation');
            }}
            onBack={() => handlePrevStep('country')}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'accreditation' && (
          <AccreditationStep
            onNext={(isAccredited, selections) => {
              handleUpdateUserData({ isAccredited, accreditationSelections: selections });
              handleNextStep('summary');
            }}
            onBack={() => handlePrevStep('verify-phone')}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'summary' && (
          <SummaryStep
            userData={isFullFlow ? userData : mockUserData}
            onBack={() => handlePrevStep('accreditation')}
            onSubmit={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                alert('Application submitted successfully!');
              }, 1500);
            }}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer - Step indicator for full flow */}
      {isFullFlow && stepToShow !== 'summary' && (
        <footer className="py-4 flex justify-center">
          <div className="flex items-center gap-2">
            {steps.slice(0, -1).map((step, index) => (
              <div
                key={step}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: index <= currentStepIndex
                    ? colors.grey[950]
                    : colors.grey[300],
                }}
              />
            ))}
          </div>
        </footer>
      )}
    </div>
  );
}

export default OnboardingView;
