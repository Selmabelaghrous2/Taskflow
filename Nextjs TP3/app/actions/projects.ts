'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

function getProjectId(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Identifiant de projet invalide.');
  }
  return id;
}

export async function addProject(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const color = String(formData.get('color') || '#3498db');

  if (!name) {
    throw new Error('Le nom du projet est obligatoire.');
  }

  await prisma.project.create({ data: { name, color } });
  revalidatePath('/dashboard');
  revalidatePath('/projects/[id]', 'page');
}

export async function renameProject(formData: FormData) {
  const id = getProjectId(formData);
  const name = String(formData.get('name') || '').trim();

  if (!name) {
    throw new Error('Le nouveau nom est obligatoire.');
  }

  await prisma.project.update({ where: { id }, data: { name } });
  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  const id = getProjectId(formData);
  await prisma.project.delete({ where: { id } });
  revalidatePath('/dashboard');
}
