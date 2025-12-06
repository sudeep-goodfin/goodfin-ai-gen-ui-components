import React, { useState, Component } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, AlertTriangle, Sparkles } from 'lucide-react';
type RiskVariant = 'full' | 'minimal';
type RiskCard = {
  title: string;
  description: string;
};
const riskCards: RiskCard[] = [{
  title: 'Illiquidity Risk',
  description: '5-7+ year hold period - you cannot easily sell your shares'
}, {
  title: 'Capital Loss Risk',
  description: 'Risk of partial or total loss of capital'
}, {
  title: 'Accredited Investor Requirement',
  description: 'Must meet income/net worth qualifications'
}, {
  title: 'No Guaranteed Returns',
  description: "Past performance doesn't guarantee future results"
}];
function RiskCardComponent({
  title,
  description
}: RiskCard) {
  return <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
      <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>;
}
function FullRiskContent() {
  const [acknowledged, setAcknowledged] = useState(false);
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Great — before we move ahead on your{' '}
        <span className="font-semibold">$200,000</span> investment in
        Databricks, let me quickly highlight the standard private-market points
        so you feel fully informed. Mind if I run through them?
      </p>

      <ul className="space-y-2 list-none pl-1">
        <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
          <span className="text-gray-400 mt-0.5">•</span>
          <span>
            <span className="font-semibold">Illiquidity:</span> long-term
            capital; you won't be able to sell early.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
          <span className="text-gray-400 mt-0.5">•</span>
          <span>
            <span className="font-semibold">Capital at risk:</span> private
            deals can lose some or all capital; no guarantees.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
          <span className="text-gray-400 mt-0.5">•</span>
          <span>
            <span className="font-semibold">Accredited investor:</span> required
            for all private deals.
          </span>
        </li>
        <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
          <span className="text-gray-400 mt-0.5">•</span>
          <span>
            <span className="font-semibold">No guaranteed returns:</span>{' '}
            performance varies and past results don't promise future outcomes.
          </span>
        </li>
      </ul>

      <p className="text-gray-800 leading-relaxed">
        Does that all make sense? Anything you want to double-click on? If it
        feels clear, just say so and we'll move to the documents.
      </p>

      {/* Investment Risks Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 mt-6">
        <h3 className="font-bold text-gray-900 text-lg">Investment Risks</h3>

        <div className="space-y-3">
          {riskCards.map((risk, i) => <RiskCardComponent key={i} {...risk} />)}
        </div>

        {/* Acknowledgment Checkbox */}
        <div className="pt-4 border-t border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
              <input type="checkbox" checked={acknowledged} onChange={e => setAcknowledged(e.target.checked)} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Clear, ready for the documents.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button disabled={!acknowledged} className={`w-full py-3 rounded-lg font-semibold transition-all ${acknowledged ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          {acknowledged ? 'Continue' : 'Submitted'}
        </button>
      </div>
    </div>;
}
function MinimalRiskContent() {
  const [checkboxes, setCheckboxes] = useState({
    illiquidity: false,
    capitalLoss: false,
    accredited: false,
    noGuarantee: false
  });
  const allChecked = Object.values(checkboxes).every(val => val === true);
  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const suggestions = ['What if I need to sell early?', 'How likely is capital loss?', 'Tell me more about accreditation', "What's the typical return range?"];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Before continuing, please review and confirm the following:
      </p>

      {/* Confirmation Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={checkboxes.illiquidity} onChange={() => handleCheckboxChange('illiquidity')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
              I understand this is a long-term investment and my shares may not
              be easily sold.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={checkboxes.capitalLoss} onChange={() => handleCheckboxChange('capitalLoss')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
              I understand that I may lose part or all of my investment.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={checkboxes.accredited} onChange={() => handleCheckboxChange('accredited')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
              I confirm that I meet the required income or net-worth criteria.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={checkboxes.noGuarantee} onChange={() => handleCheckboxChange('noGuarantee')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
              I understand that past performance does not guarantee future
              results.
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button disabled={!allChecked} className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${allChecked ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Continue to Documents
          </button>
          {!allChecked && <p className="text-xs text-gray-500 text-center mt-2">
              *Button becomes active only when all four boxes are checked*
            </p>}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">
            Want to know more?
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
export function InvestmentRiskView() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<RiskVariant>('full');
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
                <p className="text-xs text-gray-500">Risk Acknowledgment</p>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setVariant('full')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'full' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Full Details
              </button>
              <button onClick={() => setVariant('minimal')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'minimal' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Minimal
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
            <p className="text-sm">I'd like to invest 200000</p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={variant === 'full' ? <FullRiskContent /> : <MinimalRiskContent />} showFeedback={true} />
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