'use client';

import { useFormStatus } from 'react-dom';
import { addProject } from '../actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending ? 'Ajout...' : 'Ajouter'}</button>;
}

export default function AddProjectForm() {
  return (
    <form action={addProject} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 110px auto', gap: '.75rem', alignItems: 'end' }}>
      <label>
        Nom du projet
        <input className="input" name="name" placeholder="Ex : Refonte site web" required />
      </label>
      <label>
        Couleur
        <input className="input" name="color" type="color" defaultValue="#3498db" aria-label="Couleur du projet" />
      </label>
      <SubmitButton />
    </form>
  );
}
