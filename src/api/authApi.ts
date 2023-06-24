import api from '@/api/api';

const authApi =
  <T>(token: string) =>
  async (url: string, init?: RequestInit): Promise<T> =>
    await api<T>(url, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token}`
      }
    });

export default authApi;
