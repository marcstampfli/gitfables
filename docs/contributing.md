# Contributing to GitFables

Thank you for your interest in contributing to GitFables! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

1. Be respectful and inclusive
2. Use welcoming and inclusive language
3. Be collaborative
4. Accept constructive criticism
5. Focus on what is best for the community

## Getting Started

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/your-username/gitfables-app.git
cd gitfables-app
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/original-owner/gitfables-app.git
```

4. Create a new branch:

```bash
git checkout -b feature/amazing-feature
```

## Development Process

### 1. Setting Up

Follow the [Development Guide](./DEVELOPMENT.md) to set up your local environment.

### 2. Making Changes

1. Write clean, readable code
2. Follow the established patterns
3. Add/update tests as needed
4. Update documentation
5. Ensure all tests pass

### 3. Commit Guidelines

Follow conventional commits:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add/update tests
chore: maintenance tasks
```

Example:

```bash
git commit -m "feat: add repository insights dashboard"
```

## Pull Requests

### Creating a Pull Request

1. Update your branch:

```bash
git fetch upstream
git rebase upstream/main
```

2. Push your changes:

```bash
git push origin feature/amazing-feature
```

3. Create a pull request through GitHub

### PR Guidelines

Your PR should include:

1. Clear title and description
2. Link to related issue(s)
3. Screenshots (if UI changes)
4. List of changes
5. Testing instructions

Example PR description:

```markdown
## Description

Add repository insights dashboard with analytics charts

## Changes

- Add insights dashboard component
- Implement analytics charts
- Add data fetching hooks
- Update documentation

## Testing

1. Start dev server
2. Navigate to /dashboard/insights
3. Verify charts display correctly
4. Test responsive behavior

Fixes #123
```

## Code Style

### TypeScript

```typescript
// Use interfaces for object types
interface User {
  id: string
  name: string
  email: string
}

// Use type for unions/intersections
type Status = 'pending' | 'success' | 'error'

// Use proper imports
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
```

### React Components

```typescript
// Use functional components
export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

// Add prop types
interface FeatureCardProps {
  title: string
  description: string
  className?: string
}
```

### Testing

```typescript
import { render, screen } from '@testing-library/react'
import { FeatureCard } from './feature-card'

describe('FeatureCard', () => {
  it('renders correctly', () => {
    render(
      <FeatureCard
        title="Test Title"
        description="Test Description"
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

## Documentation

### Component Documentation

```typescript
/**
 * Feature card component for displaying product features
 * @param title - The feature title
 * @param description - The feature description
 * @param className - Optional CSS classes
 */
export function FeatureCard({
  title,
  description,
  className,
}: FeatureCardProps) {
  // Implementation
}
```

### README Updates

- Keep documentation up to date
- Add new features to the list
- Update setup instructions
- Include screenshots when helpful

## Review Process

1. Automated checks must pass:

   - TypeScript compilation
   - ESLint rules
   - Unit tests
   - Build process

2. Code review requirements:

   - One approval required
   - All comments addressed
   - CI checks passing

3. Review criteria:
   - Code quality
   - Test coverage
   - Documentation
   - Performance
   - Security

## Getting Help

- Join our [Discord community](https://discord.gg/gitfables)
- Open a [GitHub Discussion](https://github.com/yourusername/gitfables-app/discussions)
- Email us at support@gitfables.com

## Recognition

Contributors will be:

- Listed in [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- Mentioned in release notes
- Thanked in our Discord community

Thank you for contributing to GitFables! 🎉
