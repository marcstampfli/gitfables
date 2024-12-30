# Story Generation

## Overview

GitFables uses advanced natural language processing to transform repository commit history into engaging narratives. This document outlines the story generation process, available options, and best practices.

## Generation Process

1. **Repository Analysis**

   - Fetch commit history
   - Extract metadata (authors, timestamps, messages)
   - Analyze code changes
   - Group related commits

2. **Story Structure**

   - Introduction
   - Key developments
   - Technical milestones
   - Contributor highlights
   - Conclusion

3. **Content Generation**
   - Apply selected style and tone
   - Generate narrative sections
   - Include technical details
   - Add contributor insights

## Generation Options

### Story Style

```typescript
interface StoryGenerationSettings {
  style: 'technical' | 'narrative' | 'casual'
  tone: 'professional' | 'fun' | 'dramatic'
  format: 'article' | 'story' | 'report'
  length: 'short' | 'medium' | 'long'
  include: {
    technical_details: boolean
    contributor_insights: boolean
    code_snippets: boolean
    statistics: boolean
  }
  focus: {
    features: boolean
    bug_fixes: boolean
    refactoring: boolean
    documentation: boolean
  }
  date_range?: {
    start: string
    end: string
  }
  branch?: string
  contributors?: string[]
}
```

### Style Examples

1. **Technical**

   ```typescript
   const settings: StoryGenerationSettings = {
     style: 'technical',
     tone: 'professional',
     format: 'report',
     include: {
       technical_details: true,
       code_snippets: true,
       statistics: true,
       contributor_insights: false,
     },
     focus: {
       features: true,
       refactoring: true,
       bug_fixes: true,
       documentation: false,
     },
   }
   ```

2. **Narrative**
   ```typescript
   const settings: StoryGenerationSettings = {
     style: 'narrative',
     tone: 'fun',
     format: 'story',
     include: {
       technical_details: false,
       code_snippets: false,
       statistics: false,
       contributor_insights: true,
     },
     focus: {
       features: true,
       refactoring: false,
       bug_fixes: false,
       documentation: false,
     },
   }
   ```

## Story Structure

### Metadata

```typescript
interface StoryMetadata {
  repository: {
    id: string
    name: string
    provider: string
    url: string
  }
  generation: {
    started_at: string
    completed_at: string
    version: string
    settings: StoryGenerationSettings
  }
  statistics: {
    commit_count: number
    contributors: number
    files_changed: number
    additions: number
    deletions: number
  }
  contributors: Array<{
    name: string
    email: string
    commits: number
    additions: number
    deletions: number
  }>
}
```

### Content Structure

```typescript
interface StoryContent {
  title: string
  summary: string
  sections: Array<{
    title: string
    content: string
    type: 'introduction' | 'development' | 'technical' | 'conclusion'
    metadata?: {
      commits?: string[]
      contributors?: string[]
      code_snippets?: Array<{
        file: string
        language: string
        code: string
      }>
    }
  }>
  highlights: Array<{
    title: string
    description: string
    type: 'feature' | 'bugfix' | 'refactor' | 'docs'
    commits: string[]
  }>
}
```

## Generation API

### Server Component

```typescript
// app/api/stories/generate/route.ts
import { generateStory } from '@/lib/story'

export async function POST(request: Request) {
  const { repository_id, settings } = await request.json()

  // Validate repository access
  const repository = await getRepository(repository_id)
  if (!repository) {
    return new Response(JSON.stringify({ error: 'Repository not found' }), {
      status: 404,
    })
  }

  // Start generation
  const story = await generateStory(repository, settings)

  return new Response(JSON.stringify(story))
}
```

### Client Usage

```typescript
'use client'

export function StoryGenerator({ repository }: Props) {
  const [settings, setSettings] = useState<StoryGenerationSettings>({
    style: 'technical',
    tone: 'professional',
    format: 'article',
    include: {
      technical_details: true,
      code_snippets: true,
      statistics: true,
      contributor_insights: true
    },
    focus: {
      features: true,
      bug_fixes: true,
      refactoring: true,
      documentation: true
    }
  })

  const generateStory = async () => {
    const response = await fetch('/api/stories/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repository_id: repository.id,
        settings
      })
    })

    const story = await response.json()
    // Handle story
  }

  return (
    <div>
      <StorySettings
        settings={settings}
        onChange={setSettings}
      />
      <Button onClick={generateStory}>
        Generate Story
      </Button>
    </div>
  )
}
```

