import React, { useEffect, useState, useRef } from 'react';
import { Pencil, Type as TypeIcon, Eraser } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui';

type SignatureTab = 'draw' | 'type';

type SignatureCanvasProps = {
  onSignatureChange?: (signature: string | null) => void;
};

export function SignatureCanvas({ onSignatureChange }: SignatureCanvasProps) {
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

  return (
    <div className="space-y-4">
      {/* Tab Selector */}
      <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('draw')}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
            activeTab === 'draw'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Pencil className="w-4 h-4" />
          Draw
        </button>
        <button
          onClick={() => setActiveTab('type')}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
            activeTab === 'type'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <TypeIcon className="w-4 h-4" />
          Type
        </button>
      </div>

      {/* Signature Input Area */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Your Signature
        </label>

        {activeTab === 'draw' ? (
          <div className="space-y-2">
            <div className="relative bg-card border-2 border-dashed border-border rounded-xl overflow-hidden">
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full cursor-crosshair"
                style={{ touchAction: 'none' }}
              />
              {!isDrawing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-muted-foreground text-sm">
                    Draw your signature here
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Eraser className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              placeholder="Type your full name"
              className="w-full px-4 py-3 bg-card border-2 border-border rounded-xl text-lg font-serif italic focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              style={{ fontFamily: 'Brush Script MT, cursive' }}
            />
            {typedSignature && (
              <div className="p-4 bg-muted border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <p
                  className="text-2xl font-serif italic text-foreground"
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                >
                  {typedSignature}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button variant="primary" size="lg">
          Submit Signature
        </Button>
      </div>
    </div>
  );
}
