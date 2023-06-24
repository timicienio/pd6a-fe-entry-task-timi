import authApi from '@/api/apiWithAuth';
import getSessionUser from '@/utils/getSessionUser';

import TaskType from '../task/TaskType';
import getToken from '@/utils/getSessionToken';

export default async function getUserTasks() {
  const token = await getToken();
  const userId = await getSessionUser();
  const res = await authApi<{
    status: string;
    message: string;
    tasks: null | TaskType[];
  }>(token)(`/users/${userId}/tasks`);

  return res;
}
