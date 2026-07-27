"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Venue", href: "/#venue" },
  { label: "Hotels", href: "/hotels" },
  { label: "Stream", href: "/stream" },
  { label: "Register", href: "/register" },
];

interface NavbarMobileMenuProps {
  className?: string;
}

export function NavbarMobileMenu({ className }: NavbarMobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {/* Hamburger / Close toggle button */}
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded p-2 text-brand-cream hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Vertical dropdown panel */}
      {open && (
        <div
          id="mobile-nav-panel"
          aria-label="Mobile navigation"
          className="bg-brand-navy px-4 pb-4 flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-brand-cream hover:text-brand-gold font-heading uppercase tracking-wide text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setOpen(false)}>
            <Button variant="primary" size="sm">Register Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
