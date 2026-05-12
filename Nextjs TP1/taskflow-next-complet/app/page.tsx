export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <section className="card" style={{ maxWidth: 720, margin: '3rem auto' }}>
        <h1 style={{ color: '#1B8C3E' }}>Bienvenue sur TaskFlow</h1>
        <p>Gestion de projets collaboratifs avec Next.js App Router.</p>
        <p>
          Ce projet illustre le passage d’une application React CSR vers une
          application Next.js utilisant le SSR et les Server Components.
        </p>
        <a href="/login">Se connecter</a>
      </section>
    </div>
  );
}
