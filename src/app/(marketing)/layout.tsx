/**
 * @module app/(marketing)/layout
 * @description Marketing layout component
 */

import { type ReactNode } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { MarketingLayoutClient } from './layout.client'

interface MarketingLayoutProps {
  children: ReactNode
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return <MarketingLayoutClient user={user}>{children}</MarketingLayoutClient>
} 