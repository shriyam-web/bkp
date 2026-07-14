import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n.config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Browsers on /en or /hi may request a locale-prefixed manifest → serve the real root one
  if (
    pathname === '/en/manifest.webmanifest' ||
    pathname === '/hi/manifest.webmanifest'
  ) {
    return NextResponse.rewrite(new URL('/manifest.webmanifest', request.url));
  }

  // Never locale-prefix the root PWA manifest
  if (pathname === '/manifest.webmanifest') {
    return NextResponse.next();
  }

  // Check for admin routes
  if (pathname.startsWith('/admin')) {
    const isAuthenticated = request.cookies.get('admin_session');

    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  const matchedLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (matchedLocale) {
    const response = NextResponse.next();
    response.headers.set('x-locale', matchedLocale);
    return response;
  }

  const locale = i18n.defaultLocale;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Root manifest is excluded so /manifest.webmanifest is served directly.
    // Locale paths like /en/manifest.webmanifest still hit middleware and are rewritten.
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest$|public|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|xml|txt)).*)',
  ],
};
