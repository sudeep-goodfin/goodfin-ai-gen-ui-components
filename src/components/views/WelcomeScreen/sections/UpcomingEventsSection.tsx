import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import { EventCard } from '../cards';
import type { Event } from '../mockData';

type UpcomingEventsSectionProps = {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onViewAllClick?: () => void;
  emphasizeCoffeeChats?: boolean;
  className?: string;
};

/**
 * UpcomingEventsSection
 *
 * Displays upcoming events and coffee chats.
 * Can emphasize coffee chats for users with bookings.
 */
export function UpcomingEventsSection({
  events,
  onEventClick,
  onViewAllClick,
  emphasizeCoffeeChats = false,
  className,
}: UpcomingEventsSectionProps) {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );

  // Optionally separate coffee chats
  const coffeeChats = sortedEvents.filter(e => e.type === 'coffee-chat');
  const otherEvents = sortedEvents.filter(e => e.type !== 'coffee-chat');

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: colors.grey[600] }} />
          <h3
            style={{
              ...typography.label.md,
              color: colors.grey[950],
              fontWeight: 600,
            }}
          >
            Upcoming Events
          </h3>
        </div>
        <button
          onClick={onViewAllClick}
          className="flex items-center gap-1 text-sm transition-colors hover:opacity-70"
          style={{
            color: colors.grey[600],
            fontFamily: typography.paragraph.sm.fontFamily,
          }}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Coffee Chats (emphasized) */}
      {emphasizeCoffeeChats && coffeeChats.length > 0 && (
        <div className="mb-4">
          <p
            className="text-xs mb-2 uppercase tracking-wide"
            style={{
              color: colors.yellow[700],
              fontWeight: 600,
            }}
          >
            Your Booked Coffee Chats
          </p>
          <div className="space-y-3">
            {coffeeChats.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onAction={() => onEventClick?.(event)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Events */}
      <div className="space-y-3">
        {(emphasizeCoffeeChats ? otherEvents : sortedEvents).slice(0, 3).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onAction={() => onEventClick?.(event)}
          />
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div
          className="text-center py-8 rounded-xl"
          style={{
            backgroundColor: 'rgba(247, 247, 248, 0.70)',
            border: '1px solid #F5F4F6',
          }}
        >
          <Calendar
            className="w-10 h-10 mx-auto mb-3"
            style={{ color: colors.grey[400] }}
          />
          <p
            className="text-sm"
            style={{ color: colors.grey[600] }}
          >
            No upcoming events
          </p>
          <button
            onClick={onViewAllClick}
            className="text-sm mt-2 underline"
            style={{ color: colors.grey[700] }}
          >
            Browse available events
          </button>
        </div>
      )}
    </div>
  );
}

export default UpcomingEventsSection;
