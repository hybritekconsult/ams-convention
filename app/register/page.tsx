import { RegistrationForm } from "@/components/registration-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-stretch">
      {/* Background — flyer image with dark overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/flyer1.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 bg-brand-burgundy/85"
        aria-hidden="true"
      />

      {/* Content — two column on desktop, single on mobile */}
      <div className="relative z-10 w-full container mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">

        {/* Left — event identity */}
        <div className="text-center lg:text-left">
          <p className="font-heading text-brand-gold uppercase tracking-[0.3em] text-sm mb-4">
            2026 Amsterdam Convention
          </p>
          <h1
            className="font-heading text-brand-cream uppercase font-bold leading-[0.9] mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Breaking
            <br />
            <span className="text-brand-gold">Destiny</span>
            <br />
            Limitations
          </h1>
          <p className="text-brand-cream/60 italic text-base mb-8">
            1 Chronicles 4:10
          </p>

          <div className="inline-flex flex-col gap-1 border-l-4 border-brand-gold pl-5 mb-8 text-left">
            <span className="text-brand-cream/60 text-xs uppercase tracking-widest font-heading">
              Ministering
            </span>
            <span className="text-brand-gold font-heading uppercase text-2xl font-bold">
              Fr. Emmanuel Obimma
            </span>
            <span className="text-brand-cream/70 font-heading text-sm uppercase tracking-wider">
              (Ebube Muonso)
            </span>
          </div>

          <div className="flex flex-col gap-2 text-brand-cream/60 text-sm">
            <span>📅 August 2026 · Amsterdam, Netherlands</span>
            <span>📍 Zaaiersweg 180, 1097 ST Amsterdam</span>
            <span className="text-brand-gold font-semibold">✓ Free Entry</span>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-8 md:p-10">
          <div className="mb-8">
            <h2 className="font-heading text-brand-gold uppercase text-3xl font-bold mb-1">
              Register
            </h2>
            <p className="text-brand-cream/70 text-sm">
              Secure your place at the convention — it&apos;s completely free.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
