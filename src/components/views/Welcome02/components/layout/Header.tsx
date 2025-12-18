import React from 'react';
import { Icon } from '../Icon';
import svgPaths from '../../imports/svg-191opiemcf';
import goodfinLogo from '../../assets/goodfin-logo.png';

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
          <Icon path={svgPaths.p1d821780} size={24} fillColor="#373338" />
        </button>

        {/* Logo */}
        <img src={goodfinLogo} alt="Goodfin" className="h-6" />
      </div>

      {/* Right Side - Actions & Avatar */}
      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.p1bc18500} size={18} fillColor="#48424A" />
            <span className="text-sm font-medium">Gift Card</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded text-[#48424A] hover:bg-black/5 transition-colors">
            <Icon path={svgPaths.p36a8ec00} size={18} fillColor="#48424A" />
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
