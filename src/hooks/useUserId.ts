import { useSession } from 'next-auth/react';

export default function useUserId() {
  const session = useSession();

  const userId = session.data?.user?.id;

  if (!userId) throw new Error('No user data in session.');

  return userId;
}
