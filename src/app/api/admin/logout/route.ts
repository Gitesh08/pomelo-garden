import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set({
    name: "pomelo_admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
  return response;
}
