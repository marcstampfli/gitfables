# AI-Powered Story Generation

GitFables uses advanced AI to transform your Git history into engaging narratives automatically. Our AI understands your development patterns and creates meaningful stories that help teams document and share their work effectively.

## Key Benefits

- **Save Documentation Time**: Automate the process of creating development documentation
- **Consistent Quality**: Maintain high-quality narratives across all your stories
- **Context Understanding**: AI automatically understands and preserves development context
- **Format Flexibility**: Generate stories in multiple formats for different audiences

## Features

### 1. Intelligent Commit Analysis

- **Pattern Recognition**: Identify related commits and development patterns
- **Context Preservation**: Maintain the relationship between code changes
- **Smart Grouping**: Automatically group related commits into coherent stories
- **Impact Analysis**: Understand and highlight significant changes

### 2. Natural Language Processing

- **Message Understanding**: Parse and understand commit messages
- **Context Enhancement**: Add relevant context to technical changes
- **Tone Adjustment**: Adapt writing style for different audiences
- **Multi-language Support**: Generate stories in multiple languages

### 3. Template System

- **Predefined Templates**: Ready-to-use templates for common scenarios
- **Custom Templates**: Create and save your own templates
- **Variable Support**: Dynamic content insertion
- **Style Customization**: Adapt to your brand guidelines

### 4. Story Formats

- **Technical Documentation**: Detailed technical explanations
- **Release Notes**: User-friendly feature announcements
- **Sprint Reviews**: Team progress summaries
- **Client Reports**: Business-focused updates
- **Custom Formats**: Create your own story formats

## Usage

### Basic Story Generation

```typescript
// Generate a story from recent commits
const story = await generateStory({
  repository: 'user/repo',
  branch: 'main',
  format: 'technical',
  timeframe: '1w', // last week
})

// Generate a story from specific commits
const story = await generateStory({
  repository: 'user/repo',
  commits: ['abc123', 'def456'],
  format: 'release-notes',
})
```

### Custom Templates

```typescript
// Create a custom template
const template = {
  name: 'Sprint Review',
  sections: [
    {
      title: 'Summary',
      content: '{{summary}}',
    },
    {
      title: 'Key Changes',
      content: '{{changes}}',
    },
    {
      title: 'Impact',
      content: '{{impact}}',
    },
  ],
  variables: {
    summary: {
      type: 'text',
      description: 'Overview of changes',
    },
    changes: {
      type: 'list',
      description: 'List of key changes',
    },
    impact: {
      type: 'text',
      description: 'Impact analysis',
    },
  },
}

// Use custom template
const story = await generateStory({
  repository: 'user/repo',
  template: template.name,
  variables: {
    summary: 'Custom summary',
    changes: ['Change 1', 'Change 2'],
    impact: 'Impact analysis',
  },
})
```

### Story Enhancement

```typescript
// Add custom content
story.addSection({
  title: 'Additional Notes',
  content: 'Custom content',
})

// Update metadata
story.updateMetadata({
  authors: ['John Doe'],
  reviewers: ['Jane Smith'],
  tags: ['feature', 'backend'],
})

// Add rich media
story.addMedia({
  type: 'image',
  url: 'path/to/image.png',
  caption: 'Feature diagram',
})
```

## Configuration

### Story Settings

```typescript
interface StorySettings {
  // Basic settings
  format: 'technical' | 'release-notes' | 'sprint-review' | 'custom'
  style: 'detailed' | 'concise' | 'casual'
  language: string

  // Content settings
  includeMetadata: boolean
  includeDiagrams: boolean
  includeCodeSnippets: boolean

  // Template settings
  template?: string
  variables?: Record<string, any>

  // Enhancement settings
  aiEnhancement: {
    contextDepth: 'minimal' | 'moderate' | 'deep'
    toneAdjustment: boolean
    technicalLevel: 'basic' | 'intermediate' | 'advanced'
  }
}
```

### Generation Options

```typescript
interface GenerationOptions {
  // Source options
  repository: string
  branch?: string
  commits?: string[]
  timeframe?: string

  // Filter options
  authors?: string[]
  paths?: string[]
  excludePaths?: string[]

  // Output options
  format: StoryFormat
  settings: StorySettings

  // Processing options
  grouping: {
    enabled: boolean
    strategy: 'time' | 'feature' | 'author'
  }

  // Enhancement options
  enhancement: {
    enabled: boolean
    features: string[]
  }
}
```

## Best Practices

### 1. Commit Messages

- Write clear, descriptive commit messages
- Use conventional commit format when possible
- Include context in commit messages
- Link to issues/tickets when relevant

### 2. Story Organization

- Group related changes together
- Use appropriate templates for your audience
- Include relevant metadata
- Add custom content when needed

### 3. Review Process

- Review generated stories for accuracy
- Enhance with manual edits when needed
- Get feedback from team members
- Maintain consistent style

## Integration Examples

### 1. GitHub Actions

```yaml
name: Generate Story
on:
  pull_request:
    types: [closed]
    branches: [main]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate Story
        uses: gitfables/story-action@v1
        with:
          format: release-notes
          template: changelog
```

### 2. GitLab CI

```yaml
generate_story:
  stage: documentation
  script:
    - npx @gitfables/cli generate
      --repo $CI_PROJECT_PATH
      --format technical
      --template documentation
  artifacts:
    paths:
      - stories/
```

### 3. API Integration

```typescript
import { GitFables } from '@gitfables/sdk'

const gitfables = new GitFables({
  apiKey: process.env.GITFABLES_API_KEY,
})

// Generate story on PR merge
async function onPRMerge(pr) {
  const story = await gitfables.generateStory({
    repository: pr.repository,
    commits: pr.commits,
    format: 'release-notes',
  })

  await story.publish()
}
```

## Advanced Features

### 1. AI Enhancement

- Context understanding
- Technical detail expansion
- Language improvement
- Tone adjustment

### 2. Rich Media

- Automatic diagrams
- Code snippets
- Performance graphs
- Timeline visualization

### 3. Collaboration

- Team review process
- Comment system
- Version control
- Change tracking

## Troubleshooting

### Common Issues

1. **Incomplete Stories**

   - Check commit message quality
   - Verify repository access
   - Review grouping settings

2. **Quality Issues**

   - Adjust AI enhancement settings
   - Use appropriate templates
   - Review and edit manually

3. **Generation Errors**
   - Check API access
   - Verify repository permissions
   - Review error logs

## Support

- [API Documentation](../api-reference.md)
- [User Guide](../guides/user-guide.md)
- [FAQ](../guides/faq.md)
- [Discord Community](https://discord.gg/gitfables)
