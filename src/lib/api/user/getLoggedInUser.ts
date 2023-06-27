import authApi from '@/lib/api/authApi';

import UserType from './UserType';
import HandlerType from '../../../../types/HandlerType';

interface GerLoggedInUserResponseType {
  status: string;
  message: string;
  user: UserType;
}

const getLoggedInUser: HandlerType<GerLoggedInUserResponseType> =
  ({ token, userId }) =>
  async () => {
    const res = await authApi<GerLoggedInUserResponseType>(token)(`/users/${userId}`);
    return res;
  };

export default getLoggedInUser;
