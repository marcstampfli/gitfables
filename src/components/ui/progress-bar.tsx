/**
 * @module components/ui/progress-bar
 * @description A simple progress bar component for loading states
 */

'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer)
          return prev
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          'h-1 w-full bg-primary/20 transition-all duration-500',
          progress >= 90 && 'animate-pulse'
        )}
      >
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 