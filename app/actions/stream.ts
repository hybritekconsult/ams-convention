"use server";

import { saveStreamId } from "@/lib/storage";

/**
 * Saves the YouTube stream ID to data/settings.json.
 * Readable immediately by the /stream page on next request — no restart needed.
 */
export async function updateStreamId(
  streamId: string
): Promise<{ success: boolean; message: string }> {
  try {
    saveStreamId(streamId);
    const trimmed = streamId.trim();
    return {
      success: true,
      message: trimmed
        ? `Stream ID saved. The /stream page is now live.`
        : "Stream ID cleared. The /stream page will show 'not yet live'.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to save stream ID. Check server file permissions.",
    };
  }
}
