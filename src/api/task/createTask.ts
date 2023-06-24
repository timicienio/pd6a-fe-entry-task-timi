import apiWithAuth from '@/api/authApi';

import TaskType from './TaskType';
import HandlerType from '../../../types/HandlerType';

type CreateTaskArgsType = Omit<TaskType, 'id'>;
interface CreateTaskResponseType {
  status: string;
  message: string;
  task: TaskType;
}

const createTask: HandlerType<CreateTaskResponseType, CreateTaskArgsType> =
  ({ token }) =>
  async ({ userId, title, startTime, endTime, reminderTimePeriod }: CreateTaskArgsType) => {
    const res = await apiWithAuth<CreateTaskResponseType>(token)('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        startTime,
        endTime,
        userId: userId,
        reminderTimePeriod
      })
    });

    return res;
  };

export default createTask;
