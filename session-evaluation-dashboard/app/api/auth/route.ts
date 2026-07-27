import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAccessCode } from "@/lib/auth";
import { DEMO_ACCESS_CODE } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessCode } = body || {};

    if (!verifyAccessCode(accessCode)) {
      return NextResponse.json(
        { error: "Invalid demo access code. Use 'session-demo'." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, DEMO_ACCESS_CODE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process authentication request" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
