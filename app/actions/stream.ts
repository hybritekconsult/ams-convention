"use server";

import { saveStreamId } from "@/lib/storage";

export async function updateStreamId(
  streamId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await saveStreamId(streamId);
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
      message: "Failed to save stream ID. Please try again.",
    };
  }
}
