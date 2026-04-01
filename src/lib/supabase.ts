import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Public anon client (for data reads in server components — no auth awareness)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client (for admin operations — bypasses RLS)
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(supabaseUrl, serviceKey);
}

// Auth-aware browser client (for 'use client' components)
export function createAuthBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Auth-aware server client (for server components, route handlers, server actions)
export async function createAuthServerClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — can't set cookies.
          // Middleware handles token refresh.
        }
      },
    },
  });
}
