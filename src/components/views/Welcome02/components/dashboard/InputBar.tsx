import React, { useState } from 'react';
import { InputBarV01 } from './InputBarV01';
import { InputBarV02 } from './InputBarV02';
import { ChevronDown } from 'lucide-react';

// Re-export types from V02 (the latest version)
export type { MoreMode, ChatMode, CalloutState, CommitCheckbox, InvestorTypeOption } from './InputBarV02';

export type InputBarVersion = 'v0.1' | 'v0.2';

interface InputBarProps {
  currentMode?: 'default' | 'research' | 'deals' | 'news' | 'insight' | 'events' | 'portfolio';
  extraSlotItem?: 'insight' | 'events' | 'portfolio' | null;
  onModeChange?: (mode: 'default' | 'research' | 'deals' | 'news' | 'insight' | 'events' | 'portfolio') => void;
  version?: InputBarVersion;
  onVersionChange?: (version: InputBarVersion) => void;
  showVersionSelector?: boolean;
}

export function InputBar({
  currentMode = 'default',
  extraSlotItem,
  onModeChange,
  version = 'v0.2',
  onVersionChange,
  showVersionSelector = false,
}: InputBarProps) {
  const [internalVersion, setInternalVersion] = useState<InputBarVersion>(version);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeVersion = onVersionChange ? version : internalVersion;
  const setActiveVersion = onVersionChange || setInternalVersion;

  const versions: { value: InputBarVersion; label: string }[] = [
    { value: 'v0.1', label: 'v0.1 - Basic' },
    { value: 'v0.2', label: 'v0.2 - Commands' },
  ];

  return (
    <div className="relative">
      {/* Version Selector */}
      {showVersionSelector && (
        <div className="absolute -top-10 right-0 z-30">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7f7582] bg-white/80 backdrop-blur-sm border border-[#e0dce0] rounded-lg hover:bg-white hover:border-[#c0bcc0] transition-all shadow-sm"
            >
              <span>Chatbox {activeVersion}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-40 bg-white border border-[#e0dce0] rounded-lg shadow-lg z-50 overflow-hidden">
                  {versions.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => {
                        setActiveVersion(v.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-medium transition-colors ${
                        activeVersion === v.value
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-[#29272a] hover:bg-gray-50'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Render the selected version */}
      {activeVersion === 'v0.1' ? (
        <InputBarV01
          currentMode={currentMode}
          extraSlotItem={extraSlotItem}
          onModeChange={onModeChange}
        />
      ) : (
        <InputBarV02
          currentMode={currentMode}
          extraSlotItem={extraSlotItem}
          onModeChange={onModeChange}
        />
      )}
    </div>
  );
}

// Also export versioned components for direct use
export { InputBarV01 } from './InputBarV01';
export { InputBarV02 } from './InputBarV02';
