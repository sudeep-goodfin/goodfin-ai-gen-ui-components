import { cn } from '@/lib/utils';
import { InvestorPost } from './InvestorPost';
import type { InvestorPost as InvestorPostType } from '../types';

interface InvestorTickerProps {
  posts: InvestorPostType[];
  className?: string;
}

export function InvestorTicker({ posts, className }: InvestorTickerProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Post count and disclaimer */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <span className="text-base font-medium text-[#373338]">
            {posts.length} posts
          </span>
        </div>

        <div className="flex gap-3">
          <span className="text-xs font-medium text-[#7f7582] flex-shrink-0">
            Disclaimer
          </span>
          <p className="text-xs text-[#48424a] leading-4">
            This content is for informational purposes only and does not
            constitute financial advice. Insights are gathered from other
            GoodFin investors and should not be considered a recommendation to
            buy or sell any investments.
          </p>
        </div>
      </div>

      {/* Posts list */}
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <InvestorPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
