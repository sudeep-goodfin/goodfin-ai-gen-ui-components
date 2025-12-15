import React from 'react';
import { ChatLayout } from './ChatLayout';
import { ChatMessage } from './ChatMessage';
import { SuggestionGroup } from '../ui';
import { mockedInvestmentData, formatCurrency } from '../../data/conversationData';

// Message types
type ConversationMessage = {
  type: 'user' | 'ai' | 'component' | 'section-header';
  content: React.ReactNode;
  attachments?: { title: string; subtitle?: string; href?: string }[];
  componentId?: string; // Which component to render
};

type ConversationViewProps = {
  messages: ConversationMessage[];
  components?: Record<string, React.ReactNode>; // Map of componentId to component
};

// User message bubble component
function UserMessage({ content }: { content: React.ReactNode }) {
  return (
    <div className="flex justify-end mb-6">
      <div
        className="font-primary"
        style={{
          backgroundColor: '#F0EEF0',
          color: '#030303',
          borderRadius: '16px',
          padding: '8px 12px',
          maxWidth: '450px',
          boxShadow: '0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.50) inset',
        }}
      >
        <div className="text-sm leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

// Section header component
function SectionHeader({ content }: { content: React.ReactNode }) {
  return (
    <div className="py-4 mb-4 border-t border-grey-200 mt-8 first:mt-0 first:border-t-0">
      <h3 className="text-base font-semibold text-grey-700 font-primary">{content}</h3>
    </div>
  );
}

export function ConversationView({
  messages,
  components = {},
}: ConversationViewProps) {
  return (
    <ChatLayout>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message.type === 'section-header' ? (
            <SectionHeader content={message.content} />
          ) : message.type === 'user' ? (
            <UserMessage content={message.content} />
          ) : message.type === 'component' && message.componentId ? (
            <div className="mb-6">
              {components[message.componentId] || (
                <div className="p-4 bg-grey-100 rounded-xl text-grey-500 text-sm">
                  [Component: {message.componentId}]
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <ChatMessage
                content={message.content}
                attachments={message.attachments}
                showFeedback={false}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </ChatLayout>
  );
}

// Shorthand for data
const d = mockedInvestmentData;

// Complete Investment Flow Conversation using mocked data
export const investmentFlowConversation: ConversationMessage[] = [
  // Section 1: Initial Investment Interest
  { type: 'section-header', content: 'Initial Investment Interest' },

  { type: 'user', content: `I want to invest in ${d.dealName}` },

  {
    type: 'ai',
    content: (
      <div>
        <p className="mb-3">
          Excellent choice, {d.userName}! {d.dealName} is one of the most compelling opportunities
          in the {d.dealDescription} space right now.
        </p>
        <p>
          How much would you like to invest? The minimum is {formatCurrency(d.minimumInvestment)},
          but you can invest any amount above that.
        </p>
      </div>
    ),
  },

  { type: 'user', content: "What's a good amount?" },

  {
    type: 'ai',
    content: (
      <div>
        <p className="mb-3">Great question! It depends on your investment goals and portfolio. Here are some popular options:</p>
        <ul className="list-none space-y-1 mb-3">
          {d.investmentOptions.map((opt, i) => (
            <li key={i}>• <strong>{opt.label}</strong> - {opt.description}</li>
          ))}
        </ul>
        <p>What feels right for your situation?</p>
      </div>
    ),
  },

  { type: 'user', content: `I'd like to invest ${formatCurrency(d.selectedAmount)}` },

  {
    type: 'ai',
    content: (
      <div>
        <p className="mb-3">
          Perfect! {formatCurrency(d.selectedAmount)} in {d.dealName} is a solid investment.
          That gives you meaningful exposure to {d.dealCompany}'s growth potential.
        </p>
        <p>
          Now let's move through the legal documents - there are {d.documents.length} important ones
          we need to review together. Ready to start with the first one?
        </p>
      </div>
    ),
  },

  // Show deal preview component here
  { type: 'component', content: null, componentId: 'deal-preview' },

  // Section 2: Document Step 1
  { type: 'section-header', content: `Document Step 1: ${d.documents[0].name}` },

  {
    type: 'ai',
    content: (
      <div>
        <p className="font-semibold mb-3">Step {d.documents[0].step} of {d.documents[0].total}: {d.documents[0].name}</p>
        <p className="mb-3">The {d.documents[0].name} explains your {d.dealName} investment opportunity. Key points:</p>
        <ul className="list-none space-y-1 mb-3">
          <li>• <strong>What you're investing in:</strong> {d.dealCompany}'s {d.dealDescription} platform</li>
          <li>• <strong>Use of funds:</strong> R&D, expansion, operational costs</li>
          <li>• <strong>Financial projections:</strong> Potential 5-10x returns over 5-7 years</li>
          <li>• <strong>Risk factors:</strong> Technology, regulatory, market competition</li>
          <li>• <strong>Investment structure:</strong> You'll own units in a fund that holds {d.dealCompany} shares</li>
        </ul>

        <SuggestionGroup
          suggestions={[
            'What are the main risks?',
            'How will my money be used?',
            'What are the expected returns?',
          ]}
          label="Ask me anything about this document:"
        />
      </div>
    ),
  },

  { type: 'user', content: 'What are the main risks I should know about?' },

  {
    type: 'ai',
    content: (
      <div>
        <p className="font-semibold mb-3">Risk Analysis:</p>
        <p className="mb-3">The main risks for your {d.dealName} investment include:</p>

        {d.risks.map((risk, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{risk.title}:</p>
            <p className="text-grey-600">{risk.description}</p>
          </div>
        ))}

        <p className="mt-3">The document covers these in detail. Want to review the full document now?</p>
      </div>
    ),
  },

  // Show risk component
  { type: 'component', content: null, componentId: 'investment-risk' },

  { type: 'user', content: 'Yes, show me the document' },

  {
    type: 'ai',
    content: (
      <p>
        Perfect! Here's the {d.documents[0].name}. Take your time to read through it - it's detailed but important.
        Ask me any questions as you review.
      </p>
    ),
  },

  // Show document detail component
  { type: 'component', content: null, componentId: 'document-detail' },

  { type: 'user', content: "I've finished reading and understand the terms" },

  {
    type: 'ai',
    content: (
      <p>
        Excellent! You've completed the {d.documents[0].name} review. ✅
        <br /><br />
        Moving to document {d.documents[1].step} of {d.documents[1].total}...
      </p>
    ),
  },

  // Section 3: Document Step 2
  { type: 'section-header', content: `Document Step 2: ${d.documents[1].name}` },

  {
    type: 'ai',
    content: (
      <div>
        <p className="font-semibold mb-3">Step {d.documents[1].step} of {d.documents[1].total}: {d.documents[1].name}</p>
        <p className="mb-3">The {d.documents[1].name} defines your rights and obligations as a fund investor:</p>
        <ul className="list-none space-y-1 mb-3">
          <li>• <strong>Your investor rights:</strong> Vote on major fund decisions, access to quarterly reports</li>
          <li>• <strong>Fund management:</strong> Professional fund managers handle day-to-day operations</li>
          <li>• <strong>Distributions:</strong> You'll receive proceeds when {d.dealCompany} has liquidity events</li>
          <li>• <strong>Governance:</strong> Annual investor meetings, voting on key decisions</li>
          <li>• <strong>Exit provisions:</strong> Limited transfer rights, potential secondary market opportunities</li>
        </ul>

        <SuggestionGroup
          suggestions={[
            'What voting rights do I have?',
            'How are distributions handled?',
            'Can I exit my investment early?',
          ]}
          label="Ask me anything about this document:"
        />
      </div>
    ),
  },

  { type: 'user', content: 'What voting rights do I have?' },

  {
    type: 'ai',
    content: (
      <div>
        <p className="font-semibold mb-3">Voting Rights Explained:</p>
        <p className="mb-3">As a {formatCurrency(d.selectedAmount)} investor, you'll have voting rights on:</p>

        <p className="font-semibold mt-3">Major Decisions (Require Investor Approval):</p>
        <ul className="list-none space-y-1 mb-2">
          <li>• Changes to investment strategy or fund terms</li>
          <li>• Replacement of fund managers</li>
          <li>• Major amendments to the agreement</li>
          <li>• Decisions to wind down the fund</li>
        </ul>

        <p className="font-semibold mt-3">Your Voting Power:</p>
        <ul className="list-none space-y-1 mb-2">
          <li>• Proportional to your investment ({formatCurrency(d.selectedAmount)} out of total fund size)</li>
          <li>• Typically requires majority or supermajority for major changes</li>
        </ul>

        <p className="mt-3">Ready to review the full document?</p>
      </div>
    ),
  },

  { type: 'user', content: 'Yes, let me see it' },

  {
    type: 'ai',
    content: (
      <p>Great! Here's the {d.documents[1].name}. This one covers your investor rights in detail.</p>
    ),
  },

  // Show document component for LLOA
  { type: 'component', content: null, componentId: 'document-detail-2' },

  { type: 'user', content: 'Done with this document' },

  {
    type: 'ai',
    content: (
      <p>
        Perfect! {d.documents[1].name} review complete. ✅
        <br /><br />
        Now for the final document - your formal investment commitment...
      </p>
    ),
  },

  // Section 4: Document Step 3
  { type: 'section-header', content: `Document Step 3: ${d.documents[2].name}` },

  {
    type: 'ai',
    content: (
      <div>
        <p className="font-semibold mb-3">Step {d.documents[2].step} of {d.documents[2].total}: {d.documents[2].name}</p>
        <p className="mb-3">This is your formal commitment to invest. The {d.documents[2].name} confirms:</p>
        <ul className="list-none space-y-1 mb-3">
          <li>• <strong>Investment amount:</strong> {formatCurrency(d.selectedAmount)} in {d.dealName}</li>
          <li>• <strong>Your accreditation:</strong> Confirms you qualify as an accredited investor</li>
          <li>• <strong>Payment terms:</strong> Wire transfer instructions and deadline</li>
          <li>• <strong>Acknowledgments:</strong> You understand the risks and have reviewed all documents</li>
          <li>• <strong>Signature required:</strong> Legally binding commitment</li>
        </ul>
        <p className="mb-3 text-warning"><strong>Important:</strong> Once signed, you're committed to funding within 5 business days.</p>

        <SuggestionGroup
          suggestions={[
            "I'm ready to sign",
            'What happens after I sign?',
            'Review investment details',
          ]}
        />
      </div>
    ),
  },

  { type: 'user', content: "Yes, I'm ready to sign" },

  {
    type: 'ai',
    content: (
      <p>
        Here's your {d.documents[2].name}. Please review your investment details and provide your signature below.
      </p>
    ),
  },

  // Show signature component
  { type: 'component', content: null, componentId: 'signature-input' },

  // Section 5: Document Signing
  { type: 'section-header', content: 'Document Signing' },

  { type: 'user', content: "I'm ready to sign" },

  {
    type: 'ai',
    content: (
      <p>
        I've prepared the documents for your signature. Please review and sign each document to proceed with your investment.
      </p>
    ),
  },

  // Show document signing component
  { type: 'component', content: null, componentId: 'document-signing' },

  // Section 6: Apply Credit
  { type: 'section-header', content: 'Apply Credit' },

  { type: 'user', content: 'Confirmed. Please proceed with this identity' },

  {
    type: 'ai',
    content: (
      <p>
        Checking your account... Let me see if you have any credits available to apply to this investment.
      </p>
    ),
  },

  // Show apply credit component
  { type: 'component', content: null, componentId: 'apply-credit' },

  // Section 7: Promo Code
  { type: 'section-header', content: 'Promo Code' },

  { type: 'user', content: "I don't want to apply any credit to this investment." },

  {
    type: 'ai',
    content: (
      <p>
        No problem! Do you have a promo code for this investment? If so, enter it below to receive any applicable discounts.
      </p>
    ),
  },

  // Show promo code component
  { type: 'component', content: null, componentId: 'promo-code' },

  // Section 8: Investor Profile
  { type: 'section-header', content: 'Investor Profile' },

  { type: 'user', content: "I don't have a promo code to apply." },

  {
    type: 'ai',
    content: (
      <p>
        Nice — documents are signed. Next up is identity verification for your {d.dealName} investment. This is standard for all investors and helps protect you.
        <br /><br />
        Please select your investor profile to continue.
      </p>
    ),
  },

  // Show investor profile component
  { type: 'component', content: null, componentId: 'investor-profile' },

  // Section 9: Country Selection
  { type: 'section-header', content: 'Country Selection' },

  { type: 'user', content: 'I have read the documents, and fully acknowledge the risks. Signed.' },

  {
    type: 'ai',
    content: (
      <p>
        Perfect! Now let's get your wire transfer set up.
        <br /><br />
        First question: <strong>Where will you be wiring from?</strong> Please tell me your bank's country.
      </p>
    ),
  },

  // Show country selection component
  { type: 'component', content: null, componentId: 'country-selection' },

  // Section 10: Bank Selection
  { type: 'section-header', content: 'Bank Selection' },

  { type: 'user', content: 'United States' },

  {
    type: 'ai',
    content: (
      <p>
        Great! What's the name of the bank you'll be wiring from?
        <br /><br />
        <span className="text-muted-foreground">(e.g., Chase, Bank of America, Wells Fargo, etc.)</span>
      </p>
    ),
  },

  // Show bank selection component
  { type: 'component', content: null, componentId: 'bank-selection' },

  // Section 11: Wire Instructions
  { type: 'section-header', content: 'Wire Instructions' },

  { type: 'user', content: 'Chase' },

  {
    type: 'ai',
    content: (
      <p>
        Perfect! Here are your <strong>wire transfer instructions</strong> for {d.dealName}. You can use these details to send your investment from Chase.
      </p>
    ),
  },

  // Show wire instructions component
  { type: 'component', content: null, componentId: 'wire-instructions' },

  // Section 12: Final Confirmation
  { type: 'section-header', content: 'Investment Complete' },

  { type: 'user', content: 'Yes' },

  {
    type: 'ai',
    content: (
      <div>
        <p className="text-lg font-semibold mb-3">Congratulations, {d.userName}! Your {d.dealName} investment is confirmed! 🎉</p>
        <p className="mb-3"><strong>Investment Summary:</strong></p>
        <ul className="list-none space-y-1 mb-3">
          <li>• <strong>Amount:</strong> {formatCurrency(d.selectedAmount)}</li>
          <li>• <strong>Fund:</strong> {d.dealName}</li>
          <li>• <strong>Documents signed:</strong> {d.documents.map(doc => doc.name).join(', ')}</li>
        </ul>
        <p className="mb-3"><strong>Next Steps:</strong></p>
        <ul className="list-none space-y-1 mb-3">
          <li>1. Complete the wire transfer using the instructions above</li>
          <li>2. Wire must be received within 5 business days</li>
          <li>3. Once funded, you'll receive your official investor welcome packet</li>
        </ul>
        <p>Welcome to {d.dealName}! 🚀</p>
      </div>
    ),
  },
];

// Legacy export for backward compatibility
export const spaceXInvestmentFlow = investmentFlowConversation;

// AI Greeting Conversation Flow - Shows ONLY the greeting component
// This is a standalone greeting view without additional conversation
export const aiGreetingConversationFlow: ConversationMessage[] = [
  // Only show AI Greeting component - no other content
  { type: 'component', content: null, componentId: 'ai-greeting' },
];

// Legacy templates for backward compatibility
export const conversationTemplates = {
  'deal-preview': investmentFlowConversation.slice(0, 8),
  'deal-page-investment': investmentFlowConversation.slice(0, 8),
  'investment-risk': investmentFlowConversation.slice(8, 14),
  'investment-review': investmentFlowConversation,
  'document-detail': investmentFlowConversation.slice(14, 20),
  'signature-input': investmentFlowConversation.slice(26, 32),
  'document-signing': investmentFlowConversation.slice(26, 32),
  'ai-greeting': aiGreetingConversationFlow,
};
