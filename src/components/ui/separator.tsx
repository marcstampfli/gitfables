/**
 * @module Separator
 * @description A component that renders a visual divider between content,
 * built on top of Radix UI's separator primitive.
 * 
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <Separator />
 * 
 * // Vertical separator
 * <Separator orientation="vertical" className="h-4" />
 * 
 * // With custom styling
 * <Separator className="my-4 bg-primary" />
 * ```
 */

"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator Component
 * 
 * @component
 * @description A visual divider that can be oriented horizontally or vertically.
 * Provides semantic meaning through ARIA attributes and can be styled via className.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {"horizontal"|"vertical"} [props.orientation="horizontal"] - The orientation of the separator
 * @param {boolean} [props.decorative=true] - Whether the separator is purely decorative
 * @param {...React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - Additional separator props
 * @returns {JSX.Element} A styled separator element
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator } 