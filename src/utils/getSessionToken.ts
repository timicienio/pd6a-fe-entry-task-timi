import { getSession } from 'next-auth/react';

const getToken = async () => {
  const session = await getSession();
  const token = session?.token;

  if (!token) throw new Error('No token in session.');

  return token;
};

export default getToken;
