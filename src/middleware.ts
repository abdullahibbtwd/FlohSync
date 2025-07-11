import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // If not authenticated, allow only /auth
  if (!authToken && pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If authenticated, block /auth
  if (authToken && pathname === '/auth') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|api).*)', // Match all routes except Next.js internals and static files
  ],
};