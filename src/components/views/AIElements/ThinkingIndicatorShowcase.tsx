import { useState, useCallback } from 'react';
import { ThinkingText } from '../AIGreeting/ThinkingText';
import { Button } from '../../ui/Button';
import { RotateCcw } from 'lucide-react';
import goodfinAvatar from '../Welcome02/assets/goodfin-ai-avatar.png';

export const thinkingVariants = [
  { id: 'default', label: 'Default' },
  { id: 'investment', label: 'Investment' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'custom', label: 'Custom' },
];

type ThinkingIndicatorShowcaseProps = {
  variant?: 'default' | 'investment' | 'analysis' | 'custom';
};

// Variant-specific loading texts
const loadingTextsByVariant = {
  default: [
    'summarizing...',
    'crunching numbers...',
    'reading the charts...',
    'brewing insights...',
    'connecting dots...',
    'analyzing trends...',
  ],
  investment: [
    'reviewing portfolio...',
    'calculating returns...',
    'analyzing market trends...',
    'assessing risk profile...',
    'optimizing allocations...',
  ],
  analysis: [
    'parsing documents...',
    'extracting key terms...',
    'cross-referencing data...',
    'generating summary...',
    'finalizing analysis...',
  ],
  custom: [
    'thinking deeply...',
    'pondering possibilities...',
    'formulating response...',
    'crafting insights...',
  ],
};

/**
 * ThinkingIndicatorShowcase - Display component for AI thinking states
 *
 * Shows animated thinking indicators commonly used for:
 * - AI processing states
 * - Async operation feedback
 * - Content generation loading
 */
export function ThinkingIndicatorShowcase({
  variant = 'default',
}: ThinkingIndicatorShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const handleComplete = useCallback(() => {
    // Animation completed - could auto-replay or show completion state
  }, []);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  const handleToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      handleReplay();
    }
  };

  const loadingTexts = loadingTextsByVariant[variant];

  return (
    <div className="p-8 bg-[#EDEBEE] min-h-[400px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Thinking Indicator
          </h3>
          <p className="text-sm text-muted-foreground">
            {variant === 'default' && 'General purpose thinking animation'}
            {variant === 'investment' && 'Investment-focused loading messages'}
            {variant === 'analysis' && 'Document analysis loading states'}
            {variant === 'custom' && 'Custom thinking messages'}
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleToggle}>
            {isPlaying ? 'Stop' : 'Start'}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleReplay}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Replay
          </Button>
        </div>

        {/* Main showcase with Goodfin AI avatar */}
        <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-6">
          <div className="flex gap-3">
            {/* Goodfin AI Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={goodfinAvatar}
                alt="Goodfin AI"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex items-center">
              <ThinkingText
                key={key}
                isVisible={isPlaying}
                onComplete={handleComplete}
                loadingTexts={loadingTexts}
              />
            </div>
          </div>
        </div>

        {/* Message texts preview */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Available Messages for this variant</span>
          <div className="flex flex-wrap gap-2">
            {loadingTexts.map((text, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThinkingIndicatorShowcase;
