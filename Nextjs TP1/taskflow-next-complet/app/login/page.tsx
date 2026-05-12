'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@taskflow.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(email)}`);

      if (!res.ok) {
        setError('Erreur serveur');
        return;
      }

      const users: User[] = await res.json();

      if (users.length === 0 || users[0].password !== password) {
        setError('Email ou mot de passe incorrect');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Erreur serveur : vérifiez que json-server tourne sur le port 4000.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 430, margin: '0 auto' }}>
      <div className="card">
        <h1 style={{ color: '#1B8C3E', marginBottom: 4 }}>TaskFlow</h1>
        <p style={{ marginTop: 0 }}>Connectez-vous pour continuer</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', marginTop: 4, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

          <label>
            Mot de passe
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginTop: 4, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              background: '#1B8C3E',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 16 }}>
          Compte de test : admin@taskflow.com / 123456
        </p>
      </div>
    </div>
  );
}
