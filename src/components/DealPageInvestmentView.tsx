import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, Sparkles } from 'lucide-react';
type InvestmentVariant = 'full' | 'minimal' | 'simple';
function FullInvestmentContent() {
  const [selectedAmount, setSelectedAmount] = useState(200000);
  const [inputAmount, setInputAmount] = useState('200,000');
  const quickAmounts = [25000, 50000, 100000, 200000];
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
  const suggestions = ['What percentage of my portfolio should this be?', 'How does this compare to my other investments?', 'Can I add more funds later?', "What's the typical holding period?"];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Great, Jay! I see you're ready to invest in Databricks IV—a company
        that's generated a lot of interest.
      </p>

      <p className="text-gray-800 leading-relaxed">
        As a RESERVE member, you often get special privileges, but in this case,
        there's an exception:{' '}
        <span className="font-bold text-gray-900">
          The minimum investment amount for this product is $25,000
        </span>
        . This rule applies to all investors, regardless of membership or
        accreditation, due to the product's unique terms.
      </p>

      <p className="text-gray-800 leading-relaxed">
        Many investors in this opportunity choose amounts that align with both
        their portfolio goals and the product's potential. For example, some aim
        for the minimum ($25,000) to diversify across different deals, while
        others go higher to seek a bigger stake if they're particularly
        confident in Databricks' growth prospects.
      </p>

      <p className="text-gray-800 leading-relaxed">
        Would you like to invest the minimum of{' '}
        <span className="font-bold text-gray-900">$25,000</span>, or do you have
        a different amount in mind? I'm here to help you decide what fits best
        with your investment strategy.
      </p>

      {/* Amount Display */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 mt-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-700">
            ${selectedAmount.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center">
          These are just suggestions. You can invest any amount above the
          minimum.
        </p>

        {/* Investment Amount Input */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-4 py-3 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
          <span className="text-gray-500 font-semibold text-lg whitespace-nowrap">
            Invest $
          </span>
          <input type="text" value={inputAmount} onChange={handleAmountChange} placeholder="50,000" className="flex-1 bg-transparent text-gray-900 text-right font-semibold text-lg outline-none" />
        </div>

        {/* Quick Amount Chips */}
        <div className="flex gap-2 pt-2">
          {quickAmounts.map(amount => <button key={amount} onClick={() => handleQuickAmountClick(amount)} className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedAmount === amount ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              ${(amount / 1000).toFixed(0)}k
            </button>)}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">Common questions:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}
function MinimalInvestmentContent() {
  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [inputAmount, setInputAmount] = useState('25,000');
  const quickAmounts = [25000, 50000, 100000, 200000];
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
  const suggestions = ['Is this amount right for me?', 'What are the key risks?', 'When can I expect returns?'];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        How much would you like to invest in Databricks IV? The minimum is{' '}
        <span className="font-bold text-gray-900">$25,000</span>.
      </p>

      {/* Amount Display */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-700">
            ${selectedAmount.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center">
          You can invest any amount above the minimum.
        </p>

        {/* Investment Amount Input */}
        <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-3 focus-within:bg-gray-800 transition-all">
          <span className="text-white font-semibold text-lg whitespace-nowrap">
            Invest $
          </span>
          <input type="text" value={inputAmount} onChange={handleAmountChange} placeholder="25,000" className="flex-1 bg-transparent text-white text-right font-semibold text-lg outline-none placeholder-gray-400" />
        </div>

        {/* Quick Amount Chips */}
        <div className="flex gap-2 pt-2">
          {quickAmounts.map(amount => <button key={amount} onClick={() => handleQuickAmountClick(amount)} className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${selectedAmount === amount ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              ${(amount / 1000).toFixed(0)}k
            </button>)}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">Need guidance?</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}
function SimpleInvestmentContent() {
  const [inputAmount, setInputAmount] = useState('');
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      const numValue = parseInt(value);
      setInputAmount(numValue.toLocaleString());
    } else {
      setInputAmount('');
    }
  };
  const suggestions = ["What's the minimum?", 'Help me decide an amount', 'Show me investment details'];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        How much would you like to invest in Databricks IV?
      </p>

      {/* Amount Display */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {/* Investment Amount Input */}
        <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-4 py-3 hover:bg-gray-300 transition-all">
          <span className="text-gray-700 font-semibold text-lg whitespace-nowrap">
            Invest $
          </span>
          <input type="text" value={inputAmount} onChange={handleAmountChange} placeholder="Enter your amount" className="flex-1 bg-transparent text-gray-900 text-right font-semibold text-lg outline-none placeholder-gray-500" />
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">
            Need help deciding?
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}
export function DealPageInvestmentView() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<InvestmentVariant>('full');
  const getContent = () => {
    switch (variant) {
      case 'full':
        return <FullInvestmentContent />;
      case 'minimal':
        return <MinimalInvestmentContent />;
      case 'simple':
        return <SimpleInvestmentContent />;
    }
  };
  return <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">
                  Investment Assistant
                </h1>
                <p className="text-xs text-gray-500">
                  Databricks IV Investment
                </p>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setVariant('full')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'full' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Full
              </button>
              <button onClick={() => setVariant('minimal')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'minimal' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Minimal
              </button>
              <button onClick={() => setVariant('simple')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'simple' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Simple
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* User Message */}
        <div className="flex justify-end mb-6">
          <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-md shadow-sm">
            <p className="text-sm">I want to invest in Databricks IV</p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={getContent()} showFeedback={true} />
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-2 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type your response..." className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none" aria-label="Chat message input" />
            <button className="p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!inputValue.trim()} aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
}