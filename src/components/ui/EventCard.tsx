import React from 'react';
import { cn } from '@/lib/utils';
import { iconPaths } from './icons';

// Event type configuration
export interface EventType {
  id: string;
  name: string;
  color: string;
}

// Default event types
export const EVENT_TYPES: Record<string, EventType> = {
  summit: { id: 'summit', name: 'Summit', color: '#7c3aed' },
  roundtable: { id: 'roundtable', name: 'Roundtable', color: '#0891b2' },
  networking: { id: 'networking', name: 'Networking', color: '#ca8a04' },
  webinar: { id: 'webinar', name: 'Webinar', color: '#16a34a' },
};

export interface EventCardProps {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  description?: string;
  location: string;
  weekday: string;
  time: string;
  image: string;
  typeId?: string;
  eventTypes?: Record<string, EventType>;
  onClick?: () => void;
  className?: string;
}

export function EventCard({
  day,
  month,
  year,
  title,
  location,
  weekday,
  time,
  image,
  typeId,
  eventTypes = EVENT_TYPES,
  onClick,
  className,
}: EventCardProps) {
  const eventType = typeId ? eventTypes[typeId] : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card relative rounded-2xl shadow-sm shrink-0 w-full cursor-pointer hover:shadow-md transition-shadow group border border-transparent hover:border-accent/30",
        className
      )}
    >
      <div className="flex flex-row items-center size-full">
        <div className="flex gap-4 items-center p-4 relative w-full">
          {/* Date */}
          <div className="flex flex-col gap-px items-start justify-center relative shrink-0 w-[60px]">
            <p className="font-serif text-muted-foreground text-2xl leading-none">{day}</p>
            <div className="flex gap-1 items-start text-sm leading-none">
              <p className="text-muted-foreground font-medium uppercase">{month}</p>
              <p className="text-muted-foreground/60">{year}</p>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex gap-4 grow items-center relative shrink-0">
            {/* Image */}
            <div className="relative shrink-0 size-16">
              {/* Blur Effect */}
              <div className="absolute blur-[3px] opacity-80 left-1.5 top-[18px] w-[50px] h-[50px]">
                <img src={image} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
              {/* Main Image */}
              <div className="absolute inset-0 rounded-md overflow-hidden border border-black/5">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Text Info */}
            <div className="flex flex-col gap-1.5 grow justify-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-sm font-medium leading-tight">{title}</p>
                  {eventType && (
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${eventType.color}15`,
                        color: eventType.color,
                      }}
                    >
                      {eventType.name}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-xs font-light">{location}</p>
              </div>
              <div className="flex gap-4 text-muted-foreground/80 text-xs leading-none">
                <p>{weekday}</p>
                <p>{time}</p>
              </div>
            </div>
          </div>

          {/* Chevron */}
          <div className="shrink-0 size-8 text-foreground group-hover:text-accent transition-colors flex items-center justify-center">
            <svg className="size-full" viewBox="0 0 32 32">
              <path d={iconPaths.arrowRight} fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Events list with "view more" card
interface EventsListProps {
  events: EventCardProps[];
  maxVisible?: number;
  remainingCount?: number;
  onEventClick?: (event: EventCardProps) => void;
  onViewMoreClick?: () => void;
  className?: string;
}

export function EventsList({
  events,
  maxVisible = 5,
  remainingCount,
  onEventClick,
  onViewMoreClick,
  className,
}: EventsListProps) {
  const visibleEvents = events.slice(0, maxVisible);
  const remaining = remainingCount ?? Math.max(0, events.length - maxVisible);

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {visibleEvents.map((event) => (
        <EventCard key={event.id} {...event} onClick={() => onEventClick?.(event)} />
      ))}

      {remaining > 0 && (
        <div className="relative group cursor-pointer" onClick={onViewMoreClick}>
          {/* Stack effects */}
          <div className="absolute top-2 left-2 right-2 bottom-0 bg-card/50 border border-border rounded-2xl z-0" />
          <div className="absolute top-1 left-1 right-1 bottom-0 bg-card/80 border border-border rounded-2xl z-10" />

          {/* Main Button Card */}
          <div className="relative z-20 bg-card rounded-2xl border border-border p-4 flex items-center justify-center gap-2 hover:border-accent/30 hover:shadow-md transition-all h-[60px]">
            <span className="text-muted-foreground font-medium text-sm group-hover:text-accent">
              View more upcoming events
            </span>
            <div className="bg-muted text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-accent/10 group-hover:text-accent transition-colors">
              +{remaining}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
