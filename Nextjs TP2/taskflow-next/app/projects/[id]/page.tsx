import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

type Project = {
  id: string;
  name: string;
  color: string;
};

async function getProject(id: string): Promise<Project | null> {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, { cache: 'no-store' });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Impossible de charger le projet.');

  return res.json();
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div style={{ padding: '2rem', maxWidth: 820, margin: '0 auto' }}>
      <a href="/dashboard" style={{ color: '#1B8C3E', fontWeight: 700 }}>
        ← Retour au dashboard
      </a>

      <div className="card" style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: project.color,
              display: 'inline-block'
            }}
          />
          <h1 style={{ margin: 0 }}>{project.name}</h1>
        </div>

        <dl style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12 }}>
          <dt style={{ fontWeight: 700 }}>Identifiant</dt>
          <dd style={{ margin: 0 }}>{project.id}</dd>
          <dt style={{ fontWeight: 700 }}>Couleur</dt>
          <dd style={{ margin: 0 }}>{project.color}</dd>
        </dl>
      </div>
    </div>
  );
}
