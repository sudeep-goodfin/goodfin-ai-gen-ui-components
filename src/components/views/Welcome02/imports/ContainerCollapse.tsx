import svgPaths from "./svg-y0mrai13ae";
import clsx from "clsx";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap", additionalClassNames)}>
      <p className="leading-[24px]">{children}</p>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <Wrapper>
      <g clipPath="url(#clip0_2004_882)" id="keyboard_arrow_down">
        <g id="Vector"></g>
        <path d={svgPaths.pdde3a00} fill="var(--fill-0, #373338)" id="Vector_2" />
      </g>
      <defs>
        <clipPath id="clip0_2004_882">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </Wrapper>
  );
}

function MdiTick() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="mdi:tick">
          <path d={svgPaths.pb56a500} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function ContainerCollapse() {
  return (
    <div className="bg-white relative rounded-[24px] size-full" data-name="Container Collapse">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[24px] pt-[58px] px-[24px] relative size-full">
          <div className="content-stretch flex gap-[71px] items-start justify-center relative shrink-0">
            <div className="absolute h-0 left-[40px] top-[12px] w-[324px]">
              <div className="absolute inset-[-0.76px_-0.23%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 2">
                  <path d="M0.756612 0.756612H324.757" id="Vector 108" stroke="var(--stroke-0, #69606D)" strokeLinecap="round" strokeWidth="1.51322" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
              <div className="bg-[#554f59] content-stretch flex flex-col gap-[7.5px] items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]">
                <MdiTick />
              </div>
              <div className="flex flex-col font-['Test_Signifier:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#554f59] text-[14px] text-nowrap tracking-[-0.14px]">
                <p className="leading-[20px]">Commit</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
              <div className="bg-[#554f59] content-stretch flex flex-col gap-[7.5px] items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]">
                <MdiTick />
              </div>
              <div className="flex flex-col font-['Test_Signifier:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#554f59] text-[14px] text-nowrap tracking-[-0.14px]">
                <p className="leading-[20px]">KYC</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
              <div className="bg-[#554f59] content-stretch flex flex-col gap-[7.5px] items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]">
                <MdiTick />
              </div>
              <div className="flex flex-col font-['Test_Signifier:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#554f59] text-[14px] text-nowrap tracking-[-0.14px]">
                <p className="leading-[20px]">Signing</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
              <div className="bg-[#9a90a1] content-stretch flex flex-col items-center justify-center p-[7.5px] relative rounded-[60px] shrink-0 size-[24px]">
                <div className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-end leading-[0] relative shrink-0 text-[10.5px] text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[18px]">4</p>
                </div>
              </div>
              <div className="flex flex-col font-['Test_Signifier:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#554f59] text-[14px] text-nowrap tracking-[-0.14px]">
                <p className="leading-[20px]">Wire</p>
              </div>
            </div>
          </div>
          <p className="font-['Test_Signifier:Medium',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#554f59] text-[18px] tracking-[-0.18px] w-[min-content]">We just need a few details</p>
          <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-start relative shrink-0 w-[195px] z-[2]" data-name="FieldLabels">
              <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[14px] w-[840px]">
                  <p className="leading-[16px]">Select Investor Profile</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[1]">
              <div className="bg-white h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="TextField">
                <div aria-hidden="true" className="absolute border border-[#9b929e] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative size-full">
                    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="FieldLabels">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                        <div className="basis-0 flex flex-col font-['Söhne:Leicht',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[16px]">
                          <p className="leading-[24px]">Select</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="IconButton">
                      <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                        <KeyboardArrowDown />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-between px-0 py-px relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e6e4e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="IconButton">
                <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                  <Wrapper>
                    <g clipPath="url(#clip0_2004_891)" id="add">
                      <g id="Vector"></g>
                      <path d={svgPaths.p21cef280} fill="var(--fill-0, #373338)" id="Vector_2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2004_891">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </Wrapper>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-[195px]" data-name="FieldLabels">
                <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Typography">
                  <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
                    <p className="leading-[16px]">Add New Investor Profile</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="IconButton">
              <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                <KeyboardArrowDown />
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-[559px]">
            <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="IconButton">
              <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                <Wrapper>
                  <g clipPath="url(#clip0_2004_875)" id="check_circle">
                    <g id="Vector"></g>
                    <path d={svgPaths.p3994c500} fill="var(--fill-0, #373338)" id="Vector_2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2004_875">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </Wrapper>
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-name="Typography">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
                <p className="leading-[16px]">Verified by footprint</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] h-[132px] items-center justify-center relative shrink-0 w-full">
            <div className="bg-[#373338] h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
                  <Wrapper1 additionalClassNames="text-[#f4f3f5]">{` Make Transfer`}</Wrapper1>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[7px] items-center justify-center px-0 py-[7px] relative shrink-0">
                <div className="h-[16.114px] relative shrink-0 w-[17px]" data-name="Vector">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                    <path d={svgPaths.p1b109280} fill="var(--fill-0, #B2002A)" id="Vector" />
                  </svg>
                </div>
                <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b2002a] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[20px]">{` footprint verification failed. `}</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-start relative shrink-0">
              <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#685f6a] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <Wrapper1 additionalClassNames="text-[#48424a]">Go back to AI Experience</Wrapper1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}