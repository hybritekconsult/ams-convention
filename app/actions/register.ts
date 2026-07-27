"use server";

import { registerSchema } from "@/lib/validations/register";
import {
  findByEmail,
  createRegistration,
  type StoredRegistration,
} from "@/lib/storage";
import type { ActionResponse } from "@/lib/types";

export async function registerAttendee(
  input: unknown
): Promise<ActionResponse<StoredRegistration>> {
  // Step 1: Validate with Zod
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Step 2: Check for duplicate email
  const existing = findByEmail(parsed.data.email);
  if (existing) {
    return {
      success: false,
      message: "An attendee with this email is already registered.",
    };
  }

  // Step 3: Persist to JSON file
  try {
    const record = createRegistration(parsed.data);
    return { success: true, message: "Registration successful!", data: record };
  } catch {
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
}
