/**
 * @module app/(dashboard)/layout
 * @description Layout component for dashboard pages
 */

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/actions/auth'
import { DashboardHeader } from '@/components/layout/dashboard/header'
import { logError } from '@/lib/utils/logger'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  try {
    const session = await getSession()

    if (!session) {
      redirect('/login')
    }

    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container py-6">
          {children}
        </main>
      </div>
    )
  } catch (error) {
    logError('Error in dashboard layout', { error })
    redirect('/login?error=Failed%20to%20verify%20session')
  }
} 