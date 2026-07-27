import { cookies } from "next/headers";
import { DEMO_ACCESS_CODE } from "./constants";

export const AUTH_COOKIE_NAME = "session_token";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token === DEMO_ACCESS_CODE;
}

export function verifyAccessCode(code?: string): boolean {
  return code?.trim() === DEMO_ACCESS_CODE;
}
