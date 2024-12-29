# Authentication

GitFables uses Supabase Auth for secure authentication, supporting both GitHub OAuth and API key authentication.

## GitHub OAuth Authentication

### Flow Overview

1. User clicks "Sign in with GitHub"
2. User is redirected to GitHub for authorization
3. After approval, GitHub redirects back with a code
4. Supabase Auth exchanges the code for tokens
5. User session is created and stored

### Implementation

```typescript
// Sign in with GitHub
await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
    scopes: 'repo read:user',
  },
})

// Handle auth callback
const {
  data: { session },
  error,
} = await supabase.auth.getSession()
```

### Required Scopes

- `repo`: Access private repositories
- `read:user`: Read user profile information

## API Key Authentication

### Creating API Keys

1. Navigate to Settings > API Keys
2. Click "Create New Key"
3. Set name and expiration
4. Store the key securely - it won't be shown again

### Using API Keys

Include the API key in the Authorization header:

```http
Authorization: Bearer your_api_key_here
```

### Key Management

- Keys can be revoked at any time
- Set appropriate expirations
- Monitor key usage in analytics
- Rotate keys regularly

## Session Management

### Client-Side

```typescript
// Get current session
const session = await supabase.auth.getSession()

// Subscribe to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // Handle sign in
  } else if (event === 'SIGNED_OUT') {
    // Handle sign out
  }
})
```

### Server-Side

```typescript
// Middleware protection
export async function middleware(req: NextRequest) {
  const { supabase, response } = createRouteHandlerClient(req)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect('/login')
  }

  return response
}
```

## Security Considerations

### Token Storage

- Access tokens stored in HTTP-only cookies
- Refresh tokens managed by Supabase
- No sensitive data in localStorage

### CORS & CSP

```typescript
// Next.js config
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self';",
        },
      ],
    },
  ],
}
```

### Rate Limiting

- API requests rate-limited by key
- Auth attempts rate-limited by IP
- Automatic blocking of suspicious activity

## Error Handling

```typescript
try {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (error) {
    // Handle auth error
    console.error('Auth error:', error.message)
    throw error
  }

  // Success
} catch (error) {
  // Handle unexpected errors
}
```

## Best Practices

1. **Security**:

   - Use HTTPS everywhere
   - Implement proper CORS
   - Set secure cookie policies
   - Regular key rotation

2. **UX**:

   - Clear error messages
   - Smooth auth flows
   - Persistent sessions
   - Easy key management

3. **Maintenance**:
   - Monitor auth failures
   - Track key usage
   - Regular security audits
   - Keep dependencies updated
