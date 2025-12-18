import svgPaths from "./svg-ohaff09b05";
import clsx from "clsx";
import imgImage from "@/assets/deal-stripe.png";
import imgImage1 from "@/assets/avatar-spacex.png";
import imgImage2 from "@/assets/deal-figma.png";
import imgAvatar from "@/assets/avatar-openai.png";
import imgAvatar1 from "@/assets/avatar-perplexity.png";
import imgImage3 from "@/assets/deal-anduril.png";
import imgImage4 from "@/assets/deal-databricks.png";
import imgImage5 from "@/assets/deal-discord.png";
import imgAvatar2 from "@/assets/avatar-anthropic.png";
import imgBadges from "@/assets/badges-deals.png";
import imgAvatar3 from "@/assets/avatar-anthropic-alt.png";
import imgRectangle34464 from "@/assets/user-avatar.png";
import imgRectangle161681 from "@/assets/goodfin-ai-avatar.png";
import imgFrame2147227144 from "@/assets/chart-portfolio.png";

function Frame2147225656BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties} className="flex items-center justify-center relative shrink-0 size-[24px]">
      {children}
    </div>
  );
}

function FooterContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">{children}</div>
    </div>
  );
}

function BackgroundImage8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[64px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        {children}
      </div>
    </div>
  );
}
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white mr-[-3px] relative rounded-[78.75px] shrink-0">
      <div className="content-stretch flex gap-[7px] items-center overflow-clip p-[7px] relative rounded-[inherit]">{children}</div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_1.75px_1.75px_1.75px_0px_white]" />
      <div aria-hidden="true" className="absolute border-[#e5e4e5] border-[0.875px] border-solid inset-0 pointer-events-none rounded-[78.75px]" />
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={clsx("relative size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-[#f7f7f8] grow min-h-px min-w-px relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_#e3e3e3]" />
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-end pb-[12px] pt-0 px-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function TextboxBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center pb-0 pl-[8px] pr-0 pt-[8px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start pl-0 pr-[32px] py-0 relative shrink-0 w-[341px]">
      <div className="-webkit-box basis-0 flex-col font-['Söhne:Leicht',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#29272a] text-[14px] w-[287px]">
        <p className="leading-[20px]">{children}</p>
      </div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[14px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute bg-white inset-0 rounded-[4px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">{children}</div>
      </div>
    </div>
  );
}
type MenuItemBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function MenuItemBackgroundImageAndText({ text, additionalClassNames = "" }: MenuItemBackgroundImageAndTextProps) {
  return (
    <div className={clsx("bg-[#edebee] content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] w-[64px]", additionalClassNames)}>
      <BackgroundImage4 additionalClassNames="shrink-0">
        <g clipPath="url(#clip0_2010_5064)" id="event">
          <g id="Vector"></g>
          <path d={svgPaths.p218f2800} fill="var(--fill-0, #8A7F91)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2010_5064">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </BackgroundImage4>
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] min-w-full relative shrink-0 text-[#8a7f91] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}

function InvestorsListContainerBackgroundImage() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="content-stretch flex items-start pl-0 pr-[3px] py-0 relative shrink-0">
        <BackgroundImage6>
          <ImageBackgroundImage additionalClassNames="size-[14px]" />
        </BackgroundImage6>
        <BackgroundImage6>
          <BackgroundImage1>
            <img alt="" className="absolute left-[-35.71%] max-w-none size-[171.43%] top-[-36.57%]" src={imgImage} />
          </BackgroundImage1>
        </BackgroundImage6>
        <BackgroundImage6>
          <div className="relative shrink-0 size-[14px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-white inset-0" />
              <div className="absolute inset-0 overflow-hidden">
                <img alt="" className="absolute left-[-18.94%] max-w-none size-[142.86%] top-[-24.34%]" src={imgImage4} />
              </div>
            </div>
          </div>
        </BackgroundImage6>
        <BackgroundImage6>
          <BackgroundImage1>
            <img alt="" className="absolute left-[-6.5%] max-w-none size-[120.95%] top-[-11.74%]" src={imgImage5} />
          </BackgroundImage1>
        </BackgroundImage6>
      </div>
      <BackgroundImage5>
        <g id="Ellipse Container">
          <circle cx="8.00004" cy="8.00004" fill="var(--fill-0, #7F7582)" id="Ellipse 2301" r="2" />
        </g>
      </BackgroundImage5>
      <div className="content-stretch flex gap-[11px] items-start relative shrink-0">
        <TypographyBackgroundImageAndText4 text="Erice Schmidt" />
        <TypographyBackgroundImageAndText4 text="Dustin Moskovitz" />
      </div>
    </div>
  );
}
type TypographyBackgroundImageAndText4Props = {
  text: string;
};

function TypographyBackgroundImageAndText4({ text }: TypographyBackgroundImageAndText4Props) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type ImageBackgroundImageProps = {
  additionalClassNames?: string;
};

function ImageBackgroundImage({ additionalClassNames = "" }: ImageBackgroundImageProps) {
  return (
    <div className={clsx("relative rounded-[4px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute bg-white inset-0 rounded-[4px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImage3} />
      </div>
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="basis-0 grow h-px min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function DividerBackgroundImage() {
  return (
    <div className="h-px relative shrink-0 w-[36px]">
      <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none" />
    </div>
  );
}
type TypographyBackgroundImageAndText3Props = {
  text: string;
};

function TypographyBackgroundImageAndText3({ text }: TypographyBackgroundImageAndText3Props) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[14px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type DescriptionContainerBackgroundImageAndTextProps = {
  text: string;
};

function DescriptionContainerBackgroundImageAndText({ text }: DescriptionContainerBackgroundImageAndTextProps) {
  return <BackgroundImage2>{text}</BackgroundImage2>;
}

function AutoAwesomeBackgroundImage() {
  return (
    <BackgroundImage5>
      <g clipPath="url(#clip0_2010_5116)" id="auto_awesome">
        <g id="Vector"></g>
        <path d={svgPaths.p15377400} fill="var(--fill-0, #373338)" id="Vector_2" />
      </g>
      <defs>
        <clipPath id="clip0_2010_5116">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage5>
  );
}
type TagContainerBackgroundImageAndTextProps = {
  text: string;
};

function TagContainerBackgroundImageAndText({ text }: TagContainerBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[110px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none rounded-[110px]" />
      <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap text-right">{text}</p>
    </div>
  );
}
type TypographyBackgroundImageAndText2Props = {
  text: string;
};

function TypographyBackgroundImageAndText2({ text }: TypographyBackgroundImageAndText2Props) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[14px] text-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TypographyBackgroundImageAndText1Props = {
  text: string;
};

function TypographyBackgroundImageAndText1({ text }: TypographyBackgroundImageAndText1Props) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f0eef0] text-[14px] text-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TabBackgroundImageAndTextProps = {
  text: string;
};

function TabBackgroundImageAndText({ text }: TabBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#e6e4e7] border-[0px_0px_1.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[16px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Söhne:Kräftig',sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-white w-full">{text}</p>
    </div>
  );
}
type TypographyBackgroundImageAndTextProps = {
  text: string;
};

function TypographyBackgroundImageAndText({ text }: TypographyBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[14px] text-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#f0eef0] relative size-full" data-name="Home page">
      <div className="absolute bg-[#edebee] content-stretch flex flex-col h-[917px] items-start left-0 px-[4px] py-[16px] top-[64px] w-[72px]" data-name="Menu">
        <div className="bg-[#edebee] content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="MenuItem">
          <BackgroundImage4 additionalClassNames="shrink-0">
            <g clipPath="url(#clip0_2009_5199)" id="monetization_on">
              <g id="Vector"></g>
              <path d={svgPaths.p3fc6c580} fill="var(--fill-0, #373338)" id="Vector_2" />
            </g>
            <defs>
              <clipPath id="clip0_2009_5199">
                <rect fill="white" height="24" width="24" />
              </clipPath>
            </defs>
          </BackgroundImage4>
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] min-w-full relative shrink-0 text-[#373338] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Products
          </p>
        </div>
        <div className="bg-[#edebee] content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="MenuItem">
          <BackgroundImage4 additionalClassNames="shrink-0">
            <g clipPath="url(#clip0_2010_5095)" id="account_balance_wallet">
              <g id="Vector"></g>
              <path d={svgPaths.p1b20f380} fill="var(--fill-0, #8A7F91)" id="Vector_2" />
            </g>
            <defs>
              <clipPath id="clip0_2010_5095">
                <rect fill="white" height="24" width="24" />
              </clipPath>
            </defs>
          </BackgroundImage4>
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] min-w-full relative shrink-0 text-[#8a7f91] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Portfolio
          </p>
        </div>
        <div className="bg-[#edebee] content-stretch flex flex-col gap-[4px] items-center justify-center px-0 py-[10px] relative shrink-0 w-[64px]" data-name="MenuItem">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="people_alt">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="Group">
                <g id="Vector"></g>
              </g>
            </svg>
            <div className="absolute contents inset-[16.67%_4.17%]" data-name="Group">
              <div className="absolute contents inset-[16.67%_4.17%]" data-name="Group">
                <div className="absolute inset-[54.71%_4.17%_16.67%_69.46%]" data-name="Group">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                    <g id="Group">
                      <path clipRule="evenodd" d={svgPaths.p21577c00} fill="var(--fill-0, #8A7F91)" fillRule="evenodd" id="Vector" />
                    </g>
                  </svg>
                </div>
                <div className="absolute bottom-1/2 left-[20.83%] right-[45.83%] top-[16.67%]" data-name="Group">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <g id="Group">
                      <path d={svgPaths.p65069f0} fill="var(--fill-0, #8A7F91)" id="Vector" />
                    </g>
                  </svg>
                </div>
                <div className="absolute bottom-1/2 left-[56.96%] right-[20.83%] top-[16.67%]" data-name="Group">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 8">
                    <g id="Group">
                      <path clipRule="evenodd" d={svgPaths.p1187a00} fill="var(--fill-0, #8A7F91)" fillRule="evenodd" id="Vector" />
                    </g>
                  </svg>
                </div>
                <div className="absolute inset-[54.17%_29.17%_16.67%_4.17%]" data-name="Group">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 7">
                    <g id="Group">
                      <path clipRule="evenodd" d={svgPaths.p2775aa80} fill="var(--fill-0, #8A7F91)" fillRule="evenodd" id="Vector" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] min-w-full relative shrink-0 text-[#8a7f91] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Community
          </p>
        </div>
        <MenuItemBackgroundImageAndText text="Events" additionalClassNames="relative shrink-0" />
      </div>
      {[...Array(2).keys()].map((_, i) => (
        <MenuItemBackgroundImageAndText text="Events" additionalClassNames="absolute left-[4px] top-[272px]" />
      ))}
      <div className="absolute bg-[#edebee] content-stretch flex flex-col gap-[4px] items-center justify-center left-[4px] px-0 py-[10px] top-[901px] w-[64px]" data-name="MenuItem">
        <BackgroundImage4 additionalClassNames="shrink-0">
          <g id="ic:sharp-help">
            <path d={svgPaths.p1a65d500} fill="var(--fill-0, #8A7F91)" id="Vector" />
          </g>
        </BackgroundImage4>
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16px] min-w-full relative shrink-0 text-[#8a7f91] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Help
        </p>
      </div>
      <div className="absolute h-[40px] left-[calc(33.33%+81px)] rounded-[80px] top-[44px] w-[282px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[80px]">
          <div className="absolute bg-white inset-0 rounded-[80px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[80px]">
            <img alt="" className="absolute h-[439.05%] left-0 max-w-none top-[-169.52%] w-full" src={imgFrame2147227144} />
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center overflow-clip pl-[11px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
          <div className="relative shrink-0 size-[16px]">
            <div className="absolute inset-[-20.37%_-38.71%_-57.05%_-38.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
                <g id="Group 1000001644">
                  <g filter="url(#filter0_d_2009_5041)" id="Ellipse 2172">
                    <circle cx="14.2456" cy="11.26" fill="url(#paint0_radial_2009_5041)" r="4.64513" shapeRendering="crispEdges" />
                    <circle cx="14.2456" cy="11.26" fill="var(--fill-1, black)" fillOpacity="0.5" r="4.64513" shapeRendering="crispEdges" style={{ mixBlendMode: "overlay" }} />
                  </g>
                  <g filter="url(#filter1_d_2009_5041)" id="Ellipse 2173" opacity="0.25">
                    <circle cx="14.1935" cy="11.2597" fill="var(--fill-0, black)" fillOpacity="0.5" r="8" shapeRendering="crispEdges" style={{ mixBlendMode: "overlay" }} />
                    <circle cx="14.1935" cy="11.2597" r="6" shapeRendering="crispEdges" stroke="url(#paint1_radial_2009_5041)" strokeWidth="4" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.6773" id="filter0_d_2009_5041" width="21.6773" x="3.40698" y="3.35508">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2.93377" />
                    <feGaussianBlur stdDeviation="3.09676" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.169751 0 0 0 0 0.751666 0 0 0 0 0.561804 0 0 0 0.24 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2009_5041" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_2009_5041" mode="normal" result="shape" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28.387" id="filter1_d_2009_5041" width="28.387" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2.93377" />
                    <feGaussianBlur stdDeviation="3.09676" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.169751 0 0 0 0 0.751666 0 0 0 0 0.561804 0 0 0 0.24 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2009_5041" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_2009_5041" mode="normal" result="shape" />
                  </filter>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(17.2696 9.14774) rotate(133.516) scale(9.31809)" gradientUnits="userSpaceOnUse" id="paint0_radial_2009_5041" r="1">
                    <stop stopColor="#12E27C" />
                    <stop offset="0.823958" stopColor="#87A0BE" stopOpacity="0.07" />
                  </radialGradient>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(7.87503 11.2598) rotate(-12.4554) scale(31.813)" gradientUnits="userSpaceOnUse" id="paint1_radial_2009_5041" r="1">
                    <stop stopColor="#12E27C" />
                    <stop offset="0.838542" stopColor="#12E27C" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center overflow-clip px-[8px] py-[2.296px] relative rounded-[146.963px] shrink-0" data-name="Badges">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap">
                <p className="leading-[16px]">Explore New</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[18px]" data-name="keyboard_arrow_right">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <g clipPath="url(#clip0_2009_5032)" id="keyboard_arrow_right">
                  <g id="Vector"></g>
                  <path d={svgPaths.p4fdc780} fill="var(--fill-0, #7F7582)" id="Vector_2" />
                </g>
                <defs>
                  <clipPath id="clip0_2009_5032">
                    <rect fill="white" height="18" width="18" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.31)] content-stretch flex flex-col h-[32.548px] items-start justify-center p-[4.02px] relative rounded-[16.079px] shadow-[-0.67px_3.35px_13.131px_0px_rgba(164,140,160,0.2)] shrink-0" data-name="Updated search component">
            <div className="content-stretch flex flex-col gap-[2.764px] h-[24px] items-start justify-center pl-[3.742px] pr-[7.485px] py-0 relative rounded-[13.705px] shrink-0 w-[118px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.77) 0%, rgba(255, 255, 255, 0.77) 100%), linear-gradient(74.0535deg, rgb(240, 238, 240) 1.7524%, rgba(255, 255, 255, 0) 46.574%)" }}>
              <div aria-hidden="true" className="absolute border-[0.67px] border-[rgba(240,238,240,0.2)] border-solid inset-0 pointer-events-none rounded-[13.705px]" />
              <div className="content-stretch flex gap-[2px] h-[26px] items-center justify-center relative shrink-0 w-[107px]">
                <div className="content-stretch flex gap-[0.67px] items-center px-0 py-[0.461px] relative rounded-[2.511px] shrink-0" data-name="Textbox">
                  <div className="content-stretch flex items-center relative shrink-0">
                    <p className="font-['Söhne:Kräftig',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#373338] text-[12px] text-nowrap">Investor Ticker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#f7f7f8] border-solid inset-0 pointer-events-none rounded-[80px] shadow-[0px_2px_4px_0px_rgba(227,227,227,0.25)]" />
      </div>
      <div className="absolute content-stretch flex items-start justify-between left-[82px] top-[64px] w-[1342px]">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex items-start justify-center px-[16px] py-0 relative w-full">
              <div className="content-stretch flex flex-col gap-[40px] items-center pb-0 pt-[40px] px-0 relative shrink-0 w-[1170px]" data-name="Container">
                <div className="content-stretch flex flex-col gap-[24px] items-center pb-[24px] pt-0 px-0 relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0">
                    <div className="content-stretch flex gap-[14px] items-center justify-center relative shrink-0">
                      <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                        <BackgroundImage7 additionalClassNames="relative shrink-0 size-[32px]">
                          <g clipPath="url(#clip0_2010_5049)" id="auto_awesome">
                            <g id="Vector"></g>
                            <path d={svgPaths.pd0f1100} fill="var(--fill-0, #48424A)" id="Vector_2" />
                          </g>
                          <defs>
                            <clipPath id="clip0_2010_5049">
                              <rect fill="white" height="32" width="32" />
                            </clipPath>
                          </defs>
                        </BackgroundImage7>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
                        <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[24px] text-center text-nowrap">
                          <p className="leading-[32px]">Not Sure Where to Start? Ask our AI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[25px] items-center pb-0 pt-[12px] px-0 relative shrink-0">
                    <div className="content-stretch flex flex-col h-[68px] items-start px-[53px] py-0 relative shrink-0">
                      <div className="content-stretch flex flex-col items-center relative rounded-[11px] shrink-0" data-name="Search">
                        <div aria-hidden="true" className="absolute border-[7px] border-[rgba(245,244,246,0.4)] border-solid inset-[-7px] pointer-events-none rounded-[18px] shadow-[-1px_5px_19.6px_0px_rgba(164,140,160,0.6)]" />
                        <div className="bg-[#f7f7f8] content-stretch flex flex-col h-[56px] items-center px-[20px] py-[12px] relative rounded-[12px] shrink-0 w-[758px]">
                          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[14px]" />
                          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                            <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px px-0 py-[4px] relative rounded-[4px] shrink-0" data-name="Textbox">
                              <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[473px]">
                                <BackgroundImage4 additionalClassNames="shrink-0">
                                  <g id="Frame 2147226112">
                                    <g id="Frame 2147226111">
                                      <path d={svgPaths.p1b54c300} id="Vector" stroke="var(--stroke-0, #29272A)" strokeMiterlimit="10" strokeWidth="1.33333" />
                                      <path d={svgPaths.p34c68580} id="Vector_2" stroke="var(--stroke-0, #29272A)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.33333" />
                                    </g>
                                    <path d={svgPaths.p1e4ecf00} fill="var(--fill-0, #29272A)" id="Vector_3" stroke="var(--stroke-0, #F0EEF0)" strokeWidth="1.33333" />
                                  </g>
                                </BackgroundImage4>
                                <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#7f7582] text-[14px] text-center text-nowrap">Type a product, investor name, or category to get started…</p>
                              </div>
                              <BackgroundImage4 additionalClassNames="shrink-0">
                                <g clipPath="url(#clip0_2010_5060)" id="send">
                                  <g id="Vector"></g>
                                  <path d={svgPaths.p8648200} fill="var(--fill-0, #ADA6B4)" id="Vector_2" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2010_5060">
                                    <rect fill="white" height="24" width="24" />
                                  </clipPath>
                                </defs>
                              </BackgroundImage4>
                            </div>
                          </div>
                          <div className="absolute inset-[-2px] pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
                        </div>
                      </div>
                    </div>
                    <div className="content-center flex flex-wrap gap-[8px] items-center justify-center relative shrink-0 w-[778px]">
                      <div className="bg-[#f7f7f8] content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[8px] relative rounded-[256px] shrink-0" data-name="GoodFin AI Insights">
                        <TypographyBackgroundImageAndText text="Learn more about GoodFin" />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
                      </div>
                      <div className="bg-[#f7f7f8] content-stretch flex gap-[8px] items-center overflow-clip px-[16px] py-[8px] relative rounded-[256px] shrink-0" data-name="GoodFin AI Insights">
                        <TypographyBackgroundImageAndText text="Most Valuable AI Startups" />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[102px] relative rounded-[16px] shrink-0 w-[1170px]" data-name="image">
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
                    <div className="absolute inset-0 rounded-[16px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1170 102\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(106.24 5.6619 -177.65 24.229 17.936 -0.000023773)\\\'><stop stop-color=\\\'rgba(72,66,74,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(99,86,95,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(126,106,117,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
                    <div className="absolute inset-0 mix-blend-luminosity rounded-[16px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1170 102\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.20000000298023224\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(138.19 51.358 -89.336 38.615 1279.5 -48.241)\\\'><stop stop-color=\\\'rgba(20,19,19,0.9)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(36,34,37,1)\\\' offset=\\\'0.42798\\\'/><stop stop-color=\\\'rgba(58,53,57,1)\\\' offset=\\\'0.51866\\\'/><stop stop-color=\\\'rgba(80,73,77,1)\\\' offset=\\\'0.60935\\\'/><stop stop-color=\\\'rgba(56,52,54,1)\\\' offset=\\\'0.74674\\\'/><stop stop-color=\\\'rgba(31,31,31,1)\\\' offset=\\\'0.88413\\\'/></radialGradient></defs></svg>')" }} />
                  </div>
                  <div className="content-stretch flex flex-col gap-[24px] items-start justify-center overflow-clip pl-0 pr-[40px] py-0 relative rounded-[inherit] size-full">
                    <div className="h-[107px] relative shrink-0 w-[1295.441px]">
                      <div className="absolute content-stretch flex items-center justify-end left-[10px] top-[13.5px] w-[1162px]">
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="bg-gradient-to-b content-stretch flex from-[#878289] h-[80px] items-center overflow-clip relative rounded-[4px] shrink-0 to-[#7f7582] w-[208px]" data-name="Priority Access Cards">
                            <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip pl-[16px] pr-0 py-[12px] relative rounded-[3.925px] shrink-0 w-[135px]">
                              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                  <BackgroundImageAndText text="Founders Fund" />
                                </div>
                              </div>
                              <div className="absolute inset-0 pointer-events-none shadow-[inset_0.491px_0.491px_0.981px_0px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="content-stretch flex flex-col h-[98px] items-center justify-center overflow-clip px-[23.549px] py-0 relative shrink-0 w-[64px]">
                              <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="image">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgImage} />
                              </div>
                            </div>
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_6px_42.1px_1px_rgba(255,255,255,0.25)]" />
                          </div>
                          <div className="bg-gradient-to-b content-stretch flex from-[#878289] h-[80px] items-center overflow-clip relative rounded-[4px] shrink-0 to-[#7f7582] w-[208px]" data-name="Priority Access Cards">
                            <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip pl-[16px] pr-0 py-[12px] relative rounded-[3.925px] shrink-0 w-[135px]">
                              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                  <BackgroundImageAndText text="OpenAI" />
                                </div>
                              </div>
                              <div className="absolute inset-0 pointer-events-none shadow-[inset_0.491px_0.491px_0.981px_0px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="content-stretch flex flex-col h-[98px] items-center justify-center overflow-clip px-[23.549px] py-0 relative shrink-0 w-[64px]">
                              <BackgroundImage8>
                                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage1} />
                                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage2} />
                              </BackgroundImage8>
                            </div>
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_6px_42.1px_1px_rgba(255,255,255,0.25)]" />
                          </div>
                          <div className="bg-gradient-to-b content-stretch flex from-[#878289] h-[80px] items-center overflow-clip relative rounded-[4px] shrink-0 to-[#7f7582] w-[208px]" data-name="Priority Access Cards">
                            <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip pl-[16px] pr-0 py-[12px] relative rounded-[3.925px] shrink-0 w-[135px]">
                              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                  <BackgroundImageAndText text="Perplexity" />
                                </div>
                              </div>
                              <div className="absolute inset-0 pointer-events-none shadow-[inset_0.491px_0.491px_0.981px_0px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="content-stretch flex flex-col h-[98px] items-center justify-center overflow-clip px-[23.549px] py-0 relative shrink-0 w-[64px]">
                              <BackgroundImage8>
                                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage1} />
                                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgAvatar} />
                              </BackgroundImage8>
                            </div>
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_6px_42.1px_1px_rgba(255,255,255,0.25)]" />
                          </div>
                          <div className="bg-gradient-to-b content-stretch flex from-[#878289] h-[80px] items-center overflow-clip relative rounded-[4px] shrink-0 to-[#7f7582] w-[208px]" data-name="Priority Access Cards">
                            <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip pl-[16px] pr-0 py-[12px] relative rounded-[3.925px] shrink-0 w-[135px]">
                              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                  <BackgroundImageAndText text="Figma" />
                                </div>
                              </div>
                              <div className="absolute inset-0 pointer-events-none shadow-[inset_0.491px_0.491px_0.981px_0px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="content-stretch flex flex-col h-[98px] items-center justify-center overflow-clip px-[23.549px] py-0 relative shrink-0 w-[64px]">
                              <BackgroundImage8>
                                <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgImage1} />
                                <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                                  <img alt="" className="absolute h-[124.56%] left-[-15.02%] max-w-none top-[-11.11%] w-[130.79%]" src={imgAvatar1} />
                                </div>
                              </BackgroundImage8>
                            </div>
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_6px_42.1px_1px_rgba(255,255,255,0.25)]" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex gap-[34px] h-[123px] items-center left-0 overflow-clip px-[26px] py-0 top-[-7.5px] w-[304px]">
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 304 123\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(48.585 19.326 -88.749 41.06 4.6604 -0.000031915)\\\'><stop stop-color=\\\'rgba(72,66,74,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(99,86,95,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(126,106,117,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
                          <div className="absolute inset-0 mix-blend-luminosity" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 304 123\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.20000000298023224\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(35.906 61.932 -23.212 46.565 332.44 -58.172)\\\'><stop stop-color=\\\'rgba(20,19,19,0.9)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(36,34,37,1)\\\' offset=\\\'0.42798\\\'/><stop stop-color=\\\'rgba(58,53,57,1)\\\' offset=\\\'0.51866\\\'/><stop stop-color=\\\'rgba(80,73,77,1)\\\' offset=\\\'0.60935\\\'/><stop stop-color=\\\'rgba(56,52,54,1)\\\' offset=\\\'0.74674\\\'/><stop stop-color=\\\'rgba(31,31,31,1)\\\' offset=\\\'0.88413\\\'/></radialGradient></defs></svg>')" }} />
                        </div>
                        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
                          <div className="h-[28.66px] relative shrink-0 w-[89px]" data-name="Vector">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 29">
                              <g id="Vector">
                                <path clipRule="evenodd" d={svgPaths.p2c02ac70} fill="var(--fill-0, #F4F3F5)" fillRule="evenodd" />
                                <path d={svgPaths.p25d39800} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p29907c80} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p20579772} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p185a8f90} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p324bc700} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p3ee53500} fill="var(--fill-0, #F4F3F5)" />
                                <path d={svgPaths.p34bedd00} fill="var(--fill-0, #F4F3F5)" />
                              </g>
                            </svg>
                          </div>
                          <div className="content-stretch flex flex-col items-center justify-end relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-center relative shrink-0" data-name="Typography">
                              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24.536px] text-nowrap text-white">
                                <p className="leading-[30.67px]">Priority Access</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col h-[96px] items-start justify-center relative shrink-0 w-[90px]">
                          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                            <div className="content-stretch flex items-center relative shrink-0">
                              <Frame2147225656BackgroundImage>
                                <div className="flex-none rotate-[90deg]">
                                  <BackgroundImage4>
                                    <g clipPath="url(#clip0_2009_5174)" id="keyboard_arrow_down">
                                      <g id="Vector"></g>
                                      <path d={svgPaths.pdde3a00} fill="var(--fill-0, #F7F7F8)" id="Vector_2" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2009_5174">
                                        <rect fill="white" height="24" width="24" />
                                      </clipPath>
                                    </defs>
                                  </BackgroundImage4>
                                </div>
                              </Frame2147225656BackgroundImage>
                              <Frame2147225656BackgroundImage>
                                <div className="flex-none rotate-[270deg]">
                                  <BackgroundImage4>
                                    <g clipPath="url(#clip0_2009_5164)" id="keyboard_arrow_down">
                                      <g id="Vector"></g>
                                      <path d={svgPaths.pdde3a00} fill="var(--fill-0, #9B929E)" id="Vector_2" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2009_5164">
                                        <rect fill="white" height="24" width="24" />
                                      </clipPath>
                                    </defs>
                                  </BackgroundImage4>
                                </div>
                              </Frame2147225656BackgroundImage>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-[#dad7d8] border-solid inset-0 pointer-events-none rounded-[16px]" />
                </div>
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                          <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Sub Nav">
                            <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Tab">
                              <div aria-hidden="true" className="absolute border-[#373338] border-[0px_0px_2.5px] border-solid inset-0 pointer-events-none" />
                              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[16px] text-nowrap">
                                <p className="leading-[20px]">Pre-IPO</p>
                              </div>
                            </div>
                            <TabBackgroundImageAndText text="Featured" />
                            <TabBackgroundImageAndText text="Venture Funds" />
                            <TabBackgroundImageAndText text="Early-Stage Startups" />
                            <TabBackgroundImageAndText text="Private Equity Funds" />
                            <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Tab">
                              <div aria-hidden="true" className="absolute border-[#e6e4e7] border-[0px_0px_1.5px] border-solid inset-0 pointer-events-none" />
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">
                                  <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap">
                                    <p className="leading-[20px]">Private equity funds</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-start pb-[8px] pt-[16px] px-0 relative shrink-0 w-full">
                        <div className="bg-[#7f7582] content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Component 23">
                          <TypographyBackgroundImageAndText1 text="All" />
                        </div>
                        <div className="content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Component 26">
                          <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                          <TypographyBackgroundImageAndText2 text="Featured" />
                        </div>
                        <div className="content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Component 24">
                          <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                          <TypographyBackgroundImageAndText2 text="New" />
                        </div>
                        <div className="content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Component 25">
                          <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[24px]" />
                          <TypographyBackgroundImageAndText2 text="Closing Soon" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="content-start flex flex-wrap gap-[40px_16px] items-start relative shrink-0 w-full">
                          <div className="bg-[#f7f7f8] content-stretch flex flex-col gap-[8px] items-end pb-[12px] pt-0 px-[12px] relative rounded-[12px] shrink-0 w-[374px]" data-name="Container">
                            <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_#e3e3e3]" />
                            <div className="content-stretch flex flex-col h-[69px] items-start justify-center relative shrink-0 w-[239px]" data-name="Info Container">
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Typography">
                                <div className="content-stretch flex flex-col items-start justify-end relative shrink-0" data-name="Info Header">
                                  <div className="content-stretch flex items-center justify-between pb-0 pt-[3px] px-0 relative shrink-0 w-[249px]" data-name="Info Header">
                                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Tag Container">
                                      <TagContainerBackgroundImageAndText text="SPACE TECH" />
                                    </div>
                                    <div className="bg-white content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-bl-[145px] rounded-tl-[145px] shrink-0" data-name="Badges">
                                      <BackgroundImage5>
                                        <g id="Frame 2147225751">
                                          <circle cx="8.00004" cy="8.00004" fill="var(--fill-0, #00B24D)" id="Ellipse 2301" r="2" />
                                        </g>
                                      </BackgroundImage5>
                                      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
                                        <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#00b24d] text-[14px] text-nowrap">
                                          <p className="leading-[16px]">LIVE</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <TextboxBackgroundImage>
                              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Info Body">
                                <div className="content-stretch flex h-[32px] items-end justify-between relative shrink-0 w-full" data-name="Title Container">
                                  <div className="basis-0 flex flex-col font-['Söhne:Kräftig',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#29272a] text-[20px]">
                                    <p className="leading-[28px]">SpaceX</p>
                                  </div>
                                  <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[340px] px-[12px] py-[8px] relative rounded-[256px] shrink-0 w-[32px]" data-name="Ask AI button">
                                    <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                                    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                                      <AutoAwesomeBackgroundImage />
                                    </div>
                                  </div>
                                </div>
                                <DescriptionContainerBackgroundImageAndText text="Space travel with reusable rockets and interplanetary ambitions(WiP)" />
                              </div>
                              <FooterContainerBackgroundImage>
                                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="Footer Container">
                                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Investors Container">
                                    <div className="content-stretch flex items-start relative shrink-0" data-name="Investors Container">
                                      <TypographyBackgroundImageAndText3 text="Investors" />
                                    </div>
                                    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Divider Container">
                                      <DividerBackgroundImage />
                                      <BackgroundImage />
                                    </div>
                                  </div>
                                  <InvestorsListContainerBackgroundImage />
                                </div>
                              </FooterContainerBackgroundImage>
                            </TextboxBackgroundImage>
                            <div className="absolute h-[88px] left-[20px] top-[-6px] w-[82.422px]" data-name="Avatar Container">
                              <div className="absolute bg-[#c7b8c7] blur-[7.421px] filter h-[51.242px] left-[calc(50%-9.63px)] opacity-50 top-[32.83px] translate-x-[-50%] w-[58.31px]" data-name="Avatar Background" />
                              <div className="absolute left-[calc(50%-5px)] pointer-events-none rounded-[10.766px] size-[72px] top-[0.21px] translate-x-[-50%]" data-name="Avatar">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10.766px] size-full" src={imgImage1} />
                                <div className="absolute inset-0 shadow-[inset_0px_-3.295px_42.785px_0px_rgba(255,255,255,0.31)]" />
                              </div>
                            </div>
                          </div>
                          <BackgroundImage3>
                            <div className="content-stretch flex flex-col h-[69px] items-start justify-center relative shrink-0 w-[239px]" data-name="Info Container">
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Typography">
                                <div className="content-stretch flex flex-col items-start justify-end relative shrink-0" data-name="Info Header">
                                  <div className="content-stretch flex items-center justify-between pb-0 pt-[3px] px-0 relative shrink-0 w-[249px]" data-name="Info Header">
                                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Tag Container">
                                      <TagContainerBackgroundImageAndText text="FINTECH" />
                                    </div>
                                    <div className="bg-[#554d57] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-bl-[145px] rounded-tl-[145px] shrink-0" data-name="Badges">
                                      <TypographyBackgroundImageAndText1 text="CLOSING SOON" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <TextboxBackgroundImage>
                              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Info Body">
                                <div className="content-stretch flex h-[32px] items-end justify-between relative shrink-0 w-full" data-name="Title Container">
                                  <div className="basis-0 flex flex-col font-['Söhne:Kräftig',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#29272a] text-[20px]">
                                    <p className="leading-[28px]">Stripe</p>
                                  </div>
                                  <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[340px] px-[12px] py-[8px] relative rounded-[256px] shrink-0 w-[32px]" data-name="Ask AI button">
                                    <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                                    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                                      <AutoAwesomeBackgroundImage />
                                    </div>
                                  </div>
                                </div>
                                <DescriptionContainerBackgroundImageAndText text="Space travel with reusable rockets and interplanetary ambitions.(WiP)" />
                              </div>
                              <FooterContainerBackgroundImage>
                                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="Footer Container">
                                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Investors Container">
                                    <div className="content-stretch flex items-start relative shrink-0" data-name="Investors Container">
                                      <TypographyBackgroundImageAndText3 text="Investors" />
                                    </div>
                                    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Divider Container">
                                      <DividerBackgroundImage />
                                      <BackgroundImage />
                                    </div>
                                  </div>
                                  <InvestorsListContainerBackgroundImage />
                                </div>
                              </FooterContainerBackgroundImage>
                            </TextboxBackgroundImage>
                            <div className="absolute h-[88px] left-[20px] top-[-6px] w-[82.422px]" data-name="Avatar Container">
                              <div className="absolute bg-[#c7b8c7] blur-[7.421px] filter h-[51.242px] left-[calc(50%-9.63px)] opacity-50 top-[32.83px] translate-x-[-50%] w-[58.31px]" data-name="Avatar Background" />
                              <div className="absolute left-[calc(50%-5px)] pointer-events-none rounded-[10.766px] size-[72px] top-[0.21px] translate-x-[-50%]" data-name="Avatar">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10.766px] size-full" src={imgAvatar2} />
                                <div className="absolute inset-0 shadow-[inset_0px_-3.295px_42.785px_0px_rgba(255,255,255,0.31)]" />
                              </div>
                            </div>
                          </BackgroundImage3>
                          <BackgroundImage3>
                            <div className="content-stretch flex flex-col h-[69px] items-start justify-center relative shrink-0 w-[239px]" data-name="Info Container">
                              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Typography">
                                <div className="content-stretch flex flex-col items-start justify-end relative shrink-0" data-name="Info Header">
                                  <div className="content-stretch flex items-center justify-between pb-0 pt-[3px] px-0 relative shrink-0 w-[249px]" data-name="Info Header">
                                    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Tag Container">
                                      <TagContainerBackgroundImageAndText text="AI" />
                                    </div>
                                    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-bl-[145px] rounded-tl-[145px] shrink-0" data-name="Badges">
                                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-bl-[145px] rounded-tl-[145px] size-full" src={imgBadges} />
                                      <TypographyBackgroundImageAndText1 text="PREMIUM" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <TextboxBackgroundImage>
                              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Info Body">
                                <div className="content-stretch flex h-[32px] items-end justify-between relative shrink-0 w-full" data-name="Title Container">
                                  <div className="basis-0 flex flex-col font-['Söhne:Kräftig',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#29272a] text-[20px]">
                                    <p className="leading-[28px]">Anthropic</p>
                                  </div>
                                  <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[340px] px-[12px] py-[8px] relative rounded-[256px] shrink-0 w-[32px]" data-name="Ask AI button">
                                    <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                                    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
                                      <AutoAwesomeBackgroundImage />
                                    </div>
                                  </div>
                                </div>
                                <BackgroundImage2>{`Anthropic is an AI safety and research company that is working to build ,(WiP)              steerable AI systems.`}</BackgroundImage2>
                              </div>
                              <FooterContainerBackgroundImage>
                                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="Footer Container">
                                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Investors Container">
                                    <div className="content-stretch flex items-start relative shrink-0" data-name="Investors Container">
                                      <TypographyBackgroundImageAndText3 text="Investors" />
                                    </div>
                                    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Divider Container">
                                      <DividerBackgroundImage />
                                      <BackgroundImage />
                                    </div>
                                  </div>
                                  <InvestorsListContainerBackgroundImage />
                                </div>
                              </FooterContainerBackgroundImage>
                            </TextboxBackgroundImage>
                            <div className="absolute h-[88px] left-[20px] top-[-6px] w-[82.422px]" data-name="Avatar Container">
                              <div className="absolute bg-[#c7b8c7] blur-[7.421px] filter h-[51.242px] left-[calc(50%-9.63px)] opacity-50 top-[32.83px] translate-x-[-50%] w-[58.31px]" data-name="Avatar Background" />
                              <div className="absolute left-[calc(50%-5px)] pointer-events-none rounded-[10.766px] size-[72px] top-[0.21px] translate-x-[-50%]" data-name="Avatar">
                                <div aria-hidden="true" className="absolute inset-0 rounded-[10.766px]">
                                  <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[10.766px] size-full" src={imgAvatar2} />
                                  <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[10.766px] size-full" src={imgAvatar3} />
                                </div>
                                <div className="absolute inset-0 shadow-[inset_0px_-3.295px_42.785px_0px_rgba(255,255,255,0.31)]" />
                              </div>
                            </div>
                          </BackgroundImage3>
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
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[-89px] top-[1056px] w-[342px]">
        <div className="content-stretch flex flex-col items-start relative shrink-0">
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <p className="font-['Söhne:Leicht',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#48424a] text-[12px] text-nowrap text-right">Investors</p>
            </div>
          </div>
        </div>
        <div className="content-start flex flex-wrap gap-0 items-start justify-end pl-0 pr-[5px] py-0 relative shrink-0">
          {[...Array(3).keys()].map((_, i) => (
            <div className="bg-white mr-[-5px] relative rounded-[90px] shrink-0" data-name="GoodFin AI Insights">
              <div className="content-stretch flex gap-[8px] items-center overflow-clip p-[8px] relative rounded-[inherit]">
                <ImageBackgroundImage additionalClassNames="size-[16px]" />
              </div>
              <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
              <div aria-hidden="true" className="absolute border border-[#e5e4e5] border-solid inset-0 pointer-events-none rounded-[90px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bg-[#edebee] content-stretch flex items-center justify-between left-1/2 px-[16px] py-[12px] shadow-[0px_4px_16px_0px_rgba(154,144,161,0.1)] top-0 translate-x-[-50%] w-[1440px]" data-name="NavBar">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="NavLeft">
          <div className="bg-[#edebee] content-stretch flex items-center p-[8px] relative shrink-0" data-name="MenuButton">
            <BackgroundImage4 additionalClassNames="shrink-0">
              <g clipPath="url(#clip0_2010_5045)" id="menu">
                <g id="Vector"></g>
                <path d={svgPaths.p1d821780} fill="var(--fill-0, #373338)" id="Vector_2" />
              </g>
              <defs>
                <clipPath id="clip0_2010_5045">
                  <rect fill="white" height="24" width="24" />
                </clipPath>
              </defs>
            </BackgroundImage4>
          </div>
          <div className="h-[24px] relative shrink-0 w-[103.5px]" data-name="Logo">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 24">
              <g clipPath="url(#clip0_2010_5099)" id="Logo">
                <path clipRule="evenodd" d={svgPaths.p3134b500} fill="var(--fill-0, #373338)" fillRule="evenodd" id="Vector" />
              </g>
              <defs>
                <clipPath id="clip0_2010_5099">
                  <rect fill="white" height="24" width="103.5" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="NavRight">
          <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
            <div className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#373338] text-[14px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px]">Invite Friends</p>
            </div>
          </div>
          <div className="relative shrink-0 size-[32px]" data-name="Avatar">
            <div className="absolute inset-0 rounded-[100px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgRectangle34464} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 content-stretch flex flex-col items-start pb-[32px] pt-0 px-[24px] right-0">
        <div className="bg-[rgba(229,223,228,0.8)] content-stretch flex flex-col items-start justify-center p-[6px] relative rounded-[46px] shadow-[-1px_5px_19.6px_0px_rgba(164,140,160,0.6)] shrink-0" data-name="Universal Search">
          <div className="bg-[#f7f7f8] content-stretch flex items-center justify-center relative rounded-[171px] shrink-0 w-[250px]" data-name="Search">
            <div className="basis-0 grow h-[56px] min-h-px min-w-px relative rounded-[92px] shrink-0" style={{ backgroundImage: "linear-gradient(145.523deg, rgb(255, 255, 255) 82.623%, rgb(151, 144, 147) 46.075%, rgb(255, 255, 255) 2.2179%, rgb(252, 252, 250) 40.178%, rgb(237, 235, 238) 70.878%, rgb(252, 252, 250) 100.12%, rgb(255, 251, 251) 209.76%), linear-gradient(90deg, rgb(247, 247, 248) 0%, rgb(247, 247, 248) 100%), linear-gradient(90deg, rgb(247, 247, 248) 0%, rgb(247, 247, 248) 100%)" }}>
              <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[92px]" />
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[13px] py-[12px] relative size-full">
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[39.537px]">
                      <div className="absolute left-0 pointer-events-none rounded-[30.441px] size-[39.537px] top-0">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[30.441px] size-full" src={imgRectangle161681} />
                        <div aria-hidden="true" className="absolute border-[#f8f8f8] border-[0.507px] border-solid inset-0 rounded-[30.441px] shadow-[0px_4.162px_4.162px_0px_rgba(190,185,192,0.33)]" />
                      </div>
                      <div className="absolute h-[16px] left-[13px] top-[11.77px] w-[13.387px]" data-name="Vector">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
                          <path clipRule="evenodd" d={svgPaths.p3ca76000} fill="url(#paint0_linear_2009_5142)" fillRule="evenodd" id="Vector" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2009_5142" x1="6.69354" x2="6.67334" y1="-5.03779e-10" y2="30.5">
                              <stop stopColor="#746876" />
                              <stop offset="1" stopColor="#D8C2DC" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-px items-center px-0 py-[4px] relative rounded-[4px] shrink-0" data-name="Textbox">
                      <div className="content-stretch flex items-center relative shrink-0">
                        <p className="font-['Söhne:Kräftig',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#48424a] text-[14px] text-center text-nowrap">Ask Me Anything...</p>
                      </div>
                    </div>
                  </div>
                  <BackgroundImage4 additionalClassNames="shrink-0">
                    <g clipPath="url(#clip0_2009_5178)" id="send">
                      <g id="Vector"></g>
                      <path d={svgPaths.p8648200} fill="var(--fill-0, #BEB9C0)" id="Vector_2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2009_5178">
                        <rect fill="white" height="24" width="24" />
                      </clipPath>
                    </defs>
                  </BackgroundImage4>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_2px_0px_white]" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-end left-[calc(83.33%+14px)] top-[104px] w-[226px]">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip pl-[10px] pr-[24px] py-[8px] relative rounded-bl-[145px] rounded-tl-[145px] shrink-0" data-name="Badges">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[145px] rounded-tl-[145px]">
            <div className="absolute bg-white inset-0 rounded-bl-[145px] rounded-tl-[145px]" />
            <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-bl-[145px] rounded-tl-[145px] size-full" src={imgBadges} />
            <div className="absolute bg-[#9b929e] inset-0 rounded-bl-[145px] rounded-tl-[145px]" />
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[32px]" data-name="ProgressCircle">
              <div className="absolute inset-[0.01%_0_-0.01%_0]" data-name="Progress">
                <div className="absolute inset-[0_0_7.42%_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 30">
                    <path d={svgPaths.p2f0acb00} fill="var(--fill-0, #D6D2D5)" fillOpacity="0.4" id="Progress" />
                  </svg>
                </div>
              </div>
              <div className="absolute flex flex-col font-['Open_Sans:Bold',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+0.52px)] text-[8px] text-center text-nowrap text-white top-[calc(50%-0.05px)] tracking-[0.16px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[12.8px]">75%</p>
              </div>
              <div className="absolute inset-[0.01%_0_-0.01%_0]" data-name="Progress">
                <BackgroundImage7 additionalClassNames="absolute inset-[0.21%_0_0_0.21%]">
                  <path d={svgPaths.pf8b2600} fill="var(--fill-0, white)" id="Progress" />
                </BackgroundImage7>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[104px]">
            <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Typography">
              <div className="flex flex-col font-['Söhne:Kräftig',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
                <p className="leading-[16px]">Complete profile</p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Typography">
              <div className="flex flex-col font-['Söhne:Leicht',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f8] text-[12px] text-nowrap">
                <p className="leading-[16px]">Few details left!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}