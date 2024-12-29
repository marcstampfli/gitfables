/**
 * @module components/ui/key-sequence-toast
 * @description Toast component for showing active key sequences
 */

'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface KeySequenceToastProps {
  sequence: string[]
  isActive: boolean
  onHide: () => void
}

export function KeySequenceToast({ sequence, isActive, onHide }: KeySequenceToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive && sequence.length > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onHide()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, sequence, onHide])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4"
        >
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Key sequence:</span>
            <div className="flex gap-1">
              {sequence.map((key, index) => (
                <kbd
                  key={`${key}-${index}`}
                  className="px-2 py-1 text-xs rounded bg-muted"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 