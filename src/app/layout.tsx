import Footer from '@/layout/Footer';
import Header from '@/layout/Header';

import './globals.css';
import ClientSessionProvider from '@/providers/ClientSessionProvider';
import { getServerSession } from 'next-auth/next';

export const metadata = {
  title: 'Todo list app',
  description: 'Created by timicienio'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-base-100">
        <Header />
        <main className="flex flex-col items-center justify-center pt-32 pb-8 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
