// @ts-ignore: allow importing global CSS (declared in types)
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { ReactNode } from 'react';
import ClerkProviderClient from '../components/auth/ClerkProviderClient';

export const metadata = {
  title: 'Learnify',
  description: 'An intelligent environment for deep learning.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cognitive-white">
        <ClerkProviderClient>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
