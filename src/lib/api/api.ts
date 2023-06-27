import apiRoot from '@/utils/apiRoot';

export default async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiRoot(url), init);

  if (!res.ok) throw new Error(res.statusText);

  return await (res.json() as Promise<T>);
}
