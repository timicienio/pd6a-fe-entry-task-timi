import authApi from '@/api/authApi';

import UserType from './UserType';
import HandlerType from '../../../types/HandlerType';

interface GetUserArgsType {
  userId: string;
}
interface GerUserResponseType {
  status: string;
  message: string;
  user: UserType;
}

const getUser: HandlerType<GerUserResponseType, GetUserArgsType> =
  ({ token }) =>
  async ({ userId }: GetUserArgsType) => {
    const res = await authApi<GerUserResponseType>(token)(`/users/${userId}`);
    return res;
  };

export default getUser;
