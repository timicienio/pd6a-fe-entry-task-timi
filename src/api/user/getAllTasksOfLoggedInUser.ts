import authApi from '@/api/authApi';

import TaskType from '../task/TaskType';
import HandlerType from '../../../types/HandlerType';

export interface GetAllTasksOfLoggedInUserResponseType {
  status: string;
  message: string;
  tasks: null | TaskType[];
}

const getAllTasksOfLoggedInUser: HandlerType<GetAllTasksOfLoggedInUserResponseType> =
  ({ token, userId }) =>
  async () => {
    const res = await authApi<GetAllTasksOfLoggedInUserResponseType>(token)(`/users/${userId}/tasks`, {
      next: { tags: ['tasks'] }
    });
    return res;
  };

export default getAllTasksOfLoggedInUser;
