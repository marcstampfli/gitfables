/**
 * @module app/(dashboard)/layout
 * @description Layout component for dashboard pages
 */

import { redirect } from 'next/navigation'
import { getUser } from '@/lib/actions/auth'
import { DashboardShell } from '@/components/layout/dashboard/shell'
import { logError } from '@/lib/utils/logger'
import { DashboardLayoutClient } from './layout.client'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  try {
    const user = await getUser()

    if (!user) {
      redirect('/login')
    }

    return (
      <DashboardLayoutClient>
        <DashboardShell>
          {children}
        </DashboardShell>
      </DashboardLayoutClient>
    )
  } catch (error) {
    logError('Error in dashboard layout', { error })
    redirect('/login')
  }
} 