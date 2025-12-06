import React from 'react';

type RiskCardData = {
  title: string;
  description: string;
};

type RiskCardProps = RiskCardData;

export function RiskCard({ title, description }: RiskCardProps) {
  return (
    <div className="bg-muted rounded-lg p-4 border-l-4 border-muted-foreground/30">
      <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export const riskCardsData: RiskCardData[] = [
  {
    title: 'Illiquidity Risk',
    description: '5-7+ year hold period - you cannot easily sell your shares',
  },
  {
    title: 'Capital Loss Risk',
    description: 'Risk of partial or total loss of capital',
  },
  {
    title: 'Accredited Investor Requirement',
    description: 'Must meet income/net worth qualifications',
  },
  {
    title: 'No Guaranteed Returns',
    description: "Past performance doesn't guarantee future results",
  },
];
