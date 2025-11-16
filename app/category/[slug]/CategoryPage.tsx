// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, X } from "lucide-react"

interface Sneaker {
  id: string
  name: string
  brand: string
  year: number
  image: string
  price?: number
  rarity: "common" | "rare" | "ultra-rare"
}

interface Category {
  name: string
  slug: string
  description?: string
  sneakers?: Sneaker[]
}

export default function CategoryPage({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null)
  const [sneakers, setSneakers] = useState<Sneaker[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRarity, setFilterRarity] = useState<string>("all")
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null) // 👈 New state for fullscreen view

  useEffect(() => {
    loadCategoryData()
  }, [slug])

  const loadCategoryData = async () => {
    try {
      const response = await fetch("/sneakers/categories.json")
      const data = await response.json()

      const foundCategory = data.categories.find((cat: Category) => cat.slug === slug)
      setCategory(foundCategory || null)

      const sneakersResponse = await fetch("/sneakers/products.json")
      const sneakersData = await sneakersResponse.json()

      const categorySneakers = sneakersData.sneakers.filter(
        (sneaker: Sneaker) => sneaker.brand.toLowerCase() === slug.toLowerCase(),
      )

      setSneakers(categorySneakers)
    } catch (error) {
      console.error("Error loading category data:", error)
      setCategory({
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug,
        description: "Premium collection of limited edition sneakers",
      })

      setSneakers([
        {
          id: "1",
          name: "Air Jordan 1 Retro High OG",
          brand: slug.charAt(0).toUpperCase() + slug.slice(1),
          year: 2023,
          image: "/stylish-sneaker.png",
          price: 1200,
          rarity: "ultra-rare",
          slug: "air-jordan-1-retro-high-og"
        },
        {
          id: "2",
          name: "Classic Silhouette",
          brand: slug.charAt(0).toUpperCase() + slug.slice(1),
          year: 2022,
          image: "/stylish-sneaker.png",
          price: 850,
          rarity: "rare",
          slug: "classic-silhouette"
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredSneakers =
    filterRarity === "all" ? sneakers : sneakers.filter((s) => s.rarity === filterRarity)

  const rarityColors = {
    common: "bg-muted text-muted-foreground",
    rare: "bg-accent/20 text-accent",
    "ultra-rare": "bg-primary/20 text-primary",
  }

  return (
    <main className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 z-10 relative">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Collections
          </Link>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight text-foreground">
            {category?.name?.toUpperCase()}
          </h1>
          {category?.description && (
            <p className="mt-2 text-muted-foreground text-base">{category.description}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading sneakers...</div>
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="mb-8 flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-foreground">Filter by rarity:</span>
              <div className="flex flex-wrap gap-2">
                {["all", "common", "rare", "ultra-rare"].map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setFilterRarity(rarity)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      filterRarity === rarity
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                        : "bg-card border border-border text-foreground hover:border-accent"
                    }`}
                  >
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sneakers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSneakers.map((sneaker) => (
                <Link
                key={sneaker.id}
                href={`/product/${sneaker.slug}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 block"
              >
                  <div className="relative h-64 md:h-72 overflow-hidden bg-muted">
                    <Image
                      src={sneaker.image || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${rarityColors[sneaker.rarity]}`}
                    >
                      {sneaker.rarity.replace("-", " ").toUpperCase()}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-medium text-accent uppercase tracking-wide">
                      {sneaker.brand} • {sneaker.year}
                    </p>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors mt-1">
                      {sneaker.name}
                    </h3>
                    {sneaker.price && (
                      <p className="text-sm text-muted-foreground mt-2">
                        ₹{sneaker.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              Showing {filteredSneakers.length} of {sneakers.length} sneakers
            </div>
          </>
        )}
      </div>

      {/* ✅ Fullscreen Sneaker View */}
      {/* {selectedSneaker && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedSneaker(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-3xl h-[80vh] flex items-center justify-center">
            <Image
              src={selectedSneaker.image}
              alt={selectedSneaker.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )} */}

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-card/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>Premium Sneaker Collection • {category?.name} Category</p>
        </div>
      </footer>
    </main>
  )
}
