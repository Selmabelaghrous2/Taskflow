import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import LogoutButton from './components/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow Next',
  description: 'TP Next.js full-stack avec Prisma, SQLite et performance',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = Boolean(cookieStore.get('session')?.value);

  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="header">
          <div className="container header-inner">
            <Link className="brand" href="/">TaskFlow Next</Link>
            <nav className="nav">
              <Link href="/dashboard">Dashboard</Link>
              {isAuthenticated ? <LogoutButton /> : <Link href="/login">Connexion</Link>}
            </nav>
          </div>
        </header>
        <main className="container" style={{ padding: '2rem 0' }}>{children}</main>
      </body>
    </html>
  );
}
