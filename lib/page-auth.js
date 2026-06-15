import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export async function requirePageUser() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}
