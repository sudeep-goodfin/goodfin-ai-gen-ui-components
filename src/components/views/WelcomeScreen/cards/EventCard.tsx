import React from 'react';
import { Calendar, Coffee, Video, Users, BookOpen, Clock, ExternalLink } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { colors, typography } from '../../Onboarding/designTokens';
import type { Event, EventType } from '../mockData';

type EventCardProps = {
  event: Event;
  onAction?: () => void;
  className?: string;
};

const eventTypeConfig: Record<EventType, { icon: typeof Calendar; label: string; color: string }> = {
  'coffee-chat': {
    icon: Coffee,
    label: 'Coffee Chat',
    color: colors.yellow[600],
  },
  'webinar': {
    icon: Video,
    label: 'Webinar',
    color: colors.blue[600],
  },
  'networking': {
    icon: Users,
    label: 'Networking',
    color: colors.green[600],
  },
  'workshop': {
    icon: BookOpen,
    label: 'Workshop',
    color: colors.grey[700],
  },
};

/**
 * EventCard
 *
 * Displays an event or coffee chat with date, time, and action button.
 */
export function EventCard({ event, onAction, className }: EventCardProps) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;

  // Format date and time
  const eventDate = new Date(event.dateTime);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl transition-all duration-200',
        'hover:shadow-md cursor-pointer',
        className
      )}
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.grey[200]}`,
      }}
      onClick={onAction}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${config.color}15`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: config.color }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h4
          className="font-semibold truncate"
          style={{
            ...typography.label.sm,
            color: colors.grey[950],
          }}
        >
          {event.title}
        </h4>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mt-1">
          {/* Date & Time */}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" style={{ color: colors.grey[500] }} />
            <span
              className="text-xs"
              style={{ color: colors.grey[600] }}
            >
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" style={{ color: colors.grey[500] }} />
            <span
              className="text-xs"
              style={{ color: colors.grey[600] }}
            >
              {formattedTime}
            </span>
          </div>
          {/* Duration */}
          <span
            className="text-xs"
            style={{ color: colors.grey[500] }}
          >
            {event.duration}
          </span>
        </div>

        {/* Host (if present) */}
        {event.host && (
          <p
            className="text-xs mt-1"
            style={{ color: colors.grey[500] }}
          >
            with {event.host}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0">
        {event.isBooked ? (
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
            style={{
              backgroundColor: colors.green[100],
              color: colors.green[700],
            }}
          >
            Booked
          </span>
        ) : (
          <button
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
            style={{
              backgroundColor: colors.grey[900],
              color: colors.white,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
          >
            {event.type === 'webinar' ? 'Register' : 'View'}
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;
