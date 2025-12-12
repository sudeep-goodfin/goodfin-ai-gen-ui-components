import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { colors, typography, buttonStyles } from './designTokens';
import { OnboardingUserData } from './index';

type SummaryStepProps = {
  userData: OnboardingUserData;
  onBack: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

// Summary item component
function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          ...typography.label.xs,
          color: '#9A90A1',
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...typography.label.sm,
          color: colors.grey[900],
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function SummaryStep({ userData, onBack, onSubmit, isLoading = false }: SummaryStepProps) {
  // Get readable accreditation status
  const getAccreditationDisplay = () => {
    if (!userData.isAccredited) return 'No';
    return 'Yes';
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col relative">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute -left-12 top-0 p-2 hover:opacity-70 transition-opacity hidden md:block"
        disabled={isLoading}
      >
        <ArrowLeft className="w-6 h-6" style={{ color: colors.grey[900] }} />
      </button>

      {/* Header Text */}
      <h1
        className="text-left"
        style={{
          ...typography.heading.sm,
          color: colors.grey[950],
        }}
      >
        Here's a summary of your application
      </h1>
      <p
        className="text-left"
        style={{
          ...typography.paragraph.sm,
          color: colors.grey[900],
          marginTop: '8px',
        }}
      >
        Confirm your details to complete onboarding.
      </p>

      {/* Summary Container - Matching goodfin_aws exactly */}
      <div
        style={{
          marginTop: '32px',
          marginBottom: '32px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          background: 'rgba(247, 247, 248, 0.70)',
          borderRadius: '12px',
          boxShadow: '2px 2px 2px 0px #FFF inset',
          border: '1px solid #F5F4F6',
        }}
      >
        {/* Row 1: Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <SummaryItem label="First name" value={userData.firstName || 'Alex'} />
          <SummaryItem label="Last name" value={userData.lastName || 'Johnson'} />
        </div>

        {/* Row 2: Phone & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <SummaryItem label="Phone number" value={userData.phoneNumber || '+1 (415) 555-0123'} />
          <SummaryItem label="Email" value={userData.email || 'alex@example.com'} />
        </div>

        {/* Row 3: Country & ZIP */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <SummaryItem label="Country" value={userData.country || 'United States'} />
          {userData.zip && <SummaryItem label="ZIP Code" value={userData.zip} />}
        </div>

        {/* Row 4: Accreditation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <SummaryItem label="Accredited investor?" value={getAccreditationDisplay()} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
        style={{
          ...buttonStyles.gradient.enabled,
          color: '#F4F3F5',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          ...typography.label.md,
        }}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Submit Application'
        )}
      </button>
    </div>
  );
}

export default SummaryStep;
