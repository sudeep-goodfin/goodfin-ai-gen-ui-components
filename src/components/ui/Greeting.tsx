import React from 'react';
import { cn } from '@/lib/utils';

interface GreetingProps {
  title?: string;
  description?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  showAvatar?: boolean;
  className?: string;
}

export function Greeting({
  title = "Good afternoon, Alex",
  description = "Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon.",
  avatarSrc = "/conciergeIcon.png",
  avatarAlt = "Assistant",
  showAvatar = true,
  className,
}: GreetingProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-3xl", className)}>
      {/* Avatar */}
      {showAvatar && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border border-card">
          <img src={avatarSrc} alt={avatarAlt} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] text-muted-foreground leading-[33.6px] tracking-tight font-serif transition-all duration-300">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground leading-normal font-light transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
