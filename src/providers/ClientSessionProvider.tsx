'use client';

import { Session } from 'next-auth/core/types';
import { SessionProvider } from 'next-auth/react';

/***
 * Provides session information for client components.
 */

export default function ClientSessionProvider({
  children
}: // session
{
  children: React.ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
