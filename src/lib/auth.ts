import { redirect } from 'next/navigation';
import { createAuthServerClient } from './supabase';

export type UserRole = 'admin' | 'contractor';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  contractorId: string | null;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, contractor_id')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return {
    id: user.id,
    email: user.email || '',
    fullName: profile.full_name || '',
    role: profile.role as UserRole,
    contractorId: profile.contractor_id,
  };
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) redirect('/auth/login');
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== 'admin') redirect('/dashboard');
  return user;
}
