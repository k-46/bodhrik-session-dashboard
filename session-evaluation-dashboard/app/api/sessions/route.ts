import { NextResponse } from "next/server";
import { filterSessions } from "@/lib/utils";
import { getSessions } from "@/lib/session-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const student = searchParams.get("student") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const sessions = await getSessions();

    const filtered = filterSessions(
      sessions,
      student,
      startDate,
      endDate
    );

    return NextResponse.json({ sessions: filtered });
  } catch {
    return NextResponse.json(
      { error: "Failed to read session evaluations data" },
      { status: 500 }
    );
  }
}