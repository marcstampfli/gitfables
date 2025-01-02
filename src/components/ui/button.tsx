/**
 * @module components/ui/button
 * @description Shared button components for consistent button styles
 */

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

/**
 * Button variants for different styles and states
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

/**
 * Button component for consistent button styles
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, icon, iconPosition = 'left', asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // If loading, show spinner and loading text
    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          disabled
          {...props}
        >
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </Comp>
      )
    }

    // For icon-only buttons
    if (size === 'icon' && icon && !children) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {icon}
        </Comp>
      )
    }

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {React.cloneElement(children as React.ReactElement, {
            className: 'inline-flex items-center gap-2',
            children: (
              <>
                {iconPosition === 'left' && icon}
                {(children as React.ReactElement).props.children}
                {iconPosition === 'right' && icon}
              </>
            ),
          })}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

/**
 * IconButton component props
 */
export interface IconButtonProps extends ButtonProps {
  label: string
}

/**
 * IconButton component for icon-only buttons with accessibility
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, label, size = 'icon', ...props }, ref) => {
    return (
      <Button
        className={className}
        size={size}
        ref={ref}
        aria-label={label}
        icon={icon}
        {...props}
      />
    )
  }
)
IconButton.displayName = 'IconButton' 