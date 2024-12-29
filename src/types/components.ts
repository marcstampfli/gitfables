/**
 * @module types/components
 * @description Type definitions for React components and their props.
 */

import type { ReactNode } from 'react'

/**
 * Common UI component variants.
 */
export type ComponentVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

/**
 * Common UI component sizes.
 */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Common UI component states.
 */
export type ComponentState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Base props interface for UI components.
 */
export interface BaseProps {
  className?: string
  disabled?: boolean
  children?: ReactNode
  testId?: string
}

/**
 * Common loading state props.
 */
export interface LoadingStateProps {
  loading: boolean
  error?: string
  children?: ReactNode
}

/**
 * Common async state props.
 */
export interface AsyncStateProps extends LoadingStateProps {
  success?: string
  onRetry?: () => void
}

/**
 * Button component props.
 */
export interface ButtonProps extends BaseProps {
  variant?: ComponentVariant
  size?: ComponentSize
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

/**
 * Modal dialog props.
 */
export interface ModalProps extends BaseProps {
  title: string
  isOpen: boolean
  onClose: () => void
  size?: ComponentSize
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

/**
 * Props for navigation components.
 */
export interface NavigationProps extends BaseProps {
  items: Array<{
    label: string
    href: string
    icon?: ReactNode
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
  footer?: ReactNode
  variant?: ComponentVariant
}

/**
 * Props for list components.
 */
export interface ListProps<T> extends BaseProps, Pick<AsyncStateProps, 'loading' | 'error' | 'onRetry'> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string
  emptyState?: ReactNode
}

/**
 * Props for tab components.
 */
export interface TabProps extends BaseProps {
  tabs: Array<{
    label: string
    value: string
    content: ReactNode
    disabled?: boolean
  }>
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  size?: ComponentSize
}

/**
 * Props for header components.
 */
export interface HeaderProps extends BaseProps {
  title: string
  description?: string
  actions?: ReactNode
}

/**
 * Props for footer components.
 */
export interface FooterProps extends BaseProps {
  actions?: ReactNode
  sticky?: boolean
}

/**
 * Props for dialog components.
 */
export interface DialogProps extends BaseProps {
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  footer?: ReactNode
} 