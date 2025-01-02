# Story Generation

## Overview

GitFables uses AI-powered analysis to transform your Git history into engaging narratives. This document details the story generation process, available options, and customization features.

## Generation Process

### 1. Repository Analysis

- Commit history fetching
- Metadata extraction
- Code change analysis
- Contributor tracking
- Branch analysis

### 2. Content Generation

- Style application
- Technical detail inclusion
- Contributor insights
- Code snippet selection
- Timeline organization

### 3. Output Formatting

- Multiple formats (article, story, report)
- Code block highlighting
- Statistics visualization
- Export options (PDF, Markdown)

## Generation Options

### 1. Style Selection

```typescript
interface StoryStyle {
  type: 'technical' | 'narrative' | 'casual'
  tone: 'formal' | 'conversational' | 'fun'
  detail: 'minimal' | 'balanced' | 'detailed'
}
```

Available styles:

- Technical (detailed, code-focused)
- Narrative (story-driven, engaging)
- Casual (informal, accessible)

### 2. Content Focus

```typescript
interface ContentFocus {
  features: boolean
  bugFixes: boolean
  refactoring: boolean
  documentation: boolean
  performance: boolean
}
```

Focus areas:

- Features and enhancements
- Bug fixes and improvements
- Code refactoring
- Documentation updates
- Performance optimizations

### 3. Included Elements

```typescript
interface StoryElements {
  technicalDetails: boolean
  codeSnippets: boolean
  contributorInsights: boolean
  statistics: boolean
  timeline: boolean
}
```

Customizable elements:

- Technical details
- Code snippets
- Contributor insights
- Project statistics
- Timeline visualization

## Story Components

### 1. Story Generator

```typescript
interface StoryGeneratorProps {
  repository: Repository
  templates: StoryTemplate[]
  onGenerate: (options: GenerationOptions) => Promise<Story>
}
```

Features:

- Template selection
- Customization options
- Preview capability
- Progress tracking

### 2. Story Display

```typescript
interface StoryViewerProps {
  story: Story
  onShare: (platform: string) => void
  onEdit: () => void
}
```

Elements:

- Rich text content
- Code snippets
- Visualizations
- Share buttons

### 3. Story Management

```typescript
interface StoryListProps {
  stories: Story[]
  onView: (id: string) => void
  onDelete: (id: string) => void
  onShare: (id: string) => void
}
```

Features:

- List/grid view
- Search & filter
- Bulk actions
- Analytics

## AI Integration

### 1. OpenAI Configuration

```typescript
interface AIConfig {
  model: string
  temperature: number
  max_tokens: number
  presence_penalty: number
  frequency_penalty: number
}
```

### 2. Processing Pipeline

1. **Input Processing**

   - Commit message analysis
   - Code diff parsing
   - Metadata extraction
   - Context building

2. **Content Generation**

   - Style application
   - Narrative construction
   - Technical detail integration
   - Code snippet selection

3. **Output Formatting**
   - Markdown generation
   - Code highlighting
   - Structure organization
   - Export preparation

### 3. Quality Metrics

- Readability scores
- User ratings
- Completion rates
- Engagement time

## Future Improvements

### 1. Advanced Features

- Multi-repository stories
- Interactive elements
- Custom templates
- Real-time updates

### 2. AI Enhancements

- Improved analysis
- Better personalization
- Multiple AI models
- Context awareness

### 3. User Experience

- Rich media support
- Collaborative editing
- Version control
- Export options

## Best Practices

### 1. Story Structure

- Clear introduction
- Logical flow
- Technical accuracy
- Engaging narrative

### 2. Code Snippets

- Relevant selections
- Proper context
- Clear annotations
- Syntax highlighting

### 3. Customization

- Target audience consideration
- Appropriate detail level
- Consistent style
- Balanced content

### 4. Export Formats

- Clean markdown
- Formatted PDF
- Rich text
- Web embedding
