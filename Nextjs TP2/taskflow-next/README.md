# TaskFlow Next — TP Séance 2 Next.js

Projet complet basé sur le TP **Server Actions, API Routes & Auth cookies**.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir :

```txt
http://localhost:3000
```

Identifiants de connexion :

```txt
Email    : admin@taskflow.com
Mot de passe : password123
```

## Fonctionnalités réalisées

- Server Actions : ajout, renommage et suppression de projets.
- API Routes intégrées Next.js : `GET`, `POST`, `PUT`, `DELETE`.
- Authentification avec cookie `session` HttpOnly.
- Middleware de protection pour `/dashboard` et `/projects/*`.
- Bouton logout.
- Affichage de l’utilisateur connecté dans le layout.
- Page détail projet `/projects/[id]`.
- Base de données locale `db.json` lue par les API Routes.

## Structure

```txt
taskflow-next/
 app/
 ├── layout.tsx
 ├── page.tsx
 ├── globals.css
 ├── login/page.tsx
 ├── dashboard/page.tsx
 ├── dashboard/AddProjectForm.tsx
 ├── projects/[id]/page.tsx
 ├── actions/projects.ts
 ├── actions/auth.ts
 ├── api/projects/route.ts
 ├── api/projects/[id]/route.ts
 └── components/LogoutButton.tsx
 middleware.ts
 db.json
```

## Réponses aux questions du TP

### Q1
En React SPA, après un `POST`, il fallait généralement mettre à jour l’état local avec `setProjects(...)` ou refaire un `fetch`. Ici, la Server Action appelle `revalidatePath('/dashboard')`, donc Next.js régénère les données côté serveur et la page affiche automatiquement le nouveau projet.

### Q3
Le bouton supprimer est un `<form>` parce que le Dashboard est un Server Component. Un Server Component ne peut pas utiliser `onClick`, car `onClick` nécessite du JavaScript côté client. Le formulaire permet d’envoyer les données directement à une Server Action.

### Q4
L’URL `http://localhost:3000/api/projects` affiche une réponse JSON contenant la liste des projets stockés dans `db.json`.

### Q5
Une API Route expose un endpoint HTTP consommable par un navigateur, une app mobile, Postman ou un autre client. Une Server Action est une fonction serveur appelée directement depuis un formulaire ou un composant Next.js, principalement pour traiter une action côté application.

### Q6
Dans une SPA React classique, on aurait souvent plusieurs `useState` : email, password, loading, error. Ici, `useActionState` gère le résultat de l’action et l’état `pending`, donc on réduit fortement la logique côté client.

### Q7
Après login, le cookie `session` est visible dans F12 > Application > Cookies. Comme il est `HttpOnly`, il ne peut pas être lu avec `document.cookie` dans la console JavaScript.

### Q8
Avec le middleware Next.js, la page protégée ne se charge pas du tout si l’utilisateur n’est pas connecté. La redirection se fait avant la génération du HTML, donc il n’y a pas de flash du Dashboard.

### Q9
`middleware.ts` doit être à la racine du projet parce que Next.js l’exécute au niveau global avant le rendu des routes. Il ne fait pas partie des pages de `app/`.

### Q10
En React SPA, on utilisait souvent `useAuth()`, un Context, un reducer ou un état global pour connaître l’utilisateur connecté. Ici, le layout est un Server Component et lit directement le cookie avec `cookies()`.

### Q11
Pour un formulaire de création de projet interne à l’application Next.js, une Server Action est idéale. Pour une application mobile qui doit consommer les mêmes données, une API Route est préférable, car elle expose un endpoint HTTP réutilisable.

### Q12
L’avantage de sécurité est que l’authentification repose sur un cookie `HttpOnly`, inaccessible à JavaScript. Un token JWT stocké en mémoire ou dans le navigateur est plus exposé aux erreurs de gestion côté client.

### Q13
Oui, les API Routes fonctionnent toujours si `json-server` est arrêté, car Next.js devient lui-même le serveur backend et lit/écrit directement dans `db.json`.

### Q14
Non. Un script XSS injecté dans la page ne peut pas voler un cookie `HttpOnly` avec `document.cookie`. Cela réduit fortement le risque de vol de session par JavaScript malveillant.
