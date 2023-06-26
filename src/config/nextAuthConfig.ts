import login from '@/api/auth/login';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const nextAuthConfig: NextAuthOptions = {
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
      
      if (user) {
        return { ...token, ...user };
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.token = token?.token;
      session.userId = token?.id;

      return session;
    }
  }
};
