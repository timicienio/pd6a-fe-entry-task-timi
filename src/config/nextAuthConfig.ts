import login from '@/api/auth/login';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXT_JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials');

        const res = await login(credentials?.email, credentials?.password);

        const user = { ...res.user, token: res.authToken };

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log('jwt user', user);
      if (user) {
        return { ...token, ...user };
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      // console.log('token', token);

      // const splittedToken = token?.token?.split('.')?.at(1);

      // if (!splittedToken) return Promise.reject('Invalid token format.');

      // const accessTokenData = JSON.parse(atob(splittedToken));

      // session.user = accessTokenData;
      session.token = token?.token;

      return session;
    }
  }
};
