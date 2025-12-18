import React from 'react';
import { Sparkles } from 'lucide-react';

// Import assets with new named files
import imgAvatarSpaceX from '../../assets/avatar-spacex.png';
import imgAvatarAnthropic from '../../assets/avatar-anthropic.png';
import imgAvatarOpenAI from '../../assets/avatar-openai.png';
import imgLogoFox from '../../assets/logo-fox-news.png';
import imgLogoBBC from '../../assets/logo-bbc-news.png';
import imgLogoCBS from '../../assets/logo-cbs-news.png';
import imgNewsHero from '../../assets/news-hero-spacex.png';
import imgNewsCard1 from '../../assets/news-card-spacex.png';
import imgNewsCard2 from '../../assets/news-card-spacex-2.png';
import imgNewsThumbnail1 from '../../assets/news-thumbnail-1.png';
import imgNewsThumbnail2 from '../../assets/news-thumbnail-2.png';
import imgNewsThumbnail3 from '../../assets/news-thumbnail-3.png';

// Reusable chip component
function NewsChip({ icon, label, active = false }: { icon?: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
        active ? 'bg-white border-[#e6e4e7] shadow-sm' : 'bg-transparent border-transparent hover:bg-black/5'
      }`}
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <span className={`text-xs font-medium ${active ? 'text-[#29272a]' : 'text-[#7f7582]'}`}>{label}</span>
    </div>
  );
}

// Reusable list item component
function NewsListItem({
  title,
  source,
  time,
  image,
  sourceLogo,
}: {
  title: string;
  source: string;
  time: string;
  image?: string;
  sourceLogo?: string;
}) {
  return (
    <div className="flex gap-4 items-start w-full group cursor-pointer">
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-sm font-medium text-[#29272a] line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-[#7f7582]">
          <div className="flex items-center gap-1.5">
            {sourceLogo && <img src={sourceLogo} alt="" className="w-4 h-4 object-contain" />}
            <span>{source}</span>
          </div>
          <span>{time}</span>
        </div>
      </div>
      {image && (
        <div className="w-[106px] h-[80px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <img src={image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
    </div>
  );
}

export function NewsContent() {
  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      {/* Header / Chips */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-xs font-medium text-[#7f7582] uppercase tracking-wider text-center w-full">NEWS</div>
        <div className="w-full bg-[#f0eef0] rounded-lg p-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max">
            <NewsChip label="Top News" active />
            <NewsChip label="SpaceX" icon={<img src={imgAvatarSpaceX} className="w-4 h-4 rounded-sm object-cover" />} />
            <NewsChip
              label="Anthropic"
              icon={
                <div className="flex -space-x-1">
                  <img src={imgAvatarAnthropic} className="w-4 h-4 rounded-sm object-cover z-20 ring-1 ring-white" />
                </div>
              }
            />
            <NewsChip label="OpenAI" icon={<img src={imgAvatarOpenAI} className="w-4 h-4 rounded-sm object-cover" />} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-[#48424a] uppercase tracking-tight text-center md:text-left">
          Top Private Markets
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Column (Hero + Sub) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Hero Card */}
            <div className="relative w-full h-[280px] md:h-[320px] rounded-xl overflow-hidden group cursor-pointer">
              <img
                src={imgNewsHero}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end items-start gap-3">
                <h3 className="text-white text-xl md:text-2xl font-medium leading-tight line-clamp-3">
                  SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight
                </h3>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <img src={imgLogoFox} className="w-5 h-5 rounded-full bg-white p-0.5" />
                    <span>Fox News</span>
                    <span className="opacity-60">•</span>
                    <span>12 min ago</span>
                  </div>

                  <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ask AI
                  </button>
                </div>
              </div>
            </div>

            {/* Sub Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="flex flex-col gap-3 group cursor-pointer">
                <div className="h-[140px] rounded-lg overflow-hidden relative">
                  <img
                    src={imgNewsCard1}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-[#3e3232] line-clamp-2 group-hover:text-purple-700">
                    SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight
                  </h4>
                  <p className="text-xs text-[#48424a] line-clamp-2">
                    SpaceX's Starship has successfully completed its inaugural orbital flight, marking a significant
                    milestone.
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center -space-x-1.5">
                      <img src={imgLogoBBC} className="w-5 h-5 rounded-full border border-white bg-white object-contain" />
                      <img src={imgLogoCBS} className="w-5 h-5 rounded-full border border-white bg-white object-contain" />
                      <div className="w-5 h-5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-medium z-10">
                        +3
                      </div>
                      <span className="text-xs text-[#7f7582] ml-3">Sources (5)</span>
                    </div>
                    <button className="p-1.5 rounded-full border hover:bg-gray-50 text-[#373338]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col gap-3 group cursor-pointer">
                <div className="h-[140px] rounded-lg overflow-hidden relative">
                  <img
                    src={imgNewsCard2}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white text-sm font-medium line-clamp-2">
                      SpaceX Propels Humanity to the Stars
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7f7582]">
                  <div className="flex items-center gap-1.5">
                    <span>CBS News</span>
                    <span>•</span>
                    <span>12 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            <NewsListItem
              title="SpaceX loses the upper stage (ship) after catching its booster"
              source="BBC News"
              time="22 min ago"
              image={imgNewsThumbnail1}
            />
            <NewsListItem
              title="SpaceX completes final test ahead of a crucial Starship launch"
              source="CBS News"
              time="32 min ago"
              image={imgNewsThumbnail2}
              sourceLogo={imgLogoCBS}
            />
            <NewsListItem
              title="SpaceX launches 28 Starlink satellites on Falcon 9 with Starship"
              source="Fox News"
              time="45 min ago"
              image={imgNewsThumbnail3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
