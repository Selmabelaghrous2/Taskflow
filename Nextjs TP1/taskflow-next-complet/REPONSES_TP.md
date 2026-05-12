# Réponses aux questions du TP — Next.js S1

## Q1 — Comparaison de la structure React Vite et Next.js

Dans un projet React avec Vite, la structure classique repose sur `src/`, `main.tsx`, `App.tsx`, `index.css`, des composants, des pages et une configuration de routing souvent faite avec `react-router-dom` dans le code.

Dans un projet Next.js avec App Router, la structure repose principalement sur le dossier `app/`. Le fichier `layout.tsx` définit la structure globale, `page.tsx` représente une route, et les sous-dossiers créent automatiquement de nouvelles routes.

La différence principale est donc que React Vite gère le routing dans le code, alors que Next.js le gère par la structure des dossiers.

## Q2 — Nombre de fichiers créés pour `/login`

Pour créer la route `/login` dans Next.js, il suffit de créer un dossier `app/login` et un fichier `page.tsx`.

Donc, un seul fichier de page est nécessaire pour la route.

Avec React Router, il aurait fallu créer le composant Login, l’importer dans `App.tsx`, puis déclarer manuellement la route avec `<Route path="/login" ... />`.

## Q3 — Récupération de l’id dans une route dynamique

Dans React, on utilise le hook `useParams()` côté client pour récupérer l’id depuis l’URL.

Dans Next.js, l’id est transmis automatiquement au composant de page via la prop `params`. Le composant peut donc récupérer `params.id` directement.

La différence fondamentale est que `useParams()` est un hook client, alors que dans Next.js, les paramètres peuvent être récupérés côté serveur dans un Server Component.

## Q5 — Nombre de lignes pour charger les projets

Dans une SPA React classique, il faut généralement utiliser :

- `useState` pour stocker les projets ;
- `useEffect` pour déclencher le chargement ;
- `fetch` pour récupérer les données ;
- `setProjects` pour mettre à jour l’état ;
- parfois un état `loading` et un état `error`.

Dans Next.js, le Dashboard peut être une fonction `async` et faire directement :

```tsx
const res = await fetch('http://localhost:4000/projects', { cache: 'no-store' });
const projects = await res.json();
```

Il y a donc beaucoup moins de code, car le chargement est effectué côté serveur avant l’envoi de la page au navigateur.

## Q6 — Requête visible dans l’onglet Network

Dans le Dashboard Next.js, la requête `GET /projects` vers `localhost:4000` n’apparaît pas dans le Network du navigateur, car elle est exécutée par le serveur Next.js.

Le navigateur reçoit directement une page HTML déjà remplie avec les données des projets.

## Q7 — Pourquoi `'use client'` dans Login et pas dans Dashboard ?

La page Login utilise de l’interactivité :

- `useState` ;
- `onChange` ;
- `onSubmit` ;
- `useRouter` pour rediriger l’utilisateur.

Elle doit donc être un Client Component, ce qui impose l’utilisation de `'use client'`.

Le Dashboard, lui, affiche seulement des données récupérées côté serveur. Il n’a pas besoin de hooks client ni d’événements utilisateur. Il peut donc rester un Server Component.

## Q8 — Équivalent de `useNavigate()` dans Next.js

Dans React Router, on utilise `useNavigate()` pour rediriger l’utilisateur.

Dans Next.js App Router, l’équivalent est `useRouter()` depuis `next/navigation`, puis :

```tsx
router.push('/dashboard');
```

## Q9 — View Source dans React SPA

Dans une application React SPA, le code source contient généralement seulement une structure minimale comme :

```html
<div id="root"></div>
<script type="module" src="..."></script>
```

Les noms des projets ne sont pas présents directement dans le HTML initial, car ils sont ajoutés après le chargement du JavaScript dans le navigateur.

## Q10 — View Source dans Next.js

Dans Next.js avec SSR, le code source HTML contient déjà le contenu rendu côté serveur.

Les noms des projets peuvent donc apparaître directement dans le HTML initial de la page Dashboard.

Cela améliore le référencement, le temps d’affichage initial et l’accessibilité du contenu.

## Q11 — Header persistant avec React Router

Avec React Router, on plaçait généralement le Header en dehors des routes ou dans un composant Layout parent.

Exemple :

```tsx
<Header />
<Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
</Routes>
```

Ainsi, le Header restait affiché pendant que seul le contenu de la route changeait.

## Q12 — Layout spécifique au Dashboard

Pour créer un layout spécifique au Dashboard dans Next.js, il faut créer un fichier :

```txt
app/dashboard/layout.tsx
```

Ce layout s’appliquera uniquement aux pages situées dans le dossier `dashboard`.

## Q13 — Un Server Component peut-il utiliser `onClick` ?

Non. Un Server Component ne peut pas utiliser `onClick`, car `onClick` est un événement exécuté dans le navigateur.

Les Server Components sont rendus côté serveur et ne gèrent pas directement l’interactivité utilisateur.

Pour utiliser `onClick`, il faut créer un Client Component avec `'use client'`.

## Q14 — Ajouter un bouton « + Nouveau projet » sur Dashboard

Il n’est pas obligatoire de transformer toute la page Dashboard en Client Component.

La bonne pratique consiste à garder le Dashboard en Server Component et à créer un petit composant client séparé, par exemple :

```txt
app/dashboard/NewProjectButton.tsx
```

Ce composant contiendra `'use client'` et seulement la logique interactive nécessaire.

## Q15 — Avantage de sécurité du fetch côté serveur

Comme le fetch du Dashboard est effectué par le serveur Next.js, le navigateur ne voit pas directement l’URL `localhost:4000`.

Cela permet de mieux protéger l’accès à l’API, de cacher certains détails internes de l’architecture et d’éviter d’exposer inutilement les endpoints au client.

Dans un vrai projet, cela peut aussi aider à protéger des clés secrètes ou des accès internes qui ne doivent jamais être envoyés au navigateur.
