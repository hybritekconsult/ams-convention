import { z } from "zod";

/**
 * Zod validation schema for attendee registration form input.
 *
 * Field rules:
 *   - fullName:       string, minimum 2 characters
 *   - email:          valid email format
 *   - phone:          string, minimum 8 characters
 *   - country:        string, minimum 2 characters
 *   - city:           string, minimum 2 characters
 *   - attendanceType: one of the three AttendanceType enum values
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
 */
export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  attendanceType: z.enum([
    "FULL_CONVENTION",
    "CONSULTATION_ONLY",
    "HOLY_MASS_ONLY",
  ]),
});

/**
 * TypeScript type inferred from the registration schema.
 * Use this type for all registration-related function parameters and return values.
 */
export type RegisterInput = z.infer<typeof registerSchema>;
