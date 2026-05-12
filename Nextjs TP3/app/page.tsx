import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
      <p className="muted" style={{ margin: 0 }}>EMSI — Développement Front-End</p>
      <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', margin: '.75rem 0' }}>TaskFlow Next</h1>
      <p className="muted" style={{ maxWidth: 650, margin: '0 auto 1.5rem' }}>
        Application full-stack Next.js avec Prisma, SQLite, Server Actions, API Routes,
        pages statiques dynamiques et optimisations de performance.
      </p>
      <Link className="btn" href="/dashboard">Accéder au Dashboard</Link>
    </section>
  );
}
