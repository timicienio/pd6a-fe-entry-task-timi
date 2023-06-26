import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import SessionProvider from '@/providers/SessionProvider';

import './globals.css';
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from '@/config/nextAuthConfig';

export const metadata = {
  title: 'Todo list app',
  description: 'Created by timicienio'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthConfig);

  return (
    <html lang="en">
      <body className="flex flex-col bg-base-100">
        <SessionProvider session={session}>
          <Header />
          <div className="flex flex-col min-h-screen justify-items-stretch">
            <main className="flex flex-col flex-grow">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
