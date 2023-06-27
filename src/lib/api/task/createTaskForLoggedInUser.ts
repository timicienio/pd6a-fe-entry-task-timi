import apiWithAuth from '@/lib/api/authApi';

import TaskType from './TaskType';
import HandlerType from '../../../../types/HandlerType';

type CreateTaskForLoggedInUserArgsType = Omit<TaskType, 'id' | 'userId' | 'status'>;
interface CreateTaskForLoggedInUserResponseType {
  status: string;
  message: string;
  task: TaskType;
}

const createTaskForLoggedInUser: HandlerType<
  CreateTaskForLoggedInUserResponseType,
  CreateTaskForLoggedInUserArgsType
> =
  ({ token, userId }) =>
  async ({ title, startTime, endTime, reminderPeriod }: CreateTaskForLoggedInUserArgsType) => {
    const res = await apiWithAuth<CreateTaskForLoggedInUserResponseType>(token)('/tasks/', {
      method: 'POST',
      body: JSON.stringify({
        title,
        startTime,
        endTime,
        userId: userId,
        reminderPeriod
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    return res;
  };

export default createTaskForLoggedInUser;
