import React, { useState, Component } from 'react';
import { Layout, FileText } from 'lucide-react';
type ComponentOption = {
  id: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};
type ComponentShowcaseProps = {
  options: ComponentOption[];
};
export function ComponentShowcase({
  options
}: ComponentShowcaseProps) {
  const [activeId, setActiveId] = useState(options[0].id);
  const activeComponent = options.find(opt => opt.id === activeId)?.component;
  return <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Thumbnail Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Component Showcase
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {options.map(option => <button key={option.id} onClick={() => setActiveId(option.id)} className={`flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border-2 transition-all duration-200 group ${activeId === option.id ? 'border-violet-600 bg-violet-50/50' : 'border-gray-100 hover:border-violet-200 hover:bg-gray-50'}`}>
                {/* Thumbnail Preview Placeholder */}
                <div className={`w-full aspect-video rounded-lg flex items-center justify-center transition-colors ${activeId === option.id ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-violet-500'}`}>
                  {option.icon}
                </div>

                <span className={`text-sm font-medium ${activeId === option.id ? 'text-violet-700' : 'text-gray-600'}`}>
                  {option.label}
                </span>
              </button>)}
          </div>
        </div>

        {/* Component Frame */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] relative">
          {/* Browser-like Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-gray-200 text-xs text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Preview
              </div>
            </div>
          </div>

          {/* Component Render Area */}
          <div className="h-[800px] overflow-y-auto bg-gray-50 relative">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>;
}