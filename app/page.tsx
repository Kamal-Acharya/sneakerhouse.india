"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface Category {
  name: string
  slug: string
  count: number
  featured?: string
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch("/sneakers/categories.json")
      const data = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error("Error loading categories:", error)
      // Set sample data for demo
      setCategories([
        { name: "Jordan", slug: "jordan", count: 0, image: "/sneakers/jordan/jordan-sneaker.jpg" },
        { name: "Nike SB", slug: "nike-sb", count: 0, image: "/nike-sb-sneaker.jpg" },
        { name: "Yeezy", slug: "yeezy", count: 0, image: "/yeezy-sneaker.jpg" },
        { name: "Supreme", slug: "supreme", count: 0, image: "/supreme-sneaker.jpg" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="font-black text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            SNEAKER HOUSE
          </h1>
          <p className="mt-2 text-muted-foreground text-base">Crafted for Collectors. Curated for Legends</p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading categories...</div>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  {/* Category Image */}
                  <div className="relative h-64 md:h-72 overflow-hidden bg-muted">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Category Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count} items</p>
                  </div>
                </Link>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No categories found. Check your categories.json file.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-card/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>Premium Sneaker Collection • Hosted on GitHub</p>
        </div>
      </footer>
    </main>
  )
}
