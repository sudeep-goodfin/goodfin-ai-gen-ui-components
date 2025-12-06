import React, { useState } from 'react';
import { ChatMessage, InvestmentDocsMessage } from './ChatMessage';
import { Send, Sparkles, ChevronRight } from 'lucide-react';
type ReviewVariant = 'original' | 'compact';
const attachments = [{
  title: 'Subscription Agreement & Privacy Notice',
  subtitle: 'Legal Document • PDF',
  href: '#subscription-agreement'
}, {
  title: 'Limited Liability Company Agreement',
  subtitle: 'Legal Document • PDF',
  href: '#llc-agreement'
}, {
  title: 'Private Placement Memorandum',
  subtitle: 'Legal Document • PDF',
  href: '#ppm'
}];
export function InvestmentReviewChat() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<ReviewVariant>('original');
  return <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                Investment Assistant
              </h1>
              <p className="text-xs text-gray-500">
                Databricks Investment Review
              </p>
            </div>

            {/* Variant Selector */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-gray-500">Variants</span>
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setVariant('original')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'original' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Original
              </button>
              <button onClick={() => setVariant('compact')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'compact' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Compact
              </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* User Message */}
        <div className="flex justify-end mb-6">
          <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-xs shadow-sm">
            <p className="text-sm">
              {variant === 'original' ? 'Looks good!' : 'This is clear, ready for the next one.'}
            </p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={variant === 'original' ? <InvestmentDocsMessage /> : <CompactReviewContent />} attachments={variant === 'original' ? attachments : undefined} showFeedback={true} />
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-2 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type 'all clear' to proceed..." className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none" aria-label="Chat message input" />
            <button className="p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!inputValue.trim()} aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            AI-powered investment guidance • Not financial advice
          </p>
        </div>
      </div>
    </div>;
}
function CompactReviewContent() {
  const [disclaimers, setDisclaimers] = useState({
    accredited: true,
    longTerm: true,
    reviewed: true,
    capitalRisk: true
  });
  const allChecked = Object.values(disclaimers).every(val => val === true);
  const handleCheckboxChange = (key: keyof typeof disclaimers) => {
    setDisclaimers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const suggestions = ['What happens after I submit?', 'Can I review documents again?', 'How long until my investment is confirmed?'];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Great pace—you've reviewed the docs for your investment in Databricks.
      </p>

      <p className="text-gray-700 leading-relaxed">
        These are standard across private funds. Quick confirmations:
      </p>

      <ol className="space-y-2 list-decimal list-inside text-gray-700">
        <li className="text-sm">Accredited investor</li>
        <li className="text-sm">Long-term and illiquid (5-7+ years)</li>
        <li className="text-sm">
          Docs reviewed (PPM, LLOA, Subscription Agreement)
        </li>
        <li className="text-sm">Capital at risk / no guarantees</li>
      </ol>

      <p className="text-gray-700 leading-relaxed">
        When these look good, just say "all clear" and we'll move to your
        signature.
      </p>

      <div className="pt-2">
        <p className="text-sm font-semibold text-gray-900 mb-2">
          Reference links:
        </p>
        <ul className="space-y-1">
          <li>
            <a href="#" className="text-sm text-violet-600 hover:text-violet-700 underline">
              Subscription Agreement & Privacy Notice
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-violet-600 hover:text-violet-700 underline">
              Limited Liability Company Agreement
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-violet-600 hover:text-violet-700 underline">
              Private Placement Memorandum
            </a>
          </li>
        </ul>
      </div>

      {/* Investment Documents Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 mt-4">
        <h3 className="font-semibold text-gray-900">Investment Documents</h3>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-700">
              Subscription Agreement & Privacy Notice
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-700">
              Limited Liability Company Agreement
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
            <span className="text-sm font-medium text-gray-700">
              Private Placement Memorandum
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Disclaimers Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 mt-4">
        <h3 className="font-semibold text-gray-900">Disclaimers</h3>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={disclaimers.accredited} onChange={() => handleCheckboxChange('accredited')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
              I confirm that I am an accredited investor as defined by SEC
              regulations
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={disclaimers.longTerm} onChange={() => handleCheckboxChange('longTerm')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
              I understand this is a long-term illiquid investment with a
              typical 5-7+ year hold period
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={disclaimers.reviewed} onChange={() => handleCheckboxChange('reviewed')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
              I have reviewed and understand all legal documents (PPM, LLOA,
              Subscription Agreement)
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={disclaimers.capitalRisk} onChange={() => handleCheckboxChange('capitalRisk')} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
              I understand the risks of partial or total loss of capital
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button disabled={!allChecked} className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${allChecked ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Submitted
          </button>
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