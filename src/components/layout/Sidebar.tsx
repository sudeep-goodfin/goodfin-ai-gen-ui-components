import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// Types
export type SidebarSection = {
  id: string;
  label: string;
  items: SidebarItem[];
};

export type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  children?: SidebarSubItem[];
};

export type SidebarSubItem = {
  id: string;
  label: string;
};

type SidebarProps = {
  sections: SidebarSection[];
  activeSection?: string;
  activeItem?: string;
  activeSubItem?: string;
  expandedItems?: string[];
  onSectionClick?: (sectionId: string) => void;
  onItemClick?: (sectionId: string, itemId: string) => void;
  onSubItemClick?: (sectionId: string, itemId: string, subItemId: string) => void;
  onToggleExpand?: (itemId: string) => void;
};

export function Sidebar({
  sections,
  activeSection,
  activeItem,
  activeSubItem,
  expandedItems = [],
  onSectionClick,
  onItemClick,
  onSubItemClick,
  onToggleExpand,
}: SidebarProps) {
  return (
    <aside className="w-[280px] flex-shrink-0 border-r border-border h-full overflow-y-auto">
      <div className="py-6 pr-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            {/* Section Header */}
            <button
              onClick={() => onSectionClick?.(section.id)}
              className={cn(
                'w-full text-left px-3 py-1.5 text-sm font-semibold mb-1 rounded-md transition-colors',
                activeSection === section.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {section.label}
            </button>

            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isExpanded = expandedItems.includes(item.id);
                const isActive = activeItem === item.id;
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.id}>
                    {/* Item Button */}
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          onToggleExpand?.(item.id);
                        }
                        onItemClick?.(section.id, item.id);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                        isActive && !activeSubItem
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <span className="w-4 h-4 flex-shrink-0">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
                            {item.badge}
                          </span>
                        )}
                        {hasChildren && (
                          <ChevronRight
                            className={cn(
                              'w-4 h-4 transition-transform',
                              isExpanded && 'rotate-90'
                            )}
                          />
                        )}
                      </span>
                    </button>

                    {/* Sub Items (Variants/Children) */}
                    {hasChildren && isExpanded && (
                      <div className="ml-4 mt-0.5 border-l border-border pl-3 space-y-0.5">
                        {item.children!.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => onSubItemClick?.(section.id, item.id, subItem.id)}
                            className={cn(
                              'w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors',
                              activeSubItem === subItem.id
                                ? 'text-foreground font-medium bg-muted/50'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                            )}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
