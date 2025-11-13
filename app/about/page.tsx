  // @ts-nocheck
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-xl text-accent hover:text-accent/80 transition-colors">
            HEAT
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm text-foreground hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-foreground hover:text-accent transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-foreground">About Senaker House</h1>
            <p className="text-xl text-muted-foreground">Your destination for premium sneakers and exclusive drops</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Senaker House was founded with a simple mission: to bring together the world's most coveted sneakers
                in one curated marketplace. We believe that sneakers are more than just footwear – they're a form of
                self-expression, culture, and passion.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="text-3xl font-bold text-foreground">What We Offer</h2>
              <ul className="text-lg text-muted-foreground space-y-3 leading-relaxed list-disc list-inside">
                <li>Premium sneakers from Jordan, Nike SB, Yeezy, and Supreme</li>
                <li>Easy-to-navigate category system</li>
                <li>Regular updates with new drops and releases</li>
                <li>Direct support and consultation</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're passionate about sneakers just like you. Whether you're a collector, reseller, or enthusiast, we're here to help you
                find your next heat.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-foreground">Ready to Explore?</h2>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
    </main>
  )
}