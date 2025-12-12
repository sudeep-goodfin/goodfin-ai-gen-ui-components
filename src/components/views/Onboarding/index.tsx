import React, { useState } from 'react';
import { SignupStep } from './SignupStep';
import { CountryStep } from './CountryStep';
import { VerifyPhoneStep } from './VerifyPhoneStep';
import { SummaryStep } from './SummaryStep';
import { NameStep } from './NameStep';
import { PhoneStep } from './PhoneStep';
import { AccreditedConfirmStep } from './AccreditedConfirmStep';
import { colors } from './designTokens';

// Onboarding step types - matching goodfin_aws SIGNUP_STEPS
export type OnboardingStep =
  | 'name'
  | 'phone'
  | 'accredited-confirm'
  | 'signup'
  | 'country'
  | 'verify-phone'
  | 'summary';

// Variants for showcasing different states
export type OnboardingVariant =
  | 'animated-flow'
  | 'signup'
  | 'country'
  | 'verify-phone'
  | 'summary'
  | 'full-flow';

export const onboardingVariants = [
  { id: 'animated-flow', label: 'AI Animated' },
  { id: 'full-flow', label: 'Full Flow' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'country', label: 'Country' },
  { id: 'verify-phone', label: 'Phone' },
  { id: 'summary', label: 'Summary' },
];

// Mock user data for states
export type OnboardingUserData = {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  zip?: string;
  phoneNumber: string;
  isAccredited: boolean;
  isAccreditedConfirmed: boolean;
  accreditationSelections: string[];
};

const initialUserData: OnboardingUserData = {
  fullName: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  zip: '',
  phoneNumber: '',
  isAccredited: false,
  isAccreditedConfirmed: false,
  accreditationSelections: [],
};

// Mock user data for individual step previews
const mockUserData: OnboardingUserData = {
  fullName: 'Alex Johnson',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  country: 'United States',
  zip: '94105',
  phoneNumber: '+1 (415) 555-0123',
  isAccredited: true,
  isAccreditedConfirmed: true,
  accreditationSelections: ['netWorthBased', 'qualifiedClient'],
};

type OnboardingViewProps = {
  variant?: OnboardingVariant;
};

/**
 * OnboardingView Component
 *
 * Displays the Goodfin onboarding flow with multiple steps:
 * 1. Name - First name, then reveals last name
 * 2. Phone - Phone number with country code
 * 3. Accreditation - Investor accreditation status with switches
 * 4. Summary - Review and submit
 */
export function OnboardingView({ variant = 'animated-flow' }: OnboardingViewProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    variant === 'full-flow' ? 'signup' : variant === 'animated-flow' ? 'name' : variant as OnboardingStep
  );
  const [userData, setUserData] = useState<OnboardingUserData>(
    variant === 'full-flow' || variant === 'animated-flow' ? initialUserData : mockUserData
  );
  const [isLoading, setIsLoading] = useState(false);

  // For individual step variants, show that step directly
  // For full-flow or animated-flow, enable navigation
  const isFullFlow = variant === 'full-flow';
  const isAnimatedFlow = variant === 'animated-flow';

  const handleNextStep = (nextStep: OnboardingStep) => {
    if (isFullFlow || isAnimatedFlow) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setCurrentStep(nextStep);
        setIsLoading(false);
      }, 600);
    }
  };

  const handlePrevStep = (prevStep: OnboardingStep) => {
    if (isFullFlow || isAnimatedFlow) {
      setCurrentStep(prevStep);
    }
  };

  const handleUpdateUserData = (data: Partial<OnboardingUserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Determine which step to show
  const stepToShow = (isFullFlow || isAnimatedFlow) ? currentStep : variant as OnboardingStep;

  // Step order for progress indicator
  const steps: OnboardingStep[] = isAnimatedFlow
    ? ['name', 'phone', 'accredited-confirm', 'summary']
    : ['signup', 'country', 'verify-phone', 'summary'];
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
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 overflow-y-auto">
        {stepToShow === 'name' && (
          <NameStep
            onSubmit={(data) => {
              handleUpdateUserData({
                firstName: data.firstName,
                lastName: data.lastName,
                fullName: `${data.firstName} ${data.lastName}`,
              });
              handleNextStep('phone');
            }}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'phone' && (
          <PhoneStep
            firstName={userData.firstName}
            onSubmit={(data) => {
              handleUpdateUserData({
                phoneNumber: data.phoneNumber,
                country: data.country,
              });
              handleNextStep('accredited-confirm');
            }}
            onBack={() => handlePrevStep('name')}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'accredited-confirm' && (
          <AccreditedConfirmStep
            firstName={userData.firstName}
            onNext={(isAccredited, selections) => {
              handleUpdateUserData({ isAccredited, isAccreditedConfirmed: isAccredited, accreditationSelections: selections });
              // Skip summary for non-accredited users
              if (isAccredited) {
                handleNextStep('summary');
              } else {
                // Non-accredited flow - submit directly
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  alert('Thank you for signing up! We\'ll keep you updated on learning resources.');
                }, 1500);
              }
            }}
            onBack={() => handlePrevStep('phone')}
            isLoading={isLoading}
          />
        )}
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
              handleNextStep('summary');
            }}
            onBack={() => handlePrevStep('country')}
            isLoading={isLoading}
          />
        )}
        {stepToShow === 'summary' && (
          <SummaryStep
            userData={isFullFlow || isAnimatedFlow ? userData : mockUserData}
            onBack={() => handlePrevStep(isAnimatedFlow ? 'accredited-confirm' : 'verify-phone')}
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
    </div>
  );
}

export default OnboardingView;
