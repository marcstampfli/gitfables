/**
 * @module ToastProvider
 * @description A provider component that manages and renders toast notifications using shadcn/ui toast system.
 * 
 * @example
 * ```tsx
 * // Basic usage in app layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <ToastProvider />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

'use client'

import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

/**
 * ToastProvider Component
 * 
 * @component
 * @description Renders toast notifications and manages their state using the shadcn/ui toast system.
 * Provides a viewport for toasts and handles rendering of toast content including title, description, and actions.
 * 
 * @returns {JSX.Element} A fragment containing toast components and viewport
 */
export function ToastProvider() {
  const { toasts } = useToast()

  return (
    <>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <Toaster />
      <ToastViewport />
    </>
  )
} 