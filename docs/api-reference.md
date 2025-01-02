# API Reference

## Overview

GitFables provides a RESTful API for integrating with your applications. All requests should be made to the base URL: `https://api.gitfables.com/v1`.

## Authentication

All API requests require authentication using an API key:

```bash
curl -H "Authorization: Bearer your_api_key" \
  https://api.gitfables.com/v1/stories
```

## Rate Limiting

- 100 requests per minute per API key
- Rate limit headers included in responses
- Burst allowance for short periods

## Endpoints

### Stories

#### List Stories

```http
GET /stories
```

Query parameters:

```typescript
interface ListStoriesParams {
  repository?: string // Filter by repository
  page?: number // Page number (default: 1)
  limit?: number // Items per page (default: 10)
  sort?: 'created' | 'updated' | 'title'
  order?: 'asc' | 'desc'
}
```

Response:

```typescript
interface StoriesResponse {
  data: Story[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

interface Story {
  id: string
  title: string
  content: string
  repository: string
  created_at: string
  updated_at: string
  author: {
    id: string
    name: string
    avatar_url: string
  }
}
```

#### Get Story

```http
GET /stories/:id
```

Response:

```typescript
interface Story {
  id: string
  title: string
  content: string
  repository: string
  created_at: string
  updated_at: string
  author: {
    id: string
    name: string
    avatar_url: string
  }
  metadata: {
    commit_count: number
    date_range: {
      start: string
      end: string
    }
    contributors: {
      id: string
      name: string
      commits: number
    }[]
  }
}
```

#### Create Story

```http
POST /stories
```

Request body:

```typescript
interface CreateStoryRequest {
  repository: string
  title: string
  options: {
    style: 'technical' | 'narrative' | 'summary'
    depth: 'basic' | 'detailed' | 'comprehensive'
    date_range?: {
      start: string
      end: string
    }
  }
}
```

### Repositories

#### List Repositories

```http
GET /repositories
```

Response:

```typescript
interface RepositoriesResponse {
  data: Repository[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  provider: 'github' | 'gitlab' | 'bitbucket'
  private: boolean
  updated_at: string
  stats: {
    stars: number
    forks: number
    open_issues: number
  }
}
```

#### Get Repository

```http
GET /repositories/:id
```

Response:

```typescript
interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  provider: 'github' | 'gitlab' | 'bitbucket'
  private: boolean
  updated_at: string
  stats: {
    stars: number
    forks: number
    open_issues: number
  }
  contributors: {
    id: string
    name: string
    commits: number
    avatar_url: string
  }[]
  branches: {
    name: string
    commit: string
    protected: boolean
  }[]
}
```

### Analytics

#### Get Repository Analytics

```http
GET /analytics/repositories/:id
```

Query parameters:

```typescript
interface AnalyticsParams {
  start_date: string
  end_date: string
  metrics: string[]
  interval: 'day' | 'week' | 'month'
}
```

Response:

```typescript
interface AnalyticsResponse {
  repository_id: string
  timeframe: {
    start: string
    end: string
  }
  metrics: {
    commits: {
      total: number
      series: {
        date: string
        value: number
      }[]
    }
    contributors: {
      total: number
      series: {
        date: string
        value: number
      }[]
    }
    // ... other metrics
  }
}
```

### Users

#### Get Current User

```http
GET /users/me
```

Response:

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar_url: string
  created_at: string
  settings: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    email_preferences: {
      stories: boolean
      analytics: boolean
      updates: boolean
    }
  }
}
```

## Error Handling

All errors follow this format:

```typescript
interface APIError {
  error: {
    code: string
    message: string
    details?: any
  }
}
```

Common error codes:

- `unauthorized`: Invalid or missing API key
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `validation_error`: Invalid request data
- `rate_limit_exceeded`: Too many requests
- `internal_error`: Server error

## Webhooks

### Setting Up Webhooks

```http
POST /webhooks
```

Request body:

```typescript
interface CreateWebhookRequest {
  url: string
  events: string[]
  secret: string
  active: boolean
}
```

### Webhook Events

Available events:

- `story.created`
- `story.updated`
- `story.deleted`
- `repository.connected`
- `repository.disconnected`

### Webhook Payload

```typescript
interface WebhookPayload {
  event: string
  timestamp: string
  data: any
  signature: string
}
```

## SDKs

Official SDKs:

- [JavaScript/TypeScript](https://github.com/gitfables/js-sdk)
- [Python](https://github.com/gitfables/python-sdk)
- [Ruby](https://github.com/gitfables/ruby-sdk)

## Examples

### Creating a Story

```typescript
const response = await fetch('https://api.gitfables.com/v1/stories', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    repository: 'owner/repo',
    title: 'Sprint Review Story',
    options: {
      style: 'technical',
      depth: 'detailed',
      date_range: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
    },
  }),
})

const story = await response.json()
```

### Fetching Analytics

```typescript
const response = await fetch(
  'https://api.gitfables.com/v1/analytics/repositories/123?' +
    new URLSearchParams({
      start_date: '2024-01-01',
      end_date: '2024-01-31',
      metrics: ['commits', 'contributors'].join(','),
      interval: 'week',
    }),
  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }
)

const analytics = await response.json()
```
