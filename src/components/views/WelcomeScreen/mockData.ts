// Mock data for Welcome Screen variants
import { WelcomeScreenVariant } from './index';

// Type definitions
export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  isAccredited: true;
  memberSince: string;
};

export type Investment = {
  id: string;
  dealName: string;
  amount: number;
  shares: number;
  currentValue: number;
  dateInvested: string;
};

export type PortfolioData = {
  totalInvested: number;
  totalValue: number;
  numberOfInvestments: number;
  percentageChange: number;
  investments: Investment[];
};

export type DealStatus = 'live' | 'closing-soon' | 'coming-soon' | 'premium';

export type Deal = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  status: DealStatus;
  valuation: string;
  minInvestment: number;
  pricePerShare: number;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
};

export type RecentDeal = Deal & {
  lastViewedAt: string;
  progress?: number; // percentage through investment flow
};

// New types for redesigned welcome screen
export type Investor = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type DealCardData = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  category: string;
  status: 'live' | 'closing-soon' | 'premium';
  investors: Investor[];
};

export type EventCardData = {
  id: string;
  title: string;
  location: string;
  day: number;
  month: string;
  year: number;
  dayOfWeek: string;
  timeRange: string;
  imageUrl?: string;
};

export type CommunityComment = {
  id: string;
  username: string;
  role?: string;
  avatarColor: string;
  timestamp: string;
  content: string;
  isEdited?: boolean;
  replies?: CommunityComment[];
};

export type CommunityThread = {
  id: string;
  topic: string;
  comments: CommunityComment[];
};

export type EventType = 'coffee-chat' | 'webinar' | 'networking' | 'workshop';

export type Event = {
  id: string;
  title: string;
  type: EventType;
  dateTime: string;
  duration: string;
  host?: string;
  description?: string;
  isBooked?: boolean;
};

export type InsightCategory = 'investment' | 'milestone' | 'community' | 'news';

export type CommunityInsight = {
  id: string;
  text: string;
  timestamp: string;
  category: InsightCategory;
};

export type GreetingData = {
  headline: string;
  subheadline: string;
};

export type VariantDataBundle = {
  user: UserProfile;
  greeting: GreetingData;
  suggestions: string[];
  portfolio?: PortfolioData;
  recentDeals?: RecentDeal[];
  featuredDeals: Deal[];
  events?: Event[];
  communityInsights?: CommunityInsight[];
};

// Helper function for time-based greeting
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Mock Users
const firstTimeUser: UserProfile = {
  firstName: 'there',
  lastName: '',
  email: '',
  isAccredited: true,
  memberSince: new Date().toISOString(),
};

const returningUser: UserProfile = {
  firstName: 'Alex',
  lastName: 'Chen',
  email: 'alex.chen@email.com',
  isAccredited: true,
  memberSince: '2024-06-15T00:00:00.000Z',
};

// Early brand logo URLs for allDeals (before BRAND_LOGOS is defined)
const EARLY_LOGOS = {
  SpaceX: 'https://companieslogo.com/img/orig/SPACE-47ee9544.png',
  Stripe: 'https://companieslogo.com/img/orig/STRIP-a42b4e5d.png',
  Anthropic: 'https://companieslogo.com/img/orig/anthropic-f375cfdb.png',
  Databricks: 'https://companieslogo.com/img/orig/databricks-f27a2b0f.png',
  Discord: 'https://companieslogo.com/img/orig/discord-a643bd52.png',
  Plaid: 'https://companieslogo.com/img/orig/plaid-73f3c5f3.png',
};

