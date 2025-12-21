import { cn } from '@/lib/utils';
import type { Tab, TabId } from '../types';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) {
  return (
    <div className={cn('flex items-center gap-6 border-b border-[#e6e4e7]', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-[#373338]'
              : 'text-[#7f7582] hover:text-[#48424a]'
          )}
        >
          {tab.isNew && (
            <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wide font-semibold bg-[#9b929e] text-white rounded-sm">
              New
            </span>
          )}
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#373338]" />
          )}
        </button>
      ))}
    </div>
  );
}
