// Shared mocked data for conversation and components
// This data is used by both the conversation flow and the component previews

export const mockedInvestmentData = {
  // User info
  userName: 'Jay',

  // Deal info
  dealName: 'Databricks IV',
  dealCompany: 'Databricks',
  dealDescription: 'AI and data infrastructure',

  // Investment details
  minimumInvestment: 25000,
  selectedAmount: 200000,

  // Deal highlights
  highlights: [
    'Backed by top investors (Andreessen Horowitz, NVIDIA, BlackRock, and more)',
    'Valuation topping $130 billion',
    'Over 15,000 customers including world\'s largest enterprises',
    'Over $3.7 billion in annual recurring revenue',
    '50% year-over-year growth',
  ],

  // Documents
  documents: [
    { id: 'ppm', name: 'Subscription Agreement & Privacy Notice', step: 1, total: 3 },
    { id: 'lloa', name: 'Limited Liability Operating Agreement', step: 2, total: 3 },
    { id: 'sub', name: 'Subscription Agreement', step: 3, total: 3 },
  ],

  // Risk factors
  risks: [
    { title: 'Illiquidity Risk', description: '5-7+ year hold period - you cannot easily sell your shares' },
    { title: 'Capital Loss Risk', description: 'Risk of partial or total loss of capital' },
    { title: 'Accredited Investor Requirement', description: 'Must meet income/net worth qualifications' },
    { title: 'No Guaranteed Returns', description: "Past performance doesn't guarantee future results" },
  ],

  // Investment amounts options
  investmentOptions: [
    { amount: 25000, label: '$25,000', description: 'Minimum entry, good for first-time private market investors' },
    { amount: 50000, label: '$50,000', description: 'Sweet spot for many investors, meaningful exposure' },
    { amount: 100000, label: '$100,000', description: 'Substantial position, popular with experienced investors' },
    { amount: 200000, label: '$200,000+', description: 'Aggressive allocation for high conviction' },
  ],
};

// Format currency helper
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with commas
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount);
}
