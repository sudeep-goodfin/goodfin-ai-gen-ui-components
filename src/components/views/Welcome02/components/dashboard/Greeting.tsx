import React from 'react';

interface GreetingProps {
  title?: string;
  description?: string;
}

// AI Avatar component
function AIAvatar() {
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-white">
      <div className="w-full h-full bg-gradient-to-br from-[#f4d1ff] via-[#f8bcd8] to-[#fcedd6]" />
    </div>
  );
}

export function Greeting({
  title = "Good afternoon, Alex",
  description = "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon."
}: GreetingProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl">
      {/* Greeting Header with Avatar */}
      <AIAvatar />

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] text-[#48424a] leading-[33.6px] tracking-[-0.7px] font-serif transition-all duration-300">
          {title}
        </h1>
        <p className="text-[20px] text-[#48424a] leading-normal font-light transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
