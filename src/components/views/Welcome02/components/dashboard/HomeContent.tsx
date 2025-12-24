import React from 'react';
import { ChatMode } from './InputBar';
import { Greeting } from './Greeting';
import { ResumeInvestmentCard } from './ResumeInvestmentCard';
import { ExploreGoodfin } from './ExploreGoodfin';

interface HomeContentProps {
  onModeChange?: (mode: ChatMode) => void;
  onStartChat?: (text: string) => void;
}

export function HomeContent({ onModeChange, onStartChat }: HomeContentProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl pb-20">
      <div className="flex flex-col gap-10 grow items-center w-full">

        {/* Greeting Section */}
        <Greeting />

        {/* Resume Investing Section */}
        <ResumeInvestmentCard
          onContinue={() => onStartChat ? onStartChat('Resume investing in Anthropic') : onModeChange?.('deals')}
        />

        {/* Explore Goodfin */}
        <ExploreGoodfin
          onDealsClick={() => onModeChange?.('deals')}
          onNewsClick={() => onModeChange?.('news')}
          onEventsClick={() => onModeChange?.('events')}
          onCommunityClick={() => onModeChange?.('insight')}
        />
      </div>
    </div>
  );
}
