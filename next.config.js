/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output — required for Render Node.js deployment
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