// Mock Deals
const allDeals: Deal[] = [
  {
    id: 'spacex',
    name: 'SpaceX',
    description: 'Space exploration and satellite internet',
    logoUrl: EARLY_LOGOS.SpaceX,
    status: 'live',
    valuation: '$350B',
    minInvestment: 10000,
    pricePerShare: 250,
    category: 'Aerospace',
    isFeatured: true,
  },
  {
    id: 'databricks',
    name: 'Databricks',
    description: 'Data analytics and AI platform',
    logoUrl: EARLY_LOGOS.Databricks,
    status: 'live',
    valuation: '$43B',
    minInvestment: 5000,
    pricePerShare: 206,
    category: 'Enterprise Software',
    isNew: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment infrastructure for the internet',
    logoUrl: EARLY_LOGOS.Stripe,
    status: 'closing-soon',
    valuation: '$50B',
    minInvestment: 5000,
    pricePerShare: 42,
    category: 'Fintech',
    isFeatured: true,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'AI safety and research company',
    logoUrl: EARLY_LOGOS.Anthropic,
    status: 'live',
    valuation: '$18B',
    minInvestment: 10000,
    pricePerShare: 180,
    category: 'AI/ML',
    isNew: true,
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Communication platform for communities',
    logoUrl: EARLY_LOGOS.Discord,
    status: 'coming-soon',
    valuation: '$15B',
    minInvestment: 5000,
    pricePerShare: 85,
    category: 'Social',
  },
  {
    id: 'plaid',
    name: 'Plaid',
    description: 'Financial data connectivity',
    logoUrl: EARLY_LOGOS.Plaid,
    status: 'live',
    valuation: '$13B',
    minInvestment: 2500,
    pricePerShare: 65,
    category: 'Fintech',
  },
];

// Mock Recent Deals (for returning users)
const recentDeals: RecentDeal[] = [
  {
    ...allDeals[0], // SpaceX
    lastViewedAt: '2024-12-14T10:30:00.000Z',
    progress: 60,
  },
  {
    ...allDeals[1], // Databricks
    lastViewedAt: '2024-12-13T15:45:00.000Z',
    progress: 30,
  },
  {
    ...allDeals[2], // Stripe
    lastViewedAt: '2024-12-12T09:00:00.000Z',
    progress: 10,
  },
];

// Mock Portfolio (for invested users)
const mockPortfolio: PortfolioData = {
  totalInvested: 125000,
  totalValue: 140625,
  numberOfInvestments: 4,
  percentageChange: 12.5,
  investments: [
    {
      id: 'inv-1',
      dealName: 'SpaceX',
      amount: 50000,
      shares: 200,
      currentValue: 56000,
      dateInvested: '2024-03-15T00:00:00.000Z',
    },
    {
      id: 'inv-2',
      dealName: 'Stripe',
      amount: 25000,
      shares: 595,
      currentValue: 28000,
      dateInvested: '2024-05-20T00:00:00.000Z',
    },
    {
      id: 'inv-3',
      dealName: 'Databricks',
      amount: 30000,
      shares: 145,
      currentValue: 33125,
      dateInvested: '2024-08-10T00:00:00.000Z',
    },
    {
      id: 'inv-4',
      dealName: 'Anthropic',
      amount: 20000,
      shares: 111,
      currentValue: 23500,
      dateInvested: '2024-10-05T00:00:00.000Z',
    },
  ],
};

// Mock Events
const allEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Coffee Chat with Sarah Chen',
    type: 'coffee-chat',
    dateTime: '2024-12-18T14:00:00.000Z',
    duration: '30 min',
    host: 'Sarah Chen',
    description: 'Discuss private market opportunities',
    isBooked: true,
  },
  {
    id: 'evt-2',
    title: 'Private Market Trends 2025',
    type: 'webinar',
    dateTime: '2024-12-20T11:00:00.000Z',
    duration: '1 hour',
    host: 'Goodfin Research Team',
    description: 'Annual outlook for private markets',
  },
  {
    id: 'evt-3',
    title: 'SpaceX Deep Dive',
    type: 'webinar',
    dateTime: '2024-12-22T15:00:00.000Z',
    duration: '45 min',
    host: 'Investment Team',
    description: 'Detailed analysis of SpaceX investment opportunity',
  },
  {
    id: 'evt-4',
    title: 'Investor Networking Mixer',
    type: 'networking',
    dateTime: '2025-01-10T18:00:00.000Z',
    duration: '2 hours',
    description: 'Connect with fellow accredited investors',
  },
];

