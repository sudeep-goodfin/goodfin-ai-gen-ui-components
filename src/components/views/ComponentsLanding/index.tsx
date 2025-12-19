import React from 'react';
import { cn } from '../../../lib/utils';

type ComponentGroup = {
  id: string;
  label: string;
  components: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    variants?: Array<{ id: string; label: string }>;
  }>;
};

type ComponentsLandingProps = {
  groups: ComponentGroup[];
  onComponentClick: (groupId: string, componentId: string) => void;
};

export function ComponentsLanding({ groups, onComponentClick }: ComponentsLandingProps) {
  // Flatten all components for display
  const allComponents = groups.flatMap(group =>
    group.components.map(comp => ({
      ...comp,
      groupId: group.id,
      groupLabel: group.label,
    }))
  );

  // Split components into 3 columns
  const column1: typeof allComponents = [];
  const column2: typeof allComponents = [];
  const column3: typeof allComponents = [];

  allComponents.forEach((comp, index) => {
    if (index % 3 === 0) {
      column1.push(comp);
    } else if (index % 3 === 1) {
      column2.push(comp);
    } else {
      column3.push(comp);
    }
  });

  const handleComponentClick = (groupId: string, componentId: string) => {
    onComponentClick(groupId, componentId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Components</h1>
          <p className="text-base text-gray-600 max-w-2xl">
            Here you can find all the components available in the library. We are working on adding more components.
          </p>
        </div>

        {/* Components Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Column 1 */}
          <div className="space-y-1">
            {column1.map((comp) => (
              <button
                key={comp.id}
                onClick={() => handleComponentClick(comp.groupId, comp.id)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group flex items-center justify-between"
              >
                <span className="text-sm text-gray-900 group-hover:text-gray-700">
                  {comp.label}
                </span>
                {comp.variants && comp.variants.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-1">
            {column2.map((comp) => (
              <button
                key={comp.id}
                onClick={() => handleComponentClick(comp.groupId, comp.id)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group flex items-center justify-between"
              >
                <span className="text-sm text-gray-900 group-hover:text-gray-700">
                  {comp.label}
                </span>
                {comp.variants && comp.variants.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-1">
            {column3.map((comp) => (
              <button
                key={comp.id}
                onClick={() => handleComponentClick(comp.groupId, comp.id)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group flex items-center justify-between"
              >
                <span className="text-sm text-gray-900 group-hover:text-gray-700">
                  {comp.label}
                </span>
                {comp.variants && comp.variants.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
