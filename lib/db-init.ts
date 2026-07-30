// lib/db-init.ts
// Creates tables if they don't exist — safe to run on every startup.

import { pool } from "./db";

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id          TEXT PRIMARY KEY,
      full_name   TEXT NOT NULL,
      email       TEXT NOT NULL,
      phone       TEXT NOT NULL,
      country     TEXT NOT NULL,
      city        TEXT NOT NULL,
      attendance_type TEXT NOT NULL DEFAULT 'FULL_CONVENTION',
      status      TEXT NOT NULL DEFAULT 'CONFIRMED',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );

    INSERT INTO settings (key, value)
    VALUES ('youtube_stream_id', '')
    ON CONFLICT (key) DO NOTHING;
  `);
}
