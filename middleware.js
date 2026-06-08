import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  console.log("[MIDDLEWARE] Path:", request.nextUrl.pathname, "Session:", !!session);

  if (isAdminRoute && !isLoginPage && !session) {
    console.log("[MIDDLEWARE] No session, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
