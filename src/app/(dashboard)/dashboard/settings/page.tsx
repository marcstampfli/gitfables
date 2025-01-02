/**
 * @module app/dashboard/settings/page
 * @description Settings page component
 */

import { redirect } from 'next/navigation'
import { SettingsContent } from '@/components/dashboard/settings/settings-content'
import { createServerClient } from '@/lib/supabase/server'
import { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SettingsPage() {
  const supabase = await createServerClient()

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) {
    redirect('/login')
  }

  return <SettingsContent />
} 