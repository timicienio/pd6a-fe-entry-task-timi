import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    timeAdded: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: string;
    user?: User;
    userId: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
    id: string;
  }
}
