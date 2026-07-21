import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Signs out and returns to /login.
 *
 * Binds the cookie writer directly to the redirect response rather than using
 * `cookies()` from next/headers: sign-out works by *deleting* the auth cookies,
 * and those deletions have to land on the response that is actually returned.
 */
export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL('/login', request.nextUrl.origin),
    { status: 303 } // 303 so the browser follows with GET, not POST.
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.signOut();

  return response;
}
