import apiWithAuth from '@/lib/api/authApi';

import TaskType from './TaskType';
import HandlerType from '../../../../types/HandlerType';

type CreateTaskArgsType = Omit<TaskType, 'id'>;
interface CreateTaskResponseType {
  status: string;
  message: string;
  task: TaskType;
}

const createTask: HandlerType<CreateTaskResponseType, CreateTaskArgsType> =
  ({ token }) =>
  async ({ userId, title, startTime, endTime, reminderPeriod }: CreateTaskArgsType) => {
    const res = await apiWithAuth<CreateTaskResponseType>(token)('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        startTime,
        endTime,
        userId: userId,
        reminderPeriod
      }),
      next: { tags: ['tasks'] }
    });

    return res;
  };

export default createTask;
