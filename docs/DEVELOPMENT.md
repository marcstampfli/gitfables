# Development Guide

This guide will help you set up your local development environment and understand our development workflow.

## Prerequisites

- Node.js 18.17 or later
- Git
- npm or pnpm
- A code editor (we recommend VS Code)
- A GitHub account
- A Supabase account

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gitfables-app.git
cd gitfables-app
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
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

4. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `docs/*` - Documentation updates

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run typecheck` - Check TypeScript types

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces for props and data structures
- Use proper type imports
- Avoid `any` types

Example:

```typescript
interface User {
  id: string
  name: string
  email: string
}

function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>
}
```

### React Components

- Use functional components
- Prefer Server Components
- Use client components only when needed
- Follow naming conventions

Example:

```typescript
// Server Component (default)
export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

// Client Component (when needed)
'use client'

export function InteractiveButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click me</button>
}
```

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Use CSS variables for theming
- Maintain consistent spacing

Example:

```typescript
<div className="p-4 md:p-6 rounded-lg bg-background">
  <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
</div>
```

## Testing

### Unit Tests

Use Jest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### E2E Tests

Use Playwright for end-to-end testing:

```typescript
test('user can log in', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Login')
  // ... test steps
})
```

## Performance

### Guidelines

1. Use React Server Components
2. Optimize images with Next.js Image
3. Minimize client-side JavaScript
4. Use proper caching strategies
5. Implement loading states
6. Add error boundaries

### Monitoring

- Vercel Analytics
- Error tracking
- Performance metrics
- User behavior

## Deployment

### Preview Deployments

Every PR gets a preview deployment on Vercel:

1. Push changes to your branch
2. Create a pull request
3. Wait for checks to pass
4. Review preview deployment
5. Get PR approved
6. Merge to develop

### Production Deployment

Deployment to production:

1. Merge develop to main
2. Automatic deployment to Vercel
3. Run database migrations
4. Monitor for issues

## Troubleshooting

### Common Issues

1. Environment variables not set
2. Wrong Node.js version
3. Supabase connection issues
4. TypeScript errors
5. Build failures

### Debug Tools

- React Developer Tools
- Network tab
- Console logs
- Error boundaries
- TypeScript errors

## Best Practices

1. Write clean, readable code
2. Add proper documentation
3. Include tests for new features
4. Follow accessibility guidelines
5. Optimize performance
6. Handle errors gracefully
7. Use proper TypeScript types

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
