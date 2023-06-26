'use client';

import { Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

/***
 * Provides session information for client components.
 */
export default function SessionProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}
