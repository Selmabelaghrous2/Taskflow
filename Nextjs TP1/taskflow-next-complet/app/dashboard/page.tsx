interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  status?: string;
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:4000/projects', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Impossible de charger les projets');
  }

  return res.json();
}

export default async function DashboardPage() {
  let projects: Project[] = [];
  let error = '';

  try {
    projects = await getProjects();
  } catch {
    error = 'Impossible de charger les projets. Vérifiez que json-server est lancé sur le port 4000.';
  }

  return (
    <div style={{ padding: '2rem' }}>
      <section className="card">
        <h1>Dashboard</h1>

        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <p>{projects.length} projets</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {projects.map((p) => (
                <li
                  key={p.id}
                  style={{
                    marginBottom: 12,
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#fafafa',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: p.color,
                      marginRight: 8,
                    }}
                  />
                  <a href={`/projects/${p.id}`}>{p.name}</a>
                  {p.status && <span style={{ marginLeft: 8, color: '#6b7280' }}>— {p.status}</span>}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
