import React, { useEffect } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ChevronRight, X } from 'lucide-react';
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
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
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
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  onSectionClick,
  onItemClick,
  onSubItemClick,
  onToggleExpand,
}: SidebarProps) {
  // Close sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sidebarContent = (
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
                        } else {
                          onClose?.(); // Close mobile sidebar when selecting item without children
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
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted-foreground text-background font-medium">
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
                            onClick={() => {
                              onSubItemClick?.(section.id, item.id, subItem.id);
                              onClose?.(); // Close mobile sidebar on selection
                            }}
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
  );

  return (
    <>
      {/* Desktop Sidebar - collapsible on lg+ */}
      <aside
        className={cn(
          "hidden lg:flex flex-shrink-0 border-r border-border h-full bg-background transition-all duration-200",
          isCollapsed ? "w-0 overflow-hidden border-r-0" : "w-[280px]"
        )}
      >
        <ScrollAreaPrimitive.Root className="relative overflow-hidden w-full h-full">
          <ScrollAreaPrimitive.Viewport className="w-full h-full">
            {sidebarContent}
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            orientation="vertical"
            className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
          >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground/50 transition-colors" />
          </ScrollAreaPrimitive.Scrollbar>
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      </aside>

      {/* Mobile Sidebar - overlay */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[280px] bg-background border-r border-border lg:hidden flex flex-col',
          'transform transition-transform duration-200 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <span className="font-semibold text-foreground">Navigation</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ScrollAreaPrimitive.Root className="relative overflow-hidden flex-1">
          <ScrollAreaPrimitive.Viewport className="w-full h-full">
            {sidebarContent}
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            orientation="vertical"
            className="flex w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
          >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground/50 transition-colors" />
          </ScrollAreaPrimitive.Scrollbar>
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      </aside>
    </>
  );
}
