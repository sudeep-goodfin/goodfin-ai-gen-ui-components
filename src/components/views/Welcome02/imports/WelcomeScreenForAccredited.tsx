import svgPaths from "./svg-191opiemcf";
import clsx from "clsx";
import imgGoodfin from "@/assets/goodfin-logo.png";
import imgRectangle34464 from "@/assets/user-avatar.png";
import imgRectangle34465 from "@/assets/user-avatar-alt.png";
import imgRectangle161681 from "@/assets/goodfin-ai-avatar.png";

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#373338] text-[14px] text-center text-nowrap">
      <p className="leading-[24px]">{children}</p>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function SvgBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage>
      <g id="SVG">{children}</g>
    </BackgroundImage>
  );
}

function HistoryBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="size-[17.778px]">
      <g clipPath="url(#clip0_1_2988)" id="history">
        <g id="Vector"></g>
        <path d={svgPaths.p63f5500} fill="var(--fill-0, #69606D)" id="Vector_2" />
      </g>
      <defs>
        <clipPath id="clip0_1_2988">
          <rect fill="white" height="17.7778" width="17.7778" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <div className={clsx("content-stretch flex flex-col items-center relative w-full", additionalClassNames)}>
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a7f91] text-[10px] text-center w-full">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <BackgroundImage2>{text}</BackgroundImage2>
    </div>
  );
}

