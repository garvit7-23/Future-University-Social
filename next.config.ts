import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.pravatar.cc',
      'via.placeholder.com',
      'res.cloudinary.com',
      'yourdomain.com', // replace with any custom domain you're using for images
    ],
  },
}

export default nextConfig
