// lib/storage.ts
// Storage layer — backed by PostgreSQL (Neon) for persistence across deploys.
// All exported function signatures are unchanged from the previous JSON implementation.

import { pool } from "./db";
import { initDb } from "./db-init";

let initialised = false;
async function ensureInit() {
  if (!initialised) {
    await initDb();
    initialised = true;
  }
}

// ── Registrations ────────────────────────────────────────────────────────────

export interface StoredRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  attendanceType: "FULL_CONVENTION" | "CONSULTATION_ONLY" | "HOLY_MASS_ONLY";
  status: "CONFIRMED";
  createdAt: string; // ISO string
}

// Map snake_case DB row → camelCase interface
function rowToRegistration(row: Record<string, string>): StoredRegistration {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    city: row.city,
    attendanceType: row.attendance_type as StoredRegistration["attendanceType"],
    status: "CONFIRMED",
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function findByEmail(
  email: string
): Promise<StoredRegistration | undefined> {
  await ensureInit();
  const res = await pool.query(
    "SELECT * FROM registrations WHERE email = $1 LIMIT 1",
    [email]
  );
  return res.rows[0] ? rowToRegistration(res.rows[0]) : undefined;
}

export async function createRegistration(
  input: Omit<StoredRegistration, "id" | "status" | "createdAt">
): Promise<StoredRegistration> {
  await ensureInit();
  const id = crypto.randomUUID();
  const res = await pool.query(
    `INSERT INTO registrations
       (id, full_name, email, phone, country, city, attendance_type, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'CONFIRMED')
     RETURNING *`,
    [
      id,
      input.fullName,
      input.email,
      input.phone,
      input.country,
      input.city,
      input.attendanceType,
    ]
  );
  return rowToRegistration(res.rows[0]);
}

export async function getAllRegistrations(): Promise<StoredRegistration[]> {
  await ensureInit();
  const res = await pool.query(
    "SELECT * FROM registrations ORDER BY created_at DESC"
  );
  return res.rows.map(rowToRegistration);
}

// ── Stream settings ───────────────────────────────────────────────────────────

export async function getStreamId(): Promise<string> {
  await ensureInit();
  const res = await pool.query(
    "SELECT value FROM settings WHERE key = 'youtube_stream_id'"
  );
  return res.rows[0]?.value ?? "";
}

export async function saveStreamId(id: string): Promise<void> {
  await ensureInit();
  await pool.query(
    `INSERT INTO settings (key, value) VALUES ('youtube_stream_id', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [id.trim()]
  );
}
