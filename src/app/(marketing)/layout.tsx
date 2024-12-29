/**
 * @module app/(marketing)/layout
 * @description Layout for public marketing pages with header and footer
 */

import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { logError } from '@/lib/utils/logger'
import type { User } from '@supabase/supabase-js'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user: User | null = null

  try {
    const supabase = await createClient()
    const { data: { user: userData }, error } = await supabase.auth.getUser()

    if (error) {
      logError('Failed to get user in marketing layout', { error })
    } else {
      user = userData
    }
  } catch (error) {
    logError('Error in marketing layout', { error })
  }

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