/**
 * @module types/ui
 * @description Type definitions for UI components and interactions.
 */

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
  children?: React.ReactNode
  testId?: string
}

/**
 * Common loading state props.
 */
export interface LoadingStateProps {
  loading: boolean
  error?: string
  children?: React.ReactNode
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
  icon?: React.ReactNode
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