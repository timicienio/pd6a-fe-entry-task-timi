import apiWithAuth from '@/api/authApi';

import TaskType from './TaskType';
import HandlerType from '../../../types/HandlerType';

export type UpdateTaskArgsType = Partial<Omit<TaskType, 'id' | 'userId' | 'reminderPeriod'>> & Pick<TaskType, 'id'>;
interface UpdateTaskResponseType {
  status: string;
  message: string;
  task: TaskType;
}

const updateTask: HandlerType<UpdateTaskResponseType, UpdateTaskArgsType> =
  ({ token }) =>
  async ({ id, ...rest }: UpdateTaskArgsType) => {
    const res = await apiWithAuth<UpdateTaskResponseType>(token)(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...rest })
    });

    return res;
  };

export default updateTask;
