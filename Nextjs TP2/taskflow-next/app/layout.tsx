import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import LogoutButton from './components/LogoutButton';

export const metadata: Metadata = {
  title: 'TaskFlow Next',
  description: 'TP Next.js — Server Actions, API Routes et Auth cookies'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="fr">
      <body>
        <header
          style={{
            background: '#1B8C3E',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <a href="/" style={{ fontWeight: 700, fontSize: 22 }}>
            TaskFlow
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && <span>Bienvenue, {user.name}</span>}
            {user && <LogoutButton />}
            {!user && (
              <a href="/login" style={{ color: 'white', textDecoration: 'underline' }}>
                Login
              </a>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
