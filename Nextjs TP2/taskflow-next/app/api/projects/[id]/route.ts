import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

type Project = {
  id: string;
  name: string;
  color: string;
};

type DB = {
  projects: Project[];
};

function readDB(): DB {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as DB;
  return data;
}

function writeDB(data: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((item) => item.id === id);

  if (!project) {
    return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });
  }

  db.projects[index] = {
    ...db.projects[index],
    name: body.name || db.projects[index].name,
    color: body.color || db.projects[index].color
  };

  writeDB(db);

  return NextResponse.json(db.projects[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const exists = db.projects.some((item) => item.id === id);

  if (!exists) {
    return NextResponse.json({ message: 'Projet introuvable.' }, { status: 404 });
  }

  db.projects = db.projects.filter((item) => item.id !== id);
  writeDB(db);

  return NextResponse.json({ message: 'Projet supprimé avec succès.' });
}
