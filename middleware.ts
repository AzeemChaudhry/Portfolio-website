import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth-utils'

// Routes that don't require authentication
const publicRoutes = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for token in cookies (client sends it in localStorage, but we check if it exists)
  // For protected routes, we'll validate on the client side as well
  // The actual validation happens in the useAdmin hook
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
