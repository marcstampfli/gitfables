/**
 * @module app/layout
 * @description Root layout component with theme and toast providers
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers/providers'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
} 