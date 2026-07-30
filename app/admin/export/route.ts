import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/actions/auth";
import { getAllRegistrations } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  // Auth check
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const registrations = await getAllRegistrations();

  // Build CSV — Excel opens UTF-8 CSV with BOM correctly
  const BOM = "\uFEFF";
  const headers = [
    "No.",
    "Full Name",
    "Email",
    "Phone",
    "Country",
    "City",
    "Attendance Type",
    "Status",
    "Registered On",
  ];

  const rows = registrations.map((r, i) => [
    String(i + 1),
    r.fullName,
    r.email,
    r.phone,
    r.country,
    r.city,
    r.attendanceType.replace(/_/g, " "),
    r.status,
    new Date(r.createdAt).toLocaleString("en-GB"),
  ]);

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;

  const csv =
    BOM +
    [headers, ...rows]
      .map((row) => row.map(escape).join(","))
      .join("\r\n");

  const filename = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
