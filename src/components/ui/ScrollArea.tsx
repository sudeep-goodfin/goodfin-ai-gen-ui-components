import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '../../lib/utils';

type ScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
};

export function ScrollArea({ children, className, orientation = 'vertical' }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

type ScrollBarProps = {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

function ScrollBar({ orientation = 'vertical', className }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className
      )}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          'relative flex-1 rounded-full',
          'bg-grey-300 hover:bg-grey-400 transition-colors'
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollBar };
