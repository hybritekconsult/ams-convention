// lib/storage.ts
// Simple JSON file storage for registrations — no database required.
// Works on shared cPanel hosting with no DB setup needed.

import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "registrations.json");

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

function readAll(): StoredRegistration[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoredRegistration[];
  } catch {
    return [];
  }
}

function writeAll(records: StoredRegistration[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export function findByEmail(email: string): StoredRegistration | undefined {
  return readAll().find((r) => r.email === email);
}

export function createRegistration(
  input: Omit<StoredRegistration, "id" | "status" | "createdAt">
): StoredRegistration {
  const records = readAll();
  const record: StoredRegistration = {
    ...input,
    id: crypto.randomUUID(),
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
  };
  records.push(record);
  writeAll(records);
  return record;
}

export function getAllRegistrations(): StoredRegistration[] {
  return readAll();
}