// Mock Community Insights
const allInsights: CommunityInsight[] = [
  {
    id: 'ins-1',
    text: 'An investor just completed a $50K investment in SpaceX',
    timestamp: '2024-12-15T09:30:00.000Z',
    category: 'investment',
  },
  {
    id: 'ins-2',
    text: 'Databricks closes $500M secondary round at $43B valuation',
    timestamp: '2024-12-15T08:15:00.000Z',
    category: 'news',
  },
  {
    id: 'ins-3',
    text: '150 investors joined the platform this week',
    timestamp: '2024-12-14T17:00:00.000Z',
    category: 'milestone',
  },
  {
    id: 'ins-4',
    text: 'Popular discussion: AI company valuations in 2025',
    timestamp: '2024-12-14T14:30:00.000Z',
    category: 'community',
  },
  {
    id: 'ins-5',
    text: 'Stripe deal closing in 48 hours - final allocation available',
    timestamp: '2024-12-15T10:00:00.000Z',
    category: 'news',
  },
];

// Variant-specific data
export const VARIANT_DATA: Record<WelcomeScreenVariant, VariantDataBundle> = {
  'first-time': {
    user: firstTimeUser,
    greeting: {
      headline: 'Welcome to Goodfin!',
      subheadline: "I'm your **private market finance assistant**. Let's get you started with exploring **exclusive investment opportunities**.",
    },
    suggestions: [
      'Complete my investor profile',
      'Explore available deals',
      'Schedule a call with an advisor',
      'Learn about private markets',
    ],
    featuredDeals: allDeals.filter(d => d.isFeatured || d.isNew).slice(0, 4),
  },
  'returning': {
    user: returningUser,
    greeting: {
      headline: `${getTimeGreeting()}, Alex!`,
      subheadline: "Welcome back. Since your last visit, we've added **3 new deals** that match your interests. Your watchlist has **2 deals** closing soon.",
    },
    suggestions: [
      'View new deals matching my interests',
      'Check my watchlist',
      'Continue my pending investment',
      'Update my preferences',
    ],
    recentDeals: recentDeals,
    featuredDeals: allDeals.slice(0, 4),
  },
  'invested': {
    user: returningUser,
    greeting: {
      headline: `${getTimeGreeting()}, Alex!`,
      subheadline: 'Your portfolio is performing well. Your investments have increased **+12.5%** this quarter. You have **1 document** requiring signature.',
    },
    suggestions: [
      'View portfolio performance',
      'Sign pending documents',
      'Explore new investment opportunities',
      'Download tax documents',
    ],
    portfolio: mockPortfolio,
    recentDeals: recentDeals.slice(0, 2),
    featuredDeals: allDeals.slice(0, 4),
  },
  'coffee-chat': {
    user: returningUser,
    greeting: {
      headline: `${getTimeGreeting()}, Alex!`,
      subheadline: "You have an **upcoming coffee chat** with Sarah Chen on December 18th. Don't forget to prepare your questions!",
    },
    suggestions: [
      'View coffee chat details',
      'Prepare questions for my chat',
      'Reschedule if needed',
      'Explore deals to discuss',
    ],
    events: allEvents.filter(e => e.type === 'coffee-chat' || e.isBooked),
    featuredDeals: allDeals.slice(0, 4),
  },
  'upcoming-events': {
    user: returningUser,
    greeting: {
      headline: `${getTimeGreeting()}, Alex!`,
      subheadline: "You're registered for **2 upcoming events** this week. Check out what's happening in the community.",
    },
    suggestions: [
      'View my event schedule',
      'Register for more events',
      'Watch past webinar recordings',
      'Explore community discussions',
    ],
    events: allEvents,
    featuredDeals: allDeals.slice(0, 4),
    communityInsights: allInsights.slice(0, 4),
  },
  'active-engaged': {
    user: returningUser,
    greeting: {
      headline: `${getTimeGreeting()}, Alex!`,
      subheadline: "Here's your personalized dashboard. Your portfolio is up **+12.5%**, you have **3 deals** in your watchlist, and **2 events** coming up.",
    },
    suggestions: [
      'Review my portfolio',
      'Check watchlist deals',
      'View upcoming events',
      'Explore new opportunities',
    ],
    portfolio: mockPortfolio,
    recentDeals: recentDeals,
    featuredDeals: allDeals,
    events: allEvents.slice(0, 3),
    communityInsights: allInsights,
  },
};

// Export individual mock data for direct use
export { allDeals, recentDeals, mockPortfolio, allEvents, allInsights };

// New mock data for redesigned welcome screen

