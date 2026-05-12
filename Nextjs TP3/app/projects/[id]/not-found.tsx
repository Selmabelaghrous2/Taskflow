import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h1>Projet introuvable</h1>
      <p className="muted">Le projet demandé n’existe pas ou a été supprimé.</p>
      <Link className="btn" href="/dashboard">Retour au Dashboard</Link>
    </div>
  );
}
