import apiWithAuth from '@/api/authApi';

import TaskType from './TaskType';
import HandlerType from '../../../types/HandlerType';

export interface DeleteTaskArgsType {
  id: string;
}

interface DeleteTaskResponseType {
  status: string;
  message: string;
  task: TaskType;
}

const deleteTask: HandlerType<DeleteTaskResponseType, DeleteTaskArgsType> =
  ({ token }) =>
  async ({ id }: DeleteTaskArgsType) => {
    const res = await apiWithAuth<DeleteTaskResponseType>(token)(`/tasks/${id}`, {
      method: 'DELETE'
    });

    return res;
  };

export default deleteTask;
