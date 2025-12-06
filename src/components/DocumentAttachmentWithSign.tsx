import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, FileText, Pencil, CheckCircle2, ExternalLink } from 'lucide-react';
type DocumentStatus = 'pending' | 'signed';
type SignableDocumentProps = {
  title: string;
  subtitle: string;
  status: DocumentStatus;
  onSign?: () => void;
};
function SignableDocumentCard({
  title,
  subtitle,
  status,
  onSign
}: SignableDocumentProps) {
  return <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-violet-200 transition-all group">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${status === 'signed' ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-violet-50'}`}>
          {status === 'signed' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <FileText className="w-5 h-5 text-gray-600 group-hover:text-violet-600" />}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      {status === 'signed' ? <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">
          <CheckCircle2 className="w-4 h-4" />
          Signed
        </div> : <button onClick={onSign} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
          <Pencil className="w-4 h-4" />
          Sign
        </button>}
    </div>;
}
function SigningContent() {
  const [ppmStatus, setPpmStatus] = useState<DocumentStatus>('pending');
  return <div className="space-y-4">
      <p className="text-gray-800">
        I've prepared the documents for your signature. Please review and sign
        the Private Placement Memorandum to proceed.
      </p>

      <div className="space-y-3 pt-2">
        {/* Signed Example */}
        <SignableDocumentCard title="Subscription Agreement" subtitle="Signed on Oct 24, 2023" status="signed" />

        {/* Unsigned Example */}
        <SignableDocumentCard title="Private Placement Memorandum" subtitle="Waiting for signature" status={ppmStatus} onSign={() => setPpmStatus('signed')} />
      </div>

      <p className="text-sm text-gray-500 pt-2">
        Once signed, we'll process your investment allocation immediately.
      </p>
    </div>;
}
export function DocumentAttachmentWithSign() {
  const [inputValue, setInputValue] = useState('');
  return <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Investment Assistant
            </h1>
            <p className="text-xs text-gray-500">
              Databricks Investment Review
            </p>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* User Message */}
        <div className="flex justify-end mb-6">
          <div className="bg-gray-900 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-xs shadow-sm">
            <p className="text-sm">I'm ready to sign.</p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={<SigningContent />} showFeedback={true} />
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