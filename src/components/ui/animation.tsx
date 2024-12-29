/**
 * @module components/ui/animation
 * @description Shared animation components for consistent animations
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'

/**
 * FadeIn component props
 */
export interface FadeInProps extends HTMLMotionProps<'div'> {
  duration?: number
  delay?: number
  from?: 'top' | 'right' | 'bottom' | 'left'
  distance?: number
}

/**
 * FadeIn component for fade in animations
 */
export function FadeIn({
  className,
  duration = 0.3,
  delay = 0,
  from,
  distance = 20,
  children,
  ...props
}: FadeInProps) {
  const initial = {
    opacity: 0,
    ...(from === 'top' && { y: -distance }),
    ...(from === 'right' && { x: distance }),
    ...(from === 'bottom' && { y: distance }),
    ...(from === 'left' && { x: -distance }),
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scale component props
 */
export interface ScaleProps extends HTMLMotionProps<'div'> {
  duration?: number
  delay?: number
  from?: number
}

/**
 * Scale component for scale animations
 */
export function Scale({
  className,
  duration = 0.3,
  delay = 0,
  from = 0.95,
  children,
  ...props
}: ScaleProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Slide component props
 */
export interface SlideProps extends HTMLMotionProps<'div'> {
  duration?: number
  delay?: number
  from?: 'top' | 'right' | 'bottom' | 'left'
  distance?: number
}

/**
 * Slide component for slide animations
 */
export function Slide({
  className,
  duration = 0.3,
  delay = 0,
  from = 'right',
  distance = 100,
  children,
  ...props
}: SlideProps) {
  const initial = {
    ...(from === 'top' && { y: -distance }),
    ...(from === 'right' && { x: distance }),
    ...(from === 'bottom' && { y: distance }),
    ...(from === 'left' && { x: -distance }),
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ x: 0, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Collapse component props
 */
export interface CollapseProps extends HTMLMotionProps<'div'> {
  open?: boolean
  duration?: number
}

/**
 * Collapse component for collapse animations
 */
export function Collapse({
  className,
  open = false,
  duration = 0.3,
  children,
  ...props
}: CollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className={cn('overflow-hidden', className)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Stagger component props
 */
export interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  stagger?: number
  duration?: number
  delay?: number
  from?: 'top' | 'right' | 'bottom' | 'left'
  distance?: number
  children: React.ReactNode
}

/**
 * Stagger component for staggered animations
 */
export function Stagger({
  className,
  stagger = 0.1,
  duration = 0.3,
  delay = 0,
  from,
  distance = 20,
  children,
  ...props
}: StaggerProps) {
  const childArray = React.Children.toArray(children)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const item = {
    hidden: {
      opacity: 0,
      ...(from === 'top' && { y: -distance }),
      ...(from === 'right' && { x: distance }),
      ...(from === 'bottom' && { y: distance }),
      ...(from === 'left' && { x: -distance }),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      {...props}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
} 