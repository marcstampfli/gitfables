/**
 * @module lib/story/templates
 * @description Story templates for different narrative styles
 */

import type { 
  StoryStyle,
  StoryTemplate
} from '@/types/stories'

const templates: Record<StoryStyle, StoryTemplate> = {
  epic: {
    intro: (commitCount, persona) => 
      `In the vast realm of code, a tale unfolds. A story of ${commitCount} commits, each a step in an epic journey. Our protagonist, a ${persona.type}, embarks on a quest to build something extraordinary.`,
    pattern: (pattern) => 
      `A new chapter begins as our hero focuses on ${pattern.description}. Through ${pattern.commits.length} valiant commits, progress is made.`,
    achievement: (description) => 
      `A milestone is reached! ${description}`,
    conclusion: (period, persona) => 
      `And so concludes this chapter of our tale, spanning from ${period.start} to ${period.end}. Our ${persona.type} continues onward, ready for the next adventure.`
  },
  technical: {
    intro: (commitCount, persona) => 
      `Technical Analysis Report\nCommit Count: ${commitCount}\nDeveloper Profile: ${persona.type}\nConfidence: ${persona.confidence * 100}%`,
    pattern: (pattern) => 
      `Pattern Analysis: ${pattern.type}\nCommits: ${pattern.commits.length}\nSignificance: ${pattern.significance * 100}%\nPeriod: ${pattern.startDate} to ${pattern.endDate}`,
    achievement: (description) => 
      `Achievement Unlocked: ${description}`,
    conclusion: (period, persona) => 
      `Analysis Period: ${period.start} to ${period.end}\nDeveloper Type: ${persona.type}\nTraits: ${persona.traits.join(', ')}`
  },
  casual: {
    intro: (commitCount, persona) => 
      `Hey there! Let me tell you about these ${commitCount} commits. Our developer here is what you'd call a ${persona.type}.`,
    pattern: (pattern) => 
      `So, they spent some time on ${pattern.description}. Made about ${pattern.commits.length} changes during that time.`,
    achievement: (description) => 
      `Pretty cool - ${description}`,
    conclusion: (period, persona) => 
      `That's what happened between ${period.start} and ${period.end}. Our ${persona.type} did some great work!`
  }
}

export function getTemplate(style: StoryStyle): StoryTemplate {
  return templates[style]
} 