/**
 * @module components/ui/feedback
 * @description Shared feedback components for consistent user feedback elements
 */

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Icons } from './icons'

/**
 * Alert component props
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  icon?: React.ReactNode
  title?: string
  action?: React.ReactNode
}

/**
 * Alert component for displaying feedback messages
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', icon, title, action, children, ...props }, ref) => {
    const variantIcon = {
      default: <Icons.help className="h-4 w-4" />,
      info: <Icons.help className="h-4 w-4" />,
      success: <Icons.check className="h-4 w-4" />,
      warning: <Icons.warning className="h-4 w-4" />,
      error: <Icons.close className="h-4 w-4" />,
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border p-4',
          {
            'bg-background text-foreground': variant === 'default',
            'border-info bg-info/10 text-info': variant === 'info',
            'border-success bg-success/10 text-success': variant === 'success',
            'border-warning bg-warning/10 text-warning': variant === 'warning',
            'border-error bg-error/10 text-error': variant === 'error',
          },
          className
        )}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <div className="shrink-0">
            {icon || variantIcon[variant]}
          </div>
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-medium leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm [&_p]:leading-relaxed">
              {children}
            </div>
          </div>
          {action && (
            <div className="shrink-0">{action}</div>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

/**
 * Progress component props
 */
export interface ProgressProps
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'default' | 'sm' | 'lg'
  showValue?: boolean
}

/**
 * Progress component for displaying progress bars
 */
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  ({ className, variant = 'default', size = 'default', value, max = 100, showValue, ...props }, ref) => {
    const percentage = value != null ? Math.round((Number(value) / Number(max)) * 100) : null

    return (
      <div className="relative">
        <progress
          ref={ref}
          className={cn(
            'h-2 w-full overflow-hidden rounded-full bg-secondary',
            {
              '[&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary': variant === 'default',
              '[&::-webkit-progress-value]:bg-success [&::-moz-progress-bar]:bg-success': variant === 'success',
              '[&::-webkit-progress-value]:bg-warning [&::-moz-progress-bar]:bg-warning': variant === 'warning',
              '[&::-webkit-progress-value]:bg-error [&::-moz-progress-bar]:bg-error': variant === 'error',
            },
            {
              'h-1': size === 'sm',
              'h-2': size === 'default',
              'h-3': size === 'lg',
            },
            className
          )}
          value={value}
          max={max}
          {...props}
        />
        {showValue && percentage != null && (
          <span className="absolute right-0 top-0 -translate-y-full text-xs font-medium">
            {percentage}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'

/**
 * Spinner component props
 */
export interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Spinner component for loading states
 */
export function Spinner({ className, size = 'default', ...props }: SpinnerProps) {
  return (
    <svg
      className={cn(
        'animate-spin',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'default',
          'h-8 w-8': size === 'lg',
        },
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Skeleton component props
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circle' | 'rounded'
}

/**
 * Skeleton component for loading states
 */
export function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        {
          'rounded-md': variant === 'default',
          'rounded-full': variant === 'circle',
          'rounded-lg': variant === 'rounded',
        },
        className
      )}
      {...props}
    />
  )
} 