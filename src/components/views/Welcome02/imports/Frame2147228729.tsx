import svgPaths from "./svg-vn726n7osx";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type TypographyTextProps = {
  text: string;
};

function TypographyText({ text }: TypographyTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
      <div className="bg-white h-[107.537px] relative rounded-[16px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[-1px_1px_8px_0px_rgba(164,140,160,0.2)]" />
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-center justify-center p-[4px] relative size-full">
            <div className="relative rounded-[4px] shrink-0 w-full" data-name="Textbox">
              <div className="size-full">
                <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">
                  <div className="content-stretch flex gap-[12px] h-[39.537px] items-center relative shrink-0 w-full">
                    <div className="basis-0 content-stretch flex gap-px grow items-center min-h-px min-w-px px-0 py-[4px] relative rounded-[4px] shrink-0" data-name="Textbox">
                      <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
                        <p className="basis-0 font-['Söhne:Leicht',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[16px]">Ask anything...</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="actions">
                      <div className="bg-white content-stretch flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0" data-name="bottom action">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="biotech">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                <g id="Group">
                                  <g id="Vector"></g>
                                </g>
                              </svg>
                              <div className="absolute contents inset-[8.33%_20.83%_12.5%_20.83%]" data-name="Group">
                                <div className="absolute inset-[8.33%_20.83%_12.5%_20.83%]" data-name="Group">
                                  <div className="absolute inset-[0_0_-0.01%_0]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
                                      <g id="Group">
                                        <path d={svgPaths.p282ff240} fill="var(--fill-0, #BEB9C0)" id="Vector" />
                                        <path d={svgPaths.pda45600} fill="var(--fill-0, #373338)" id="Vector_2" />
                                        <path d={svgPaths.p27a45c00} fill="var(--fill-0, #373338)" id="Vector_3" />
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <TypographyText text="Deep Research" />
                      </div>
                      <div className="bg-white content-stretch flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0" data-name="bottom action">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                              <Wrapper>
                                <g id="icon/replace">
                                  <path d={svgPaths.pbe91080} id="Vector" stroke="var(--stroke-0, #29272A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                  <path d={svgPaths.p3fc7e680} id="Vector_2" stroke="var(--stroke-0, #29272A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                  <path d={svgPaths.p553b480} id="Vector_3" stroke="var(--stroke-0, #29272A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                </g>
                              </Wrapper>
                            </div>
                          </div>
                        </div>
                        <TypographyText text="Deals" />
                      </div>
                      <div className="bg-white content-stretch flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0" data-name="bottom action">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                            <Wrapper>
                              <g clipPath="url(#clip0_4_697)" id="article">
                                <g id="Vector"></g>
                                <path d={svgPaths.p36490700} fill="var(--fill-0, #BEB9C0)" id="Vector_2" />
                              </g>
                              <defs>
                                <clipPath id="clip0_4_697">
                                  <rect fill="white" height="20" width="20" />
                                </clipPath>
                              </defs>
                            </Wrapper>
                          </div>
                        </div>
                        <TypographyText text="News" />
                      </div>
                      <div className="bg-white content-stretch flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0" data-name="bottom action">
                        <div className="content-stretch flex items-center relative shrink-0">
                          <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                            <Wrapper>
                              <g clipPath="url(#clip0_4_693)" id="more_vert">
                                <g id="Vector"></g>
                                <path d={svgPaths.p24b71d80} fill="var(--fill-0, #373338)" id="Vector_2" />
                              </g>
                              <defs>
                                <clipPath id="clip0_4_693">
                                  <rect fill="white" height="20" width="20" />
                                </clipPath>
                              </defs>
                            </Wrapper>
                          </div>
                        </div>
                        <TypographyText text="More" />
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="content-stretch flex flex-col items-center justify-center px-0 py-[4px] relative shrink-0 w-[36px]">
                          <div className="content-stretch flex items-center justify-center px-0 py-[12px] relative rounded-[40px] shrink-0 size-[28px]">
                            <div className="relative shrink-0 size-[18px]" data-name="settings_voice">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                                <g clipPath="url(#clip0_4_689)" id="settings_voice">
                                  <g id="Vector"></g>
                                  <path d={svgPaths.p22ac6580} fill="var(--fill-0, #48424A)" id="Vector_2" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_4_689">
                                    <rect fill="white" height="18" width="18" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[rgba(229,220,227,0.56)] content-stretch flex flex-col items-center justify-center px-0 py-[4px] relative rounded-[16px] shrink-0 w-[36px]">
                          <div className="content-stretch flex items-center justify-center px-0 py-[12px] relative rounded-[40px] shrink-0 size-[28px]">
                            <div className="content-stretch flex gap-[1.5px] items-center justify-center relative shrink-0 size-[18px]">
                              <div className="flex items-center justify-center relative shrink-0">
                                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                                  <div className="bg-[#48424a] h-[4.5px] rounded-[15px] w-[3px]" />
                                </div>
                              </div>
                              <div className="flex items-center justify-center relative shrink-0">
                                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                                  <div className="bg-[#48424a] h-[10.5px] rounded-[15px] w-[3px]" />
                                </div>
                              </div>
                              <div className="flex items-center justify-center relative shrink-0">
                                <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                                  <div className="bg-[#48424a] h-[7.5px] rounded-[15px] w-[3px]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start px-0 py-[8px] relative shrink-0 w-full">
        <div className="content-stretch flex items-center relative shrink-0 w-[754px]" data-name="Typography">
          <div className="basis-0 flex flex-col font-['Söhne:Leicht',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[12px] text-center">
            <p className="leading-[16px]">Goodfin AI Concierge does not provide tax, financial, investment, or legal advice. It can present inaccurate information. Make sure to validate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}