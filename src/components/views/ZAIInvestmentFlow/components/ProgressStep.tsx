import { Check, Lock, FileText, UserCheck, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepStatus = 'completed' | 'current' | 'locked';

interface ProgressStepProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  status: StepStatus;
  icon: 'documents' | 'identity' | 'transfer';
  onClick?: () => void;
}

const iconMap = {
  documents: FileText,
  identity: UserCheck,
  transfer: CreditCard,
};

export function ProgressStep({
  stepNumber,
  title,
  subtitle,
  status,
  icon,
  onClick,
}: ProgressStepProps) {
  const Icon = iconMap[icon];
  const isClickable = status === 'current' || status === 'completed';

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left',
        status === 'current' && 'bg-white shadow-sm border border-[#e0dce0]',
        status === 'completed' && 'bg-[#f7f7f8] hover:bg-[#edebee]',
        status === 'locked' && 'bg-[#f7f7f8] opacity-60 cursor-not-allowed'
      )}
    >
      {/* Step indicator */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
          status === 'completed' && 'bg-[#5a8a5a]',
          status === 'current' && 'bg-[#373338]',
          status === 'locked' && 'bg-[#c0bcc0]'
        )}
      >
        {status === 'completed' ? (
          <Check className="w-5 h-5 text-white" />
        ) : status === 'locked' ? (
          <Lock className="w-4 h-4 text-white" />
        ) : (
          <Icon className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-medium text-[#7f7582] uppercase tracking-wide"
            style={{ fontFamily: 'Soehne, sans-serif' }}
          >
            Step {stepNumber}
          </span>
        </div>
        <h3
          className={cn(
            'text-[15px] font-medium mt-0.5',
            status === 'locked' ? 'text-[#a09a9f]' : 'text-[#373338]'
          )}
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-[13px] mt-0.5',
            status === 'locked' ? 'text-[#b0abb0]' : 'text-[#7f7582]'
          )}
          style={{ fontFamily: 'Soehne, sans-serif' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Action indicator */}
      {status === 'current' && (
        <div
          className="px-3 py-1.5 bg-[#373338] text-white text-xs font-medium rounded-full flex-shrink-0"
          style={{ fontFamily: 'Soehne Kraftig, sans-serif' }}
        >
          Continue
        </div>
      )}
    </button>
  );
}
