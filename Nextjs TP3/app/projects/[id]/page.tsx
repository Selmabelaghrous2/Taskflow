import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map((project) => ({ id: String(project.id) }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const project = await prisma.project.findUnique({ where: { id: numericId } });
  if (!project) notFound();

  return (
    <article className="card">
      <p className="muted">Détail du projet #{project.id}</p>
      <h1>
        <span className="dot" style={{ width: 18, height: 18, background: project.color }} />
        {project.name}
      </h1>
      <p>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
      <Link href="/dashboard">← Retour au Dashboard</Link>
    </article>
  );
}
