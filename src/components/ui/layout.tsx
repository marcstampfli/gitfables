/**
 * @module components/ui/layout
 * @description Shared layout components for consistent spacing and structure
 */

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

/**
 * Container variants for different max-widths and padding
 */
const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        full: 'max-w-none',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

/**
 * Container component for consistent max-width and padding
 */
export function Container({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'full'
}) {
  return (
    <div
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  )
}

/**
 * Section component for consistent vertical spacing
 */
export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('py-12 sm:py-16 lg:py-20', className)}
      {...props}
    />
  )
}

/**
 * Grid component for consistent grid layouts
 */
export function Grid({
  className,
  cols = 1,
  gap = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'none' | 'sm' | 'default' | 'lg'
}) {
  const gapClasses = {
    none: '',
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
  }

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-12',
  }

  return (
    <div
      className={cn(
        'grid',
        colClasses[cols],
        gapClasses[gap],
        className
      )}
      {...props}
    />
  )
}

/**
 * Stack component for consistent vertical spacing between elements
 */
export function Stack({
  className,
  space = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  space?: 'none' | 'sm' | 'default' | 'lg'
}) {
  const spaceClasses = {
    none: '',
    sm: 'space-y-2',
    default: 'space-y-4',
    lg: 'space-y-6',
  }

  return (
    <div
      className={cn(
        'flex flex-col',
        spaceClasses[space],
        className
      )}
      {...props}
    />
  )
}

/**
 * Cluster component for consistent horizontal spacing between elements
 */
export function Cluster({
  className,
  space = 'default',
  align = 'center',
  justify = 'start',
  wrap = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  space?: 'none' | 'sm' | 'default' | 'lg'
  align?: 'start' | 'center' | 'end'
  justify?: 'start' | 'center' | 'end' | 'between'
  wrap?: boolean
}) {
  const spaceClasses = {
    none: '',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }

  return (
    <div
      className={cn(
        'flex',
        wrap && 'flex-wrap',
        spaceClasses[space],
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
      {...props}
    />
  )
} 