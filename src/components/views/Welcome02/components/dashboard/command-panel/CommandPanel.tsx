import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Recipe, Context, ViewType, PanelMode } from './types';
import { RECIPES, CONTEXTS, NAVIGATION_CARDS, VIEW_TITLES, COLOR_CLASSES } from './recipes-data';

interface CommandPanelProps {
  isOpen: boolean;
  mode: PanelMode;
  searchQuery: string;
  onClose: () => void;
  onRecipeSelect: (recipe: Recipe) => void;
  onContextSelect: (context: Context) => void;
  onClearSearchQuery: () => void;
}

export function CommandPanel({
  isOpen,
  mode,
  searchQuery,
  onClose,
  onRecipeSelect,
  onContextSelect,
  onClearSearchQuery,
}: CommandPanelProps) {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter recipes based on search query
  const filteredRecipes = RECIPES.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter contexts based on search query
  const filteredContexts = CONTEXTS.filter(
    (context) =>
      context.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      context.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter navigation cards based on search query
  const filteredNavigationCards = NAVIGATION_CARDS.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current items for keyboard navigation
  const getCurrentItems = () => {
    if (mode === 'contexts') return filteredContexts;
    if (currentView === 'home') return filteredNavigationCards;
    if (currentView === 'prompt-packs') return filteredRecipes;
    return [];
  };

  const currentItems = getCurrentItems();
  const itemsLength = currentItems.length;

  // Reset view and selection when panel opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView('home');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selected index when view changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [currentView]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(itemsLength, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(itemsLength, 1)) % Math.max(itemsLength, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleEnterKey();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleEscapeKey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentView, selectedIndex, itemsLength, mode]);

  const handleEnterKey = () => {
    if (itemsLength === 0) return;

    // For contexts mode (@), directly select the item
    if (mode === 'contexts') {
      onContextSelect(filteredContexts[selectedIndex]);
    }
    // For recipes mode (/), handle two-level navigation
    else if (currentView === 'home') {
      const selectedCard = filteredNavigationCards[selectedIndex];
      setCurrentView(selectedCard.view);
      onClearSearchQuery();
    } else if (currentView === 'prompt-packs') {
      onRecipeSelect(filteredRecipes[selectedIndex]);
    }
  };

  const handleEscapeKey = () => {
    if (currentView !== 'home' && mode === 'recipes') {
      setCurrentView('home');
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  const handleNavigationCardClick = (view: ViewType) => {
    setCurrentView(view);
    onClearSearchQuery();
  };

  const getTitle = () => {
    if (mode === 'contexts') {
      return VIEW_TITLES.contexts;
    }
    return VIEW_TITLES[currentView] || 'Prompts';
  };

  const showBackButton = currentView !== 'home' && mode === 'recipes';

  // Group recipes by category
  const groupedRecipes = filteredRecipes.reduce((acc, recipe) => {
    if (!acc[recipe.category]) {
      acc[recipe.category] = [];
    }
    acc[recipe.category].push(recipe);
    return acc;
  }, {} as Record<string, Recipe[]>);

  if (!isOpen) return null;

  return (
    <div
      className="absolute bottom-full left-0 right-0 mb-2 z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      style={{
        animation: 'panelSlideUp 0.2s ease-out',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 sm:px-6 pb-2 sm:pb-3 pt-3 sm:pt-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center rounded-lg p-0.5 sm:p-1 hover:bg-accent transition-colors -ml-1"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <h2 className="text-sm font-semibold text-foreground">{getTitle()}</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 sm:p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="custom-scrollbar max-h-[350px] sm:max-h-[450px] overflow-y-auto">
        {/* Home view with navigation cards (recipes mode only) */}
        {currentView === 'home' && mode === 'recipes' && (
          <div className="space-y-0.5 px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-1.5 sm:pt-2">
            {filteredNavigationCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleNavigationCardClick(card.view)}
                className={cn(
                  'flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-left transition-colors will-change-transform',
                  index === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'
                )}
                style={{
                  animation: `itemFadeIn 0.25s ease-out ${index * 0.04}s both`,
                }}
              >
                {/* Icon */}
                <div className="flex shrink-0 items-center justify-center [&>svg]:size-4 text-muted-foreground">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground">
                    {card.title}
                  </h4>
                  <p className="truncate text-[10px] sm:text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>

                {/* Chevron */}
                <div className="flex shrink-0 items-center justify-center text-muted-foreground">
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Prompt packs view (recipes mode) */}
        {currentView === 'prompt-packs' && mode === 'recipes' && (
          <div className="space-y-6 px-4 pb-4 pt-2">
            {filteredRecipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <p className="text-sm text-muted-foreground">No prompts found</p>
                <p className="mt-1 text-xs text-muted-foreground">Try a different search term</p>
              </div>
            ) : (
              Object.entries(groupedRecipes).map(([category, categoryRecipes]) => {
                const categoryStartIndex = filteredRecipes.findIndex((r) => r.category === category);

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
                      {category}
                    </h3>

                    {/* Recipes in this category */}
                    <div className="space-y-1">
                      {categoryRecipes.map((recipe, indexInCategory) => {
                        const globalIndex = categoryStartIndex + indexInCategory;
                        return (
                          <button
                            key={recipe.id}
                            onClick={() => onRecipeSelect(recipe)}
                            className={cn(
                              'flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-left transition-colors will-change-transform',
                              globalIndex === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'
                            )}
                            style={{
                              animation: `itemFadeIn 0.2s ease-out ${indexInCategory * 0.025}s both`,
                            }}
                          >
                            {/* Icon */}
                            <div className={cn('flex shrink-0 items-center justify-center [&>svg]:size-4', COLOR_CLASSES[recipe.color])}>
                              {recipe.icon}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs sm:text-sm font-medium text-foreground">
                                {recipe.name}
                              </h4>
                              <p className="truncate text-[10px] sm:text-xs text-muted-foreground">
                                {recipe.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Contexts view (for @ trigger) */}
        {mode === 'contexts' && (
          <div className="space-y-1 px-4 pb-4 pt-2">
            {filteredContexts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <p className="text-sm text-muted-foreground">No contexts found</p>
                <p className="mt-1 text-xs text-muted-foreground">Try a different search term</p>
              </div>
            ) : (
              filteredContexts.map((context, index) => (
                <button
                  key={context.id}
                  onClick={() => onContextSelect(context)}
                  className={cn(
                    'flex w-full items-center gap-2 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-left transition-colors will-change-transform',
                    index === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'
                  )}
                  style={{
                    animation: `itemFadeIn 0.2s ease-out ${index * 0.025}s both`,
                  }}
                >
                  {/* Icon */}
                  <div className={cn('flex shrink-0 items-center justify-center [&>svg]:size-4', COLOR_CLASSES[context.color])}>
                    {context.icon}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-medium text-foreground">
                      {context.name}
                    </h4>
                    <p className="truncate text-[10px] sm:text-xs text-muted-foreground">
                      {context.description}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes panelSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 600px;
          }
        }
        @keyframes itemFadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
