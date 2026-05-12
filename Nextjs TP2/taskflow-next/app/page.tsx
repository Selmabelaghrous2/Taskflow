export default function HomePage() {
  return (
    <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto' }}>
      <div className="card">
        <p style={{ color: '#1B8C3E', fontWeight: 700, marginTop: 0 }}>TP Next.js — Séance 2</p>
        <h1 style={{ fontSize: 42, margin: '0 0 1rem' }}>TaskFlow Next</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6 }}>
          Application de gestion de projets réalisée avec Server Actions, API Routes,
          middleware et authentification par cookies HttpOnly.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <a
            href="/login"
            style={{
              background: '#1B8C3E',
              color: 'white',
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 700
            }}
          >
            Se connecter
          </a>
          <a
            href="/dashboard"
            style={{
              background: 'white',
              color: '#1B8C3E',
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #1B8C3E',
              fontWeight: 700
            }}
          >
            Aller au Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
