import Link from "next/link";

export interface Coordinator {
  name: string;
  role?: string;
  contact?: string;
}

export interface FooterProps {
  coordinators: Coordinator[];
  slogan: string;
  quickLinks: { label: string; href: string }[];
  copyrightYear: number;
}

export function Footer({
  coordinators,
  slogan,
  quickLinks,
  copyrightYear,
}: FooterProps) {
  return (
    <footer className="bg-brand-navy text-brand-cream">
      {/* Slogan banner — full-width strip above main content */}
      <div className="bg-brand-burgundy py-4 px-4 text-center">
        <p className="text-brand-gold/90 italic text-sm">{slogan}</p>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 — Event Info */}
        <div>
          <p className="font-heading text-brand-gold text-lg uppercase tracking-wide mb-3">
            Destiny Limitations 2026
          </p>
          <p className="text-brand-cream/70 text-sm leading-relaxed">
            2026 Amsterdam Convention — Breaking Destiny Limitations. Ministered
            by Fr. Emmanuel Obimma (Ebube Muonso).
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="font-heading text-brand-gold uppercase text-sm tracking-widest mb-4">
            Quick Links
          </h3>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/80 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 3 — Coordinators */}
        <div>
          <h3 className="font-heading text-brand-gold uppercase text-sm tracking-widest mb-4">
            Coordinators
          </h3>
          <ul className="flex flex-col gap-3">
            {coordinators.map((c) => (
              <li key={c.name}>
                <p className="text-brand-gold font-semibold text-sm">{c.name}</p>
                {c.role && (
                  <p className="text-brand-cream/70 text-xs">{c.role}</p>
                )}
                {c.contact && (
                  <p className="text-brand-cream/60 text-xs">{c.contact}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-brand-cream/10 py-4 text-center">
        <p className="text-brand-cream/50 text-xs">
          © {copyrightYear} Destiny Limitations 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
