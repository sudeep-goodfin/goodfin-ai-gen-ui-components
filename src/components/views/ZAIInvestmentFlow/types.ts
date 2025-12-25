// Types for Z AI Investment Flow

export type FlowStep = 'documents' | 'identity' | 'transfer';

export type DocumentStatus = 'pending' | 'signed';

export interface InvestmentDocument {
  id: string;
  title: string;
  summary: string;
  fullSummary: string;
  chips: ChipAction[];
}

export interface ChipAction {
  label: string;
  prompt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export interface BankAccount {
  id: string;
  name: string;
  last4: string;
  type: 'checking' | 'savings';
}

export interface DealInfo {
  id: string;
  companyName: string;
  logo: string;
  minInvestment: number;
  description: string;
}

// Investment flow state
export interface FlowState {
  currentStep: FlowStep;
  signedDocuments: string[];
  isIdentityVerified: boolean;
  transferAmount: number | null;
  selectedBankId: string | null;
  isComplete: boolean;
}

// Default documents for the flow
export const INVESTMENT_DOCUMENTS: InvestmentDocument[] = [
  {
    id: 'ppm',
    title: 'Private Placement Memorandum',
    summary: 'This document outlines the investment terms, potential risks, and structure of the offering.',
    fullSummary: 'This document outlines the investment terms, potential risks, and structure of the offering. It includes detailed information about the company\'s business model, financial projections, and the specific terms of your investment including share class, valuation, and liquidity provisions.',
    chips: [
      { label: 'Show key sections', prompt: 'What are the most important sections I should read?' },
      { label: 'Key risks', prompt: 'What are the key risks mentioned in this document?' },
    ],
  },
  {
    id: 'subscription',
    title: 'Subscription Agreement',
    summary: 'The legal contract that formalizes your commitment to invest in this offering.',
    fullSummary: 'The legal contract that formalizes your commitment to invest in this offering. This binding agreement outlines your obligations as an investor, including payment terms, representations and warranties, and the conditions under which the investment may be accepted or rejected.',
    chips: [
      { label: 'Payment terms', prompt: 'What are the payment terms and deadlines?' },
      { label: 'My obligations', prompt: 'What are my obligations as an investor?' },
    ],
  },
  {
    id: 'suitability',
    title: 'Investor Suitability Questionnaire',
    summary: 'A form to verify your eligibility and suitability for this investment opportunity.',
    fullSummary: 'A form to verify your eligibility and suitability for this investment opportunity. This questionnaire helps ensure you meet the accreditation requirements and that this investment aligns with your financial situation, investment goals, and risk tolerance.',
    chips: [
      { label: 'Requirements', prompt: 'What are the eligibility requirements?' },
      { label: 'Why needed', prompt: 'Why do I need to complete this questionnaire?' },
    ],
  },
];

// Default bank accounts
export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  { id: 'chase', name: 'Chase Checking', last4: '4521', type: 'checking' },
  { id: 'bofa', name: 'Bank of America Savings', last4: '7832', type: 'savings' },
];

// Default deal info
export const DEFAULT_DEAL: DealInfo = {
  id: 'anthropic',
  companyName: 'Anthropic',
  logo: '/icons/products/anthropic.png',
  minInvestment: 25000,
  description: 'AI safety and research company building reliable, interpretable AI systems.',
};
