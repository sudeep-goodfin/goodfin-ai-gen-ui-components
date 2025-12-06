import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
type AttachmentCardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  icon?: 'document' | 'pdf';
};
export function AttachmentCard({
  title,
  subtitle = 'PDF Document',
  href = '#'
}: AttachmentCardProps) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer" aria-label={`Open ${title}`}>
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
        <FileText className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" aria-hidden="true" />
    </a>;
}