import { getServerSession } from 'next-auth/next';

import { nextAuthConfig } from '@/config/nextAuthConfig';

import HandlerType from '../../types/HandlerType';

function withSession<T, A extends undefined>(apiHandlerWithAuth: HandlerType<T, A>): () => Promise<T | null>;
function withSession<T, A>(apiHandlerWithAuth: HandlerType<T, A>): (args: A) => Promise<T | null>;

function withSession<T, A>(apiHandlerWithAuth: HandlerType<T, A>) {
  return async (args: A) => {
    const session = await getServerSession(nextAuthConfig);
    if (!session?.token) return Promise.resolve(null);
    return apiHandlerWithAuth(session)(args);
  };
}

export default withSession;
