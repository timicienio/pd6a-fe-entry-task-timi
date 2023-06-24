import { getSession } from 'next-auth/react';

import apiWithAuth from '@/api/apiWithAuth';
import getToken from '@/utils/getSessionToken';
import getSessionUser from '@/utils/getSessionUser';

import TaskType from './TaskType';

export default async function createTask({
  title,
  startTime,
  endTime,
  reminderTimePeriod
}: Omit<TaskType, 'id' | 'userId'>) {
  const token = await getToken();
  const user = await getSessionUser();

  const res = await apiWithAuth<{
    status: string;
    message: string;
    task: TaskType;
  }>(token)('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title,
      startTime,
      endTime,
      userId: user.id,
      reminderTimePeriod
    })
  });

  return res;
}
