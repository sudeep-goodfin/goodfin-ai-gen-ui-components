import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AmountSelector } from './AmountSelector';
import { SuggestionGroup } from '../../ui';

export function MinimalVariantContent() {
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [inputAmount, setInputAmount] = useState('25,000');

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
    'Is this amount right for me?',
    'What are the key risks?',
    'When can I expect returns?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        How much would you like to invest in Databricks IV? The minimum is{' '}
        <span className="font-bold">$25,000</span>.
      </p>

      {/* Amount Selector */}
      <AmountSelector
        selectedAmount={selectedAmount}
        inputAmount={inputAmount}
        onAmountChange={handleAmountChange}
        onQuickAmountClick={handleQuickAmountClick}
        variant="default"
        helperText="You can invest any amount above the minimum."
      />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Need guidance?"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
