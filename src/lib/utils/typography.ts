/**
 * @module lib/utils/typography
 * @description Shared typography styles and utilities
 */

import { cva } from 'class-variance-authority'

/**
 * Heading styles with consistent typography across the application
 */
export const headingVariants = cva(
  'font-semibold tracking-tight',
  {
    variants: {
      size: {
        h1: 'text-4xl lg:text-5xl',
        h2: 'text-3xl lg:text-4xl',
        h3: 'text-2xl lg:text-3xl',
        h4: 'text-xl lg:text-2xl',
        h5: 'text-lg lg:text-xl',
        h6: 'text-base lg:text-lg',
      },
    },
    defaultVariants: {
      size: 'h1',
    },
  }
)

/**
 * Text styles with consistent typography across the application
 */
export const textVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      weight: 'normal',
    },
  }
)

/**
 * Link styles with consistent typography across the application
 */
export const linkVariants = cva(
  'underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-foreground/80',
        muted: 'text-muted-foreground hover:text-muted-foreground/80',
        destructive: 'text-destructive hover:text-destructive/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
) 