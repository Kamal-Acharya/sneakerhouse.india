# Architecture Overview

## Project Structure

### `app/` - Next.js Pages and Routes
- **`page.tsx`** - Homepage with category grid
- **`category/[slug]/page.tsx`** - Dynamic category pages
- **`layout.tsx`** - Root layout wrapper
- **`globals.css`** - Global styles and design tokens

### `components/` - Reusable Components
- **`ui/`** - shadcn/ui component library
- **`data-provider.tsx`** - Global data context

### `hooks/` - Custom React Hooks
- **`use-data.ts`** - Generic data loading hook
- **`use-toast.ts`** - Toast notifications (shadcn)
- **`use-mobile.tsx`** - Mobile detection (shadcn)

### `lib/` - Utility Functions
- **`utils.ts`** - Helper functions (cn, etc.)
- **`data-loader.ts`** - Centralized data fetching

### `public/` - Static Assets
- **`sneakers/`** - JSON data files
  - `categories.json` - Category definitions
  - `products.json` - Product inventory
- Images and other static files

## Data Flow

\`\`\`
┌─────────────────────────────────────────┐
│         JSON Data Files                 │
│  (categories.json, products.json)       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      data-loader.ts (Utilities)         │
│  - fetchData()                          │
│  - loadCategories()                     │
│  - loadSneakers()                       │
│  - Caching Logic (5-min TTL)            │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐  ┌──────────────┐
│  use-data.ts │  │ data-provider│
│  (Hook)      │  │  (Context)   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └──────┬──────────┘
              ▼
      ┌──────────────────┐
      │    Components    │
      │  - HomePage     │
      │  - CategoryPage │
      └──────────────────┘
\`\`\`

## Caching Strategy

### How It Works

1. **First Request** - Data fetched from JSON and stored in memory
2. **Subsequent Requests** (< 5 min) - Cached data returned immediately
3. **Cache Expiry** (> 5 min) - New fetch triggered automatically
4. **Error Handling** - Fallback data provided if fetch fails

### Cache Configuration

\`\`\`typescript
// Default: 5 minutes
const CACHE_DEFAULT_TTL = 5 * 60 * 1000

// Override per call:
await fetchData(url, { ttl: 10 * 60 * 1000 }) // 10 minutes
\`\`\`

## Component Patterns

### Using Data in Components

**Pattern 1: With useData Hook**
\`\`\`tsx
const { data, loading, error } = useData(() => loadCategories())
\`\`\`

**Pattern 2: With DataProvider Context**
\`\`\`tsx
const { categories, sneakers } = useAppData()
\`\`\`

**Pattern 3: Direct Function Call**
\`\`\`tsx
const categories = await loadCategories()
\`\`\`

## Performance Optimizations

1. **Code Splitting** - Route-based splitting via Next.js
2. **Image Optimization** - Next.js Image component with lazy loading
3. **Caching** - 5-minute TTL reduces redundant API calls
4. **Bundler** - Turbopack (Next.js 16 default) for fast builds

## Styling System

### Design Tokens (CSS Variables)

Located in `app/globals.css`:

\`\`\`css
--primary: oklch(0.4 0.18 34);       /* Orange accent */
--accent: oklch(0.42 0.22 35);       /* Bright accent */
--background: oklch(0.08 0 0);       /* Dark background */
--foreground: oklch(0.98 0 0);       /* Light text */
--border: oklch(0.2 0 0);            /* Border color */
--muted: oklch(0.25 0 0);            /* Muted text */
\`\`\`

### Tailwind Integration

Uses semantic classes:
\`\`\`tsx
<div className="bg-background text-foreground border border-border">
  Content
</div>
\`\`\`

## Extending the Project

### Adding a New Category

1. Update `public/sneakers/categories.json`
2. Add products with matching `brand` to `public/sneakers/products.json`
3. Categories and products link automatically

### Adding a New Page

1. Create file in `app/` directory
2. Follows Next.js App Router conventions
3. Use data-loader utilities for data fetching

### Adding a New Component

1. Create in `components/` directory
2. Keep components focused and reusable
3. Use design tokens for styling

## API Boundaries

### External APIs
- Currently none (data sourced locally from JSON)

### Internal APIs
- `data-loader.ts` exports: `fetchData`, `loadCategories`, `loadSneakers`
- `data-provider.tsx` exports: `DataProvider`, `useAppData`
- `use-data.ts` exports: `useData` hook

## Testing

Current setup supports:
- Component rendering (via shadcn/ui)
- Data loading with error scenarios
- Responsive design across devices

## Monitoring & Debugging

### Cache Statistics
\`\`\`typescript
import { getCacheStats } from "@/lib/data-loader"
console.log(getCacheStats())
\`\`\`

### Error Logging
- Automatic console.error in data-loader
- Error states available in component hooks

## Future Enhancements

- Database integration (Supabase/Neon)
- User authentication
- Shopping cart functionality
- Admin panel for inventory management
- Search and advanced filtering
- Image uploads and gallery
- Server-side caching (Redis)
