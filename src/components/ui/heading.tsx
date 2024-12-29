/**
 * @module components/ui/heading
 * @description Shared heading component with consistent typography
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Heading variants for different sizes
 */
const headingVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
        h2: 'text-3xl sm:text-4xl md:text-5xl',
        h3: 'text-2xl sm:text-3xl md:text-4xl',
        h4: 'text-xl sm:text-2xl md:text-3xl',
        h5: 'text-lg sm:text-xl md:text-2xl',
        h6: 'text-base sm:text-lg md:text-xl',
      },
    },
    defaultVariants: {
      size: 'h1',
    },
  }
)

/**
 * Heading component props
 */
interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Heading component for consistent typography
 */
function Heading({
  className,
  size,
  as: Component = 'h1',
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size }), className)}
      {...props}
    />
  )
}

export { Heading, headingVariants }
export default Heading 