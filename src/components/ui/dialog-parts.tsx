/**
 * @module components/ui/dialog-parts
 * @description Shared dialog header, footer, and overlay components for consistent dialog layouts
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Base overlay component for dialogs, sheets, and alerts
 */
export const DialogOverlayBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlayBase.displayName = "DialogOverlayBase"

/**
 * Base header component for dialogs, sheets, and alerts
 */
export const DialogHeaderBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeaderBase.displayName = "DialogHeaderBase"

/**
 * Base footer component for dialogs, sheets, and alerts
 */
export const DialogFooterBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooterBase.displayName = "DialogFooterBase"

/**
 * Base close button component for dialogs, sheets, and alerts
 */
export const DialogCloseBase = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
  }
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </button>
))
DialogCloseBase.displayName = "DialogCloseBase" 