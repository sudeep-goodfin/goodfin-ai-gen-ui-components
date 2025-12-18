import { ReactNode } from 'react';

export type ItemColor = 'blue' | 'orange' | 'teal' | 'purple' | 'green';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: ItemColor;
  category: string;
}

export interface Context {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: ItemColor;
}

export interface Pill {
  id: string;
  name: string;
  type: 'recipe' | 'context';
  color: ItemColor;
}

export interface ContentItem {
  id: string;
  type: 'text' | 'pill';
  content?: string;
  pill?: Pill;
}

export type ViewType = 'home' | 'prompt-packs';

export interface NavigationCard {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  view: ViewType;
}

export type PanelMode = 'recipes' | 'contexts';
