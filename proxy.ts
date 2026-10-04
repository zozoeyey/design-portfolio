import { NextResponse, type NextRequest } from "next/server";

/**
 * Gate the ValueGlance case study behind a password (set VG_PASSWORD in env).
 * Visitors without the access cookie see the unlock form (URL is preserved via
 * rewrite). The cookie stores a SHA-256 of the password, so rotating the
 * password invalidates existing access.
 */

async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  const password = process.env.VG_PASSWORD;
  const token = request.cookies.get("vg_access")?.value;
  if (password && token === (await sha256(password))) {
    return NextResponse.next();
  }
  // No valid cookie (or no password configured): show the unlock form.
  // Fail-closed on purpose — if VG_PASSWORD is missing in prod, stay locked.
  return NextResponse.rewrite(
    new URL(`/vg-unlock${request.nextUrl.search}`, request.url),
  );
}

export const config = {
  matcher: "/work/valueglance",
};
