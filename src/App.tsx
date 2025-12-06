import React from 'react';
import { ComponentShowcase } from './components/ComponentShowcase';
import {
  InvestmentReviewChat,
  DealPreviewView,
  DealPageInvestmentView,
  InvestmentRiskView,
  DocumentDetailView,
  SignatureInputView,
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
      component: <DealPreviewView />,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 'deal-page-investment',
      label: 'Deal Page Investment',
      component: <DealPageInvestmentView />,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      id: 'investment-risk',
      label: 'Investment Risk',
      component: <InvestmentRiskView />,
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      id: 'investment-review',
      label: 'Investment Review',
      component: <InvestmentReviewChat />,
      icon: <Layout className="w-6 h-6" />,
    },
    {
      id: 'document-detail',
      label: 'Document Detail',
      component: <DocumentDetailView />,
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'signature-input',
      label: 'Signature Input',
      component: <SignatureInputView />,
      icon: <Edit3 className="w-6 h-6" />,
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
