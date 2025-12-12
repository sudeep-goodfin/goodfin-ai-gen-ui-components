// Goodfin Design Tokens - Matching exact colors from goodfin_aws
export const colors = {
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
  green: {
    50: '#EEFFF4',
    100: '#D7FFE8',
    200: '#B2FFD2',
    300: '#76FFB0',
    400: '#33F586',
    500: '#09DE65',
    600: '#00B24D',
    700: '#049142',
    800: '#0A7138',
    900: '#0A5D30',
    950: '#003418',
  },
  yellow: {
    50: '#FEFEE8',
    100: '#FFFFC2',
    200: '#FFFB88',
    300: '#FFF143',
    400: '#FFE110',
    500: '#EFC703',
    600: '#D19D00',
    700: '#A46F04',
    800: '#87560C',
    900: '#734610',
    950: '#432505',
  },
  red: {
    50: '#FFEFF0',
    100: '#FFE0E3',
    200: '#FFC6CF',
    300: '#FF97A7',
    400: '#FF5D78',
    500: '#FF244F',
    600: '#EB0037',
    700: '#D70032',
    800: '#B40033',
    900: '#990232',
    950: '#570015',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Typography styles matching Goodfin
export const typography = {
  heading: {
    sm: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '24px',
      lineHeight: '32px',
    },
    md: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '28px',
      lineHeight: '36px',
    },
    lg: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '32px',
      lineHeight: '40px',
    },
  },
  paragraph: {
    xs: {
      fontFamily: 'var(--font-primary, "Soehne Leicht", system-ui)',
      fontSize: '12px',
      lineHeight: '16px',
    },
    sm: {
      fontFamily: 'var(--font-primary, "Soehne Leicht", system-ui)',
      fontSize: '14px',
      lineHeight: '20px',
    },
    md: {
      fontFamily: 'var(--font-primary, "Soehne Leicht", system-ui)',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  label: {
    xs: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '12px',
      lineHeight: '16px',
    },
    sm: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '14px',
      lineHeight: '16px',
    },
    md: {
      fontFamily: 'var(--font-heading, "Soehne Kraftig", system-ui)',
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
};

// Common button styles
export const buttonStyles = {
  gradient: {
    enabled: {
      background: 'linear-gradient(90deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), #373338',
      boxShadow: '0px 2px 4px 0px rgba(190, 185, 192, 0.64), 2px 2px 2px 0px rgba(255, 255, 255, 0.14) inset',
    },
    disabled: {
      background: 'linear-gradient(90deg, rgba(127, 117, 130, 0.43) 0%, rgba(56, 52, 57, 0.43) 99.63%), rgba(55, 51, 56, 0.1)',
      boxShadow: 'none',
    },
  },
};

// Onboarding step constants
export const SIGNUP_STEPS = {
  NAME_EMAIL: 1,
  COUNTRY: 2,
  VERIFY: 3,
  ACCREDITED: 4,
  INVESTOR_TYPE: 5,
  INVESTMENT_AMOUNT: 6,
  SOCIAL_LINKS: 7,
  REFERRAL: 8,
  MOTIVATION: 9,
  ADDITIONAL_INFO: 10,
  SUMMARY: 11,
};

// Investment amount options
export const investmentAmountOptions = [
  { value: 'under_10k', label: '<$10K' },
  { value: '10k_25k', label: '$10K - $25K' },
  { value: '25k_100k', label: '$25K - $100K' },
  { value: '100k_1m', label: '$100K - $1M' },
  { value: '1m_3m', label: '$1M - $3M' },
  { value: '3m_plus', label: '$3M+' },
  { value: '10m_plus', label: '$10M+' },
  { value: '100m_plus', label: '$100M+' },
  { value: 'not_sure', label: 'Not sure' },
];

// Referral sections
export const referralSections = [
  {
    title: 'Personal & Professional Networks',
    options: [
      { label: 'Referral', value: 'referral' },
      { label: 'Friend / Colleague', value: 'friend_colleague' },
      { label: 'Financial Advisor', value: 'financial_advisor' },
      { label: 'Employer', value: 'employer' },
      { label: 'Goodfin Guild Partner', value: 'goodfin_guild_partner' },
      { label: 'Syndicate', value: 'syndicate' },
    ],
  },
  {
    title: 'Media & Content',
    options: [
      { label: 'Newsletter', value: 'newsletter' },
      { label: 'Blog / Publication / News', value: 'blog_publication' },
      { label: 'Podcast / Interview', value: 'podcast_interview' },
      { label: 'Event', value: 'event' },
    ],
  },
  {
    title: 'Digital & Discovery',
    options: [
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Other Social Media', value: 'other_social_media' },
      { label: 'ChatGPT / Perplexity / AI Search', value: 'chatgpt_perplexity' },
      { label: 'Search Engine', value: 'search_engine' },
    ],
  },
  {
    title: '',
    options: [{ label: 'Other', value: 'other' }],
  },
];
