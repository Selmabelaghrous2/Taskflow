'use client';

import { useActionState } from 'react';
import { login } from '../actions/auth';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div style={{ padding: '3rem 1rem', maxWidth: 440, margin: '0 auto' }}>
      <div className="card">
        <h1 style={{ color: '#1B8C3E', marginTop: 0 }}>TaskFlow</h1>
        <p>Connectez-vous pour continuer.</p>

        {state?.error && (
          <p style={{ color: '#b91c1c', background: '#fee2e2', padding: 10, borderRadius: 6 }}>
            {state.error}
          </p>
        )}

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue="admin@taskflow.com"
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            defaultValue="password123"
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            disabled={pending}
            style={{
              padding: 12,
              background: '#1B8C3E',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            {pending ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
