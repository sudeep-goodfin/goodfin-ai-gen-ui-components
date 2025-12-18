import React, { useState } from 'react';
import svgPaths from '../../imports/svg-lycxg20new';
import imgImage1 from "../../assets/avatar-spacex.png";
import imgAvatar2 from "../../assets/avatar-anthropic.png";
import imgAvatar3 from "../../assets/avatar-anthropic-alt.png";
import imgBadges from "../../assets/badges-deals.png";
import imgImage from "../../assets/deal-stripe.png";
import imgImage3 from "../../assets/deal-anduril.png";
import imgImage4 from "../../assets/deal-databricks.png";
import imgImage5 from "../../assets/deal-discord.png";

// Reuse background image components from DealsCardsGrid
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

function ImageBackgroundImage({ additionalClassNames = "" }: { additionalClassNames?: string }) {
  return (
    <div className={`relative rounded-[4px] shrink-0 ${additionalClassNames}`}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute bg-white inset-0 rounded-[4px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[4px] size-full" src={imgImage3} />
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
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[#29272a] text-[12px] text-nowrap">
            <p className="leading-[16px]">Erice Schmidt</p>
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
  avatar: string;
  onClick?: () => void;
}

function DealCard({ category, status, title, description, avatar, onClick }: DealCardProps) {
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
      className="bg-[#f7f7f8] relative rounded-[12px] shrink-0 w-[374px] cursor-pointer hover:border-purple-200 hover:border-2 transition-all group"
    >
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_#e3e3e3]" />
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-end pb-[12px] pt-0 px-[12px] relative w-full">

          {/* Header with Category and Status */}
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

          {/* Content */}
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

                {/* Footer */}
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

      {/* Avatar */}
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

type TabType = 'pre-ipo' | 'featured' | 'venture-funds' | 'early-stage' | 'private-equity';
type FilterType = 'all' | 'featured' | 'new' | 'closing-soon';

interface Deal {
  category: string;
  status: 'live' | 'closing' | 'premium';
  title: string;
  description: string;
  avatar: string;
  segment: TabType;
  filter: FilterType[];
}

export function AllDealsView({ onCardClick }: { onCardClick?: (title: string) => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('pre-ipo');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const allDeals: Deal[] = [
    // Pre-IPO
    {
      category: 'SPACE TECH',
      status: 'live',
      title: 'SpaceX',
      description: 'Space travel with reusable rockets and interplanetary ambitions',
      avatar: imgImage1,
      segment: 'pre-ipo',
      filter: ['all', 'featured']
    },
    {
      category: 'FINTECH',
      status: 'closing',
      title: 'Stripe',
      description: 'Online payment processing for internet businesses with global reach',
      avatar: imgAvatar2,
      segment: 'pre-ipo',
      filter: ['all', 'closing-soon']
    },
    {
      category: 'E-COMMERCE',
      status: 'live',
      title: 'Instacart',
      description: 'Online grocery delivery and pickup service marketplace',
      avatar: imgImage1,
      segment: 'pre-ipo',
      filter: ['all', 'featured']
    },
    // Featured
    {
      category: 'AI',
      status: 'premium',
      title: 'Anthropic',
      description: 'AI safety and research company building steerable AI systems',
      avatar: imgAvatar3,
      segment: 'featured',
      filter: ['all', 'featured']
    },
    {
      category: 'AI',
      status: 'closing',
      title: 'OpenAI',
      description: 'Leading AI research and deployment company behind ChatGPT and GPT-4',
      avatar: imgAvatar3,
      segment: 'featured',
      filter: ['all', 'featured', 'closing-soon']
    },
    {
      category: 'DESIGN TOOLS',
      status: 'premium',
      title: 'Figma',
      description: 'Collaborative interface design tool with real-time collaboration',
      avatar: imgImage1,
      segment: 'featured',
      filter: ['all', 'featured']
    },
    // Venture Funds
    {
      category: 'VENTURE CAPITAL',
      status: 'live',
      title: 'Andreessen Horowitz Fund VIII',
      description: 'Late-stage venture fund focused on technology companies',
      avatar: imgAvatar2,
      segment: 'venture-funds',
      filter: ['all', 'new']
    },
    {
      category: 'VENTURE CAPITAL',
      status: 'live',
      title: 'Sequoia Capital Growth Fund',
      description: 'Growth stage venture fund investing in established startups',
      avatar: imgAvatar3,
      segment: 'venture-funds',
      filter: ['all', 'featured']
    },
    {
      category: 'VENTURE CAPITAL',
      status: 'closing',
      title: 'Founders Fund VII',
      description: 'Multi-stage venture fund backing bold entrepreneurs',
      avatar: imgImage1,
      segment: 'venture-funds',
      filter: ['all', 'closing-soon']
    },
    // Early-Stage
    {
      category: 'ENTERPRISE SaaS',
      status: 'live',
      title: 'Databricks',
      description: 'Unified analytics platform for data engineering and machine learning',
      avatar: imgImage1,
      segment: 'early-stage',
      filter: ['all', 'new']
    },
    {
      category: 'FINTECH',
      status: 'live',
      title: 'Plaid',
      description: 'Financial services API platform enabling apps to connect with bank accounts',
      avatar: imgAvatar2,
      segment: 'early-stage',
      filter: ['all', 'new']
    },
    {
      category: 'COMMUNICATION',
      status: 'live',
      title: 'Discord',
      description: 'Voice, video and text communication platform for communities',
      avatar: imgAvatar2,
      segment: 'early-stage',
      filter: ['all', 'featured']
    },
    // Private Equity
    {
      category: 'INFRASTRUCTURE',
      status: 'closing',
      title: 'Cloudflare',
      description: 'Web infrastructure and security company protecting millions of sites',
      avatar: imgAvatar3,
      segment: 'private-equity',
      filter: ['all', 'closing-soon']
    },
    {
      category: 'BIOTECH',
      status: 'closing',
      title: 'Ginkgo Bioworks',
      description: 'Biological engineering company programming cells for various applications',
      avatar: imgImage1,
      segment: 'private-equity',
      filter: ['all', 'new']
    },
    {
      category: 'AUTOMOTIVE',
      status: 'premium',
      title: 'Rivian',
      description: 'Electric vehicle manufacturer focused on adventure-oriented trucks and SUVs',
      avatar: imgAvatar2,
      segment: 'private-equity',
      filter: ['all', 'featured']
    }
  ];

  const tabs = [
    { id: 'pre-ipo' as TabType, label: 'Pre-IPO' },
    { id: 'featured' as TabType, label: 'Featured' },
    { id: 'venture-funds' as TabType, label: 'Venture Funds' },
    { id: 'early-stage' as TabType, label: 'Early-Stage Startups' },
    { id: 'private-equity' as TabType, label: 'Private Equity Funds' }
  ];

  const filters = [
    { id: 'all' as FilterType, label: 'All' },
    { id: 'featured' as FilterType, label: 'Featured' },
    { id: 'new' as FilterType, label: 'New' },
    { id: 'closing-soon' as FilterType, label: 'Closing Soon' }
  ];

  const filteredDeals = allDeals.filter(
    deal => deal.segment === activeTab && deal.filter.includes(activeFilter)
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tabs */}
      <div className="content-stretch flex items-center relative shrink-0 w-full border-b border-[#e6e4e7]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveFilter('all');
            }}
            className={`content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0 ${
              activeTab === tab.id ? 'border-b-[2.5px] border-[#373338]' : 'border-b-[1.5px] border-[#e6e4e7]'
            }`}
          >
            <div className={`flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap ${
              activeTab === tab.id ? 'text-[#29272a]' : 'text-[#48424a]'
            }`}>
              <p className="leading-[20px]">{tab.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-[8px] items-center relative shrink-0">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[24px] shrink-0 transition-all ${
              activeFilter === filter.id
                ? 'bg-[#7f7582]'
                : 'border-[0.8px] border-[rgba(0,0,0,0.09)] border-solid hover:bg-gray-50'
            }`}
          >
            <div className={`flex flex-col font-sans justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap ${
              activeFilter === filter.id ? 'text-white' : 'text-[#7f7582]'
            }`}>
              <p className="leading-[16px]">{filter.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="content-start flex flex-wrap gap-[40px_16px] items-start relative shrink-0 w-full">
        {filteredDeals.map((deal, index) => (
          <DealCard
            key={index}
            category={deal.category}
            status={deal.status}
            title={deal.title}
            description={deal.description}
            avatar={deal.avatar}
            onClick={() => onCardClick?.(deal.title)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[#7f7582] text-[16px] font-sans">
            No deals found in this category
          </p>
        </div>
      )}
    </div>
  );
}
