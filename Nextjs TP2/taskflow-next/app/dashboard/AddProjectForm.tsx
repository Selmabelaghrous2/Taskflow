'use client';

import { useFormStatus } from 'react-dom';
import { addProject } from '../actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: '9px 16px',
        background: '#1B8C3E',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontWeight: 700
      }}
    >
      {pending ? 'Création...' : '+ Nouveau projet'}
    </button>
  );
}

export default function AddProjectForm() {
  return (
    <form action={addProject} style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
      <input
        name="name"
        placeholder="Nom du projet"
        required
        style={{ padding: 9, borderRadius: 6, border: '1px solid #ccc', minWidth: 240 }}
      />
      <input
        name="color"
        type="color"
        defaultValue="#3498db"
        title="Couleur du projet"
        style={{ width: 44, height: 38, border: 'none', background: 'transparent' }}
      />
      <SubmitButton />
    </form>
  );
}
