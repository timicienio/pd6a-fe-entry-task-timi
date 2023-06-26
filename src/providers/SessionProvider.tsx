'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

/***
 * Provides session information for client components.
 */
export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
