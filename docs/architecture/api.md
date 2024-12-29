# API Documentation

## Overview

GitFables API is built using Next.js 14 API routes with TypeScript. The API provides endpoints for repository management, story generation, and user interactions.

## Base URL

```
Production: https://gitfables.com/api
Development: http://localhost:3000/api
```

## Authentication

All API requests must include a valid session token in the request headers:

```typescript
headers: {
  'Authorization': 'Bearer <session_token>'
}
```

## API Endpoints

### Authentication

#### GET /api/auth/session

Get current session information

**Response**

```typescript
{
  user: {
    id: string
    email: string
    created_at: string
  } | null
  error?: string
}
```

### Repositories

#### GET /api/repositories

List user's repositories

**Query Parameters**

- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sort`: 'name' | 'last_synced' (default: 'last_synced')

**Response**

```typescript
{
  repositories: {
    id: string
    name: string
    description: string
    github_id: string
    last_synced_at: string
    story_count: number
    commit_count: number
  }
  ;[]
  total: number
  page: number
  limit: number
}
```

#### POST /api/repositories

Connect a new repository

**Request Body**

```typescript
{
  github_id: string
  name: string
  description?: string
}
```

**Response**

```typescript
{
  repository: {
    id: string
    name: string
    description: string
    github_id: string
    last_synced_at: string
  }
  error?: string
}
```

#### GET /api/repositories/:id

Get repository details

**Response**

```typescript
{
  repository: {
    id: string
    name: string
    description: string
    github_id: string
    last_synced_at: string
    story_count: number
    commit_count: number
    stories: {
      id: string
      title: string
      created_at: string
    }[]
  }
  error?: string
}
```

#### DELETE /api/repositories/:id

Disconnect a repository

**Response**

```typescript
{
  success: boolean
  error?: string
}
```

### Stories

#### GET /api/stories

List user's stories

**Query Parameters**

- `page`: number (default: 1)
- `limit`: number (default: 10)
- `repository_id`: string (optional)
- `sort`: 'created' | 'views' (default: 'created')

**Response**

```typescript
{
  stories: {
    id: string
    title: string
    description: string
    repository: {
      id: string
      name: string
    }
    created_at: string
    view_count: number
    share_count: number
  }
  ;[]
  total: number
  page: number
  limit: number
}
```

#### POST /api/stories

Generate a new story

**Request Body**

```typescript
{
  repository_id: string
  title?: string
  template?: string
  is_public?: boolean
}
```

**Response**

```typescript
{
  story: {
    id: string
    title: string
    content: string
    created_at: string
  }
  error?: string
}
```

#### GET /api/stories/:id

Get story details

**Response**

```typescript
{
  story: {
    id: string
    title: string
    description: string
    content: string
    repository: {
      id: string
      name: string
    }
    created_at: string
    updated_at: string
    view_count: number
    share_count: number
    is_public: boolean
  }
  error?: string
}
```

#### PATCH /api/stories/:id

Update story details

**Request Body**

```typescript
{
  title?: string
  description?: string
  is_public?: boolean
}
```

**Response**

```typescript
{
  story: {
    id: string
    title: string
    description: string
    updated_at: string
  }
  error?: string
}
```

#### DELETE /api/stories/:id

Delete a story

**Response**

```typescript
{
  success: boolean
  error?: string
}
```

### User Profile

#### GET /api/profile

Get user profile

**Response**

```typescript
{
  profile: {
    id: string
    full_name: string
    bio: string
    auto_generate_stories: boolean
    public_stories_default: boolean
    email_notifications: boolean
  }
  error?: string
}
```

#### PATCH /api/profile

Update user profile

**Request Body**

```typescript
{
  full_name?: string
  bio?: string
  auto_generate_stories?: boolean
  public_stories_default?: boolean
  email_notifications?: boolean
}
```

**Response**

```typescript
{
  profile: {
    id: string
    full_name: string
    bio: string
    updated_at: string
  }
  error?: string
}
```

## Error Handling

### Error Response Format

```typescript
{
  error: {
    code: string
    message: string
    details?: any
  }
}
```

### Common Error Codes

- `auth/unauthorized`: Authentication required
- `auth/forbidden`: Insufficient permissions
- `validation/invalid`: Invalid request data
- `not_found`: Resource not found
- `rate_limit`: Too many requests
- `server_error`: Internal server error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Implementation Example

```typescript
// app/api/stories/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const repository_id = searchParams.get('repository_id')
    const sort = searchParams.get('sort') ?? 'created'

    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        {
          error: {
            code: 'auth/unauthorized',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      )
    }

    // Build query
    let query = supabase
      .from('stories')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .range((page - 1) * limit, page * limit - 1)

    // Add filters
    if (repository_id) {
      query = query.eq('repository_id', repository_id)
    }

    // Add sorting
    if (sort === 'views') {
      query = query.order('view_count', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Execute query
    const { data: stories, count, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'server_error', message: 'Failed to fetch stories' } },
        { status: 500 }
      )
    }

    return NextResponse.json({
      stories,
      total: count ?? 0,
      page,
      limit,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      {
        error: {
          code: 'server_error',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    )
  }
}
```

## Testing

### Example API Test

```typescript
// __tests__/api/stories.test.ts
import { createClient } from '@supabase/supabase-js'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Stories API', () => {
  let supabase: ReturnType<typeof createClient>

  beforeEach(() => {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  })

  it('should list user stories', async () => {
    const response = await fetch('/api/stories')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.stories).toBeInstanceOf(Array)
    expect(data.total).toBeGreaterThanOrEqual(0)
  })

  it('should handle pagination', async () => {
    const response = await fetch('/api/stories?page=2&limit=5')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.stories.length).toBeLessThanOrEqual(5)
    expect(data.page).toBe(2)
    expect(data.limit).toBe(5)
  })
})
```

## API Versioning

Current version: v1 (implicit)

Future versions will be explicitly versioned:

```
/api/v2/stories
```

## Security

1. **Authentication**

   - JWT validation
   - Session management
   - CORS configuration

2. **Input Validation**

   - Request schema validation
   - Parameter sanitization
   - Type checking

3. **Output Security**
   - Response sanitization
   - Error message safety
   - Data filtering

## Monitoring

1. **Performance Metrics**

   - Response times
   - Error rates
   - Request volume

2. **Error Tracking**

   - Stack traces
   - Error context
   - User impact

3. **Usage Analytics**
   - Endpoint popularity
   - User patterns
   - Feature adoption
