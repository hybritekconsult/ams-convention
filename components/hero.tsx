import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  title: string;
  theme: string;
  scripture: string;
  speaker: string;
}

export function Hero({ title, theme, scripture, speaker }: HeroProps) {
  return (
    <section
      className="relative bg-brand-burgundy clip-hero min-h-[92vh] flex items-center pb-32 overflow-hidden"
      aria-label="Event hero banner"
    >
      {/* Background decorative geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-[55%] h-[120%] bg-brand-gold/10"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson opacity-60" />
        {/* Watermark cross — hidden on mobile so it doesn't clash with image */}
        <div className="hidden md:block absolute right-[46%] top-1/2 -translate-y-1/2 text-brand-gold/5 font-heading text-[20rem] font-bold leading-none select-none">
          ✝
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── Left: text content ── */}
        <div>
          {/* Top label with rule */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="font-heading text-brand-gold uppercase tracking-[0.3em] text-xs md:text-sm">
              {title}
            </span>
            <div className="h-px flex-1 bg-brand-gold/30" />
          </div>

          {/* Main theme headline */}
          <h1
            className="font-heading text-brand-cream uppercase font-bold leading-[0.9] mb-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
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
          <div className="flex flex-wrap gap-4 mb-10">
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

          {/* Event meta */}
          <div className="flex flex-wrap items-center gap-4 text-brand-cream/50 text-xs font-heading uppercase tracking-wider">
            <span>📅 August 2026</span>
            <span className="text-brand-gold/40">|</span>
            <span>📍 Amsterdam, Netherlands</span>
            <span className="text-brand-gold/40">|</span>
            <span className="text-brand-gold">Free Entry</span>
          </div>
        </div>

        {/* ── Right: priest portrait fading into background ── */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm md:max-w-none aspect-[3/4]">
            <Image
              src="/priest.png"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover object-top"
              alt="Fr. Emmanuel Obimma (Ebube Muonso)"
            />
            {/* Fade all edges into brand-burgundy */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-burgundy via-transparent to-brand-burgundy opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-burgundy via-transparent to-brand-burgundy" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/80 via-transparent to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
