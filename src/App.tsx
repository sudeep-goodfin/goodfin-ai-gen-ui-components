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
} from './components/views';
import {
  Layout,
  FileText,
  PenTool,
  Edit3,
  TrendingUp,
  DollarSign,
  AlertTriangle,
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
      component: (variant: string) => <DealPageInvestmentView variant={variant as 'full' | 'minimal' | 'simple'} />,
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
  ];

  return <ComponentShowcase options={showcaseOptions} />;
}
