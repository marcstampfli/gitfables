/**
 * @module components/ui/error
 * @description Shared error components for consistent error states
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icons } from './icons'
import { Button } from './button'

/**
 * ErrorMessage component props
 */
export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  error?: Error | null
  retry?: () => void
  reset?: () => void
}

/**
 * ErrorMessage component for displaying error messages
 */
export function ErrorMessage({
  className,
  title = 'Something went wrong',
  error,
  retry,
  reset,
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4 text-center',
        className
      )}
      {...props}
    >
      <div className="rounded-full bg-error/10 p-3 text-error">
        <Icons.warning className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        {error?.message && (
          <p className="text-sm text-muted-foreground">{error.message}</p>
        )}
        {children}
      </div>
      {(retry || reset) && (
        <div className="flex items-center space-x-2">
          {retry && (
            <Button
              variant="outline"
              onClick={retry}
              className="space-x-2"
            >
              <Icons.spinner className="h-4 w-4" />
              <span>Try again</span>
            </Button>
          )}
          {reset && (
            <Button
              variant="ghost"
              onClick={reset}
              className="space-x-2"
            >
              <Icons.close className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * ErrorPage component props
 */
export interface ErrorPageProps extends ErrorMessageProps {
  statusCode?: number
}

/**
 * ErrorPage component for displaying full-page error states
 */
export function ErrorPage({
  className,
  statusCode,
  ...props
}: ErrorPageProps) {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center px-4',
        className
      )}
    >
      <ErrorMessage
        title={
          statusCode
            ? `Error ${statusCode}`
            : props.title
        }
        {...props}
      />
    </div>
  )
}

/**
 * ErrorBoundary component props
 */
export interface ErrorBoundaryProps extends React.PropsWithChildren {
  fallback?: React.ReactNode
  onError?: (error: Error) => void
}

/**
 * ErrorBoundary component state
 */
interface ErrorBoundaryState {
  error: Error | null
}

/**
 * ErrorBoundary component for catching and displaying errors
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error)
  }

  render() {
    const { fallback, children } = this.props
    const { error } = this.state

    if (error) {
      if (fallback) {
        return fallback
      }

      return (
        <ErrorMessage
          error={error}
          reset={() => this.setState({ error: null })}
        />
      )
    }

    return children
  }
}

/**
 * withErrorBoundary HOC for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
} 