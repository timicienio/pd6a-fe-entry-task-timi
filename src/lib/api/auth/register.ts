import api from '@/lib/api/api';

export default async function register(firstName: string, lastName: string, email: string, password: string) {
  const res = await api('/users/', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password })
  });

  return res;
}
