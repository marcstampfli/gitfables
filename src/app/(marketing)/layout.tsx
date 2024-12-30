/**
 * @module app/(marketing)/layout
 * @description Layout for public marketing pages with header and footer
 */

import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { logError } from '@/lib/utils/logger'
import type { User } from '@supabase/supabase-js'
import type { AuthError } from '@supabase/supabase-js'

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
      // Only log if it's not an AuthSessionMissingError
      if ((error as AuthError).name !== 'AuthSessionMissingError') {
        logError('Failed to get user in marketing layout', { error })
      }
    } else {
      user = userData
    }
  } catch (error) {
    logError('Error in marketing layout', { error })
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Top Right */}
        <div className="absolute -top-[15%] right-[5%] w-[90%] h-[50%] rotate-12 bg-gradient-to-br from-primary/[0.07] to-purple-600/[0.07] blur-[150px] rounded-full" />
        {/* Bottom Left */}
        <div className="absolute top-[40%] -left-[35%] w-[80%] h-[60%] -rotate-12 bg-gradient-to-br from-purple-600/[0.07] to-primary/[0.07] blur-[150px] rounded-full" />
        {/* Subtle Center Accent */}
        <div className="absolute top-[30%] left-[15%] w-[50%] h-[40%] bg-gradient-to-r from-primary/[0.03] via-purple-600/[0.03] to-primary/[0.03] blur-[130px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative">
        <Header user={user} />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
} 