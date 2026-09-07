import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabaseResponse, user } = await updateSession(request);

  // If this is an admin route
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";

    // If Supabase is actively configured
    if (isSupabaseConfigured()) {
      // If user is not authenticated and trying to access protected admin page
      if (!user && !isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("returnUrl", pathname);
        return NextResponse.redirect(url);
      }

      // If user is already authenticated and visits login page
      if (user && isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
