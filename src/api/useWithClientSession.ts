import HandlerType from '../../types/HandlerType';
import { useSession } from 'next-auth/react';

function useWithClientSession(): <T, A>(apiHandlerWithAuth: HandlerType<T, A>) => (args: A) => Promise<T | null> {
  const session = useSession();

  return <T, A>(apiHandlerWithAuth: HandlerType<T, A>) =>
    (args: A) => {
      if (!session?.data?.token) return Promise.resolve(null);
      return apiHandlerWithAuth(session.data)(args);
    };
}

export default useWithClientSession;
