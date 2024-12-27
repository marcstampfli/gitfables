/**
 * @module lib/validation
 * @description Utility functions and schemas for validating data structures and input values
 * used throughout the application. Uses Zod for schema validation and includes helpers
 * for common validation tasks.
 * 
 * @example
 * ```ts
 * import { validateCommitData, isValidDateFormat } from '@/lib/validation'
 * 
 * // Validate commit data
 * const result = validateCommitData({
 *   date: '2024-01-01',
 *   commits: 5,
 *   message: 'Initial commit'
 * })
 * 
 * // Validate date format
 * if (isValidDateFormat('2024-01-01')) {
 *   console.log('Valid date')
 * }
 * ```
 */

import { z } from 'zod'
import { logError, logDebug } from '@/lib/logger'

/**
 * Validates a date string
 * 
 * @param {string} date - The date string to validate
 * @returns {boolean} Whether the date is valid
 */
export function isValidDate(date: string): boolean {
  try {
    const parsed = new Date(date)
    const isValid = parsed.toString() !== 'Invalid Date'

    if (isValid) {
      logDebug('Valid date')
      return true
    }

    return false
  } catch {
    return false
  }
}

/**
 * Validates data against a schema
 * 
 * @param {z.ZodSchema} schema - The schema to validate against
 * @param {unknown} data - The data to validate
 * @returns {boolean} Whether the data is valid
 */
export function validateSchema(schema: z.ZodSchema, data: unknown): boolean {
  try {
    const result = schema.safeParse(data)

    if (!result.success) {
      logError('Validation errors', { 
        context: 'validation:schema',
        metadata: { error: result.error }
      })
      return false
    }

    return true
  } catch {
    return false
  }
}

/**
 * Validates story segment data
 * 
 * @param {unknown} data - The data to validate
 * @returns {boolean} Whether the data is valid
 */
export function validateStorySegment(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const segmentData = data as Record<string, unknown>

  if (
    typeof segmentData.id === 'string' &&
    typeof segmentData.title === 'string' &&
    typeof segmentData.content === 'string' &&
    typeof segmentData.timestamp === 'string' &&
    segmentData.commitData &&
    segmentData.metadata
  ) {
    logDebug('Story segment data', { 
      metadata: { 
        id: segmentData.id,
        title: segmentData.title
      } 
    })
    return true
  }

  logError('Invalid story segment data', { context: 'validation:segment' })
  return false
} 