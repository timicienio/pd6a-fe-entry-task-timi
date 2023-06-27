import api from '@/lib/api/api';
import UserType from '../user/UserType';

export default async function login(email: string, password: string) {
  const res = await api<{
    status: string;
    message: string;
    user: UserType;
    authToken: string;
  }>('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  return res;
}
