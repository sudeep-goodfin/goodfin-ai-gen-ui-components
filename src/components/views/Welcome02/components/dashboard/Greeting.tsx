import React from 'react';
import imgRectangle161681 from "../../assets/4d0b2c28bd95aa5be274f3511f4196cdd51cac17.png";

interface GreetingProps {
  title?: string;
  description?: string;
}

export function Greeting({
  title = "Good afternoon, Alex",
  description = "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon."
}: GreetingProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl">
       {/* Greeting Header with Avatar */}
       <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-white">
           <img src={imgRectangle161681} alt="Goodfin AI" className="w-full h-full object-cover" />
       </div>

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
