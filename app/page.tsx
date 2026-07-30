import { Hero } from "@/components/hero";
import { ScheduleTimeline, DEFAULT_SESSIONS } from "@/components/schedule-timeline";
import { VenueCard } from "@/components/venue-card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero
        title="2026 Amsterdam Convention"
        theme="Breaking Destiny Limitations"
        scripture="1 Chronicles 4:10"
        speaker="Fr. Emmanuel Obimma (Ebube Muonso)"
      />

      {/* ── About the Convention ── */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block font-heading text-brand-gold uppercase tracking-[0.3em] text-xs mb-3">
              The Convention
            </span>
            <h2 className="font-heading text-brand-burgundy uppercase text-4xl md:text-5xl font-bold">
              About the Event
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left — flyer 1 */}
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/flyer1.jpg"
                width={600}
                height={800}
                className="w-full h-auto object-cover object-top"
                alt="2026 Amsterdam Convention — Breaking Destiny Limitations official flyer"
              />
            </div>

            {/* Right — extracted flyer content */}
            <div className="flex flex-col gap-6 pt-2">
              {/* Event identity */}
              <div>
                <p className="font-heading text-brand-gold uppercase tracking-widest text-xs mb-2">
                  2026 Amsterdam Convention
                </p>
                <h3 className="font-heading text-brand-burgundy uppercase text-3xl font-bold leading-tight mb-1">
                  Breaking Destiny Limitations
                </h3>
                <p className="text-brand-burgundy/50 italic text-sm">
                  1 Chronicles 4:10
                </p>
              </div>

              {/* Minister */}
              <div className="border-l-4 border-brand-gold pl-4">
                <p className="text-brand-burgundy/60 text-xs uppercase tracking-wider font-heading mb-1">
                  Ministering
                </p>
                <p className="font-heading text-brand-burgundy text-2xl font-bold uppercase">
                  Fr. Emmanuel Obimma
                </p>
                <p className="text-brand-gold font-heading uppercase text-sm tracking-wider">
                  (Ebube Muonso)
                </p>
              </div>

              {/* Programme highlights */}
              <div>
                <p className="font-heading text-brand-burgundy uppercase text-xs tracking-widest mb-3">
                  Daily Programme
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-heading font-bold text-sm whitespace-nowrap mt-0.5">
                      12:00 – 18:00
                    </span>
                    <span className="text-brand-burgundy/80 text-sm">
                      Daily Consultation with the Man of God
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-heading font-bold text-sm whitespace-nowrap mt-0.5">
                      18:00 – 22:00
                    </span>
                    <span className="text-brand-burgundy/80 text-sm">
                      Holy Mass & Adoration
                    </span>
                  </li>
                </ul>
              </div>

              {/* Venue */}
              <div className="bg-brand-cream rounded-lg px-4 py-3 flex items-start gap-3">
                <span className="text-brand-gold text-lg mt-0.5">📍</span>
                <div>
                  <p className="font-heading text-brand-burgundy uppercase text-xs tracking-wider mb-0.5">
                    Venue
                  </p>
                  <p className="text-brand-burgundy text-sm font-medium">
                    Zaaiersweg 180, 1097 ST Amsterdam
                  </p>
                  <p className="text-brand-burgundy/60 text-xs">
                    The Netherlands · Free Entry
                  </p>
                </div>
              </div>

              {/* Organisers */}
              <div>
                <p className="font-heading text-brand-burgundy/50 uppercase text-xs tracking-widest mb-2">
                  Coordinators
                </p>
                <p className="text-brand-burgundy text-sm">
                  Ugochukwu Ndukaihe &amp; Augustine Amadike
                </p>
              </div>

              <Link href="/register" className="self-start">
                <Button variant="primary" size="lg">
                  Secure Your Spot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Watch the Vision ── */}
      <section className="py-20 bg-brand-burgundy">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block font-heading text-brand-gold uppercase tracking-[0.3em] text-xs mb-3">
              See What God Is Doing
            </span>
            <h2 className="font-heading text-brand-cream uppercase text-4xl font-bold">
              Watch the Vision
            </h2>
            <p className="text-brand-cream/60 text-sm mt-3 max-w-md mx-auto">
              Get a glimpse of the anointing and power you will experience at the
              2026 Amsterdam Convention.
            </p>
          </div>

          {/* Single promo video */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            controls
            preload="metadata"
            poster="/flyer1.jpg"
            className="w-full rounded-xl shadow-2xl border-2 border-brand-gold/40"
            aria-label="2026 Amsterdam Convention promotional video"
          >
            <source src="/videos/promo1.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>

          <div className="mt-8 text-center">
            <Link href="/register">
              <Button variant="primary" size="lg">
                I&apos;m Coming — Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ScheduleTimeline sessions={DEFAULT_SESSIONS} />

      <VenueCard
        name="Amsterdam Convention Centre"
        address="Zaaiersweg 180, 1097 ST Amsterdam, The Netherlands"
      />
    </>
  );
}
