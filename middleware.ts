import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // ✅ Create response with security headers
    const response = NextResponse.next();

    // ✅ CACHE CONTROL HEADERS - Prevent stale CSS in Edge
    // HTML pages and dynamic routes: never cache
    if (!pathname.startsWith("/_next/") && !pathname.startsWith("/public/")) {
      response.headers.set(
        "Cache-Control",
        "no-cache, no-store, must-revalidate, max-age=0"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
    }

    // ✅ Security Headers - Prevent XSS attacks
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );

    // ✅ CSP Header - Control resource loading
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.cloudinary.com; img-src 'self' res.cloudinary.com data:; font-src 'self' fonts.googleapis.com fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com;"
    );

    // ✅ Admin routes - Only ADMIN role can access
    if (pathname.startsWith("/admin")) {
      if (!token || (token as any).role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // ✅ Auth routes - If already authenticated, redirect appropriately
    if (pathname.startsWith("/auth/")) {
      if (token) {
        // If user is already authenticated, don't let them access auth pages
        // Redirect to home for regular users, admin dashboard for admins
        const redirectUrl = (token as any).role === "ADMIN" ? "/admin" : "/";
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
    }

    // ✅ Checkout requires authentication
    if (pathname === "/checkout") {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // ✅ Allow unauthenticated access to public routes
        const publicRoutes = ["/", "/books", "/auth/login", "/auth/register"];
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true;
        }

        // ✅ Allow cart access without auth
        if (req.nextUrl.pathname === "/cart") {
          return true;
        }

        // ✅ Protected routes require token
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token && (token as any).role === "ADMIN";
        }

        if (req.nextUrl.pathname === "/checkout") {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // ✅ Protect admin routes
    "/admin/:path*",
    // ✅ Protect checkout route
    "/checkout",
    // ✅ Protect auth routes from authenticated users
    "/auth/login",
    "/auth/register",
  ],
};
