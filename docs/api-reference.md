# API Reference

GitFables provides a RESTful API for programmatic access to story generation and repository management.

## Authentication

All API requests require authentication using an API key. Include it in the `Authorization` header:

```http
Authorization: Bearer your_api_key_here
```

## Rate Limiting

API requests are rate-limited to:

- 100 requests per minute for free tier
- 1000 requests per minute for pro tier

## Endpoints

### Stories

#### Generate Story

```http
POST /api/stories
Content-Type: application/json
Authorization: Bearer your_api_key_here

{
  "repository": "owner/repo",
  "branch": "main",
  "style": "technical|casual|formal",
  "tone": "professional|fun|dramatic",
  "length": "short|medium|long"
}
```

Response:

```json
{
  "id": "story_id",
  "content": "Generated story content...",
  "metadata": {
    "repository": "owner/repo",
    "commitCount": 42,
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Story

```http
GET /api/stories/{story_id}
Authorization: Bearer your_api_key_here
```

Response:

```json
{
  "id": "story_id",
  "content": "Story content...",
  "metadata": {
    "repository": "owner/repo",
    "commitCount": 42,
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### List Stories

```http
GET /api/stories
Authorization: Bearer your_api_key_here
```

Response:

```json
{
  "stories": [
    {
      "id": "story_id",
      "content": "Story content...",
      "metadata": {
        "repository": "owner/repo",
        "commitCount": 42,
        "generatedAt": "2024-01-01T00:00:00Z"
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "perPage": 10
  }
}
```

### Repositories

#### Connect Repository

```http
POST /api/repositories
Content-Type: application/json
Authorization: Bearer your_api_key_here

{
  "owner": "username",
  "repo": "repository",
  "branch": "main"
}
```

Response:

```json
{
  "id": "repo_id",
  "owner": "username",
  "repo": "repository",
  "branch": "main",
  "status": "connected"
}
```

#### List Connected Repositories

```http
GET /api/repositories
Authorization: Bearer your_api_key_here
```

Response:

```json
{
  "repositories": [
    {
      "id": "repo_id",
      "owner": "username",
      "repo": "repository",
      "branch": "main",
      "status": "connected"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "perPage": 10
  }
}
```

### API Keys

#### Create API Key

```http
POST /api/keys
Content-Type: application/json
Authorization: Bearer your_api_key_here

{
  "name": "My API Key",
  "expiration": "2025-01-01T00:00:00Z"
}
```

Response:

```json
{
  "id": "key_id",
  "key": "api_key_value",
  "name": "My API Key",
  "expiration": "2025-01-01T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### List API Keys

```http
GET /api/keys
Authorization: Bearer your_api_key_here
```

Response:

```json
{
  "keys": [
    {
      "id": "key_id",
      "name": "My API Key",
      "expiration": "2025-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Error Handling

The API uses conventional HTTP response codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

Error Response Format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Webhooks

GitFables can send webhook notifications for various events:

```http
POST your_webhook_url
Content-Type: application/json
X-GitFables-Signature: sha256=...

{
  "event": "story.generated",
  "data": {
    "id": "story_id",
    "repository": "owner/repo",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

Available Events:

- `story.generated`: When a new story is generated
- `repository.connected`: When a repository is connected
- `repository.synced`: When repository data is synced
