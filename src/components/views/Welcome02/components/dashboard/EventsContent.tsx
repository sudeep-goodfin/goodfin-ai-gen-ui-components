import React from 'react';
import svgPathsEvents from '../../imports/svg-tyig23frby';
import imgFrame2147226923 from "../../assets/1cb12a14575cb7f38920f88624784aab0bc1576e.png";
import imgImage48 from "../../assets/3d7e9f4eb85c2e97a2dafb31d4e86737fa2a82e6.png";
import imgImage50 from "../../assets/2d81954c4781b7a7f2986e16cf0f1118fc56fe44.png";

export interface EventCardProps {
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  weekday: string;
  time: string;
  image: string;
  onClick?: () => void;
}

export function EventCard({ day, month, year, title, location, weekday, time, image, onClick }: EventCardProps) {
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
                     <img src={image} className="w-full h-full object-cover rounded-[6px]" />
                  </div>
                  {/* Main Image */}
                  <div className="absolute inset-0 rounded-[6.6px] overflow-hidden border border-black/5">
                     <img src={image} className="w-full h-full object-cover" />
                  </div>
               </div>

               {/* Text Info */}
               <div className="flex flex-col gap-[6px] grow justify-center">
                  <div className="flex flex-col">
                     <p className="text-[#29272a] text-[14px] font-medium leading-tight">{title}</p>
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

export const EVENTS_DATA: EventCardProps[] = [
    {
        day: "07",
        month: "SEP",
        year: "2025",
        title: "Pre-All-In Summit Brunch",
        location: "San Rafael, California",
        weekday: "Saturday",
        time: "2:00 - 6:00 PM PDT",
        image: imgFrame2147226923
    },
    {
        day: "15",
        month: "NOV",
        year: "2025",
        title: "Annual Member Summit 2025",
        location: "San Francisco, CA",
        weekday: "Monday",
        time: "9:00 AM - 5:00 PM PST",
        image: imgImage48
    },
    {
        day: "05",
        month: "DEC",
        year: "2025",
        title: "Q4 Investor Roundtable",
        location: "New York, NY",
        weekday: "Friday",
        time: "7:00 - 10:00 PM EST",
        image: imgImage50
    }
];

export function EventsContent() {
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-full">
                <div className="text-sm font-medium text-[#7f7582] uppercase tracking-wider px-1">
                    Events
                </div>
                {EVENTS_DATA.map((item, index) => (
                    <EventCard
                        key={index}
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
                        View 5 more upcoming events
                    </span>
                    <div className="bg-[#f0eef0] text-[#7f7582] text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                        +5
                    </div>
                 </div>
            </div>
        </div>
    );
}
