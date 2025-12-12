import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { colors, typography, buttonStyles } from './designTokens';

type VerifyPhoneStepProps = {
  onNext: (phoneNumber: string) => void;
  onBack: () => void;
  isLoading?: boolean;
};

export function VerifyPhoneStep({ onNext, onBack, isLoading = false }: VerifyPhoneStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && smsConsent) {
      onNext(phoneNumber);
    }
  };

  const isValid = phoneNumber.length >= 10 && smsConsent;

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
        Enter your phone number
      </h1>
      <p
        className="text-left mb-10"
        style={{
          ...typography.paragraph.sm,
          color: colors.grey[900],
          marginTop: '8px',
        }}
      >
        Enter your phone number to keep your account secure.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Phone Input */}
        <div
          className="w-full rounded-xl transition-all duration-200"
          style={{
            padding: '16px 24px',
            backgroundColor: colors.white,
            border: error
              ? '1px solid #FF3D6A'
              : '1px solid rgba(186, 184, 187, 0.16)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '12px', fontSize: '20px' }}>🇺🇸</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError(null);
            }}
            placeholder="Phone Number"
            disabled={isLoading}
            autoComplete="tel"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '16px',
              color: colors.grey[800],
              fontFamily: typography.paragraph.md.fontFamily,
              fontWeight: 300,
            }}
          />
        </div>
        {error && (
          <p
            style={{
              fontSize: '12px',
              color: '#FF3D6A',
              fontFamily: typography.paragraph.xs.fontFamily,
              marginTop: '4px',
              marginLeft: '16px',
            }}
          >
            {error}
          </p>
        )}

        {/* SMS Consent Checkbox */}
        <div className="flex items-start gap-3 mt-6 mb-10">
          <button
            type="button"
            onClick={() => setSmsConsent(!smsConsent)}
            className={cn(
              'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
              'transition-all duration-200'
            )}
            style={{
              backgroundColor: smsConsent ? colors.grey[950] : colors.white,
              border: smsConsent ? 'none' : `1.5px solid ${colors.grey[300]}`,
            }}
          >
            {smsConsent && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
          <p
            style={{
              ...typography.paragraph.sm,
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '14px',
            }}
          >
            By checking this box, you consent to receive recurring text
            messages from Goodfin at the number provided. Consent is not
            a condition of purchase. Msg & data rates may apply. Msg
            frequency varies. Unsubscribe at any time by replying STOP.{' '}
            <br />
            <a
              href="#"
              className="underline"
              style={{ color: colors.grey[700] }}
            >
              Privacy Policy
            </a>{' '}
            &{' '}
            <a
              href="#"
              className="underline"
              style={{ color: colors.grey[700] }}
            >
              Terms
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full h-[59px] rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            ...(isValid ? buttonStyles.gradient.enabled : buttonStyles.gradient.disabled),
            color: '#F4F3F5',
            cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
            ...typography.label.md,
          }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
}

export default VerifyPhoneStep;
