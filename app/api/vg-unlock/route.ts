import { NextResponse } from "next/server";

async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  const form = await request.formData();
  const attempt = String(form.get("password") ?? "");
  const expected = process.env.VG_PASSWORD;

  if (expected && attempt === expected) {
    const res = NextResponse.redirect(new URL("/work/valueglance", request.url), 303);
    res.cookies.set("vg_access", await sha256(expected), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return res;
  }
  return NextResponse.redirect(new URL("/work/valueglance?error=1", request.url), 303);
}
