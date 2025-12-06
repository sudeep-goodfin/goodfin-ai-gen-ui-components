import React from 'react';
import { FileText, Pencil, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui';

type DocumentStatus = 'pending' | 'signed';

type SignableDocumentCardProps = {
  title: string;
  subtitle: string;
  status: DocumentStatus;
  onSign?: () => void;
};

export function SignableDocumentCard({
  title,
  subtitle,
  status,
  onSign,
}: SignableDocumentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-accent/20 transition-all group">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
            status === 'signed'
              ? 'bg-success/10'
              : 'bg-muted group-hover:bg-accent/5'
          )}
        >
          {status === 'signed' ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <FileText className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {status === 'signed' ? (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg text-sm font-medium border border-success/20">
          <CheckCircle2 className="w-4 h-4" />
          Signed
        </div>
      ) : (
        <Button onClick={onSign} size="sm">
          <Pencil className="w-4 h-4" />
          Sign
        </Button>
      )}
    </div>
  );
}

export type { DocumentStatus };
