"use server";

import fs from "fs";
import path from "path";

/**
 * Updates the YOUTUBE_STREAM_ID in the .env file.
 * This is a simple file-write approach that works on cPanel shared hosting.
 * After saving, the Next.js server needs to be restarted for the env to reload.
 */
export async function updateStreamId(
  streamId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const envPath = path.join(process.cwd(), ".env");

    let content = "";
    try {
      content = fs.readFileSync(envPath, "utf-8");
    } catch {
      content = "";
    }

    const trimmed = streamId.trim();

    // Replace or insert YOUTUBE_STREAM_ID line
    if (content.includes("YOUTUBE_STREAM_ID")) {
      content = content.replace(
        /^YOUTUBE_STREAM_ID=.*$/m,
        `YOUTUBE_STREAM_ID=${trimmed}`
      );
    } else {
      content += `\nYOUTUBE_STREAM_ID=${trimmed}\n`;
    }

    fs.writeFileSync(envPath, content, "utf-8");

    return {
      success: true,
      message: trimmed
        ? `Stream ID saved: ${trimmed}. Restart the server to apply.`
        : "Stream ID cleared. The /stream page will show 'not yet live'.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to save stream ID. Check file permissions.",
    };
  }
}