export default function WelcomeScreenForAccredited() {
  return (
    <div className="bg-[#f0eef0] content-start flex flex-wrap gap-0 items-start relative size-full" data-name="Welcome screen for Accredited">
      <div className="bg-[#edebee] content-stretch flex flex-col items-start px-[16px] py-[12px] relative shadow-[0px_4px_16px_0px_rgba(154,144,161,0.1)] shrink-0 w-[1440px]" data-name="Header">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
            <div className="bg-[#edebee] content-stretch flex items-center justify-center p-[8px] relative shrink-0" data-name="Button">
              <SvgBackgroundImage>
                <path d={svgPaths.p1d821780} fill="var(--fill-0, #373338)" id="Vector" />
              </SvgBackgroundImage>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="h-[24px] relative shrink-0 w-[103.5px]" data-name="goodfin">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGoodfin} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
              <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[64px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
                <SvgBackgroundImage>
                  <path d={svgPaths.p1bc18500} fill="var(--fill-0, #48424A)" id="Vector" />
                </SvgBackgroundImage>
                <BackgroundImageAndText text="Gift Card" />
              </div>
              <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[64px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
                <SvgBackgroundImage>
                  <path d={svgPaths.p36a8ec00} fill="var(--fill-0, #48424A)" id="Vector" />
                </SvgBackgroundImage>
                <BackgroundImageAndText text="Referrals" />
              </div>
            </div>
            <div className="content-stretch flex items-center justify-center min-w-[64px] px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
              <BackgroundImage2>Schedule a call</BackgroundImage2>
            </div>
            <div className="relative rounded-[100px] shrink-0 size-[32px]">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[100px]">
                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[100px] size-full" src={imgRectangle34464} />
                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[100px] size-full" src={imgRectangle34465} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#edebee] content-stretch flex flex-col h-[917px] items-start justify-between overflow-auto px-[4px] py-[16px] relative shrink-0 w-[72px]" data-name="AppSidebar_staging">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute left-0 pointer-events-none rounded-[18.479px] size-[24px] top-0">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[18.479px] size-full" src={imgRectangle161681} />
                <div aria-hidden="true" className="absolute border-[#f8f8f8] border-[0.308px] border-solid inset-0 rounded-[18.479px] shadow-[0px_2.526px_2.526px_0px_rgba(190,185,192,0.33)]" />
              </div>
              <div className="absolute h-[9.712px] left-[7.89px] top-[7.14px] w-[8.126px]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 10">
                  <path clipRule="evenodd" d={svgPaths.p1b948400} fill="url(#paint0_linear_1_2978)" fillRule="evenodd" id="Vector" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2978" x1="4.06314" x2="4.05088" y1="-3.05806e-10" y2="18.5143">
                      <stop stopColor="#746876" />
                      <stop offset="1" stopColor="#D8C2DC" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[10px] text-center w-full">
                <p className="leading-[16px]">Goodfin AI</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p3fc6c580} fill="var(--fill-0, #7F7582)" id="Vector" />
            </SvgBackgroundImage>
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[10px] text-center w-full">
                <p className="leading-[16px]">Deals</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p1b20f380} fill="var(--fill-0, #8A7F91)" id="Vector" />
            </SvgBackgroundImage>
            <BackgroundImageAndText1 text="Dashboard" additionalClassNames="shrink-0" />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p29b8e6f1} fill="var(--fill-0, #8A7F91)" id="Vector" />
            </SvgBackgroundImage>
            <BackgroundImageAndText1 text="Wishlist" additionalClassNames="shrink-0" />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p131a1900} fill="var(--fill-0, #8A7F91)" id="Vector" />
            </SvgBackgroundImage>
            <div className="relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-col items-center size-full">
                <BackgroundImageAndText1 text="Memberships" additionalClassNames="pl-[1.06px] pr-0 py-0" />
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path clipRule="evenodd" d={svgPaths.p2e624be0} fill="var(--fill-0, #8A7F91)" fillRule="evenodd" id="Vector" />
              <path d={svgPaths.p3355c400} fill="var(--fill-0, #8A7F91)" id="Vector_2" />
              <path clipRule="evenodd" d={svgPaths.p2a347900} fill="var(--fill-0, #8A7F91)" fillRule="evenodd" id="Vector_3" />
            </SvgBackgroundImage>
            <BackgroundImageAndText1 text="Community" additionalClassNames="shrink-0" />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p3ace5780} fill="var(--fill-0, #8A7F91)" id="Vector" />
            </SvgBackgroundImage>
            <BackgroundImageAndText1 text="Events" additionalClassNames="shrink-0" />
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
            <SvgBackgroundImage>
              <path d={svgPaths.p36a8ec00} fill="var(--fill-0, #8A7F91)" id="Vector" />
            </SvgBackgroundImage>
            <BackgroundImageAndText1 text="Referrals" additionalClassNames="shrink-0" />
          </div>
        </div>
        <div className="basis-0 grow min-h-[64px] min-w-px relative shrink-0 w-full" data-name="Margin">
          <div className="flex flex-col justify-end min-h-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-0 pt-[675px] px-0 relative size-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="Button">
                  <SvgBackgroundImage>
                    <path d={svgPaths.p1a65d500} fill="var(--fill-0, #8A7F91)" id="Vector" />
                  </SvgBackgroundImage>
                  <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
                    <div className="flex flex-col font-['Test_Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a7f91] text-[10px] text-center w-full">
                      <p className="leading-[16px]">Help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r content-stretch flex flex-col from-[#f7f7f8] gap-[4px] h-[736px] items-center pb-[12px] pt-[24px] px-0 relative shrink-0 to-[#f7f7f8] w-[1368px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1368 736\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(237.97 110.55 -116.91 156.96 522.02 -420.52)\\\'><stop stop-color=\\\'rgba(233,230,234,0)\\\' offset=\\\'0.28365\\\'/><stop stop-color=\\\'rgba(233,230,234,0)\\\' offset=\\\'0.41346\\\'/><stop stop-color=\\\'rgba(255,255,255,0.3)\\\' offset=\\\'0.4376\\\'/><stop stop-color=\\\'rgba(255,240,216,1)\\\' offset=\\\'0.59135\\\'/><stop stop-color=\\\'rgba(255,195,145,1)\\\' offset=\\\'0.64663\\\'/><stop stop-color=\\\'rgba(255,172,109,1)\\\' offset=\\\'0.67428\\\'/><stop stop-color=\\\'rgba(255,149,74,1)\\\' offset=\\\'0.70192\\\'/><stop stop-color=\\\'rgba(255,176,119,1)\\\' offset=\\\'0.73918\\\'/><stop stop-color=\\\'rgba(255,202,164,1)\\\' offset=\\\'0.77644\\\'/><stop stop-color=\\\'rgba(255,229,210,1)\\\' offset=\\\'0.8137\\\'/><stop stop-color=\\\'rgba(255,255,255,1)\\\' offset=\\\'0.85096\\\'/><stop stop-color=\\\'rgba(233,230,234,1)\\\' offset=\\\'0.98558\\\'/></radialGradient></defs></svg>')" }}>
        <div className="opacity-0 relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[24px] py-0 relative w-full">
              <div className="content-stretch flex h-[24px] items-center p-[2.667px] relative rounded-[4px] shrink-0">
                <HistoryBackgroundImage />
              </div>
              <div className="content-stretch flex items-center relative shrink-0">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                  <div className="content-stretch flex items-center p-[2.667px] relative rounded-[4px] shrink-0 size-[24px]">
                    <HistoryBackgroundImage />
                  </div>
                  <div className="bg-[#dfdce1] content-stretch flex items-center p-[2.667px] relative rounded-[4px] shrink-0 size-[24px]">
                    <BackgroundImage1 additionalClassNames="size-[17.778px]">
                      <g clipPath="url(#clip0_1_2907)" id="add">
                        <g id="Vector"></g>
                        <path d={svgPaths.pe17e0a0} fill="var(--fill-0, #69606D)" id="Vector_2" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_2907">
                          <rect fill="white" height="17.7778" width="17.7778" />
                        </clipPath>
                      </defs>
                    </BackgroundImage1>
                  </div>
                  <div className="flex h-[18px] items-center justify-center relative shrink-0 w-[19px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                    <div className="flex-none rotate-[90deg]">
                      <div className="h-[19px] relative w-[18px]" data-name="more_horiz">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
                          <g clipPath="url(#clip0_1_2919)" id="more_horiz">
                            <g id="Vector"></g>
                            <path d={svgPaths.p3f6d0000} fill="var(--fill-0, #373338)" id="Vector_2" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_2919">
                              <rect fill="white" height="19" width="18" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] h-[536px] items-start relative shrink-0">
          <div className="content-stretch flex flex-col h-[648px] items-center justify-center relative shrink-0 w-[768px]">
            <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center min-h-px min-w-px pb-[4px] pt-0 px-0 relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <div className="relative shrink-0 size-[48px]" data-name="Container">
                  <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[1.67772e+07px] size-[48px] top-0" data-name="Container">
                    <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
                      <div className="h-[46px] opacity-90 relative shrink-0 w-full" data-name="Image (Goodfin AI)">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle161681} />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 text-[#48424a] w-full">
                  <p className="font-['Test_Signifier:Not_Licensed_for_Desktop_Use',sans-serif] leading-[33.6px] relative shrink-0 text-[28px] tracking-[-0.7px] w-full">Good afternoon, Alex</p>
                  <p className="font-['Söhne:Buch',sans-serif] leading-[normal] relative shrink-0 text-[20px] w-full">Your portfolio increased by $154k (+12.4%) this month, primarily driven by secondary market activity in SpaceX. You have 3 priority allocations expiring soon.</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] h-[196px] items-center relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px relative shrink-0">
                  <div className="bg-white relative rounded-[16px] shrink-0 w-full">
                    <div aria-hidden="true" className="absolute border border-[#f6f6f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(177,170,170,0.1)]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[7.325px] items-center p-[16px] relative w-full">
                        <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0">
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                              <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[48px]" data-name="ProgressCircle">
                                <div className="absolute inset-[0.01%_0_-0.01%_0]" data-name="Progress">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                                    <path d={svgPaths.p198b5c00} fill="var(--fill-0, #D6D2D5)" fillOpacity="0.4" id="Progress" />
                                  </svg>
                                </div>
                                <div className="absolute flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] left-[calc(50%+0.73px)] not-italic text-[#48424a] text-[12px] text-center text-nowrap top-[calc(50%+0.18px)] translate-x-[-50%] translate-y-[-50%]">
                                  <p className="leading-[16px]">23%</p>
                                </div>
                                <div className="absolute inset-[0.01%_0_-0.01%_0]" data-name="Progress">
                                  <div className="absolute bottom-[53.41%] left-1/2 right-[0.68%] top-[0.21%]" style={{ "--fill-0": "rgba(127, 117, 130, 1)" } as React.CSSProperties}>
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23">
                                      <path d={svgPaths.p1a948ef0} fill="var(--fill-0, #7F7582)" id="Progress" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Typography">
                                <div className="basis-0 flex flex-col font-['Söhne:Kräftig',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#48424a] text-[14px]">
                                  <p className="leading-[16px]">Your profile is 23% complete — let’s get you to 100% and unlock curated deal flow.</p>
                                </div>
                              </div>
                              <p className="font-['Söhne:Leicht',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#29272a] text-[12px] w-full">The more you share, the more tailored your Goodfin experience becomes.</p>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                          <div className="relative shrink-0 size-[32px]" data-name="navigate_next">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g clipPath="url(#clip0_1_2926)" id="navigate_next">
                                <g id="Vector"></g>
                                <path d={svgPaths.p1adc0900} fill="var(--fill-0, #373338)" id="Vector_2" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_2926">
                                  <rect fill="white" height="32" width="32" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0.5px_0.5px_1px_0px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[768px]">
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
                            <p className="basis-0 font-['Söhne:Leicht',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[16px]">{`Start typing or hit V on your keyboard to speak... `}</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
                          <div className="bg-white content-stretch flex gap-[2px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[36px] shrink-0">
                            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                              <BackgroundImage>
                                <g id="tdesign:chart-ring">
                                  <path d={svgPaths.p1b13d600} fill="var(--fill-0, #554D57)" id="Vector" />
                                </g>
                              </BackgroundImage>
                            </div>
                            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
                              <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
                                <p className="leading-[20px]">Deep Research Analyst</p>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center relative shrink-0">
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                              <div className="content-stretch flex flex-col items-center justify-center px-0 py-[4px] relative shrink-0 w-[36px]">
                                <div className="content-stretch flex items-center justify-center px-0 py-[12px] relative rounded-[40px] shrink-0 size-[28px]">
                                  <BackgroundImage1 additionalClassNames="size-[18px]">
                                    <g clipPath="url(#clip0_1_2861)" id="settings_voice">
                                      <g id="Vector"></g>
                                      <path d={svgPaths.p22ac6580} fill="var(--fill-0, #48424A)" id="Vector_2" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1_2861">
                                        <rect fill="white" height="18" width="18" />
                                      </clipPath>
                                    </defs>
                                  </BackgroundImage1>
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
          </div>
          <div className="content-stretch flex flex-col items-start px-0 py-[8px] relative shrink-0 w-full">
            <div className="content-stretch flex items-center relative shrink-0 w-[754px]" data-name="Typography">
              <div className="basis-0 flex flex-col font-['Söhne:Leicht',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#7f7582] text-[12px] text-center">
                <p className="leading-[16px]">Goodfin AI Concierge does not provide tax, financial, investment, or legal advice. It can present inaccurate information. Make sure to validate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}