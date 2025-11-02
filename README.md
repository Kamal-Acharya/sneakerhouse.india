# Heat Collection - Premium Sneaker Showcase

A modern, high-performance sneaker collection showcase built with Next.js 16, React 19, and Tailwind CSS v4. Features dynamic category pages, intelligent data caching, and a premium dark-theme aesthetic.

## Features

- **Responsive Design** - Mobile-first design that works seamlessly on all devices
- **Dynamic Category System** - Browse sneakers organized by brand/category
- **Intelligent Caching** - Automatic 5-minute cache with fallback data for reliability
- **Rarity Filtering** - Filter sneakers by common, rare, and ultra-rare status
- **Performance Optimized** - Built on Next.js 16 with Turbopack bundler
- **Dark Theme** - Premium dark aesthetic with accent colors and hover effects
- **Semantic HTML** - Accessibility-first approach with proper ARIA attributes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Data**: JSON-based with client-side fetching

## Project Structure

\`\`\`
heat-collection/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Homepage with category showcase
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic category pages
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── data-provider.tsx   # Global data context provider
├── hooks/
│   └── use-data.ts         # Custom data loading hook
├── lib/
│   ├── utils.ts            # Utility functions
│   └── data-loader.ts      # Centralized data loading logic
├── public/
│   └── sneakers/
│       ├── categories.json # Category definitions
│       └── products.json   # Sneaker product data
└── scripts/                # Utility scripts (optional)
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

#### Option 1: Using shadcn CLI (Recommended)

\`\`\`bash
npx shadcn-cli@latest init -d heat-collection
cd heat-collection
npm install
\`\`\`

#### Option 2: Manual Installation

\`\`\`bash
git clone https://github.com/yourusername/heat-collection.git
cd heat-collection
npm install
npm run dev
\`\`\`

### Running the Project

**Development Mode:**
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) to view the application.

**Production Build:**
\`\`\`bash
npm run build
npm run start
\`\`\`

**Linting:**
\`\`\`bash
npm run lint
\`\`\`

## Configuration

### Data Sources

Edit the following JSON files to customize your collection:

- **`public/sneakers/categories.json`** - Define sneaker categories/brands
- **`public/sneakers/products.json`** - Add your sneaker inventory

### Design Tokens

Customize colors and spacing in `app/globals.css`. All design tokens use CSS custom properties:

\`\`\`css
--primary: oklch(0.4 0.18 34);
--accent: oklch(0.42 0.22 35);
--background: oklch(0.08 0 0);
--foreground: oklch(0.98 0 0);
\`\`\`

## API Reference

### Data Loader (`lib/data-loader.ts`)

\`\`\`typescript
// Fetch with automatic caching and error handling
await fetchData<T>(url, { cache: true, ttl: 300000 })

// Load all categories
const { categories } = await loadCategories()

// Load all sneakers
const { sneakers } = await loadSneakers()

// Get sneakers by category
const sneakers = await getSneakersByCategory("jordan")

// Clear cache manually
clearCache()
\`\`\`

### useData Hook (`hooks/use-data.ts`)

\`\`\`typescript
const { data, loading, error, refetch } = useData(fetchFn, [dependencies])
\`\`\`

### Data Provider (`components/data-provider.tsx`)

Wrap your app with `DataProvider` to enable global data access:

\`\`\`tsx
import { DataProvider } from "@/components/data-provider"

export default function RootLayout({ children }) {
  return <DataProvider>{children}</DataProvider>
}
\`\`\`

Then use the hook in components:
\`\`\`tsx
const { categories, sneakers } = useAppData()
\`\`\`

## Caching Strategy

The application implements a 5-minute TTL (Time To Live) caching system:

1. **First Load** - Data fetched from JSON files
2. **Cache Hit** - Subsequent requests use cached data within TTL
3. **Cache Expiry** - After 5 minutes, fresh data is fetched
4. **Fallback** - If fetch fails, fallback data is provided

View cache statistics:
\`\`\`typescript
import { getCacheStats } from "@/lib/data-loader"
console.log(getCacheStats())
\`\`\`

## Customization

### Adding New Categories

1. Edit `public/sneakers/categories.json`:
\`\`\`json
{
  "categories": [
    {
      "name": "Air Max",
      "slug": "air-max",
      "count": 12,
      "featured": "/images/air-max.jpg"
    }
  ]
}
\`\`\`

2. Add products to `public/sneakers/products.json` with matching `brand` field

### Styling

- **Colors** - Modify CSS variables in `app/globals.css`
- **Spacing** - Use Tailwind's spacing scale (p-4, gap-6, etc.)
- **Typography** - Adjust font sizes in `font-*` classes

## Performance

- **Turbopack**: Next.js 16's default fast bundler
- **Image Optimization**: Automatic format conversion and lazy loading
- **Caching**: Intelligent 5-minute TTL reduces API calls
- **Code Splitting**: Route-based code splitting for faster page loads

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Deploy automatically on every push

### Deploy to Other Platforms

The project works with any Node.js hosting:

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please use [GitHub Issues](https://github.com/yourusername/heat-collection/issues).

## Changelog

### v1.0.0 (Initial Release)
- Homepage with category showcase
- Dynamic category pages with filtering
- Intelligent data caching system
- Premium dark theme design
- Full responsive design

---

Built with ❤️ using Next.js 16 and Tailwind CSS v4
