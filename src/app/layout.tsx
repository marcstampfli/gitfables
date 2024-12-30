/**
 * @module app/layout
 * @description Root layout component with theme and toast providers
 */

import type { Metadata } from 'next'
import { Outfit, Fira_Code } from 'next/font/google'
import { Providers } from '@/components/providers/providers'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'GitFables',
  description: 'Transform your Git history into engaging stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
} 