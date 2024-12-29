/**
 * @module lib/utils/animations
 * @description Shared animation variants and utilities for consistent animations across components
 */

/**
 * Common animation variants for components
 */
export const animationVariants = {
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
}

/**
 * Default animation transition settings
 */
export const defaultTransition = {
  duration: 0.2,
  ease: 'easeInOut',
}

/**
 * Animation settings for dialog/modal components
 */
export const dialogAnimationVariants = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: { opacity: 0, scale: 0.95, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },
}

/**
 * Animation settings for toast notifications
 */
export const toastAnimationVariants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
}

/**
 * Stagger children animations helper
 * @param staggerChildren - Delay between each child animation
 * @returns Animation settings for parent container
 */
export const staggerContainer = (staggerChildren = 0.1) => ({
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.2,
    },
  },
}) 