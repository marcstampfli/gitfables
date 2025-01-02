# GitFables Component Library

## Overview

GitFables uses a modular component architecture built with React and TypeScript. Our components are designed to be reusable, accessible, and maintainable.

## Component Categories

### 🎨 UI Components

Core UI building blocks used throughout the application.

#### Buttons

- `Button`: Primary action button
- `IconButton`: Button with icon
- `ButtonGroup`: Group of related buttons
- `LinkButton`: Button that acts as a link

```typescript
interface ButtonProps {
  variant: 'default' | 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
}
```

#### Forms

- `Input`: Text input field
- `Select`: Dropdown selection
- `Checkbox`: Checkbox input
- `RadioGroup`: Radio button group
- `Switch`: Toggle switch
- `Textarea`: Multi-line text input

```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number'
  label: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  onChange: (value: string) => void
}
```

#### Layout

- `Container`: Content container
- `Grid`: Grid layout system
- `Stack`: Vertical/horizontal stack
- `Divider`: Content separator
- `Card`: Content card container

```typescript
interface ContainerProps {
  maxWidth: 'sm' | 'md' | 'lg' | 'xl'
  padding?: boolean
  center?: boolean
  children: React.ReactNode
}
```

#### Navigation

- `Header`: Application header
- `Footer`: Application footer
- `Navbar`: Navigation bar
- `Sidebar`: Side navigation
- `Breadcrumbs`: Navigation breadcrumbs

#### Feedback

- `Alert`: Alert messages
- `Toast`: Toast notifications
- `Progress`: Progress indicators
- `Spinner`: Loading spinner
- `Skeleton`: Loading placeholder

```typescript
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  dismissible?: boolean
  onDismiss?: () => void
}
```

### 📱 Marketing Components

Components used on marketing and landing pages.

#### Hero

- `Hero`: Hero section
- `HeroTitle`: Hero title
- `HeroSubtitle`: Hero subtitle
- `HeroCTA`: Call-to-action

#### Features

- `FeatureGrid`: Feature grid layout
- `FeatureCard`: Feature card
- `FeatureIcon`: Feature icon
- `FeatureList`: Feature list

#### Pricing

- `PricingTable`: Pricing table
- `PricingCard`: Pricing plan card
- `PricingFeature`: Pricing feature item
- `PricingCTA`: Pricing call-to-action

#### Testimonials

- `TestimonialGrid`: Testimonial grid
- `TestimonialCard`: Testimonial card
- `TestimonialAvatar`: User avatar
- `TestimonialQuote`: Quote block

### 📊 Dashboard Components

Components for the application dashboard.

#### Navigation

- `DashboardLayout`: Dashboard layout wrapper
- `DashboardHeader`: Dashboard header
- `DashboardSidebar`: Dashboard sidebar
- `DashboardNav`: Dashboard navigation

#### Story Components

- `StoryEditor`: Story editing interface
- `StoryPreview`: Story preview
- `StoryList`: List of stories
- `StoryCard`: Story card

```typescript
interface StoryEditorProps {
  initialContent?: string
  onSave: (content: string) => void
  onPublish: () => void
  loading?: boolean
  error?: string
}
```

#### Repository Components

- `RepoList`: Repository list
- `RepoCard`: Repository card
- `RepoStats`: Repository statistics
- `RepoSettings`: Repository settings

#### Analytics Components

- `AnalyticsChart`: Analytics chart
- `AnalyticsMetric`: Metric display
- `AnalyticsTable`: Data table
- `AnalyticsFilter`: Data filter

### 🔧 Utility Components

Helper components for common functionality.

#### Authentication

- `AuthForm`: Authentication form
- `AuthProvider`: Auth context provider
- `ProtectedRoute`: Route protection
- `LoginButton`: Social login button

#### Data Display

- `Table`: Data table
- `List`: List component
- `Badge`: Status badge
- `Avatar`: User avatar
- `Icon`: Icon component

#### Modals

- `Modal`: Modal dialog
- `Drawer`: Side drawer
- `Popover`: Popover dialog
- `Dialog`: Confirmation dialog

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
```

## Component Usage

### Installation

```bash
# Install dependencies
npm install

# Install additional UI packages
npm install @radix-ui/react-icons lucide-react
```

### Basic Usage

```tsx
import { Button, Input, Alert } from '@/components/ui'

function LoginForm() {
  return (
    <form>
      <Input
        type="email"
        label="Email"
        required
        onChange={value => console.log(value)}
      />
      <Button variant="primary" size="lg">
        Log In
      </Button>
      <Alert type="error" title="Invalid credentials" />
    </form>
  )
}
```

### Theming

Components support light and dark themes through Tailwind CSS:

```tsx
<div className="dark:bg-gray-900">
  <Button className="dark:text-white">Dark Mode Button</Button>
</div>
```

## Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use TypeScript interfaces
   - Document props and usage
   - Include examples

2. **Accessibility**

   - Use semantic HTML
   - Include ARIA labels
   - Support keyboard navigation
   - Test with screen readers

3. **Performance**

   - Lazy load when possible
   - Memoize expensive operations
   - Optimize re-renders
   - Use proper keys in lists

4. **Testing**
   - Write unit tests
   - Include integration tests
   - Test edge cases
   - Test accessibility

## Contributing

1. Follow the component structure
2. Add proper documentation
3. Include TypeScript types
4. Add usage examples
5. Write tests

## Resources

- [Design System](../design/README.md)
- [Accessibility Guide](../guides/accessibility.md)
- [Testing Guide](../guides/testing.md)
- [Component Showcase](https://gitfables.com/components)
