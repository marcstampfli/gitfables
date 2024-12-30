# Authentication

## Overview

GitFables uses Supabase Auth for authentication, providing secure user management and OAuth integration with various VCS providers.

## Authentication Flow

1. **User Sign In**

   - OAuth with GitHub (primary)
   - Email/Password (backup)
   - Magic Link (passwordless)

2. **Session Management**

   - JWT-based authentication
   - Automatic token refresh
   - Secure session storage

3. **Authorization**
   - Role-based access control
   - Row Level Security (RLS)
   - API key management

## Implementation

### Auth Configuration

```typescript
// lib/supabase/auth-config.ts
export const authConfig = {
  providers: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: 'read:user user:email repo',
    },
    gitlab: {
      // Coming soon
    },
    bitbucket: {
      // Coming soon
    },
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      // Handle sign in
      return true
    },
    session: async ({ session, token }) => {
      // Customize session
      return session
    },
    jwt: async ({ token, user }) => {
      // Customize JWT
      return token
    },
  },
}
```

### Auth Components

```typescript
// components/auth/sign-in.tsx
'use client'

interface SignInProps {
  providers?: Provider[]
  callbackUrl?: string
}

export function SignIn({ providers, callbackUrl }: SignInProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        {providers?.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => signIn(provider.id, { callbackUrl })}
          >
            <provider.Icon className="mr-2 h-4 w-4" />
            Continue with {provider.name}
          </Button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        <EmailSignIn callbackUrl={callbackUrl} />
      </div>
    </div>
  )
}
```

### Auth Hooks

```typescript
// hooks/auth/use-auth.ts
export function useAuth() {
  const supabase = useSupabaseClient()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider.id,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: provider.scopes.join(' '),
      },
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    session,
    loading,
    signIn,
    signOut,
  }
}
```

### Protected Routes

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

## API Authentication

### API Key Management

```typescript
interface APIKey {
  id: string
  name: string
  key: string
  user_id: string
  created_at: string
  expires_at: string | null
  last_used_at: string | null
}

// Create API key
async function createAPIKey(name: string, expiresIn?: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      name,
      expires_at: expiresIn
        ? new Date(Date.now() + ms(expiresIn)).toISOString()
        : null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Validate API key
async function validateAPIKey(key: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .select()
    .eq('key', key)
    .single()

  if (error) return null

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return null
  }

  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id)

  return data
}
```

### API Route Protection

```typescript
// middleware/api-auth.ts
import { validateAPIKey } from '@/lib/api-keys'

export async function apiAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({
        error: 'Missing or invalid authorization header',
      }),
      { status: 401 }
    )
  }

  const key = authHeader.split(' ')[1]
  const apiKey = await validateAPIKey(key)

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Invalid API key',
      }),
      { status: 401 }
    )
  }

  return NextResponse.next()
}
```

## Database Security

### Row Level Security (RLS)

```sql
-- Enable RLS
alter table "public"."stories" enable row level security;

-- Create policies
create policy "Users can view their own stories"
  on stories for select
  using ( auth.uid() = user_id );

create policy "Users can create their own stories"
  on stories for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own stories"
  on stories for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own stories"
  on stories for delete
  using ( auth.uid() = user_id );
```

### Function-Level Security

```sql
-- Create secure function
create function get_user_stories(
  user_id uuid
) returns setof stories
  language sql
  security definer
  set search_path = public
as $$
  select *
  from stories
  where user_id = auth.uid()
$$;

-- Grant execute permission
grant execute on function get_user_stories to authenticated;
```

## Error Handling

```typescript
interface AuthError {
  code: string
  message: string
  status: number
}

async function handleAuthError(error: AuthError) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'User account has been disabled'
    case 'auth/user-not-found':
      return 'User not found'
    case 'auth/wrong-password':
      return 'Invalid password'
    default:
      return 'An error occurred during authentication'
  }
}
```

## Best Practices

1. **Security**

   - Use HTTPS everywhere
   - Implement CSRF protection
   - Set secure cookie options
   - Validate all user input

2. **Session Management**

   - Short session duration
   - Secure session storage
   - Regular token rotation
   - Session invalidation

3. **API Security**

   - Rate limiting
   - Request validation
   - Error handling
   - Audit logging

4. **OAuth Integration**
   - Minimal scope requests
   - State parameter validation
   - Token secure storage
   - Regular token refresh

## Future Enhancements

1. **Additional Providers**

   - GitLab OAuth
   - Bitbucket OAuth
   - Azure DevOps
   - Custom OAuth

2. **Security Features**

   - Two-factor authentication
   - Device management
   - Login history
   - Security alerts

3. **API Improvements**
   - Granular permissions
   - Webhook signatures
   - API versioning
   - Usage analytics
