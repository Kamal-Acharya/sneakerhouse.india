# Contributing to Heat Collection

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Heat Collection project.

## Code of Conduct

Please be respectful and constructive in all interactions. We're committed to providing a welcoming and inclusive environment.

## Getting Started

1. **Fork the Repository**
   \`\`\`bash
   git clone https://github.com/yourusername/heat-collection.git
   cd heat-collection
   npm install
   \`\`\`

2. **Create a Feature Branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

3. **Make Your Changes**
   - Follow the existing code style
   - Keep components small and focused
   - Add comments for complex logic
   - Update documentation as needed

4. **Test Your Changes**
   \`\`\`bash
   npm run dev
   # Test at http://localhost:3000
   npm run build  # Ensure no build errors
   \`\`\`

5. **Commit and Push**
   \`\`\`bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   \`\`\`

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include before/after screenshots for UI changes

## Development Guidelines

### File Structure

- Place React components in `components/`
- Store utility functions in `lib/`
- Custom hooks go in `hooks/`
- Page routes in `app/`

### Naming Conventions

- **Components**: PascalCase (`CategoryCard.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Hooks**: `useXxx` convention (`useData.ts`)
- **Constants**: UPPER_SNAKE_CASE (`CACHE_TTL`)

### Component Best Practices

\`\`\`tsx
// ✅ Good
export function SneakerCard({ name, price }: SneakerCardProps) {
  return (
    <div className="rounded-lg border border-border">
      <h3>{name}</h3>
      <p>${price.toLocaleString()}</p>
    </div>
  )
}

// ❌ Avoid
export default function Component(props: any) {
  // Complex logic mixed with render
}
\`\`\`

### Styling Guidelines

- Use Tailwind utility classes
- Prefer semantic tokens (text-foreground, bg-background)
- Use design tokens from `app/globals.css`
- Avoid inline styles

### Performance Considerations

- Use `useCallback` for event handlers passed to child components
- Implement lazy loading for images
- Keep components lightweight
- Use the caching system for data

## Pull Request Process

1. Update documentation for new features
2. Add appropriate commit messages
3. Ensure all tests pass (`npm run lint`)
4. Wait for code review
5. Address feedback promptly

## Reporting Issues

When reporting bugs:

1. **Use a clear, descriptive title**
2. **Describe the exact steps to reproduce**
3. **Provide expected vs actual behavior**
4. **Include screenshots/recordings if applicable**
5. **Specify your environment** (OS, browser, Node version)

## Feature Requests

- Explain the use case and expected benefit
- Include examples or mockups if applicable
- Consider implementation complexity

## Questions?

- Check existing issues/discussions
- Review the README and documentation
- Open a discussion for clarification

Thank you for contributing! 🎉
