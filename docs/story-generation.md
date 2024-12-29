# Story Generation

GitFables uses advanced natural language processing to transform Git commit history into engaging narratives.

## Story Types

### Available Styles

- **Technical**: Detailed, technical narrative focusing on implementation details
- **Casual**: Friendly, conversational style for general audiences
- **Formal**: Professional style suitable for documentation

### Tone Options

- **Professional**: Straightforward business tone
- **Fun**: Light-hearted and entertaining
- **Dramatic**: Emphasizes challenges and achievements

### Length Settings

- **Short**: ~500 words
- **Medium**: ~1000 words
- **Long**: ~2000 words

## Generation Process

1. **Data Collection**:

   ```typescript
   interface CommitData {
     sha: string
     message: string
     author: string
     date: string
     changes: {
       files: string[]
       additions: number
       deletions: number
     }
   }
   ```

2. **Analysis**:

   - Commit message categorization
   - Code change impact assessment
   - Timeline construction
   - Developer contribution analysis

3. **Narrative Construction**:
   ```typescript
   interface StorySegment {
     type: 'introduction' | 'development' | 'challenge' | 'resolution'
     content: string
     commits: string[] // Related commit SHAs
     metadata: {
       timeframe: string
       contributors: string[]
       impact: 'minor' | 'moderate' | 'major'
     }
   }
   ```

## Usage Examples

### Basic Story Generation

```typescript
const story = await generateStory({
  repository: 'owner/repo',
  style: 'technical',
  tone: 'professional',
  length: 'medium',
})
```

### Custom Configuration

```typescript
const story = await generateStory({
  repository: 'owner/repo',
  style: 'casual',
  tone: 'fun',
  length: 'short',
  options: {
    focusAreas: ['features', 'bugfixes'],
    timeframe: {
      start: '2024-01-01',
      end: '2024-12-31',
    },
    includedAuthors: ['alice', 'bob'],
    excludedPaths: ['*.test.ts', 'docs/*'],
  },
})
```

## Story Structure

### Components

1. **Introduction**:

   - Project overview
   - Key contributors
   - Timeline scope

2. **Main Content**:

   - Feature developments
   - Challenge resolutions
   - Technical achievements

3. **Conclusion**:
   - Impact summary
   - Future directions
   - Key metrics

### Metadata

```typescript
interface StoryMetadata {
  repository: string
  branch: string
  timeframe: {
    start: string
    end: string
  }
  statistics: {
    commits: number
    contributors: number
    filesChanged: number
    additions: number
    deletions: number
  }
  topics: string[]
}
```

## Customization

### Story Settings

```typescript
interface StorySettings {
  style: 'technical' | 'casual' | 'formal'
  tone: 'professional' | 'fun' | 'dramatic'
  length: 'short' | 'medium' | 'long'
  focus?: {
    features?: boolean
    bugfixes?: boolean
    refactoring?: boolean
    documentation?: boolean
  }
  highlight?: {
    authors?: string[]
    components?: string[]
    timeframes?: Array<{
      start: string
      end: string
      description: string
    }>
  }
}
```

### Developer Personas

```typescript
interface DeveloperPersona {
  role: 'architect' | 'developer' | 'reviewer'
  style: 'detailed' | 'concise'
  focus: 'technical' | 'business' | 'mixed'
}
```

## Best Practices

1. **Repository Preparation**:

   - Clean commit history
   - Meaningful commit messages
   - Proper branch organization

2. **Generation Settings**:

   - Match audience expertise
   - Consider story purpose
   - Balance detail level

3. **Content Review**:
   - Verify technical accuracy
   - Check narrative flow
   - Validate statistics

## Error Handling

```typescript
try {
  const story = await generateStory(settings)
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle invalid settings
  } else if (error instanceof GenerationError) {
    // Handle generation failure
  } else {
    // Handle unexpected errors
  }
}
```

## Performance Considerations

1. **Optimization**:

   - Commit batch processing
   - Content caching
   - Parallel analysis

2. **Limitations**:

   - Max repository size
   - Rate limits
   - Generation timeout

3. **Caching**:
   - Story results
   - Repository data
   - Analysis results
