import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { name, color } = await request.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ message: 'Le nom du projet est obligatoire.' }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: { name: name.trim(), color: color || '#3498db' },
  });

  return NextResponse.json(project, { status: 201 });
}
