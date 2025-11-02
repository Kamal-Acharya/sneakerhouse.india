/**
 * Centralized data loading utilities for the sneaker collection
 * Handles caching and error handling for JSON data sources
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry<any>>()
const CACHE_DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Get cached data if still valid, otherwise clear it
 */
function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key)

  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }

  return entry.data as T
}

/**
 * Store data in cache with TTL
 */
function setCachedData<T>(key: string, data: T, ttl = CACHE_DEFAULT_TTL): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

/**
 * Fetch JSON data from a source with caching and error handling
 */
export async function fetchData<T>(
  url: string,
  options?: {
    cache?: boolean
    ttl?: number
    fallbackData?: T
  },
): Promise<T> {
  const { cache: useCache = true, ttl = CACHE_DEFAULT_TTL, fallbackData } = options || {}

  // Check cache first
  if (useCache) {
    const cached = getCachedData<T>(url)
    if (cached) return cached
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = (await response.json()) as T

    // Store in cache
    if (useCache) {
      setCachedData(url, data, ttl)
    }

    return data
  } catch (error) {
    console.error(`Error loading data from ${url}:`, error)

    if (fallbackData !== undefined) {
      return fallbackData
    }

    throw error
  }
}

/**
 * Load all categories
 */
export async function loadCategories() {
  interface CategoriesData {
    categories: Array<{
      name: string
      slug: string
      count: number
      featured?: string
    }>
  }

  return fetchData<CategoriesData>("/sneakers/categories.json", {
    cache: true,
    fallbackData: {
      categories: [
        { name: "Jordan", slug: "jordan", count: 0, featured: "/placeholder.svg" },
        { name: "Nike SB", slug: "nike-sb", count: 0, featured: "/placeholder.svg" },
        { name: "Yeezy", slug: "yeezy", count: 0, featured: "/placeholder.svg" },
        { name: "Supreme", slug: "supreme", count: 0, featured: "/placeholder.svg" },
      ],
    },
  })
}

/**
 * Load all sneakers
 */
export async function loadSneakers() {
  interface SneakersData {
    sneakers: Array<{
      id: string
      name: string
      brand: string
      year: number
      image: string
      price?: number
      rarity: "common" | "rare" | "ultra-rare"
    }>
  }

  return fetchData<SneakersData>("/sneakers/products.json", {
    cache: true,
    fallbackData: {
      sneakers: [],
    },
  })
}

/**
 * Get sneakers filtered by category
 */
export async function getSneakersByCategory(categorySlug: string) {
  const data = await loadSneakers()
  return data.sneakers.filter((sneaker) => sneaker.brand.toLowerCase() === categorySlug.toLowerCase())
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const data = await loadCategories()
  return data.categories.find((cat) => cat.slug === slug) || null
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.entries()).map(([key, entry]) => ({
      key,
      dataSize: JSON.stringify(entry.data).length,
      age: Date.now() - entry.timestamp,
      ttl: entry.ttl,
    })),
  }
}
