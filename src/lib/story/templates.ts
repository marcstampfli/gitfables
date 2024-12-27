/**
 * @module lib/story/templates
 * @description Story templates for different narrative styles
 */

import type { CommitPattern, StoryStyle, DeveloperPersona } from './types'

interface StoryTemplate {
  intro: (commitCount: number, persona: DeveloperPersona) => string
  pattern: (pattern: CommitPattern) => string
  achievement: (description: string) => string
  conclusion: (timeSpan: { start: string; end: string }, persona: DeveloperPersona) => string
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTimeSpan(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)
  
  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} and ${days % 30} days`
  }
  return `${days} ${days === 1 ? 'day' : 'days'}`
}

function getPersonaDescription(persona: DeveloperPersona): string {
  const typeDescriptions = {
    'night-owl': 'a guardian of the midnight code',
    'early-bird': 'a master of dawn-driven development',
    'steady-coder': 'a paragon of consistent craftsmanship',
    'weekend-warrior': 'a champion of weekend wonders'
  }

  const traitDescriptions = {
    consistent: 'unwavering dedication',
    dedicated: 'remarkable persistence',
    focused: 'laser-sharp focus',
    adaptable: 'incredible adaptability',
    balanced: 'harmonious approach'
  }

  const traits = persona.traits
    .map(trait => traitDescriptions[trait as keyof typeof traitDescriptions])
    .join(' and ')

  return `${typeDescriptions[persona.type as keyof typeof typeDescriptions]}, known for ${traits}`
}

const epicTemplate: StoryTemplate = {
  intro: (commitCount, persona) => `
In the grand tapestry of digital creation, a tale emerges of ${getPersonaDescription(persona)}. 
Through ${commitCount} commits, each a verse in this epic saga, our protagonist weaves a story 
of innovation and determination. As the repository grows, so too does the legend of this 
intrepid developer, whose code echoes through the halls of GitHub...
  `.trim(),
  
  pattern: (pattern) => {
    const duration = formatTimeSpan(pattern.startDate, pattern.endDate)
    const intensity = pattern.significance >= 0.8 ? 'legendary' :
                     pattern.significance >= 0.6 ? 'mighty' :
                     pattern.significance >= 0.4 ? 'notable' : 'steady'
    
    const timeContext = new Date(pattern.startDate).getHours() < 12 ? 'as dawn broke' :
                       new Date(pattern.startDate).getHours() < 17 ? 'under the midday sun' :
                       'beneath the stars'
    
    return `
${timeContext}, a ${intensity} surge of inspiration struck. For ${duration}, our hero channeled 
their expertise into ${pattern.commits.length} masterful commits. Each change was a step toward 
perfection, each line of code a brushstroke in a digital masterpiece. 
${pattern.type === 'feature' ? 'New features bloomed like spring flowers.' :
  pattern.type === 'refactor' ? 'The codebase transformed, shedding its old skin for something more elegant.' :
  pattern.type === 'bugfix' ? 'Bugs fell before the developer\'s debugging prowess.' :
  'The repository evolved, growing stronger with each commit.'}
    `.trim()
  },

  achievement: (description) => `
A moment of triumph! ${description} This achievement stands as a testament to the 
developer's skill and dedication, a milestone in their journey of creation.
  `.trim(),
  
  conclusion: (timeSpan, persona) => `
As this chapter draws to a close, spanning ${formatTimeSpan(timeSpan.start, timeSpan.end)},
we reflect on the journey of ${getPersonaDescription(persona)}. Their commits stand as 
monuments to progress, their code a legacy for future developers to build upon. Though this 
tale may end, the repository lives on, ready for the next great adventure...
  `.trim()
}

const narrativeTemplate: StoryTemplate = {
  intro: (commitCount, persona) => `
Dear Dev Diary,

Today I reflect on my journey as ${getPersonaDescription(persona)}. Looking back at 
${commitCount} commits, each one tells a story of growth, challenges overcome, and lessons 
learned. Let me share the highlights of this incredible adventure...
  `.trim(),
  
  pattern: (pattern) => {
    const date = formatDate(pattern.startDate)
    const mood = pattern.significance >= 0.7 ? 'Feeling incredibly productive!' :
                pattern.significance >= 0.4 ? 'In the zone today.' : 'Making steady progress.'
    
    return `
${date}
${mood} Just wrapped up an intense session with ${pattern.commits.length} commits. 
${pattern.type === 'feature' ? 'The new features are coming together beautifully.' :
  pattern.type === 'refactor' ? 'The code feels so much cleaner after this refactoring.' :
  pattern.type === 'bugfix' ? 'Finally squashed those tricky bugs!' :
  'Every line of code feels purposeful and right.'}
Time flies when you're in the flow state!
    `.trim()
  },

  achievement: (description) => `
