import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Load Oswald for headings — display: swap prevents layout shift
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"],
});

// Load Inter for body text — display: swap prevents layout shift
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "2026 Amsterdam Convention — Breaking Destiny Limitations",
  description:
    "Join us for the 2026 Amsterdam Convention: 'Breaking Destiny Limitations', ministered by Fr. Emmanuel Obimma (Ebube Muonso). Register today.",
  icons: {
    icon: "/flyer1.jpg",
    apple: "/flyer1.jpg",
  },
};

const footerCoordinators = [
  { name: "Ugochukwu Ndukaihe", role: "Event Coordinator" },
  { name: "Augustine Amadike", role: "Event Coordinator" },
];

const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Venue", href: "/#venue" },
  { label: "Hotels", href: "/hotels" },
  { label: "Stream", href: "/stream" },
  { label: "Register", href: "/register" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      {/*
       * font-body is applied here so every page inherits the Inter body font.
       * Individual heading elements use font-heading via global CSS (app/globals.css).
       */}
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer
          coordinators={footerCoordinators}
          slogan="…If there's someone to pray, there is a God to answer…"
          quickLinks={footerQuickLinks}
          copyrightYear={2026}
        />
      </body>
    </html>
  );
}
