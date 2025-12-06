import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, FileText, Sparkles } from 'lucide-react';
type DocumentVariant = 'full' | 'card';
export function DocumentDetailView() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<DocumentVariant>('full');
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
                <p className="text-xs text-gray-500">Document Review</p>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setVariant('full')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'full' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Full Breakdown
              </button>
              <button onClick={() => setVariant('card')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'card' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Card View
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* User Message */}
        <div className="flex justify-end mb-6">
          <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-xs shadow-sm">
            <p className="text-sm">Looks good. Let's move on</p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={variant === 'full' ? <FullBreakdownContent /> : <CardViewContent />} showFeedback={true} />
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
function FullBreakdownContent() {
  const suggestions = ['Can you explain this in simpler terms?', 'What are the key risks here?', 'Skip to the next document', 'Show me the full document'];
  return <div className="space-y-4">
      <p className="text-gray-800">
        Let's take these one at a time so nothing feels overwhelming.
      </p>

      <h3 className="font-semibold text-gray-900 text-lg pt-2">
        Document 1 of 3: Subscription Agreement & Privacy Notice
      </h3>

      <p className="text-gray-800">Here's the short version:</p>

      <p className="leading-relaxed text-gray-800">
        This document outlines the Subscription Agreement for Databricks,
        detailing the qualifications and representations required for
        subscribers to participate in the investment. It specifies the criteria
        for various types of investors, including employee benefit plans,
        corporations, partnerships, and individuals, ensuring compliance with
        relevant regulations.
      </p>

      <ul className="space-y-3 mt-2 list-none pl-1">
        {['Subscribers must meet specific criteria, such as being an employee benefit plan with total assets exceeding $5 million or being a corporation not formed for the purpose of acquiring interests.', 'Entities must provide a list of equity owners or grantors who qualify under the specified investor categories.', 'Subscribers with FINRA certifications (Series 7, 65, or 82) are recognized as qualified investors.', '"Knowledgeable employees" of private funds are also eligible to subscribe, as defined under the Investment Company Act.', 'The document outlines the definition of "Qualified Purchaser," requiring individuals or entities to have a minimum of $5 million in investments.', 'Subscribers must confirm they are not acting on behalf of entities deemed to hold assets of an Employee Benefit Plan under ERISA regulations.', "Compliance with the USA PATRIOT Act is required, including verification of the funding bank's location and the subscriber's relationship with it.", 'Additional documentation may be required for subscribers not banking with a U.S. or FATF country institution, including identification and proof of address.'].map((item, i) => <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-700">
            <span className="text-gray-400 mt-1.5">•</span>
            <span>{item}</span>
          </li>)}
      </ul>

      <div className="pt-2">
        <a href="#" className="text-violet-600 hover:text-violet-700 font-medium underline decoration-violet-300 underline-offset-4 hover:decoration-violet-700 transition-all">
          View Full Document
        </a>
      </div>

      <p className="pt-2 text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
        Want a quicker recap or is this clear? Just tell me when it feels clear
        and I'll queue the next doc.
      </p>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">Quick actions:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}
function CardViewContent() {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const suggestions = ['Explain the key points', 'What do I need to sign?', 'Show next document', 'Any red flags here?'];
  return <div className="space-y-4">
      <p className="text-gray-800">
        Here's Document 1 of 3. I've summarized the key points for you.
      </p>

      {/* Document Preview Card */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        {/* Document Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Subscription Agreement & Privacy Notice
            </h4>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            View
          </button>
        </div>

        {/* Summary Section */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <h5 className="font-semibold text-gray-900">Summary</h5>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              This document outlines the Subscription Agreement for Databricks,
              detailing the qualifications and representations required for
              subscribers to participate in the investment. It specifies the
              criteria for various types of investors, including employee
              benefit plans, corporations, partnerships, and individuals,
              ensuring compliance with relevant regulations.
            </p>

            <ul className="space-y-2 list-none pl-1">
              {['Subscribers must meet specific criteria, such as being an employee benefit plan with total assets exceeding $5 million or being a corporation not formed for the purpose of acquiring interests.', 'Entities must provide a list of equity owners or grantors who qualify under the specified investor categories.', 'Subscribers with FINRA certifications (Series 7, 65, or 82) are recognized as qualified investors.', '"Knowledgeable employees" of private funds are also eligible to subscribe, as defined under the Investment Company Act.', 'The document outlines the definition of "Qualified Purchaser," requiring individuals or entities to have a minimum of $5 million in investments.', 'Subscribers must confirm they are not acting on behalf of entities deemed to hold assets of an Employee Benefit Plan under ERISA regulations.', "Compliance with the USA PATRIOT Act is required, including verification of the funding bank's location and the subscriber's relationship with it.", 'Additional documentation may be required for subscribers not banking with a U.S. or FATF country institution, including identification and proof of address.'].slice(0, showFullSummary ? undefined : 4).map((item, i) => <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>)}
            </ul>

            {!showFullSummary ? <button onClick={() => setShowFullSummary(true)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                Read more
              </button> : <button onClick={() => setShowFullSummary(false)} className="text-sm font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                Show less
              </button>}
          </div>

          {/* View Document Button */}
          <div className="flex justify-end pt-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
              <FileText className="w-4 h-4" />
              View Document
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">Need help?</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, i) => <button key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all">
              {suggestion}
            </button>)}
        </div>
      </div>
    </div>;
}