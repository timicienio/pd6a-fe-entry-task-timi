import { getServerSession } from 'next-auth/next';

const getToken = async () => {
  const session = await getServerSession();
  const token = session?.token;

  if (!token) throw new Error('No token in session.');

  return token;
};

export default getToken;
