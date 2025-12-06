import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, Checkbox, Button, SuggestionGroup } from '../../ui';

export function MinimalVariantContent() {
  const [checkboxes, setCheckboxes] = useState({
    illiquidity: false,
    capitalLoss: false,
    accredited: false,
    noGuarantee: false,
  });

  const allChecked = Object.values(checkboxes).every((val) => val === true);

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const suggestions = [
    'What if I need to sell early?',
    'How likely is capital loss?',
    'Tell me more about accreditation',
    "What's the typical return range?",
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Before continuing, please review and confirm the following:
      </p>

      {/* Confirmation Checklist */}
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Checkbox
              checked={checkboxes.illiquidity}
              onChange={() => handleCheckboxChange('illiquidity')}
              label="I understand this is a long-term investment and my shares may not be easily sold."
            />

            <Checkbox
              checked={checkboxes.capitalLoss}
              onChange={() => handleCheckboxChange('capitalLoss')}
              label="I understand that I may lose part or all of my investment."
            />

            <Checkbox
              checked={checkboxes.accredited}
              onChange={() => handleCheckboxChange('accredited')}
              label="I confirm that I meet the required income or net-worth criteria."
            />

            <Checkbox
              checked={checkboxes.noGuarantee}
              onChange={() => handleCheckboxChange('noGuarantee')}
              label="I understand that past performance does not guarantee future results."
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button disabled={!allChecked} className="w-full" size="lg">
              Continue to Documents
            </Button>
            {!allChecked && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                *Button becomes active only when all four boxes are checked*
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Want to know more?"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
