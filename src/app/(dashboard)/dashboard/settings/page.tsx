/**
 * @module app/(dashboard)/dashboard/settings/page
 * @description User settings page
 */

import { getSettings } from '@/lib/actions/settings'
import { SettingsContent } from '@/components/dashboard/settings/settings-content'

export default async function SettingsPage() {
  const initialSettings = await getSettings()
  return <SettingsContent initialSettings={initialSettings} />
} 