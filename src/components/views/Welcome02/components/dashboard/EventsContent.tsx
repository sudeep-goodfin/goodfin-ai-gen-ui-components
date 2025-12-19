import React from 'react';
import svgPathsEvents from '../../imports/svg-tyig23frby';
import { Greeting } from './Greeting';

// Types for consistent data structure
interface EventType {
  id: string;
  name: string;
  color: string;
}

interface EventItem {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  description: string;
  location: string;
  weekday: string;
  time: string;
  image: string;
  typeId: string;
}

interface EventsData {
  types: Record<string, EventType>;
  events: EventItem[];
}

// Events data configuration
const eventsData: EventsData = {
  types: {
    summit: {
      id: 'summit',
      name: 'Summit',
      color: '#7c3aed',
    },
    roundtable: {
      id: 'roundtable',
      name: 'Roundtable',
      color: '#0891b2',
    },
    networking: {
      id: 'networking',
      name: 'Networking',
      color: '#ca8a04',
    },
    webinar: {
      id: 'webinar',
      name: 'Webinar',
      color: '#16a34a',
    },
  },

  events: [
    {
      id: 'event-1',
      day: '07',
      month: 'SEP',
      year: '2025',
      title: 'Pre-All-In Summit Brunch',
      description: 'An exclusive brunch gathering before the main summit. Network with top investors and founders in an intimate setting.',
      location: 'San Rafael, California',
      weekday: 'Saturday',
      time: '2:00 - 6:00 PM PDT',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop', // Conference/networking
      typeId: 'networking',
    },
    {
      id: 'event-2',
      day: '15',
      month: 'NOV',
      year: '2025',
      title: 'Annual Member Summit 2025',
      description: 'Our flagship annual event bringing together hundreds of accredited investors for keynotes, panels, and deal showcases.',
      location: 'San Francisco, CA',
      weekday: 'Monday',
      time: '9:00 AM - 5:00 PM PST',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200&h=200&fit=crop', // Large conference
      typeId: 'summit',
    },
    {
      id: 'event-3',
      day: '05',
      month: 'DEC',
      year: '2025',
      title: 'Q4 Investor Roundtable',
      description: 'End-of-year portfolio review and 2026 outlook discussion with leading fund managers and family offices.',
      location: 'New York, NY',
      weekday: 'Friday',
      time: '7:00 - 10:00 PM EST',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop', // Business meeting
      typeId: 'roundtable',
    },
    {
      id: 'event-4',
      day: '12',
      month: 'JAN',
      year: '2026',
      title: 'AI Investment Outlook Webinar',
      description: 'Deep dive into the AI sector with portfolio managers specializing in late-stage AI companies.',
      location: 'Virtual Event',
      weekday: 'Tuesday',
      time: '11:00 AM - 12:30 PM PST',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&h=200&fit=crop', // Tech/AI themed
      typeId: 'webinar',
    },
    {
      id: 'event-5',
      day: '28',
      month: 'FEB',
      year: '2026',
      title: 'SpaceX & Defense Tech Deep Dive',
      description: 'Exclusive session covering the latest developments in space and defense technology investments.',
      location: 'Los Angeles, CA',
      weekday: 'Saturday',
      time: '3:00 - 7:00 PM PST',
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=200&h=200&fit=crop', // Space themed
      typeId: 'roundtable',
    },
  ],
};

// Helper to get event type
const getEventType = (typeId: string): EventType => eventsData.types[typeId];

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
  onClick?: () => void;
}

