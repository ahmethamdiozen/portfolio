import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const subdomain = hostname.split('.')[0];

  const mainDomains = ['ahmethamdiozen', 'www', 'localhost', '127'];

  if (!mainDomains.includes(subdomain) && !subdomain.includes('localhost:')) {
    return NextResponse.rewrite(
      new URL(`/apps/${subdomain}${request.nextUrl.pathname}`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
