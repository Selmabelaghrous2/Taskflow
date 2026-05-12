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

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDB();

  if (!body.name || !body.color) {
    return NextResponse.json({ message: 'Le nom et la couleur sont obligatoires.' }, { status: 400 });
  }

  const newProject: Project = {
    id: String(Date.now()),
    name: body.name,
    color: body.color
  };

  db.projects.push(newProject);
  writeDB(db);

  return NextResponse.json(newProject, { status: 201 });
}
