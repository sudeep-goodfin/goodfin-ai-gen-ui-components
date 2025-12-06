import React from 'react';
import { cn } from '../../lib/utils';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
};

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer group', className)}>
      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-accent/20 cursor-pointer"
        />
      </div>
      {label && (
        <span className="text-sm text-muted-foreground group-hover:text-foreground leading-relaxed">
          {label}
        </span>
      )}
    </label>
  );
}
