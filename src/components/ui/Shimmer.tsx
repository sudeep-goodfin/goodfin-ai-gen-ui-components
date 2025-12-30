import React, { memo, ElementType, ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Shimmer Component
 *
 * An animated text shimmer effect that sweeps across text,
 * perfect for indicating loading states or progressive reveals.
 *
 * Based on AI SDK Elements Shimmer pattern.
 */

type ShimmerProps<T extends ElementType = 'span'> = {
  /** Text content for the shimmer effect */
  children: string;
  /** HTML element or component to render as */
  as?: T;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Spread multiplier for gradient (multiplied by text length) */
  spread?: number;
  /** Base text color (CSS variable or color value) */
  textColor?: string;
  /** Shimmer highlight color (CSS variable or color value) */
  shimmerColor?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>;

function ShimmerComponent<T extends ElementType = 'span'>({
  children,
  as,
  className,
  duration = 2,
  spread = 2,
  textColor = 'hsl(0 0% 65%)',
  shimmerColor = 'hsl(0 0% 20%)',
  ...props
}: ShimmerProps<T>) {
  const Component = as || 'span';
  const MotionComponent = motion(Component as ElementType);

  // Calculate spread based on text length for natural look
  const dynamicSpread = Math.max(children.length * spread, 20);

  return (
    <MotionComponent
      className={cn('inline-block', className)}
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          ${textColor} 0%,
          ${textColor} 40%,
          ${shimmerColor} 50%,
          ${textColor} 60%,
          ${textColor} 100%
        )`,
        backgroundSize: `${dynamicSpread}% 100%`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      animate={{
        backgroundPosition: [`${dynamicSpread}% 0%`, `-${dynamicSpread}% 0%`],
      }}
      transition={{
        duration,
        ease: 'linear',
        repeat: Infinity,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export const Shimmer = memo(ShimmerComponent) as typeof ShimmerComponent;

export default Shimmer;
