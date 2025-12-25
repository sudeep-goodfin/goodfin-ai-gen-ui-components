// Investment Review
export { InvestmentReviewChat, investmentReviewVariants } from './InvestmentReview';
export type { InvestmentReviewVariant } from './InvestmentReview';

// Deal Preview
export { DealPreviewView, DealCard, dealPreviewVariants } from './DealPreview';
export type { DealPreviewVariant } from './DealPreview';

// Deal Investment
export { DealPageInvestmentView, AmountSelector, dealInvestmentVariants } from './DealInvestment';
export type { DealInvestmentVariant } from './DealInvestment';

// Investment Risk
export { InvestmentRiskView, RiskCard, riskCardsData, investmentRiskVariants } from './InvestmentRisk';
export type { InvestmentRiskVariant } from './InvestmentRisk';

// Document Detail
export { DocumentDetailView, documentSummaryPoints, documentDetailVariants } from './DocumentDetail';
export type { DocumentDetailVariant } from './DocumentDetail';

// Signature Input
export { SignatureInputView, SignatureCanvas, signatureInputVariants } from './SignatureInput';
export { SimpleVariantContent as SignatureInputContent } from './SignatureInput/SimpleVariant';
export type { SignatureInputVariant } from './SignatureInput';

// Document Signing
export { DocumentAttachmentWithSign, SignableDocumentCard } from './DocumentSigning';

// Apply Credit
export { ApplyCreditView, CreditCard, applyCreditVariants } from './ApplyCredit';
export { SimpleVariantContent as ApplyCreditContent } from './ApplyCredit/SimpleVariant';
export type { ApplyCreditVariant } from './ApplyCredit';

// Promo Code
export { PromoCodeView, PromoCodeCard, promoCodeVariants } from './PromoCode';
export { SimpleVariantContent as PromoCodeContent } from './PromoCode/SimpleVariant';
export type { PromoCodeVariant } from './PromoCode';

// Investor Profile
export { InvestorProfileView, ProfileSelector, investorProfileVariants } from './InvestorProfile';
export { SimpleVariantContent as InvestorProfileContent } from './InvestorProfile/SimpleVariant';
export type { InvestorProfileVariant } from './InvestorProfile';

// Bank Selection
export { BankSelectionView, BankSearchDropdown, bankSelectionVariants } from './BankSelection';
export { SimpleVariantContent as BankSelectionContent } from './BankSelection/SimpleVariant';
export type { BankSelectionVariant } from './BankSelection';

// Country Selection
export { CountrySelectionView, CountrySearchDropdown, countrySelectionVariants } from './CountrySelection';
export { SimpleVariantContent as CountrySelectionContent } from './CountrySelection/SimpleVariant';
export type { CountrySelectionVariant } from './CountrySelection';

// Wire Instructions
export { WireInstructionsView, WireInstructionsCard, wireInstructionsVariants } from './WireInstructions';
export { SimpleVariantContent as WireInstructionsContent } from './WireInstructions/SimpleVariant';
export type { WireInstructionsVariant } from './WireInstructions';

// AI Greeting
export {
  AIGreetingView,
  AIGreetingContent,
  aiGreetingVariants,
  accreditedSubStates,
  nonAccreditedSubStates,
} from './AIGreeting';
export type {
  AIGreetingVariant,
  AccreditationStatus,
  AccreditedSubState,
  NonAccreditedSubState,
} from './AIGreeting';

// Onboarding
export { OnboardingView, onboardingVariants } from './Onboarding';
export type { OnboardingVariant, OnboardingStep, OnboardingUserData } from './Onboarding';

// Introducing Investor Ticker
export { IntroducingTickerView, IntroducingTickerModal, introducingTickerVariants } from './IntroducingInvestorTicker';
export type { IntroducingTickerVariant } from './IntroducingInvestorTicker';

// Introducing Goodfin AI
export { IntroducingGoodfinAIView, GoodfinAIOnboardingModal, introducingGoodfinAIVariants } from './IntroducingGoodfinAI';
export type { IntroducingGoodfinAIVariant } from './IntroducingGoodfinAI';

// Welcome Screen
export { WelcomeScreenView, WelcomeScreenContent, welcomeScreenVariants } from './WelcomeScreen';
export type { WelcomeScreenVariant } from './WelcomeScreen';

// Welcome 0.2 (New Dashboard Design)
export {
  Welcome02,
  Header as Welcome02Header,
  Sidebar as Welcome02Sidebar,
  WelcomeDashboard as Welcome02Dashboard,
  InputBar as Welcome02InputBar,
  InputBarV01,
  InputBarV02,
  HomeContent as Welcome02HomeContent,
  DashboardContent as Welcome02DashboardContent,
  SuggestionCard as Welcome02SuggestionCard,
  SUGGESTIONS_DATA as Welcome02SuggestionsData,
  Greeting as Welcome02Greeting,
  ProgressWidget as Welcome02ProgressWidget,
  ProgressCircle as Welcome02ProgressCircle,
  NewsContent as Welcome02NewsContent,
  EventsContent as Welcome02EventsContent,
  EventCard as Welcome02EventCard,
  EVENTS_DATA as Welcome02EventsData,
} from './Welcome02';
export type {
  Welcome02Variant,
  ChatMode as Welcome02ChatMode,
  MoreMode as Welcome02MoreMode,
  EventCardProps as Welcome02EventCardProps,
  InputBarVersion,
} from './Welcome02';

// Components Landing
export { ComponentsLanding } from './ComponentsLanding';

// Deal Product Page (Investment Entry)
export {
  DealProductPage,
  DealProductPageView,
  InvestmentEntry, // Legacy alias
  InvestmentEntryView, // Legacy alias
  ANTHROPIC_DATA,
  SAMPLE_POSTS,
} from './DealProductPage';
export type { Company, InvestorPost, TabId } from './DealProductPage';

// Investment Flow (Multi-step investment process)
export {
  InvestmentFlow,
  InvestmentFlowView,
  investmentFlowVariants,
  TRANSFER_METHODS,
  FAQ_ITEMS,
} from './InvestmentFlow';
export type { InvestmentFlowStep, TransferMethod, CompanyData } from './InvestmentFlow';

// Z AI Investment Flow (Chat-based investment experience)
export {
  ZAIInvestmentFlow,
  ZAIInvestmentFlowView,
  zaiInvestmentFlowVariants,
  INVESTMENT_DOCUMENTS,
  DEFAULT_DEAL,
} from './ZAIInvestmentFlow';
export type {
  FlowStep as ZAIFlowStep,
  InvestmentDocument,
  DealInfo,
  Message as ZAIMessage,
} from './ZAIInvestmentFlow';
