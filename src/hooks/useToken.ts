import { useSession } from 'next-auth/react';

export default function useToken() {
  const session = useSession();

  const token = session.data?.token;

  if (!token) throw new Error('No token in session.');

  return token;
}
