/**
 * @module lib/validation
 * @description Utility functions and schemas for validating data structures and input values.
 * Provides a type-safe validation system using Zod schemas and Result types.
 * 
 * @example
 * ```ts
 * import { validateSchema, validateDate, schemas } from '@/lib/validation'
 * import { logDebug, logError } from '@/lib/utils/logger'
 * 
 * // Validate a date
 * const dateResult = validateDate('2024-01-01')
 * if (dateResult.success) {
 *   logDebug('Valid date', { metadata: { date: dateResult.data } })
 * }
 * 
 * // Validate against a schema
 * const userSchema = z.object({
 *   email: schemas.email,
 *   age: schemas.positiveNumber
 * })
 * 
 * const result = validateSchema(userSchema, {
 *   email: 'user@example.com',
 *   age: 25
 * })
 * 
 * if (result.success) {
 *   const validatedUser = result.data
 * } else {
 *   logError('Validation failed', { metadata: { error: result.error } })
 * }
 * ```
 */

import { z } from 'zod'
import { logError, logDebug } from '@/lib/utils/logger'
import type { ErrorType } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Standard validation error structure.
 * Used to provide consistent error reporting across all validation functions.
 * 
 * @example
 * ```ts
 * const error: ValidationError = {
 *   type: 'validation_error',
 *   message: 'Invalid email format',
 *   path: ['user', 'email'],
 *   details: { value: 'invalid-email' }
 * }
 * ```
 */
export interface ValidationError {
  type: ErrorType
  message: string
  path?: (string | number)[]
  details?: Record<string, unknown>
}

/**
 * Type-safe validation result.
 * Provides a discriminated union for handling validation outcomes.
 * 
 * @template T The type of the successful validation result
 * @template E The error type, defaults to ValidationError
 * 
 * @example
 * ```ts
 * function validateUser(data: unknown): Result<User> {
 *   // Validation logic...
 *   if (isValid) {
 *     return { success: true, data: validatedUser }
 *   }
 *   return {
 *     success: false,
 *     error: { type: 'validation_error', message: 'Invalid user data' }
 *   }
 * }
 * ```
 */
export type Result<T, E = ValidationError> = 
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Validates a date string.
 * Ensures the string can be parsed into a valid Date object.
 * 
 * @param {string} date - The date string to validate
 * @returns {Date | null} The parsed date or null if invalid
 * 
 * @example
 * ```ts
 * const date = validateDate('2024-01-01')
 * if (date) {
 *   logDebug('Valid date', { metadata: { date: date.toISOString() } })
 * } else {
 *   logError('Invalid date')
 * }
 * ```
 */
export function validateDate(dateStr: string): Date | null {
  const dateSchema = z.string().datetime()
  const result = dateSchema.safeParse(dateStr)

  if (!result.success) {
    logError('Invalid date', { metadata: { error: result.error } })
    return null
  }

  return new Date(dateStr)
}

/**
 * Validates data against a Zod schema.
 * Provides type-safe validation with detailed error reporting.
 * 
 * @param {z.ZodSchema} schema - The schema to validate against
 * @param {unknown} data - The data to validate
 * @returns {Result<z.infer<typeof schema>>} Validation result with inferred type
 * 
 * @example
 * ```ts
 * const userSchema = z.object({
 *   name: z.string(),
 *   email: schemas.email,
 *   age: schemas.positiveNumber
 * })
 * 
 * const result = validateSchema(userSchema, {
 *   name: 'John',
 *   email: 'john@example.com',
 *   age: 25
 * })
 * 
 * if (result.success) {
 *   const user = result.data // Fully typed user object
 * } else {
 *   logError('Validation failed', { metadata: { error: result.error } })
 * }
 * ```
 */
export function validateSchema<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): Result<z.infer<typeof schema>> {
  try {
    const result = schema.safeParse(data)

    if (!result.success) {
      const error = result.error
      logError('Schema validation failed', {
        context: 'validation:schema',
        metadata: { error }
      })
      return {
        success: false,
        error: {
          type: 'validation_error',
          message: 'Validation failed',
          path: error.issues[0]?.path,
          details: { issues: error.issues }
        }
      }
    }

    logDebug('Schema validated successfully', {
      context: 'validation:schema',
      metadata: { schema: schema._def.description }
    })
    return { success: true, data: result.data }
  } catch (error) {
    logError('Schema validation error', {
      context: 'validation:schema',
      metadata: { error }
    })
    return {
      success: false,
      error: {
        type: 'validation_error',
        message: 'Validation error',
        details: { error }
      }
    }
  }
}

/**
 * Common validation schemas for frequently used data types.
 * These schemas provide reusable validation rules with consistent behavior.
 * 
 * @example
 * ```ts
 * // Validate an email
 * const emailResult = validateSchema(schemas.email, 'user@example.com')
 * 
 * // Create a custom schema using common parts
 * const userSchema = z.object({
 *   id: schemas.uuid,
 *   email: schemas.email,
 *   name: schemas.nonEmptyString,
 *   age: schemas.positiveNumber,
 *   preferences: schemas.object
 * })
 * ```
 */
export const schemas = {
  /** Email address validation */
  email: z.string().email(),
  /** URL validation */
  url: z.string().url(),
  /** UUID validation */
  uuid: z.string().uuid(),
  /** ISO date validation */
  date: z.string().datetime(),
  /** Non-empty string validation */
  nonEmptyString: z.string().min(1),
  /** Positive number validation */
  positiveNumber: z.number().positive(),
  /** Boolean validation */
  boolean: z.boolean(),
  /** Non-empty array validation */
  array: z.array(z.unknown()).nonempty(),
  /** Generic object validation */
  object: z.object({}).passthrough()
} as const 

/**
 * Validate an API key
 * 
 * @example
 * ```ts
 * const result = validateApiKey('sk_test_123')
 * if (result.success) {
 *   logDebug('Valid API key', { metadata: { key: result.data } })
 * } else {
 *   logError('Invalid API key', { metadata: { error: result.error } })
 * }
 * ```
 */
export async function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is required' },
      { status: 401 }
    )
  }

  try {
    // Validate API key and check scopes
    // This is a placeholder for actual API key validation logic
    const isValid = true // Replace with actual validation

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    return NextResponse.next()
  } catch (error) {
    logError('API key validation failed', error, {
      context: 'api:validation'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Validate a repository URL
 * 
 * @example
 * ```ts
 * const result = validateRepoUrl('https://github.com/owner/repo')
 * if (result.success) {
 *   logDebug('Valid repository URL', { metadata: { url: result.data } })
 * } else {
 *   logError('Invalid repository URL', { metadata: { error: result.error } })
 * }
 * ```
 */
export function validateRepoUrl(url: string) {
  const urlSchema = z.string().url()
  const result = urlSchema.safeParse(url)

  if (!result.success) {
    logError('Invalid repository URL', { metadata: { error: result.error } })
    return false
  }

  return true
} 