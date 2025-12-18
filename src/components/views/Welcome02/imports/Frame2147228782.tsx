import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import svgPaths from "./svg-gl1e8rbzgf";

function Frame2147225094Helper() {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className="flex h-[9px] items-center justify-center relative shrink-0 w-0">
      <div className="flex-none rotate-[90deg]">
        <div className="h-0 relative w-[9px]">
          <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(190, 185, 192, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 1">
              <line id="Line 2" stroke="var(--stroke-0, #BEB9C0)" x2="9" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

type TypographyText2Props = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

function TypographyText2({ text, isActive, onClick }: TypographyText2Props) {
  return (
    <div 
        onClick={onClick}
        className={`content-stretch flex items-center p-[8px] relative shrink-0 cursor-pointer rounded-md transition-colors ${isActive ? 'bg-[#e6e4e7]' : 'hover:bg-gray-50'}`}
    >
      <div className={`flex flex-col ${isActive ? "font-['Söhne:Kräftig',sans-serif] text-[#373338]" : "font-['Söhne:Leicht',sans-serif] text-[#48424a]"} justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap`}>
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

type TypographyText1Props = {
  text: string;
};

function TypographyText1({ text }: TypographyText1Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[16px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

type TypographyTextProps = {
  text: string;
};

function TypographyText({ text }: TypographyTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[12px] text-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

const CHART_DATA = [
  { name: 'JAN', value: 1780000 },
  { name: 'FEB', value: 1820000 },
  { name: 'MAR', value: 1790000 },
  { name: 'APR', value: 1890000 },
  { name: 'MAY', value: 1860000 },
  { name: 'JUN', value: 1946160 },
];

export default function Frame() {
  const [timeRange, setTimeRange] = useState('1D');

  return (
    <div className="bg-white relative rounded-[8px] size-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[18px] relative size-full">
          <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
            
            {/* Title Section */}
            <div className="content-stretch flex items-center justify-between leading-[16px] not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap w-full" data-name="Title Wrapper">
              <p className="font-['Söhne:Kräftig',sans-serif] relative shrink-0">Portfolio Summary</p>
              <p className="font-['Söhne:Leicht',sans-serif] relative shrink-0">Last Updated 24 Hr ago</p>
            </div>

            <div className="content-stretch flex flex-col h-[270px] items-start relative shrink-0 w-full">
              
              {/* Header Stats */}
              <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-[309px]">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="content-stretch flex gap-[4.295px] items-center relative shrink-0 w-[141.18px]">
                    <div className="content-stretch flex items-center pb-0 pt-[4.295px] px-0 relative shrink-0 w-[12.885px]">
                      <div className="content-stretch flex items-center justify-center relative shrink-0 w-[12.885px]" data-name="Typography">
                        <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[21.475px] text-center text-nowrap">
                          <p className="leading-[30.065px]">$</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[28px] text-nowrap">
                      <p className="leading-[36px]">1,946,160</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-end pb-0 pt-[6px] px-0 relative shrink-0" data-name="Container">
                    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                      <div className="relative shrink-0 size-[16px]" data-name="arrow_drop_up">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g clipPath="url(#clip0_9_1622)" id="arrow_drop_up">
                            <g id="Vector"></g>
                            <path d={svgPaths.p2e349100} fill="var(--fill-0, #049142)" id="Vector_2" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9_1622">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0" data-name="Typography">
                      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#049142] text-[18px] text-nowrap">
                        <p className="leading-[24px]">+8.12%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
                    <TypographyText text="Amount Invested" />
                    <TypographyText1 text="$1,800,000" />
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
                    <TypographyText text="Returns" />
                    <TypographyText1 text="$146,160" />
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-full grow">
                <div className="h-[140px] relative shrink-0 w-full mt-2">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                         <defs>
                            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FBA76C" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#FFC971" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Tooltip 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">
                                                ${payload[0].value?.toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                         />
                         <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#FBA76C" 
                            strokeWidth={2}
                            fill="url(#gradientColor)" 
                         />
                         <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#7f7582', fontSize: 10, fontFamily: 'Söhne:Leicht' }}
                            dy={10}
                         />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>

                {/* Range Selector */}
                <div className="content-stretch flex gap-[4px] items-center justify-center pl-[4px] pr-[12px] py-[4px] relative rounded-[4px] shrink-0 mt-2">
                  <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  
                  <TypographyText2 
                    text="1D" 
                    isActive={timeRange === '1D'} 
                    onClick={() => setTimeRange('1D')} 
                  />
                  <Frame2147225094Helper />
                  <TypographyText2 
                    text="1W" 
                    isActive={timeRange === '1W'} 
                    onClick={() => setTimeRange('1W')} 
                  />
                  <Frame2147225094Helper />
                  <TypographyText2 
                    text="1M" 
                    isActive={timeRange === '1M'} 
                    onClick={() => setTimeRange('1M')} 
                  />
                  <Frame2147225094Helper />
                  <TypographyText2 
                    text="1Y" 
                    isActive={timeRange === '1Y'} 
                    onClick={() => setTimeRange('1Y')} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
