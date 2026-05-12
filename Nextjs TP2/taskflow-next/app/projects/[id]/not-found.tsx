export default function ProjectNotFound() {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: 720, margin: '0 auto' }}>
      <div className="card">
        <h1>Projet introuvable</h1>
        <p>Le projet demandé n’existe pas ou a été supprimé.</p>
        <a href="/dashboard" style={{ color: '#1B8C3E', fontWeight: 700 }}>
          Retour au dashboard
        </a>
      </div>
    </div>
  );
}
