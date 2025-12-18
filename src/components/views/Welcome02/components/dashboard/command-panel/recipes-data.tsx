import { TrendingUp, Briefcase, PieChart, Shield, Building2, Target, DollarSign, FileBarChart, Wallet, BarChart3, Users, Globe, Landmark, FileText, FolderOpen } from 'lucide-react';
import { Recipe, Context, NavigationCard } from './types';

export const RECIPES: Recipe[] = [
  {
    id: 'market-trends',
    name: 'Analyze market trends',
    description: 'Analyze current market trends, economic indicators, and their impact on your investments',
    icon: <TrendingUp size={16} />,
    color: 'blue',
    category: 'Market Analysis',
  },
  {
    id: 'invest-in-deals',
    name: 'Invest in deals',
    description: 'Discover and evaluate investment opportunities in private equity, pre-IPO, and venture deals',
    icon: <Briefcase size={16} />,
    color: 'purple',
    category: 'Investment Opportunities',
  },
  {
    id: 'review-portfolio',
    name: 'Review my portfolio',
    description: 'Get a comprehensive review of your portfolio performance, allocation, and recommendations',
    icon: <PieChart size={16} />,
    color: 'teal',
    category: 'Portfolio Management',
  },
  {
    id: 'tax-optimization',
    name: 'Tax Optimization Strategy',
    description: 'Generate tax-efficient investment strategies including tax-loss harvesting',
    icon: <Shield size={16} />,
    color: 'green',
    category: 'Portfolio Management',
  },
  {
    id: 'venture-capital-deals',
    name: 'Venture Capital Deal Review',
    description: 'Deep dive into VC opportunities with startup evaluation and market analysis',
    icon: <Target size={16} />,
    color: 'orange',
    category: 'Investment Opportunities',
  },
  {
    id: 'real-estate-analysis',
    name: 'Real Estate Investment Analysis',
    description: 'Analyze property opportunities with ROI calculations and market trends',
    icon: <Building2 size={16} />,
    color: 'blue',
    category: 'Investment Opportunities',
  },
  {
    id: 'wealth-management-plan',
    name: 'Wealth Management Plan',
    description: 'Create comprehensive wealth management strategy aligned with your goals',
    icon: <DollarSign size={16} />,
    color: 'green',
    category: 'Portfolio Management',
  },
  {
    id: 'performance-report',
    name: 'Investment Performance Report',
    description: 'Generate detailed performance report with returns and benchmarks',
    icon: <FileBarChart size={16} />,
    color: 'blue',
    category: 'Market Analysis',
  },
];

export const CONTEXTS: Context[] = [
  {
    id: 'ipo',
    name: 'IPO',
    description: 'Initial Public Offerings - Companies going public in the market',
    icon: <TrendingUp size={16} />,
    color: 'blue',
  },
  {
    id: 'pre-ipo',
    name: 'Pre-IPO',
    description: 'Pre-IPO shares with high growth potential before public listing',
    icon: <Building2 size={16} />,
    color: 'purple',
  },
  {
    id: 'funds',
    name: 'Funds',
    description: 'Private equity funds, venture capital, and alternative investment funds',
    icon: <Wallet size={16} />,
    color: 'green',
  },
  {
    id: 'deals',
    name: 'Deals',
    description: 'Current investment deals and opportunities available on the platform',
    icon: <FileText size={16} />,
    color: 'orange',
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    description: 'Direct private equity investments in established companies',
    icon: <Landmark size={16} />,
    color: 'teal',
  },
  {
    id: 'venture-capital',
    name: 'Venture Capital',
    description: 'Early-stage startup investments with high growth potential',
    icon: <BarChart3 size={16} />,
    color: 'blue',
  },
  {
    id: 'syndicate',
    name: 'Syndicate',
    description: 'Join investment syndicates led by experienced investors',
    icon: <Users size={16} />,
    color: 'purple',
  },
  {
    id: 'secondary-market',
    name: 'Secondary Market',
    description: 'Buy and sell shares in private companies through secondary markets',
    icon: <Globe size={16} />,
    color: 'green',
  },
];

export const NAVIGATION_CARDS: NavigationCard[] = [
  {
    id: 'prompt-packs',
    title: 'Prompt packs',
    description: 'Pre-built prompts for common tasks',
    icon: <FolderOpen size={16} />,
    view: 'prompt-packs',
  },
];

export const VIEW_TITLES: Record<string, string> = {
  home: 'Continue typing, or pick an item below',
  'prompt-packs': 'Prompt packs',
  contexts: 'Types of Investments and deals',
};

// Animation configurations
export const ANIMATIONS = {
  container: {
    initial: { opacity: 0, maxHeight: 0 },
    animate: { opacity: 1, maxHeight: '600px' },
    exit: { opacity: 0, maxHeight: 0 },
  },
  listItem: {
    initial: {
      opacity: 0,
      y: -5,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: (index: number) => ({
      duration: 0.2,
      delay: index * 0.025,
      ease: [0.4, 0.0, 0.2, 1],
    }),
  },
};

// Icon color classes matching source
export const COLOR_CLASSES: Record<string, string> = {
  blue: 'text-blue-500/70',
  orange: 'text-orange-500/70',
  teal: 'text-teal-500/70',
  purple: 'text-purple-500/70',
  green: 'text-green-500/70',
};
