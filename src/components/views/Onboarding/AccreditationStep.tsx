import React, { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';

type AccreditationStepProps = {
  onNext: (isAccredited: boolean, selections: string[]) => void;
  onBack: () => void;
  isLoading?: boolean;
};

// Accreditation options matching goodfin_aws exactly
const accreditationOptions = [
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
  {
    key: 'finraLicensed',
    label: "I'm also a FINRA-Licensed Representative",
    description: 'I currently hold a Series 7, 65, or 82 license.',
  },
  {
    key: 'notAccredited',
    label: 'Not Accredited',
    description: 'I am here to learn about private market investing and do not currently meet the above criteria.',
  },
];

export function AccreditationStep({ onNext, onBack, isLoading = false }: AccreditationStepProps) {
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

  const getCheckboxValue = (optionKey: string) => {
    if (optionKey === 'notAccredited') {
      // Not accredited if no other options are selected OR explicitly selected
      return selectedOptions.has('notAccredited') ||
        (selectedOptions.size === 0);
    }
    return selectedOptions.has(optionKey);
  };

  const handleSubmit = () => {
    const isAccredited = selectedOptions.size > 0 && !selectedOptions.has('notAccredited');
    onNext(isAccredited, Array.from(selectedOptions));
  };

  const hasSelection = selectedOptions.size > 0;
  const isNotAccredited = selectedOptions.has('notAccredited');
  const isQualifiedClient = selectedOptions.has('qualifiedClient');
  const isQualifiedPurchaser = selectedOptions.has('qualifiedPurchaser');

  // Determine CTA button text based on selection
  const getButtonText = () => {
    if (!hasSelection) return 'Continue';
    if (isNotAccredited) return "I'm not an accredited investor";

    // Build the status text based on selections
    const statuses: string[] = ['accredited investor'];

    if (isQualifiedClient) {
      statuses.push('qualified client');
    }
    if (isQualifiedPurchaser) {
      statuses.push('qualified purchaser');
    }

    // Format: "I agree I'm an accredited investor", "I agree I'm an accredited investor & qualified client", etc.
    if (statuses.length === 1) {
      return "I agree I'm an accredited investor";
    } else if (statuses.length === 2) {
      return `I agree I'm an ${statuses[0]} & ${statuses[1]}`;
    } else {
      // 3 items: "accredited investor, qualified client & qualified purchaser"
      return `I agree I'm an ${statuses[0]}, ${statuses[1]} & ${statuses[2]}`;
    }
  };

  return (
    <div className="w-full max-w-[560px] flex flex-col relative">
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
        Are you an Accredited Investor?
      </h1>
      <p
        className="text-left"
        style={{
          ...typography.paragraph.sm,
          color: colors.grey[900],
          marginTop: '8px',
        }}
      >
        We require this information for regulatory compliance purposes.
      </p>

      {/* Form */}
      <div style={{ marginTop: '40px' }}>
        <p
          style={{
            ...typography.paragraph.sm,
            color: colors.grey[950],
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          Investor Accreditation Status (Check all that apply):
        </p>

        {/* Options */}
        <div className="space-y-4">
          {accreditationOptions.map((option, index) => (
            <button
              key={option.key}
              type="button"
              onClick={() => handleToggleOption(option.key)}
              disabled={isLoading}
              className="w-full flex items-start gap-3 text-left"
              style={{
                marginBottom: index === accreditationOptions.length - 1 ? '0' : '16px',
              }}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
                  'transition-all duration-200'
                )}
                style={{
                  backgroundColor: getCheckboxValue(option.key)
                    ? colors.grey[950]
                    : colors.white,
                  border: getCheckboxValue(option.key)
                    ? 'none'
                    : `1.5px solid ${colors.grey[300]}`,
                }}
              >
                {getCheckboxValue(option.key) && (
                  <Check className="w-3.5 h-3.5 text-white" />
                )}
              </div>

              {/* Label & Description */}
              <div>
                <p
                  style={{
                    ...typography.paragraph.sm,
                    color: colors.grey[950],
                    lineHeight: '1.5',
                  }}
                >
                  <strong>{option.label}:</strong> {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasSelection || isLoading}
          className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            marginTop: '40px',
            ...(hasSelection ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
            color: '#F4F3F5',
            cursor: hasSelection && !isLoading ? 'pointer' : 'not-allowed',
            ...typography.label.md,
          }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            getButtonText()
          )}
        </button>
      </div>
    </div>
  );
}

export default AccreditationStep;
