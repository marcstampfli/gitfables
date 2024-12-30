# Components

This section documents the components used in GitFables, their organization, and best practices.

## Component Organization

### UI Components (`src/components/ui/`)

Shadcn UI components and base UI elements:

```typescript
// Example Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
}

export function Button({
  variant = 'default',
  size = 'md',
  loading,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        loading && 'opacity-50 cursor-not-allowed'
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}
```

### Marketing Components (`src/components/marketing/`)

Components for marketing pages and sections:

```typescript
// Example PageHeader component
interface PageHeaderProps {
  title: string
  titleGradient?: string
  description: string
  size?: 'default' | 'large'
  children?: React.ReactNode
}

export function PageHeader({
  title,
  titleGradient,
  description,
  size = 'default',
  children
}: PageHeaderProps) {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
        {titleGradient ? (
          <>
            {title.replace(titleGradient, '')}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              {titleGradient}
            </span>
          </>
        ) : (
          title
        )}
      </h1>
      <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
        {description}
      </p>
      {children}
    </div>
  )
}
```

Other marketing components include:

- `CTASection`: Call-to-action sections with gradient backgrounds
- `FeaturesGrid`: Grid layout for feature showcases
- `ProcessSteps`: Step-by-step process visualization

### Layout Components (`src/components/layout/`)

Components for page structure and layout:

```typescript
// Example Header component
export function Header() {
  const { session } = useAuth()
  const { theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {session ? (
              <UserNav />
            ) : (
              <Button variant="outline" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
```

### Feature Components

#### Story Components (`src/components/story/`)

Components for story generation and display:

```typescript
// Example StoryGenerator component
'use client'

interface StoryGeneratorProps {
  repository: Repository
  onGenerate: (story: Story) => void
}

export function StoryGenerator({
  repository,
  onGenerate
}: StoryGeneratorProps) {
  const [settings, setSettings] = useState<StoryGenerationSettings>({
    style: 'technical',
    tone: 'professional',
    format: 'article'
  })

  const { mutate: generateStory, isLoading } = useGenerateStory({
    onSuccess: onGenerate
  })

  return (
    <div className="space-y-6">
      <StorySettings
        settings={settings}
        onChange={setSettings}
      />
      <Button
        onClick={() => generateStory({ repository, settings })}
        loading={isLoading}
      >
        Generate Story
      </Button>
    </div>
  )
}
```

#### Repository Components (`src/components/repositories/`)

Components for repository management:

```typescript
// Example RepositoryList component
interface RepositoryListProps {
  repositories: Repository[]
  onSelect: (repository: Repository) => void
}

export function RepositoryList({
  repositories,
  onSelect
}: RepositoryListProps) {
  return (
    <div className="grid gap-4">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          onClick={() => onSelect(repository)}
        />
      ))}
    </div>
  )
}
```

#### Settings Components (`src/components/settings/`)

Components for user settings and preferences:

```typescript
// Example AppearanceTab component
'use client'

interface AppearanceTabProps {
  settings: SettingsUpdate
}

export function AppearanceTab({
  settings: initialSettings
}: AppearanceTabProps) {
  const { settings, updateSettings } = useSettings(initialSettings)
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    settings?.theme ?? 'system'
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app
        </p>
      </div>
      <ThemeSelector
        value={themeMode}
        onChange={async (theme) => {
          setThemeMode(theme)
          await updateSettings({ theme })
        }}
      />
    </div>
  )
}
```

## Component Guidelines

### 1. Server vs Client Components

- Use Server Components by default
- Add 'use client' only when needed:
  - Interactivity (event handlers)
  - Browser APIs
  - Component state
  - Effects

### 2. Props and Types

```typescript
// Good
interface ComponentProps {
  /** Description of the prop */
  data: Data
  /** Optional configuration */
  config?: Config
  /** Callback when something happens */
  onEvent: (data: EventData) => void
}

// Bad
interface Props {
  d: any
  cfg?: object
  callback: Function
}
```

### 3. State Management

```typescript
// Good
function Component() {
  const [state, setState] = useState(initialState)
  const { data, isLoading } = useQuery(queryKey, queryFn)
  const { mutate, isError } = useMutation(mutationFn)

  // Handle loading and error states
  if (isLoading) return <Loading />
  if (isError) return <Error />

  return <div>{/* Component JSX */}</div>
}
```

### 4. Error Handling

```typescript
// Good
function Component() {
  const [error, setError] = useState<Error | null>(null)

  const handleAction = async () => {
    try {
      await performAction()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      // Log error
      console.error('Action failed:', err)
    }
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return <div>{/* Component JSX */}</div>
}
```

### 5. Performance

- Use React.memo for expensive renders
- Implement useMemo for expensive computations
- Use useCallback for function props
- Lazy load large components

```typescript
// Good
const MemoizedComponent = React.memo(Component)
const expensiveValue = useMemo(() => compute(deps), [deps])
const callback = useCallback(arg => handle(arg), [deps])
const LazyComponent = lazy(() => import('./Component'))
```

### 6. Accessibility

- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Ensure color contrast
- Test with screen readers

```typescript
// Good
function Component() {
  return (
    <button
      aria-label="Close dialog"
      onClick={onClose}
      className="text-foreground bg-background"
    >
      <span className="sr-only">Close</span>
      <XIcon className="h-4 w-4" />
    </button>
  )
}
```

## Testing

### Unit Tests

```typescript
// Example test
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const onAction = vi.fn()
    render(<Component onAction={onAction} />)

    await userEvent.click(screen.getByRole('button'))
    expect(onAction).toHaveBeenCalled()
  })
})
```

### Integration Tests

```typescript
// Example test
describe('FeatureFlow', () => {
  it('completes the flow successfully', async () => {
    render(<FeatureFlow />)

    // Step 1
    await userEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Step 1')).toBeInTheDocument()

    // Step 2
    await userEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Step 2')).toBeInTheDocument()

    // Completion
    await userEvent.click(screen.getByText('Finish'))
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})
```

## Documentation

Each component should have:

1. **JSDoc Comments**

   - Component description
   - Prop descriptions
   - Usage examples

2. **Storybook Stories**

   - Default state
   - Various prop combinations
   - Interactive examples
   - Documentation

3. **README**
   - Component purpose
   - Installation
   - Props API
   - Examples

## Best Practices

1. **Code Organization**

   - One component per file
   - Clear file naming
   - Logical grouping
   - Index exports

2. **Styling**

   - Use Tailwind CSS
   - Follow design system
   - Responsive design
   - Dark mode support

3. **Performance**

   - Optimize renders
   - Lazy loading
   - Code splitting
   - Bundle size

4. **Maintenance**
   - Regular updates
   - Dependency management
   - Version control
   - Documentation

### Component Design

1. **Props Interface**

   - Always define TypeScript interfaces for props
   - Use descriptive names and JSDoc comments
   - Make optional props explicit with `?`

2. **Composition**

   - Keep components focused and single-purpose
   - Use composition over inheritance
   - Extract reusable logic into hooks

3. **Styling**
   - Use Tailwind CSS for styling
   - Follow the design system
   - Use `cn()` utility for conditional classes

### Marketing Components

1. **Visual Hierarchy**

   - Use consistent spacing (padding, margins)
   - Follow gradient patterns
   - Maintain responsive behavior

2. **Accessibility**

   - Use semantic HTML elements
   - Include proper ARIA attributes
   - Ensure keyboard navigation

3. **Performance**
   - Optimize images and animations
   - Use proper loading strategies
   - Minimize layout shifts
