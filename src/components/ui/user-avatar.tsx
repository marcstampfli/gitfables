/**
 * @module UserAvatar
 * @description A component that displays a user's avatar with fallback to email initials.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <UserAvatar user={user} />
 * 
 * // With custom size
 * <UserAvatar user={user} className="h-8 w-8" />
 * ```
 */

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type User } from '@supabase/supabase-js'

/**
 * Props for the UserAvatar component
 * @interface
 * @extends {React.ComponentPropsWithoutRef<typeof Avatar>}
 */
interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  /** The user object containing email and avatar information */
  user: User
}

/**
 * UserAvatar Component
 * 
 * @component
 * @description Displays a user's avatar image with a fallback to their email initials
 * 
 * @param {Object} props - Component props
 * @param {User} props.user - The user object containing email and avatar information
 * @param {...React.ComponentPropsWithoutRef<typeof Avatar>} props - Additional Avatar props
 */
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage alt={user.email || ''} src={user.user_metadata?.avatar_url} />
      <AvatarFallback>
        {user.email ? getInitials(user.email) : 'U'}
      </AvatarFallback>
    </Avatar>
  )
}

/**
 * Helper function to get initials from an email address
 * 
 * @param {string} email - The email address to extract initials from
 * @returns {string} The uppercase initials extracted from the email
 */
function getInitials(email: string) {
  const username = email.split('@')[0]
  const parts = username.split(/[._-]/)
  const initials = parts.map(part => part[0]).join('')
  return initials.toUpperCase()
} 