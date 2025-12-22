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
    title: 'Bank transfer (U.S.)',
    icon: 'bank',
    badges: [
      { label: 'Up To 5 Business Day', variant: 'default' },
      { label: 'No Fee', variant: 'success' },
    ],
    details: ['Available for investments up to $2,000,000'],
  },
  {
    id: 'wire-international',
    title: 'International Wire Transfer',
    icon: 'globe',
    badges: [{ label: 'Up To 5 Business Day', variant: 'default' }],
    details: ['Available for investments up to $2,000,000', '$5 min deposit'],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Will I need to enter my bank details?',
    answer: "No. We'll provide the bank details you need to complete the transfer.",
  },
  {
    question: 'When will I receive the transfer instructions?',
  },
  {
    question: 'Can I complete the transfer later?',
  },
  {
    question: 'Are there any fees?',
  },
];
