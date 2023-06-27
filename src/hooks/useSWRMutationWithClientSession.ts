import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

import HandlerType from '../../types/HandlerType';

function useSWRMutationWithClientSession<T, A>(
  key: string,
  handler: HandlerType<T, A>
): SWRMutationResponse<T, any, 'tasks', A> {
  const session = useSession();
  return useSWRMutation(key, async (_, { arg }) => handler(session.data as Session)(arg));
}

export default useSWRMutationWithClientSession;
