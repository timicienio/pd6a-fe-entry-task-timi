import { Session } from 'next-auth/core/types';

type HandlerType<T, A = undefined> = (session: Session) => HandlerWithSessionType<T, A>;

export type HandlerWithSessionType<T, A> = A extends undefined ? () => Promise<T> : (args: A) => Promise<T>;

export default HandlerType;
