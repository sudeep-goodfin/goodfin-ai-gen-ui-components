import React from 'react';
import { Icon } from '../Icon';
import { svgPaths } from '../../svgPaths';

// Goodfin Logo component
function GoodfinLogo() {
  return (
    <svg width="104" height="24" viewBox="0 0 104 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.48 6.24C9.024 6.24 6.24 9.024 6.24 12.48C6.24 15.936 9.024 18.72 12.48 18.72C14.208 18.72 15.744 18.048 16.896 16.944L14.736 14.784C14.112 15.36 13.344 15.696 12.48 15.696C10.704 15.696 9.264 14.256 9.264 12.48C9.264 10.704 10.704 9.264 12.48 9.264C13.344 9.264 14.112 9.6 14.736 10.176L16.896 8.016C15.744 6.912 14.208 6.24 12.48 6.24Z" fill="#373338"/>
      <path d="M26.4 6.24C22.944 6.24 20.16 9.024 20.16 12.48C20.16 15.936 22.944 18.72 26.4 18.72C29.856 18.72 32.64 15.936 32.64 12.48C32.64 9.024 29.856 6.24 26.4 6.24ZM26.4 15.696C24.624 15.696 23.184 14.256 23.184 12.48C23.184 10.704 24.624 9.264 26.4 9.264C28.176 9.264 29.616 10.704 29.616 12.48C29.616 14.256 28.176 15.696 26.4 15.696Z" fill="#373338"/>
      <path d="M40.32 6.24C36.864 6.24 34.08 9.024 34.08 12.48C34.08 15.936 36.864 18.72 40.32 18.72C43.776 18.72 46.56 15.936 46.56 12.48C46.56 9.024 43.776 6.24 40.32 6.24ZM40.32 15.696C38.544 15.696 37.104 14.256 37.104 12.48C37.104 10.704 38.544 9.264 40.32 9.264C42.096 9.264 43.536 10.704 43.536 12.48C43.536 14.256 42.096 15.696 40.32 15.696Z" fill="#373338"/>
      <path d="M54.24 6.24C50.784 6.24 48 9.024 48 12.48V18.72H51.024V15.696H54.24C57.696 15.696 60.48 12.912 60.48 9.456C60.48 7.68 59.616 6.24 54.24 6.24ZM54.24 12.672H51.024V12.48C51.024 10.704 52.464 9.264 54.24 9.264C56.016 9.264 57.456 10.32 57.456 11.472C57.456 12.192 56.64 12.672 54.24 12.672Z" fill="#373338"/>
      <path d="M66.24 6.24H63.216V18.72H66.24V6.24Z" fill="#373338"/>
      <path d="M74.4 6.24H68.16V9.264H74.4C75.744 9.264 76.464 9.696 76.464 10.416V18.72H79.488V10.416C79.488 7.92 77.568 6.24 74.4 6.24Z" fill="#373338"/>
      <path d="M95.136 6.24C91.68 6.24 88.896 9.024 88.896 12.48C88.896 15.936 91.68 18.72 95.136 18.72C97.008 18.72 98.688 17.904 99.84 16.608L97.68 14.448C97.056 15.168 96.144 15.696 95.136 15.696C93.36 15.696 91.92 14.256 91.92 12.48C91.92 10.704 93.36 9.264 95.136 9.264C96.144 9.264 97.056 9.792 97.68 10.512L99.84 8.352C98.688 7.056 97.008 6.24 95.136 6.24Z" fill="#373338"/>
      <path d="M81.408 6.24V18.72H84.432V6.24H81.408Z" fill="#373338"/>
    </svg>
  );
}

// Avatar component
function Avatar({ src, fallback }: { src?: string; fallback: string }) {
  return (
    <div className="h-8 w-8 rounded-full overflow-hidden bg-[#dfdce1]">
      {src ? (
        <img src={src} alt="User avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-[#48424a]">
          {fallback}
        </div>
      )}
    </div>
  );
}

export function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 bg-[#edebee] px-4 shadow-sm shrink-0 z-10">
      {/* Left Side - Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        <button className="w-8 h-8 p-1 rounded hover:bg-black/5 transition-colors">
          <Icon path={svgPaths.menu} size={24} fillColor="#373338" />
        </button>

        {/* Logo */}
        <div className="h-6 w-[104px]">
          <GoodfinLogo />
        </div>
      </div>

      {/* Right Side - Actions & Avatar */}
      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.giftCard} size={18} fillColor="#48424A" />
            <span className="text-sm font-medium">Gift Card</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.referrals} size={18} fillColor="#48424A" />
            <span className="text-sm font-medium">Referrals</span>
          </button>
        </div>

        <button className="hidden md:block px-3 py-1.5 rounded text-[#373338] font-semibold hover:bg-black/5 transition-colors">
          Schedule a call
        </button>

        <Avatar fallback="AL" />
      </div>
    </header>
  );
}
