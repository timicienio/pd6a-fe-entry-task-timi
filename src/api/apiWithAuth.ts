import { cookies } from 'next/headers';

import api from '@/api/api';

const apiWithAuth =
  <T>(token: string) =>
  async (url: string, init?: RequestInit): Promise<T> =>
    await api<T>(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

export default apiWithAuth;
