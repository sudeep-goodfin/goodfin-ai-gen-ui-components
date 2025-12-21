import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import type { InvestorPost as InvestorPostType } from '../types';

interface InvestorPostProps {
  post: InvestorPostType;
  className?: string;
}

export function InvestorPost({ post, className }: InvestorPostProps) {
  return (
    <div
      className={cn(
        'bg-white rounded p-4 flex flex-col gap-2',
        className
      )}
    >
      {/* Header with avatar, name, title, timestamp */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: post.author.avatarColor }}
        >
          <span className="text-sm font-semibold text-white">
            {post.author.initial}
          </span>
        </div>

        {/* Name and title */}
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[#29272a]">
            {post.author.name}
          </span>
          <span className="text-xs text-[#48424a]">{post.author.title}</span>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-[#48424a]">{post.timestamp}</span>
      </div>

      {/* Content */}
      <div className="pl-10">
        <p className="text-sm leading-5 text-[#29272a]">{post.content}</p>
      </div>

      {/* Actions (only for owner) */}
      {post.isOwner && (
        <div className="pl-10 pt-2 flex items-center justify-end gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#48424a] hover:bg-[#f7f7f8] rounded-lg transition-colors">
            <Pencil className="w-3 h-3" />
            Edit
          </button>
          <button className="flex items-center justify-center p-2 text-[#48424a] hover:bg-[#f7f7f8] rounded-lg transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
