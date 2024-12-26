/**
 * @module hooks/use-toast
 * @description React hook for managing toast notifications
 */

import { useState, useCallback, useEffect } from 'react'
import type { Toast } from '@/types'

interface ToastHookResult {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

/**
 * Hook for managing toast notifications
 * 
 * @returns {ToastHookResult} Hook result with toast operations
 * 
 * @example
 * ```tsx
 * const { 
 *   toasts,
 *   addToast,
 *   removeToast 
 * } = useToast()
 * 
 * // Add a toast
 * addToast({
 *   type: 'success',
 *   title: 'Success',
 *   message: 'Operation completed'
 * })
 * ```
 */
export function useToast(): ToastHookResult {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])

    // Auto remove after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearToasts()
    }
  }, [clearToasts])

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts
  }
} 