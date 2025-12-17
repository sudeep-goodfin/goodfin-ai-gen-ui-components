import React from 'react';
import { Icon, CustomIcon } from '../Icon';
import { svgPaths } from '../../svgPaths';

// Progress Circle Component
export function ProgressCircle({ percentage = 23 }: { percentage?: number }) {
  return (
    <div className="relative w-12 h-12">
      {/* Background Track */}
      <CustomIcon viewBox="0 0 48 48" className="absolute inset-0 w-full h-full text-[#D6D2D5]/40" width={48} height={48}>
        <path d={svgPaths.progressCircle} fill="currentColor" />
      </CustomIcon>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-[#48424a]">
        {percentage}%
      </div>

      {/* Active Segment */}
      <div className="absolute inset-0">
        <div className="absolute top-[0.21%] right-[0.68%] w-[24px] h-[23px]">
          <svg className="block w-full h-full" fill="none" viewBox="0 0 24 23">
            <path d={svgPaths.progressActive} fill="#7F7582" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ProgressWidget() {
  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl p-4 shadow-[0px_1px_2px_0px_rgba(177,170,170,0.1)] border border-[#f6f6f6] flex items-center gap-4">
      <div className="flex-1 flex items-center gap-4">
        {/* Progress Circle */}
        <div className="shrink-0">
          <ProgressCircle percentage={23} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[#48424a] font-medium leading-4">
            Your profile is 23% complete - let's get you to 100% and unlock curated deal flow.
          </div>
          <div className="text-xs text-[#29272a] font-light leading-4">
            The more you share, the more tailored your Goodfin experience becomes.
          </div>
        </div>
      </div>

      {/* Action Arrow */}
      <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-50 transition-colors">
        <Icon path={svgPaths.arrowRight} size={32} fillColor="#373338" />
      </button>
    </div>
  );
}
