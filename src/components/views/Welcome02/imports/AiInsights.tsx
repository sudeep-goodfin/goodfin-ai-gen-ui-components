import svgPaths from "./svg-5lw0ed9r1m";
import clsx from "clsx";
import imgAvatar from "figma:asset/10df166f7198e8da05436d3281063f16e1f07bc1.png";
import imgAvatar1 from "figma:asset/1830935ea2c094f22dc1588316bf9f66314f08e4.png";
import imgAvatar2 from "figma:asset/b7750590925b5ef18bc762d4295c388d5e60d5ab.png";
import imgLogo from "figma:asset/89ff9bd9a3ef0fddbaa7d7445894f1e0838eb847.png";
import imgFrame2147227118 from "figma:asset/09a2e0a0a7fcf07ef6185e0499b732f2ad2f46bf.png";
import imgImage from "figma:asset/0f341f9d92c1bb1dc422aefe1dfaf4bd1750bfe5.png";
import imgLogo1 from "figma:asset/8c08bf17886d2e5eded3ea02d23762fafe2f06d9.png";
import imgLogo2 from "figma:asset/021465063bfbaa97baac60fd1ad1fdf8491924d4.png";
import imgFrame2147227120 from "figma:asset/fe2e41e4dcf3f8fead730dc807f37215dc7f41ff.png";
import imgImage45 from "figma:asset/5ee5084dbd236e72ef086f5c1942df262c85e222.png";
import imgImage2 from "figma:asset/9d97ecdfbe1e339c6a3678b65e2303240e4b4253.png";
import imgImage3 from "figma:asset/d9d8c1dcb9a6b4962ed33a9f691a396eae17fe68.png";
import imgImage4 from "figma:asset/bb659a0a4ede0ada209cf49f1560f4ddc5536152.png";
import { imgImage44 } from "./svg-0m08z";
type BackgroundImage8Props = {
  text: string;
};

function BackgroundImage8({ children, text }: React.PropsWithChildren<BackgroundImage8Props>) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <BackgroundImage7>
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar1} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar2} />
      </BackgroundImage7>
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0">
          <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#29272a] text-[12px] text-center text-nowrap">{text}</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundImage7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="pointer-events-none relative rounded-[2.692px] shrink-0 size-[18px]">
      <div aria-hidden="true" className="absolute inset-0 rounded-[2.692px]">
        {children}
      </div>
      <div className="absolute inset-0 shadow-[inset_0px_-0.772px_2.431px_0px_rgba(255,255,255,0.48)]" />
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[16.438px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.248px] mask-size-[16px_16px] ml-0 mt-[-0.25px] relative w-[16px]" data-name="image 44" style={{ maskImage: `url('${imgImage44}')` }}>
        {children}
      </div>
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="-webkit-box flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#29272a] text-[14px] w-full">
        <p className="leading-[16px]">{children}</p>
      </div>
    </div>
  );
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage6>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </BackgroundImage6>
  );
}

function NewsLogoBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage4>
      <BackgroundImage2 />
      <BackgroundImage3 />
      <div className="absolute inset-0 overflow-hidden">{children}</div>
    </BackgroundImage4>
  );
}
type BackgroundImageAndText3Props = {
  text: string;
};

function BackgroundImageAndText3({ text }: BackgroundImageAndText3Props) {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <BackgroundImage4>
        <BackgroundImage2 />
        <BackgroundImage3 />
      </BackgroundImage4>
      <div className="basis-0 flex flex-col font-['Söhne:Buch',sans-serif] grow justify-center min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
        <p className="leading-[16px] overflow-ellipsis overflow-hidden">{text}</p>
      </div>
    </div>
  );
}

function BackgroundImage3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img alt="" className="absolute h-[202.24%] left-[-207.37%] max-w-none top-0 w-[515.67%]" src={imgImage45} />
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return <BackgroundImage5>{text}</BackgroundImage5>;
}

function ImageBackgroundImage() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-[106px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage2} />
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ additionalClassNames = "" }: BackgroundImage2Props) {
  return (
    <div className={clsx("absolute inset-0 overflow-hidden", additionalClassNames)}>
      <img alt="" className="absolute h-[200.44%] left-[-410.96%] max-w-none top-[-100.44%] w-[510.96%]" src={imgImage45} />
    </div>
  );
}

