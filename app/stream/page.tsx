import { getStreamId } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function StreamPage() {
  const streamId = await getStreamId();

  return (
    <div className="min-h-screen bg-brand-burgundy py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="font-heading text-brand-gold uppercase text-4xl md:text-5xl font-bold text-center mb-4">
          Live Stream
        </h1>
        <p className="text-brand-cream/70 text-center mb-10">
          2026 Amsterdam Convention — Breaking Destiny Limitations
        </p>

        {streamId ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-brand-gold/30">
            <iframe
              src={`https://www.youtube.com/embed/${streamId}?autoplay=1&rel=0`}
              title="Live Stream — 2026 Amsterdam Convention"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-20 border-2 border-brand-gold/30 rounded-lg">
            <div className="text-6xl" aria-hidden="true">📡</div>
            <h2 className="font-heading text-brand-cream uppercase text-2xl font-bold text-center">
              Stream Not Yet Live
            </h2>
            <p className="text-brand-cream/60 text-center max-w-sm text-sm">
              The live stream will begin when the convention starts. Please
              check back closer to the event date.
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-brand-cream/10 rounded-lg border border-brand-cream/20">
          <p className="text-brand-cream/60 text-xs text-center">
            Having trouble viewing the stream? Try refreshing or{" "}
            <a
              href={
                streamId
                  ? `https://youtube.com/watch?v=${streamId}`
                  : "https://youtube.com/@EbubeMuonso"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              open directly on YouTube
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
