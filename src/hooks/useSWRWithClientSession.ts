import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import useSWR, { SWRResponse } from 'swr';

import HandlerType from '../../types/HandlerType';

function useSWRWithClientSession<T>(key: string, handler: HandlerType<T>): SWRResponse<T, any, any>;
function useSWRWithClientSession<T, A>(key: string, handler: HandlerType<T, A>, args: A): SWRResponse<T, any, any>;

function useSWRWithClientSession<T, A>(key: string, handler: HandlerType<T, A>, args?: A): SWRResponse<T, any, any> {
  const session = useSession();
  return useSWR(
    key,
    args === undefined
      ? async () => (handler(session.data as Session) as () => Promise<T>)()
      : async () => handler(session.data as Session)(args)
  );
}

export default useSWRWithClientSession;
