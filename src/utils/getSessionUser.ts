import { getServerSession } from 'next-auth/next';

const getSessionUser = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) throw new Error('No user in session.');

  return user;
};

export default getSessionUser;
