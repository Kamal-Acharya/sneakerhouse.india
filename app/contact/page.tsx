// @ts-nocheck
"use client"

import type React from "react"
import Link from "next/link"
import { Orbitron } from "next/font/google"
import { useEffect, useState } from "react"

const orbitron = Orbitron({ subsets: ["latin-ext"], weight: ["400", "700", "900"] })

const sizes = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"]


export default function ContactPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/sneakers/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.sneakers))
  }, [])
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    size: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, phone, email, product, size } = formData

    // Basic validation
    if (!name || !phone || !product || !size) {
      alert("Please fill in all required fields before submitting.")
      return
    }

    // Create WhatsApp message
    const whatsappMessage = `Hello Sneaker House 👟%0A%0A` +
      `I'd like to inquire about a sneaker.%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*WhatsApp:* ${encodeURIComponent(phone)}%0A` +
      (email ? `*Email:* ${encodeURIComponent(email)}%0A` : "") +
      `*Product:* ${encodeURIComponent(product)}%0A` +
      `*Size:* ${encodeURIComponent(size)}%0A` 

    // Replace with your WhatsApp number (no + or spaces)
    const whatsappNumber = "8637358934"

    // Open WhatsApp chat
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")

    // Reset form
    setFormData({ name: "", phone: "", email: "", product: "", size: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
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

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-20">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-foreground">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions about a sneaker? Want to place an order or collaborate? Fill out the form below 👇
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-8">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="John Doe"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                WhatsApp Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            {/* Product */}
            <div className="space-y-2">
            <label
              htmlFor="product"
              className="block text-sm font-semibold text-foreground"
            >
              Sneaker Model / Product Name *
            </label>

            <select
              id="product"
              required
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a Product</option>

              {products.map((p: any) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

            {/* Size */}
            <div className="space-y-2">
            <label htmlFor="size" className="block text-sm font-semibold text-foreground">
              Size *
            </label>

            <select
              id="size"
              required
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select Size</option>

              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

            {/* Message */}
            {/* <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                Message *
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Is this sneaker available in UK 9?"
              />
            </div> */}

            <button
              type="submit"
              className="w-full px-8 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
            >
              Order On Whatsapp
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="font-bold text-foreground">Email</h3>
              <p className="text-muted-foreground">sneakerhouse1110@gmail.com</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <h3 className="font-bold text-foreground">Response Time</h3>
              <p className="text-muted-foreground">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </main>
  )
}