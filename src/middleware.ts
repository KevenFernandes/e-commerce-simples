import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./libs/login/session";

const protectRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/register", "/auth/", "/"];

// includes => para rotas exatas

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectRoutes = protectRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);

  if (isProtectRoutes && !session?.username) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoutes &&
    session?.username &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/auth/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login"],
};
