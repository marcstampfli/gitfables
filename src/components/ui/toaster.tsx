/**
 * @module Toaster
 * @description A component that provides a container for displaying toast notifications
 * in a fixed position on the screen.
 * 
 * @example
 * ```tsx
 * // Basic usage in app layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

'use client'

import { ToastProvider, ToastViewport } from '@/components/ui/toast'

/**
 * Toaster Component
 * 
 * @component
 * @description Renders a fixed position container for toast notifications.
 * Adapts its position and layout based on screen size.
 * 
 * @returns {JSX.Element} A toast container with viewport
 */
export function Toaster() {
  return (
    <ToastProvider>
      <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
        <ToastViewport />
      </div>
    </ToastProvider>
  )
} 