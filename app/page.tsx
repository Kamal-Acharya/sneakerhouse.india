  // @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Orbitron } from 'next/font/google'
const orbitron = Orbitron({ subsets: ['latin-ext'], weight: ['400', '700', '900'] })

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
        <div className="mx-auto max-w-7xl px-4 py-2 text-left">
          <h1 className="font-black text-4xl md:text-2xl tracking-tight text-foreground text-balance" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            SNEAKER HOUSE
          </h1>
          <p className="mt-2 text-muted-foreground text-base">Crafted for Collectors. Curated for Legends</p>
        </div>
      </header>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[600px] md:min-h-[750px] overflow-hidden bg-black">
      {/* Video Background */}
        <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/sneakers/sneaker.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-40 flex flex-col justify-center h-full min-h-[600px] md:min-h-[750px]">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-accent/15 backdrop-blur px-4 py-2 rounded-full border border-accent/30">
                <p className="text-xs font-bold text-accent tracking-widest">PREMIUM SNEAKER COLLECTION</p>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white text-balance leading-tight">
                Drop Your
                <br />
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Heat</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-xl leading-relaxed">
                Discover the most sought-after sneakers from iconic brands. Jordan, Nike SB, Yeezy, and Supreme – all
                curated for collectors.
              </p>
            </div>           
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/50 text-lg"
              >
                Explore Collection
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Crousel of Brands logo*/}
      {/* Brand Logos Marquee Section */}
<section className="relative py-12 bg-card border-y border-border overflow-hidden  ">
  <div className="mx-auto max-w-7xl px-0">
    <h2 className="text-center text-muted-foreground text-sm font-bold tracking-widest mb-8">
      FEATURED BRANDS
    </h2>

    <div className="relative w-full overflow-hidden">
      {/* Animated track */}
      <div className="flex animate-marquee space-x-16 invert">
        {/* Repeat logos */}
        {[
          "/brands/nike.png",
          "/brands/addidas.png",
          "/brands/air.png",
          "/brands/onitsuka.png",
          "/brands/puma.png",
          "/brands/newbalance.png"
        ].map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-40 h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img src={logo} alt={`Brand ${i}`} className="w-auto h-12 object-contain" />
          </div>
        ))}

        {/* Duplicate for seamless loop */}
        {[
          "/brands/nike.png",
          "/brands/air.png",          
          "/brands/addidas.png",
          "/brands/onitsuka.png",
          "/brands/puma.png",
          "/brands/newbalance.png"
        ].map((logo, i) => (
          <div key={`dup-${i}`} className="flex-shrink-0 w-40 h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <img src={logo} alt={`Brand ${i}`} className="w-auto h-12 object-contain" />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading categories...</div>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="categories">
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
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">SNEAKER HOUSE</h3>
              <p className="text-sm text-muted-foreground">Premium sneakers for collectors worldwide</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-accent transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://www.instagram.com/sneakerhouse.india/" className="hover:text-accent transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/8637358934" className="hover:text-accent transition-colors">
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>Premium Sneaker Collection • Hosted on GitHub • 2024</p>
          </div> */}
        </div>
      </footer>
    </main>
  )
}
