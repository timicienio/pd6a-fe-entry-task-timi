import { useSession } from 'next-auth/react';

import HandlerType from '../../types/HandlerType';

function useWithClientSession() {
  const session = useSession();

  function withClientSession<T, A extends undefined>(apiHandlerWithAuth: HandlerType<T, A>): () => Promise<T | null>;
  function withClientSession<T, A>(apiHandlerWithAuth: HandlerType<T, A>): (args: A) => Promise<T | null>;
  function withClientSession<T, A>(apiHandlerWithAuth: HandlerType<T, A>) {
    if (!session.data) return null;
    return apiHandlerWithAuth(session.data);
  }

  return withClientSession;
}

export default useWithClientSession;
