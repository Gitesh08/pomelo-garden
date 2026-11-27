import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    // Validate demo owner or manager credentials
    const validIdentifier =
      identifier === "owner@pomelogarden.com" ||
      identifier === "9850607607" ||
      identifier === "admin" ||
      identifier === "+91 98506 07607";
    const validPassword =
      password === "pomelo2026" ||
      password === "admin123" ||
      password === "owner123";

    if (validIdentifier && validPassword) {
      const response = NextResponse.json(
        {
          success: true,
          user: {
            name: "Resort Owner",
            role: "Owner & Operator",
            email: "owner@pomelogarden.com",
            phone: "+91 98506 07607",
          },
        },
        { status: 200 }
      );

      // Set HTTP-only session cookie
      response.cookies.set({
        name: "pomelo_admin_session",
        value: "authenticated",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid phone/email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request format" },
      { status: 400 }
    );
  }
}
