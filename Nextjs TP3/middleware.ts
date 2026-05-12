import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(request.cookies.get('session')?.value);
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isProjectPage = request.nextUrl.pathname.startsWith('/projects');

  if (!isAuthenticated && (isDashboard || isProjectPage)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/login'],
};
