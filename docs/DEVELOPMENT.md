# GitFables Development Guide

This document provides guidelines and best practices for developing GitFables.

## Code Style & Type Safety

- Use TypeScript for all code with strict type checking
- Follow established patterns in the codebase
- Use ESLint and Prettier for code formatting
- Write comprehensive JSDoc comments
- Ensure end-to-end type safety with Supabase generated types

## Component Architecture

### Server Components (Default)

- Use React Server Components by default
- Keep data fetching close to where it's used
- Implement proper error boundaries
- Use TypeScript for props and return types

### Client Components

- Only use when necessary (interactivity, hooks)
- Add 'use client' directive at the top
- Wrap components using useSearchParams in Suspense
- Keep client-side state minimal

### Error Handling

- Implement error boundaries for client components
- Use try/catch with proper error logging
- Display user-friendly error messages
- Type errors properly with custom error types

### Loading States

- Add loading skeletons for async operations
- Use Suspense boundaries effectively
- Implement optimistic updates where appropriate
- Show proper loading indicators for actions

## Database & Auth

### Supabase

- Use generated types for database operations
- Implement proper error handling for queries
- Follow established patterns for auth flows
- Keep database operations in service layer

### Type Safety

- Use Database type from generated types
- Type all database queries and mutations
- Ensure proper null checking
- Use discriminated unions for complex states

## Testing

- Write unit tests for utility functions
- Test components with React Testing Library
- Add integration tests for critical flows
- Test error states and edge cases

## Git Workflow

1. Create feature branches from main
2. Follow conventional commits:
   - feat: New features
   - fix: Bug fixes
   - refactor: Code improvements
   - docs: Documentation updates
   - chore: Maintenance tasks
3. Keep commits focused and descriptive
4. Submit detailed pull requests

## Documentation

- Update docs when adding/changing features
- Keep README in sync with codebase
- Document breaking changes
- Add JSDoc comments for public APIs
- Keep type definitions up to date

## Performance

- Use React Server Components where possible
- Implement proper Suspense boundaries
- Optimize images and assets
- Monitor bundle size
- Use proper caching strategies

## Security

- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication checks
- Validate all user input
- Follow security best practices
- Keep dependencies updated

## Deployment

1. Development

   - Test changes locally
   - Ensure all types check
   - Fix all linter warnings
   - Check for console errors

2. Staging

   - Deploy to preview environment
   - Test all affected features
   - Verify environment variables

3. Production
   - Deploy to production
   - Monitor error reporting
   - Check analytics
   - Verify critical flows

For more detailed documentation, see the [docs](./docs) directory.
