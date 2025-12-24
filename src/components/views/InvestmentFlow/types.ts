// Types for Investment Flow

export type InvestmentFlowStep =
  | 'transfer-method'
  | 'verification'
  | 'document-intro'
  | 'ppm-review'
  | 'llc-review'
  | 'llc-signing'
  | 'subscription-review'
  | 'subscription-signing'
  | 'confirm-request'
  | 'wire-transfer'
  | 'complete';

export type TransferMethod = 'bank-us' | 'wire-international';

export interface TransferMethodOption {
  id: TransferMethod;
  title: string;
  icon: 'bank' | 'globe';
  badges: Array<{
    label: string;
    variant: 'default' | 'success';
  }>;
  details: string[];
}

export interface CompanyData {
  name: string;
  logo: string;
  description: string;
  type: string;
}

export interface InvestmentFlowState {
  currentStep: InvestmentFlowStep;
  investmentAmount: number;
  selectedTransferMethod: TransferMethod | null;
  company: CompanyData;
}

export interface FAQItem {
  question: string;
  answer?: string;
}

// Default transfer method options
export const TRANSFER_METHODS: TransferMethodOption[] = [
  {
    id: 'bank-us',
    title: 'Domestic',
    icon: 'bank',
    badges: [
      { label: 'Same Day', variant: 'default' },
      { label: 'No Fee', variant: 'success' },
    ],
    details: [],
  },
  {
    id: 'wire-international',
    title: 'International',
    icon: 'globe',
    badges: [{ label: 'Up to 3 Business Day', variant: 'default' }],
    details: [],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Will I need to enter my bank details?',
    answer: "No. We'll provide the bank details you need to complete the transfer.",
  },
  {
    question: 'When will I receive the transfer instructions?',
    answer:
      "You'll receive detailed transfer instructions after completing identity verification and signing the investment documents.",
  },
  {
    question: 'Can I complete the transfer later?',
    answer:
      'Yes, you can save your progress and return to complete the transfer at any time before the investment deadline.',
  },
  {
    question: 'Are there any fees?',
    answer:
      'Domestic transfers have no fees. International wire transfers may have fees charged by your bank.',
  },
];
