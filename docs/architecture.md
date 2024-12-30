# Architecture Overview

## Core Technologies

- **Next.js 14**: Full-stack React framework with App Router
- **TypeScript**: Type-safe development
- **Supabase**: Authentication and PostgreSQL database
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: Accessible component library

## Application Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/        # Authentication routes
│   ├── (dashboard)/   # Protected dashboard routes
│   ├── (marketing)/   # Public marketing pages
│   └── api/           # API routes
├── components/         # React components
│   ├── analytics/     # Analytics components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── layout/        # Layout components
│   ├── repositories/  # Repository components
│   ├── settings/      # Settings components
│   ├── story/         # Story components
│   └── ui/            # Shadcn UI components
├── hooks/             # Custom React hooks
│   ├── api/          # API-related hooks
│   ├── settings/     # Settings hooks
│   └── vcs/          # VCS provider hooks
├── lib/              # Core libraries
│   ├── actions/      # Server actions
│   ├── supabase/     # Database client
│   ├── utils/        # Utility functions
│   └── vcs/          # VCS provider implementations
└── types/           # TypeScript types
```

## Key Features

### 1. Authentication

- Supabase Auth integration
- OAuth providers (GitHub)
- Protected routes
- Session management

### 2. VCS Integration

- GitHub OAuth authentication
- Repository connection
- Commit history sync
- Provider abstraction layer

### 3. Settings Management

```typescript
interface SettingsUpdate {
  theme?: 'light' | 'dark' | 'system'
  notifications?: {
    email?: boolean
    push?: boolean
    inApp?: boolean
  }
  privacy?: {
    shareAnalytics?: boolean
    shareUsage?: boolean
  }
  accessibility?: {
    reduceMotion?: boolean
    highContrast?: boolean
    largeText?: boolean
  }
  advanced?: {
    experimentalFeatures?: boolean
    debugMode?: boolean
  }
}
```

### 4. API Key Management

```typescript
interface APIKeyUsage {
  total_requests: number
  avg_response_time: number
  success_rate: number
  requests_by_endpoint: Record<string, number>
  requests_by_status: Record<string, number>
  requests_over_time: Array<{ timestamp: string; count: number }>
  response_times_over_time: Array<{ timestamp: string; value: number }>
}
```

## Database Schema

### VCS Connections

```sql
create table vcs_connections (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  provider text not null check (provider in ('github', 'gitlab', 'bitbucket')),
  provider_user_id text not null,
  provider_username text not null,
  provider_email text not null,
  provider_avatar_url text,
  access_token text not null,
  refresh_token text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, provider)
);
```

### User Settings

```sql
create table user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  settings jsonb not null default '{
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
  }',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id)
);
```

## Component Architecture

### Server Components (Default)

```typescript
// Example server component
export default async function SettingsPage() {
  const userSettings = await getSettings()

  // Convert UserSettings to SettingsUpdate format
  const initialSettings: SettingsUpdate = {
    theme: userSettings.theme.mode,
    notifications: {
      email: userSettings.notifications.email,
      push: userSettings.notifications.web,
      inApp: userSettings.notifications.web
    },
    // ... other settings
  }

  return <SettingsContent initialSettings={initialSettings} />
}
```

### Client Components

```typescript
'use client'

export function AppearanceTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('system')

  // Initialize state from settings
  React.useEffect(() => {
    if (settings) {
      setThemeMode((settings.theme as ThemeMode) ?? 'system')
    }
  }, [settings])

  const handleThemeChange = async (mode: ThemeMode) => {
    setThemeMode(mode)
    await updateSettings({
      theme: mode
    })
  }

  return (
    // Component JSX
  )
}
```

## State Management

### Server State

- React Server Components
- Server Actions
- Database queries

### Client State

- React hooks
- Local component state
- Form state management

## API Design

### REST Endpoints

```typescript
// Example API route
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('api_key')

    // Validate API key
    // Process request
    // Return response

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
```

### Server Actions

```typescript
'use server'

export async function updateSettings(settings: SettingsUpdate) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('user_settings')
    .update({ settings })
    .eq('user_id', user.id)

  if (error) throw error
  return { success: true }
}
```

## Security

### Authentication

- Supabase Auth
- OAuth providers
- Session management
- Protected routes

### Authorization

- Row Level Security (RLS)
- API key validation
- Rate limiting
- Scope checking

## Performance

### Optimizations

- React Server Components
- Edge caching
- Incremental Static Regeneration
- Dynamic imports

### Monitoring

- Error tracking
- Performance metrics
- Usage analytics
- API monitoring

## Future Enhancements

1. **Additional VCS Providers**

   - GitLab integration
   - Bitbucket integration
   - Custom provider framework

2. **Enhanced Analytics**

   - Advanced metrics
   - Custom reports
   - Data visualization

3. **Performance Improvements**
   - Edge functions
   - Caching strategies
   - Bundle optimization
