# TaskFlow Next — TP Séance 3 Next.js Full-Stack

Projet réalisé pour le TP **EMSI — Développement Front-End, Séance 3 Next.js : Full-Stack avec Prisma + Performance + Déploiement**.

## Stack

- Next.js 15 + TypeScript
- App Router
- Prisma 6
- SQLite
- Server Components
- Server Actions
- API Routes
- `next/image`
- `next/font`
- `loading.tsx`, `error.tsx`, `not-found.tsx`
- `generateStaticParams`

## Identifiants de test

```txt
Email    : admin@taskflow.com
Password : password123
```

## Installation et lancement

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
npm run dev
```

Puis ouvrir :

```txt
http://localhost:3000
```

## Scripts utiles

```bash
npm run dev        # lancement en développement
npm run build      # génération Prisma + build Next.js
npm start          # lancement production après build
npm run db:studio  # interface Prisma Studio
npm run db:seed    # insertion des données initiales
```

## Structure réalisée

```txt
taskflow-next/
 app/
 ├── layout.tsx
 ├── page.tsx
 ├── not-found.tsx
 ├── login/page.tsx
 ├── dashboard/
 │   ├── page.tsx
 │   ├── loading.tsx
 │   ├── error.tsx
 │   └── AddProjectForm.tsx
 ├── projects/[id]/
 │   ├── page.tsx
 │   └── not-found.tsx
 ├── actions/
 │   ├── projects.ts
 │   └── auth.ts
 ├── api/projects/
 │   ├── route.ts
 │   └── [id]/route.ts
 └── components/LogoutButton.tsx
 lib/prisma.ts
 prisma/
 ├── schema.prisma
 ├── seed.ts
 ├── migrations/
 └── dev.db
 middleware.ts
 .env
```

## Fonctionnalités réalisées

- Connexion simple avec cookie HTTP-only.
- Protection des routes `/dashboard` et `/projects/*` via `middleware.ts`.
- Lecture directe Prisma dans les Server Components.
- CRUD projets : ajout, affichage, renommage, suppression.
- API REST `/api/projects` : `GET`, `POST`.
- API REST `/api/projects/[id]` : `GET`, `PUT`, `DELETE`.
- Page détail projet dynamique.
- Pré-génération des pages avec `generateStaticParams`.
- Page 404 globale avec `next/image`.
- Police optimisée avec `next/font/google`.
- Chargement automatique avec `loading.tsx`.
- Gestion d’erreur avec `error.tsx`.
- Base SQLite et seed inclus.

## Réponses aux questions du TP

### Q1 — Prisma Studio

Oui. Après exécution de :

```bash
npx prisma studio
```

on voit les tables `Project` et `User`. Les données initiales sont :

- `User` : `admin@taskflow.com`, `password123`, `Admin`
- `Project` : `App Mobile`, `API Back`

Prisma Studio lit directement le fichier SQLite `prisma/dev.db`.

### Q2 — Comparaison Prisma avec fs.readFileSync/writeFileSync

Avec l’ancienne approche, il fallait :

- lire le fichier JSON ;
- parser le contenu avec `JSON.parse` ;
- modifier le tableau en mémoire ;
- réécrire le fichier avec `writeFileSync` ;
- gérer les IDs manuellement.

Avec Prisma, la route devient beaucoup plus courte, car `findMany()` et `create()` remplacent toute la logique manuelle. On économise environ **10 à 15 lignes** selon l’ancien code utilisé.

### Q3 — Suppression de db.json

Oui, l’application fonctionne toujours, car les données ne sont plus stockées dans `db.json`. Elles sont maintenant stockées dans la base SQLite `prisma/dev.db` et manipulées avec Prisma.

### Q4 — Prisma dans Server Component mais pas dans Client Component

Un Server Component s’exécute côté serveur. Il peut donc accéder à Prisma, aux variables d’environnement, au système de fichiers et à la base de données.

Un Client Component avec `'use client'` s’exécute dans le navigateur. Il ne peut pas utiliser Prisma, car Prisma nécessite un environnement serveur et ne doit jamais exposer l’accès direct à la base de données côté client.

### Q5 — Requêtes externes pour la police

Avec `next/font`, il y a **0 requête externe** vers Google Fonts au runtime. La police est optimisée, téléchargée au build et servie localement par Next.js.

### Q6 — Moment de génération de `/projects/1` et `/projects/2`

Avec `generateStaticParams`, les pages des projets existants sont générées **au moment du build**.

### Q7 — Nouveau projet après le build

Oui, par défaut une nouvelle page comme `/projects/3` peut exister après le build grâce au rendu dynamique à la demande. Cependant, elle ne sera pas aussi rapide que les pages déjà pré-générées au build.

### Q8 — URL de déploiement

L’URL dépend du projet Vercel créé par l’étudiant, par exemple :

```txt
https://taskflow-next.vercel.app
```

Pour ce TP, il faut tester :

- la page d’accueil ;
- le login ;
- la création de projet ;
- la navigation vers `/projects/[id]` ;
- la suppression et le renommage.

Remarque : SQLite n’est pas adapté à Vercel en production, car le filesystem est read-only. Pour une vraie production, il faut utiliser PostgreSQL, par exemple Supabase ou Vercel Postgres.

### Q9 — Tableau de comparaison

| Critère | React SPA avec Vite | Next.js Full-Stack |
|---|---|---|
| Routing | Côté client avec React Router | App Router intégré, routes fichiers |
| Data fetching | Appels API depuis le navigateur | Server Components, fetch serveur, Prisma direct |
| Mutations CRUD | API Express ou backend séparé | Server Actions + API Routes |
| Auth | Souvent gérée via backend séparé | Cookies, middleware, Server Actions |
| Base de données | Backend externe nécessaire | Accès direct serveur avec Prisma |
| Déploiement | Front sur Vercel/Netlify + backend séparé | Front et backend dans le même projet |
| SEO | Moins bon par défaut | Meilleur grâce au SSR/SSG |
| Performance | Dépend du bundle client | Optimisations intégrées : SSG, image, font, streaming |
| Nombre de projets | Séparation front/back fréquente | Un seul projet full-stack |

### Q10 — Choix pour une startup

Pour une startup, je choisirais **Next.js full-stack** dans la majorité des cas, car il permet de développer plus rapidement avec une seule base de code. Il offre le routing, les pages serveur, les Server Actions, les API Routes, l’optimisation des images, l’optimisation des polices, le SEO et le déploiement simplifié.

React SPA + Express reste intéressant si l’architecture nécessite une séparation stricte entre front-end et back-end, ou si l’API doit servir plusieurs clients comme mobile, web et partenaires externes. Mais pour lancer rapidement un MVP, Next.js full-stack est plus productif.

## Notes importantes

- Le fichier `.env` inclus contient :

```env
DATABASE_URL="file:./dev.db"
```

- Le fichier `.env.local.example` est fourni comme modèle.
- Pour un dépôt GitHub public, ne jamais publier de vrais secrets dans `.env.local`.
- Le fichier SQLite est inclus pour faciliter le test local du TP.
