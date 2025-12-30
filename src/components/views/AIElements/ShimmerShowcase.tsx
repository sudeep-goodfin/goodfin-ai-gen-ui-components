import { Shimmer } from '../../ui/Shimmer';

export const shimmerVariants = [
  { id: 'default', label: 'Default' },
  { id: 'fast', label: 'Fast' },
  { id: 'slow', label: 'Slow' },
  { id: 'custom-colors', label: 'Custom Colors' },
];

type ShimmerShowcaseProps = {
  variant?: 'default' | 'fast' | 'slow' | 'custom-colors';
};

/**
 * ShimmerShowcase - Display component for the Shimmer text effect
 *
 * Shows animated text shimmer effects commonly used for:
 * - Loading states
 * - AI "thinking" indicators
 * - Progressive text reveals
 */
export function ShimmerShowcase({ variant = 'default' }: ShimmerShowcaseProps) {
  const getShimmerProps = () => {
    switch (variant) {
      case 'fast':
        return { duration: 1 };
      case 'slow':
        return { duration: 4 };
      case 'custom-colors':
        return {
          textColor: 'hsl(250 60% 70%)',
          shimmerColor: 'hsl(250 80% 40%)',
          duration: 2,
        };
      default:
        return { duration: 2 };
    }
  };

  const props = getShimmerProps();

  return (
    <div className="p-8 bg-[#EDEBEE] min-h-[400px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Shimmer Text Effect
          </h3>
          <p className="text-sm text-muted-foreground">
            {variant === 'default' && 'Default shimmer with standard timing'}
            {variant === 'fast' && 'Fast shimmer for quick loading states'}
            {variant === 'slow' && 'Slow shimmer for contemplative AI states'}
            {variant === 'custom-colors' && 'Custom brand colors for shimmer'}
          </p>
        </div>

        {/* Preview area with app background */}
        <div className="rounded-xl border-2 border-white bg-[#F7F7F8] p-6 space-y-6">
          {/* Heading example */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Heading</span>
            <div>
              <Shimmer as="h2" className="text-2xl font-heading" {...props}>
                Analyzing your investment profile...
              </Shimmer>
            </div>
          </div>

          {/* Body text example */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Body Text</span>
            <div>
              <Shimmer as="p" className="text-base" {...props}>
                Processing your request, please wait a moment...
              </Shimmer>
            </div>
          </div>

          {/* Small text example */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Small Text</span>
            <div>
              <Shimmer as="span" className="text-sm" {...props}>
                Loading...
              </Shimmer>
            </div>
          </div>

          {/* Multiple lines example */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Multiple Phrases</span>
            <div className="space-y-1">
              <Shimmer className="text-lg block" {...props}>
                crunching numbers...
              </Shimmer>
              <Shimmer className="text-lg block" {...props} duration={props.duration + 0.5}>
                reading the charts...
              </Shimmer>
              <Shimmer className="text-lg block" {...props} duration={props.duration + 1}>
                brewing insights...
              </Shimmer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShimmerShowcase;
