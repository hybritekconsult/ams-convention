/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images from the public directory
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
