import { NextResponse } from 'next/server';

const privateRoutes = ['/dashboard', '/journal', '/impulse-lock', '/progress', '/settings'];

export function middleware(request) {
  const isPrivate = privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isPrivate && !request.cookies.get('command_token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/journal/:path*', '/impulse-lock/:path*', '/progress/:path*', '/settings/:path*'],
};
