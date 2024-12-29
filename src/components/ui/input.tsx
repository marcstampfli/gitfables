/**
 * @module components/ui/input
 * @description Shared input components for consistent form inputs
 */

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

/**
 * Input variants for different styles and states
 */
const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      inputSize: {
        default: 'h-10',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
)

/**
 * Input component props
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost' | 'error'
  inputSize?: 'default' | 'sm' | 'lg'
}

/**
 * Input component for text input fields
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

/**
 * Textarea component props
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'ghost' | 'error'
}

/**
 * Textarea component for multiline text input
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'error' && 'border-destructive focus-visible:ring-destructive',
          variant === 'ghost' && 'border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

/**
 * SearchInput component props
 */
export interface SearchInputProps extends InputProps {
  onSearch?: (value: string) => void
  debounceMs?: number
}

/**
 * SearchInput component with debounced search callback
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, debounceMs = 300, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      props.onChange?.(e)

      if (onSearch) {
        const timeoutId = setTimeout(() => {
          onSearch(value)
        }, debounceMs)

        return () => clearTimeout(timeoutId)
      }
    }

    return (
      <Input
        type="search"
        className={cn('pr-8', className)}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'