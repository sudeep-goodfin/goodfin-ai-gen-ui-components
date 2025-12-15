import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';
import { EventCardData } from '../mockData';

type EventsSectionProps = {
  events: EventCardData[];
  onViewAllEvents?: () => void;
  onEventClick?: (eventId: string) => void;
  className?: string;
};

// Generate a consistent color from a string
function stringToColor(str: string): string {
  const eventColors = [
    ['#6366F1', '#818CF8'], // Indigo
    ['#8B5CF6', '#A78BFA'], // Violet
    ['#EC4899', '#F472B6'], // Pink
    ['#F59E0B', '#FBBF24'], // Amber
    ['#10B981', '#34D399'], // Emerald
    ['#3B82F6', '#60A5FA'], // Blue
    ['#14B8A6', '#2DD4BF'], // Teal
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return eventColors[Math.abs(hash) % eventColors.length].join(', ');
}

// Individual Event Card Component
function EventCard({ event, onClick }: { event: EventCardData; onClick?: () => void }) {
  return (
    <div
      className="flex items-center p-[18px] rounded-xl cursor-pointer transition-colors hover:bg-white/30"
      onClick={onClick}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.73)',
      }}
    >
      {/* Date Section */}
      <div className="flex flex-col gap-px items-start justify-center mr-6">
        <span
          style={{
            fontFamily: '"Test Signifier", serif',
            fontSize: '36px',
            lineHeight: 'normal',
            color: colors.grey[800],
            width: '51px',
          }}
        >
          {String(event.day).padStart(2, '0')}
        </span>
        <div className="flex gap-1 items-start">
          <span
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: 'normal',
              color: colors.grey[800],
              textTransform: 'uppercase',
            }}
          >
            {event.month}
          </span>
          <span
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: 'normal',
              color: colors.grey[400],
              width: '37px',
            }}
          >
            {event.year}
          </span>
        </div>
      </div>

      {/* Event Image */}
      <div className="relative w-[100px] h-[100px] mr-6">
        {/* Blur shadow */}
        <div
          className="absolute left-[10.33px] top-[28px] w-[80px] h-[77px] rounded-[10px] opacity-80"
          style={{
            backgroundColor: '#C8C8C8',
            filter: 'blur(4.556px)',
          }}
        />
        {/* Image container */}
        <div
          className="absolute left-[0.33px] top-0 w-[100px] h-[100px] rounded-[10px] overflow-hidden"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${stringToColor(event.title)})`,
              }}
            >
              <Calendar
                className="w-8 h-8"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Event Details */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
              color: colors.grey[950],
              maxWidth: '314px',
            }}
          >
            {event.title}
          </h3>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '20px',
              color: colors.grey[800],
              maxWidth: '314px',
            }}
          >
            {event.location}
          </span>
        </div>
        <div className="flex gap-4">
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',
              color: colors.grey[600],
            }}
          >
            {event.dayOfWeek}
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',
              color: colors.grey[600],
            }}
          >
            {event.timeRange}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * EventsSection
 *
 * Section showing upcoming events with glass-morphism cards.
 * Matches Figma design with date display, event image, and details.
 */
export function EventsSection({
  events,
  onViewAllEvents,
  onEventClick,
  className,
}: EventsSectionProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* Section Header */}
      <h2
        style={{
          fontFamily: '"Test Signifier", serif',
          fontSize: '20px',
          lineHeight: '30px',
          color: colors.grey[950],
        }}
      >
        Events
      </h2>

      {/* Events List */}
      <div className="flex flex-col gap-[9px]">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventClick?.(event.id)}
          />
        ))}
      </div>

      {/* View All Link */}
      <button
        onClick={onViewAllEvents}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '30px',
            color: colors.grey[950],
          }}
        >
          View all Events
        </span>
        <ArrowRight className="w-6 h-6" style={{ color: colors.grey[950] }} />
      </button>
    </div>
  );
}

export default EventsSection;
