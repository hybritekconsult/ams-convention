/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#7A0C1B", // Dominant background / primary action color
          crimson: "#B31B2C",  // Secondary buttons, accents, highlights
          gold: "#D29034",     // Badges, borders, emphasis elements
          cream: "#FBF3E8",    // Card containers / subtle backgrounds
          navy: "#10233D",     // Header background / deep contrast element
          red: "#C0121A",      // High-energy accents
        },
      },
      fontFamily: {
        // Uses CSS vars injected by next/font/google; falls back to the named
        // fonts so Tailwind utility classes like `font-heading` / `font-body`
        // work correctly both in Next.js and in plain CSS usage.
        heading: ["var(--font-oswald)", "Oswald", "Montserrat", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
