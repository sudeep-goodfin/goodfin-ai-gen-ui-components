import React from 'react';
import { Sparkles } from 'lucide-react';

// Types for consistent data structure
interface NewsSource {
  id: string;
  name: string;
  logo: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceId: string;
  time: string;
  additionalSourceIds?: string[];
}

interface NewsCategory {
  id: string;
  label: string;
  active?: boolean;
  avatar?: string;
}

interface NewsData {
  categories: NewsCategory[];
  sources: Record<string, NewsSource>;
  articles: {
    hero: NewsArticle;
    featured: NewsArticle[];
    sidebar: NewsArticle[];
  };
}

// News data configuration
const newsData: NewsData = {
  categories: [
    { id: 'top', label: 'Top News', active: true },
    { id: 'spacex', label: 'SpaceX', avatar: 'https://ui-avatars.com/api/?name=SX&background=000000&color=fff&size=64&font-size=0.4' },
    { id: 'stripe', label: 'Stripe', avatar: 'https://ui-avatars.com/api/?name=S&background=635bff&color=fff&size=64&font-size=0.5' },
    { id: 'databricks', label: 'Databricks', avatar: 'https://ui-avatars.com/api/?name=DB&background=ff3621&color=fff&size=64&font-size=0.4' },
  ],

  sources: {
    bloomberg: {
      id: 'bloomberg',
      name: 'Bloomberg',
      logo: 'https://ui-avatars.com/api/?name=B&background=000000&color=fff&size=64&font-size=0.5',
    },
    wsj: {
      id: 'wsj',
      name: 'Wall Street Journal',
      logo: 'https://ui-avatars.com/api/?name=WSJ&background=0274b6&color=fff&size=64&font-size=0.35',
    },
    reuters: {
      id: 'reuters',
      name: 'Reuters',
      logo: 'https://ui-avatars.com/api/?name=R&background=ff8000&color=fff&size=64&font-size=0.5',
    },
    techcrunch: {
      id: 'techcrunch',
      name: 'TechCrunch',
      logo: 'https://ui-avatars.com/api/?name=TC&background=0a9e01&color=fff&size=64&font-size=0.4',
    },
    ft: {
      id: 'ft',
      name: 'Financial Times',
      logo: 'https://ui-avatars.com/api/?name=FT&background=fff1e5&color=000&size=64&font-size=0.4',
    },
  },

  articles: {
    hero: {
      id: 'hero-1',
      title: 'Stripe Reaches $91 Billion Valuation in Secondary Market Trading',
      description: 'The payments giant sees renewed investor interest as fintech sector rebounds, with secondary shares trading at significant premium.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      sourceId: 'bloomberg',
      time: '8 min ago',
    },
    featured: [
      {
        id: 'featured-1',
        title: 'Databricks Closes $10B Funding Round at $62B Valuation',
        description: 'The data analytics company secures one of the largest private funding rounds of 2024, signaling strong enterprise AI demand.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        sourceId: 'wsj',
        additionalSourceIds: ['bloomberg', 'techcrunch'],
        time: '24 min ago',
      },
      {
        id: 'featured-2',
        title: 'SpaceX Starlink Business Valued at $180B in Latest Deal',
        description: 'Satellite internet division attracts premium valuation as subscriber growth accelerates globally.',
        image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=300&fit=crop',
        sourceId: 'reuters',
        time: '38 min ago',
      },
    ],
    sidebar: [
      {
        id: 'sidebar-1',
        title: 'Anduril Industries Nears $14B Valuation in Defense Tech Boom',
        description: 'Defense startup sees surging demand for autonomous systems amid growing geopolitical tensions.',
        image: 'https://images.unsplash.com/photo-1580752300992-559f8e2e1bae?w=200&h=150&fit=crop',
        sourceId: 'bloomberg',
        time: '1 hr ago',
      },
      {
        id: 'sidebar-2',
        title: 'Revolut Seeks $45B Valuation Ahead of Potential 2025 IPO',
        description: 'European fintech giant prepares for public markets with strong revenue growth and expanding user base.',
        image: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=200&h=150&fit=crop',
        sourceId: 'ft',
        time: '2 hr ago',
      },
      {
        id: 'sidebar-3',
        title: 'OpenAI Revenue Hits $4B Annual Run Rate Amid Enterprise Push',
        description: 'AI leader accelerates enterprise sales as ChatGPT adoption expands across Fortune 500 companies.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop',
        sourceId: 'techcrunch',
        time: '3 hr ago',
      },
    ],
  },
};

// Helper to get source info
const getSource = (sourceId: string): NewsSource => newsData.sources[sourceId];

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

// News card component - consistent layout for all sizes
function NewsCard({
  article,
  size = 'medium',
}: {
  article: NewsArticle;
  size?: 'large' | 'medium' | 'small';
}) {
  const source = getSource(article.sourceId);
  const allSourceIds = [article.sourceId, ...(article.additionalSourceIds || [])];
  const hasMultipleSources = allSourceIds.length > 1;

  const imageHeight = {
    large: 'h-[280px] md:h-[320px]',
    medium: 'h-[140px]',
    small: 'h-[80px] w-[106px]',
  }[size];

  const isSmall = size === 'small';

  return (
    <div className={`flex ${isSmall ? 'flex-row gap-4' : 'flex-col gap-3'} group cursor-pointer`}>
      {/* Image with hover Ask AI button */}
      <div className={`${isSmall ? imageHeight : `w-full ${imageHeight}`} rounded-lg overflow-hidden relative shrink-0`}>
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Ask AI button - appears on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-white/20 hover:bg-white text-[#29272a] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          Ask AI
        </button>
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-2 ${isSmall ? 'flex-1' : ''}`}>
        <h3 className={`font-medium text-[#29272a] line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors ${isSmall ? 'text-sm' : 'text-sm'}`}>
          {article.title}
        </h3>

        {!isSmall && (
          <p className="text-xs text-[#48424a] line-clamp-2">
            {article.description}
          </p>
        )}

        {/* Source row */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {hasMultipleSources ? (
              <>
                <div className="flex items-center -space-x-1.5">
                  {allSourceIds.slice(0, 2).map((sourceId) => {
                    const s = getSource(sourceId);
                    return (
                      <img
                        key={sourceId}
                        src={s.logo}
                        alt=""
                        className="w-4 h-4 rounded-full border border-white bg-white object-contain"
                      />
                    );
                  })}
                  {allSourceIds.length > 2 && (
                    <div className="w-4 h-4 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-medium">
                      +{allSourceIds.length - 2}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#7f7582]">
                  {allSourceIds.length} sources
                </span>
              </>
            ) : (
              <>
                <img src={source.logo} alt="" className="w-4 h-4 rounded-full object-contain" />
                <span className="text-xs text-[#7f7582]">{source.name}</span>
              </>
            )}
            <span className="text-xs text-[#7f7582]">•</span>
            <span className="text-xs text-[#7f7582]">{article.time}</span>
          </div>
        </div>
      </div>
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
            {newsData.categories.map((category) => (
              <NewsChip
                key={category.id}
                label={category.label}
                active={category.active}
                icon={category.avatar ? <img src={category.avatar} className="w-4 h-4 rounded-sm object-cover" /> : undefined}
              />
            ))}
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
            <NewsCard article={newsData.articles.hero} size="large" />

            {/* Sub Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsData.articles.featured.map((article) => (
                <NewsCard key={article.id} article={article} size="medium" />
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            {newsData.articles.sidebar.map((article) => (
              <NewsCard key={article.id} article={article} size="small" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
