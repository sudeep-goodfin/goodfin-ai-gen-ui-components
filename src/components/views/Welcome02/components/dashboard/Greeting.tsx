import React from 'react';

interface GreetingProps {
  title?: string;
  portfolioGain?: string;
  portfolioPercentage?: string;
  priorityAllocations?: string;
  isFirstTimeUser?: boolean;
  firstTimeDescription?: string;
}

export function Greeting({
  title = "Good afternoon, Alex",
  portfolioGain = "$154k",
  portfolioPercentage = "+12.4%",
  priorityAllocations = "3 priority allocations expiring soon",
  isFirstTimeUser = false,
  firstTimeDescription = "Welcome to Goodfin! I'm your AI concierge, here to help you discover and invest in exclusive opportunities. Let's get started."
}: GreetingProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Greeting Header with Avatar inline */}
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-[0px_0.833px_2.5px_0px_rgba(0,0,0,0.1),0px_0.833px_1.667px_-0.833px_rgba(0,0,0,0.1)] border border-[#F8F8F8]">
          <img src="/conciergeIcon.png" alt="Goodfin AI" className="w-full h-full object-cover opacity-90" />
        </div>
        <h1 className="text-[20px] text-[#48424a] leading-[30.4px] tracking-[-0.7px] font-serif">
          {title}
        </h1>
      </div>

      {/* Description - different for first-time vs returning users */}
      {isFirstTimeUser ? (
        <p className="text-[16px] text-[#7f7582] leading-[24px] font-['Soehne',sans-serif]">
          {firstTimeDescription}
        </p>
      ) : (
        <p className="text-[16px] text-[#7f7582] leading-[24px] font-['Soehne',sans-serif]">
          Your portfolio increased by{' '}
          <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a] font-medium">
            {portfolioGain} ({portfolioPercentage})
          </span>{' '}
          this month, primarily driven by secondary market activity in SpaceX. You have{' '}
          <span className="font-['Soehne_Kraftig',sans-serif] text-[#29272a] font-medium">
            {priorityAllocations}
          </span>
          .
        </p>
      )}
    </div>
  );
}
