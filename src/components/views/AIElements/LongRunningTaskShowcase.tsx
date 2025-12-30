import { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Shimmer } from '../../ui/Shimmer';
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
} from '../../ai-elements/chain-of-thought';
import { RotateCcw, Bell, Search, FileText, Sparkles, CheckCircle } from 'lucide-react';
import goodfinAvatar from '../Welcome02/assets/goodfin-ai-avatar.png';

export const longRunningTaskVariants = [
  { id: 'default', label: 'Default' },
];

type LongRunningTaskShowcaseProps = {
  variant?: 'default';
};

type TaskPhase = 'thinking' | 'processing' | 'ready';

const PROCESSING_STEPS = [
  { icon: Search, label: "Entity-aware validation: 'I want to research open ai'", badge: "Entities: 1" },
  { icon: FileText, label: "Searching investment documents and market data", badge: "Sources: 12" },
  { icon: Sparkles, label: "Analyzing company financials and trends", badge: null },
  { icon: CheckCircle, label: "Compiling research report", badge: null },
];

/**
 * LongRunningTaskShowcase - Display component for long-running AI tasks
 *
 * Shows the chain of thought processing with reminder option for tasks
 * that take longer to complete (like deep research reports)
 */
export function LongRunningTaskShowcase({
  variant = 'default',
}: LongRunningTaskShowcaseProps) {
  const [phase, setPhase] = useState<TaskPhase>('thinking');
  const [currentStep, setCurrentStep] = useState(0);
  const [thinkingDuration, setThinkingDuration] = useState(0);
  const [key, setKey] = useState(0);
  const [reminderSent, setReminderSent] = useState(false);

  // Simulate the task progression
  useEffect(() => {
    setPhase('thinking');
    setCurrentStep(0);
    setThinkingDuration(0);
    setReminderSent(false);
    const thinkingStartTime = Date.now();

    // Thinking phase (2 seconds)
    const thinkingTimer = setTimeout(() => {
      const duration = Math.round((Date.now() - thinkingStartTime) / 1000);
      setThinkingDuration(duration);
      setPhase('processing');

      // Progress through steps
      let step = 0;
      const stepInterval = setInterval(() => {
        step++;
        if (step < PROCESSING_STEPS.length) {
          setCurrentStep(step);
        } else {
          clearInterval(stepInterval);
          setPhase('ready');
        }
      }, 1500);

      return () => clearInterval(stepInterval);
    }, 2000);

    return () => clearTimeout(thinkingTimer);
  }, [key]);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  const handleReminder = () => {
    setReminderSent(true);
  };

  return (
    <div className="p-8 bg-[#EDEBEE] min-h-[600px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Long Running Task
          </h3>
          <p className="text-sm text-muted-foreground">
            Deep research with chain of thought processing and reminder option
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleReplay}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Replay
          </Button>
        </div>

        {/* Main showcase - Chat interface */}
        <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-6 space-y-6">
          {/* User message */}
          <div className="flex justify-end">
            <div
              className="font-primary"
              style={{
                backgroundColor: '#F0EEF0',
                color: '#030303',
                borderRadius: '16px',
                padding: '8px 16px',
                maxWidth: '300px',
              }}
            >
              <p className="text-sm leading-relaxed">I want to research open ai</p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            {/* Goodfin AI Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={goodfinAvatar}
                alt="Goodfin AI"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              {/* Thinking state */}
              {phase === 'thinking' && (
                <Shimmer className="text-base font-heading">
                  thinking about your request...
                </Shimmer>
              )}

              {/* Processing/Ready state */}
              {phase !== 'thinking' && (
                <>
                  {/* Header text */}
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      I'm preparing a detailed research report on OpenAI
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      It usually takes 5–10 minutes. Feel free to minimize this window and return later.
                    </p>
                  </div>

                  {/* Chain of Thought */}
                  <ChainOfThought defaultOpen>
                    <ChainOfThoughtHeader>
                      {phase === 'ready' ? 'Completed' : `Processing step ${currentStep + 1} of ${PROCESSING_STEPS.length}`}
                    </ChainOfThoughtHeader>
                    <ChainOfThoughtContent>
                      {PROCESSING_STEPS.map((step, index) => {
                        let status: 'complete' | 'active' | 'pending' = 'pending';
                        if (index < currentStep || phase === 'ready') {
                          status = 'complete';
                        } else if (index === currentStep) {
                          status = 'active';
                        }

                        // Only show steps up to current step + 1
                        if (index > currentStep && phase !== 'ready') {
                          return null;
                        }

                        return (
                          <ChainOfThoughtStep
                            key={index}
                            icon={step.icon}
                            label={step.label}
                            status={status}
                          >
                            {step.badge && (
                              <ChainOfThoughtSearchResults>
                                <ChainOfThoughtSearchResult>
                                  {step.badge}
                                </ChainOfThoughtSearchResult>
                              </ChainOfThoughtSearchResults>
                            )}
                          </ChainOfThoughtStep>
                        );
                      })}
                    </ChainOfThoughtContent>
                  </ChainOfThought>

                  {/* Reminder CTA Callout */}
                  {phase === 'processing' && (
                    <div className="pt-3">
                      {!reminderSent ? (
                        <div
                          className="rounded-xl p-4 flex items-center gap-4"
                          style={{
                            backgroundColor: '#F0EEF0',
                            border: '1px solid #E5E3E6',
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#E8E6E9' }}
                          >
                            <Bell className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              Get notified when ready
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              We'll send you a notification when your report is complete
                            </p>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleReminder}
                          >
                            Remind me
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="rounded-xl p-4 flex items-center gap-4"
                          style={{
                            backgroundColor: '#E8F5E9',
                            border: '1px solid #C8E6C9',
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#C8E6C9' }}
                          >
                            <CheckCircle className="w-5 h-5 text-success" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              Reminder set!
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              We'll notify you when your research report is ready
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Completion state */}
                  {phase === 'ready' && (
                    <div className="pt-3">
                      <div
                        className="rounded-xl p-4 flex items-center gap-4"
                        style={{
                          backgroundColor: '#E8F5E9',
                          border: '1px solid #C8E6C9',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#C8E6C9' }}
                        >
                          <CheckCircle className="w-5 h-5 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            Your report is ready!
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Click to view your detailed research report on OpenAI
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                        >
                          View report
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* States preview */}
        <div className="grid grid-cols-2 gap-4">
          {/* Reminder CTA preview */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Reminder CTA</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <div
                className="rounded-xl p-3 flex items-center gap-3"
                style={{
                  backgroundColor: '#F0EEF0',
                  border: '1px solid #E5E3E6',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E8E6E9' }}
                >
                  <Bell className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    Get notified when ready
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    We'll send you a notification
                  </p>
                </div>
                <Button variant="primary" size="sm" className="text-xs px-2 py-1 h-auto">
                  Remind me
                </Button>
              </div>
            </div>
          </div>

          {/* Reminder confirmed preview */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Reminder Confirmed</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <div
                className="rounded-xl p-3 flex items-center gap-3"
                style={{
                  backgroundColor: '#E8F5E9',
                  border: '1px solid #C8E6C9',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#C8E6C9' }}
                >
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">
                    Reminder set!
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    We'll notify you when ready
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

export default LongRunningTaskShowcase;
