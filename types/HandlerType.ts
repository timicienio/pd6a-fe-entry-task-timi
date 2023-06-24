import { Session } from 'next-auth/core/types';

type HandlerType<T, A = undefined> = A extends undefined
  ? ({ token, userId }: Session) => () => Promise<T>
  : ({ token, userId }: Session) => (args: A) => Promise<T>;

export default HandlerType;
