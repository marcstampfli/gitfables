# Architecture

GitFables follows a modern, modular architecture designed for scalability and maintainability.

## Core Principles

- **Server Components First**: Leveraging Next.js 14's server components for improved performance
- **Type Safety**: Comprehensive TypeScript types throughout the codebase
- **Modular Design**: Feature-based organization of components and logic
- **Clean Architecture**: Clear separation of concerns and dependencies

## Key Components

### Frontend Architecture

```
components/
├── analytics/     # Analytics visualization and reporting
├── auth/         # Authentication UI components
├── layout/       # Layout and structural components
├── providers/    # React context providers
├── repositories/ # Repository management UI
├── sections/     # Page-specific sections
├── story/        # Story display and management
├── ui/          # Reusable UI components
└── visualizations/ # Data visualization components
```

### Backend Architecture

```
lib/
├── analytics/    # Analytics data processing
├── auth/        # Authentication logic
├── redis/       # Redis client and rate limiting
├── settings/    # Application settings
├── story/       # Story generation engine
├── supabase/    # Database client and queries
├── utils/       # Utility functions
└── vcs/         # Version control integration
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
   App->>Supabase: Initiate Auth
   Supabase->>GitHub: OAuth Request
   GitHub->>User: Authorize
   User->>GitHub: Approve
   GitHub->>Supabase: Token
   Supabase->>App: Session
   ```

2. **Story Generation Flow**:

   ```mermaid
   sequenceDiagram
   participant User
   participant App
   participant GitHub
   participant StoryEngine

   User->>App: Select Repository
   App->>GitHub: Fetch Commits
   GitHub->>App: Commit History
   App->>StoryEngine: Process History
   StoryEngine->>App: Generated Story
   App->>User: Display Story
   ```

## Key Technologies

### Frontend

- **Next.js 14**: React framework with App Router
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: Component library
- **React Query**: Data fetching and caching

### Backend

- **Supabase**: PostgreSQL database and authentication
- **Redis**: Rate limiting and caching
- **GitHub API**: Repository data access

## State Management

1. **Server State**:

   - Database queries via Supabase
   - API responses cached with React Query

2. **Client State**:

   - React Context for theme and auth
   - Local state for UI interactions

3. **Persistent State**:
   - User preferences in localStorage
   - Session data in Supabase

## Security

1. **Authentication**:

   - Supabase Auth with GitHub OAuth
   - JWT token validation
   - Session management

2. **API Security**:

   - Rate limiting with Redis
   - API key validation
   - CORS configuration

3. **Data Protection**:
   - Input validation
   - SQL injection prevention
   - XSS protection

## Performance

1. **Optimizations**:

   - Server components for reduced JS
   - Image optimization
   - Code splitting
   - Edge caching

2. **Monitoring**:
   - Custom analytics
   - Error tracking
   - Performance metrics

## Development Workflow

1. **Code Organization**:

   - Feature-based directory structure
   - Clear naming conventions
   - Comprehensive documentation

2. **Quality Assurance**:

   - TypeScript for type safety
   - ESLint for code quality
   - Prettier for formatting
   - Husky for git hooks

3. **Deployment**:
   - Vercel for hosting
   - Automated deployments
   - Environment management
