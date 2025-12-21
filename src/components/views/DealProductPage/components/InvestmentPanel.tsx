import { cn } from '@/lib/utils';
import {
  SupportAccordion,
  TermsAccordion,
  DisclaimerAccordion,
  LegalDocumentsAccordion,
  PresentationDeckAccordion,
} from './AccordionSection';
import { InvestmentSignal } from './InvestmentSignal';
import { CommunitySentiment } from './CommunitySentiment';
import { OverallOutlook } from './OverallOutlook';
import type {
  InvestmentSignalData,
  CommunitySentimentData,
} from '../types';

interface InvestmentPanelProps {
  currentlyInvested: number;
  investmentSignal: InvestmentSignalData;
  communitySentiment: CommunitySentimentData;
  overallRating: number;
  onStartInvestment: () => void;
  className?: string;
}

export function InvestmentPanel({
  currentlyInvested,
  investmentSignal,
  communitySentiment,
  overallRating,
  onStartInvestment,
  className,
}: InvestmentPanelProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-10 bg-[#f7f7f8] px-6 py-4 h-full overflow-y-auto',
        className
      )}
    >
      {/* Currently Invested & Start Button */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#7f7582]">Currently Invested</span>
          <span className="text-2xl font-medium text-[#29272a]">
            ${currentlyInvested.toLocaleString()}
          </span>
        </div>

        {/* Start Investment Button */}
        <button
          onClick={onStartInvestment}
          className="w-full py-3 px-8 rounded-lg text-white font-medium text-base transition-all hover:opacity-90"
          style={{
            background:
              'linear-gradient(93.82deg, rgba(127, 117, 130, 0.63) 0%, rgba(56, 52, 57, 0.63) 99.63%), linear-gradient(90deg, #373338 0%, #373338 100%)',
            boxShadow:
              '0px 2px 4px 0px rgba(190, 185, 192, 0.64), inset 2px 2px 2px 0px rgba(255, 255, 255, 0.14)',
          }}
        >
          Start Investment
        </button>

        {/* Terms disclaimer */}
        <p className="text-xs text-[#7f7582] leading-4">
          By investing, you have read and agree to our Terms & Conditions and
          Disclaimer below.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="flex flex-col">
        <SupportAccordion />
        <TermsAccordion />
        <DisclaimerAccordion />
        <LegalDocumentsAccordion />
        <PresentationDeckAccordion />
      </div>

      {/* Investment Signal */}
      <InvestmentSignal data={investmentSignal} />

      {/* Community Sentiment */}
      <CommunitySentiment data={communitySentiment} />

      {/* Overall Outlook */}
      <OverallOutlook rating={overallRating} />
    </div>
  );
}
