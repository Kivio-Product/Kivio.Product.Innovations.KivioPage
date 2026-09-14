import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (!first) {
    const stored = req.cookies.get("kivio-lang")?.value;
    const lang = stored && isLocale(stored) ? stored : defaultLocale;
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }
  if (!isLocale(first)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
  }
  const res = NextResponse.next();
  res.cookies.set("kivio-lang", first, { path: "/", maxAge: 31536000 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
