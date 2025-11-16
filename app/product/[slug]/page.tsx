// app/product/[slug]/page.tsx
// @ts-nocheck

import Image from "next/image"
import Link from "next/link"
import productsData from "@/data/products.json"
import WhatsappButton from "@/components/WhatsappButton"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const handleSubmit = (link: string) => {
        e.preventDefault()
        // Create WhatsApp message
        const whatsappMessage = `Hello Sneaker House 👟%0A%0A` +
          `I'd like to inquire about a sneaker.%0A%0A` +
          `Product Link: ${encodeURIComponent(link)}%0A%0A`;
    
        // Replace with your WhatsApp number (no + or spaces)
        const whatsappNumber = "8637358934"
    
        // Open WhatsApp chat
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
      }
    const { slug } = await params  
    const sneaker = productsData.sneakers.find((s) => s.slug === slug)  
//   const sneaker = productsData.find(
//     (item) => item.slug === params.slug
//   )

  if (!sneaker) {
    return <div className="p-10 text-red-500 text-xl">Product not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/categories/" className="text-blue-500 underline mb-4 block">
        ← Back
      </Link>

      <div className="w-full rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6" id="sneaker-image">
        {/* Main Product Image */}
        <Image
          src={sneaker.image}
          alt={sneaker.name}
          width={500}
          height={500}
          className="rounded-lg"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{sneaker.name}</h1>

          <p className="text-lg text-gray-600 mb-2">Brand: {sneaker.brand}</p>

          <p className="text-2xl font-semibold mt-4">
            ₹{sneaker.price.toLocaleString()}
          </p>
          

          <WhatsappButton
          link={`product/${sneaker.slug}`}
          />
         {/* Extra Info Section */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">

            <p className="bg-green-100 text-green-800 px-3 py-2 rounded-lg">
            💳 <strong>Order Prepaid & Get 15% OFF</strong>
            </p>

            <p className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg">
            🚚 <strong>Cash on Delivery</strong> Available Across India
            </p>

            <p className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
            📦 <strong>Order with Safety Box</strong> (Guaranteed Sneaker Protection)
            </p>

            </div>

          {/* <button
            onClick={() =>
                handleSubmit(`${window.location.origin}/product/${sneaker.slug}`)
              }
            className="mt-6 inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
            Order on Whatsapp
            </button> */}
        </div>
      </div>
    </div>
  )
}
