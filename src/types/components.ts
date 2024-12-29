/**
 * @module types/components
 * @description Type definitions for React components and their props.
 */

import type { BaseProps, ComponentSize, ComponentVariant, AsyncStateProps } from './ui'

/**
 * Props for navigation components.
 */
export interface NavigationProps extends BaseProps {
  items: Array<{
    label: string
    href: string
    icon?: React.ReactNode
    disabled?: boolean
  }>
  orientation?: 'horizontal' | 'vertical'
  size?: ComponentSize
}

/**
 * Props for card components.
 */
export interface CardProps extends BaseProps {
  title?: string
  description?: string
  image?: {
    src: string
    alt: string
  }
  footer?: React.ReactNode
  variant?: ComponentVariant
}

/**
 * Props for list components.
 */
export interface ListProps<T> extends BaseProps, Pick<AsyncStateProps, 'loading' | 'error' | 'onRetry'> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  emptyState?: React.ReactNode
}

/**
 * Props for tab components.
 */
export interface TabProps extends BaseProps {
  tabs: Array<{
    label: string
    value: string
    content: React.ReactNode
    disabled?: boolean
  }>
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  size?: ComponentSize
}

/**
 * Props for avatar components.
 */
export interface AvatarProps extends BaseProps {
  src?: string
  alt?: string
  fallback?: string
  size?: ComponentSize
  variant?: ComponentVariant
}

/**
 * Props for badge components.
 */
export interface BadgeProps extends BaseProps {
  label: string
  count?: number
  variant?: ComponentVariant
  size?: ComponentSize
} 