# Contributing to GitFables

We love your input! We want to make contributing to GitFables as easy and transparent as possible.

## Development Process

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure the test suite passes
4. Submit a pull request

## Pull Request Process

1. Update documentation
2. Update the README.md if needed
3. Update the CHANGELOG.md
4. The PR template will guide you through the rest

## Code Style

We use ESLint and Prettier to maintain code quality. Our style guide is enforced through these tools.

### TypeScript

```typescript
// ✅ Do: Use proper typing
interface User {
  id: string
  name: string
  email: string
}

// ❌ Don't: Use any
const user: any = { ... }
```

### React Components

```typescript
// ✅ Do: Use functional components with proper typing
interface ButtonProps {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>
}

// ❌ Don't: Use class components
class Button extends React.Component { ... }
```

### File Organization

```
components/
├── feature/
│   ├── component.tsx
│   ├── component.test.tsx
│   └── index.ts
```

## Testing

### Unit Tests

```typescript
describe('StoryGenerator', () => {
  it('should generate a story with correct format', async () => {
    const story = await generateStory({
      repository: 'test/repo',
      style: 'technical',
    })

    expect(story).toHaveProperty('content')
    expect(story).toHaveProperty('metadata')
  })
})
```

### Integration Tests

```typescript
describe('API Integration', () => {
  it('should connect to GitHub successfully', async () => {
    const connection = await connectToGitHub({
      token: 'test-token',
    })

    expect(connection.status).toBe('connected')
  })
})
```

## Documentation

### JSDoc Comments

```typescript
/**
 * Generates a story from repository commit history
 * @param {StorySettings} settings - Story generation settings
 * @returns {Promise<Story>} Generated story
 * @throws {ValidationError} If settings are invalid
 */
async function generateStory(settings: StorySettings): Promise<Story> {
  // Implementation
}
```

### Markdown Files

- Keep documentation up to date
- Use clear headings
- Include code examples
- Add screenshots when helpful

## Git Commit Messages

Format: `<type>(<scope>): <subject>`

Examples:

```
feat(story): add new story generation style
fix(auth): resolve token refresh issue
docs(api): update API documentation
test(components): add tests for Button component
```

## Branch Naming

Format: `<type>/<description>`

Examples:

```
feature/story-styles
bugfix/auth-token
docs/api-reference
```

## Development Setup

1. **Prerequisites**:

   ```bash
   node -v  # Should be >= 18
   npm -v   # Should be >= 8
   ```

2. **Installation**:

   ```bash
   git clone https://github.com/yourusername/gitfables.git
   cd gitfables
   npm install
   ```

3. **Environment**:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Development**:
   ```bash
   npm run dev     # Start development server
   npm run test    # Run tests
   npm run lint    # Run linter
   ```

## Issue Reporting

### Bug Reports

Include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

### Feature Requests

Include:

- Clear description
- Use cases
- Expected behavior
- Optional: Implementation suggestions

## Code Review Process

1. **Automated Checks**:

   - TypeScript compilation
   - ESLint rules
   - Test coverage
   - Build success

2. **Manual Review**:
   - Code quality
   - Performance impact
   - Security implications
   - Documentation updates

## Community

- Be welcoming and inclusive
- Follow our Code of Conduct
- Help others learn and grow
- Share knowledge and experience

## Questions?

- Open a Discussion
- Join our Discord
- Check the FAQ
- Email the maintainers
