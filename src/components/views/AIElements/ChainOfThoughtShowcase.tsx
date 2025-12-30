import { useState } from 'react';
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
} from '../../ai-elements/chain-of-thought';
import { Button } from '../../ui/Button';
import { RotateCcw, Search, FileText, Calculator, CheckCircle } from 'lucide-react';
import goodfinAvatar from '../Welcome02/assets/goodfin-ai-avatar.png';

export const chainOfThoughtVariants = [
  { id: 'default', label: 'Default' },
];

/**
 * ChainOfThoughtShowcase - Display component for AI chain of thought reasoning
 *
 * Shows the expandable chain of thought UI for displaying AI reasoning steps
 */
export function ChainOfThoughtShowcase() {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
    setIsOpen(true);
  };

  return (
    <div className="p-8 bg-[#EDEBEE] min-h-[500px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Chain of Thought
          </h3>
          <p className="text-sm text-muted-foreground">
            Expandable reasoning steps showing AI's thought process
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleReplay}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Collapse' : 'Expand'}
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

            <div className="flex-1 space-y-4">
              <p className="text-foreground text-base leading-relaxed">
                Based on my analysis of Anthropic's investment documents, here's what I found:
              </p>

              {/* Chain of Thought Component */}
              <ChainOfThought
                key={key}
                open={isOpen}
                onOpenChange={setIsOpen}
              >
                <ChainOfThoughtHeader>
                  Reasoning Steps
                </ChainOfThoughtHeader>

                <ChainOfThoughtContent>
                  <ChainOfThoughtStep
                    icon={Search}
                    label="Searching investment documents"
                    status="complete"
                  >
                    <ChainOfThoughtSearchResults>
                      <ChainOfThoughtSearchResult>
                        PPM_Anthropic_2024.pdf
                      </ChainOfThoughtSearchResult>
                      <ChainOfThoughtSearchResult>
                        Subscription_Agreement.pdf
                      </ChainOfThoughtSearchResult>
                      <ChainOfThoughtSearchResult>
                        Risk_Disclosure.pdf
                      </ChainOfThoughtSearchResult>
                    </ChainOfThoughtSearchResults>
                  </ChainOfThoughtStep>

                  <ChainOfThoughtStep
                    icon={FileText}
                    label="Analyzing key terms and conditions"
                    description="Extracted minimum investment, lock-up period, and fee structure"
                    status="complete"
                  />

                  <ChainOfThoughtStep
                    icon={Calculator}
                    label="Calculating potential returns"
                    description="Based on Series D valuation of $15B and projected growth"
                    status="complete"
                  />

                  <ChainOfThoughtStep
                    icon={CheckCircle}
                    label="Generating investment summary"
                    status="complete"
                  />
                </ChainOfThoughtContent>
              </ChainOfThought>
            </div>
          </div>
        </div>

        {/* States preview */}
        <div className="grid grid-cols-2 gap-4">
          {/* Collapsed state */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Collapsed State</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <ChainOfThought open={false}>
                <ChainOfThoughtHeader>
                  4 reasoning steps
                </ChainOfThoughtHeader>
              </ChainOfThought>
            </div>
          </div>

          {/* Active step state */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Active Step</span>
            <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-4">
              <ChainOfThought defaultOpen>
                <ChainOfThoughtHeader>
                  Processing...
                </ChainOfThoughtHeader>
                <ChainOfThoughtContent>
                  <ChainOfThoughtStep
                    icon={Search}
                    label="Searching documents"
                    status="complete"
                  />
                  <ChainOfThoughtStep
                    icon={Calculator}
                    label="Analyzing data..."
                    status="active"
                  />
                </ChainOfThoughtContent>
              </ChainOfThought>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChainOfThoughtShowcase;
