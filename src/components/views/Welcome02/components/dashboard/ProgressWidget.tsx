import React from 'react';
import { Icon } from '../Icon';
import { ProgressCircle } from './icons';
import svgPaths from '../../imports/svg-191opiemcf';

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
                Your profile is 23% complete — let's get you to 100% and unlock curated deal flow.
            </div>
            <div className="text-xs text-[#29272a] font-light leading-4">
                The more you share, the more tailored your Goodfin experience becomes.
            </div>
        </div>
      </div>

      {/* Action Arrow */}
      <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-50 transition-colors">
          <Icon path={svgPaths.p1adc0900} size={32} fillColor="#373338" />
      </button>
    </div>
  );
}
