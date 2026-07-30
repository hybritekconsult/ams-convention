import { adminLogin } from "@/app/actions/auth";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <div className="min-h-screen bg-brand-burgundy flex items-center justify-center px-4">
      {/* Background decorative layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-heading text-brand-gold uppercase tracking-[0.3em] text-xs mb-2">
            2026 Amsterdam Convention
          </p>
          <h1 className="font-heading text-brand-cream uppercase text-3xl font-bold">
            Admin Panel
          </h1>
        </div>

        {/* Login card */}
        <div className="bg-white/10 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-8">
          <h2 className="font-heading text-brand-gold uppercase text-lg font-bold mb-6">
            Sign In
          </h2>

          <form action={adminLogin} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="password"
                className="block font-heading text-brand-cream uppercase text-xs tracking-widest mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full rounded-lg px-4 py-3 bg-white/10 border border-brand-cream/30 text-brand-cream text-base placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              />
            </div>

            {hasError && (
              <p role="alert" className="text-red-400 text-sm">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-brand-crimson text-brand-cream font-heading uppercase tracking-wide text-base px-5 py-3 rounded-lg hover:bg-brand-burgundy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-brand-cream/30 text-xs mt-6">
          Destiny Limitations 2026 — Admin Access
        </p>
      </div>
    </div>
  );
}