// Mock Investors
const mockInvestors: Investor[] = [
  { id: 'inv-1', name: 'Erice Schmidt', avatarUrl: '/investors/google.png' },
  { id: 'inv-2', name: 'Dustin Moskovitz', avatarUrl: '/investors/asana.png' },
  { id: 'inv-3', name: 'Marc Andreessen', avatarUrl: '/investors/a16z.png' },
  { id: 'inv-4', name: 'Peter Thiel', avatarUrl: '/investors/founders-fund.png' },
];

// Brand logo URLs from goodfin-web-prototype
const BRAND_LOGOS = {
  SpaceX: 'https://companieslogo.com/img/orig/SPACE-47ee9544.png',
  Stripe: 'https://companieslogo.com/img/orig/STRIP-a42b4e5d.png',
  Anthropic: 'https://companieslogo.com/img/orig/anthropic-f375cfdb.png',
  Glean: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/z8j8a10l_400x400_1762719486703',
  Anduril: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/anduril.com_1760768896713',
  ShieldAI: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/MIXQiJiz_400x400_1739507012966',
  Ramp: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/images_1762127960971',
  Zipline: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/Screenshot_2025-11-18_at_12.38.34_PM_1763487522482',
  Vercel: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/images_1756325209692',
  MistralAI: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/Mistral_AI_logo_2025%E2%80%93_1757459566470',
  Polymarket: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/1_gJ8aceaPJTvHj9dxrKXGrA_1752166428379',
  PsiQuantum: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/PsiQuantum-Symbol-Black-Digital_1759100318214',
  Groq: 'https://goodfin-site-asset.s3.amazonaws.com/groq.png',
  xAI: 'https://goodfin-site-asset.s3.amazonaws.com/xAI.png',
  FoundersFund: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/1631346747811_1740622458797',
  YCombinator: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/2048px-Y_Combinator_logo.svg.png',
  Erebor: 'https://goodfin-site-asset.s3.us-east-1.amazonaws.com/ezgif-674d4b85aa8822_1752706176382',
};

// Mock Deal Cards
export const mockDealCards: DealCardData[] = [
  {
    id: 'spacex',
    name: 'SpaceX',
    description: 'Space travel with reusable rockets and interplanetary ambitions',
    logoUrl: BRAND_LOGOS.SpaceX,
    category: 'SPACE TECH',
    status: 'live',
    investors: mockInvestors.slice(0, 4),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment infrastructure powering millions of businesses worldwide',
    logoUrl: BRAND_LOGOS.Stripe,
    category: 'FINTECH',
    status: 'closing-soon',
    investors: mockInvestors.slice(0, 4),
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Anthropic is an AI safety and research company that is working to build steerable AI systems.',
    logoUrl: BRAND_LOGOS.Anthropic,
    category: 'AI',
    status: 'premium',
    investors: mockInvestors.slice(0, 4),
  },
  {
    id: 'anduril',
    name: 'Anduril',
    description: 'Next-generation defense technology revolutionizing military and national security systems.',
    logoUrl: BRAND_LOGOS.Anduril,
    category: 'DEFENSE TECH',
    status: 'live',
    investors: mockInvestors.slice(0, 4),
  },
  {
    id: 'glean',
    name: 'Glean',
    description: 'AI-powered enterprise search transforming how companies find knowledge and automate tasks.',
    logoUrl: BRAND_LOGOS.Glean,
    category: 'AI',
    status: 'live',
    investors: mockInvestors.slice(0, 4),
  },
  {
    id: 'ramp',
    name: 'Ramp',
    description: 'The fastest-growing spend management and finance automation platform for businesses.',
    logoUrl: BRAND_LOGOS.Ramp,
    category: 'FINTECH',
    status: 'closing-soon',
    investors: mockInvestors.slice(0, 4),
  },
];

// Mock Events for new Events Section
export const mockEventCards: EventCardData[] = [
  {
    id: 'evt-1',
    title: 'Marin Investors Pool Party and Roundtable',
    location: 'San Rafael, California',
    day: 2,
    month: 'AUG',
    year: 2025,
    dayOfWeek: 'Saturday',
    timeRange: '2:00 - 6:00 PM PDT',
    imageUrl: '/events/pool-party.png',
  },
  {
    id: 'evt-2',
    title: 'H4A Summer Happy Hour',
    location: 'San Rafael, California',
    day: 5,
    month: 'AUG',
    year: 2025,
    dayOfWeek: 'Tuesday',
    timeRange: '6:00 - 8:00 PM PDT',
    imageUrl: '/events/happy-hour.png',
  },
];

