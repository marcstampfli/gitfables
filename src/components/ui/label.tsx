/**
 * @module Label
 * @description A styled label component built on top of Radix UI's label primitive.
 * Provides consistent styling and accessibility features.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email</Label>
 * 
 * // With form control
 * <div className="space-y-2">
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" />
 * </div>
 * ```
 */

'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Label variants configuration
 * @const
 * @private
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

/**
 * Label Component
 * 
 * @component
 * @description A styled label component that provides consistent text styling
 * and proper accessibility attributes. Supports disabled states through peer classes.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {...React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Additional label props
 * @returns {JSX.Element} A styled label element
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label } 