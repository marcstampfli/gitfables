/**
 * @module Animated
 * @description A wrapper component that adds fade and slide animations to its children
 * using Framer Motion.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Animated>
 *   <div>Content to animate</div>
 * </Animated>
 * 
 * // With custom class
 * <Animated className="p-4">
 *   <div>Content to animate</div>
 * </Animated>
 * ```
 */

'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { animationVariants, defaultTransition } from '@/lib/utils/animations'

/**
 * Props for the Animated component
 * @interface
 */
interface AnimatedProps {
  /** Child elements to animate */
  children: React.ReactNode
  /** Optional CSS classes */
  className?: string
  /** Animation type (slide-up, slide-down, fade-in, etc.) */
  animation?: keyof typeof animationVariants
  /** Animation delay in milliseconds */
  delay?: number
}

/**
 * Animated Component
 * 
 * @component
 * @description Wraps children in a motion div that provides animations like fade-in,
 * slide-up, and slide-down on mount, with reverse animations on unmount.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} [props.className] - Optional CSS classes
 * @param {string} [props.animation='slideUp'] - Animation type
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @returns {JSX.Element} A motion div wrapping the children
 */
export function Animated({ children, className, animation = 'slideUp', delay = 0 }: AnimatedProps) {
  const variant = animationVariants[animation]

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{
        ...defaultTransition,
        delay: delay / 1000,
      }}
      className={cn('transition-all', className)}
    >
      {children}
    </motion.div>
  )
} 