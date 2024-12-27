/**
 * @module Avatar
 * @description A collection of avatar components built on top of Radix UI's avatar primitive.
 * Provides an accessible avatar with image support and fallback states.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // With custom size
 * <Avatar className="h-16 w-16">
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>User</AvatarFallback>
 * </Avatar>
 * ```
 */

'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

/**
 * Avatar Component
 * 
 * @component
 * @description The root avatar component that provides the container for
 * the avatar image and fallback content.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} A styled avatar container
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage Component
 * 
 * @component
 * @description The image component of the avatar. Automatically handles
 * loading states and triggers the fallback when the image fails to load.
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the avatar image
 * @param {string} props.alt - Alt text for the avatar image
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} A styled avatar image
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback Component
 * 
 * @component
 * @description The fallback content displayed when the avatar image is not available
 * or fails to load. Typically contains initials or a placeholder icon.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Fallback content
 * @returns {JSX.Element} A styled avatar fallback
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback } 