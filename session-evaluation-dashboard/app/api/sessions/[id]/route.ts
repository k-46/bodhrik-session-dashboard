import { getSessionById } from "@/lib/session-service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSessionById(id);

    if (!session) {
      return NextResponse.json(
        { error: `Session with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ session });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch session detail" },
      { status: 500 }
    );
  }
}
