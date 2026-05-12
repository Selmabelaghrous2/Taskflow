import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="grid">
      <div>
        <h1>Dashboard</h1>
        <p className="muted">{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
      </div>

      <AddProjectForm />

      <section className="card">
        <h2>Liste des projets</h2>
        {projects.length === 0 ? (
          <p className="muted">Aucun projet pour le moment.</p>
        ) : (
          <div>
            {projects.map((project) => (
              <div className="project-row" key={project.id}>
                <div>
                  <span className="dot" style={{ background: project.color }} />
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                  <p className="muted" style={{ margin: '.25rem 0 0' }}>
                    Créé le {project.createdAt.toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <form action={renameProject} style={{ display: 'flex', gap: '.5rem' }}>
                    <input type="hidden" name="id" value={project.id} />
                    <input className="input" style={{ width: 170 }} name="name" defaultValue={project.name} aria-label="Renommer le projet" />
                    <button className="btn secondary" type="submit">Renommer</button>
                  </form>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button className="btn danger" type="submit" aria-label={`Supprimer ${project.name}`}>Supprimer</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
