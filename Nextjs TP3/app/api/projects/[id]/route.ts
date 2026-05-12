import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function readId(params: Promise<{ id: string }>) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return null;
  }

  return numericId;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const id = await readId(params);
  if (!id) return NextResponse.json({ message: 'Identifiant invalide.' }, { status: 400 });

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const id = await readId(params);
  if (!id) return NextResponse.json({ message: 'Identifiant invalide.' }, { status: 400 });

  const { name, color } = await request.json();
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ message: 'Le nom du projet est obligatoire.' }, { status: 400 });
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name: name.trim(), ...(color ? { color } : {}) },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const id = await readId(params);
  if (!id) return NextResponse.json({ message: 'Identifiant invalide.' }, { status: 400 });

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: 'Projet supprimé.' });
  } catch {
    return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });
  }
}
