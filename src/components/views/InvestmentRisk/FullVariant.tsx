import React, { useState } from 'react';
import { RiskCard, riskCardsData } from './RiskCard';
import { Card, CardContent, Checkbox, Button } from '../../ui';

export function FullVariantContent() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Great — before we move ahead on your{' '}
        <span className="font-semibold">$200,000</span> investment in
        Databricks, let me quickly highlight the standard private-market points
        so you feel fully informed. Mind if I run through them?
      </p>

      <ul className="space-y-2 list-none pl-1">
        <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
          <span className="text-muted-foreground/50 mt-0.5">•</span>
          <span>
            <span className="font-semibold text-foreground">Illiquidity:</span> long-term
            capital; you won't be able to sell early.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
          <span className="text-muted-foreground/50 mt-0.5">•</span>
          <span>
            <span className="font-semibold text-foreground">Capital at risk:</span> private
            deals can lose some or all capital; no guarantees.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
          <span className="text-muted-foreground/50 mt-0.5">•</span>
          <span>
            <span className="font-semibold text-foreground">Accredited investor:</span> required
            for all private deals.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
          <span className="text-muted-foreground/50 mt-0.5">•</span>
          <span>
            <span className="font-semibold text-foreground">No guaranteed returns:</span>{' '}
            performance varies and past results don't promise future outcomes.
          </span>
        </li>
      </ul>

      <p className="text-foreground leading-relaxed">
        Does that all make sense? Anything you want to double-click on? If it
        feels clear, just say so and we'll move to the documents.
      </p>

      {/* Investment Risks Card */}
      <Card className="mt-6">
        <CardContent className="space-y-4">
          <h3 className="font-bold text-foreground text-lg">Investment Risks</h3>

          <div className="space-y-3">
            {riskCardsData.map((risk, i) => (
              <RiskCard key={i} {...risk} />
            ))}
          </div>

          {/* Acknowledgment Checkbox */}
          <div className="pt-4 border-t border-border">
            <Checkbox
              checked={acknowledged}
              onChange={setAcknowledged}
              label="Clear, ready for the documents."
            />
          </div>

          {/* Submit Button */}
          <Button disabled={!acknowledged} className="w-full" size="lg">
            {acknowledged ? 'Continue' : 'Submitted'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
