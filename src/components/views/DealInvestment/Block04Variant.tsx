import React, { useState } from 'react';
import { Minus, Plus, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Card, CardContent, Button, SuggestionGroup } from '../../ui';

// --- Utility Functions ---

const formatCurrency = (value: number): string => {
  if (!value && value !== 0) return '';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};

// --- Custom Amount Input Component ---

type CustomAmountInputProps = {
  amount: number;
  setAmount: (amount: number) => void;
  isCustom: boolean;
  setIsCustom: (isCustom: boolean) => void;
};

function CustomAmountInput({ amount, setAmount, isCustom, setIsCustom }: CustomAmountInputProps) {
  return (
    <div className="relative">
      {!isCustom ? (
        <Button
          onClick={() => setIsCustom(true)}
          variant="secondary"
          className="w-full py-3 text-sm font-medium"
        >
          Enter custom amount...
        </Button>
      ) : (
        <div className="relative animate-in fade-in zoom-in duration-200">
          <input
            autoFocus
            type="text"
            className="w-full py-3 pl-10 pr-4 text-center font-bold text-foreground bg-muted rounded-lg border border-accent outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            placeholder="0"
            value={formatCurrency(amount)}
            onChange={(e) => setAmount(parseCurrency(e.target.value))}
            onBlur={() => !amount && setIsCustom(false)}
          />
          <span className="absolute left-4 top-3.5 text-muted-foreground">$</span>
        </div>
      )}
    </div>
  );
}

// --- Presets Card Component ---

type PresetsCardProps = {
  amount: number;
  setAmount: (amount: number) => void;
};

function PresetsCard({ amount, setAmount }: PresetsCardProps) {
  const [isCustom, setIsCustom] = useState(false);
  const presets = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <Card className="h-full">
      <CardContent className="h-full flex flex-col">
        {/* Top Section */}
        <div>
          <div className="text-center py-2 mb-6">
            <span className="text-4xl font-bold text-foreground tracking-tight">
              ${formatCurrency(amount)}
            </span>
            <span className="block text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wide">
              Investment Amount
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {presets.map((val) => (
              <Button
                key={val}
                onClick={() => {
                  setAmount(val);
                  setIsCustom(false);
                }}
                variant={amount === val && !isCustom ? 'primary' : 'secondary'}
                className={cn(
                  'py-3 px-2 text-sm font-semibold',
                  amount === val && !isCustom && 'shadow-md'
                )}
              >
                ${val >= 1000 ? `${val / 1000}k` : val}
              </Button>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[24px]" />

        {/* Bottom Section */}
        <div>
          <CustomAmountInput
            amount={amount}
            setAmount={setAmount}
            isCustom={isCustom}
            setIsCustom={setIsCustom}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Stepper Card Component ---

type StepperCardProps = {
  amount: number;
  setAmount: (amount: number) => void;
};

function StepperCard({ amount, setAmount }: StepperCardProps) {
  const [isCustom, setIsCustom] = useState(false);

  const adjust = (delta: number) => {
    setAmount(Math.max(0, amount + delta));
  };

  return (
    <Card className="h-full">
      <CardContent className="h-full flex flex-col">
        {/* Top Section: Main Input */}
        <div className="flex items-center justify-between bg-muted rounded-2xl p-2 border border-border">
          <button
            onClick={() => adjust(-500)}
            className="w-16 h-16 flex items-center justify-center bg-card rounded-xl shadow-sm border border-border text-muted-foreground hover:text-primary hover:border-primary/30 active:scale-95 transition-all"
          >
            <Minus size={28} />
          </button>

          <div className="flex-1 px-2 text-center">
            <div className="text-sm text-muted-foreground font-medium mb-1">I want to invest</div>
            <div className="text-3xl font-bold text-foreground tracking-tight">
              ${formatCurrency(amount)}
            </div>
          </div>

          <button
            onClick={() => adjust(500)}
            className="w-16 h-16 flex items-center justify-center bg-primary rounded-xl shadow-md text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[24px]" />

        {/* Bottom Section: Suggestions + Custom Input */}
        <div>
          {/* Helper Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              onClick={() => adjust(1000)}
              variant="secondary"
              className="py-3 text-sm font-medium"
            >
              +$1,000
            </Button>
            <Button
              onClick={() => adjust(5000)}
              variant="secondary"
              className="py-3 text-sm font-medium"
            >
              +$5,000
            </Button>
          </div>

          {/* Custom Toggle */}
          <CustomAmountInput
            amount={amount}
            setAmount={setAmount}
            isCustom={isCustom}
            setIsCustom={setIsCustom}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Block04 Variant Component ---

type Block04VariantContentProps = {
  showPresets?: boolean;
  showStepper?: boolean;
  showSuggestions?: boolean;
};

export function Block04VariantContent({
  showPresets = true,
  showStepper = true,
  showSuggestions = true
}: Block04VariantContentProps) {
  const [presetsAmount, setPresetsAmount] = useState(25000);
  const [stepperAmount, setStepperAmount] = useState(25000);

  const suggestions = [
    'Confirm my investment',
    'Explore additional opportunities',
    'What are the fund details?',
    'How does this fit my portfolio?',
  ];

  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        Perfect — you're set to proceed with a{' '}
        <span className="font-bold">$25,000 allocation</span>.
      </p>

      <p className="text-foreground leading-relaxed">
        This amount gives you strong, diversified access to the YC 2025 fund.
        When you're ready, confirm your investment or explore additional opportunities alongside it.
      </p>

      {/* Cards Grid */}
      {(showPresets || showStepper) && (
        <div
          className={cn(
            'grid gap-4',
            showPresets && showStepper ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md'
          )}
        >
          {showPresets && (
            <div className="min-h-[320px]">
              <PresetsCard amount={presetsAmount} setAmount={setPresetsAmount} />
            </div>
          )}
          {showStepper && (
            <div className="min-h-[320px]">
              <StepperCard amount={stepperAmount} setAmount={setStepperAmount} />
            </div>
          )}
        </div>
      )}

      {/* AI Suggestions */}
      {showSuggestions && (
        <SuggestionGroup
          suggestions={suggestions}
          label="Next steps:"
          icon={<Sparkles className="w-4 h-4" />}
        />
      )}
    </div>
  );
}
