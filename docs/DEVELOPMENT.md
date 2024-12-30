# Development Guide

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- A Supabase account
- A GitHub OAuth application

### Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gitfables.git
   cd gitfables
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   # Supabase configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   SUPABASE_DB_PASSWORD=your_supabase_db_password

   # GitHub OAuth configuration
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

### Key Directories

- `src/app`: Next.js app router pages and API routes
- `src/components`: React components organized by feature
- `src/hooks`: Custom React hooks for state management and data fetching
- `src/lib`: Core utilities and services
- `src/types`: TypeScript type definitions

### Component Organization

Components are organized by feature and follow a consistent pattern:

```typescript
// Example component structure
import * as React from 'react'
import { useSettings } from '@/hooks/use-settings'
import type { ComponentProps } from './types'

export function ExampleComponent({ initialData }: ComponentProps) {
  // State management
  const [state, setState] = React.useState(initialData)

  // Effects and callbacks
  React.useEffect(() => {
    // Component logic
  }, [dependencies])

  // Event handlers
  const handleEvent = async () => {
    try {
      // Event handling logic
    } catch (error) {
      // Error handling
    }
  }

  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### Hooks Pattern

Custom hooks follow a consistent pattern:

```typescript
// Example hook structure
import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useExample() {
  // State
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Data fetching
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      // Fetch data
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    fetchData,
  }
}
```

## Development Workflow

### 1. Feature Development

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement the feature following these guidelines:

   - Use TypeScript for type safety
   - Write clean, maintainable code
   - Follow the established patterns
   - Add necessary tests

3. Test your changes:
   ```bash
   npm run test        # Run tests
   npm run lint        # Run linter
   npm run type-check  # Run type checker
   ```

### 2. Code Style

- Use TypeScript for all new code
- Follow the established naming conventions
- Use consistent formatting (enforced by Prettier)
- Write meaningful comments and documentation

### 3. Component Guidelines

1. **Server Components**

   - Use by default for better performance
   - Keep client-side code minimal
   - Handle data fetching at the server level

2. **Client Components**

   - Add 'use client' directive
   - Keep state management simple
   - Use hooks for complex logic
   - Handle client-side interactions

3. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Support keyboard navigation
   - Test with screen readers

### 4. State Management

1. **Server State**

   - Use React Server Components
   - Implement server actions
   - Cache responses appropriately

2. **Client State**

   - Use React hooks
   - Keep state close to components
   - Avoid unnecessary global state

3. **Form State**
   - Use controlled components
   - Implement proper validation
   - Handle errors gracefully

## Testing

### 1. Unit Tests

```typescript
import { render, screen } from '@testing-library/react'
import { ExampleComponent } from './example-component'

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    render(<ExampleComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### 2. Integration Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExampleFeature } from './example-feature'

describe('ExampleFeature', () => {
  it('handles user interactions', async () => {
    render(<ExampleFeature />)
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })
})
```

## Deployment

### 1. Production Build

```bash
npm run build   # Create production build
npm run start   # Start production server
```

### 2. Environment Variables

Ensure all required environment variables are set in your deployment environment:

```env
# Required variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=
SUPABASE_DB_PASSWORD=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional variables
NODE_ENV=production
NEXT_PUBLIC_VERCEL_URL=
```

### 3. Database Migrations

```bash
npm run db:migrate   # Run database migrations
npm run db:seed     # Seed database with initial data
```

## Troubleshooting

### Common Issues

1. **Build Errors**

   - Check TypeScript errors
   - Verify dependencies
   - Clear build cache

2. **Runtime Errors**

   - Check environment variables
   - Verify API endpoints
   - Check database connections

3. **Performance Issues**
   - Use React DevTools
   - Check network requests
   - Monitor memory usage

### Debug Tools

1. **Browser DevTools**

   - React Developer Tools
   - Network tab
   - Console logs

2. **Server Logs**
   - Application logs
   - Database logs
   - Error tracking

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Follow the [Contributing Guide](./contributing.md) for detailed instructions.
