# TP Next.js S1 — TaskFlow Next

Ce projet est une réalisation complète du TP **Séance 1 Next.js — Du CSR au SSR**.

## Objectifs réalisés

- Création d’un projet Next.js avec App Router et TypeScript.
- Mise en place du routing par dossiers.
- Création des routes : `/`, `/login`, `/dashboard`, `/projects/[id]`.
- Ajout d’un layout global avec Header persistant.
- Chargement des projets côté serveur avec `fetch` sans `useEffect`.
- Création d’une route dynamique avec récupération de `params`.
- Gestion d’erreur si un projet n’existe pas.
- Création d’un formulaire Login en Client Component avec `'use client'`.
- Utilisation de `json-server` sur le port `4000`.
- Réponses complètes aux questions Q1 à Q15 dans `REPONSES_TP.md`.

## Installation

```bash
npm install
```

## Lancer json-server

Dans un premier terminal :

```bash
npm run server
```

Le serveur JSON démarre sur :

```txt
http://localhost:4000
```

## Lancer Next.js

Dans un deuxième terminal :

```bash
npm run dev
```

L’application démarre sur :

```txt
http://localhost:3000
```

## Lancer les deux en même temps

```bash
npm run dev:all
```

## Compte de test

```txt
Email : admin@taskflow.com
Mot de passe : 123456
```

## Routes à tester

- Accueil : `http://localhost:3000`
- Login : `http://localhost:3000/login`
- Dashboard : `http://localhost:3000/dashboard`
- Projet existant : `http://localhost:3000/projects/1`
- Projet inexistant : `http://localhost:3000/projects/42`

## Structure du projet

```txt
taskflow-next-complet/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── projects/
│       └── [id]/
│           └── page.tsx
├── db.json
├── package.json
├── README.md
└── REPONSES_TP.md
```
