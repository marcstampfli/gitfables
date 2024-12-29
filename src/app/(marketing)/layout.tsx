/**
 * @module app/(marketing)/layout
 * @description Layout for public marketing pages with header and footer
 */

import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 