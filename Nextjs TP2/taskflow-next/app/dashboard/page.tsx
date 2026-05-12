import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

type Project = {
  id: string;
  name: string;
  color: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/api/projects`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Impossible de charger les projets.');
  }

  return res.json();
}

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end' }}>
        <div>
          <p style={{ color: '#1B8C3E', fontWeight: 700, margin: 0 }}>Espace protégé</p>
          <h1 style={{ marginTop: 6 }}>Dashboard</h1>
        </div>
        <span style={{ color: '#6b7280' }}>{projects.length} projet(s)</span>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Ajouter un projet</h2>
        <AddProjectForm />
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Liste des projets</h2>
        {projects.length === 0 ? (
          <p>Aucun projet pour le moment.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {projects.map((p) => (
              <li
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(180px, 1fr) minmax(260px, 420px) auto',
                  gap: 10,
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <span
                  title={p.color}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: p.color,
                    display: 'inline-block'
                  }}
                />
                <a href={`/projects/${p.id}`} style={{ fontWeight: 700, color: '#1B8C3E' }}>
                  {p.name}
                </a>

                <form action={renameProject} style={{ display: 'flex', gap: 8 }}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="color" value={p.color} />
                  <input
                    name="newName"
                    placeholder="Nouveau nom"
                    aria-label={`Renommer ${p.name}`}
                    required
                    style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                  />
                  <button
                    type="submit"
                    style={{
                      border: '1px solid #1B8C3E',
                      color: '#1B8C3E',
                      background: 'white',
                      borderRadius: 6,
                      padding: '8px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    Renommer
                  </button>
                </form>

                <form action={deleteProject} style={{ display: 'inline' }}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    title="Supprimer"
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      border: '1px solid #fecaca',
                      borderRadius: 6,
                      padding: '8px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    Supprimer
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
