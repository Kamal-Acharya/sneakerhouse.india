// @ts-nocheck
"use client"

export default function WhatsappButton({ link }: { link: string }) {
  const handleSubmit = () => {
    const whatsappMessage =
      `Hello Sneaker House 👟%0A%0A` +
      `I'd like to order this sneaker:%0A ${window.location.origin}/${link}`

    const whatsappNumber = "8637358934"

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    )
  }

  return (
    <button
      onClick={handleSubmit}
      className="mt-6 inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
    >
      Order on Whatsapp
    </button>
  )
}