/**
 * @module components/ui/overlay
 * @description Shared overlay components for consistent modals and overlays
 */

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Icons } from './icons'

/**
 * Modal component props
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'full'
  position?: 'center' | 'top'
  showClose?: boolean
}

/**
 * Modal component for displaying content in an overlay
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open = false, onClose, size = 'default', position = 'center', showClose = true, children, ...props }, ref) => {
    if (!open) return null

    return (
      <div className="fixed inset-0 z-50 flex overflow-y-auto bg-background/80 backdrop-blur-sm">
        <div
          className={cn(
            'relative m-auto flex w-full flex-col',
            {
              'max-w-sm': size === 'sm',
              'max-w-lg': size === 'default',
              'max-w-2xl': size === 'lg',
              'max-w-4xl': size === 'xl',
              'max-w-none': size === 'full',
            },
            position === 'top' && 'mt-16',
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="relative rounded-lg border bg-background shadow-lg">
            {showClose && onClose && (
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={onClose}
              >
                <Icons.close className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Modal.displayName = 'Modal'

/**
 * Drawer component props
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  side?: 'left' | 'right'
  size?: 'default' | 'sm' | 'lg'
  showClose?: boolean
}

/**
 * Drawer component for displaying content in a side panel
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, open = false, onClose, side = 'right', size = 'default', showClose = true, children, ...props }, ref) => {
    if (!open) return null

    return (
      <div className="fixed inset-0 z-50 flex bg-background/80 backdrop-blur-sm">
        <div
          className={cn(
            'fixed inset-y-0 flex flex-col bg-background shadow-lg',
            {
              'w-64': size === 'sm',
              'w-80': size === 'default',
              'w-96': size === 'lg',
            },
            side === 'left' ? 'left-0' : 'right-0',
            className
          )}
          ref={ref}
          {...props}
        >
          {showClose && onClose && (
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex-1" />
              <button
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={onClose}
              >
                <Icons.close className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    )
  }
)
Drawer.displayName = 'Drawer'

/**
 * Popover component props
 */
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  anchor?: HTMLElement | null
  placement?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  arrow?: boolean
}

/**
 * Popover component for displaying content in a floating panel
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, open = false, anchor, placement = 'bottom', offset = 8, arrow = true, children, ...props }, ref) => {
    if (!open || !anchor) return null

    const rect = anchor.getBoundingClientRect()
    const placements = {
      top: {
        top: rect.top - offset,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      },
      right: {
        top: rect.top + rect.height / 2,
        left: rect.right + offset,
        transform: 'translateY(-50%)',
      },
      bottom: {
        top: rect.bottom + offset,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, 0)',
      },
      left: {
        top: rect.top + rect.height / 2,
        left: rect.left - offset,
        transform: 'translate(-100%, -50%)',
      },
    }

    return (
      <div
        className={cn('fixed z-50', className)}
        style={placements[placement]}
        ref={ref}
        {...props}
      >
        {arrow && (
          <div
            className={cn(
              'absolute h-2 w-2 rotate-45 transform bg-background',
              {
                '-top-1': placement === 'bottom',
                '-right-1': placement === 'left',
                '-bottom-1': placement === 'top',
                '-left-1': placement === 'right',
              }
            )}
          />
        )}
        <div className="relative rounded-lg border bg-background p-4 shadow-lg">
          {children}
        </div>
      </div>
    )
  }
)
Popover.displayName = 'Popover' 