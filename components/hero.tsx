import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  title: string;
  theme: string;
  scripture: string;
  speaker: string;
}

/**
 * Hero banner — recreated from flyer design using pure CSS.
 * Diagonal clip-path, tricolor accent, bold brand typography.
 * No image reuse — stands as its own designed banner.
 */
export function Hero({ title, theme, scripture, speaker }: HeroProps) {
  return (
    <section
      className="relative bg-brand-burgundy clip-hero min-h-[92vh] flex items-center pb-32 overflow-hidden"
      aria-label="Event hero banner"
    >
      {/* Background decorative layers — mimic flyer diagonal geometry */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Large diagonal gold stripe — top right */}
        <div
          className="absolute -top-20 -right-20 w-[55%] h-[120%] bg-brand-gold/10"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        {/* Crimson accent band */}
        <div
          className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson opacity-60"
        />
        {/* Cross / emblem watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-brand-gold/5 font-heading text-[22rem] font-bold leading-none select-none">
          ✝
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-12">
        {/* Top label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-brand-gold" />
          <span className="font-heading text-brand-gold uppercase tracking-[0.3em] text-xs md:text-sm">
            {title}
          </span>
          <div className="h-px flex-1 bg-brand-gold/30" />
        </div>

        {/* Main theme — large, bold, stacked */}
        <h1 className="font-heading text-brand-cream uppercase font-bold leading-[0.9] mb-6"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          Breaking
          <br />
          <span className="text-brand-gold">Destiny</span>
          <br />
          Limitations
        </h1>

        {/* Scripture */}
        <p className="font-heading text-brand-cream/60 uppercase tracking-widest text-sm mb-8">
          {scripture}
        </p>

        {/* Speaker block */}
        <div className="inline-flex flex-col gap-1 border-l-4 border-brand-gold pl-5 mb-10">
          <span className="text-brand-cream/60 text-xs uppercase tracking-widest font-heading">
            Ministering
          </span>
          <span className="text-brand-gold font-heading uppercase text-xl md:text-2xl font-bold">
            {speaker}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link href="/register">
            <Button variant="primary" size="lg">
              Register Now
            </Button>
          </Link>
          <Link href="/#schedule">
            <Button variant="outline" size="lg">
              View Schedule
            </Button>
          </Link>
        </div>

        {/* Event date/location bar */}
        <div className="mt-12 flex flex-wrap items-center gap-6 text-brand-cream/50 text-xs font-heading uppercase tracking-wider">
          <span>📅 August 2026</span>
          <span className="text-brand-gold/40">|</span>
          <span>📍 Amsterdam, Netherlands</span>
          <span className="text-brand-gold/40">|</span>
          <span className="text-brand-gold">Free Entry</span>
        </div>
      </div>
    </section>
  );
}
