/**
 * @module lib/story
 * @description Story generation module exports and factory
 */

import type { StoryGenerator, StoryGeneratorConfig } from './types'
import { DefaultStoryGenerator } from './generator'

export * from './types'
export * from './generator'

/**
 * Create a story generator instance
 * 
 * @param {Partial<StoryGeneratorConfig>} config - Story generator configuration
 * @returns {StoryGenerator} Story generator instance
 * 
 * @example
 * ```ts
 * const generator = createStoryGenerator({
 *   maxFragmentsPerStory: 5,
 *   defaultTheme: 'adventure'
 * })
 * 
 * const story = await generator.generateStory(commits, {
 *   theme: 'mystery',
 *   includeStats: true
 * })
 * ```
 */
export function createStoryGenerator(
  config: Partial<StoryGeneratorConfig> = {}
): StoryGenerator {
  return new DefaultStoryGenerator(config)
} 