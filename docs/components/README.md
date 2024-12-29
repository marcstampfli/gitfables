# Components

This section documents the components used in GitFables, their usage, and best practices.

## Component Categories

### UI Components (`src/components/ui/`)

Base UI components that form the foundation of our design system.

- [Button](./ui/button.md)
- [Card](./ui/card.md)
- [Dialog](./ui/dialog.md)
- [Input](./ui/input.md)
- [Select](./ui/select.md)
- [Toast](./ui/toast.md)
- [Animated](./ui/animated.md)

### Layout Components (`src/components/layout/`)

Components that define the overall structure of the application.

- [Header](./layout/header.md)
- [Footer](./layout/footer.md)
- [ThemeProvider](./layout/theme-provider.md)

### Section Components (`src/components/sections/`)

Major sections that make up the pages.

- [Hero](./sections/hero.md)
- [HowItWorks](./sections/how-it-works.md)
- [Examples](./sections/examples.md)
- [StatsSection](./sections/stats-section.md)

### Feature Components (`src/components/`)

Components that implement specific features.

- [StoryGenerator](./features/story-generator.md)
- [StoryViewer](./features/story-viewer.md)
- [RepositorySelector](./features/repository-selector.md)
- [ShareMenu](./features/share-menu.md)

## Component Guidelines

### 1. Component Structure

Each component should follow this structure:

```typescript
/**
 * @module components/example
 * @description Brief description of the component
 */

import { type Dependencies } from 'dependency'

interface ExampleProps {
  // Props with JSDoc comments
}

export function Example({ prop1, prop2 }: ExampleProps) {
  // Implementation
}
```

### 2. Props Interface

- Clear prop names
- TypeScript types
- JSDoc comments
- Default values where appropriate
- Required vs optional props

### 3. Styling

- Tailwind CSS classes
- CSS variables for theming
- Responsive design
- Dark mode support
- Animation considerations

### 4. Best Practices

1. **Server vs Client Components**

   - Use Server Components by default
   - Add 'use client' only when needed
   - Document client-side dependencies

2. **Performance**

   - Memoization when needed
   - Lazy loading for large components
   - Optimized re-renders
   - Bundle size consideration

3. **Accessibility**

   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

4. **Testing**
   - Unit tests
   - Integration tests
   - Visual regression tests
   - Accessibility tests

## Component Development

### Adding New Components

1. Create component file
2. Add TypeScript types
3. Implement component
4. Add documentation
5. Create tests
6. Update index exports

### Modifying Components

1. Document changes
2. Update types
3. Update tests
4. Update documentation
5. Consider backwards compatibility

## Component Examples

See individual component documentation for detailed examples and usage guidelines.
