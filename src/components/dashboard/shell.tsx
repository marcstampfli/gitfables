/**
 * @module components/dashboard/shell
 * @description Shell component for dashboard layout
 */

'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface ShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  children: React.ReactNode
  className?: string
}

/**
 * Shell Component
 * 
 * @component
 * @description A layout shell for dashboard pages with authentication check
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} [props.className] - Optional CSS class name
 */
export function Shell({
  children,
  className,
  ...props
}: ShellProps) {
  const router = useRouter()
  const { getUser } = useAuth()

  React.useEffect(() => {
    async function checkAuth() {
      const user = await getUser()
      if (!user) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router, getUser])

  return (
    <div
      className={cn('grid items-start gap-8', className)}
      {...props}
    >
      {children}
    </div>
  )
} 