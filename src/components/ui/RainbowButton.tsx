import React from "react"
import { cn } from "../../lib/utils"

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative cursor-pointer group animate-rainbow",
          "inline-flex items-center justify-center gap-2 shrink-0",
          "rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "text-sm font-medium whitespace-nowrap",
          "disabled:pointer-events-none disabled:opacity-50",
          "h-9 px-4 py-2",
          "border-0 text-white",
          "bg-[length:200%]",
          "[background-clip:padding-box,border-box,border-box]",
          "[background-origin:border-box]",
          "[border:2px_solid_transparent]",
          "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0",
          "before:h-1/5 before:w-3/5 before:-translate-x-1/2",
          "before:animate-rainbow",
          "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "before:[filter:blur(0.75rem)]",
          "before:bg-[length:200%]",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

RainbowButton.displayName = "RainbowButton"

export { RainbowButton }
