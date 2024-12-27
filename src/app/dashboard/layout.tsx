import { redirect } from 'next/navigation'
import { getCurrentSession } from '@/lib/auth'
import { DashboardNav } from '@/components/dashboard/nav'
import { TopNav } from '@/components/dashboard/top-nav'
import type { Session } from '@supabase/supabase-js'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getCurrentSession()

  if (!session) {
    redirect('/login')
  }

  const validSession = session as Session

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <TopNav user={validSession.user} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 