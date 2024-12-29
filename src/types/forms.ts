/**
 * @module types/forms
 * @description Type definitions for form components and form handling.
 */

import type { BaseProps, AsyncStateProps } from './ui'

/**
 * Base props for form input components.
 */
export interface BaseInputProps extends BaseProps {
  label?: string
  error?: string
  required?: boolean
  placeholder?: string
}

/**
 * Props for textarea components.
 */
export interface TextareaProps extends BaseInputProps {
  value: string
  onChange: (value: string) => void
  rows?: number
  maxLength?: number
  minLength?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

/**
 * Props for select components.
 */
export interface SelectProps extends BaseInputProps {
  value: string
  onChange: (value: string) => void
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  multiple?: boolean
  size?: number
}

/**
 * Props for input components.
 */
export interface InputProps extends BaseInputProps {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  maxLength?: number
  minLength?: number
  pattern?: string
  autoComplete?: string
  autoFocus?: boolean
}

/**
 * Props for checkbox components.
 */
export interface CheckboxProps extends BaseInputProps {
  checked: boolean
  onChange: (checked: boolean) => void
  indeterminate?: boolean
}

/**
 * Props for radio components.
 */
export interface RadioProps extends BaseInputProps {
  value: string
  checked: boolean
  onChange: (value: string) => void
  name: string
}

/**
 * Props for form components.
 */
export interface FormProps extends BaseProps, Pick<AsyncStateProps, 'loading' | 'error' | 'success'> {
  onSubmit: (data: FormData) => void
}

/**
 * Props for form field components.
 */
export interface FormFieldProps extends InputProps {
  name: string
  validate?: (value: string) => string | undefined
  transform?: (value: string) => string
} 