'use server';

import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function addProject(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const color = String(formData.get('color') || '#3498db');

  if (!name) return;

  await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color })
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = String(formData.get('id') || '');
  const newName = String(formData.get('newName') || '').trim();
  const color = String(formData.get('color') || '#3498db');

  if (!id || !newName) return;

  await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color })
  });

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get('id') || '');

  if (!id) return;

  await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'DELETE'
  });

  revalidatePath('/dashboard');
}
