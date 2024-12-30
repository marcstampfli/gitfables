# Contributing to GitFables

Thank you for your interest in contributing to GitFables! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the Repository**

   - Fork the repository on GitHub
   - Clone your fork locally
   - Add the upstream repository as a remote

2. **Set Up Development Environment**

   ```bash
   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env.local

   # Start development server
   npm run dev
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use ESLint and Prettier for formatting
- Run `npm run lint` before committing

### Component Guidelines

1. **Server vs Client Components**

   - Use Server Components by default
   - Only use Client Components when necessary (e.g., for interactivity)
   - Add 'use client' directive at the top of client components

2. **Component Structure**

   ```typescript
   // server component example
   export default async function FeatureComponent() {
     // Fetch data
     const data = await getData()

     return <ClientComponent data={data} />
   }

   // client component example
   'use client'

   interface Props {
     data: Data
   }

   export function ClientComponent({ data }: Props) {
     const [state, setState] = useState(data)

     return (
       // JSX
     )
   }
   ```

3. **Props and Types**
   - Define explicit interfaces for props
   - Use TypeScript utility types where appropriate
   - Export shared types from `types/` directory

### State Management

1. **Server State**

   - Use Server Components for data fetching
   - Implement Server Actions for mutations
   - Handle loading and error states

2. **Client State**
   - Use React hooks for local state
   - Minimize client-side state
   - Handle form state with react-hook-form

### Testing

1. **Unit Tests**

   ```bash
   # Run tests
   npm run test

   # Run tests in watch mode
   npm run test:watch
   ```

2. **Integration Tests**

   ```bash
   # Run Playwright tests
   npm run test:e2e
   ```

3. **Test Guidelines**
   - Write tests for new features
   - Update tests when modifying existing features
   - Aim for good coverage but focus on critical paths

### Documentation

1. **Code Documentation**

   - Add JSDoc comments for functions and components
   - Document complex logic and algorithms
   - Keep comments up to date

2. **Feature Documentation**
   - Add new features to `docs/features/`
   - Update existing documentation when needed
   - Include code examples and usage patterns

## Pull Request Process

1. **Before Submitting**

   - Ensure all tests pass
   - Update documentation if needed
   - Add tests for new features
   - Run linting and type checking

2. **PR Guidelines**

   - Create a descriptive PR title
   - Fill out the PR template
   - Link related issues
   - Add screenshots for UI changes

3. **Review Process**
   - Address review comments
   - Keep commits clean and organized
   - Squash commits before merging

## Working with VCS Providers

### Adding a New Provider

1. **Implementation**

   ```typescript
   // lib/vcs/providers/new-provider.ts
   import { VCSProvider } from '../types'

   export class NewProvider implements VCSProvider {
     async connect(): Promise<void> {
       // Implementation
     }

     async getRepositories(): Promise<Repository[]> {
       // Implementation
     }

     // ... other methods
   }
   ```

2. **Provider Registration**

   ```typescript
   // lib/vcs/provider-registry.ts
   import { NewProvider } from './providers/new-provider'

   export const providers = {
     github: new GitHubProvider(),
     gitlab: new GitLabProvider(),
     'new-provider': new NewProvider(),
   }
   ```

3. **Configuration**
   - Add provider configuration to `.env.example`
   - Update provider selection UI
   - Add provider documentation

### OAuth Integration

1. **Configuration**

   ```typescript
   // lib/vcs/oauth-config.ts
   export const oauthConfig = {
     'new-provider': {
       clientId: process.env.NEW_PROVIDER_CLIENT_ID,
       clientSecret: process.env.NEW_PROVIDER_CLIENT_SECRET,
       scopes: ['read:user', 'read:repo'],
     },
   }
   ```

2. **Authentication Flow**
   - Implement OAuth callback handler
   - Add token refresh logic
   - Handle error cases

## Deployment

1. **Environment Setup**

   - Configure production environment variables
   - Set up monitoring and logging
   - Configure error tracking

2. **Deployment Process**

   ```bash
   # Build application
   npm run build

   # Run type checking
   npm run type-check

   # Run tests
   npm run test
   ```

3. **Post-Deployment**
   - Monitor error rates
   - Check performance metrics
   - Verify feature flags

## Need Help?

- Check existing issues and discussions
- Join our Discord community
- Read the [FAQ](./FAQ.md)
- Contact the maintainers

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). We expect all contributors to adhere to it.

## License

By contributing to GitFables, you agree that your contributions will be licensed under the project's MIT license.
