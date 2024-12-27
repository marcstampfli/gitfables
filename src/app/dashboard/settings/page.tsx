import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/settings/actions'
import { SettingsForm } from '@/components/settings/settings-form'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export const metadata: Metadata = {
  title: 'Settings | GitFables',
  description: 'Manage your GitFables settings'
}

const defaultSettings: Settings = {
  theme: 'system',
  default_story_style: 'technical',
  email_notifications: true,
  id: '',
  user_id: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export default async function SettingsPage() {
  const _cookieStore = cookies()
  const supabase = createClient()

  const response: PostgrestSingleResponse<Settings> = await supabase
    .from('user_settings')
    .select('*')
    .single()

  if (response.error || !response.data) {
    // Return default settings if none exist or there's an error
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <SettingsForm settings={defaultSettings} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <SettingsForm settings={response.data} />
    </div>
  )
} 