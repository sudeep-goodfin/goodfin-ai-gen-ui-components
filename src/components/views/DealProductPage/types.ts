// Types for Investment Entry Page

export interface Company {
  name: string;
  logo: string;
  description: string;
  minInvestment: number;
  revenue: { value: string; year: number };
  valuation: { value: string; year: number };
  growthRate: { value: string; year: number };
}

export interface InvestorPost {
  id: string;
  author: {
    name: string;
    title: string;
    avatarColor: string;
    initial: string;
  };
  content: string;
  timestamp: string;
  isOwner?: boolean;
}

export interface InvestmentSignalData {
  veryLikely: number;
  considering: number;
  alreadyInvested: number;
  unlikely: number;
}

export interface CommunitySentimentData {
  bullish: number;
  neutral: number;
  bearish: number;
}

export type TabId = 'highlights' | 'key-details' | 'news' | 'investor-ticker';

export interface Tab {
  id: TabId;
  label: string;
  isNew?: boolean;
}

// Sample data for Anthropic
export const ANTHROPIC_DATA: Company = {
  name: 'Anthropic',
  logo: new URL('../Welcome02/assets/avatar-anthropic.png', import.meta.url).href,
  description: 'Anthropic is a leading artificial intelligence research and development company focused on creating safe, interpretable, and steerable AI systems.',
  minInvestment: 10000,
  revenue: { value: '$8.70B', year: 2024 },
  valuation: { value: '$208.00B', year: 2024 },
  growthRate: { value: '89%', year: 2024 },
};

export const SAMPLE_POSTS: InvestorPost[] = [
  {
    id: '1',
    author: {
      name: 'Geen Geo',
      title: 'Marketing Head Anthropic',
      avatarColor: '#69606d',
      initial: 'G',
    },
    content: 'Anthropic is a leading artificial intelligence research and development company focused on creating safe, interpretable, and steerable AI systems.',
    timestamp: '2 hr ago',
    isOwner: true,
  },
  {
    id: '2',
    author: {
      name: 'Sofia Max',
      title: 'Fintech Startup CEO',
      avatarColor: '#4a5fc1',
      initial: 'S',
    },
    content: "Anthropic is a top AI research and development company that's all about building safe, easy-to-understand, and controllable AI systems.",
    timestamp: '2 hr ago',
  },
  {
    id: '3',
    author: {
      name: 'Andreas Ligo',
      title: 'Private market analyst',
      avatarColor: '#c14a4a',
      initial: 'A',
    },
    content: "Anthropic is a top AI research and development company that's all about building safe, understandable, and controllable AI systems.",
    timestamp: '2 hr ago',
  },
  {
    id: '4',
    author: {
      name: 'Adarsh Mehta',
      title: 'Fintech Investor',
      avatarColor: '#4ac162',
      initial: 'A',
    },
    content: "Anthropic is a top-notch AI research and development company that's all about building safe, understandable, and controllable AI systems.",
    timestamp: '2 hr ago',
  },
];

export const INVESTMENT_SIGNAL: InvestmentSignalData = {
  veryLikely: 56,
  considering: 28,
  alreadyInvested: 12,
  unlikely: 4,
};

export const COMMUNITY_SENTIMENT: CommunitySentimentData = {
  bullish: 64,
  neutral: 22,
  bearish: 14,
};

export const TABS: Tab[] = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'key-details', label: 'Key Details' },
  { id: 'news', label: 'News' },
  { id: 'investor-ticker', label: 'Investor Ticker', isNew: true },
];
