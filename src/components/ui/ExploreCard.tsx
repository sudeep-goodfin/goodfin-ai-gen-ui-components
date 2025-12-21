import React from 'react';
import { cn } from '@/lib/utils';

// Background container for explore cards
interface ExploreCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ExploreCard({ children, onClick, className }: ExploreCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[#f7f7f8] h-[196px] relative rounded-[12px] shrink-0 w-full cursor-pointer group transition-all duration-300 overflow-hidden border border-[#e6e4e7] hover:border-[#d4d1d6] hover:shadow-md",
        className
      )}
    >
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[12px] relative rounded-[inherit] size-full z-10">
        {children}
      </div>
    </div>
  );
}

// Explore card content
interface ExploreCardContentProps {
  title: string;
  descriptions: string[];
  icon?: React.ReactNode;
  className?: string;
}

export function ExploreCardContent({ title, descriptions, icon, className }: ExploreCardContentProps) {
  return (
    <div className={cn("absolute flex flex-col gap-[8px] items-start left-0 p-[20px] top-0 w-full h-full rounded-[12px]", className)}>
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-[#e9e6ea] flex items-center justify-center mb-2 group-hover:bg-[#d4d1d6] transition-colors">
          {icon}
        </div>
      )}
      <span className="text-[#29272a] text-[16px] leading-[20px] font-medium tracking-[-0.15px] group-hover:text-[#48424a] transition-colors">
        {title}
      </span>
      <div className="text-[#7f7582] text-[13px] leading-5 font-normal">
        {descriptions.map((desc, idx) => (
          <p key={idx}>{desc}</p>
        ))}
      </div>
    </div>
  );
}

// Section header component
interface SectionHeaderProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export function SectionHeader({ icon, text, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start px-0 py-2 w-full", className)}>
      <div className="flex gap-2.5 items-center">
        <div className="flex items-center shrink-0">
          {icon}
        </div>
        <span className="text-muted-foreground text-base leading-6">{text}</span>
      </div>
    </div>
  );
}