// Community topics for tabs (deals)
export const communityTopics = ['SpaceX', 'Anthropic', 'OpenAI', 'Glean', 'View all'];

// Deal-specific mock community comments
export const dealCommunityComments: Record<string, CommunityComment[]> = {
  'SpaceX': [
    {
      id: 'spacex-1',
      username: 'RocketFan2024',
      role: 'Aerospace Engineer',
      avatarColor: '#1e3a8a',
      timestamp: '2 hr. ago',
      content: 'The Starship program is accelerating faster than expected. With the latest successful landing, SpaceX is on track to revolutionize space transportation costs by 10x.',
      replies: [
        {
          id: 'spacex-1-reply-1',
          username: 'VentureInsider',
          role: 'VC Partner',
          avatarColor: '#4f46e5',
          timestamp: '1 hr. ago',
          content: 'Agreed. The unit economics on Starlink alone justify the current valuation. They\'re printing money with 3M+ subscribers and growing 30% QoQ.',
        },
      ],
    },
    {
      id: 'spacex-2',
      username: 'SpaceEconomist',
      role: 'Private market analyst',
      avatarColor: '#dc2626',
      timestamp: '3 hr. ago',
      content: 'Starlink revenue projections for 2025 are incredible - potentially $6B+ annually. This makes SpaceX one of the most diversified space companies ever.',
      isEdited: true,
    },
    {
      id: 'spacex-3',
      username: 'MarsOrBust',
      avatarColor: '#ea580c',
      timestamp: '4 hr. ago',
      content: 'Just attended the investor call. Elon mentioned they\'re planning 100+ launches next year. The vertical integration is unmatched in the industry.',
      replies: [
        {
          id: 'spacex-3-reply-1',
          username: 'TechBull',
          avatarColor: '#16a34a',
          timestamp: '2 hr. ago',
          content: 'The launch cadence is insane. They\'re basically doing what entire nations couldn\'t achieve. My only concern is key-man risk.',
        },
      ],
    },
  ],
  'Anthropic': [
    {
      id: 'anthropic-1',
      username: 'AIResearcher',
      role: 'ML Engineer @ Google',
      avatarColor: '#d97706',
      timestamp: '1 hr. ago',
      content: 'Claude 3.5 Sonnet is genuinely impressive. Anthropic\'s focus on safety while maintaining performance is setting them apart from OpenAI. The Constitutional AI approach is paying dividends.',
      replies: [
        {
          id: 'anthropic-1-reply-1',
          username: 'SafetyFirst',
          role: 'AI Ethics Researcher',
          avatarColor: '#7c3aed',
          timestamp: '45 min. ago',
          content: 'Their safety research is world-class. The interpretability work they\'re doing could be the key to responsible AGI development. Enterprise adoption is accelerating too.',
        },
      ],
    },
    {
      id: 'anthropic-2',
      username: 'EnterpriseAI',
      role: 'CTO @ Fortune 500',
      avatarColor: '#0891b2',
      timestamp: '2 hr. ago',
      content: 'We switched from GPT-4 to Claude for our enterprise deployment. The consistency and reduced hallucination rate saved us significant QA costs. ROI was evident within 3 months.',
      isEdited: true,
    },
    {
      id: 'anthropic-3',
      username: 'VCWatcher',
      avatarColor: '#be185d',
      timestamp: '3 hr. ago',
      content: 'The Amazon investment and Google backing give Anthropic unprecedented runway. At $18B valuation, they\'re still cheaper than OpenAI while arguably having better tech.',
      replies: [
        {
          id: 'anthropic-3-reply-1',
          username: 'DeepTechInvestor',
          avatarColor: '#4338ca',
          timestamp: '1 hr. ago',
          content: 'The Dario Amodei factor is underrated. He built GPT-3 at OpenAI. Having that caliber of leadership focused purely on safety-first AI is rare.',
        },
      ],
    },
  ],
  'OpenAI': [
    {
      id: 'openai-1',
      username: 'GPTMaximalist',
      role: 'Tech Entrepreneur',
      avatarColor: '#10b981',
      timestamp: '30 min. ago',
      content: 'GPT-4o is a game changer for real-time applications. The multimodal capabilities are finally where they need to be. Voice mode feels like magic.',
      replies: [
        {
          id: 'openai-1-reply-1',
          username: 'StartupFounder',
          role: 'YC Alum',
          avatarColor: '#f59e0b',
          timestamp: '15 min. ago',
          content: 'We rebuilt our entire product around GPT-4o APIs. The latency improvements alone made features possible that were science fiction 2 years ago.',
        },
      ],
    },
    {
      id: 'openai-2',
      username: 'MarketSkeptic',
      role: 'Hedge Fund Analyst',
      avatarColor: '#ef4444',
      timestamp: '2 hr. ago',
      content: 'At $150B+ valuation, I\'m concerned about the burn rate and Microsoft dependency. Revenue is impressive but path to profitability remains unclear.',
      isEdited: true,
    },
    {
      id: 'openai-3',
      username: 'AIOptimist',
      avatarColor: '#8b5cf6',
      timestamp: '4 hr. ago',
      content: 'ChatGPT reaching 200M weekly users is unprecedented for any software product. The enterprise push with Teams integration could be huge.',
      replies: [
        {
          id: 'openai-3-reply-1',
          username: 'TechAnalyst',
          avatarColor: '#06b6d4',
          timestamp: '2 hr. ago',
          content: 'The Sora video generation tool could open entirely new markets. Hollywood is already experimenting. This could be bigger than ChatGPT.',
        },
      ],
    },
  ],
  'Glean': [
    {
      id: 'glean-1',
      username: 'EnterpriseSearch',
      role: 'IT Director',
      avatarColor: '#2563eb',
      timestamp: '1 hr. ago',
      content: 'Deployed Glean across our 5000-person org last quarter. The productivity gains are measurable - employees save an average of 2 hours/week on information search.',
      replies: [
        {
          id: 'glean-1-reply-1',
          username: 'ProductivityGeek',
          role: 'Operations Lead',
          avatarColor: '#059669',
          timestamp: '30 min. ago',
          content: 'Same experience here. The AI assistant that understands our internal docs is a game changer. Onboarding new employees is 50% faster now.',
        },
      ],
    },
    {
      id: 'glean-2',
      username: 'SaaSInvestor',
      role: 'Growth Equity Partner',
      avatarColor: '#7c2d12',
      timestamp: '3 hr. ago',
      content: 'Glean\'s growth metrics are exceptional - 3x ARR growth, 150%+ net revenue retention. At $2B valuation, this could be a 10x opportunity if they capture the enterprise AI search market.',
    },
    {
      id: 'glean-3',
      username: 'FormerGoogler',
      avatarColor: '#1d4ed8',
      timestamp: '5 hr. ago',
      content: 'The founding team is ex-Google Search. They understand enterprise search at a deep level. The RAG implementation is best-in-class.',
      isEdited: true,
      replies: [
        {
          id: 'glean-3-reply-1',
          username: 'TechRecruiter',
          avatarColor: '#db2777',
          timestamp: '2 hr. ago',
          content: 'Their engineering team is stacked. They\'ve been hiring top talent from Google, Meta, and OpenAI. The technical moat is real.',
        },
      ],
    },
  ],
};

// Get comments for a specific topic
export function getCommentsForTopic(topic: string): CommunityComment[] {
  if (topic === 'View all') {
    // Return a mix of comments from all deals
    return [
      dealCommunityComments['SpaceX'][0],
      dealCommunityComments['Anthropic'][0],
      dealCommunityComments['OpenAI'][0],
      dealCommunityComments['Glean'][0],
    ];
  }
  return dealCommunityComments[topic] || [];
}

// Default comments (SpaceX) for backwards compatibility
export const mockCommunityComments: CommunityComment[] = dealCommunityComments['SpaceX'];

// Mock portfolio data for chart
export const mockPortfolioChart = {
  totalValue: 1946160,
  percentageChange: 8.12,
  amountInvested: 1800000,
  returns: 146160,
  lastUpdated: '24 Hr ago',
  chartData: [
    { month: 'JAN', value: 1750000 },
    { month: 'FEB', value: 1820000 },
    { month: 'MAR', value: 1780000 },
    { month: 'APR', value: 1850000 },
    { month: 'JUN', value: 1946160 },
  ],
};
