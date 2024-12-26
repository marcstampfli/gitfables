/**
 * @module ErrorBoundary
 * @description A React error boundary component that catches JavaScript errors anywhere in its child component tree.
 * Prevents the entire app from crashing and provides a fallback UI.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary
 *   fallback={<div>Something went wrong</div>}
 *   onError={(error) => logError(error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

'use client'

import * as React from 'react'

// Types
export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary Component
 * 
 * @component
 * @description A class component that catches JavaScript errors in its child component tree
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {React.ReactNode} [props.fallback] - Optional fallback UI to show when an error occurs
 * @param {Function} [props.onError] - Optional callback function called when an error is caught
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error
    console.error('Error caught by boundary:', error, errorInfo)

    // Call the optional error handler
    this.props.onError?.(error, errorInfo)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="p-4 border border-red-500 rounded bg-red-50 text-red-700">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      )
    }

    // When there's no error, render children normally
    return this.props.children
  }
} 