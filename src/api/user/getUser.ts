import authApi from '@/api/apiWithAuth';

import UserType from './UserType';
import getToken from '@/utils/getSessionToken';

export default async function getUser(userId: string) {
  if (!userId) {
    return { user: null };
  }
  const token = await getToken();
  const res = await authApi<{
    status: string;
    message: string;
    user: UserType;
  }>(token)(`/users/${userId}`);

  return res;
}