export function EventCard({ day, month, year, title, location, weekday, time, image, typeId, onClick }: EventCardProps) {
  const eventType = typeId ? getEventType(typeId) : null;

  return (
    <div onClick={onClick} className="bg-white relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(177,170,170,0.1)] shrink-0 w-full cursor-pointer hover:shadow-md transition-shadow group border border-transparent hover:border-purple-200">
      <div className="flex flex-row items-center size-full">
        <div className="flex gap-[16px] items-center p-[16px] relative w-full">
            {/* Date */}
            <div className="flex flex-col gap-px items-start justify-center relative shrink-0 w-[60px]">
              <p className="font-serif text-[#48424a] text-[24px] leading-none">{day}</p>
              <div className="flex gap-[4px] items-start text-[14px] leading-none">
                <p className="text-[#48424a] font-medium uppercase">{month}</p>
                <p className="text-[#9b929e]">{year}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex gap-[16px] grow items-center relative shrink-0">
               {/* Image */}
               <div className="relative shrink-0 size-[64px]">
                  {/* Blur Effect */}
                  <div className="absolute blur-[3px] opacity-80 left-[6px] top-[18px] w-[50px] h-[50px]">
                     <img src={image} alt="" className="w-full h-full object-cover rounded-[6px]" />
                  </div>
                  {/* Main Image */}
                  <div className="absolute inset-0 rounded-[6.6px] overflow-hidden border border-black/5">
                     <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
               </div>

               {/* Text Info */}
               <div className="flex flex-col gap-[6px] grow justify-center">
                  <div className="flex flex-col">
                     <div className="flex items-center gap-2">
                       <p className="text-[#29272a] text-[14px] font-medium leading-tight">{title}</p>
                       {eventType && (
                         <span
                           className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                           style={{
                             backgroundColor: `${eventType.color}15`,
                             color: eventType.color
                           }}
                         >
                           {eventType.name}
                         </span>
                       )}
                     </div>
                     <p className="text-[#48424a] text-[12px] font-light">{location}</p>
                  </div>
                  <div className="flex gap-[16px] text-[#685f6a] text-[12px] leading-none">
                     <p>{weekday}</p>
                     <p>{time}</p>
                  </div>
               </div>
            </div>

            {/* Chevron */}
            <div className="shrink-0 size-[32px] text-[#373338] group-hover:text-purple-600 transition-colors flex items-center justify-center">
               <svg className="size-full" viewBox="0 0 32 32">
                 <path d={svgPathsEvents.p1adc0900} fill="currentColor" />
               </svg>
            </div>
        </div>
      </div>
    </div>
  )
}

// Export events data for use in HomeContent
export const EVENTS_DATA: EventCardProps[] = eventsData.events;

export function EventsContent() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-3xl pb-20">
            <div className="flex flex-col gap-[40px] grow items-center w-full">
                {/* Greeting Section */}
                <Greeting
                    title="Events"
                    description="Connect with fellow investors and industry leaders at exclusive Goodfin events. From intimate roundtables to our annual summit, there's always an opportunity to expand your network."
                />

                {/* Events Section */}
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="text-sm font-medium text-[#7f7582] uppercase tracking-wider px-1">
                            ({EVENTS_DATA.length}) Upcoming Events
                        </div>
                        {EVENTS_DATA.map((item) => (
                            <EventCard
                                key={item.id}
                                {...item}
                            />
                        ))}
                    </div>

                    {/* Collapsed "More" Card */}
                    <div className="relative group cursor-pointer">
                         {/* Stack effects */}
                         <div className="absolute top-2 left-2 right-2 bottom-0 bg-white/50 border border-gray-200 rounded-[16px] z-0" />
                         <div className="absolute top-1 left-1 right-1 bottom-0 bg-white/80 border border-gray-200 rounded-[16px] z-10" />

                         {/* Main Button Card */}
                         <div className="relative z-20 bg-white rounded-[16px] border border-[#e3e3e3] p-4 flex items-center justify-center gap-2 hover:border-purple-200 hover:shadow-md transition-all h-[60px]">
                            <span className="text-[#48424a] font-medium text-sm group-hover:text-purple-700">
                                View more upcoming events
                            </span>
                            <div className="bg-[#f0eef0] text-[#7f7582] text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                +3
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
