import React from 'react';
import { Sparkles } from 'lucide-react';

// Import assets
import imgAvatar from '../../assets/10df166f7198e8da05436d3281063f16e1f07bc1.png';
import imgAvatar1 from '../../assets/1830935ea2c094f22dc1588316bf9f66314f08e4.png';
import imgAvatar2 from '../../assets/b7750590925b5ef18bc762d4295c388d5e60d5ab.png';
import imgLogo from '../../assets/89ff9bd9a3ef0fddbaa7d7445894f1e0838eb847.png';
import imgFrame2147227118 from '../../assets/09a2e0a0a7fcf07ef6185e0499b732f2ad2f46bf.png';
import imgImage from '../../assets/0f341f9d92c1bb1dc422aefe1dfaf4bd1750bfe5.png';
import imgLogo1 from '../../assets/8c08bf17886d2e5eded3ea02d23762fafe2f06d9.png';
import imgLogo2 from '../../assets/021465063bfbaa97baac60fd1ad1fdf8491924d4.png';
import imgFrame2147227120 from '../../assets/fe2e41e4dcf3f8fead730dc807f37215dc7f41ff.png';
import imgImage45 from '../../assets/5ee5084dbd236e72ef086f5c1942df262c85e222.png';
import imgImage2 from '../../assets/9d97ecdfbe1e339c6a3678b65e2303240e4b4253.png';
import imgImage3 from '../../assets/d9d8c1dcb9a6b4962ed33a9f691a396eae17fe68.png';
import imgImage4 from '../../assets/bb659a0a4ede0ada209cf49f1560f4ddc5536152.png';

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
            <NewsChip label="SpaceX" icon={<img src={imgAvatar} className="w-4 h-4 rounded-sm object-cover" />} />
            <NewsChip
              label="Anthropic"
              icon={
                <div className="flex -space-x-1">
                  <img src={imgAvatar} className="w-4 h-4 rounded-sm object-cover z-20 ring-1 ring-white" />
                  <img src={imgAvatar1} className="w-4 h-4 rounded-sm object-cover z-10 ring-1 ring-white" />
                </div>
              }
            />
            <NewsChip label="Perplexity" icon={<img src={imgAvatar1} className="w-4 h-4 rounded-sm object-cover" />} />
            <NewsChip label="OpenAI" icon={<img src={imgAvatar2} className="w-4 h-4 rounded-sm object-cover" />} />
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
                src={imgFrame2147227118}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end items-start gap-3">
                <h3 className="text-white text-xl md:text-2xl font-medium leading-tight line-clamp-3">
                  SpaceX Propels Humanity to the Stars with Starship's Historic Orbital Flight
                </h3>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <img src={imgLogo} className="w-5 h-5 rounded-full bg-white p-0.5" />
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
                    src={imgImage}
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
                      <img src={imgLogo1} className="w-5 h-5 rounded-full border border-white bg-white object-contain" />
                      <img src={imgLogo2} className="w-5 h-5 rounded-full border border-white bg-white object-contain" />
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
                    src={imgFrame2147227120}
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
              image={imgImage2}
            />
            <NewsListItem
              title="SpaceX completes final test ahead of a crucial Starship launch"
              source="CBS News"
              time="32 min ago"
              image={imgImage3}
              sourceLogo={imgImage45}
            />
            <NewsListItem
              title="SpaceX launches 28 Starlink satellites on Falcon 9 with Starship"
              source="Fox News"
              time="45 min ago"
              image={imgImage45}
            />
            <NewsListItem
              title="SpaceX launches 28 Starlink satellites on Falcon 9 with Starship"
              source="Euro News"
              time="50 min ago"
              image={imgImage4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
