import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, Layers, Sparkles } from 'lucide-react';
type DealVariant = 'full' | 'minimal';
function FullDealContent() {
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Excellent choice, Jay! Databricks IV is one of the most compelling
        opportunities in the AI and data infrastructure space right now.
      </p>

      <div className="space-y-3">
        <p className="text-gray-800 font-medium">
          Here's why Databricks IV stands out:
        </p>

        <ul className="space-y-2 list-none pl-1">
          <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>
              Backed by top investors (Andreessen Horowitz, NVIDIA, BlackRock,
              and more), Databricks boasts a valuation topping $130 billion.
            </span>
          </li>
          <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>
              The company leads in data intelligence, empowering over 15,000
              customers—including the world's largest enterprises—by unifying
              analytics, machine learning, and AI on a single, scalable
              platform.
            </span>
          </li>
          <li className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>
              Their rapid growth (over $3.7 billion in annual recurring revenue
              and 50% year-over-year growth) and recent innovations in AI agent
              technology position them as a leader in the pre-IPO category.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-gray-800 leading-relaxed">
        The minimum investment amount for this product is{' '}
        <span className="font-bold text-gray-900">$25,000</span>—this applies
        even to premium members due to the product's unique terms.
      </p>

      <p className="text-gray-800 leading-relaxed">
        Would you like to move forward and confirm your intent to invest in
        Databricks IV? Let me know if you have any questions, or if you'd like
        to proceed and set your investment amount.
      </p>

      <DealCard />
    </div>;
}
function MinimalDealContent() {
  const suggestions = ['Tell me more about the team', 'What are the risks?', 'Show me the financials', 'How does this compare to competitors?'];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Here's the Databricks IV investment opportunity. This is a pre-IPO
        investment in one of the leading AI and data infrastructure companies.
      </p>

      <DealCard />

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">
            Ask me anything about this deal:
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}
function DealCard() {
  return <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mt-6">
      {/* Card Header */}
      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900">Databricks IV</h3>
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                LIVE
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Databricks is the world's leading Data Intelligence Platform,
          empowering enterprises to unify analytics, machine learning, real-time
          data, and AI agents on a single cloud-native foundation. By...
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Price Share</p>
            <p className="text-lg font-bold text-gray-900">$206</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Minimum Investment</p>
            <p className="text-lg font-bold text-amber-700">$25,000</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
          Invest Now
        </button>
      </div>
    </div>;
}
export function DealPreviewView() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<DealVariant>('full');
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
                <p className="text-xs text-gray-500">Friday, December 5th</p>
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
          <div className="bg-gray-900 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-md shadow-sm">
            <p className="text-sm">I want to invest in Databricks IV</p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={variant === 'full' ? <FullDealContent /> : <MinimalDealContent />} showFeedback={true} />
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