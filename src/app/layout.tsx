import Footer from '@/layout/Footer';
import Header from '@/layout/Header';

import './globals.css';

export const metadata = {
  title: 'Todo list app',
  description: 'Created by timicienio'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-base-100">
        <Header />
        <div className="flex flex-col min-h-screen justify-items-stretch">
          <main className="flex flex-col flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
