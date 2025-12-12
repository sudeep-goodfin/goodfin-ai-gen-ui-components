import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';

type AccreditedConfirmStepProps = {
  firstName: string;
  onNext: (isAccredited: boolean, selections: string[]) => void;
  onBack: () => void;
  isLoading?: boolean;
};

// Accredited Investor options
const accreditedOptions = [
  {
    key: 'netWorthBased',
    label: 'Accredited Investor (Net Worth-Based)',
    description: 'I have a net worth exceeding $1 million, excluding the value of my primary residence.',
  },
  {
    key: 'incomeBased',
    label: 'Accredited Investor (Income-Based)',
    description: 'I have earned income exceeding $200,000 individually (or $300,000 jointly with my spouse) in each of the past two years, with a reasonable expectation of the same in the current year.',
  },
];

// Qualified options
const qualifiedOptions = [
  {
    key: 'qualifiedClient',
    label: "I'm also a Qualified Client",
    description: 'I have a net worth exceeding $2.2 million, excluding my primary residence, or I represent an entity with a net worth exceeding $2.2 million.',
  },
  {
    key: 'qualifiedPurchaser',
    label: "I'm also a Qualified Purchaser",
    description: 'I own at least $5 million in investments (for individuals), or I manage an entity with at least $25 million in investments for other qualified purchasers.',
  },
];

// FINRA option
const finraOption = {
  key: 'finraLicensed',
  label: "I'm also a FINRA-Licensed Representative",
  description: 'I currently hold a Series 7, 65, or 82 license.',
};

// Not Accredited option
const notAccreditedOption = {
  key: 'notAccredited',
  label: 'Not Accredited',
  description: 'I am here to learn about private market investing and do not currently meet the above criteria.',
};

/**
 * AccreditedConfirmStep Component
 *
 * Conversational step asking for accredited investor status with multiple options.
 * Uses toggle switches for each option.
 * Options are grouped into separate sections.
 */
export function AccreditedConfirmStep({
  firstName,
  onNext,
  onBack,
  isLoading = false,
}: AccreditedConfirmStepProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const handleToggleOption = (optionKey: string) => {
    const newSelected = new Set(selectedOptions);

    if (optionKey === 'notAccredited') {
      // If "Not Accredited" is clicked, clear all other selections
      newSelected.clear();
      newSelected.add('notAccredited');
    } else {
      // Remove "notAccredited" if selecting an accredited option
      newSelected.delete('notAccredited');

      if (newSelected.has(optionKey)) {
        newSelected.delete(optionKey);
      } else {
        newSelected.add(optionKey);
      }
    }

    setSelectedOptions(newSelected);
  };

  const isSelected = (optionKey: string) => {
    return selectedOptions.has(optionKey);
  };

  const handleSubmit = () => {
    const isAccredited = selectedOptions.size > 0 && !selectedOptions.has('notAccredited');
    onNext(isAccredited, Array.from(selectedOptions));
  };

  const hasSelection = selectedOptions.size > 0;

  // Reusable option row component
  const OptionRow = ({ option }: { option: { key: string; label: string; description: string } }) => (
    <div className="flex items-start gap-3">
      {/* Toggle Switch */}
      <button
        type="button"
        onClick={() => handleToggleOption(option.key)}
        disabled={isLoading}
        className={cn(
          'relative w-12 h-7 rounded-full transition-all duration-200 flex-shrink-0 mt-0.5'
        )}
        style={{
          backgroundColor: isSelected(option.key) ? colors.grey[900] : colors.grey[300],
        }}
      >
        <div
          className={cn(
            'absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-200',
            isSelected(option.key) ? 'left-6' : 'left-1'
          )}
        />
      </button>

      {/* Label & Description */}
      <div className="flex flex-col gap-1">
        <span
          style={{
            ...typography.paragraph.sm,
            color: colors.grey[900],
            fontWeight: 500,
          }}
        >
          {option.label}
        </span>
        <span
          style={{
            ...typography.paragraph.xs,
            color: colors.grey[600],
            lineHeight: 1.5,
          }}
        >
          {option.description}
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[560px] flex flex-col">
      {/* AI Avatar */}
      <div className="mb-8">
        <img
          src="/conciergeIcon.png"
          alt="Goodfin AI"
          className="w-12 h-12 rounded-full"
          style={{
            boxShadow: '0px 5px 5px 0px rgba(190, 185, 192, 0.33)',
            border: '1px solid #F8F8F8',
          }}
        />
      </div>

      {/* Greeting Text */}
      <div className="text-left mb-4">
        <h1
          style={{
            fontFamily: typography.heading.md.fontFamily,
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.grey[950],
          }}
        >
          Nice to meet you, {firstName}!
        </h1>
      </div>

      {/* Description Text */}
      <div className="text-left mb-8">
        <p
          style={{
            ...typography.paragraph.md,
            color: colors.grey[800],
            lineHeight: 1.6,
          }}
        >
          Before we continue, I need to confirm your investor status for regulatory compliance.
        </p>
      </div>

      {/* Section Header */}
      <p
        style={{
          ...typography.paragraph.sm,
          color: colors.grey[950],
          fontWeight: 600,
          marginBottom: '20px',
        }}
      >
        Investor Accreditation Status (Select all that apply):
      </p>

      {/* Accredited Investor Options */}
      <div
        className="w-full rounded-xl mb-4"
        style={{
          backgroundColor: 'rgba(247, 247, 248, 0.70)',
          border: '1px solid #F5F4F6',
          padding: '20px',
        }}
      >
        <div className="space-y-5">
          {accreditedOptions.map((option) => (
            <OptionRow key={option.key} option={option} />
          ))}
        </div>
      </div>

      {/* Qualified Options */}
      <div
        className="w-full rounded-xl mb-4"
        style={{
          backgroundColor: 'rgba(247, 247, 248, 0.70)',
          border: '1px solid #F5F4F6',
          padding: '20px',
        }}
      >
        <div className="space-y-5">
          {qualifiedOptions.map((option) => (
            <OptionRow key={option.key} option={option} />
          ))}
        </div>
      </div>

      {/* FINRA Option */}
      <div
        className="w-full rounded-xl mb-4"
        style={{
          backgroundColor: 'rgba(247, 247, 248, 0.70)',
          border: '1px solid #F5F4F6',
          padding: '20px',
        }}
      >
        <OptionRow option={finraOption} />
      </div>

      {/* Not Accredited Option */}
      <div
        className="w-full rounded-xl mb-8"
        style={{
          backgroundColor: 'rgba(247, 247, 248, 0.70)',
          border: '1px solid #F5F4F6',
          padding: '20px',
        }}
      >
        <OptionRow option={notAccreditedOption} />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!hasSelection || isLoading}
        className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
        style={{
          ...(hasSelection ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
          color: '#F4F3F5',
          cursor: hasSelection && !isLoading ? 'pointer' : 'not-allowed',
          ...typography.label.md,
        }}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'Continue'
        )}
      </button>
    </div>
  );
}

export default AccreditedConfirmStep;
