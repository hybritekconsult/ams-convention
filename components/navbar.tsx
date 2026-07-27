import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavbarMobileMenu } from "@/components/navbar-mobile-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Venue", href: "/#venue" },
  { label: "Hotels", href: "/hotels" },
  { label: "Stream", href: "/stream" },
  { label: "Register", href: "/register" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Tricolor accent stripe — Red / White / Blue */}
      <div className="flex" aria-hidden="true">
        <div className="flex-1 h-1.5 bg-red-600" />
        <div className="flex-1 h-1.5 bg-white" />
        <div className="flex-1 h-1.5 bg-blue-700" />
      </div>

      {/* Main navigation bar */}
      <div
        className="bg-brand-navy px-4 md:px-8 py-3 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Left: Event title */}
        <span className="font-heading text-brand-gold text-lg uppercase tracking-wide">
          DESTINY LIMITATIONS 2026
        </span>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-cream hover:text-brand-gold transition-colors text-sm font-heading uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: CTA button (desktop) + Mobile menu toggle */}
        <div className="flex items-center">
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/register">
              <Button variant="primary" size="sm">Register Now</Button>
            </Link>
          </div>

          {/* Mobile hamburger — client component */}
          <NavbarMobileMenu className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
