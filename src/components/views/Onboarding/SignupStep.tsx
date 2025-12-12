import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { OnboardingUserData } from './index';

// Goodfin Design Tokens
const colors = {
  grey: {
    50: '#F7F7F8',
    100: '#F0EEF0',
    200: '#E6E4E7',
    300: '#BEB9C0',
    400: '#9B929E',
    500: '#7F7582',
    600: '#685F6A',
    700: '#554D57',
    800: '#48424A',
    900: '#373338',
    950: '#29272A',
  },
  red: {
    500: '#FF244F',
  },
  white: '#FFFFFF',
};

// Google Icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

type SignupStepProps = {
  onNext: (data: Partial<OnboardingUserData>) => void;
  isLoading?: boolean;
};

export function SignupStep({ onNext, isLoading = false }: SignupStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and contain 1 number and 1 uppercase letter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({ firstName: true, lastName: true, email: true, password: true });
    if (validateForm()) {
      onNext({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
    }
  };

  const handleGoogleSignup = () => {
    // Mock Google signup
    onNext({
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@gmail.com',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.password &&
    !errors.firstName && !errors.lastName && !errors.password;

  return (
    <div className="w-full max-w-[480px] flex flex-col">
      {/* Header Text - Using Goodfin typography */}
      <h1
        className="text-left mb-1"
        style={{
          fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
          fontSize: '24px',
          lineHeight: '32px',
          color: colors.grey[950],
        }}
      >
        Register to access our exclusive platform
      </h1>
      <p
        className="text-left mb-6"
        style={{
          fontFamily: 'var(--font-primary, "Soehne Leicht", system-ui)',
          fontSize: '14px',
          lineHeight: '20px',
          color: colors.grey[900],
          marginTop: '4px',
        }}
      >
        Explore top-tier opportunities in private markets.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2" onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
        {/* Name Row */}
        <div className="flex gap-2">
          <FloatingLabelInput
            label="First Name"
            value={formData.firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            onBlur={() => handleBlur('firstName')}
            error={touched.firstName ? errors.firstName : undefined}
            disabled={isLoading}
            required
          />
          <FloatingLabelInput
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            onBlur={() => handleBlur('lastName')}
            error={touched.lastName ? errors.lastName : undefined}
            disabled={isLoading}
            required
          />
        </div>

        {/* Email */}
        <FloatingLabelInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          disabled={isLoading}
          required
        />

        {/* Password */}
        <FloatingLabelInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          disabled={isLoading}
          required
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-0 flex items-center justify-center"
              style={{ width: '24px', height: '24px' }}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" style={{ color: colors.grey[500] }} />
              ) : (
                <Eye className="w-5 h-5" style={{ color: colors.grey[500] }} />
              )}
            </button>
          }
        />

        {/* Submit Button - Goodfin gradient style */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={cn(
            'w-full h-[59px] rounded-2xl flex items-center justify-center',
            'transition-all duration-200'
          )}
          style={{
            marginTop: '40px',
            background: isFormValid
              ? 'linear-gradient(90deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), #373338'
              : 'linear-gradient(90deg, rgba(127, 117, 130, 0.43) 0%, rgba(56, 52, 57, 0.43) 99.63%), rgba(55, 51, 56, 0.1)',
            color: '#F4F3F5',
            boxShadow: isFormValid
              ? '0px 2px 4px 0px rgba(190, 185, 192, 0.64), 2px 2px 2px 0px rgba(255, 255, 255, 0.14) inset'
              : 'none',
            cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
            fontSize: '16px',
            lineHeight: '20px',
          }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Next'
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="flex items-center justify-center gap-1 mt-3">
        <span
          style={{
            fontFamily: 'var(--font-primary, "Soehne", system-ui)',
            fontSize: '16px',
            fontWeight: 600,
            color: colors.grey[900],
          }}
        >
          Already a member?
        </span>
        <button
          type="button"
          className="hover:opacity-80 transition-opacity"
          style={{
            fontFamily: 'var(--font-primary, "Soehne", system-ui)',
            fontSize: '16px',
            fontWeight: 600,
            color: colors.grey[500],
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

// Floating Label Input Component - Matching Goodfin CustomInputField
type FloatingLabelInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
};

function FloatingLabelInput({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  error,
  required,
  disabled,
  endAdornment,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const showLabel = isFocused || hasValue;

  return (
    <div className="flex-1">
      <div
        className={cn(
          'relative w-full rounded-xl transition-all duration-200'
        )}
        style={{
          padding: '16px 24px',
          backgroundColor: disabled ? '#F9FAFB' : colors.white,
          border: error
            ? '1px solid #FF3D6A'
            : isFocused
            ? `1px solid ${colors.grey[900]}`
            : '1px solid rgba(186, 184, 187, 0.16)',
          height: '64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: showLabel ? 'flex-start' : 'center',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {showLabel && (
          <label
            style={{
              fontSize: '12px',
              color: error ? '#FF3D6A' : colors.grey[800],
              marginBottom: '0px',
              lineHeight: 1.2,
              fontFamily: 'var(--font-primary, "Soehne", system-ui)',
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {label}
            {required && ' *'}
          </label>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flex: 1,
            minHeight: 0,
            marginTop: showLabel ? '2px' : '0',
          }}
        >
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            placeholder={showLabel ? '' : `${label}${required ? ' *' : ''}`}
            disabled={disabled}
            autoComplete="off"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: hasValue ? '14px' : '16px',
              color: error ? '#FF3D6A' : colors.grey[800],
              fontFamily: 'var(--font-primary, "Soehne", system-ui)',
              fontWeight: 300,
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
            }}
          />
          {endAdornment && (
            <div
              style={{
                marginLeft: '8px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '24px',
                width: '24px',
              }}
            >
              {endAdornment}
            </div>
          )}
        </div>
      </div>
      {error && (
        <p
          style={{
            fontSize: '12px',
            color: '#FF3D6A',
            fontFamily: 'var(--font-primary, "Soehne", system-ui)',
            marginTop: '4px',
            marginLeft: '16px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default SignupStep;
