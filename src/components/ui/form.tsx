/**
 * @module components/ui/form
 * @description Shared form components for consistent form layouts and styling
 */

import { cn } from '@/lib/utils'
import { Stack } from './layout'

/**
 * Form component for consistent form layouts
 */
export function Form({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn('space-y-6', className)}
      {...props}
    />
  )
}

/**
 * FormGroup component for grouping form fields
 */
export function FormGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Stack
      className={cn('space-y-2', className)}
      {...props}
    />
  )
}

/**
 * FormLabel component for consistent form labels
 */
export function FormLabel({
  className,
  required,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

/**
 * FormDescription component for form field descriptions
 */
export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/**
 * FormMessage component for form field error messages
 */
export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) {
    return null
  }

  return (
    <p
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * FormActions component for form action buttons
 */
export function FormActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  )
}

/**
 * FormDivider component for visual separation in forms
 */
export function FormDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('my-6 border-t', className)}
      {...props}
    />
  )
} 