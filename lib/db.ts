// lib/db.ts
// PostgreSQL client singleton for Neon (or any PostgreSQL host).
// Connection string read from DATABASE_URL environment variable.

import { Pool } from "pg";

declare global {
  // Prevent multiple Pool instances during Next.js hot-reload in development
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function createPool(): Pool {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("neon.tech")
      ? { rejectUnauthorized: false }
      : false,
    max: 5,
  });
}

export const pool: Pool =
  global._pgPool ?? (global._pgPool = createPool());
