# API Reference

## Overview

GitFables provides a RESTful API for interacting with the platform programmatically. This document outlines the available endpoints, authentication methods, and usage examples.

## Authentication

### API Keys

All API requests must include an API key in the `Authorization` header:

```bash
Authorization: Bearer your-api-key
```

To obtain an API key:

1. Log in to your GitFables account
2. Navigate to Settings > API Keys
3. Generate a new API key
4. Copy and securely store your API key

### Rate Limiting

- 100 requests per minute per API key
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Endpoints

### Stories

#### List Stories

```http
GET /api/stories
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `repository` (optional): Filter by repository ID
- `status` (optional): Filter by status (draft, published)

Response:

```json
{
  "data": [
    {
      "id": "story_123",
      "title": "Story Title",
      "summary": "Story summary",
      "repository": {
        "id": "repo_456",
        "name": "user/repo",
        "provider": "github"
      },
      "status": "published",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 50
  }
}
```

#### Get Story

```http
GET /api/stories/:id
```

Response:

```json
{
  "id": "story_123",
  "title": "Story Title",
  "content": "Story content...",
  "summary": "Story summary",
  "repository": {
    "id": "repo_456",
    "name": "user/repo",
    "provider": "github"
  },
  "metadata": {
    "commit_count": 50,
    "date_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "contributors": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "commit_count": 25
      }
    ]
  },
  "status": "published",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### Generate Story

```http
POST /api/stories/generate
```

Request Body:

```json
{
  "repository_id": "repo_456",
  "settings": {
    "style": "technical",
    "date_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "include_contributors": true,
    "include_statistics": true
  }
}
```

Response:

```json
{
  "id": "story_123",
  "status": "processing",
  "estimated_completion": "2024-01-01T00:01:00Z"
}
```

#### Update Story

```http
PATCH /api/stories/:id
```

Request Body:

```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

Response:

```json
{
  "id": "story_123",
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Repositories

#### List Repositories

```http
GET /api/repositories
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `provider` (optional): Filter by provider (github, gitlab, bitbucket)

Response:

```json
{
  "data": [
    {
      "id": "repo_456",
      "name": "user/repo",
      "provider": "github",
      "description": "Repository description",
      "default_branch": "main",
      "visibility": "public",
      "stats": {
        "stars": 100,
        "forks": 10,
        "open_issues": 5
      },
      "connected_at": "2024-01-01T00:00:00Z",
      "last_synced_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 50
  }
}
```

#### Get Repository

```http
GET /api/repositories/:id
```

Response:

```json
{
  "id": "repo_456",
  "name": "user/repo",
  "provider": "github",
  "description": "Repository description",
  "default_branch": "main",
  "visibility": "public",
  "stats": {
    "stars": 100,
    "forks": 10,
    "open_issues": 5
  },
  "settings": {
    "auto_sync": true,
    "sync_frequency": "daily",
    "default_story_visibility": "public"
  },
  "connected_at": "2024-01-01T00:00:00Z",
  "last_synced_at": "2024-01-01T00:00:00Z"
}
```

#### Update Repository Settings

```http
PATCH /api/repositories/:id/settings
```

Request Body:

```json
{
  "auto_sync": true,
  "sync_frequency": "daily",
  "default_story_visibility": "public"
}
```

Response:

```json
{
  "id": "repo_456",
  "settings": {
    "auto_sync": true,
    "sync_frequency": "daily",
    "default_story_visibility": "public"
  },
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### User Settings

#### Get Settings

```http
GET /api/settings
```

Response:

```json
{
  "theme": {
    "mode": "system",
    "accent_color": "default",
    "language": "en"
  },
  "notifications": {
    "email": true,
    "web": true,
    "digest": "weekly"
  },
  "privacy": {
    "show_activity": true,
    "default_story_visibility": "private"
  },
  "repository": {
    "auto_sync": true,
    "default_branch": "main",
    "sync_frequency": "daily"
  },
  "accessibility": {
    "font_size": "medium",
    "high_contrast": false,
    "reduce_animations": false,
    "keyboard_shortcuts": true
  }
}
```

#### Update Settings

```http
PATCH /api/settings
```

Request Body:

```json
{
  "theme": {
    "mode": "dark"
  },
  "notifications": {
    "email": false
  }
}
```

Response:

```json
{
  "theme": {
    "mode": "dark",
    "accent_color": "default",
    "language": "en"
  },
  "notifications": {
    "email": false,
    "web": true,
    "digest": "weekly"
  },
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### API Keys

#### List API Keys

```http
GET /api/keys
```

Response:

```json
{
  "data": [
    {
      "id": "key_789",
      "name": "Development Key",
      "last_used": "2024-01-01T00:00:00Z",
      "created_at": "2024-01-01T00:00:00Z",
      "expires_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### Create API Key

```http
POST /api/keys
```

Request Body:

```json
{
  "name": "New API Key",
  "expires_in": "1y"
}
```

Response:

```json
{
  "id": "key_789",
  "name": "New API Key",
  "key": "gf_key_123...", // Only shown once
  "created_at": "2024-01-01T00:00:00Z",
  "expires_at": "2025-01-01T00:00:00Z"
}
```

#### Revoke API Key

```http
DELETE /api/keys/:id
```

Response:

```json
{
  "id": "key_789",
  "status": "revoked"
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Detailed error message",
    "details": {
      "field": "specific_field",
      "reason": "validation_failed"
    }
  }
}
```

### Common Error Codes

- `unauthorized`: Invalid or missing API key
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `invalid_request`: Invalid request parameters
- `rate_limited`: Rate limit exceeded
- `internal_error`: Server error

### HTTP Status Codes

- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Webhooks

### Available Events

- `story.generated`
- `story.published`
- `repository.connected`
- `repository.synced`

### Webhook Format

```json
{
  "id": "evt_123",
  "type": "story.generated",
  "created_at": "2024-01-01T00:00:00Z",
  "data": {
    "story_id": "story_123",
    "repository_id": "repo_456",
    "status": "completed"
  }
}
```

### Webhook Security

- HMAC signatures included in `X-GitFables-Signature` header
- Verify webhooks using your webhook secret
- Retry logic for failed deliveries

## SDKs

Official SDKs are available for:

- JavaScript/TypeScript
- Python
- Ruby
- Go

Example (TypeScript):

```typescript
import { GitFables } from '@gitfables/sdk'

const client = new GitFables('your-api-key')

// Generate a story
const story = await client.stories.generate({
  repository_id: 'repo_456',
  settings: {
    style: 'technical',
  },
})
```

## Support

- [API Status Page](https://status.gitfables.com)
- [Developer Documentation](https://docs.gitfables.com)
- [API Support Email](mailto:api@gitfables.com)
- [Discord Community](https://discord.gg/gitfables)
