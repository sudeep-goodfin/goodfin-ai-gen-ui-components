import React from 'react';
import { DealCard } from './DealCard';

export function FullVariantContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Excellent choice, Jay! Databricks IV is one of the most compelling
        opportunities in the AI and data infrastructure space right now.
      </p>

      <div className="space-y-3">
        <p className="text-foreground font-medium">
          Here's why Databricks IV stands out:
        </p>

        <ul className="space-y-2 list-none pl-1">
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-muted-foreground/50 mt-0.5">•</span>
            <span>
              Backed by top investors (Andreessen Horowitz, NVIDIA, BlackRock,
              and more), Databricks boasts a valuation topping $130 billion.
            </span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-muted-foreground/50 mt-0.5">•</span>
            <span>
              The company leads in data intelligence, empowering over 15,000
              customers—including the world's largest enterprises—by unifying
              analytics, machine learning, and AI on a single, scalable
              platform.
            </span>
          </li>
          <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-muted-foreground/50 mt-0.5">•</span>
            <span>
              Their rapid growth (over $3.7 billion in annual recurring revenue
              and 50% year-over-year growth) and recent innovations in AI agent
              technology position them as a leader in the pre-IPO category.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-foreground leading-relaxed">
        The minimum investment amount for this product is{' '}
        <span className="font-bold">$25,000</span>—this applies
        even to premium members due to the product's unique terms.
      </p>

      <p className="text-foreground leading-relaxed">
        Would you like to move forward and confirm your intent to invest in
        Databricks IV? Let me know if you have any questions, or if you'd like
        to proceed and set your investment amount.
      </p>

      <DealCard />
    </div>
  );
}
