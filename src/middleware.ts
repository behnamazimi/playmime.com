import { NextResponse, URLPattern } from "next/server";
import type { NextRequest } from "next/server";
import rateLimiter from "@/middlewares/rateLimiter";
import routing from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import redirectByCountry from "@/middlewares/redirectByCountry";

const languagePathMatchers = [
  new URLPattern({ pathname: "/fa/*?" }),
  new URLPattern({ pathname: "/en/*?" }),
  new URLPattern({ pathname: "/" }),
];

export async function middleware(request: NextRequest) {
  // Rate limit the words API
  if (request.nextUrl.pathname.startsWith("/api/words/")) {
    return rateLimiter(request);
  }

  // Redirect to the appropriate locale based on the user's country
  if (request.nextUrl.pathname === "/") {
    return redirectByCountry(request);
  }

  const urlWithoutSearchParams = request.url?.split("?")[0];
  const handlePattern = languagePathMatchers.find((pattern) =>
    pattern.exec(urlWithoutSearchParams)
  );
  if (handlePattern) {
    return createMiddleware(routing)(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - manifest.webmanifest, icons, screenshots (PWA files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|icons|screenshots).*)",
  ],
};
