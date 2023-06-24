import authApi from '@/api/authApi';

import TaskType from '../task/TaskType';
import HandlerType from '../../../types/HandlerType';

interface GetLoggedInUserResponseType {
  status: string;
  message: string;
  tasks: null | TaskType[];
}

const getLoggedInUserTasks: HandlerType<GetLoggedInUserResponseType> =
  ({ token, userId }) =>
  async () => {
    const res = await authApi<GetLoggedInUserResponseType>(token)(`/users/${userId}/tasks`);
    return res;
  };

export default getLoggedInUserTasks;
