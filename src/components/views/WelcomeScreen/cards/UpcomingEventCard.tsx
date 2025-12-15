import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors } from '../../Onboarding/designTokens';

type Event = {
  id: string;
  title: string;
  dateTime: string;
  location?: string;
  imageUrl?: string;
};

type UpcomingEventCardProps = {
  event: Event;
  className?: string;
};

/**
 * UpcomingEventCard
 *
 * Card showing an upcoming event with image and details.
 * Matches Figma design with Tomorrow badge.
 */
export function UpcomingEventCard({
  event,
  className,
}: UpcomingEventCardProps) {
  // Format time
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Check if event is tomorrow
  const isTomorrow = (dateString: string): boolean => {
    const eventDate = new Date(dateString);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return eventDate.toDateString() === tomorrow.toDateString();
  };

  return (
    <div
      className={cn('rounded-[20px] p-5 flex flex-col gap-4', className)}
      style={{
        backgroundColor: colors.white,
        border: '1px solid #E5E7EB',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" style={{ color: colors.grey[600] }} />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: colors.grey[950],
          }}
        >
          Upcoming Events
        </span>
      </div>

      {/* Event Content */}
      <div className="flex flex-col gap-3">
        {/* Event Image */}
        <div
          className="relative h-24 rounded-[10px] overflow-hidden"
          style={{
            backgroundColor: '#F3F4F6',
            backgroundImage: event.imageUrl ? `url(${event.imageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Tomorrow Badge */}
          {isTomorrow(event.dateTime) && (
            <div
              className="absolute top-2 left-2 px-2 py-1 rounded"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '10px',
                  lineHeight: '15px',
                  letterSpacing: '0.1172px',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                }}
              >
                Tomorrow
              </span>
            </div>
          )}
        </div>

        {/* Event Title */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.1504px',
            color: colors.grey[950],
          }}
        >
          {event.title}
        </span>

        {/* Event Time & Location */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            color: colors.grey[500],
          }}
        >
          {formatTime(event.dateTime)}{event.location ? ` • ${event.location}` : ''}
        </span>
      </div>
    </div>
  );
}

export default UpcomingEventCard;