## Story Components

### Story Viewer

```typescript
interface StoryViewerProps {
  story: Story
  onShare?: (story: Story) => void
  onExport?: (story: Story, format: 'pdf' | 'md' | 'html') => void
}

export function StoryViewer({
  story,
  onShare,
  onExport
}: StoryViewerProps) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <header>
        <h1>{story.title}</h1>
        <p className="lead">{story.summary}</p>
      </header>

      {story.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <div className="content">
            {section.content}
          </div>
          {section.metadata?.code_snippets?.map((snippet) => (
            <CodeBlock
              key={snippet.file}
              language={snippet.language}
              code={snippet.code}
            />
          ))}
        </section>
      ))}

      <footer>
        <StoryMetadata story={story} />
        <StoryActions
          story={story}
          onShare={onShare}
          onExport={onExport}
        />
      </footer>
    </article>
  )
}
```

### Story Settings

```typescript
interface StorySettingsProps {
  settings: StoryGenerationSettings
  onChange: (settings: StoryGenerationSettings) => void
}

export function StorySettings({
  settings,
  onChange
}: StorySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Style"
          value={settings.style}
          onChange={(style) => onChange({ ...settings, style })}
          options={[
            { value: 'technical', label: 'Technical' },
            { value: 'narrative', label: 'Narrative' },
            { value: 'casual', label: 'Casual' }
          ]}
        />
        <Select
          label="Tone"
          value={settings.tone}
          onChange={(tone) => onChange({ ...settings, tone })}
          options={[
            { value: 'professional', label: 'Professional' },
            { value: 'fun', label: 'Fun' },
            { value: 'dramatic', label: 'Dramatic' }
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3>Include</h3>
        <div className="grid grid-cols-2 gap-4">
          <Switch
            label="Technical Details"
            checked={settings.include.technical_details}
            onChange={(checked) =>
              onChange({
                ...settings,
                include: {
                  ...settings.include,
                  technical_details: checked
                }
              })
            }
          />
          <Switch
            label="Code Snippets"
            checked={settings.include.code_snippets}
            onChange={(checked) =>
              onChange({
                ...settings,
                include: {
                  ...settings.include,
                  code_snippets: checked
                }
              })
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3>Focus Areas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Switch
            label="Features"
            checked={settings.focus.features}
            onChange={(checked) =>
              onChange({
                ...settings,
                focus: {
                  ...settings.focus,
                  features: checked
                }
              })
            }
          />
          <Switch
            label="Bug Fixes"
            checked={settings.focus.bug_fixes}
            onChange={(checked) =>
              onChange({
                ...settings,
                focus: {
                  ...settings.focus,
                  bug_fixes: checked
                }
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
```

## Best Practices

1. **Repository Preparation**

   - Use clear commit messages
   - Group related changes
   - Tag significant releases
   - Document major changes

2. **Generation Settings**

   - Match style to audience
   - Focus on relevant aspects
   - Include appropriate details
   - Set reasonable date ranges

3. **Content Review**

   - Verify technical accuracy
   - Check contributor attribution
   - Review code snippets
   - Validate statistics

4. **Performance**
   - Cache repository data
   - Use incremental updates
   - Optimize for large repos
   - Handle timeouts gracefully

## Error Handling

```typescript
interface StoryGenerationError {
  code: string
  message: string
  details?: {
    repository?: string
    commits?: string[]
    error?: string
  }
}

async function handleGenerationError(error: StoryGenerationError) {
  switch (error.code) {
    case 'repository_not_found':
      // Handle missing repository
      break
    case 'insufficient_commits':
      // Handle insufficient data
      break
    case 'generation_timeout':
      // Handle timeout
      break
    case 'invalid_settings':
      // Handle invalid settings
      break
    default:
      // Handle unknown error
      break
  }
}
```

## Future Enhancements

1. **Advanced Features**

   - Custom templates
   - Multiple languages
   - Interactive elements
   - Rich media support

2. **Integration**

   - CI/CD pipelines
   - Documentation systems
   - Project management
   - Team collaboration

3. **Analytics**
   - Usage tracking
   - Quality metrics
   - User feedback
   - Performance monitoring
