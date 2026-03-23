import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  // Grab the stateless session cookie
  const sessionCookie = cookieStore.get("better-auth.session_data")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  return NextResponse.json({ token: sessionCookie });
}
