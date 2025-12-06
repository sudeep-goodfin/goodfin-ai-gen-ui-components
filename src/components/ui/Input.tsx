import React from 'react';
import { cn } from '../../lib/utils';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  'aria-label'?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export function Input({
  value,
  onChange,
  placeholder,
  className,
  type = 'text',
  prefix,
  suffix,
  ...props
}: InputProps) {
  return (
    <div className={cn(
      'flex items-center gap-2 bg-muted rounded-lg border border-border px-4 py-3',
      'focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all',
      className
    )}>
      {prefix}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
        {...props}
      />
      {suffix}
    </div>
  );
}
