/**
 * @module validation
 * @description Utility functions for validating data structures and input values
 * used throughout the application.
 */

import { z } from 'zod'
import type { CommitData } from '@/components/github-story-visualizer'

/**
 * Validation schema for commit data
 * @constant
 */
export const commitDataSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Expected YYYY-MM-DD'),
  commits: z.number().int().min(0, 'Commits must be a non-negative integer'),
  message: z.string().nullable(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format. Expected HH:mm').optional(),
  language: z.string().optional(),
  linesAdded: z.number().int().min(0).optional(),
  linesRemoved: z.number().int().min(0).optional(),
})

/**
 * Type for validation errors
 */
export interface ValidationError {
  path: string[]
  message: string
}

/**
 * Result of a validation operation
 */
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Validates commit data against the schema
 * @param {unknown} data - The data to validate
 * @returns {ValidationResult} The validation result
 * 
 * @example
 * ```ts
 * const result = validateCommitData({
 *   date: '2024-01-01',
 *   commits: 5,
 *   message: 'Initial commit'
 * })
 * 
 * if (!result.isValid) {
 *   console.error('Validation errors:', result.errors)
 * }
 * ```
 */
export function validateCommitData(data: unknown): ValidationResult {
  try {
    commitDataSchema.parse(data)
    return { isValid: true, errors: [] }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map((err: z.ZodIssue) => ({
          path: err.path,
          message: err.message
        }))
      }
    }
    return {
      isValid: false,
      errors: [{ path: [], message: 'Unknown validation error' }]
    }
  }
}

/**
 * Validates a time string in HH:mm format
 * @param {string} time - The time string to validate
 * @returns {boolean} Whether the time string is valid
 * 
 * @example
 * ```ts
 * if (isValidTimeFormat('23:59')) {
 *   console.log('Valid time')
 * }
 * ```
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return timeRegex.test(time)
}

/**
 * Validates a date string in YYYY-MM-DD format
 * @param {string} date - The date string to validate
 * @returns {boolean} Whether the date string is valid
 * 
 * @example
 * ```ts
 * if (isValidDateFormat('2024-01-01')) {
 *   console.log('Valid date')
 * }
 * ```
 */
export function isValidDateFormat(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false

  const [year, month, day] = date.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  
  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  )
}

/**
 * Type guard for CommitData
 * @param {unknown} value - The value to check
 * @returns {boolean} Whether the value is valid CommitData
 * 
 * @example
 * ```ts
 * const data: unknown = fetchData()
 * if (isCommitData(data)) {
 *   // data is now typed as CommitData
 *   console.log(data.commits)
 * }
 * ```
 */
export function isCommitData(value: unknown): value is CommitData {
  const result = validateCommitData(value)
  return result.isValid
} 