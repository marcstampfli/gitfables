/**
 * @module lib/story
 * @description Core story functionality and type exports.
 * Provides utilities for story management and type definitions.
 * 
 * @example
 * ```ts
 * import { generateStoryId, type Story } from '@/lib/story'
 * 
 * const storyId = generateStoryId()
 * const story: Story = {
 *   id: storyId,
 *   title: 'My Coding Journey'
 * }
 * ```
 */

import type { Story } from '@/types'

export type { Story }

/**
 * Generate a unique story identifier
 * 
 * @returns {string} Random string identifier
 * @description Generates a random string using base36 encoding,
 * suitable for use as a story identifier.
 * 
 * @example
 * ```ts
 * const id = generateStoryId()
 * // => 'k7f9x2m1p3'
 * ```
 */
export function generateStoryId(): string {
  return Math.random().toString(36).substring(2, 15)
} 