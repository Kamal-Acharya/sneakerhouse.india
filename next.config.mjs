/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/sneaker-house',  // <-- Replace with your repo name
  // assetPrefix: '/sneaker-house/',  // <-- Replace with your repo name
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
