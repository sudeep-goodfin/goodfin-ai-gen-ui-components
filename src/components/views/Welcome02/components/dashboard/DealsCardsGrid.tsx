import React from 'react';
import svgPaths from '../../imports/svg-lycxg20new';
import imgBadges from "../../assets/badges-deals.png";

// Deal images data
export const DEAL_IMAGES = {
  spacex: '/icons/products/spaceX.png',
  anthropic: '/icons/products/anthropic.png',
  openai: '/icons/products/openAI.png',
  xai: '/icons/products/xAI.png',
  perplexity: '/icons/products/perplexity.png',
  scaleai: '/icons/products/scaleAI.png',
  cohere: '/icons/products/cohere.png',
  moonfare: '/icons/products/moonfare.png',
  anduril: '/icons/products/anduril.jpg',
  databricks: '/icons/products/databricks.jpg',
} as const;

export type DealImageKey = keyof typeof DEAL_IMAGES;

// Deals data
export const DEALS_DATA = [
  {
    id: 'spacex',
    category: 'SPACE TECH',
    status: 'live' as const,
    title: 'SpaceX',
    description: 'Space travel with reusable rockets and interplanetary ambitions',
    image: 'spacex' as DealImageKey,
  },
  {
    id: 'openai',
    category: 'AI',
    status: 'closing' as const,
    title: 'OpenAI',
    description: 'Leading AI research lab building safe and beneficial artificial general intelligence',
    image: 'openai' as DealImageKey,
  },
  {
    id: 'anthropic',
    category: 'AI',
    status: 'premium' as const,
    title: 'Anthropic',
    description: 'AI safety and research company building reliable, interpretable AI systems',
    image: 'anthropic' as DealImageKey,
  },
  {
    id: 'xai',
    category: 'AI',
    status: 'live' as const,
    title: 'xAI',
    description: 'Elon Musk\'s AI company focused on understanding the universe',
    image: 'xai' as DealImageKey,
  },
  {
    id: 'perplexity',
    category: 'AI',
    status: 'live' as const,
    title: 'Perplexity',
    description: 'AI-powered answer engine that delivers accurate, cited responses',
    image: 'perplexity' as DealImageKey,
  },
  {
    id: 'scaleai',
    category: 'AI',
    status: 'closing' as const,
    title: 'Scale AI',
    description: 'Data platform accelerating AI development with high-quality training data',
    image: 'scaleai' as DealImageKey,
  },
  {
    id: 'databricks',
    category: 'DATA',
    status: 'premium' as const,
    title: 'Databricks',
    description: 'Unified analytics platform for data engineering and data science',
    image: 'databricks' as DealImageKey,
  },
  {
    id: 'anduril',
    category: 'DEFENSE',
    status: 'live' as const,
    title: 'Anduril',
    description: 'Defense technology company building autonomous systems',
    image: 'anduril' as DealImageKey,
  },
  {
    id: 'cohere',
    category: 'AI',
    status: 'live' as const,
    title: 'Cohere',
    description: 'Enterprise AI platform for natural language understanding',
    image: 'cohere' as DealImageKey,
  },
  {
    id: 'moonfare',
    category: 'FINTECH',
    status: 'live' as const,
    title: 'Moonfare',
    description: 'Digital platform democratizing access to private equity investments',
    image: 'moonfare' as DealImageKey,
  },
];

// Featured investors for display
const FEATURED_INVESTORS = ['anduril', 'openai', 'databricks', 'perplexity'] as DealImageKey[];

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
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

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white mr-[-3px] relative rounded-[78.75px] shrink-0">
      <div className="content-stretch flex gap-[7px] items-center overflow-clip p-[7px] relative rounded-[inherit]">{children}</div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_1.75px_1.75px_1.75px_0px_white]" />
      <div aria-hidden="true" className="absolute border-[#e5e4e5] border-[0.875px] border-solid inset-0 pointer-events-none rounded-[78.75px]" />
    </div>
  );
}

