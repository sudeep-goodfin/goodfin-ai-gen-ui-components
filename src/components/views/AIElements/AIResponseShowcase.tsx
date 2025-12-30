import { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Shimmer } from '../../ui/Shimmer';
import { RotateCcw } from 'lucide-react';
import goodfinAvatar from '../Welcome02/assets/goodfin-ai-avatar.png';

export const aiResponseVariants = [
  { id: 'streaming', label: 'Streaming' },
];

type AIResponseShowcaseProps = {
  variant?: 'streaming';
};

const SAMPLE_RESPONSE = `Based on your investment profile, I recommend diversifying across AI companies with strong fundamentals. Anthropic shows promising growth potential with their focus on AI safety and recent funding rounds.`;

/**
 * AIResponseShowcase - Display component for AI streaming response
 *
 * Shows the streaming text animation with Goodfin AI avatar
 */
export function AIResponseShowcase({
  variant = 'streaming',
}: AIResponseShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isThinking, setIsThinking] = useState(true);
  const [key, setKey] = useState(0);
  const [thinkingDuration, setThinkingDuration] = useState(0);

  // Thinking phase then streaming
  useEffect(() => {
    if (!isPlaying) return;

    setIsThinking(true);
    setDisplayedText('');
    setThinkingDuration(0);
    const thinkingStartTime = Date.now();

    // Show thinking for 1.5 seconds
    const thinkingTimer = setTimeout(() => {
      const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
      setThinkingDuration(duration);
      setIsThinking(false);

      // Start streaming
      const chunks = SAMPLE_RESPONSE.match(/.{1,12}/g) || [];
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < chunks.length) {
          setDisplayedText((prev) => prev + chunks[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(streamInterval);
        }
      }, 80);

      return () => clearInterval(streamInterval);
    }, 5000);

    return () => clearTimeout(thinkingTimer);
  }, [isPlaying, key]);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
    setIsPlaying(true);
    setDisplayedText('');
    setIsThinking(true);
  };

  const isStreaming = !isThinking && displayedText.length < SAMPLE_RESPONSE.length;

  return (
    <div className="p-8 bg-[#EDEBEE] min-h-[500px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            AI Streaming Response
          </h3>
          <p className="text-sm text-muted-foreground">
            Chunk-based streaming with thinking state and Goodfin AI avatar
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleReplay}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Replay
          </Button>
        </div>

        {/* Main showcase - Chat bubble style with Goodfin AI avatar */}
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

            <div className="flex-1 space-y-2">
              {/* Thinking State - stays visible, shimmers while thinking, shows duration when done */}
              {(isThinking || displayedText.length > 0) && (
                <div>
                  {isThinking ? (
                    <Shimmer className="text-base font-heading">
                      thinking about your question...
                    </Shimmer>
                  ) : (
                    <span className="text-base font-heading text-muted-foreground">
                      thought for {thinkingDuration} sec{thinkingDuration !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              )}

              {/* Streaming Response - on new line below thinking */}
              {!isThinking && (
                <div className="text-foreground text-base leading-relaxed">
                  {displayedText}
                  {isStreaming && (
                    <span className="inline-block w-0.5 h-4 bg-foreground/70 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* States preview */}
        <div className="grid grid-cols-2 gap-4">
          {/* Thinking state */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Thinking State</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={goodfinAvatar}
                    alt="Goodfin AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center">
                  <Shimmer className="text-sm font-heading">
                    analyzing your portfolio...
                  </Shimmer>
                </div>
              </div>
            </div>
          </div>

          {/* Completed state */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Completed State</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={goodfinAvatar}
                    alt="Goodfin AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    Your portfolio is well-diversified across AI sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIResponseShowcase;
