import React from 'react';
import { cn } from '../../lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-card text-card-foreground rounded-xl border border-border', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('p-5 border-b border-border', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn('p-5 pt-0', className)}>
      {children}
    </div>
  );
}
