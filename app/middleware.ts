// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user= null// ... fetch user data from your UserContext (e.g., from cookies or session)

  if (request.nextUrl.pathname === '/' && !user) { // Check if the path is '/' and user is not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
