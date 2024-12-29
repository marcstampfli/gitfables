/**
 * @module components/providers
 * @description Root providers component that wraps the application with necessary context providers
 */

'use client'

import { ThemeProvider } from '@/components/providers/theme-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
} 