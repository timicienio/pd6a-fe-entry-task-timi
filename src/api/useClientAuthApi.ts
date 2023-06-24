import { useSession } from 'next-auth/react';
import authApi from './apiWithAuth';

export default function useClientAuthApi<T>() {
  const session = useSession();
  const token = session.data?.token;

  if (!token) throw new Error('No token in session.');

  return authApi<T>(token);
}
