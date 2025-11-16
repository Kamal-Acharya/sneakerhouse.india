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
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-black text-4xl md:text-2xl tracking-tight text-foreground"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            SNEAKER HOUSE
          </Link>
        </div>
      </nav>
        <p className="font-black text-4xl md:text-4xl tracking-tight text-foreground mx-auto max-w-7xl px-4 md:py-2">
            Collections
          </p>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-2">
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