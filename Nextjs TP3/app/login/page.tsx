'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, type LoginState } from '../actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending ? 'Connexion...' : 'Se connecter'}</button>;
}

export default function LoginPage() {
  const initialState: LoginState = {};
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="card" style={{ maxWidth: 460, margin: '2rem auto' }}>
      <h1>Connexion</h1>
      <p className="muted">Compte de test : admin@taskflow.com / password123</p>
      <form action={formAction} className="grid">
        <label>
          Email
          <input className="input" type="email" name="email" defaultValue="admin@taskflow.com" />
        </label>
        <label>
          Mot de passe
          <input className="input" type="password" name="password" defaultValue="password123" />
        </label>
        {state.error ? <p style={{ color: 'var(--danger)' }}>{state.error}</p> : null}
        <SubmitButton />
      </form>
    </div>
  );
}
