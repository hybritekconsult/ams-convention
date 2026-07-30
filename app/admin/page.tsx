import { redirect } from "next/navigation";
import { isAdminAuthenticated, adminLogout } from "@/app/actions/auth";
import { getAllRegistrations, getStreamId } from "@/lib/storage";
import { StreamConfigForm } from "@/components/stream-config-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const registrations = getAllRegistrations();
  const currentStreamId = getStreamId();

  return (
    <div className="min-h-screen bg-brand-cream py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="font-heading text-brand-burgundy uppercase text-3xl font-bold">
              Admin Panel
            </h1>
            <p className="text-brand-burgundy/50 text-sm mt-1">
              Destiny Limitations 2026 — Convention Management
            </p>
          </div>
          {/* Logout */}
          <form action={adminLogout}>
            <button
              type="submit"
              className="text-brand-burgundy/60 hover:text-brand-burgundy text-sm font-heading uppercase tracking-wide border border-brand-burgundy/20 px-4 py-2 rounded-lg hover:border-brand-burgundy/40 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* ── YouTube Stream Config ── */}
        <section className="mb-12">
          <h2 className="font-heading text-brand-burgundy uppercase text-xl font-bold mb-5">
            🎥 Live Stream Settings
          </h2>
          <div className="bg-white rounded-xl border border-brand-gold/30 p-6">
            <p className="text-brand-burgundy/60 text-sm mb-6">
              Enter a YouTube Video ID or Live Stream ID to activate the stream on the{" "}
              <a href="/stream" className="text-brand-gold hover:underline" target="_blank">
                /stream page
              </a>
              . Leave empty to show the &ldquo;Stream Not Yet Live&rdquo; message.
            </p>

            <StreamConfigForm currentStreamId={currentStreamId} adminKey="" />

            <div className="mt-4 p-3 bg-brand-cream rounded-lg text-xs text-brand-burgundy/50">
              <strong className="text-brand-burgundy/70">How to find the YouTube Video ID:</strong>
              <br />
              From a URL like{" "}
              <code className="bg-brand-burgundy/10 px-1 rounded">
                https://youtube.com/watch?v=<span className="text-brand-gold font-bold">dQw4w9WgXcQ</span>
              </code>
              , the ID is the bold part after <code>v=</code>.
            </div>
          </div>
        </section>

        {/* ── Registrations ── */}
        <section>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-heading text-brand-burgundy uppercase text-xl font-bold">
              📋 Registrations
            </h2>
            <span className="bg-brand-burgundy text-brand-cream font-heading text-sm px-3 py-1 rounded-full">
              {registrations.length} total
            </span>
          </div>

          <p className="text-brand-burgundy/50 text-xs mb-4">
            Data stored in{" "}
            <code className="bg-brand-burgundy/10 px-1 rounded">data/registrations.json</code>.
          </p>

          {registrations.length === 0 ? (
            <div className="text-center py-16 text-brand-burgundy/40 bg-white rounded-xl border border-brand-gold/20">
              No registrations yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-brand-gold/40">
              <table className="w-full text-sm">
                <thead className="bg-brand-burgundy text-brand-cream">
                  <tr>
                    {["#", "Name", "Email", "Phone", "Country", "City", "Type", "Date"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-heading uppercase text-xs tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-brand-cream/50"}>
                      <td className="px-4 py-3 text-brand-burgundy/40 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-brand-burgundy whitespace-nowrap">{r.fullName}</td>
                      <td className="px-4 py-3 text-brand-burgundy/80">{r.email}</td>
                      <td className="px-4 py-3 text-brand-burgundy/80 whitespace-nowrap">{r.phone}</td>
                      <td className="px-4 py-3 text-brand-burgundy/80">{r.country}</td>
                      <td className="px-4 py-3 text-brand-burgundy/80">{r.city}</td>
                      <td className="px-4 py-3 text-brand-burgundy/80 text-xs whitespace-nowrap">
                        {r.attendanceType.replace(/_/g, " ")}
                      </td>
                      <td className="px-4 py-3 text-brand-burgundy/50 text-xs whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
