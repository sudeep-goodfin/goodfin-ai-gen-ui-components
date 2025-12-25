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
    title: 'Limited Liability Company Agreement',
    summary: 'The operating agreement that governs the LLC structure of this investment vehicle.',
    fullSummary: 'The operating agreement that governs the LLC structure of this investment vehicle. This document outlines the rights and responsibilities of members, distribution policies, management structure, and the terms under which you participate in the fund as a limited partner.',
    chips: [
      { label: 'Member rights', prompt: 'What are my rights as a member?' },
      { label: 'Distributions', prompt: 'How are distributions handled?' },
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