function ImageBackgroundImage({ additionalClassNames = "", src }: { additionalClassNames?: string; src: string }) {
  return (
    <div className={`relative rounded-[4px] shrink-0 ${additionalClassNames}`}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute bg-white inset-0 rounded-[4px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[4px] size-full" src={src} />
      </div>
    </div>
  );
}

function AutoAwesomeBackgroundImage() {
  return (
    <BackgroundImage5>
      <g clipPath="url(#clip0_2009_5131)" id="auto_awesome">
        <g id="Vector"></g>
        <path d={svgPaths.p15377400} fill="var(--fill-0, #373338)" id="Vector_2" />
      </g>
      <defs>
        <clipPath id="clip0_2009_5131">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage5>
  );
}

function InvestorsListContainerBackgroundImage() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="content-stretch flex items-start pl-0 pr-[3px] py-0 relative shrink-0">
        {FEATURED_INVESTORS.map((key, index) => (
          <BackgroundImage6 key={key}>
            {index === 0 ? (
              <ImageBackgroundImage additionalClassNames="size-[14px]" src={DEAL_IMAGES[key]} />
            ) : (
              <BackgroundImage1>
                <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={DEAL_IMAGES[key]} />
              </BackgroundImage1>
            )}
          </BackgroundImage6>
        ))}
      </div>
      <BackgroundImage5>
        <g id="Ellipse Container">
          <circle cx="8.00004" cy="8.00004" fill="var(--fill-0, #7F7582)" id="Ellipse 2301" r="2" />
        </g>
      </BackgroundImage5>
      <div className="content-stretch flex gap-[11px] items-start relative shrink-0">
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
            <p className="leading-[16px]">Eric Schmidt</p>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
            <p className="leading-[16px]">Dustin Moskovitz</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DealCardProps {
  category: string;
  status: 'live' | 'closing' | 'premium';
  title: string;
  description: string;
  image: DealImageKey;
  onClick?: () => void;
}

function DealCard({ category, status, title, description, image, onClick }: DealCardProps) {
  const avatar = DEAL_IMAGES[image];
  const statusConfig = {
    live: {
      text: 'LIVE',
      className: 'bg-white',
      icon: (
        <BackgroundImage5>
          <g id="Frame 2147225751">
            <circle cx="8.00004" cy="8.00004" fill="var(--fill-0, #00B24D)" id="Ellipse 2301" r="2" />
          </g>
        </BackgroundImage5>
      ),
      textColor: 'text-[#00b24d]'
    },
    closing: {
      text: 'CLOSING SOON',
      className: 'bg-[#554d57]',
      icon: null,
      textColor: 'text-[#f0eef0]'
    },
    premium: {
      text: 'PREMIUM',
      className: '',
      icon: null,
      textColor: 'text-[#f0eef0]'
    }
  };

  const config = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className="bg-[#f7f7f8] relative rounded-[12px] shrink-0 w-[374px] cursor-pointer border-2 border-transparent hover:border-purple-200 transition-all group"
    >
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_#e3e3e3]" />
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-end pb-[12px] pt-0 px-[12px] relative w-full">

          <div className="content-stretch flex flex-col h-[69px] items-start justify-center relative shrink-0 w-[239px]">
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start justify-end relative shrink-0">
                <div className="content-stretch flex items-center justify-between pb-0 pt-[3px] px-0 relative shrink-0 w-[249px]">
                  <div className="content-stretch flex items-center justify-center relative shrink-0">
                    <div className="content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[110px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none rounded-[110px]" />
                      <p className="font-sans leading-[16px] not-italic relative shrink-0 text-[#7f7582] text-[12px] text-nowrap text-right">{category}</p>
                    </div>
                  </div>
                  <div className={`content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-bl-[145px] rounded-tl-[145px] shrink-0 ${config.className}`}>
                    {status === 'premium' && (
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-bl-[145px] rounded-tl-[145px] size-full" src={imgBadges} />
                    )}
                    {config.icon}
                    <div className="content-stretch flex items-center justify-center relative shrink-0">
                      <div className={`flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap ${config.textColor}`}>
                        <p className="leading-[16px]">{config.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[4px] shrink-0 w-full">
            <div className="flex flex-col justify-center size-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start justify-center pb-0 pl-[8px] pr-0 pt-[8px] relative w-full">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex h-[32px] items-end justify-between relative shrink-0 w-full">
                    <div className="basis-0 flex flex-col font-sans grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#29272a] text-[20px]">
                      <p className="leading-[28px]">{title}</p>
                    </div>
                    <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[340px] px-[12px] py-[8px] relative rounded-[256px] shrink-0 w-[32px]">
                      <div aria-hidden="true" className="absolute border border-[#f0eef0] border-solid inset-0 pointer-events-none rounded-[256px]" />
                      <div className="content-stretch flex items-center relative shrink-0">
                        <AutoAwesomeBackgroundImage />
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col h-[40px] items-start pl-0 pr-[32px] py-0 relative shrink-0 w-[341px]">
                    <div className="basis-0 flex-col font-sans grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#29272a] text-[14px]">
                      <p className="leading-[20px]">{description}</p>
                    </div>
                  </div>
                </div>

                <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                  <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                        <div className="content-stretch flex items-start relative shrink-0">
                          <div className="content-stretch flex items-center justify-center relative shrink-0">
                            <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#48424a] text-[14px] text-nowrap">
                              <p className="leading-[20px]">Investors</p>
                            </div>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
                          <div className="h-px relative shrink-0 w-[36px]">
                            <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none" />
                          </div>
                          <div className="basis-0 grow h-px min-h-px min-w-px relative shrink-0">
                            <div aria-hidden="true" className="absolute border border-[#e6e4e7] border-solid inset-0 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                      <InvestorsListContainerBackgroundImage />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute h-[88px] left-[20px] top-[-6px] w-[82.422px]">
        <div className="absolute bg-[#c7b8c7] blur-[7.421px] filter h-[51.242px] left-[calc(50%-9.63px)] opacity-50 top-[32.83px] translate-x-[-50%] w-[58.31px]" />
        <div className="absolute left-[calc(50%-5px)] pointer-events-none rounded-[10.766px] size-[72px] top-[0.21px] translate-x-[-50%]">
          <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[10.766px] size-full" src={avatar} />
          <div className="absolute inset-0 shadow-[inset_0px_-3.295px_42.785px_0px_rgba(255,255,255,0.31)]" />
        </div>
      </div>
    </div>
  );
}

interface DealsCardsGridProps {
  onCardClick?: (title: string) => void;
  limit?: number; // Number of deals to show, defaults to 3
}

export function DealsCardsGrid({ onCardClick, limit = 3 }: DealsCardsGridProps) {
  const dealsToShow = DEALS_DATA.slice(0, limit);

  return (
    <div className="flex flex-col gap-6 w-full mb-8">
      <div className="content-start flex flex-wrap gap-[40px_16px] items-start relative shrink-0 w-full">
        {dealsToShow.map((deal) => (
          <DealCard
            key={deal.id}
            category={deal.category}
            status={deal.status}
            title={deal.title}
            description={deal.description}
            image={deal.image}
            onClick={() => onCardClick?.(deal.title)}
          />
        ))}
      </div>

      <button
        onClick={() => onCardClick?.('Show me all deals')}
        className="w-full bg-white border-2 border-[#e6e4e7] rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
      >
        <span className="font-sans text-[#29272a] text-[14px] font-medium group-hover:text-purple-900">
          Show all ({DEALS_DATA.length}) deals
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path d={svgPaths.p19e96800} fill="#7F7582" className="group-hover:fill-purple-900" />
        </svg>
      </button>
    </div>
  );
}
