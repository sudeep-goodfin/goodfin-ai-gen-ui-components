import React from 'react';
import { ComponentShowcase } from './components/ComponentShowcase';
import {
  InvestmentReviewChat,
  investmentReviewVariants,
  DealPreviewView,
  dealPreviewVariants,
  DealPageInvestmentView,
  dealInvestmentVariants,
  InvestmentRiskView,
  investmentRiskVariants,
  DocumentDetailView,
  documentDetailVariants,
  SignatureInputView,
  signatureInputVariants,
  DocumentAttachmentWithSign,
  ApplyCreditView,
  applyCreditVariants,
  PromoCodeView,
  promoCodeVariants,
  InvestorProfileView,
  investorProfileVariants,
  BankSelectionView,
  bankSelectionVariants,
  CountrySelectionView,
  countrySelectionVariants,
  WireInstructionsView,
  wireInstructionsVariants,
  AIGreetingView,
  AIGreetingContent,
  aiGreetingVariants,
} from './components/views';
import {
  Layout,
  FileText,
  PenTool,
  Edit3,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CreditCard,
  Tag,
  UserCheck,
  Building2,
  Globe,
  Send,
  MessageSquare,
} from 'lucide-react';

export function App() {
  const showcaseOptions = [
    {
      id: 'deal-preview',
      label: 'Deal Preview',
      component: (variant: string) => <DealPreviewView variant={variant as 'full' | 'minimal'} />,
      icon: <TrendingUp className="w-6 h-6" />,
      variants: dealPreviewVariants,
    },
    {
      id: 'deal-page-investment',
      label: 'Deal Investment',
      component: (variant: string, options?: { showPresets?: boolean; showStepper?: boolean; showSuggestions?: boolean; presetCount?: 3 | 6 }) => (
        <DealPageInvestmentView
          variant={variant as 'full' | 'minimal' | 'simple' | 'block-04'}
          showPresets={options?.showPresets}
          showStepper={options?.showStepper}
          showSuggestions={options?.showSuggestions}
          presetCount={options?.presetCount}
        />
      ),
      icon: <DollarSign className="w-6 h-6" />,
      variants: dealInvestmentVariants,
    },
    {
      id: 'investment-risk',
      label: 'Investment Risk',
      component: (variant: string) => <InvestmentRiskView variant={variant as 'full' | 'minimal'} />,
      icon: <AlertTriangle className="w-6 h-6" />,
      variants: investmentRiskVariants,
    },
    {
      id: 'investment-review',
      label: 'Investment Review',
      component: (variant: string) => <InvestmentReviewChat variant={variant as 'original' | 'compact'} />,
      icon: <Layout className="w-6 h-6" />,
      variants: investmentReviewVariants,
    },
    {
      id: 'document-detail',
      label: 'Document Detail',
      component: (variant: string) => <DocumentDetailView variant={variant as 'full' | 'card'} />,
      icon: <FileText className="w-6 h-6" />,
      variants: documentDetailVariants,
    },
    {
      id: 'signature-input',
      label: 'Signature Input',
      component: (variant: string) => <SignatureInputView variant={variant as 'simple' | 'detailed'} />,
      icon: <Edit3 className="w-6 h-6" />,
      variants: signatureInputVariants,
    },
    {
      id: 'document-signing',
      label: 'Document Signing',
      component: <DocumentAttachmentWithSign />,
      icon: <PenTool className="w-6 h-6" />,
    },
    {
      id: 'apply-credit',
      label: 'Apply Credit',
      component: (variant: string) => <ApplyCreditView variant={variant as 'simple' | 'detailed'} />,
      icon: <CreditCard className="w-6 h-6" />,
      variants: applyCreditVariants,
    },
    {
      id: 'promo-code',
      label: 'Promo Code',
      component: (variant: string) => <PromoCodeView variant={variant as 'simple' | 'detailed'} />,
      icon: <Tag className="w-6 h-6" />,
      variants: promoCodeVariants,
    },
    {
      id: 'investor-profile',
      label: 'Investor Profile',
      component: (variant: string) => <InvestorProfileView variant={variant as 'simple' | 'detailed'} />,
      icon: <UserCheck className="w-6 h-6" />,
      variants: investorProfileVariants,
    },
    {
      id: 'bank-selection',
      label: 'Bank Selection',
      component: (variant: string) => <BankSelectionView variant={variant as 'simple' | 'detailed'} />,
      icon: <Building2 className="w-6 h-6" />,
      variants: bankSelectionVariants,
    },
    {
      id: 'country-selection',
      label: 'Country Selection',
      component: (variant: string) => <CountrySelectionView variant={variant as 'simple' | 'detailed'} />,
      icon: <Globe className="w-6 h-6" />,
      variants: countrySelectionVariants,
    },
    {
      id: 'wire-instructions',
      label: 'Wire Instructions',
      component: (variant: string) => <WireInstructionsView variant={variant as 'simple' | 'detailed'} />,
      icon: <Send className="w-6 h-6" />,
      variants: wireInstructionsVariants,
    },
    {
      id: 'ai-greeting',
      label: 'AI Greeting',
      component: (variant: string) => <AIGreetingView variant={variant as 'first-time' | 'returning' | 'invested' | 'non-invested'} />,
      icon: <MessageSquare className="w-6 h-6" />,
      variants: aiGreetingVariants,
    },
  ];

  return <ComponentShowcase options={showcaseOptions} />;
}
