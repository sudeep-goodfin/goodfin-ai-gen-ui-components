import React, { useEffect, useState, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Send, Pencil, Type as TypeIcon, Eraser, ChevronRight, Sparkles } from 'lucide-react';
type SignatureTab = 'draw' | 'type';
type SignatureVariant = 'simple' | 'detailed';
function SignatureInputContent() {
  const [activeTab, setActiveTab] = useState<SignatureTab>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
      }
    }
  }, []);
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.beginPath();
      context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
    }
  };
  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };
  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  return <div className="space-y-4">
      <p className="text-gray-800">
        Please provide your signature below to complete the document signing
        process.
      </p>

      {/* Tab Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        <button onClick={() => setActiveTab('draw')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'draw' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <Pencil className="w-4 h-4" />
          Draw
        </button>
        <button onClick={() => setActiveTab('type')} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'type' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <TypeIcon className="w-4 h-4" />
          Type
        </button>
      </div>

      {/* Signature Input Area */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Your Signature
        </label>

        {activeTab === 'draw' ? <div className="space-y-2">
            <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-xl overflow-hidden">
              <canvas ref={canvasRef} width={600} height={200} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} className="w-full cursor-crosshair" style={{
            touchAction: 'none'
          }} />
              {!isDrawing && context?.getImageData(0, 0, 600, 200).data.every(x => x === 0) && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-gray-400 text-sm">
                      Draw your signature here
                    </p>
                  </div>}
            </div>
            <div className="flex justify-end">
              <button onClick={clearCanvas} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Eraser className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div> : <div className="space-y-2">
            <input type="text" value={typedSignature} onChange={e => setTypedSignature(e.target.value)} placeholder="Type your full name" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-lg font-serif italic focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all" style={{
          fontFamily: 'Brush Script MT, cursive'
        }} />
            {typedSignature && <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <p className="text-2xl font-serif italic" style={{
            fontFamily: 'Brush Script MT, cursive'
          }}>
                  {typedSignature}
                </p>
              </div>}
          </div>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button className="px-6 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-sm">
          Submit Signature
        </button>
      </div>
    </div>;
}
function DetailedSignatureContent() {
  const [signatureName, setSignatureName] = useState('jay');
  const [agreedToDocuments, setAgreedToDocuments] = useState(true);
  const suggestions = ['Can I change my signature later?', 'What happens after I submit?', 'Is this legally binding?'];
  return <div className="space-y-4">
      <p className="text-gray-800 leading-relaxed">
        Perfect—everything's confirmed.
      </p>

      <div className="space-y-2">
        <p className="font-semibold text-gray-900">
          Legal Documents for Your Review:
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

      <p className="text-gray-700 leading-relaxed">
        To finalize the paperwork for your investment in Databricks, how would
        you like your name to appear on the documents?
      </p>

      <p className="text-gray-600 text-sm leading-relaxed">
        Your electronic signature carries the same legal weight as a handwritten
        one.
      </p>

      <p className="text-gray-600 text-sm leading-relaxed">
        Just type the name you want to use, and I'll apply it.
      </p>

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

        {/* Agreement Checkbox */}
        <div className="pt-3 border-t border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={agreedToDocuments} onChange={e => setAgreedToDocuments(e.target.checked)} className="w-5 h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-violet-200 cursor-pointer" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
              I have read and agreed to these documents.
            </span>
          </label>
        </div>
      </div>

      {/* Add Signature Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 mt-4">
        <h3 className="font-semibold text-gray-900">Add Signature</h3>

        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-3xl text-gray-700 text-center" style={{
            fontFamily: 'Brush Script MT, cursive'
          }}>
              {signatureName}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">Submit after signing</p>
          <button disabled={!agreedToDocuments} className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${agreedToDocuments ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Submitted
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-medium text-gray-700">
            Questions about signing:
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
export function SignatureInputView() {
  const [inputValue, setInputValue] = useState('');
  const [variant, setVariant] = useState<SignatureVariant>('simple');
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
                <p className="text-xs text-gray-500">Document Signature</p>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setVariant('simple')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'simple' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Simple
              </button>
              <button onClick={() => setVariant('detailed')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${variant === 'detailed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                Detailed
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
            <p className="text-sm">
              {variant === 'simple' ? 'Ready to sign' : 'I confirm all four items and am ready to proceed with signature.'}
            </p>
          </div>
        </div>

        {/* AI Response */}
        <ChatMessage content={variant === 'simple' ? <SignatureInputContent /> : <DetailedSignatureContent />} showFeedback={true} />
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