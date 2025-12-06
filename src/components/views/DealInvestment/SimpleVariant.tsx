import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AmountSelector } from './AmountSelector';
import { SuggestionGroup } from '../../ui';

export function SimpleVariantContent() {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [inputAmount, setInputAmount] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const numValue = parseInt(value);
      setSelectedAmount(numValue);
      setInputAmount(numValue.toLocaleString());
    } else {
      setInputAmount('');
      setSelectedAmount(0);
    }
  };

  const suggestions = [
    "What's the minimum?",
    'Help me decide an amount',
    'Show me investment details',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        How much would you like to invest in Databricks IV?
      </p>

      {/* Amount Selector */}
      <AmountSelector
        selectedAmount={selectedAmount}
        inputAmount={inputAmount}
        onAmountChange={handleAmountChange}
        onQuickAmountClick={() => {}}
        variant="simple"
      />

      {/* AI Suggestions */}
      <SuggestionGroup
        suggestions={suggestions}
        label="Need help deciding?"
        icon={<Sparkles className="w-4 h-4" />}
      />
    </div>
  );
}
