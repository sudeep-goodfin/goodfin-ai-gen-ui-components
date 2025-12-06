import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AmountSelector } from './AmountSelector';
import { SuggestionGroup } from '../../ui';

export function FullVariantContent() {
  const [selectedAmount, setSelectedAmount] = useState(200000);
  const [inputAmount, setInputAmount] = useState('200,000');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const numValue = parseInt(value);
      setSelectedAmount(numValue);
      setInputAmount(numValue.toLocaleString());
    } else {
      setInputAmount('');
    }
  };

  const handleQuickAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setInputAmount(amount.toLocaleString());
  };

  const suggestions = [
    'What percentage of my portfolio should this be?',
    'How does this compare to my other investments?',
    'Can I add more funds later?',
    "What's the typical holding period?",
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Great, Jay! I see you're ready to invest in Databricks IV—a company
        that's generated a lot of interest.
      </p>

      <p className="text-foreground leading-relaxed">
        As a RESERVE member, you often get special privileges, but in this case,
        there's an exception:{' '}
        <span className="font-bold">
          The minimum investment amount for this product is $25,000
        </span>
        . This rule applies to all investors, regardless of membership or
        accreditation, due to the product's unique terms.
      </p>

      <p className="text-foreground leading-relaxed">
        Many investors in this opportunity choose amounts that align with both
        their portfolio goals and the product's potential. For example, some aim
        for the minimum ($25,000) to diversify across different deals, while
        others go higher to seek a bigger stake if they're particularly
        confident in Databricks' growth prospects.
      </p>

      <p className="text-foreground leading-relaxed">
        Would you like to invest the minimum of{' '}
        <span className="font-bold">$25,000</span>, or do you have
        a different amount in mind? I'm here to help you decide what fits best
        with your investment strategy.
      </p>

      {/* Amount Selector */}
      <div className="mt-6">
        <AmountSelector
          selectedAmount={selectedAmount}
          inputAmount={inputAmount}
          onAmountChange={handleAmountChange}
          onQuickAmountClick={handleQuickAmountClick}
          variant="default"
        />
      </div>

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Common questions:"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
