import React from 'react';
import { CustomIcon } from '../Icon';
import svgPaths from '../../imports/svg-191opiemcf';
import { cn } from '@/lib/utils';

export function CommunityIcon({ className, color = "#8A7F91" }: { className?: string, color?: string }) {
  return (
    <CustomIcon viewBox="0 0 24 24" className={className} width={24} height={24}>
        <path clipRule="evenodd" d={svgPaths.p2e624be0} fill={color} fillRule="evenodd" />
        <path d={svgPaths.p3355c400} fill={color} />
        <path clipRule="evenodd" d={svgPaths.p2a347900} fill={color} fillRule="evenodd" />
    </CustomIcon>
  )
}

export function ProgressCircle({ percentage = 23 }: { percentage?: number }) {
    return (
        <div className="relative w-12 h-12">
            {/* Background Track */}
            <CustomIcon viewBox="0 0 48 48" className="absolute inset-0 w-full h-full text-[#D6D2D5]/40" width={48} height={48}>
                 <path d={svgPaths.p198b5c00} fill="currentColor" />
            </CustomIcon>

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-[#48424a]">
                {percentage}%
            </div>

            {/* Active Segment */}
             <div className="absolute inset-0">
                  <div className="absolute top-[0.21%] right-[0.68%] w-[24px] h-[23px] translate-x-[0%]">
                        <svg className="block w-full h-full" fill="none" viewBox="0 0 24 23">
                             <path d={svgPaths.p1a948ef0} fill="#7F7582" />
                        </svg>
                  </div>
             </div>
        </div>
    )
}
