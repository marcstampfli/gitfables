/**
 * @module components/analytics
 * @description Analytics component for tracking user behavior
 */

'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Add your analytics tracking code here
    // For example:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('config', 'GA-XXXXX', {
    //     page_path: pathname + searchParams.toString()
    //   })
    // }
  }, [pathname, searchParams])

  return null
} 