"use client";

import { useState, useTransition } from "react";
import { updateStreamId } from "@/app/actions/stream";

interface StreamConfigFormProps {
  currentStreamId: string;
  adminKey: string;
}

export function StreamConfigForm({ currentStreamId }: StreamConfigFormProps) {
  const [streamId, setStreamId] = useState(currentStreamId);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateStreamId(streamId);
      setMessage({ text: result.message, ok: result.success });
    });
  };

  const handleClear = () => {
    setStreamId("");
    startTransition(async () => {
      const result = await updateStreamId("");
      setMessage({ text: result.message, ok: result.success });
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="streamId"
          className="block font-heading text-brand-burgundy uppercase text-xs tracking-widest mb-2"
        >
          YouTube Video / Stream ID
        </label>
        <div className="flex gap-3">
          <input
            id="streamId"
            type="text"
            value={streamId}
            onChange={(e) => setStreamId(e.target.value)}
            placeholder="e.g. dQw4w9WgXcQ"
            className="flex-1 rounded-lg px-4 py-2.5 border border-brand-burgundy/20 text-brand-burgundy text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="px-5 py-2.5 bg-brand-crimson text-brand-cream font-heading uppercase text-sm tracking-wide rounded-lg hover:bg-brand-burgundy transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            {isPending ? "Saving…" : "Save"}
          </button>
          {streamId && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isPending}
              className="px-4 py-2.5 border border-brand-burgundy/20 text-brand-burgundy/60 font-heading uppercase text-xs rounded-lg hover:border-brand-burgundy/40 transition-colors disabled:opacity-60"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.ok
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-600"
          }`}
        >
          {message.ok ? "✅ " : "❌ "}
          {message.text}
        </div>
      )}

      {streamId && (
        <div className="text-xs text-brand-burgundy/50">
          Preview:{" "}
          <a
            href={`https://youtube.com/watch?v=${streamId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:underline"
          >
            youtube.com/watch?v={streamId}
          </a>
        </div>
      )}
    </div>
  );
}
