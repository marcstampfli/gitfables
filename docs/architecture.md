# Architecture

GitFables follows a modern, modular architecture designed for scalability and maintainability.

## Core Principles

- **Server-First**: Leveraging Next.js 14's server components for optimal performance
- **Type Safety**: End-to-end type safety with Supabase and TypeScript
- **Modular Design**: Feature-based organization with clear boundaries
- **Clean Architecture**: Separation of concerns and predictable data flow

## Key Components

### Frontend Architecture

```
components/
├── analytics/     # Analytics and metrics
├── auth/         # Authentication components
├── dashboard/    # Dashboard features
├── layout/       # Layout components
├── story/        # Story rendering
└── ui/           # Shadcn UI components
```

### Backend Architecture

```
lib/
├── auth/         # Authentication logic
├── story/        # Story generation
├── supabase/     # Database client
└── utils/        # Utility functions
```

## Data Flow

1. **Authentication Flow**:

   ```mermaid
   sequenceDiagram
   participant User
   participant App
   participant Supabase
   participant GitHub

   User->>App: Click Login
   App->>Supabase: Sign in with GitHub
   Supabase->>GitHub: OAuth Request
   GitHub->>User: Authorize
   User->>GitHub: Approve
   GitHub->>Supabase: Token
   Supabase->>App: Session
   App->>User: Redirect to Dashboard
   ```

2. **Story Generation Flow**:

   ```mermaid
   sequenceDiagram
   participant User
   participant App
   participant Supabase
   participant GitHub
   participant StoryEngine

   User->>App: Select Repository
   App->>GitHub: Fetch Commits
   GitHub->>App: Commit History
   App->>StoryEngine: Process History
   StoryEngine->>Supabase: Save Story
   Supabase->>App: Story Data
   App->>User: Display Story
   ```

## Key Technologies

### Frontend

- **Next.js 14**: React framework with App Router and RSC
- **TailwindCSS**: Utility-first styling
- **Shadcn UI**: Component library
- **TypeScript**: Type safety

### Backend

- **Supabase**:
  - PostgreSQL database
  - Row Level Security
  - Real-time subscriptions
  - Authentication
- **GitHub API**: Repository access

## State Management

1. **Server State**:

   - Server Components for data fetching
   - Supabase for database queries
   - Strong typing with generated types

2. **Client State**:
   - React hooks for UI state
   - Form state with react-hook-form
   - Minimal client-side state

## Security

1. **Authentication**:

   - Supabase Auth
   - Row Level Security
   - Protected routes
   - Type-safe auth helpers

2. **Data Protection**:
   - Input validation
   - SQL injection prevention
   - XSS protection
   - CORS configuration

## Performance

1. **Server Components**:

   - Reduced client JS
   - Streaming with Suspense
   - Optimized data fetching

2. **Optimizations**:
   - Image optimization
   - Font optimization
   - Code splitting
   - Edge caching

## Development Workflow

1. **Code Organization**:

   - Feature-based structure
   - Clear naming conventions
   - Type-safe APIs
   - Comprehensive docs

2. **Quality Assurance**:

   - TypeScript strict mode
   - ESLint configuration
   - Prettier formatting
   - Git hooks with Husky

3. **Deployment**:
   - Vercel deployment
   - Environment management
   - Error monitoring
   - Analytics tracking