function BackgroundImage1() {
  return <BackgroundImage5>{`SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight`}</BackgroundImage5>;
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ additionalClassNames = "" }: BackgroundImageProps) {
  return (
    <div className={clsx("absolute inset-0 overflow-hidden", additionalClassNames)}>
      <img alt="" className="absolute h-[123.03%] left-0 max-w-none top-[-24.1%] w-full" src={imgFrame2147227120} />
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
        <div className="relative rounded-[70px] shrink-0 size-[16px]">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none rounded-[70px] size-full" src={imgLogo} />
        </div>
        <div className="basis-0 flex flex-col font-['Söhne:Buch',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#f0eef0] text-[12px] text-nowrap">
          <p className="leading-[16px] overflow-ellipsis overflow-hidden">{"Fox News"}</p>
        </div>
      </div>
      <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f0eef0] text-[12px] text-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0">
      <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#29272a] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}

export default function AiInsights() {
  return (
    <div className="bg-[#f7f7f8] relative size-full" data-name="AI Insights">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[14px] text-center text-nowrap">
                <p className="leading-[16px]">NEWS</p>
              </div>
            </div>
            <div className="bg-[#f0eef0] h-[40px] relative rounded-[8px] shrink-0 w-full">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[12px] items-center p-[4px] relative size-full">
                  <div className="bg-white h-full relative rounded-[8px] shrink-0 w-[102px]" data-name="New Resource Chips">
                    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
                      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
                        <p className="leading-[16px]">Top News</p>
                      </div>
                    </div>
                    <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
                    <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
                  </div>
                  <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="New Resource Chips">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <div className="pointer-events-none relative rounded-[2.692px] shrink-0 size-[18px]" data-name="Avatar">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar} />
                        <div className="absolute inset-0 shadow-[inset_0px_-0.772px_2.431px_0px_rgba(255,255,255,0.48)]" />
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <BackgroundImageAndText text="SpaceX" />
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="New Resource Chips">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <BackgroundImage7>
                        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar} />
                        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.692px] size-full" src={imgAvatar1} />
                      </BackgroundImage7>
                      <div className="flex flex-row items-center self-stretch">
                        <BackgroundImageAndText text="Anthropic" />
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="New Resource Chips">
                    <BackgroundImage8 text="Perplexity" />
                  </div>
                  <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="New Resource Chips">
                    <BackgroundImage8 text="OpenAI" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0 w-[539px]" data-name="Typography">
              <div className="basis-0 flex flex-col font-['Test_Signifier:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#48424a] text-[24px] uppercase">
                <p className="leading-[32px]">top private markets</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[25px] h-[584px] items-start relative rounded-[4px] shrink-0 w-full" data-name="Div">
              <div className="content-stretch flex gap-[24px] h-[519px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] h-[524px] items-start overflow-clip relative rounded-[5px] shrink-0 w-[538px]" data-name="News Card">
                  <div className="h-[216px] relative rounded-[12px] shrink-0 w-full">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
                      <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[12px] size-full" src={imgFrame2147227118} />
                      <div className="absolute bg-gradient-to-b from-[50.242%] from-[rgba(0,0,0,0)] inset-0 rounded-[12px] to-[71.739%] to-[rgba(72,66,74,0.56)]" />
                    </div>
                    <div className="flex flex-col justify-end size-full">
                      <div className="content-stretch flex flex-col gap-[12px] items-start justify-end p-[12px] relative size-full">
                        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                          <p className="-webkit-box font-['Söhne:Kräftig',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[18px] text-white w-full">{`SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight`}</p>
                          <BackgroundImageAndText1 text="12 min ago" />
                        </div>
                        <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[448px] top-[8px]" data-name="Ask AI button">
                          <div className="bg-white content-stretch flex gap-[8px] items-start max-w-[340px] px-[12px] py-[8px] relative rounded-[256px] shrink-0" data-name="Chip">
                            <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                              <div className="relative shrink-0 size-[16px]" data-name="auto_awesome">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <g clipPath="url(#clip0_4_4584)" id="auto_awesome">
                                    <g id="Vector"></g>
                                    <path d={svgPaths.p15377400} fill="var(--fill-0, #7F7582)" id="Vector_2" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4_4584">
                                      <rect fill="white" height="16" width="16" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                            <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#48424a] text-[12px] text-nowrap">Ask AI</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                    {[...Array(2).keys()].map((_, i) => (
                      <div className="content-stretch flex flex-col gap-[12px] h-[291px] items-start overflow-clip relative rounded-[5px] shrink-0 w-[257px]" data-name="News Card">
                        <div className="h-[108px] relative rounded-[8px] shrink-0 w-full" data-name="image">
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage} />
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                            <p className="-webkit-box font-['Söhne:Kräftig',sans-serif] leading-[18px] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#3e3232] text-[14px] w-[min-content]">{`SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight`}</p>
                            <p className="-webkit-box font-['Söhne:Leicht',sans-serif] h-[79px] leading-[16px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#48424a] text-[12px] w-full">{`SpaceX's Starship has successfully completed its inaugural orbital flight, marking a significant milestone in the quest for interplanetary exploratio`}</p>
                            <div className="absolute content-stretch flex gap-[8px] items-center justify-center left-[139px] max-w-[340px] px-[12px] py-[8px] rounded-[256px] top-[139px] w-[32px]" data-name="Ask AI button">
                              <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                              <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                                <div className="relative shrink-0 size-[16px]" data-name="auto_awesome">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <g clipPath="url(#clip0_4_3860)" id="auto_awesome">
                                      <g id="Vector"></g>
                                      <path d={svgPaths.p15377400} fill="var(--fill-0, #373338)" id="Vector_2" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_4_3860">
                                        <rect fill="white" height="16" width="16" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[256px] shrink-0" data-name="New Resource Chips" style={{ backgroundImage: "linear-gradient(90deg, rgb(240, 238, 240) 0%, rgb(240, 238, 240) 100%), linear-gradient(90deg, rgb(247, 247, 248) 0%, rgb(247, 247, 248) 100%)" }}>
                              <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0">
                                <div className="mr-[-4px] pointer-events-none relative shrink-0 size-[16px]" data-name="Logo">
                                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain size-full" src={imgLogo1} />
                                  <div aria-hidden="true" className="absolute border border-solid border-white inset-0" />
                                </div>
                                <div className="mr-[-4px] pointer-events-none relative shrink-0 size-[16px]" data-name="Logo">
                                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain size-full" src={imgLogo2} />
                                  <div aria-hidden="true" className="absolute border border-solid border-white inset-0" />
                                </div>
                                <div className="mr-[-4px] pointer-events-none relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo">
                                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain rounded-[100px] size-full" src={imgLogo} />
                                  <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[100px]" />
                                </div>
                              </div>
                              <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
                                <p className="leading-[16px]">Sources (3)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="basis-0 grow h-[207px] min-h-px min-w-px relative rounded-[12px] shrink-0">
                      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
                        <BackgroundImage additionalClassNames="rounded-[12px]" />
                        <div className="absolute bg-gradient-to-b from-[50.242%] from-[rgba(0,0,0,0)] inset-0 rounded-[12px] to-[71.739%] to-[rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="flex flex-col justify-end size-full">
                        <div className="content-stretch flex flex-col items-start justify-end p-[12px] relative size-full">
                          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                            <p className="-webkit-box font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-white w-full">{`SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight`}</p>
                            <BackgroundImageAndText1 text="12 min ago" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[519px] items-start pl-[8px] pr-0 py-0 relative shrink-0 w-[320px]">
                  <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                          <BackgroundImage1 />
                          <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                            <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                              <BackgroundImage6>
                                <BackgroundImage2 additionalClassNames="pointer-events-none" />
                              </BackgroundImage6>
                              <div className="basis-0 flex flex-col font-['Söhne:Buch',sans-serif] grow justify-center min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                                <p className="leading-[16px] overflow-ellipsis overflow-hidden">Fox News</p>
                              </div>
                            </div>
                            <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                              <p className="leading-[16px]">12 min ago</p>
                            </div>
                          </div>
                        </div>
                        <ImageBackgroundImage />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                          <BackgroundImageAndText2 text="SpaceX loses the upper stage (ship) after catching its booster in the latest test" />
                          <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                            <BackgroundImageAndText3 text="BBC News" />
                            <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                              <p className="leading-[16px]">22 min ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="h-[80px] relative rounded-[8px] shrink-0 w-[106px]" data-name="image2">
                          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
                            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage2} />
                            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage3} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                          <BackgroundImageAndText2 text="SpaceX completes final test ahead of a crucial Starship launch." />
                          <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                            <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                              <NewsLogoBackgroundImage>
                                <img alt="" className="absolute h-[203.15%] left-[-207.37%] max-w-none top-[-103.15%] w-[515.67%]" src={imgImage45} />
                              </NewsLogoBackgroundImage>
                              <div className="basis-0 flex flex-col font-['Söhne:Kräftig',sans-serif] grow justify-center min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                                <p className="leading-[16px] overflow-ellipsis overflow-hidden">CBS News</p>
                              </div>
                            </div>
                            <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                              <p className="leading-[16px]">32 min ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="h-[80px] relative rounded-[8px] shrink-0 w-[106px]" data-name="image2">
                          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
                            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage2} />
                            <BackgroundImage additionalClassNames="rounded-[8px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                          <BackgroundImage1 />
                          <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                            <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                              <NewsLogoBackgroundImage>
                                <img alt="" className="absolute h-[205.94%] left-[-410.96%] max-w-none top-0 w-[510.96%]" src={imgImage45} />
                              </NewsLogoBackgroundImage>
                              <div className="basis-0 flex flex-col font-['Söhne:Buch',sans-serif] grow justify-center min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                                <p className="leading-[16px] overflow-ellipsis overflow-hidden">Euro News</p>
                              </div>
                            </div>
                            <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                              <p className="leading-[16px]">45 min ago</p>
                            </div>
                          </div>
                        </div>
                        <ImageBackgroundImage />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
                          <BackgroundImageAndText2 text="SpaceX launches 28 Starlink satellites on Falcon 9 with Starship" />
                          <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                            <BackgroundImageAndText3 text="Fox News" />
                            <div className="flex flex-col font-['Söhne:Buch',sans-serif] justify-center not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                              <p className="leading-[16px]">50 min ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="h-[80px] relative rounded-[8px] shrink-0 w-[106px]" data-name="image2">
                          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
                            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage2} />
                            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage4} />
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
  );
}