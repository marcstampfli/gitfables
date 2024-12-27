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
  animation?: 'slide-up' | 'slide-down' | 'fade-in'
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
 * @param {string} [props.animation='slide-up'] - Animation type
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @returns {JSX.Element} A motion div wrapping the children
 */
export function Animated({ children, className, animation = 'slide-up', delay = 0 }: AnimatedProps) {
  const variants = {
    'slide-up': {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    'slide-down': {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  }

  return (
    <motion.div
      initial={variants[animation].initial}
      animate={variants[animation].animate}
      exit={variants[animation].exit}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={cn('transition-all', className)}
    >
      {children}
    </motion.div>
  )
} 