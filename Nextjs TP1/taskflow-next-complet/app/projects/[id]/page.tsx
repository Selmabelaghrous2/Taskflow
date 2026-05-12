interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  status?: string;
  members?: string[];
}

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

async function resolveParams(params: Props['params']) {
  return params instanceof Promise ? await params : params;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await resolveParams(params);

  const res = await fetch(`http://localhost:4000/projects/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div style={{ padding: '2rem' }}>
        <section className="card">
          <h1>Projet non trouvé</h1>
          <p>Aucun projet avec l’identifiant {id} n’existe dans la base de données.</p>
          <a href="/dashboard">← Retour au Dashboard</a>
        </section>
      </div>
    );
  }

  const project: Project = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <section className="card">
        <h1>
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: project.color,
              marginRight: 8,
            }}
          />
          {project.name}
        </h1>
        <p><strong>ID :</strong> {project.id}</p>
        {project.status && <p><strong>Statut :</strong> {project.status}</p>}
        {project.description && <p><strong>Description :</strong> {project.description}</p>}
        {project.members && (
          <p><strong>Membres :</strong> {project.members.join(', ')}</p>
        )}
        <a href="/dashboard">← Retour au Dashboard</a>
      </section>
    </div>
  );
}
