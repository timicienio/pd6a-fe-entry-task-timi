import NextAuth from 'next-auth';

import { authConfig } from '@/config/nextAuthConfig';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
