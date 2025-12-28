import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && !req.nextUrl.pathname.startsWith('/auth') && req.nextUrl.pathname !== '/') {
    const redirectUrl = new URL('/auth', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    const redirectUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
