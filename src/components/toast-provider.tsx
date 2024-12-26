/**
 * @module components/toast-provider
 * @description Toast provider component for displaying notifications
 */

'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Toast provider component
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Card
            key={toast.id}
            className={cn(
              'relative flex w-[350px] items-center justify-between p-4 shadow-lg transition-all',
              {
                'bg-green-50 dark:bg-green-900/20': toast.type === 'success',
                'bg-red-50 dark:bg-red-900/20': toast.type === 'error',
                'bg-blue-50 dark:bg-blue-900/20': toast.type === 'info',
                'bg-yellow-50 dark:bg-yellow-900/20': toast.type === 'warning',
              }
            )}
          >
            <div className="space-y-1">
              <h3 className="font-medium">{toast.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>
    </>
  )
} 