🎉 Major milestone achieved! ${description}
These are the moments that make all the hard work worth it.
  `.trim(),
  
  conclusion: (timeSpan, persona) => `
Looking back at these ${formatTimeSpan(timeSpan.start, timeSpan.end)} as ${getPersonaDescription(persona)},
I'm proud of how far we've come. Each commit was a small victory, and together they've built
something truly remarkable. The code may be digital, but the journey was deeply personal.

Until the next commit,
A Developer's Journey
  `.trim()
}

const casualTemplate: StoryTemplate = {
  intro: (commitCount, persona) => `
DEVELOPER WEEKLY - SPECIAL REPORT

BREAKING: In an extraordinary display of software development prowess, ${getPersonaDescription(persona)}
has captured the attention of the tech world with a remarkable series of ${commitCount} commits.
Our in-depth investigation reveals the story behind this coding phenomenon...
  `.trim(),
  
  pattern: (pattern) => {
    const date = formatDate(pattern.startDate)
    const timeOfDay = new Date(pattern.startDate).getHours() < 12 ? 'morning' :
                     new Date(pattern.startDate).getHours() < 17 ? 'afternoon' : 'evening'
    
    return `
TECH WIRE UPDATE - ${date}
${timeOfDay.toUpperCase()} PRODUCTIVITY SURGE: Industry observers report an unprecedented 
burst of activity with ${pattern.commits.length} commits in rapid succession. 
${pattern.type === 'feature' ? 'Sources confirm groundbreaking features in development.' :
  pattern.type === 'refactor' ? 'Experts praise architectural improvements.' :
  pattern.type === 'bugfix' ? 'Critical issues resolved in major debugging effort.' :
  'Significant progress observed in codebase evolution.'}
    `.trim()
  },

  achievement: (description) => `
ACHIEVEMENT UNLOCKED: ${description}
Tech community celebrates as another milestone is reached in this remarkable development saga.
  `.trim(),
  
  conclusion: (timeSpan, persona) => `
FINAL ANALYSIS: After an intensive ${formatTimeSpan(timeSpan.start, timeSpan.end)} of 
development, ${getPersonaDescription(persona)} has demonstrated the true potential of 
modern software development. As this chapter concludes, speculation grows about what's 
next for this rising star in the development world.

This is Developer Weekly, signing off from the cutting edge of code.
  `.trim()
}

const technicalTemplate: StoryTemplate = {
  intro: (commitCount, persona) => `
## Repository Activity Analysis Report

### Executive Summary
Analysis of repository activity by ${getPersonaDescription(persona)} reveals 
${commitCount} commits over the observed period. This technical report details key 
metrics, patterns, and insights derived from the commit history.

### Developer Profile
- Type: ${persona.type}
- Confidence Score: ${(persona.confidence * 100).toFixed(1)}%
- Key Traits: ${persona.traits.join(', ')}
  `.trim(),
  
  pattern: (pattern) => {
    const startTime = new Date(pattern.startDate).toISOString()
    const endTime = new Date(pattern.endDate).toISOString()
    return `
### Development Pattern Analysis
- Period: ${startTime} to ${endTime}
- Pattern Type: ${pattern.type}
- Commit Volume: ${pattern.commits.length}
- Significance Score: ${(pattern.significance * 100).toFixed(1)}%

#### Pattern Characteristics
- Development Intensity: ${pattern.significance >= 0.8 ? 'Very High' :
                         pattern.significance >= 0.6 ? 'High' :
                         pattern.significance >= 0.4 ? 'Moderate' : 'Normal'}
- Pattern Category: ${pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)}
- Time Distribution: ${new Date(pattern.startDate).getHours() < 12 ? 'Morning' :
                     new Date(pattern.startDate).getHours() < 17 ? 'Afternoon' : 'Evening'}
    `.trim()
  },

  achievement: (description) => `
### Notable Achievement
${description}

#### Impact Analysis
- Milestone Category: Development Achievement
- Status: Completed
- Significance: High
  `.trim(),
  
  conclusion: (timeSpan, persona) => `
## Analysis Conclusions

### Development Period Overview
- Total Duration: ${formatTimeSpan(timeSpan.start, timeSpan.end)}
- Developer Profile: ${getPersonaDescription(persona)}
- Development Style: ${persona.traits.join(', ')}

### Recommendations
1. Continue monitoring commit patterns for optimization opportunities
2. Implement automated metrics tracking for pattern analysis
3. Maintain current development velocity while ensuring code quality
4. Consider documenting successful development patterns for team reference

### Next Steps
- Review code quality metrics
- Analyze performance implications
- Plan next development phase
  `.trim()
}

export const templates: Record<StoryStyle, StoryTemplate> = {
  epic: epicTemplate,
  narrative: narrativeTemplate,
  casual: casualTemplate,
  technical: technicalTemplate,
} 