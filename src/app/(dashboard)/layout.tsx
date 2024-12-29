/**
 * @module app/(dashboard)/layout
 * @description Layout component for dashboard pages
 */

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/actions'
import { DashboardHeader } from '@/components/layout/dashboard/header'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
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
} 