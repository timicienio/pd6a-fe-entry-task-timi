import { getSession } from 'next-auth/react';

const getSessionUser = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) throw new Error('No user in session.');

  return user;
};

export default getSessionUser;
