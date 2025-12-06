import React, { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, Checkbox, Button, SuggestionGroup } from '../../ui';

export function CompactVariantContent() {
  const [disclaimers, setDisclaimers] = useState({
    accredited: true,
    longTerm: true,
    reviewed: true,
    capitalRisk: true,
  });

  const allChecked = Object.values(disclaimers).every((val) => val === true);

  const handleCheckboxChange = (key: keyof typeof disclaimers) => {
    setDisclaimers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const suggestions = [
    'What happens after I submit?',
    'Can I review documents again?',
    'How long until my investment is confirmed?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Great pace—you've reviewed the docs for your investment in Databricks.
      </p>

      <p className="text-muted-foreground leading-relaxed">
        These are standard across private funds. Quick confirmations:
      </p>

      <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
        <li className="text-sm">Accredited investor</li>
        <li className="text-sm">Long-term and illiquid (5-7+ years)</li>
        <li className="text-sm">Docs reviewed (PPM, LLOA, Subscription Agreement)</li>
        <li className="text-sm">Capital at risk / no guarantees</li>
      </ol>

      <p className="text-muted-foreground leading-relaxed">
        When these look good, just say "all clear" and we'll move to your signature.
      </p>

      <div className="pt-2">
        <p className="text-sm font-semibold text-foreground mb-2">Reference links:</p>
        <ul className="space-y-1">
          <li>
            <a href="#" className="text-sm text-accent hover:text-accent/80 underline">
              Subscription Agreement & Privacy Notice
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-accent hover:text-accent/80 underline">
              Limited Liability Company Agreement
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-accent hover:text-accent/80 underline">
              Private Placement Memorandum
            </a>
          </li>
        </ul>
      </div>

      {/* Investment Documents Section */}
      <Card className="mt-4">
        <CardContent className="space-y-3">
          <h3 className="font-semibold text-foreground">Investment Documents</h3>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Subscription Agreement & Privacy Notice
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Limited Liability Company Agreement
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
              <span className="text-sm font-medium text-muted-foreground">
                Private Placement Memorandum
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers Section */}
      <Card className="mt-4">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-foreground">Disclaimers</h3>

          <div className="space-y-3">
            <Checkbox
              checked={disclaimers.accredited}
              onChange={() => handleCheckboxChange('accredited')}
              label="I confirm that I am an accredited investor as defined by SEC regulations"
            />

            <Checkbox
              checked={disclaimers.longTerm}
              onChange={() => handleCheckboxChange('longTerm')}
              label="I understand this is a long-term illiquid investment with a typical 5-7+ year hold period"
            />

            <Checkbox
              checked={disclaimers.reviewed}
              onChange={() => handleCheckboxChange('reviewed')}
              label="I have reviewed and understand all legal documents (PPM, LLOA, Subscription Agreement)"
            />

            <Checkbox
              checked={disclaimers.capitalRisk}
              onChange={() => handleCheckboxChange('capitalRisk')}
              label="I understand the risks of partial or total loss of capital"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              disabled={!allChecked}
              className="w-full"
              size="lg"
            >
              Submitted
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Common questions:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
