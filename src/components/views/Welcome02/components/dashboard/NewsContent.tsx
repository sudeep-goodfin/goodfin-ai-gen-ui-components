import React, { useState } from 'react';
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
  categoryId: string;
}

interface NewsCategory {
  id: string;
  label: string;
  avatar?: string;
}

interface NewsData {
  categories: NewsCategory[];
  sources: Record<string, NewsSource>;
  articles: NewsArticle[];
}

// News data configuration
const newsData: NewsData = {
  categories: [
    { id: 'top', label: 'Top News' },
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

  articles: [
    // Top News / Stripe articles
    {
      id: 'stripe-1',
      categoryId: 'stripe',
      title: 'Stripe Reaches $91 Billion Valuation in Secondary Market Trading',
      description: 'The payments giant sees renewed investor interest as fintech sector rebounds, with secondary shares trading at significant premium.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      sourceId: 'bloomberg',
      time: '8 min ago',
    },
    {
      id: 'stripe-2',
      categoryId: 'stripe',
      title: 'Stripe Expands Into Banking Services for Enterprise Clients',
      description: 'The fintech giant launches new treasury management tools targeting Fortune 500 companies.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80',
      sourceId: 'wsj',
      additionalSourceIds: ['bloomberg', 'techcrunch'],
      time: '24 min ago',
    },
    {
      id: 'stripe-3',
      categoryId: 'stripe',
      title: 'Stripe Climate Reaches $1B in Carbon Removal Commitments',
      description: 'Corporate sustainability initiative sees unprecedented growth as more companies pledge carbon neutrality.',
      image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80',
      sourceId: 'reuters',
      time: '38 min ago',
    },
    {
      id: 'stripe-4',
      categoryId: 'stripe',
      title: 'Stripe Partners with Major Banks for Instant Payouts',
      description: 'New partnership enables real-time payments for gig economy workers globally.',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=80',
      sourceId: 'bloomberg',
      time: '1 hr ago',
    },
    {
      id: 'stripe-5',
      categoryId: 'stripe',
      title: 'Stripe Launches AI-Powered Fraud Detection System',
      description: 'Machine learning system reduces fraudulent transactions by 40% in early tests.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
      sourceId: 'techcrunch',
      time: '2 hr ago',
    },
    {
      id: 'stripe-6',
      categoryId: 'stripe',
      title: 'Stripe IPO Plans Resurface Amid Market Recovery',
      description: 'Company reportedly considering 2025 public listing as tech valuations stabilize.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
      sourceId: 'ft',
      time: '3 hr ago',
    },

    // SpaceX articles
    {
      id: 'spacex-1',
      categoryId: 'spacex',
      title: 'SpaceX Starlink Business Valued at $180B in Latest Deal',
      description: 'Satellite internet division attracts premium valuation as subscriber growth accelerates globally.',
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
      sourceId: 'reuters',
      time: '15 min ago',
    },
    {
      id: 'spacex-2',
      categoryId: 'spacex',
      title: 'SpaceX Completes 100th Successful Falcon 9 Landing',
      description: 'Milestone achievement demonstrates reliability of reusable rocket technology.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&q=80',
      sourceId: 'bloomberg',
      additionalSourceIds: ['reuters'],
      time: '45 min ago',
    },
    {
      id: 'spacex-3',
      categoryId: 'spacex',
      title: 'Starship Orbital Test Flight Achieves Major Milestones',
      description: 'Latest test demonstrates successful stage separation and controlled descent capabilities.',
      image: 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=600&q=80',
      sourceId: 'techcrunch',
      time: '1 hr ago',
    },
    {
      id: 'spacex-4',
      categoryId: 'spacex',
      title: 'SpaceX Signs $3B Contract for Lunar Gateway Resupply',
      description: 'NASA awards major contract for space station supply missions through 2030.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80',
      sourceId: 'wsj',
      time: '2 hr ago',
    },
    {
      id: 'spacex-5',
      categoryId: 'spacex',
      title: 'Starlink Direct-to-Cell Service Begins Beta Testing',
      description: 'Satellite-to-smartphone connectivity enters limited testing with T-Mobile partnership.',
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&q=80',
      sourceId: 'bloomberg',
      time: '3 hr ago',
    },
    {
      id: 'spacex-6',
      categoryId: 'spacex',
      title: 'SpaceX Prepares for First Private Moon Landing Mission',
      description: 'dearMoon project enters final preparation phase for civilian lunar flyby.',
      image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&q=80',
      sourceId: 'ft',
      time: '4 hr ago',
    },

    // Databricks articles
    {
      id: 'databricks-1',
      categoryId: 'databricks',
      title: 'Databricks Closes $10B Funding Round at $62B Valuation',
      description: 'The data analytics company secures one of the largest private funding rounds of 2024, signaling strong enterprise AI demand.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      sourceId: 'wsj',
      additionalSourceIds: ['bloomberg', 'techcrunch'],
      time: '20 min ago',
    },
    {
      id: 'databricks-2',
      categoryId: 'databricks',
      title: 'Databricks Launches Open Source AI Model Suite',
      description: 'New DBRX models challenge OpenAI and Anthropic in enterprise AI market.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
      sourceId: 'techcrunch',
      time: '1 hr ago',
    },
    {
      id: 'databricks-3',
      categoryId: 'databricks',
      title: 'Major Banks Adopt Databricks for Real-Time Risk Analytics',
      description: 'Financial sector adoption accelerates as institutions modernize data infrastructure.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      sourceId: 'bloomberg',
      time: '2 hr ago',
    },
    {
      id: 'databricks-4',
      categoryId: 'databricks',
      title: 'Databricks Acquires AI Startup for $1.3B',
      description: 'Strategic acquisition expands machine learning capabilities and talent pool.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
      sourceId: 'reuters',
      time: '3 hr ago',
    },
    {
      id: 'databricks-5',
      categoryId: 'databricks',
      title: 'Databricks Revenue Surges 60% Year-Over-Year',
      description: 'Strong enterprise demand drives growth as companies invest in data lakehouse architecture.',
      image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&q=80',
      sourceId: 'ft',
      time: '4 hr ago',
    },
    {
      id: 'databricks-6',
      categoryId: 'databricks',
      title: 'Databricks Partners with AWS for Enhanced Integration',
      description: 'Deeper cloud partnership simplifies enterprise data management workflows.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
      sourceId: 'wsj',
      time: '5 hr ago',
    },

    // General Top News (mixed)
    {
      id: 'top-1',
      categoryId: 'top',
      title: 'Anduril Industries Nears $14B Valuation in Defense Tech Boom',
      description: 'Defense startup sees surging demand for autonomous systems amid growing geopolitical tensions.',
      image: 'https://images.unsplash.com/photo-1580752300992-559f8e2e1bae?w=400&q=80',
      sourceId: 'bloomberg',
      time: '1 hr ago',
    },
    {
      id: 'top-2',
      categoryId: 'top',
      title: 'Revolut Seeks $45B Valuation Ahead of Potential 2025 IPO',
      description: 'European fintech giant prepares for public markets with strong revenue growth and expanding user base.',
      image: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=400&q=80',
      sourceId: 'ft',
      time: '2 hr ago',
    },
    {
      id: 'top-3',
      categoryId: 'top',
      title: 'OpenAI Revenue Hits $4B Annual Run Rate Amid Enterprise Push',
      description: 'AI leader accelerates enterprise sales as ChatGPT adoption expands across Fortune 500 companies.',
      image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&q=80',
      sourceId: 'techcrunch',
      time: '3 hr ago',
    },
  ],
};

// Helper to get source info
const getSource = (sourceId: string): NewsSource => newsData.sources[sourceId];

// Get articles for a category
const getArticlesForCategory = (categoryId: string): NewsArticle[] => {
  if (categoryId === 'top') {
    // For "Top News", show a mix of all articles
    return [
      newsData.articles.find(a => a.id === 'stripe-1')!,
      newsData.articles.find(a => a.id === 'databricks-1')!,
      newsData.articles.find(a => a.id === 'spacex-1')!,
      ...newsData.articles.filter(a => a.categoryId === 'top'),
    ];
  }
  return newsData.articles.filter(a => a.categoryId === categoryId);
};

// Reusable chip component
function NewsChip({
  icon,
  label,
  active = false,
  onClick
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
        active ? 'bg-white border-[#e6e4e7] shadow-sm' : 'bg-transparent border-transparent hover:bg-black/5'
      }`}
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <span className={`text-xs font-medium ${active ? 'text-[#29272a]' : 'text-[#7f7582]'}`}>{label}</span>
    </button>
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
      <div className={`${isSmall ? imageHeight : `w-full ${imageHeight}`} rounded-lg overflow-hidden relative shrink-0 bg-[#f0eef0]`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
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
                        alt={s.name}
                        className="w-4 h-4 rounded-full border border-white bg-white object-cover"
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
                <img src={source.logo} alt={source.name} className="w-4 h-4 rounded-full object-cover" />
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
  const [activeCategory, setActiveCategory] = useState('top');

  const articles = getArticlesForCategory(activeCategory);
  const heroArticle = articles[0];
  const featuredArticles = articles.slice(1, 3);
  const sidebarArticles = articles.slice(3, 6);

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      {/* Header / Chips */}
      <div className="w-full flex flex-col gap-3">
        <div className="w-full bg-[#f0eef0] rounded-lg p-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max">
            {newsData.categories.map((category) => (
              <NewsChip
                key={category.id}
                label={category.label}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                icon={category.avatar ? <img src={category.avatar} alt="" className="w-4 h-4 rounded-sm object-cover" /> : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-[#48424a] uppercase tracking-tight text-center md:text-left">
          {activeCategory === 'top' ? 'Top Private Markets' : newsData.categories.find(c => c.id === activeCategory)?.label + ' News'}
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Column (Hero + Sub) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Hero Card */}
            {heroArticle && <NewsCard article={heroArticle} size="large" />}

            {/* Sub Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredArticles.map((article) => (
                <NewsCard key={article.id} article={article} size="medium" />
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            {sidebarArticles.map((article) => (
              <NewsCard key={article.id} article={article} size="small" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
